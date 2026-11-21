/* =========================================================
   HANGAR BAY BUILDERS — shared site code (used by index.html and
   commissions.html). Community features live in community.js.
   ========================================================= */

// ---------------- FORM SETUP ----------------
/* Paste a form endpoint here to receive commission requests by email.
   Works with Formspree (free tier: 50 submissions/month):
     1. Sign up at https://formspree.io and click "New Form"
     2. Copy the endpoint, e.g. "https://formspree.io/f/abcdwxyz"
     3. Paste it below.
   While it's empty the form runs in DEMO MODE and nothing is sent. */
const FORMS = {
  commission: "",  // e.g. "https://formspree.io/f/abcdwxyz"
};

// Commission pricing (labor only, USD) — set these to your own rates.
const PRICING = {
  grade: { SD: 10, HG: 20, RG: 40, MG: 60, PG: 150 },
  tier: { straight: 25, detail: 60, custom: 150 },
  multiplier: { straight: 1, detail: 1.4, custom: 2.2 },     // scales the grade base
  weeks: { SD: 1, HG: 1, RG: 2, MG: 3, PG: 6 },
  tierWeeks: { straight: 0, detail: 1, custom: 3 },
  sourcingFee: 0.15,
};

const GUIDES = [
  { icon: "✂", title: "Clean nub removal", meta: "NIPPERS · HOBBY KNIFE", lvl: "BEGINNER" },
  { icon: "✎", title: "Panel lining that doesn't smudge", meta: "ENAMEL WASH · MARKERS", lvl: "BEGINNER" },
  { icon: "▤", title: "Applying water-slide decals", meta: "DECAL SOFTENER", lvl: "BEGINNER" },
  { icon: "◐", title: "Matte vs gloss topcoats", meta: "SPRAY CANS · AIRBRUSH", lvl: "BEGINNER" },
  { icon: "≈", title: "Seam line removal", meta: "CEMENT · SANDING STICKS", lvl: "INTERMEDIATE" },
  { icon: "✺", title: "Airbrush basics — thinning & PSI", meta: "AIRBRUSH SETUP", lvl: "INTERMEDIATE" },
  { icon: "⚡", title: "Chipping & battle damage", meta: "SPONGE · PIN VISE", lvl: "ADVANCED" },
  { icon: "◉", title: "Installing LED units", meta: "SOLDERING", lvl: "ADVANCED" },
];

// ---------------- HELPERS ----------------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = (n) => "$" + Math.round(n).toLocaleString();

function toast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 3200);
}

/* Placeholder art for posts without a photo: an original mech
   silhouette painted in the given color scheme. */
function mechSVG([a, b, c, d], seed = 1) {
  const pose = (seed % 3) - 1;
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
      <path d="M160 92 L140 60 L150 56 L172 88Z M240 92 L260 60 L250 56 L228 88Z" fill="${c}"/>
      <path d="M172 168 L162 222 L156 276 L188 276 L192 222 L198 170Z" fill="${a}"/>
      <path d="M228 168 L238 222 L244 276 L212 276 L208 222 L202 170Z" fill="${a}"/>
      <path d="M162 222 L192 222 L190 238 L160 238Z M238 222 L208 222 L210 238 L240 238Z" fill="${b}"/>
      <path d="M150 268 L194 268 L196 282 L146 282Z M250 268 L206 268 L204 282 L254 282Z" fill="${d}"/>
      <path d="M170 150 L230 150 L236 172 L164 172Z" fill="${c}"/>
      <path d="M190 156 L210 156 L206 176 L194 176Z" fill="${d}"/>
      <path d="M160 92 L240 92 L248 128 L232 152 L168 152 L152 128Z" fill="${b}"/>
      <path d="M176 98 L224 98 L228 122 L172 122Z" fill="${a}"/>
      <rect x="182" y="104" width="12" height="8" fill="${d}"/><rect x="206" y="104" width="12" height="8" fill="${d}"/>
      <path d="M124 88 L160 84 L164 116 L126 120 L118 104Z" fill="${a}"/>
      <path d="M276 88 L240 84 L236 116 L274 120 L282 104Z" fill="${a}"/>
      <path d="M130 120 L156 118 L152 176 L132 176Z" fill="${c}"/>
      <path d="M270 120 L244 118 L248 176 L268 176Z" fill="${c}"/>
      <path d="M128 176 L156 176 L154 206 L130 206Z M272 176 L244 176 L246 206 L270 206Z" fill="${a}"/>
      <path d="M268 190 L310 150 L318 158 L276 198Z" fill="#3a4256"/>
      <path d="M100 130 L132 126 L138 196 L118 216 L98 196Z" fill="${b}"/>
      <path d="M106 140 L128 137 L132 186 L117 200 L104 186Z" fill="${d}" opacity=".9"/>
      <path d="M182 60 L218 60 L222 88 L200 96 L178 88Z" fill="${a}"/>
      <path d="M186 72 L214 72 L212 80 L188 80Z" fill="#0b0e14"/>
      <path d="M190 74 L198 75 L197 78 L190 78Z M210 74 L202 75 L203 78 L210 78Z" fill="#3ddc97" stroke="none"/>
      <path d="M200 60 L176 40 L180 38 L200 54 L220 38 L224 40Z" fill="${d}"/>
    </g>
  </svg>`;
}

// ---------------- NAV ----------------
$("#menuBtn")?.addEventListener("click", () => $("#navLinks").classList.toggle("open"));
$$("#navLinks a").forEach((a) => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));

const sections = $$("section[id]");
if (sections.length) {
  window.addEventListener("scroll", () => {
    const y = scrollY + 120;
    let current = "";
    sections.forEach((s) => { if (s.offsetTop <= y) current = s.id; });
    $$("#navLinks a[href^='#']").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }, { passive: true });
}

// ---------------- MODAL ----------------
function openModal(html) {
  $("#modalContent").innerHTML = html;
  $("#modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#modal")?.classList.remove("open");
  document.body.style.overflow = "";
}
$("#modalClose")?.addEventListener("click", closeModal);
$("#modal")?.addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// ---------------- LEARN ----------------
if ($("#guideList")) {
  $("#guideList").insertAdjacentHTML("beforeend", GUIDES.map((g) => `
    <div class="guide">
      <div class="gi">${g.icon}</div>
      <div><h5>${g.title}</h5><p>${g.meta}</p></div>
      <span class="lvl">${g.lvl}</span>
    </div>`).join(""));
}

// ---------------- COMMISSIONS PAGE ----------------
const TIER_NAMES = { straight: "Straight Build", detail: "Detail Build", custom: "Full Custom" };

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

function setStatus(el, type, msg) {
  if (!el) return;
  el.className = `form-status ${type}`;
  el.textContent = msg;
}

/* Sends a submission as JSON. Returns "sent", "demo" (no endpoint set) or throws. */
async function sendForm(endpoint, data) {
  if (!endpoint) {
    console.info("[Hangar Bay Builders] Demo mode — no endpoint set in FORMS. Would have sent:", data);
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

if ($("#quoteForm")) {
  const form = $("#quoteForm");
  form.addEventListener("input", calcEstimate);
  form.addEventListener("change", calcEstimate);
  $$("[data-tier]").forEach((btn) => btn.addEventListener("click", () => {
    $("#qTier").value = btn.dataset.tier;
    calcEstimate();
  }));

  // Arriving from a member's profile: commissions.html?for=Username
  const forUser = new URLSearchParams(location.search).get("for");
  if (forUser && /^[A-Za-z0-9_]{3,24}$/.test(forUser)) {
    $("#qNotes").value = `Commission request for @${forUser}: `;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.querySelector('[name="_gotcha"]').value) return; // spam bot
    const btn = form.querySelector('button[type="submit"]');
    const status = form.querySelector(".form-status");
    const est = calcEstimate();
    const name = $("#qName").value.trim();
    const label = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending…";
    setStatus(status, "", "");
    try {
      const result = await sendForm(FORMS.commission, {
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
      });
      form.reset();
      calcEstimate();
      if (result === "demo") {
        setStatus(status, "warn", "This form isn't connected yet, so nothing was sent. Please reach out through the community chat for now.");
      } else {
        setStatus(status, "ok", `Request sent! Thanks, ${name} — you'll get a quote within 48 hours.`);
        toast(`Request received — estimate ${money(est.total)}`);
      }
    } catch (err) {
      setStatus(status, "err", `Couldn't send: ${err.message}. Please try again in a moment.`);
    } finally {
      btn.disabled = false; btn.textContent = label;
    }
  });
  calcEstimate();
}

// ---------------- REVEAL ON SCROLL ----------------
(function initReveal() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
})();
