/* =========================================================
   HANGAR BAY BUILDERS — Archives timelines.
   The One Year War in detail, plus the big events of every
   other world. `series` links an event to its card in the
   Series section (must match a SERIES title in lore.js).
   ========================================================= */
const TIMELINES = [
  { id: "oyw", tab: "One Year War", era: "UC", art: "images/one-year-war.jpg",
    artAlt: "RX-78-2 Gundam standing over a defeated Zaku",
    title: "The One Year War",
    intro: "U.C. 0079: Zeon declares war on the Earth Federation. In under a year, half of humanity is dead. Mobile suits change warfare forever, and a boy named Amuro Ray becomes a legend. Almost every Gundam story in the Universal Century grows out of this war.",
    events: [
      { date: "U.C. 0058", title: "A colony declares independence", text: "Zeon Zum Deikun proclaims Side 3 the Republic of Zeon and preaches that spacenoids should be free of Earth. The Federation answers with sanctions." },
      { date: "U.C. 0068–69", title: "The Zabi family seizes power", text: "Deikun dies suddenly. Degwin Sodo Zabi takes control and turns the republic into the Principality of Zeon, while Deikun's children, the future Char and Sayla, flee into hiding.", series: "Mobile Suit Gundam: The Origin" },
      { date: "Jan 3, 0079", title: "War declared: the One Week Battle", text: "Zeon declares war and strikes every Federation-aligned colony at once, with nuclear weapons and poison gas. Billions die in the first week." },
      { date: "Jan 10", title: "Operation British", text: "Zeon drops an entire space colony toward the Federation's headquarters at Jaburo. It breaks apart on re-entry, and the largest piece wipes out Sydney instead." },
      { date: "Jan 15–16", title: "Battle of Loum", text: "Zeon's mobile suits crush a much larger Federation fleet. Char Aznable destroys five battleships and earns the name 'the Red Comet'. Federation commander General Revil is captured." },
      { date: "Jan 31", title: "The Antarctic Treaty", text: "Revil escapes and tells the world 'Zeon is exhausted'. Instead of surrendering, both sides sign a treaty banning nuclear, biological and chemical weapons and colony drops. The war grinds on." },
      { date: "March", title: "Zeon invades Earth", text: "Zeon's Earth descent operations seize huge territory, including the Odessa mines and much of North America. Zaku, Gouf and Dom units dominate the ground war." },
      { date: "Spring–Summer", title: "Operation V", text: "The Federation races to build its own mobile suits. The prototypes, including the RX-78-2 Gundam, are secretly finished at the Side 7 colony." },
      { date: "Sep 18", title: "Attack on Side 7", text: "Zeon scouts raid Side 7. Civilian teen Amuro Ray climbs into the Gundam, and the crew of the White Base escapes with a ship full of refugees and teenagers.", series: "Mobile Suit Gundam" },
      { date: "October", title: "The fall of Garma Zabi", text: "Char manipulates his friend Garma, youngest son of the Zabi family, into a fatal battle with the White Base in North America. It's the first step in Char's revenge." },
      { date: "Nov 7", title: "Operation Odessa", text: "The Federation launches a massive counter-offensive and retakes the Odessa mining region, turning the tide of the war on Earth." },
      { date: "November", title: "The jungle front", text: "In Southeast Asia, Shiro Amada's 08th MS Team fights a gruelling guerrilla war with mass-produced Ground Gundams.", series: "Mobile Suit Gundam: The 08th MS Team" },
      { date: "Late November", title: "Attack on Jaburo", text: "Zeon throws its forces at the Federation's hidden headquarters beneath the Amazon. The attack fails, and the Federation's mass-produced GMs head for space." },
      { date: "December", title: "War in the Pocket", text: "On the neutral colony Libot, a Zeon special forces team tries to destroy a new Gundam, the 'Alex', and a schoolboy is caught in the middle.", series: "Mobile Suit Gundam 0080: War in the Pocket" },
      { date: "Dec 24", title: "Battle of Solomon", text: "The Federation storms Zeon's fortress Solomon. Dozle Zabi dies in his giant mobile armor and Solomon falls." },
      { date: "Dec 30", title: "The Solar Ray", text: "Gihren Zabi fires the colony laser Solar Ray. It destroys General Revil's fleet and, with it, his own father Degwin, who was trying to negotiate peace." },
      { date: "Dec 31", title: "Battle of A Baoa Qu", text: "The final battle. Amuro and Char duel to a standstill, the Gundam is destroyed, and the Zabi family tears itself apart from within. The White Base crew escapes the burning fortress.", series: "Mobile Suit Gundam" },
      { date: "Jan 1, 0080", title: "Armistice", text: "The Federation and the new Republic of Zeon sign a ceasefire at the lunar city of Granada. The One Year War is over, but its survivors will fight for decades." },
    ] },
  { id: "uc", tab: "Universal Century", era: "UC",
    title: "Universal Century: after the war",
    intro: "Peace never really comes. The One Year War's grudges fuel a chain of conflicts spanning more than seventy years.",
    events: [
      { date: "U.C. 0001", title: "A new calendar", text: "Humanity begins mass emigration to space colonies, and the Universal Century calendar begins. A bombing at the opening ceremony hides a secret: Laplace's Box.", series: "Mobile Suit Gundam Unicorn" },
      { date: "U.C. 0079–80", title: "The One Year War", text: "Zeon versus the Federation. See the One Year War tab for the full story.", series: "Mobile Suit Gundam" },
      { date: "U.C. 0083", title: "The Delaz Conflict", text: "Zeon holdouts steal a nuclear Gundam and drop a colony on North America. In response, the Federation creates the elite Titans.", series: "Mobile Suit Gundam 0083: Stardust Memory" },
      { date: "U.C. 0087", title: "The Gryps Conflict", text: "The Titans' brutality sparks a rebellion by the AEUG, with Char back in disguise. Haman Karn's Neo Zeon makes it a three-way war.", series: "Mobile Suit Zeta Gundam" },
      { date: "U.C. 0088–89", title: "First Neo Zeon War", text: "Haman Karn's Neo Zeon invades Earth. Judau Ashta and the ZZ Gundam stand against her.", series: "Mobile Suit Gundam ZZ" },
      { date: "U.C. 0093", title: "Second Neo Zeon War: the Axis Shock", text: "Char tries to drop the asteroid Axis on Earth. Amuro stops him, and both disappear in a light that halts Axis.", series: "Char's Counterattack" },
      { date: "U.C. 0096", title: "The Laplace Incident", text: "The hunt for Laplace's Box drags Banagher Links and the Unicorn Gundam into the Federation's oldest secret.", series: "Mobile Suit Gundam Unicorn" },
      { date: "U.C. 0097", title: "The Phenex hunt", text: "The lost Unicorn Gundam 03 Phenex reappears, and the Narrative Gundam is sent after it.", series: "Mobile Suit Gundam NT (Narrative)" },
      { date: "U.C. 0105", title: "The Mafty uprising", text: "Hathaway Noa leads a terror campaign against a corrupt Federation.", series: "Mobile Suit Gundam: Hathaway" },
      { date: "U.C. 0123", title: "The Cosmo Babylonia War", text: "The aristocratic Crossbone Vanguard attacks Frontier IV.", series: "Mobile Suit Gundam F91" },
      { date: "U.C. 0153", title: "The Zanscare War", text: "The Federation is collapsing, and the Zanscare Empire's guillotine-wielding cult rises. Üso Ewin fights with the League Militaire.", series: "Mobile Suit Victory Gundam" },
      { date: "R.C. 1014", title: "The Regild Century", text: "Long after the U.C. ends, a space elevator and a mysterious G-Self begin a new story.", series: "Gundam Reconguista in G" },
      { date: "C.C. 2345", title: "The Correct Century", text: "Earth's technology has fallen backwards. The ancient ∀ Gundam awakens and reveals the cycles of war buried in history.", series: "∀ Gundam (Turn A Gundam)" },
    ] },
  { id: "ce", tab: "Cosmic Era", era: "CE",
    title: "Cosmic Era", intro: "Naturals and Coordinators (people born genetically modified) fight two devastating wars.",
    events: [
      { date: "C.E. 70", title: "Bloody Valentine", text: "A nuclear strike destroys the agricultural colony Junius Seven. PLANT retaliates by burying Neutron Jammers in the Earth, cutting off nuclear power. Full war begins." },
      { date: "C.E. 71", title: "Heliopolis falls", text: "ZAFT raids the neutral colony Heliopolis to steal the Alliance's new Gundams. Kira Yamato boards the Strike.", series: "Mobile Suit Gundam SEED" },
      { date: "C.E. 71", title: "The war ends at Jachin Due", text: "Nuclear weapons return and both sides face annihilation. A third force, led by Kira, Athrun and Lacus, steps in to end the fighting.", series: "Mobile Suit Gundam SEED" },
      { date: "C.E. 72", title: "The Junius Treaty", text: "A fragile peace treaty is signed." },
      { date: "C.E. 73", title: "Break the World", text: "Rogue Coordinators drop the ruins of Junius Seven on Earth, and a second war erupts. Shinn Asuka enters the fight.", series: "Mobile Suit Gundam SEED Destiny" },
      { date: "C.E. 75", title: "Compass and Foundation", text: "The peacekeeping group Compass faces a new nation with a dangerous vision for humanity.", series: "Mobile Suit Gundam SEED Freedom" },
    ] },
  { id: "ac", tab: "After Colony", era: "AC",
    title: "After Colony", intro: "Space colonies under the Alliance's heel, and five Gundams sent to fight back.",
    events: [
      { date: "A.C. 175", title: "A pacifist assassinated", text: "Colony leader Heero Yuy is killed. His name becomes a codename, and his death a rallying cry." },
      { date: "A.C. 195", title: "Operation Meteor", text: "Five Gundams descend to Earth, and the secret society OZ seizes control of the Alliance.", series: "Mobile Suit Gundam Wing" },
      { date: "A.C. 195–196", title: "The Eve Wars", text: "Loyalties shift between OZ, the colonies, the White Fang and the Sanc Kingdom. The war ends in a battle around the fortress Libra.", series: "Mobile Suit Gundam Wing" },
      { date: "A.C. 196", title: "The Mariemeia Uprising", text: "One last rebellion forces the pilots back into their Gundams before they're gone for good.", series: "Gundam Wing: Endless Waltz" },
    ] },
  { id: "ad", tab: "Anno Domini", era: "AD",
    title: "Anno Domini", intro: "The 24th century: three superpowers, solar power, and a private army with Gundams.",
    events: [
      { date: "A.D. 2307", title: "Armed intervention", text: "Celestial Being reveals its Gundams and attacks anyone who wages war, forcing the world's powers to unite against it.", series: "Mobile Suit Gundam 00" },
      { date: "A.D. 2312", title: "Return of the Gundams", text: "Celestial Being rises again, this time against the brutal A-Laws.", series: "Mobile Suit Gundam 00" },
      { date: "A.D. 2314", title: "First contact", text: "An alien lifeform reaches Earth's sphere, and Setsuna faces humanity's biggest change yet." },
    ] },
  { id: "pd", tab: "Post Disaster", era: "PD",
    title: "Post Disaster", intro: "Three hundred years after a war that nearly ended humanity.",
    events: [
      { date: "≈300 years earlier", title: "The Calamity War", text: "Humanity fights a war against autonomous killing machines. 72 Gundam Frames are built to win it, and Gjallarhorn is founded in its aftermath." },
      { date: "P.D. 323", title: "Tekkadan is born", text: "Child soldiers on Mars take over their company, unearth the Gundam Barbatos, and escort Kudelia to Earth.", series: "Mobile Suit Gundam: Iron-Blooded Orphans" },
      { date: "P.D. 325", title: "The fight for Mars", text: "Tekkadan rises in power, and Gjallarhorn's internal struggle comes to a head.", series: "Mobile Suit Gundam: Iron-Blooded Orphans" },
    ] },
  { id: "other", tab: "Other worlds", era: "AS",
    title: "Other worlds", intro: "The remaining standalone timelines at a glance.",
    events: [
      { date: "F.C. 60", title: "The 13th Gundam Fight", text: "Neo Japan's Domon Kasshu fights for his nation, and for his brother.", series: "Mobile Fighter G Gundam" },
      { date: "A.W. 0015", title: "Fifteen years after the 7th Space War", text: "Colony drops have wrecked the Earth. Garrod Ran finds the Gundam X.", series: "After War Gundam X" },
      { date: "A.G. 101–164", title: "The hundred-year war", text: "The UE (Vagan) attack the colonies, and three generations of the Asuno family pilot the Gundam AGE.", series: "Mobile Suit Gundam AGE" },
      { date: "A.S. 105", title: "The Vanadis Incident", text: "A Gundam research lab is wiped out. This tragedy sets up The Witch from Mercury." },
      { date: "A.S. 122", title: "Asticassia School", text: "Suletta Mercury arrives at the academy and duels her way into the story.", series: "Mobile Suit Gundam: The Witch from Mercury" },
      { date: "U.C. 0085 (alt.)", title: "A world where Zeon won", text: "Years after Zeon's victory, illegal mobile suit duels thrive in the colonies.", series: "Mobile Suit Gundam GQuuuuuuX" },
    ] },
];

(function () {
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const tabs = $("#tlTabs"), panel = $("#tlPanel");
  if (!tabs) return;

  tabs.innerHTML = TIMELINES.map((t, i) =>
    `<button class="tl-tab ${i ? "" : "on"}" role="tab" data-tl="${t.id}" style="--ec:${ERAS[t.era].color}">${esc(t.tab)}</button>`).join("");

  function show(id) {
    const t = TIMELINES.find((x) => x.id === id);
    $$("#tlTabs .tl-tab").forEach((b) => b.classList.toggle("on", b.dataset.tl === id));
    panel.style.setProperty("--ec", ERAS[t.era].color);
    panel.classList.toggle("has-art", !!t.art);
    panel.innerHTML = `
      ${t.art ? `<figure class="tl-art"><img src="${t.art}" alt="${esc(t.artAlt)}" loading="lazy"><figcaption>RX-78-2 Gundam · U.C. 0079</figcaption></figure>` : ""}
      <div class="tl-body">
        <h3>${esc(t.title)}</h3>
        <p class="tl-intro">${esc(t.intro)}</p>
        <ol class="tl-list">
          ${t.events.map((e) => `
            <li>
              <span class="tl-date">${esc(e.date)}</span>
              <h4>${esc(e.title)}</h4>
              <p>${esc(e.text)}</p>
              ${e.series ? `<a class="tl-link" href="#series-${slug(e.series)}" data-goto="${slug(e.series)}">→ ${esc(e.series)}</a>` : ""}
            </li>`).join("")}
        </ol>
      </div>`;
  }
  tabs.addEventListener("click", (e) => { const b = e.target.closest("[data-tl]"); if (b) show(b.dataset.tl); });

  // Event link → clear search/filters, open that series card and highlight it.
  panel.addEventListener("click", (e) => {
    const a = e.target.closest("[data-goto]");
    if (!a) return;
    e.preventDefault();
    const search = $("#seriesSearch");
    search.value = ""; search.dispatchEvent(new Event("input"));
    $("#seriesFilters [data-f=all]").click();
    const card = document.getElementById("series-" + a.dataset.goto);
    if (!card) return;
    card.querySelector("details").open = true;
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    card.classList.add("flash");
    setTimeout(() => card.classList.remove("flash"), 1600);
  });
  show("oyw");
})();
