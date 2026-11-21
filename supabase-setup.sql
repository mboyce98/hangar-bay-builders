-- =========================================================
-- HANGAR BAY BUILDERS community — Supabase setup (accounts + content)
-- Paste this whole file into Supabase → SQL Editor → Run.
-- Run it ONCE on a fresh project.
--
-- Security model:
--   • Anyone can read profiles, posts, comments and chat.
--   • Only signed-in users can post, comment, like or chat.
--   • People can only edit/delete their OWN content.
--   • Admins (is_admin = true) can delete anyone's posts,
--     comments and messages. Make yourself admin at the bottom.
-- =========================================================

-- ---------- Profiles (one per account, created automatically) ----------
create table public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  username          text not null check (username ~ '^[A-Za-z0-9_]{3,24}$'),
  bio               text check (char_length(bio) <= 300),
  specialties       text[] not null default '{}' check (cardinality(specialties) <= 5),
  avatar_url        text check (char_length(avatar_url) <= 500),
  open_commissions  boolean not null default false,
  website           text check (website ~ '^https://' and char_length(website) <= 200),
  instagram         text check (instagram ~ '^https://' and char_length(instagram) <= 200),
  youtube           text check (youtube ~ '^https://' and char_length(youtube) <= 200),
  is_admin          boolean not null default false,
  created_at        timestamptz not null default now()
);
create unique index profiles_username_unique on public.profiles (lower(username));

-- Creates a profile whenever someone signs up (email or GitHub).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base text;
  candidate text;
begin
  base := regexp_replace(
    coalesce(new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'user_name', 'pilot'),
    '[^A-Za-z0-9_]', '', 'g');
  if char_length(base) < 3 then base := 'pilot_' || base; end if;
  base := left(base, 19);
  candidate := base;
  while exists (select 1 from profiles where lower(username) = lower(candidate)) loop
    candidate := base || '_' || substr(md5(random()::text), 1, 4);
  end loop;
  insert into profiles (id, username, avatar_url)
  values (new.id, candidate, new.raw_user_meta_data->>'avatar_url');
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from profiles where id = auth.uid()), false);
$$;

-- ---------- Content ----------
create table public.posts (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz,
  user_id     uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 80),
  grade       text check (char_length(grade) <= 10),
  stage       text not null default 'WIP' check (stage in ('WIP', 'Finished')),
  body        text check (char_length(body) <= 1500),
  image_urls  text[] not null default '{}' check (cardinality(image_urls) <= 4)
);

create table public.post_likes (
  post_id     bigint not null references public.posts(id) on delete cascade,
  user_id     uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table public.comments (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  post_id     bigint not null references public.posts(id) on delete cascade,
  user_id     uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 400)
);

create table public.messages (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  channel     text not null check (channel in ('general', 'wip', 'help', 'paint', 'trades')),
  user_id     uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 500)
);

create index posts_user on public.posts (user_id, created_at desc);
create index comments_post on public.comments (post_id);
create index messages_channel_time on public.messages (channel, created_at desc);

-- ---------- Row level security ----------
alter table public.profiles   enable row level security;
alter table public.posts      enable row level security;
alter table public.post_likes enable row level security;
alter table public.comments   enable row level security;
alter table public.messages   enable row level security;

-- Profiles: public read; you can update only your own, and only these columns
create policy "profiles readable" on public.profiles for select using (true);
create policy "update own profile" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
revoke update on public.profiles from anon, authenticated;
grant update (username, bio, specialties, avatar_url, open_commissions, website, instagram, youtube)
  on public.profiles to authenticated;

-- Posts
create policy "posts readable" on public.posts for select using (true);
create policy "create own posts" on public.posts for insert to authenticated with check (user_id = auth.uid());
create policy "edit own posts" on public.posts for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "delete own posts or admin" on public.posts for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());
revoke update on public.posts from anon, authenticated;
grant update (title, grade, stage, body, updated_at) on public.posts to authenticated;

-- Likes
create policy "likes readable" on public.post_likes for select using (true);
create policy "like as yourself" on public.post_likes for insert to authenticated with check (user_id = auth.uid());
create policy "unlike your own" on public.post_likes for delete to authenticated using (user_id = auth.uid());

-- Comments
create policy "comments readable" on public.comments for select using (true);
create policy "comment as yourself" on public.comments for insert to authenticated with check (user_id = auth.uid());
create policy "delete own comments or admin" on public.comments for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- Chat
create policy "messages readable" on public.messages for select using (true);
create policy "chat as yourself" on public.messages for insert to authenticated with check (user_id = auth.uid());
create policy "delete own messages or admin" on public.messages for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ---------- Real-time updates ----------
alter publication supabase_realtime add table public.posts, public.post_likes, public.comments, public.messages;

-- ---------- Photo storage (each user uploads into their own folder) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('builds',  'builds',  true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "public can view images" on storage.objects for select
  using (bucket_id in ('builds', 'avatars'));
create policy "users upload to own folder" on storage.objects for insert to authenticated
  with check (bucket_id in ('builds', 'avatars') and (storage.foldername(name))[1] = auth.uid()::text);
create policy "users delete own files" on storage.objects for delete to authenticated
  using (bucket_id in ('builds', 'avatars') and (storage.foldername(name))[1] = auth.uid()::text);

-- =========================================================
-- AFTER you create your own account on the site, make yourself
-- an admin (moderator) by running this with your username:
--
--   update public.profiles set is_admin = true where username = 'YourUsername';
-- =========================================================
