# Hangar Bay Builders — going live

The site runs in **demo mode** until you connect it to Supabase. In demo mode, accounts and posts are saved only in your own browser.

**How it fits together:**
- **GitHub** holds the site's code and hosts it for free with GitHub Pages. It's also an optional "Sign in with GitHub" button.
- **Supabase** (free tier) holds the accounts, profiles, posts, photos and chat.

---

## 1. Create the Supabase project
1. Sign up at https://supabase.com and click **New project**.
2. Name it `hangar-bay-builders`. Click **Generate a password** and save it in your password manager.
3. Pick the region closest to your visitors, then click **Create**.

## 2. Create the database
1. Open **SQL Editor**, then **New query**.
2. Paste in all of `supabase-setup.sql` and click **Run**. Only run it once.
3. To check it worked: **Table Editor** should show `profiles`, `posts`, `post_likes`, `comments` and `messages`. **Storage** should show the `builds` and `avatars` buckets.

## 3. Connect the site
1. Go to **Project Settings → API Keys** and copy the **Project URL** and the **publishable** (or "anon public") key.
2. Paste both into `BACKEND` at the top of `community.js`.
3. ⚠️ Never put the **secret** or **service_role** key in the site.

## 4. Put the site on GitHub Pages
1. Create a GitHub repo (for example `hangar-bay-builders`) and upload these files: `index.html`, `styles.css`, `app.js`, `community.js`.
2. Go to **Settings → Pages → Source: Deploy from a branch → main / root**.
3. Your site will be at `https://YOURNAME.github.io/hangar-bay-builders/`.

## 5. Tell Supabase where your site lives
1. In Supabase, go to **Authentication → URL Configuration**.
2. Set **Site URL** to your GitHub Pages address.
3. Add the same address under **Redirect URLs**. Sign-up confirmation and password-reset emails link back to this address.

## 6. (Optional) "Continue with GitHub" sign-in
1. On GitHub, go to **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - **Homepage URL:** your GitHub Pages address.
   - **Authorization callback URL:** `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
2. Copy the **Client ID**, then generate and copy a **Client secret**.
3. In Supabase, go to **Authentication → Sign In / Providers → GitHub**. Turn it on and paste in both values.

## 7. Make yourself a moderator
1. Create your own account on the live site.
2. Run this in the SQL Editor, using your username:
   ```sql
   update public.profiles set is_admin = true where username = 'YourUsername';
   ```
3. You'll now see delete buttons on everyone's posts, comments and messages. You can also remove anything from the **Table Editor**.

## Limits to know
- **Free tier:** 50,000 monthly active users, a 500MB database and 1GB of photo storage.
- **Photos:** resized before upload, up to 4 per post.
- **Confirmation emails:** Supabase's built-in email sender is limited to a few emails per hour. Before launch, connect a free SMTP service such as Resend under **Authentication → Emails → SMTP Settings**.
