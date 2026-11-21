/* =========================================================
   KITFORGE — Community: accounts, profiles, build posts, chat

   DEMO MODE (default): accounts, posts and chat are saved only in
   this browser and passwords aren't checked. For trying it out.

   LIVE MODE: real accounts and shared content for everyone.
   See SETUP.md for the full steps. In short:
     1. Create a free project at https://supabase.com
     2. SQL Editor → paste supabase-setup.sql → Run
     3. Project Settings → API Keys: copy the Project URL and the
        publishable (or "anon public") key into BACKEND below.
        NEVER put the secret / service_role key here.
   ========================================================= */
const BACKEND = {
  supabaseUrl: "https://daqkdjhejttyxgpqqznz.supabase.co",
  supabaseAnonKey: "sb_publishable_Gaqe4Sw2XAnSZvWqkdgG5A_t1W7lsjy", // publishable key (safe in a website)
};

const CHANNELS = [
  { id: "general", name: "general", desc: "Hangar chatter — say hi" },
  { id: "wip", name: "wip-builds", desc: "Post progress, get feedback" },
  { id: "help", name: "help-desk", desc: "Stuck on a step? Ask here" },
  { id: "paint", name: "paint-shop", desc: "Airbrush, markers, weathering" },
  { id: "trades", name: "hauls-and-trades", desc: "Show hauls, swap kits & parts" },
];

const LIMITS = { title: 80, body: 1500, comment: 400, chat: 500, bio: 300, specialties: 5, photos: 4, imageMB: 15, chatCooldownMs: 1500 };
const USERNAME_RE = /^[A-Za-z0-9_]{3,24}$/;
const GRADES = ["SD", "EG", "HG", "RG", "MG", "PG", "Other"];

// ---------------- HELPERS ----------------
const esc = (s = "") => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = (u) => (/^https:\/\/[^\s"'<>]+$/i.test(u || "") ? u : "");

function timeAgo(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return new Date(iso).toLocaleDateString();
}

const PALETTE = ["#2f6fff", "#e5383b", "#ffc233", "#3ddc97", "#b07cff", "#ff8a3d", "#3dc9ff"];
function nameColor(name = "") {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
function avatar(p, size = 34) {
  const name = p?.username || "?";
  const style = `width:${size}px;height:${size}px;--ac:${nameColor(name)}`;
  const url = p?.avatar_url && (safeUrl(p.avatar_url) || p.avatar_url.startsWith("data:image/") ? p.avatar_url : "");
  return url
    ? `<img class="c-avatar" style="${style}" src="${esc(url)}" alt="">`
    : `<span class="c-avatar" style="${style}">${esc(name[0].toUpperCase())}</span>`;
}
const userLink = (p) => p ? `<button class="user-link" data-user="${esc(p.username)}">${esc(p.username)}</button>` : "<span>deleted</span>";

function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = () => rej(new Error("Couldn't load " + src));
    document.head.appendChild(s);
  });
}

/* Shrinks photos before upload so 10MB phone shots don't eat storage. */
async function resizeImage(file, max, quality, asBlob) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => {
      const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("That file isn't a readable image."));
      i.src = url;
    });
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    return asBlob ? await new Promise((res) => c.toBlob(res, "image/jpeg", quality)) : c.toDataURL("image/jpeg", quality);
  } finally { URL.revokeObjectURL(url); }
}

function checkImage(f) {
  if (!f.type.startsWith("image/")) throw new Error(`"${f.name}" isn't an image.`);
  if (f.size > LIMITS.imageMB * 1024 * 1024) throw new Error(`"${f.name}" is over ${LIMITS.imageMB}MB.`);
}

// =========================================================
// DATA: DEMO (this browser only)
// =========================================================
function localDb() {
  const KEY = "kf_community_v2", SKEY = "kf_session";
  const changeFns = [], authFns = [];
  const bc = "BroadcastChannel" in window ? new BroadcastChannel("kf_community") : null;
  const ago = (min) => new Date(Date.now() - min * 60000).toISOString();
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const seed = () => ({
    users: [
      { id: "u_hex", email: "hex@demo.kitforge", username: "Hex", bio: "Full customs and airbrush work. 10 years at the bench.", specialties: ["Airbrush", "Customs", "Masking"], open_commissions: true, website: "", instagram: "", youtube: "", is_admin: false, created_at: ago(90000) },
      { id: "u_rook", email: "rook@demo.kitforge", username: "Rook", bio: "Weathering nerd. If it's clean, it's not finished.", specialties: ["Weathering", "Dioramas"], open_commissions: true, website: "", instagram: "", youtube: "", is_admin: false, created_at: ago(60000) },
      { id: "u_nova", email: "nova@demo.kitforge", username: "Nova", bio: "PG and RG detail work, LEDs, metallics.", specialties: ["PG", "LEDs", "Metallics"], open_commissions: false, website: "", instagram: "", youtube: "", is_admin: false, created_at: ago(40000) },
      { id: "u_kai", email: "kai@demo.kitforge", username: "Kai", bio: "Zaku-types forever. Kitbash everything.", specialties: ["Kitbash", "Scratch-build"], open_commissions: true, website: "", instagram: "", youtube: "", is_admin: false, created_at: ago(20000) },
    ],
    posts: [
      { id: "s1", user_id: "u_rook", created_at: ago(35), title: "Desert scheme — first pass of chipping", grade: "HG", stage: "WIP", body: "Sponge chipping with Tamiya Hull Red, then a pin wash. Too heavy on the shins? Honest feedback welcome.", image_urls: [], colors: ["#d8b47a", "#6b4f2a", "#3a3a3a", "#e5383b"] },
      { id: "s2", user_id: "u_nova", created_at: ago(180), title: "PG finally done after 3 months", grade: "PG", stage: "Finished", body: "Gold frame is Alclad over gloss black. LED kit installed in the chest and eyes.", image_urls: [], colors: ["#f4f6fb", "#c9a227", "#5b2a86", "#1b1b1b"] },
      { id: "s3", user_id: "u_kai", created_at: ago(600), title: "Kitbashed a sniper variant", grade: "HG", stage: "Finished", body: "Long rifle is from a spare weapons pack plus styrene tube. Shoulder sensor is scratch-built.", image_urls: [], colors: ["#3b4a3a", "#1d241c", "#8a96b0", "#ff6b35"] },
      { id: "s4", user_id: "u_hex", created_at: ago(1500), title: "Snow camo masking test", grade: "MG", stage: "WIP", body: "Blu-tack worms for soft edges. Second color goes on tomorrow.", image_urls: [], colors: ["#e9f2ff", "#9bb8d8", "#405a7a", "#3ddc97"] },
    ],
    likes: [
      ...["u_hex", "u_kai", "u_nova"].map((u) => ({ post_id: "s1", user_id: u })),
      ...["u_hex", "u_kai", "u_rook"].map((u) => ({ post_id: "s2", user_id: u })),
      { post_id: "s3", user_id: "u_nova" }, { post_id: "s4", user_id: "u_rook" },
    ],
    comments: [
      { id: "c1", post_id: "s1", user_id: "u_hex", created_at: ago(30), body: "Shins look great. Maybe lighter on the knee armor so the wear tells a story." },
      { id: "c2", post_id: "s1", user_id: "u_kai", created_at: ago(20), body: "Agree — chipping where feet hit the ground, less up top." },
      { id: "c3", post_id: "s2", user_id: "u_rook", created_at: ago(120), body: "That gold is unreal. Which LED kit?" },
    ],
    messages: [
      { id: "m1", channel: "general", user_id: "u_hex", created_at: ago(95), body: "Morning pilots ☕ who's at the bench today?" },
      { id: "m2", channel: "general", user_id: "u_rook", created_at: ago(90), body: "Weathering the desert one. Send help (and more sponges)." },
      { id: "m3", channel: "general", user_id: "u_nova", created_at: ago(60), body: "Just posted the PG in the feed, finally!" },
      { id: "m4", channel: "general", user_id: "u_kai", created_at: ago(12), body: "Anyone going to the hobby shop meetup Saturday?" },
      { id: "m5", channel: "help", user_id: "u_kai", created_at: ago(240), body: "Decal silvering on a matte coat — fix?" },
      { id: "m6", channel: "help", user_id: "u_hex", created_at: ago(230), body: "Gloss coat first, decal + softener, then matte over it. Silvering is air trapped on a rough surface." },
      { id: "m7", channel: "paint", user_id: "u_nova", created_at: ago(400), body: "PSA: thin lacquers ~1:1.5 and spray around 15 psi for base coats." },
      { id: "m8", channel: "wip", user_id: "u_rook", created_at: ago(50), body: "Feet are done, moving to the torso tonight." },
      { id: "m9", channel: "trades", user_id: "u_kai", created_at: ago(700), body: "Have spare HG beam rifles x3, looking for a 1/144 display base." },
    ],
  });

  const load = () => { try { const d = JSON.parse(localStorage.getItem(KEY)); if (d?.users) return d; } catch {} return seed(); };
  let data = load();
  const emit = () => changeFns.forEach((f) => f());
  const persist = () => { localStorage.setItem(KEY, JSON.stringify(data)); bc?.postMessage("changed"); emit(); };
  const safePersist = (undo) => { try { persist(); } catch { undo(); throw new Error("Browser storage is full — try fewer or smaller photos."); } };
  if (bc) bc.onmessage = () => { data = load(); emit(); };

  const session = () => { try { return localStorage.getItem(SKEY); } catch { return null; } };
  const meRow = () => data.users.find((u) => u.id === session()) || null;
  const pub = (u) => u ? { id: u.id, username: u.username, avatar_url: u.avatar_url || "" } : null;
  const user = (id) => pub(data.users.find((u) => u.id === id));
  const requireUser = () => { const u = meRow(); if (!u) throw new Error("Please sign in first."); return u; };
  const canEdit = (row) => { const u = meRow(); return u && (u.id === row.user_id || u.is_admin); };
  const setSession = (id) => { try { id ? localStorage.setItem(SKEY, id) : localStorage.removeItem(SKEY); } catch {} authFns.forEach((f) => f()); };
  const nameTaken = (name, exceptId) => data.users.some((u) => u.id !== exceptId && u.username.toLowerCase() === name.toLowerCase());
  const shapePost = (p) => ({
    ...p, image_urls: [...(p.image_urls || [])], author: user(p.user_id),
    like_count: data.likes.filter((l) => l.post_id === p.id).length,
    comment_count: data.comments.filter((c) => c.post_id === p.id).length,
  });

  return {
    mode: "demo",
    // ---- auth ----
    async currentUser() { const u = meRow(); return u ? { ...u } : null; },
    onAuthChange(fn) { authFns.push(fn); },
    async signUp({ email, username }) {
      if (data.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new Error("An account with that email already exists. Try signing in.");
      if (nameTaken(username)) throw new Error("That username is taken.");
      const u = { id: "u_" + uid(), email, username, bio: "", specialties: [], open_commissions: false, website: "", instagram: "", youtube: "", is_admin: false, created_at: new Date().toISOString() };
      data.users.push(u);
      safePersist(() => data.users.pop());
      setSession(u.id);
      return { needsConfirm: false };
    },
    async signIn({ email }) {
      const u = data.users.find((x) => x.email.toLowerCase() === email.toLowerCase());
      if (!u) throw new Error("No account with that email.");
      setSession(u.id);
    },
    async signInWithGitHub() { throw new Error("GitHub sign-in works once the site is connected to Supabase."); },
    async signOut() { setSession(null); },
    async resetPassword() { throw new Error("Password reset works once the site is connected to Supabase."); },
    async updatePassword() {},
    // ---- profiles ----
    async getProfile(username) {
      const u = data.users.find((x) => x.username.toLowerCase() === String(username).toLowerCase());
      if (!u) return null;
      const { email, ...rest } = u;
      return { ...rest };
    },
    async updateProfile(fields) {
      const u = requireUser();
      if (fields.username && nameTaken(fields.username, u.id)) throw new Error("That username is taken.");
      const before = { ...u };
      Object.assign(u, fields);
      safePersist(() => Object.assign(u, before));
    },
    async uploadAvatar(file) { requireUser(); return resizeImage(file, 256, 0.8); },
    async listProfiles(limit = 8) {
      return [...data.users].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, limit)
        .map(({ email, ...rest }) => ({ ...rest }));
    },
    // ---- posts ----
    async listPosts({ userId } = {}) {
      return data.posts.filter((p) => !userId || p.user_id === userId).map(shapePost).sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
    async myLikes() { const u = meRow(); return u ? data.likes.filter((l) => l.user_id === u.id).map((l) => String(l.post_id)) : []; },
    async setLike(postId, on) {
      const u = requireUser();
      data.likes = data.likes.filter((l) => !(l.post_id === postId && l.user_id === u.id));
      if (on) data.likes.push({ post_id: postId, user_id: u.id });
      persist();
    },
    async addPost(fields, files = []) {
      const u = requireUser();
      const image_urls = await Promise.all(files.map((f) => resizeImage(f, 900, 0.7)));
      const post = { id: uid(), user_id: u.id, created_at: new Date().toISOString(), image_urls, ...fields };
      data.posts.push(post);
      safePersist(() => data.posts.pop());
      return post;
    },
    async updatePost(id, fields) {
      const p = data.posts.find((x) => x.id === id);
      if (!p || !canEdit(p)) throw new Error("You can only edit your own posts.");
      Object.assign(p, fields, { updated_at: new Date().toISOString() });
      persist();
    },
    async deletePost(id) {
      const p = data.posts.find((x) => x.id === id);
      if (!p || !canEdit(p)) throw new Error("You can only delete your own posts.");
      data.posts = data.posts.filter((x) => x.id !== id);
      data.comments = data.comments.filter((c) => c.post_id !== id);
      data.likes = data.likes.filter((l) => l.post_id !== id);
      persist();
    },
    // ---- comments ----
    async listComments(postId) {
      return data.comments.filter((c) => c.post_id === postId).map((c) => ({ ...c, author: user(c.user_id) })).sort((a, b) => a.created_at.localeCompare(b.created_at));
    },
    async addComment({ post_id, body }) {
      const u = requireUser();
      data.comments.push({ id: uid(), post_id, user_id: u.id, body, created_at: new Date().toISOString() });
      safePersist(() => data.comments.pop());
    },
    async deleteComment(id) {
      const c = data.comments.find((x) => x.id === id);
      if (!c || !canEdit(c)) throw new Error("You can only delete your own comments.");
      data.comments = data.comments.filter((x) => x.id !== id);
      persist();
    },
    // ---- chat ----
    async listMessages(channel) {
      return data.messages.filter((m) => m.channel === channel).map((m) => ({ ...m, author: user(m.user_id) }))
        .sort((a, b) => a.created_at.localeCompare(b.created_at)).slice(-100);
    },
    async sendMessage({ channel, body }) {
      const u = requireUser();
      data.messages.push({ id: uid(), channel, user_id: u.id, body, created_at: new Date().toISOString() });
      safePersist(() => data.messages.pop());
    },
    async deleteMessage(id) {
      const m = data.messages.find((x) => x.id === id);
      if (!m || !canEdit(m)) throw new Error("You can only delete your own messages.");
      data.messages = data.messages.filter((x) => x.id !== id);
      persist();
    },
    onChange(fn) { changeFns.push(fn); },
  };
}

// =========================================================
// DATA: LIVE (Supabase — real accounts, shared with everyone)
// =========================================================
async function supabaseDb() {
  await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.105.4/dist/umd/supabase.min.js");
  const sb = window.supabase.createClient(BACKEND.supabaseUrl, BACKEND.supabaseAnonKey);
  const changeFns = [], authFns = [];
  const ok = ({ data, error }) => { if (error) throw new Error(error.message); return data; };
  const redirectTo = location.origin + location.pathname;
  const AUTHOR = "author:profiles!%s_user_id_fkey(id,username,avatar_url)";
  const author = (table) => AUTHOR.replace("%s", table);
  const likeEsc = (s) => String(s).replace(/[\\%_]/g, "\\$&");
  let uidCache = null;

  sb.channel("kitforge-live")
    .on("postgres_changes", { event: "*", schema: "public" }, () => changeFns.forEach((f) => f()))
    .subscribe();
  sb.auth.onAuthStateChange((event, session) => {
    uidCache = session?.user?.id || null;
    setTimeout(() => authFns.forEach((f) => f(event)), 0); // avoid calling Supabase inside its own callback
  });

  const requireUid = async () => {
    const { data } = await sb.auth.getSession();
    const id = data.session?.user?.id;
    if (!id) throw new Error("Please sign in first.");
    return id;
  };
  const shapePost = (r) => ({
    ...r, image_urls: r.image_urls || [],
    like_count: r.post_likes?.[0]?.count ?? 0,
    comment_count: r.comments?.[0]?.count ?? 0,
  });
  const upload = async (bucket, uid, blob) => {
    const path = `${uid}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
    ok(await sb.storage.from(bucket).upload(path, blob, { contentType: "image/jpeg" }));
    return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };
  const storagePath = (url, bucket) => { const m = String(url).split(`/object/public/${bucket}/`)[1]; return m ? decodeURIComponent(m) : null; };

  return {
    mode: "live",
    // ---- auth ----
    async currentUser() {
      const { data } = await sb.auth.getSession();
      const u = data.session?.user;
      if (!u) return null;
      uidCache = u.id;
      let prof = null;
      for (let i = 0; i < 3 && !prof; i++) {  // the profile row is created by a trigger right after sign-up
        prof = ok(await sb.from("profiles").select("*").eq("id", u.id).maybeSingle());
        if (!prof) await new Promise((r) => setTimeout(r, 600));
      }
      return prof ? { ...prof, email: u.email } : null;
    },
    onAuthChange(fn) { authFns.push(fn); },
    async signUp({ email, password, username }) {
      const taken = ok(await sb.from("profiles").select("id").ilike("username", likeEsc(username)).limit(1));
      if (taken.length) throw new Error("That username is taken.");
      const res = ok(await sb.auth.signUp({ email, password, options: { data: { username }, emailRedirectTo: redirectTo } }));
      return { needsConfirm: !res.session };
    },
    async signIn({ email, password }) { ok(await sb.auth.signInWithPassword({ email, password })); },
    async signInWithGitHub() { ok(await sb.auth.signInWithOAuth({ provider: "github", options: { redirectTo } })); },
    async signOut() { ok(await sb.auth.signOut()); },
    async resetPassword(email) { ok(await sb.auth.resetPasswordForEmail(email, { redirectTo })); },
    async updatePassword(password) { ok(await sb.auth.updateUser({ password })); },
    // ---- profiles ----
    async getProfile(username) {
      return ok(await sb.from("profiles").select("*").ilike("username", likeEsc(username)).maybeSingle());
    },
    async updateProfile(fields) {
      const id = await requireUid();
      if (fields.username) {
        const taken = ok(await sb.from("profiles").select("id").ilike("username", likeEsc(fields.username)).neq("id", id).limit(1));
        if (taken.length) throw new Error("That username is taken.");
      }
      ok(await sb.from("profiles").update(fields).eq("id", id));
    },
    async uploadAvatar(file) { const id = await requireUid(); return upload("avatars", id, await resizeImage(file, 256, 0.85, true)); },
    async listProfiles(limit = 8) {
      return ok(await sb.from("profiles").select("id,username,avatar_url,bio,specialties,open_commissions,is_admin,created_at")
        .order("created_at", { ascending: false }).limit(limit));
    },
    // ---- posts ----
    async listPosts({ userId } = {}) {
      let q = sb.from("posts").select(`*, ${author("posts")}, post_likes(count), comments(count)`).order("created_at", { ascending: false }).limit(60);
      if (userId) q = q.eq("user_id", userId);
      return ok(await q).map(shapePost);
    },
    async myLikes() {
      if (!uidCache) return [];
      return ok(await sb.from("post_likes").select("post_id").eq("user_id", uidCache)).map((r) => String(r.post_id));
    },
    async setLike(postId, on) {
      const id = await requireUid();
      ok(on ? await sb.from("post_likes").insert({ post_id: postId, user_id: id })
            : await sb.from("post_likes").delete().match({ post_id: postId, user_id: id }));
    },
    async addPost(fields, files = []) {
      const id = await requireUid();
      const image_urls = [];
      for (const f of files) image_urls.push(await upload("builds", id, await resizeImage(f, 1600, 0.85, true)));
      return ok(await sb.from("posts").insert({ ...fields, user_id: id, image_urls }).select().single());
    },
    async updatePost(postId, fields) { ok(await sb.from("posts").update({ ...fields, updated_at: new Date().toISOString() }).eq("id", postId)); },
    async deletePost(postId) {
      const post = ok(await sb.from("posts").select("image_urls").eq("id", postId).maybeSingle());
      ok(await sb.from("posts").delete().eq("id", postId));
      const paths = (post?.image_urls || []).map((u) => storagePath(u, "builds")).filter(Boolean);
      if (paths.length) await sb.storage.from("builds").remove(paths); // best effort; admins can't remove others' files
    },
    // ---- comments ----
    async listComments(postId) {
      return ok(await sb.from("comments").select(`*, ${author("comments")}`).eq("post_id", postId).order("created_at"));
    },
    async addComment({ post_id, body }) { const id = await requireUid(); ok(await sb.from("comments").insert({ post_id, body, user_id: id })); },
    async deleteComment(id) { ok(await sb.from("comments").delete().eq("id", id)); },
    // ---- chat ----
    async listMessages(channel) {
      const rows = ok(await sb.from("messages").select(`*, ${author("messages")}`).eq("channel", channel).order("created_at", { ascending: false }).limit(100));
      return rows.reverse();
    },
    async sendMessage({ channel, body }) { const id = await requireUid(); ok(await sb.from("messages").insert({ channel, body, user_id: id })); },
    async deleteMessage(id) { ok(await sb.from("messages").delete().eq("id", id)); },
    onChange(fn) { changeFns.push(fn); },
  };
}

// =========================================================
// UI
// =========================================================
let db;
let me = null;            // signed-in profile (with email, is_admin) or null
let myLikes = new Set();
let posts = [];
let feedFilter = "latest";
let channel = "general";
let openPostId = null;
let lastChatAt = 0;

const owns = (row) => me && row && (row.user_id === me.id || me.is_admin);
const sameId = (a, b) => String(a) === String(b);

/* Opens the sign-in modal when needed; returns true if already signed in. */
function requireSignIn(reason) {
  if (me) return true;
  openAuth("signup", reason);
  return false;
}

// ---------------- ACCOUNT MENU ----------------
function renderAccount() {
  const el = $("#navAccount");
  if (!me) {
    el.innerHTML = `<button class="acct-signin" data-auth="signin">Sign in</button>`;
    return;
  }
  el.innerHTML = `
    <div class="acct">
      <button class="acct-btn" id="acctBtn" aria-haspopup="true" aria-expanded="false">${avatar(me, 30)}<span>${esc(me.username)}</span></button>
      <div class="acct-menu panel" id="acctMenu" hidden>
        <div class="acct-email">${esc(me.email || "")}</div>
        <button data-act="profile">My profile</button>
        <button data-act="edit">Edit profile</button>
        <button data-act="share">Share a build</button>
        <button data-act="out">Sign out</button>
      </div>
    </div>`;
  $("#acctBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    const m = $("#acctMenu");
    m.hidden = !m.hidden;
    $("#acctBtn").setAttribute("aria-expanded", String(!m.hidden));
  });
  $("#acctMenu").addEventListener("click", async (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (!act) return;
    $("#acctMenu").hidden = true;
    if (act === "profile") openProfile(me.username);
    if (act === "edit") openEditProfile();
    if (act === "share") openPostEditor();
    if (act === "out") { await db.signOut(); toast("Signed out. See you next sortie."); }
  });
}
document.addEventListener("click", () => { const m = $("#acctMenu"); if (m) m.hidden = true; });

function renderGates() {
  $$(".cta-band").forEach((el) => (el.hidden = !!me));
  const input = $("#chatInput");
  input.placeholder = me ? `Message #${CHANNELS.find((c) => c.id === channel).name}` : "Sign in to join the chat";
  $("#chatIdentity").innerHTML = me
    ? `${avatar(me, 22)} <span>Chatting as ${userLink(me)}</span>`
    : `<button class="link-btn" data-auth="signup">Create a free account</button> <span>to chat, post builds and comment</span>`;
}

// ---------------- AUTH MODAL ----------------
function openAuth(mode = "signin", reason = "") {
  const signup = mode === "signup";
  openModal(`
    <div class="modal-body auth">
      <div class="eyebrow">// Pilot registration</div>
      <h3>${signup ? "Create your account" : "Welcome back"}</h3>
      ${reason ? `<p class="muted" style="margin-top:4px">${esc(reason)}</p>` : ""}
      <div class="auth-tabs">
        <button class="${signup ? "" : "on"}" data-auth="signin">Sign in</button>
        <button class="${signup ? "on" : ""}" data-auth="signup">Create account</button>
      </div>
      ${db.mode === "live" ? `<button class="btn btn-ghost gh-btn" id="ghBtn" type="button">
          <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
          Continue with GitHub</button><div class="or"><span>or use email</span></div>` : ""}
      <form id="authForm" class="share-form" novalidate>
        ${signup ? `<div class="field"><label for="aUser">Username</label>
          <input id="aUser" required maxlength="24" placeholder="ZakuWrangler" autocomplete="username">
          <small class="muted">3–24 letters, numbers or _. This is your public name.</small></div>` : ""}
        <div class="field"><label for="aEmail">Email</label><input id="aEmail" type="email" required autocomplete="email" placeholder="you@example.com"></div>
        <div class="field"><label for="aPass">Password</label><input id="aPass" type="password" required minlength="8" autocomplete="${signup ? "new-password" : "current-password"}" placeholder="${signup ? "At least 8 characters" : ""}"></div>
        <p class="form-status" role="status"></p>
        <div class="auth-actions">
          <button class="btn btn-primary" type="submit">${signup ? "Create account" : "Sign in"}</button>
          ${signup ? "" : `<button type="button" class="link-btn" id="forgotBtn">Forgot password?</button>`}
        </div>
        ${db.mode === "demo" ? `<p class="muted small">Demo mode: accounts live only in this browser and passwords aren't checked. Try signing in as <b>hex@demo.kitforge</b>.</p>` : ""}
      </form>
    </div>`);

  const status = $("#authForm .form-status");
  const fail = (msg) => { status.className = "form-status err"; status.textContent = msg; };
  $("#ghBtn")?.addEventListener("click", () => db.signInWithGitHub().catch((e) => fail(e.message)));
  $("#forgotBtn")?.addEventListener("click", async () => {
    const email = $("#aEmail").value.trim();
    if (!email) return fail("Enter your email above first, then click Forgot password.");
    try { await db.resetPassword(email); status.className = "form-status ok"; status.textContent = "Check your email for a reset link."; }
    catch (e) { fail(e.message); }
  });

  $("#authForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = $("#aEmail").value.trim();
    const password = $("#aPass").value;
    const username = $("#aUser")?.value.trim();
    if (signup && !USERNAME_RE.test(username)) return fail("Username must be 3–24 letters, numbers or underscores.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("Enter a valid email address.");
    if (password.length < 8 && (signup || db.mode === "live")) return fail("Password must be at least 8 characters.");
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
      if (signup) {
        const { needsConfirm } = await db.signUp({ email, password, username });
        if (needsConfirm) {
          $("#modalContent").innerHTML = `<div class="modal-body"><div class="eyebrow">// Almost there</div><h3>Check your email</h3>
            <p class="muted" style="margin-top:8px">We sent a confirmation link to <b>${esc(email)}</b>. Click it to activate your account, then come back here.</p></div>`;
          return;
        }
        closeModal();
        toast(`Welcome aboard, ${username}! Set up your profile from the menu up top.`);
      } else {
        await db.signIn({ email, password });
        closeModal();
        toast("Signed in. Welcome back, pilot.");
      }
    } catch (err) {
      fail(err.message);
      btn.disabled = false;
    }
  });
}

function openNewPassword() {
  openModal(`
    <div class="modal-body">
      <div class="eyebrow">// Account recovery</div><h3>Set a new password</h3>
      <form id="pwForm" class="share-form">
        <div class="field"><label for="newPw">New password</label><input id="newPw" type="password" minlength="8" required autocomplete="new-password"></div>
        <p class="form-status" role="status"></p>
        <button class="btn btn-primary" type="submit">Save password</button>
      </form>
    </div>`);
  $("#pwForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try { await db.updatePassword($("#newPw").value); closeModal(); toast("Password updated."); }
    catch (err) { const s = $("#pwForm .form-status"); s.className = "form-status err"; s.textContent = err.message; }
  });
}

// ---------------- PROFILES ----------------
async function openProfile(username) {
  let p, theirPosts;
  try {
    p = await db.getProfile(username);
    if (!p) return toast(`No pilot named "${username}".`);
    theirPosts = await db.listPosts({ userId: p.id });
  } catch (e) { return toast("Couldn't load profile: " + e.message); }
  const isMe = me && me.id === p.id;
  const likes = theirPosts.reduce((s, x) => s + x.like_count, 0);
  const links = [["Website", p.website], ["Instagram", p.instagram], ["YouTube", p.youtube]]
    .filter(([, u]) => safeUrl(u))
    .map(([label, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer nofollow">${label} ↗</a>`).join("");
  openPostId = null;
  try { history.replaceState(null, "", `#u/${encodeURIComponent(p.username)}`); } catch {}

  openModal(`
    <div class="modal-body profile">
      <div class="prof-head">
        ${avatar(p, 84)}
        <div>
          <div class="eyebrow">Pilot since ${new Date(p.created_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</div>
          <h3>${esc(p.username)}</h3>
          ${p.open_commissions ? `<span class="open-badge yes">● OPEN FOR COMMISSIONS</span>` : ""}
          ${p.is_admin ? `<span class="open-badge" style="background:#2f6fff22;color:var(--blue)">MOD</span>` : ""}
        </div>
      </div>
      ${p.bio ? `<p class="post-body" style="margin-top:14px">${esc(p.bio)}</p>` : isMe ? `<p class="muted" style="margin-top:14px">Add a bio so people know what you build.</p>` : ""}
      ${(p.specialties || []).length ? `<div class="spec-chips">${p.specialties.map((s) => `<span>${esc(s)}</span>`).join("")}</div>` : ""}
      ${links ? `<div class="prof-links">${links}</div>` : ""}
      <div class="prof-stats"><div><b>${theirPosts.length}</b>builds</div><div><b>${likes}</b>likes</div></div>
      <div class="prof-actions">
        ${isMe ? `<button class="btn btn-primary btn-sm" data-act-edit>Edit profile</button><button class="btn btn-ghost btn-sm" data-act-share>Share a build</button>` : ""}
        ${!isMe && p.open_commissions ? `<button class="btn btn-primary btn-sm" data-commission="${esc(p.username)}">Request a commission</button>` : ""}
        <button class="btn btn-ghost btn-sm" data-copy-link>Copy profile link</button>
      </div>
      <div class="eyebrow" style="margin:24px 0 12px">Builds</div>
      <div class="feed">${theirPosts.length ? theirPosts.map(postCard).join("") : `<div class="panel empty">${isMe ? "You haven't posted yet — share your first build!" : "No builds posted yet."}</div>`}</div>
    </div>`);
}

function openEditProfile() {
  if (!requireSignIn("Sign in to edit your profile.")) return;
  openModal(`
    <div class="modal-body">
      <div class="eyebrow">// Pilot file</div><h3>Edit profile</h3>
      <form id="profForm" class="share-form">
        <div class="avatar-edit">
          <span id="avPreview">${avatar(me, 72)}</span>
          <label class="btn btn-ghost btn-sm">Change photo<input type="file" id="avFile" accept="image/*" hidden></label>
        </div>
        <div class="field"><label for="pUser">Username</label><input id="pUser" maxlength="24" required value="${esc(me.username)}"></div>
        <div class="field"><label for="pBio">Bio</label><textarea id="pBio" maxlength="${LIMITS.bio}" placeholder="What do you build? How long have you been at it?">${esc(me.bio || "")}</textarea></div>
        <div class="field"><label for="pSpec">Specialties (comma separated, up to ${LIMITS.specialties})</label>
          <input id="pSpec" maxlength="120" value="${esc((me.specialties || []).join(", "))}" placeholder="Airbrush, Weathering, Kitbash"></div>
        <label class="check-row"><input type="checkbox" id="pOpen" ${me.open_commissions ? "checked" : ""}> I'm open for commissions</label>
        <div class="share-row">
          <div class="field"><label for="pWeb">Website</label><input id="pWeb" type="url" value="${esc(me.website || "")}" placeholder="https://"></div>
          <div class="field"><label for="pInsta">Instagram</label><input id="pInsta" type="url" value="${esc(me.instagram || "")}" placeholder="https://instagram.com/…"></div>
        </div>
        <div class="field"><label for="pYt">YouTube</label><input id="pYt" type="url" value="${esc(me.youtube || "")}" placeholder="https://youtube.com/@…"></div>
        <p class="form-status" role="status"></p>
        <button class="btn btn-primary" type="submit">Save profile</button>
      </form>
    </div>`);

  let avFile = null;
  $("#avFile").addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try { checkImage(f); } catch (err) { return toast(err.message); }
    avFile = f;
    $("#avPreview").innerHTML = `<img class="c-avatar" style="width:72px;height:72px" src="${URL.createObjectURL(f)}" alt="">`;
  });

  $("#profForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = $("#profForm .form-status");
    const fail = (m) => { status.className = "form-status err"; status.textContent = m; };
    const username = $("#pUser").value.trim();
    if (!USERNAME_RE.test(username)) return fail("Username must be 3–24 letters, numbers or underscores.");
    const urls = { website: $("#pWeb").value.trim(), instagram: $("#pInsta").value.trim(), youtube: $("#pYt").value.trim() };
    for (const [k, v] of Object.entries(urls)) if (v && !safeUrl(v)) return fail(`${k[0].toUpperCase() + k.slice(1)} link must start with https://`);
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = "Saving…";
    try {
      const fields = {
        username,
        bio: $("#pBio").value.trim().slice(0, LIMITS.bio),
        specialties: $("#pSpec").value.split(",").map((s) => s.trim().slice(0, 24)).filter(Boolean).slice(0, LIMITS.specialties),
        open_commissions: $("#pOpen").checked,
        website: urls.website || null, instagram: urls.instagram || null, youtube: urls.youtube || null,
      };
      if (avFile) fields.avatar_url = await db.uploadAvatar(avFile);
      await db.updateProfile(fields);
      me = await db.currentUser();
      renderAccount(); renderGates(); refreshAll();
      toast("Profile saved.");
      openProfile(me.username);
    } catch (err) {
      fail(err.message);
      btn.disabled = false; btn.textContent = "Save profile";
    }
  });
}

// ---------------- POSTS ----------------
function postThumb(p, seed, i = 0) {
  const url = p.image_urls?.[i];
  return url ? `<img src="${esc(url)}" alt="${esc(p.title)}" loading="lazy">`
    : mechSVG(p.colors || ["#2a3550", "#8a96b0", "#f4f6fb", "#2f6fff"], seed);
}

function postCard(p, i = 0) {
  const liked = myLikes.has(String(p.id));
  return `
    <article class="panel post" data-post="${esc(p.id)}">
      <div class="thumb">
        ${postThumb(p, 40 + i)}
        ${p.grade ? `<span class="grade-badge">${esc(p.grade)}</span>` : ""}
        <span class="stage ${p.stage === "WIP" ? "wip" : "done"}">${p.stage === "WIP" ? "WIP" : "FINISHED"}</span>
        ${p.image_urls?.length > 1 ? `<span class="photo-count">▦ ${p.image_urls.length}</span>` : ""}
      </div>
      <div class="info">
        <h4>${esc(p.title)}</h4>
        <div class="post-meta">${avatar(p.author, 22)} ${userLink(p.author)} · <span>${timeAgo(p.created_at)}</span></div>
        <div class="post-actions">
          <button class="like ${liked ? "on" : ""}" data-like-post="${esc(p.id)}" aria-label="Like">♥ <span>${p.like_count}</span></button>
          <span class="cmt">💬 ${p.comment_count}</span>
        </div>
      </div>
    </article>`;
}

function renderFeed() {
  let list = [...posts];
  if (feedFilter === "top") list.sort((a, b) => b.like_count - a.like_count);
  if (feedFilter === "wip") list = list.filter((p) => p.stage === "WIP");
  if (feedFilter === "finished") list = list.filter((p) => p.stage === "Finished");
  if (feedFilter === "mine") list = me ? list.filter((p) => p.user_id === me.id) : [];
  $("#feed").innerHTML = list.length ? list.map(postCard).join("")
    : `<div class="panel empty">${feedFilter === "mine" ? "You haven't posted yet — share your first build!" : "No posts here yet — be the first to share one."}</div>`;
  $("#postCount").textContent = posts.length;
}

async function refreshFeed() {
  try {
    const [p, l] = await Promise.all([db.listPosts(), db.myLikes()]);
    posts = p; myLikes = new Set(l);
    renderFeed();
  } catch (e) {
    $("#feed").innerHTML = `<div class="panel empty">Couldn't load the feed: ${esc(e.message)}</div>`;
  }
}

async function toggleLike(id) {
  if (!requireSignIn("Create an account to like builds.")) return;
  const key = String(id);
  const on = !myLikes.has(key);
  on ? myLikes.add(key) : myLikes.delete(key);
  const p = posts.find((x) => sameId(x.id, id));
  if (p) p.like_count = Math.max(0, p.like_count + (on ? 1 : -1));
  $$(`[data-like-post="${CSS.escape(key)}"]`).forEach((b) => {
    b.classList.toggle("on", on);
    if (p) b.querySelector("span").textContent = p.like_count;
  });
  try { await db.setLike(p ? p.id : id, on); }
  catch (e) { toast("Couldn't save like: " + e.message); refreshFeed(); }
}

async function openPost(id) {
  const p = posts.find((x) => sameId(x.id, id)) || (await db.listPosts()).find((x) => sameId(x.id, id));
  if (!p) return;
  openPostId = String(p.id);
  const imgs = p.image_urls || [];
  openModal(`
    <div class="thumb post-hero" id="postHero">${postThumb(p, 99)}</div>
    ${imgs.length > 1 ? `<div class="thumb-strip">${imgs.map((u, i) => `<button class="${i ? "" : "on"}" data-img="${i}"><img src="${esc(u)}" alt="Photo ${i + 1}"></button>`).join("")}</div>` : ""}
    <div class="modal-body">
      <div class="eyebrow">${esc(p.grade || "")} · ${p.stage === "WIP" ? "Work in progress" : "Finished build"}</div>
      <h3>${esc(p.title)}</h3>
      <div class="post-meta" style="margin:8px 0 14px">${avatar(p.author, 26)} ${userLink(p.author)} · ${timeAgo(p.created_at)}${p.updated_at ? " · edited" : ""}</div>
      ${p.body ? `<p class="post-body">${esc(p.body)}</p>` : ""}
      <div class="post-actions" style="margin-top:16px">
        <button class="like ${myLikes.has(String(p.id)) ? "on" : ""}" data-like-post="${esc(p.id)}">♥ <span>${p.like_count}</span></button>
        ${owns(p) ? `<button class="link-btn" data-edit-post>Edit</button><button class="link-btn danger" data-del-post>Delete</button>` : ""}
      </div>
      <div class="eyebrow" style="margin-top:22px">Comments</div>
      <div id="commentList" class="comment-list"><p class="muted">Loading…</p></div>
      ${me ? `<form id="commentForm" class="comment-form">
          ${avatar(me, 30)}
          <input id="commentInput" maxlength="${LIMITS.comment}" placeholder="Give feedback or say nice things…" required>
          <button class="btn btn-primary btn-sm" type="submit">Post</button>
        </form>`
      : `<button class="btn btn-ghost btn-sm" data-auth="signup">Sign in to comment</button>`}
    </div>`);

  $$(".thumb-strip [data-img]").forEach((b) => b.addEventListener("click", () => {
    $("#postHero").innerHTML = postThumb(p, 99, +b.dataset.img);
    $$(".thumb-strip button").forEach((x) => x.classList.toggle("on", x === b));
  }));
  $("[data-edit-post]")?.addEventListener("click", () => openPostEditor(p));
  $("[data-del-post]")?.addEventListener("click", async () => {
    if (!confirm(`Delete "${p.title}"? This can't be undone.`)) return;
    try { await db.deletePost(p.id); closeModal(); toast("Post deleted."); refreshFeed(); }
    catch (e) { toast("Couldn't delete: " + e.message); }
  });
  $("#commentForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = $("#commentInput");
    const body = input.value.trim().slice(0, LIMITS.comment);
    if (!body) return;
    try {
      await db.addComment({ post_id: p.id, body });
      input.value = "";
      await renderComments(p.id);
      refreshFeed();
    } catch (err) { toast("Couldn't post comment: " + err.message); }
  });
  renderComments(p.id);
}

async function renderComments(postId) {
  const box = $("#commentList");
  if (!box) return;
  try {
    const list = await db.listComments(postId);
    box.innerHTML = list.length ? list.map((c) => `
      <div class="comment">${avatar(c.author, 28)}
        <div style="flex:1;min-width:0">
          <div class="c-head">${userLink(c.author)} <span>${timeAgo(c.created_at)}</span>
            ${owns(c) ? `<button class="del-x" data-del-comment="${esc(c.id)}" title="Delete comment" aria-label="Delete comment">✕</button>` : ""}</div>
          <p>${esc(c.body)}</p>
        </div>
      </div>`).join("") : `<p class="muted">No comments yet. Start the conversation.</p>`;
  } catch (e) { box.innerHTML = `<p class="muted">Couldn't load comments: ${esc(e.message)}</p>`; }
}

/* Create a new post, or edit an existing one (text fields only). */
function openPostEditor(existing = null) {
  if (!requireSignIn("Create a free account to share your builds.")) return;
  const editing = !!existing;
  openModal(`
    <div class="modal-body">
      <div class="eyebrow">// ${editing ? "Edit post" : "Share to the hangar"}</div>
      <h3>${editing ? "Edit your build" : "Post your build"}</h3>
      <form id="shareForm" class="share-form">
        ${editing ? (existing.image_urls?.length ? `<p class="muted small">Photos can't be changed after posting. Delete and re-post to change them.</p>` : "") : `
        <div class="photo-grid" id="photoGrid"></div>
        <label class="drop" id="drop">
          <input type="file" id="shareFile" accept="image/*" multiple hidden>
          <span>📷 Add photos <small>Up to ${LIMITS.photos} · JPG/PNG · first photo is the cover</small></span>
        </label>`}
        <div class="field"><label for="shareTitle">Title</label>
          <input id="shareTitle" maxlength="${LIMITS.title}" required placeholder="What are you building?" value="${esc(existing?.title || "")}"></div>
        <div class="share-row">
          <div class="field"><label for="shareGrade">Grade</label>
            <select id="shareGrade">${GRADES.map((g) => `<option ${g === (existing?.grade || "HG") ? "selected" : ""}>${g}</option>`).join("")}</select></div>
          <div class="field"><label for="shareStage">Stage</label>
            <select id="shareStage">
              <option value="WIP" ${existing?.stage !== "Finished" ? "selected" : ""}>Work in progress</option>
              <option value="Finished" ${existing?.stage === "Finished" ? "selected" : ""}>Finished</option>
            </select></div>
        </div>
        <div class="field"><label for="shareBody">Details</label>
          <textarea id="shareBody" maxlength="${LIMITS.body}" placeholder="Paints, techniques, what you want feedback on…">${esc(existing?.body || "")}</textarea></div>
        <p class="form-status" role="status"></p>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <button class="btn btn-primary" type="submit">${editing ? "Save changes" : "Post build"}</button>
          <span class="muted small">${db.mode === "demo" ? "Demo mode: only visible in this browser" : "Visible to everyone"}</span>
        </div>
      </form>
    </div>`);

  let files = [];
  const renderPhotos = () => {
    $("#photoGrid").innerHTML = files.map((f, i) => `
      <div class="ph"><img src="${f.preview}" alt="">${i === 0 ? `<span>COVER</span>` : ""}
        <button type="button" data-rm="${i}" aria-label="Remove photo">✕</button></div>`).join("");
    $("#drop").hidden = files.length >= LIMITS.photos;
  };
  $("#shareFile")?.addEventListener("change", (e) => {
    for (const f of e.target.files) {
      if (files.length >= LIMITS.photos) { toast(`Max ${LIMITS.photos} photos per post.`); break; }
      try { checkImage(f); files.push(Object.assign(f, { preview: URL.createObjectURL(f) })); } catch (err) { toast(err.message); }
    }
    e.target.value = "";
    renderPhotos();
  });
  $("#photoGrid")?.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-rm]");
    if (rm) { files.splice(+rm.dataset.rm, 1); renderPhotos(); }
  });

  $("#shareForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const status = $("#shareForm .form-status");
    const title = $("#shareTitle").value.trim().slice(0, LIMITS.title);
    if (!title) { status.className = "form-status err"; status.textContent = "Give your build a title."; return; }
    const fields = { title, grade: $("#shareGrade").value, stage: $("#shareStage").value, body: $("#shareBody").value.trim().slice(0, LIMITS.body) };
    const label = btn.textContent;
    btn.disabled = true; btn.textContent = files.length ? "Uploading photos…" : "Saving…";
    try {
      if (editing) {
        await db.updatePost(existing.id, fields);
        await refreshFeed();
        toast("Post updated.");
        openPost(existing.id);
      } else {
        await db.addPost(fields, files);
        closeModal();
        feedFilter = "latest";
        $$("#feedFilters .chip").forEach((c) => c.classList.toggle("on", c.dataset.feed === "latest"));
        await refreshFeed();
        toast("Posted! Your build is in the feed.");
      }
    } catch (err) {
      status.className = "form-status err";
      status.textContent = "Couldn't save: " + err.message;
      btn.disabled = false; btn.textContent = label;
    }
  });
}

// ---------------- CHAT ----------------
function renderChannels() {
  $("#channelList").innerHTML = CHANNELS.map((c) =>
    `<button class="ch ${c.id === channel ? "on" : ""}" data-ch="${c.id}" title="${esc(c.desc)}"># ${esc(c.name)}</button>`).join("");
  const c = CHANNELS.find((x) => x.id === channel);
  $("#chatTitle").innerHTML = `# ${esc(c.name)} <small>${esc(c.desc)}</small>`;
  renderGates();
}

async function refreshChat(scroll = true) {
  const box = $("#chatLog");
  const nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
  try {
    const msgs = await db.listMessages(channel);
    let prev = null;
    box.innerHTML = msgs.length ? msgs.map((m) => {
      const grouped = prev && prev.user_id === m.user_id && new Date(m.created_at) - new Date(prev.created_at) < 300000;
      prev = m;
      const del = owns(m) ? `<button class="del-x" data-del-msg="${esc(m.id)}" title="Delete message" aria-label="Delete message">✕</button>` : "";
      return grouped
        ? `<div class="msg cont"><p>${esc(m.body)}</p>${del}</div>`
        : `<div class="msg">${avatar(m.author)}<div style="flex:1;min-width:0"><div class="c-head">${userLink(m.author)} <span>${timeAgo(m.created_at)}</span></div><p>${esc(m.body)}</p></div>${del}</div>`;
    }).join("") : `<p class="muted chat-empty">Nothing here yet. Say hello 👋</p>`;
    $$("#chatLog .user-link").forEach((b) => (b.style.color = nameColor(b.dataset.user)));
    if (scroll || nearBottom) box.scrollTop = box.scrollHeight;
  } catch (e) { box.innerHTML = `<p class="muted chat-empty">Couldn't load chat: ${esc(e.message)}</p>`; }
}

async function sendChat(e) {
  e.preventDefault();
  if (!requireSignIn("Create a free account to join the chat.")) return;
  const input = $("#chatInput");
  const body = input.value.trim().slice(0, LIMITS.chat);
  if (!body) return;
  if (Date.now() - lastChatAt < LIMITS.chatCooldownMs) return toast("Easy, pilot — one message at a time.");
  lastChatAt = Date.now();
  input.value = "";
  try { await db.sendMessage({ channel, body }); await refreshChat(true); }
  catch (err) { input.value = body; toast("Couldn't send: " + err.message); }
  input.focus();
}

// ---------------- GLOBAL CLICKS ----------------
document.addEventListener("click", async (e) => {
  const t = e.target;
  const auth = t.closest("[data-auth]");
  if (auth) { e.preventDefault(); return openAuth(auth.dataset.auth); }
  const u = t.closest("[data-user]");
  if (u) { e.stopPropagation(); return openProfile(u.dataset.user); }
  const like = t.closest("[data-like-post]");
  if (like) { e.stopPropagation(); return toggleLike(like.dataset.likePost); }
  const dc = t.closest("[data-del-comment]");
  if (dc) {
    if (!confirm("Delete this comment?")) return;
    try { await db.deleteComment(isNaN(dc.dataset.delComment) ? dc.dataset.delComment : +dc.dataset.delComment); renderComments(openPostId); refreshFeed(); }
    catch (err) { toast(err.message); }
    return;
  }
  const dm = t.closest("[data-del-msg]");
  if (dm) {
    if (!confirm("Delete this message?")) return;
    try { await db.deleteMessage(isNaN(dm.dataset.delMsg) ? dm.dataset.delMsg : +dm.dataset.delMsg); refreshChat(false); }
    catch (err) { toast(err.message); }
    return;
  }
  if (t.closest("[data-act-edit]")) return openEditProfile();
  if (t.closest("[data-act-share]")) return openPostEditor();
  const comm = t.closest("[data-commission]");
  if (comm) {
    location.href = `commissions.html?for=${encodeURIComponent(comm.dataset.commission)}#quote`;
    return;
  }
  if (t.closest("[data-copy-link]")) {
    try { await navigator.clipboard.writeText(location.href); toast("Profile link copied."); } catch { toast(location.href); }
    return;
  }
  const card = t.closest("[data-post]");
  if (card && (card.closest("#feed") || card.closest("#modalContent"))) openPost(card.dataset.post);
});

// Clean up when the modal closes (link hash, open post).
new MutationObserver(() => {
  if ($("#modal").classList.contains("open")) return;
  openPostId = null;
  if (location.hash.startsWith("#u/")) try { history.replaceState(null, "", location.pathname + location.search); } catch {}
}).observe($("#modal"), { attributes: true, attributeFilter: ["class"] });

function routeHash() {
  const m = location.hash.match(/^#u\/(.+)$/);
  if (m) openProfile(decodeURIComponent(m[1]));
}

// ---------------- INIT ----------------
let refreshTimer;
/* Pilot roster: the newest real members (no sample people in live mode). */
async function refreshRoster() {
  const el = $("#creatorGrid");
  if (!el) return;
  try {
    const list = await db.listProfiles(8);
    el.innerHTML = list.length ? list.map((p) => `
      <div class="panel creator">
        ${avatar(p, 72)}
        ${p.open_commissions ? `<span class="open-badge yes">● OPEN FOR COMMISSIONS</span>` : ""}
        <h4>${esc(p.username)}</h4>
        <p class="spec">${esc((p.specialties || []).join(" · ") || "Builder")}</p>
        <button class="btn btn-ghost btn-sm" data-user="${esc(p.username)}">View profile</button>
      </div>`).join("")
      : `<div class="panel empty">No pilots yet — create an account and be the first on the roster.</div>`;
  } catch (e) {
    el.innerHTML = `<div class="panel empty">Couldn't load pilots: ${esc(e.message)}</div>`;
  }
}

function refreshAll() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refreshFeed();
    refreshRoster();
    refreshChat(false);
    if (openPostId && $("#commentList")) renderComments(openPostId);
  }, 150);
}

async function onAuth(event) {
  me = await db.currentUser().catch(() => null);
  renderAccount();
  renderGates();
  refreshAll();
  if (event === "PASSWORD_RECOVERY") openNewPassword();
}

async function initCommunity() {
  const live = BACKEND.supabaseUrl && BACKEND.supabaseAnonKey;
  try { db = live ? await supabaseDb() : localDb(); }
  catch (e) {
    console.error(e);
    toast("Couldn't connect to the live community — showing demo mode.");
    db = localDb();
  }

  $("#modeBanner").innerHTML = db.mode === "live"
    ? `<span class="dot"></span> LIVE — accounts, posts and chat are shared with everyone`
    : `<span class="dot demo"></span> DEMO MODE — accounts &amp; posts are saved only in this browser. Site owner: see SETUP.md to go live.`;
  $("#modeBanner").classList.toggle("live", db.mode === "live");

  $("#feedFilters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    if (chip.dataset.feed === "mine" && !requireSignIn("Sign in to see your builds.")) return;
    feedFilter = chip.dataset.feed;
    $$("#feedFilters .chip").forEach((c) => c.classList.toggle("on", c === chip));
    renderFeed();
  });
  $$("[data-share]").forEach((b) => b.addEventListener("click", () => openPostEditor()));
  $("#channelList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-ch]");
    if (!b) return;
    channel = b.dataset.ch;
    renderChannels();
    refreshChat(true);
  });
  $("#chatForm").addEventListener("submit", sendChat);
  $("#chatInput").addEventListener("focus", () => { if (!me) { $("#chatInput").blur(); requireSignIn("Create a free account to join the chat."); } });

  db.onChange(refreshAll);
  db.onAuthChange(onAuth);
  me = await db.currentUser().catch(() => null);
  renderAccount();
  renderChannels();
  await Promise.all([refreshFeed(), refreshChat(true), refreshRoster()]);
  routeHash();
  window.addEventListener("hashchange", routeHash);
  setInterval(() => { renderFeed(); refreshChat(false); }, 60000); // keep "5m ago" labels fresh
}

initCommunity();
