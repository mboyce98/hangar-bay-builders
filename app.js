/* =========================================================
   KITFORGE — site data & interactions
   Edit the DATA section to add your own builds, shop items,
   guides and creators. Replace `img` with a photo path
   (e.g. "photos/my-build.jpg") to use a real picture.
   ========================================================= */

// ---------------- FORM SETUP ----------------
/* Paste your form endpoints here to receive submissions by email.
   Works with Formspree (recommended, free tier: 50 submissions/month):
     1. Sign up at https://formspree.io and click "New Form"
     2. Copy the endpoint it gives you, e.g. "https://formspree.io/f/abcdwxyz"
     3. Paste it below. You can use one form for both, or two separate forms.
   While an endpoint is empty the form runs in DEMO MODE: nothing is sent,
   and the visitor is told so. */
const FORMS = {
  commission: "",  // e.g. "https://formspree.io/f/abcdwxyz"
  newsletter: "",  // e.g. "https://formspree.io/f/qrstuvwx"
};

// ---------------- DATA ----------------
const BUILDS = [
  { id: 1, name: "Vanguard Custom", grade: "MG", builder: "Hex", likes: 214, custom: true, status: "comm", colors: ["#f4f6fb", "#2f6fff", "#e5383b", "#ffc233"], tags: ["Airbrushed", "Weathered"], time: "62 hrs", paint: "Mr. Color lacquers" },
  { id: 2, name: "Desert Raider", grade: "HG", builder: "Rook", likes: 168, custom: true, status: "sale", price: 145, colors: ["#d8b47a", "#6b4f2a", "#3a3a3a", "#e5383b"], tags: ["Battle damage", "Diorama"], time: "28 hrs", paint: "Tamiya acrylics" },
  { id: 3, name: "Crimson Ace", grade: "RG", builder: "Nova", likes: 302, custom: false, colors: ["#e5383b", "#8a1b1d", "#1b1b1b", "#ffc233"], tags: ["Panel lined", "Topcoat"], time: "18 hrs", paint: "Gundam markers" },
  { id: 4, name: "Arctic Sentinel", grade: "MG", builder: "Hex", likes: 189, custom: true, status: "sale", price: 320, colors: ["#e9f2ff", "#9bb8d8", "#405a7a", "#3ddc97"], tags: ["Snow camo", "LED"], time: "54 hrs", paint: "Vallejo + Mr. Color" },
  { id: 5, name: "Night Ops Zaku-type", grade: "HG", builder: "Kai", likes: 141, custom: true, colors: ["#3b4a3a", "#1d241c", "#8a96b0", "#ff6b35"], tags: ["Stealth", "Chipping"], time: "22 hrs", paint: "Tamiya" },
  { id: 6, name: "Royal Guard", grade: "PG", builder: "Nova", likes: 455, custom: false, status: "comm", colors: ["#f4f6fb", "#c9a227", "#5b2a86", "#1b1b1b"], tags: ["Gold plating", "LED"], time: "110 hrs", paint: "Alclad metallics" },
  { id: 7, name: "Jungle Stalker", grade: "RG", builder: "Rook", likes: 97, custom: true, status: "sale", price: 180, colors: ["#4f6b3a", "#2d3d22", "#c2a878", "#e5383b"], tags: ["Mud", "Weathered"], time: "31 hrs", paint: "AK Interactive" },
  { id: 8, name: "Tricolor Classic", grade: "HG", builder: "Kai", likes: 126, custom: false, colors: ["#f4f6fb", "#2f6fff", "#e5383b", "#ffc233"], tags: ["Straight build", "Decals"], time: "6 hrs", paint: "None" },
];

const SHOP = [
  { name: "Desert Raider (finished)", type: "Finished build", grade: "HG", price: 145, cond: "ONE-OF-ONE", colors: ["#d8b47a", "#6b4f2a", "#3a3a3a", "#e5383b"] },
  { name: "Arctic Sentinel (finished)", type: "Finished build + LED", grade: "MG", price: 320, cond: "ONE-OF-ONE", colors: ["#e9f2ff", "#9bb8d8", "#405a7a", "#3ddc97"] },
  { name: "Jungle Stalker (finished)", type: "Finished build", grade: "RG", price: 180, cond: "ONE-OF-ONE", colors: ["#4f6b3a", "#2d3d22", "#c2a878", "#e5383b"] },
  { name: "Sealed kit — resale", type: "New in box", grade: "MG", price: 65, cond: "NEW / SEALED", colors: ["#2a3550", "#8a96b0", "#f4f6fb", "#2f6fff"] },
  { name: "Custom display base", type: "Accessory", grade: "ALL", price: 30, cond: "MADE TO ORDER", colors: ["#1b2334", "#ffc233", "#8a96b0", "#e5383b"] },
  { name: "Water-slide decal sheet", type: "Accessory", grade: "1/144", price: 12, cond: "IN STOCK", colors: ["#f4f6fb", "#e5383b", "#2f6fff", "#ffc233"] },
];

const GUIDES = [
  { icon: "✂", title: "Clean nub removal — the two-cut method", meta: "8 MIN READ · TOOLS: NIPPERS, KNIFE", lvl: "BEGINNER" },
  { icon: "✎", title: "Panel lining that doesn't smudge", meta: "6 MIN READ · ENAMEL WASH", lvl: "BEGINNER" },
  { icon: "▤", title: "Applying water-slide decals", meta: "10 MIN READ · DECAL SOFTENER", lvl: "BEGINNER" },
  { icon: "◐", title: "Matte vs gloss topcoats explained", meta: "7 MIN READ · RATTLE CANS", lvl: "BEGINNER" },
  { icon: "≈", title: "Seam line removal with cement", meta: "12 MIN READ · SANDING STICKS", lvl: "INTERMEDIATE" },
  { icon: "✺", title: "Airbrush 101 — thinning & PSI", meta: "15 MIN READ · AIRBRUSH SETUP", lvl: "INTERMEDIATE" },
  { icon: "⚡", title: "Chipping & battle damage", meta: "14 MIN READ · SPONGE, PIN VISE", lvl: "ADVANCED" },
  { icon: "◉", title: "Installing LED units", meta: "18 MIN READ · SOLDERING", lvl: "ADVANCED" },
];

const CREATORS = [
  { name: "Hex", spec: "Full customs · Airbrush", builds: 48, rating: 4.9, open: true, color: "#2f6fff" },
  { name: "Nova", spec: "PG & RG detail work", builds: 31, rating: 5.0, open: false, color: "#e5383b" },
  { name: "Rook", spec: "Weathering · Dioramas", builds: 39, rating: 4.8, open: true, color: "#ffc233" },
  { name: "Kai", spec: "Zaku-types · Kitbash", builds: 24, rating: 4.9, open: true, color: "#3ddc97" },
];

// Commission pricing (labor only, USD)
const PRICING = {
  grade: { SD: 10, HG: 20, RG: 40, MG: 60, PG: 150 },
  tier: { straight: 25, detail: 60, custom: 150 },
  multiplier: { straight: 1, detail: 1.4, custom: 2.2 },     // scales the grade base
  weeks: { SD: 1, HG: 1, RG: 2, MG: 3, PG: 6 },
  tierWeeks: { straight: 0, detail: 1, custom: 3 },
  sourcingFee: 0.15,
};

// ---------------- HELPERS ----------------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = (n) => "$" + Math.round(n).toLocaleString();

function store(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 3200);
}

/* Procedural placeholder art: an original full-body mech silhouette
   painted in each build's color scheme. Swap for real photos later. */
function mechSVG([a, b, c, d], seed = 1) {
  const pose = (seed % 3) - 1; // -1, 0, 1 lean
  return `
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="bg${seed}" cx="50%" cy="40%" r="70%">
        <stop offset="0" stop-color="${b}" stop-opacity=".35"/><stop offset="1" stop-color="#0b0e14"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg${seed})"/>
    <g stroke="#2a3550" stroke-width="1" opacity=".5">
      ${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="300"/>`).join("")}
    </g>
    <ellipse cx="200" cy="282" rx="110" ry="10" fill="#000" opacity=".5"/>
    <g transform="translate(200 150) rotate(${pose * 4}) translate(-200 -150)" stroke="#0b0e14" stroke-width="2.5" stroke-linejoin="round">
      <!-- backpack thrusters -->
      <path d="M160 92 L140 60 L150 56 L172 88Z M240 92 L260 60 L250 56 L228 88Z" fill="${c}"/>
      <!-- legs -->
      <path d="M172 168 L162 222 L156 276 L188 276 L192 222 L198 170Z" fill="${a}"/>
      <path d="M228 168 L238 222 L244 276 L212 276 L208 222 L202 170Z" fill="${a}"/>
      <path d="M162 222 L192 222 L190 238 L160 238Z M238 222 L208 222 L210 238 L240 238Z" fill="${b}"/>
      <path d="M150 268 L194 268 L196 282 L146 282Z M250 268 L206 268 L204 282 L254 282Z" fill="${d}"/>
      <!-- waist -->
      <path d="M170 150 L230 150 L236 172 L164 172Z" fill="${c}"/>
      <path d="M190 156 L210 156 L206 176 L194 176Z" fill="${d}"/>
      <!-- torso -->
      <path d="M160 92 L240 92 L248 128 L232 152 L168 152 L152 128Z" fill="${b}"/>
      <path d="M176 98 L224 98 L228 122 L172 122Z" fill="${a}"/>
      <rect x="182" y="104" width="12" height="8" fill="${d}"/><rect x="206" y="104" width="12" height="8" fill="${d}"/>
      <!-- shoulders -->
      <path d="M124 88 L160 84 L164 116 L126 120 L118 104Z" fill="${a}"/>
      <path d="M276 88 L240 84 L236 116 L274 120 L282 104Z" fill="${a}"/>
      <!-- arms -->
      <path d="M130 120 L156 118 L152 176 L132 176Z" fill="${c}"/>
      <path d="M270 120 L244 118 L248 176 L268 176Z" fill="${c}"/>
      <path d="M128 176 L156 176 L154 206 L130 206Z M272 176 L244 176 L246 206 L270 206Z" fill="${a}"/>
      <!-- weapon -->
      <path d="M268 190 L310 150 L318 158 L276 198Z" fill="#3a4256"/>
      <!-- shield -->
      <path d="M100 130 L132 126 L138 196 L118 216 L98 196Z" fill="${b}"/>
      <path d="M106 140 L128 137 L132 186 L117 200 L104 186Z" fill="${d}" opacity=".9"/>
      <!-- head -->
      <path d="M182 60 L218 60 L222 88 L200 96 L178 88Z" fill="${a}"/>
      <path d="M186 72 L214 72 L212 80 L188 80Z" fill="#0b0e14"/>
      <path d="M190 74 L198 75 L197 78 L190 78Z M210 74 L202 75 L203 78 L210 78Z" fill="#3ddc97" stroke="none"/>
      <path d="M200 60 L176 40 L180 38 L200 54 L220 38 L224 40Z" fill="${d}"/>
    </g>
  </svg>`;
}

// ---------------- NAV ----------------
$("#menuBtn").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
$$("#navLinks a").forEach((a) => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));

const sections = $$("section[id]");
window.addEventListener("scroll", () => {
  const y = scrollY + 120;
  let current = "";
  sections.forEach((s) => { if (s.offsetTop <= y) current = s.id; });
  $$("#navLinks a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}, { passive: true });

// ---------------- GALLERY ----------------
const liked = new Set(store("kf_likes", []));

function renderGallery(filter = "all") {
  const list = BUILDS.filter((b) =>
    filter === "all" ? true :
    filter === "custom" ? b.custom :
    filter === "sale" ? b.status === "sale" :
    b.grade === filter
  );
  $("#galleryGrid").innerHTML = list.map((b) => `
    <article class="panel build" data-id="${b.id}">
      <div class="thumb">
        ${b.img ? `<img src="${b.img}" alt="${b.name}" style="width:100%;height:100%;object-fit:cover">` : mechSVG(b.colors, b.id)}
        <span class="grade-badge">${b.grade}</span>
        ${b.status === "sale" ? `<span class="status-badge sale">FOR SALE · ${money(b.price)}</span>` : ""}
        ${b.status === "comm" ? `<span class="status-badge comm">COMMISSION</span>` : ""}
      </div>
      <div class="info">
        <h4>${b.name}</h4>
        <div class="meta">
          <span>by <b style="color:var(--text)">${b.builder}</b></span>
          <button class="like ${liked.has(b.id) ? "on" : ""}" data-like="${b.id}" aria-label="Like">
            ♥ <span>${b.likes + (liked.has(b.id) ? 1 : 0)}</span>
          </button>
        </div>
        <div class="tags">${b.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </article>`).join("") || `<p style="color:var(--muted)">No builds match that filter yet.</p>`;
}

$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  $$("#filters .chip").forEach((c) => c.classList.toggle("on", c === chip));
  renderGallery(chip.dataset.f);
});

$("#galleryGrid").addEventListener("click", (e) => {
  const likeBtn = e.target.closest("[data-like]");
  if (likeBtn) {
    const id = +likeBtn.dataset.like;
    liked.has(id) ? liked.delete(id) : liked.add(id);
    save("kf_likes", [...liked]);
    const b = BUILDS.find((x) => x.id === id);
    likeBtn.classList.toggle("on", liked.has(id));
    likeBtn.querySelector("span").textContent = b.likes + (liked.has(id) ? 1 : 0);
    return;
  }
  const card = e.target.closest(".build");
  if (card) openBuild(+card.dataset.id);
});

// ---------------- MODAL ----------------
function openModal(html) {
  $("#modalContent").innerHTML = html;
  $("#modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#modal").classList.remove("open");
  document.body.style.overflow = "";
}
$("#modalClose").addEventListener("click", closeModal);
$("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

function openBuild(id) {
  const b = BUILDS.find((x) => x.id === id);
  openModal(`
    <div class="thumb">${b.img ? `<img src="${b.img}" alt="${b.name}" style="width:100%;height:100%;object-fit:cover">` : mechSVG(b.colors, b.id + 100)}</div>
    <div class="modal-body">
      <div class="eyebrow">${b.grade} · ${b.custom ? "Custom build" : "Detail build"}</div>
      <h3>${b.name}</h3>
      <p style="color:var(--muted)">Built by <b style="color:var(--text)">${b.builder}</b>. ${b.tags.join(" · ")}.</p>
      <div class="specs">
        <div><small>Build time</small>${b.time}</div>
        <div><small>Paint</small>${b.paint}</div>
        <div><small>Likes</small>${b.likes + (liked.has(b.id) ? 1 : 0)}</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${b.status === "sale"
          ? `<button class="btn btn-primary" onclick="inquire('${b.name.replace(/'/g, "\\'")}')">Inquire · ${money(b.price)}</button>`
          : `<a href="#quote" class="btn btn-primary" onclick="closeModal()">Commission something similar</a>`}
        <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      </div>
    </div>`);
}

// ---------------- SHOP ----------------
function renderShop() {
  $("#shopGrid").innerHTML = SHOP.map((p, i) => `
    <article class="panel build product">
      <div class="thumb">${mechSVG(p.colors, i + 20)}<span class="grade-badge">${p.grade}</span></div>
      <div class="info">
        <span class="cond">${p.cond}</span>
        <h4>${p.name}</h4>
        <div class="meta"><span>${p.type}</span></div>
        <div class="price-row">
          <b>${money(p.price)}</b>
          <button class="btn btn-ghost btn-sm" onclick="inquire('${p.name.replace(/'/g, "\\'")}')">Inquire</button>
        </div>
      </div>
    </article>`).join("");
}

window.inquire = (name) => {
  closeModal();
  $("#qNotes").value = `Interested in purchasing: ${name}`;
  $("#quote").scrollIntoView({ behavior: "smooth" });
  toast(`Added "${name}" to your inquiry`);
};

// ---------------- GUIDES / CREATORS ----------------
function renderGuides() {
  $("#guideList").insertAdjacentHTML("beforeend", GUIDES.map((g) => `
    <div class="guide" tabindex="0">
      <div class="gi">${g.icon}</div>
      <div><h5>${g.title}</h5><p>${g.meta}</p></div>
      <span class="lvl">${g.lvl}</span>
    </div>`).join(""));
  $$("#guideList .guide").forEach((el) => el.addEventListener("click", () => toast("Guide pages coming soon — stay tuned, pilot.")));
}

function renderCreators() {
  $("#creatorGrid").innerHTML = CREATORS.map((c) => `
    <div class="panel creator reveal">
      <div class="avatar" style="border-color:${c.color};color:${c.color};background:${c.color}18">${c.name[0]}</div>
      <span class="open-badge ${c.open ? "yes" : "no"}">${c.open ? "● OPEN FOR COMMISSIONS" : "● QUEUE FULL"}</span>
      <h4>${c.name}</h4>
      <p class="spec">${c.spec}</p>
      <div class="cstats"><div><b>${c.builds}</b>builds</div><div><b>${c.rating}</b>rating</div></div>
      <a href="#quote" class="btn ${c.open ? "btn-primary" : "btn-ghost"} btn-sm">${c.open ? "Request" : "Waitlist"}</a>
    </div>`).join("");
}

// ---------------- COMMISSION ESTIMATOR ----------------
function calcEstimate() {
  const grade = $("#qGrade").value;
  const tier = $("#qTier").value;
  const src = $('input[name="src"]:checked').value;
  const addons = $$("#addons input:checked");

  const gradeCost = PRICING.grade[grade] * PRICING.multiplier[tier];
  const tierCost = PRICING.tier[tier];
  const addCost = addons.reduce((s, a) => s + +a.value, 0);
  const subtotal = gradeCost + tierCost + addCost;
  const srcCost = src === "source" ? subtotal * PRICING.sourcingFee : 0;
  const total = subtotal + srcCost;

  const rush = addons.some((a) => a.dataset.name.startsWith("Rush"));
  const weeks = rush ? 2 : PRICING.weeks[grade] + PRICING.tierWeeks[tier];

  $("#eGrade").textContent = money(gradeCost);
  $("#eTier").textContent = money(tierCost);
  $("#eAdd").textContent = money(addCost);
  $("#eSrc").textContent = money(srcCost);
  $("#eTotal").textContent = money(total);
  $("#eTime").textContent = `${weeks}–${weeks + 1} weeks`;
  return { grade, tier, src, addons: addons.map((a) => a.dataset.name), total: Math.round(total), weeks };
}
$("#quoteForm").addEventListener("input", calcEstimate);
$("#quoteForm").addEventListener("change", calcEstimate);

$$("[data-tier]").forEach((btn) => btn.addEventListener("click", () => {
  $("#qTier").value = btn.dataset.tier;
  calcEstimate();
}));

// ---------------- FORM SENDING ----------------
const TIER_NAMES = { straight: "Straight Build", detail: "Detail Build", custom: "Full Custom" };

function setStatus(el, type, msg) {
  if (!el) return;
  el.className = `form-status ${type}`;
  el.textContent = msg;
}

/* Sends a submission to the configured endpoint as JSON.
   Returns "sent", "demo" (no endpoint set) or throws on failure. */
async function sendForm(endpoint, data) {
  if (!endpoint) {
    console.info("[Kitforge] Demo mode — no endpoint set in FORMS. Would have sent:", data);
    return "demo";
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let detail = "";
    try { detail = (await res.json()).errors?.map((x) => x.message).join(", ") || ""; } catch {}
    throw new Error(detail || `Server responded ${res.status}`);
  }
  return "sent";
}

async function handleSubmit(form, endpoint, buildData, onSuccess) {
  const btn = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".form-status");
  // Honeypot: real people never fill this hidden field; bots usually do.
  if (form.querySelector('[name="_gotcha"]')?.value) return;

  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Sending…";
  setStatus(status, "", "");
  try {
    const result = await sendForm(endpoint, buildData());
    onSuccess(result);
    form.reset();
  } catch (err) {
    setStatus(status, "err", `Couldn't send: ${err.message}. Please try again in a moment.`);
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
}

$("#quoteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const est = calcEstimate();
  const name = $("#qName").value.trim();
  handleSubmit(form, FORMS.commission, () => ({
    _subject: `New commission request — ${name} (${est.grade} ${TIER_NAMES[est.tier]})`,
    form: "Commission request",
    name,
    email: $("#qEmail").value.trim(),
    kit: $("#qKit").value.trim() || "(not specified)",
    grade: est.grade,
    service: TIER_NAMES[est.tier],
    kit_source: est.src === "source" ? "Source it for me (+15%)" : "Customer ships kit",
    add_ons: est.addons.length ? est.addons.join(", ") : "None",
    estimate: money(est.total),
    turnaround: `${est.weeks}–${est.weeks + 1} weeks`,
    vision: $("#qNotes").value.trim() || "(none)",
  }), (result) => {
    calcEstimate();
    const status = form.querySelector(".form-status");
    if (result === "demo") {
      setStatus(status, "warn", "Demo mode: this form isn't connected yet, so nothing was sent. (Site owner: add your endpoint in app.js.)");
    } else {
      setStatus(status, "ok", `Request sent! Thanks, ${name} — you'll get a quote within 48 hours.`);
      toast(`Request received — estimate ${money(est.total)}`);
    }
  });
});

$("#joinForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type="email"]').value.trim();
  handleSubmit(form, FORMS.newsletter, () => ({
    _subject: "New hangar sign-up",
    form: "Newsletter sign-up",
    email,
  }), (result) => {
    toast(result === "demo"
      ? "Demo mode: sign-up form not connected yet."
      : "Enlisted! You'll hear about open slots first.");
  });
});

// ---------------- COUNTERS & REVEAL ----------------
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const dec = +(el.dataset.dec || 0);
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / 1400, 1);
    el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initReveal() {
  if (!("IntersectionObserver" in window)) {
    $$(".reveal").forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}

// ---------------- INIT ----------------
renderGallery();
renderShop();
renderGuides();
renderCreators();
calcEstimate();
$("#buildCount") && ($("#buildCount").textContent = BUILDS.length);
$("#shopCount").textContent = SHOP.length;
$$("[data-count]").forEach(animateCount);
initReveal();
