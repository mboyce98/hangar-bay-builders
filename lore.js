/* =========================================================
   HANGAR BAY BUILDERS — Archives: series, eras, characters.
   Summaries are original, spoiler-light write-ups.
   To add a series, add an object to SERIES below.
   ========================================================= */

const ERAS = {
  UC: { name: "Universal Century", short: "U.C.", color: "#2f6fff",
    about: "The original timeline. Humanity has moved into space colonies, and the colony nation of Zeon wages war on the Earth Federation. Most of the franchise's best-known suits and rivalries live here, and the far-future Reconguista in G and ∀ Gundam follow on from it." },
  FC: { name: "Future Century", short: "F.C.", color: "#e5383b",
    about: "Instead of fighting wars, the space colonies settle who rules Earth through the Gundam Fight, a martial-arts tournament between national Gundams every four years." },
  AC: { name: "After Colony", short: "A.C.", color: "#ffc233",
    about: "Colonists oppressed by the Earth Sphere Alliance send five young pilots and their Gundams to Earth, kicking off a political war of shifting loyalties." },
  AW: { name: "After War", short: "A.W.", color: "#ff8a3d",
    about: "A post-apocalyptic world fifteen years after a war that dropped colonies on Earth. Scavengers and mercenaries pick through the ruins." },
  CE: { name: "Cosmic Era", short: "C.E.", color: "#3ddc97",
    about: "Genetically enhanced Coordinators and unmodified Naturals are at war, with the space nation PLANT and its ZAFT army on one side and the Earth Alliance on the other." },
  AD: { name: "Anno Domini", short: "A.D.", color: "#3dc9ff",
    about: "The real-world calendar, set in the 24th century. Three power blocs fight over solar energy until the secret group Celestial Being uses Gundams to stop all war by force." },
  AG: { name: "Advanced Generation", short: "A.G.", color: "#b07cff",
    about: "A century-long war against the mysterious UE (later known as Vagan), told across three generations of one family of pilots." },
  PD: { name: "Post Disaster", short: "P.D.", color: "#c2a878",
    about: "Three hundred years after the Calamity War. Ancient Gundam Frames are dug up and pressed back into service by mercenaries, while the peacekeeping force Gjallarhorn holds power." },
  AS: { name: "Ad Stella", short: "A.S.", color: "#ff6fa8",
    about: "Space megacorporations run the world. Gundams are banned as too dangerous to their pilots, and the story starts at a school for future pilots and engineers." },
  BUILD: { name: "Build series", short: "Gunpla", color: "#8a96b0",
    about: "Set in our modern world, where people build Gunpla and battle them in simulators or online games. These are the series about the hobby itself." },
  ALT: { name: "Alternate U.C.", short: "Alt U.C.", color: "#e5383b",
    about: "What-if stories that branch off the Universal Century, such as a world where Zeon won the One Year War." },
};

const SERIES = [
  // ---------------- Universal Century ----------------
  { title: "Mobile Suit Gundam", year: 1979, art: [[1,1]], type: "TV", era: "UC", setting: "U.C. 0079",
    summary: "The one that started it all. When Zeon attacks Side 7, teenager Amuro Ray climbs into the Federation's prototype RX-78-2 Gundam and is pulled into the One Year War aboard the warship White Base, facing the masked ace Char Aznable again and again. It created the 'real robot' genre: mobile suits as mass-produced weapons of war, not superheroes.",
    characters: ["Amuro Ray", "Char Aznable", "Bright Noa", "Sayla Mass", "Lalah Sune", "Ramba Ral"],
    suits: ["RX-78-2 Gundam", "MS-06 Zaku II", "MS-07B Gouf", "MS-09 Dom", "MS-14 Gelgoog", "MSN-02 Zeong"],
    start: true },
  { title: "Mobile Suit Gundam: The Origin", year: 2015, art: [[1,2]], type: "OVA", era: "UC", setting: "U.C. 0068–0079",
    summary: "A prequel showing how Char and Sayla grew up as the exiled children of Zeon's founder, how the Zabi family seized power, and how the One Year War began. It's the clearest look at why the war happened.",
    characters: ["Casval Rem Deikun (Char)", "Artesia (Sayla)", "Gihren Zabi", "Garma Zabi", "Ramba Ral"],
    suits: ["MS-05 Zaku I", "MS-06 Zaku II", "RX-77 Guncannon (prototype)"] },
  { title: "Mobile Suit Gundam: The 08th MS Team", year: 1996, art: [[1,3]], type: "OVA", era: "UC", setting: "U.C. 0079",
    summary: "A grounded war story in the jungles of Southeast Asia. Federation officer Shiro Amada leads a small squad of mass-production Ground Gundams, and falls for Zeon pilot Aina Sahalin.",
    characters: ["Shiro Amada", "Aina Sahalin", "Karen Joshua", "Terry Sanders Jr."],
    suits: ["RX-79[G] Gundam Ground Type", "RX-79[G]Ez-8 Gundam Ez8", "MS-06J Zaku II", "Apsalus"] },
  { title: "Mobile Suit Gundam 0080: War in the Pocket", year: 1989, art: [[1,4]], type: "OVA", era: "UC", setting: "U.C. 0079",
    summary: "The One Year War seen through the eyes of a schoolboy, Al, who befriends a young Zeon soldier on a neutral space colony. Short, personal and famously heartbreaking.",
    characters: ["Alfred Izuruha", "Bernard Wiseman", "Christina Mackenzie"],
    suits: ["RX-78NT-1 Gundam 'Alex'", "MS-06FZ Zaku II Kai", "MS-18E Kämpfer"] },
  { title: "Mobile Suit Gundam Thunderbolt", year: 2015, art: [[1,5],[1,6]], type: "ONA", era: "UC", setting: "U.C. 0079",
    summary: "A jazz-soaked, brutal war story set in a wreck-filled stretch of space. Federation ace Io Fleming and Zeon sniper Daryl Lorenz become bitter rivals.",
    characters: ["Io Fleming", "Daryl Lorenz", "Claudia Peer"],
    suits: ["FA-78 Full Armor Gundam", "MS-06R Psycho Zaku"] },
  { title: "Mobile Suit Gundam: Cucuruz Doan's Island", year: 2022, art: [[1,1]], type: "Film", era: "UC", setting: "U.C. 0079",
    summary: "A modern film remake of a single episode of the 1979 series. Amuro is stranded on an island where a Zeon deserter, Cucuruz Doan, protects a group of war orphans.",
    characters: ["Amuro Ray", "Cucuruz Doan", "Bright Noa"],
    suits: ["RX-78-2 Gundam", "MS-06F Doan's Zaku"] },
  { title: "Mobile Suit Gundam: Requiem for Vengeance", year: 2024, type: "ONA", era: "UC", setting: "U.C. 0079",
    summary: "A fully CG war story on the European front in the last days of the One Year War. Zeon squad leader Iria Solari and her unit are hunted by a terrifying Federation Gundam.",
    characters: ["Iria Solari"],
    suits: ["MS-06F Zaku II (Solari's machine)", "Gundam EX"] },
  { title: "Mobile Suit Gundam 0083: Stardust Memory", year: 1991, art: [[1,7],[1,8]], type: "OVA", era: "UC", setting: "U.C. 0083",
    summary: "Three years after the war, Zeon holdouts steal a nuclear-armed Gundam prototype. Test pilot Kou Uraki chases the legendary 'Nightmare of Solomon', Anavel Gato, across Earth and space.",
    characters: ["Kou Uraki", "Anavel Gato", "Nina Purpleton", "Cima Garahau"],
    suits: ["RX-78GP01 Gundam 'Zephyranthes'", "RX-78GP02A Gundam 'Physalis'", "RX-78GP03 Gundam 'Dendrobium'"] },
  { title: "Mobile Suit Zeta Gundam", year: 1985, art: [[1,10],[1,9]], type: "TV", era: "UC", setting: "U.C. 0087",
    summary: "The Federation's elite Titans have become oppressors. Hot-headed teen Kamille Bidan joins the rebel AEUG alongside 'Quattro Bajeena', who is Char in disguise, in the Gryps Conflict. A darker, more complicated sequel.",
    characters: ["Kamille Bidan", "Quattro Bajeena (Char)", "Paptimus Scirocco", "Haman Karn", "Jerid Messa", "Emma Sheen"],
    suits: ["MSZ-006 Zeta Gundam", "RX-178 Gundam Mk-II", "MSN-00100 Hyaku Shiki", "PMX-003 The O"] },
  { title: "Mobile Suit Gundam ZZ", year: 1986, art: [[2,1]], type: "TV", era: "UC", setting: "U.C. 0088",
    summary: "Picks up right after Zeta. Junk-dealer kid Judau Ashta pilots the heavy ZZ Gundam against Haman Karn's Neo Zeon. It starts out light-hearted and gets serious fast.",
    characters: ["Judau Ashta", "Haman Karn", "Elpeo Ple", "Roux Louka"],
    suits: ["MSZ-010 ZZ Gundam", "AMX-004 Qubeley", "NZ-000 Quin Mantha"] },
  { title: "Char's Counterattack", year: 1988, art: [[2,2]], type: "Film", era: "UC", setting: "U.C. 0093",
    summary: "The final clash between Amuro and Char. Char leads a new Neo Zeon and plans to drop the asteroid Axis on Earth, and Amuro rises to meet him in the Nu Gundam.",
    characters: ["Amuro Ray", "Char Aznable", "Quess Paraya", "Hathaway Noa", "Gyunei Guss"],
    suits: ["RX-93 ν Gundam", "MSN-04 Sazabi", "NZ-333 α Azieru"] },
  { title: "Mobile Suit Gundam Unicorn", year: 2010, art: [[2,3]], type: "OVA", era: "UC", setting: "U.C. 0096",
    summary: "Student Banagher Links inherits the RX-0 Unicorn Gundam and the key to 'Laplace's Box', a secret that could topple the Federation. Hunting the box is Full Frontal, who many call 'the second coming of Char'. Lavish and a great entry point into the U.C.",
    characters: ["Banagher Links", "Audrey Burne (Mineva Lao Zabi)", "Full Frontal", "Riddhe Marcenas", "Marida Cruz"],
    suits: ["RX-0 Unicorn Gundam", "RX-0 Unicorn Gundam 02 Banshee", "MSN-06S Sinanju", "NZ-666 Kshatriya"],
    start: true },
  { title: "Mobile Suit Gundam NT (Narrative)", year: 2018, art: [[2,4]], type: "Film", era: "UC", setting: "U.C. 0097",
    summary: "A year after Unicorn, three childhood friends tied to a colony-drop tragedy are drawn back together by the hunt for the missing Unicorn Gundam 03, the Phenex.",
    characters: ["Jona Basta", "Rita Bernal", "Michele Luio", "Zoltan Akkanen"],
    suits: ["RX-9 Narrative Gundam", "RX-0 Unicorn Gundam 03 Phenex", "II Neo Zeong"] },
  { title: "Mobile Suit Gundam: Hathaway", year: 2021, art: [[2,5]], type: "Film", era: "UC", setting: "U.C. 0105",
    summary: "Bright Noa's son Hathaway secretly leads Mafty, an anti-Federation insurgency. A political thriller trilogy with some of the best mobile suit action ever animated.",
    characters: ["Hathaway Noa", "Gigi Andalucia", "Kenneth Sleg"],
    suits: ["RX-105 Ξ Gundam", "RX-104FF Penelope"] },
  { title: "Mobile Suit Gundam F91", year: 1991, art: [[2,6]], type: "Film", era: "UC", setting: "U.C. 0123",
    summary: "Decades later, the aristocratic Crossbone Vanguard attacks a peaceful colony. Seabook Arno pilots the compact Gundam F91 to protect his friends and rescue Cecily Fairchild.",
    characters: ["Seabook Arno", "Cecily Fairchild", "Carozzo Ronah (Iron Mask)"],
    suits: ["F91 Gundam F91", "XM-07 Vigna Ghina"] },
  { title: "Mobile Suit Victory Gundam", year: 1993, art: [[2,7],[2,8]], type: "TV", era: "UC", setting: "U.C. 0153",
    summary: "In a collapsing Federation, 13-year-old Üso Ewin joins the resistance League Militaire against the Zanscare Empire. Famously grim, and one of the darkest Gundam series.",
    characters: ["Üso Ewin", "Shakti Kareen", "Katejina Loos", "Fuala Griffon"],
    suits: ["LM312V04 Victory Gundam", "LM314V21 V2 Gundam"] },
  { title: "Gundam Reconguista in G", year: 2014, art: [[5,2]], type: "TV", era: "UC", setting: "R.C. 1014 (after the U.C.)",
    summary: "Created by original Gundam director Yoshiyuki Tomino and set long after the Universal Century, in the Regild Century. Cadet Bellri Zenam meets space pirate Aida Surugan and the mysterious G-Self, which only he can pilot.",
    characters: ["Bellri Zenam", "Aida Surugan", "Noredo Nug"],
    suits: ["YG-111 Gundam G-Self", "Montero"] },
  { title: "∀ Gundam (Turn A Gundam)", year: 1999, type: "TV", era: "UC", setting: "C.C. 2345",
    summary: "Made for the 20th anniversary. The Moonrace return to an Earth whose technology has fallen back to the early 1900s. Loran Cehack awakens the ancient ∀ Gundam, a machine connected to every Gundam timeline.",
    characters: ["Loran Cehack", "Dianna Soreil", "Kihel Heim", "Gym Ghingham"],
    suits: ["SYSTEM-∀99 ∀ Gundam", "CONCEPT-X 6-1-2 Turn X"] },

  // ---------------- Alternate timelines ----------------
  { title: "Mobile Fighter G Gundam", year: 1994, art: [[2,10],[3,1]], type: "TV", era: "FC", setting: "F.C. 60",
    summary: "The first Gundam outside the Universal Century, and a martial-arts tournament show. Domon Kasshu represents Neo Japan in the Gundam Fight while searching for his brother and the Devil Gundam. Loud, earnest and a fan favorite.",
    characters: ["Domon Kasshu", "Rain Mikamura", "Master Asia", "Chibodee Crocket", "Kyoji Kasshu"],
    suits: ["GF13-017NJ Shining Gundam", "GF13-017NJII God Gundam (Burning Gundam)", "GF13-001NHII Master Gundam"] },
  { title: "Mobile Suit Gundam Wing", year: 1995, art: [[3,2],[3,3]], type: "TV", era: "AC", setting: "A.C. 195",
    summary: "Five teenage pilots drop to Earth in five Gundams on a mission against the Alliance and the secret society OZ. It's a story of politics, pacifism and impossible loyalties, and a huge hit in the West.",
    characters: ["Heero Yuy", "Duo Maxwell", "Trowa Barton", "Quatre Raberba Winner", "Chang Wufei", "Relena Peacecraft", "Zechs Merquise"],
    suits: ["XXXG-01W Wing Gundam", "XXXG-00W0 Wing Gundam Zero", "OZ-13MS Gundam Epyon", "OZ-06MS Leo"] },
  { title: "Gundam Wing: Endless Waltz", year: 1997, art: [[3,4]], type: "OVA", era: "AC", setting: "A.C. 196",
    summary: "A year after Wing, a rebellion forces the five pilots back into their redesigned Gundams one last time. The Wing Zero design from Endless Waltz is one of the most popular kits ever.",
    characters: ["Heero Yuy", "Relena Peacecraft", "Chang Wufei", "Zechs Merquise"],
    suits: ["XXXG-00W0 Wing Gundam Zero (EW)", "XXXG-01D Gundam Deathscythe Hell (EW)"] },
  { title: "After War Gundam X", year: 1996, art: [[3,5],[3,6]], type: "TV", era: "AW", setting: "A.W. 0015",
    summary: "On an Earth ruined by colony drops, young scavenger Garrod Ran steals the Gundam X and joins the land-ship crew of Jamil Neate to protect Tiffa Adill, a girl with strange powers.",
    characters: ["Garrod Ran", "Tiffa Adill", "Jamil Neate", "Witz Sou"],
    suits: ["GX-9900 Gundam X", "GX-9901-DX Gundam Double X"] },
  { title: "Mobile Suit Gundam SEED", year: 2002, art: [[3,8],[3,9]], type: "TV", era: "CE", setting: "C.E. 71",
    summary: "Coordinator student Kira Yamato ends up piloting the Earth Alliance's Strike Gundam against his best friend Athrun, who fights for ZAFT. A new-millennium take on the original, and a huge entry point for a generation of fans.",
    characters: ["Kira Yamato", "Athrun Zala", "Lacus Clyne", "Cagalli Yula Athha", "Mu La Flaga", "Rau Le Creuset"],
    suits: ["GAT-X105 Strike Gundam", "ZGMF-X10A Freedom Gundam", "ZGMF-X09A Justice Gundam", "GAT-X303 Aegis Gundam"],
    start: true },
  { title: "Mobile Suit Gundam SEED Destiny", year: 2004, art: [[4,1],[4,2],[3,10]], type: "TV", era: "CE", setting: "C.E. 73",
    summary: "Two years later, war breaks out again. Angry young ZAFT pilot Shinn Asuka fights from the other side, while Kira and Athrun are drawn back in.",
    characters: ["Shinn Asuka", "Athrun Zala", "Kira Yamato", "Lunamaria Hawke", "Gilbert Durandal"],
    suits: ["ZGMF-X42S Destiny Gundam", "ZGMF-X20A Strike Freedom Gundam", "ZGMF-X56S Impulse Gundam", "ZGMF-X19A Infinite Justice Gundam"] },
  { title: "Mobile Suit Gundam SEED Freedom", year: 2024, art: [[4,2]], type: "Film", era: "CE", setting: "C.E. 75",
    summary: "The long-awaited film sequel. Kira, Lacus and the peacekeeping group Compass face a new nation that wants to remake the world according to genetic destiny.",
    characters: ["Kira Yamato", "Lacus Clyne", "Athrun Zala", "Shinn Asuka"],
    suits: ["STTS-909 Rising Freedom Gundam", "Mighty Strike Freedom Gundam", "Immortal Justice Gundam"] },
  { title: "Mobile Suit Gundam 00", year: 2007, art: [[4,5],[4,6],[4,7]], type: "TV", era: "AD", setting: "A.D. 2307",
    summary: "The private group Celestial Being reveals four Gundams and declares war on war itself, attacking anyone who starts a conflict. Former child soldier Setsuna F. Seiei pilots the Exia. Smart, modern and a common starting point.",
    characters: ["Setsuna F. Seiei", "Lockon Stratos", "Allelujah Haptism", "Tieria Erde", "Graham Aker", "Marina Ismail"],
    suits: ["GN-001 Gundam Exia", "GN-0000 00 Gundam", "GN-0000+GNR-010 00 Raiser", "GN-002 Gundam Dynames"],
    start: true },
  { title: "Mobile Suit Gundam AGE", year: 2011, art: [[4,8],[4,9],[4,10],[5,1]], type: "TV", era: "AG", setting: "A.G. 115–",
    summary: "One war across three generations. Flit Asuno, his son Asemu and his grandson Kio each pilot an evolving Gundam AGE against the Vagan. Aimed at younger viewers and very kit-friendly.",
    characters: ["Flit Asuno", "Asemu Asuno", "Kio Asuno", "Zeheart Galette"],
    suits: ["AGE-1 Gundam AGE-1", "AGE-2 Gundam AGE-2", "AGE-3 Gundam AGE-3", "AGE-FX Gundam AGE-FX"] },
  { title: "Mobile Suit Gundam: Iron-Blooded Orphans", year: 2015, art: [[5,3]], type: "TV", era: "PD", setting: "P.D. 323",
    summary: "Child soldiers on Mars form the mercenary group Tekkadan and take a job escorting a young activist to Earth. Mikazuki Augus pilots the ancient Gundam Barbatos. No beam weapons here, just maces, swords and raw force. Gritty and hugely popular.",
    characters: ["Mikazuki Augus", "Orga Itsuka", "Kudelia Aina Bernstein", "McGillis Fareed", "Gaelio Bauduin"],
    suits: ["ASW-G-08 Gundam Barbatos", "ASW-G-08 Gundam Barbatos Lupus Rex", "ASW-G-01 Gundam Bael", "EB-06 Graze"],
    start: true },
  { title: "Mobile Suit Gundam: The Witch from Mercury", year: 2022, type: "TV", era: "AS", setting: "A.S. 122",
    summary: "Suletta Mercury transfers to a corporate academy, wins a duel, and ends up engaged to Miorine Rembran. Her Gundam Aerial hides a dark secret. Mixing school drama with corporate conspiracy, it's a modern hit and a great first series.",
    characters: ["Suletta Mercury", "Miorine Rembran", "Guel Jeturk", "Elan Ceres", "Prospera"],
    suits: ["XVX-016 Gundam Aerial", "XVX-016RN Gundam Aerial Rebuild", "X-EX01 Gundam Calibarn", "MD-0032 Darilbalde"],
    start: true },
  { title: "Mobile Suit Gundam GQuuuuuuX", year: 2025, type: "TV", era: "ALT", setting: "U.C. 0085 (alternate)",
    summary: "What if Zeon had won the One Year War? Years after that victory, high-school student Amate Yuzuriha gets pulled into illegal mobile suit duels piloting the GQuuuuuuX. It's a stylish what-if made with Studio Khara.",
    characters: ["Amate Yuzuriha (Machu)", "Nyaan", "Shuji Ito"],
    suits: ["GQuuuuuuX", "Red Gundam"] },

  // ---------------- Build series ----------------
  { title: "Gundam Build Fighters", year: 2013, art: [[5,5]], type: "TV", era: "BUILD", setting: "Modern day",
    summary: "Gunpla battling is a worldwide sport. Builder Sei Iori teams up with the mysterious pilot Reiji to enter the championship with his Build Strike Gundam. The series that's a love letter to the hobby itself.",
    characters: ["Sei Iori", "Reiji", "Ral", "Aila Jyrkiäinen", "Yuuki Tatsuya"],
    suits: ["GAT-X105B Build Strike Gundam", "Star Build Strike Gundam", "Gundam Amazing Exia"] },
  { title: "Gundam Build Fighters Try", year: 2014, art: [[5,6],[5,7]], type: "TV", era: "BUILD", setting: "Modern day",
    summary: "Seven years later, a three-person team from Seiho Academy enters the team Gunpla Battle tournament.",
    characters: ["Sekai Kamiki", "Yuuma Kousaka", "Fumina Hoshino"],
    suits: ["BG-011B Build Burning Gundam", "Try Burning Gundam"] },
  { title: "Gundam Build Divers", year: 2018, art: [[5,8]], type: "TV", era: "BUILD", setting: "Modern day",
    summary: "Gunpla battles move into an online game, GBN. Riku Mikami and his friends form a force and run into a strange girl named Sarah.",
    characters: ["Riku Mikami", "Yukio Hiyama", "Sarah", "Kyoya Kujo"],
    suits: ["GN-0000DVR Gundam 00 Diver", "Gundam 00 Sky"] },
  { title: "Gundam Build Divers Re:Rise", year: 2019, art: [[5,9]], type: "TV", era: "BUILD", setting: "Modern day",
    summary: "A team of GBN players take on missions that turn out to be connected to a real war on another world.",
    characters: ["Hiroto Kuga", "Kazami Torimachi", "May", "Parviz"],
    suits: ["Core Gundam", "Earthree Gundam", "Uraven Gundam"] },
  { title: "Gundam Build Metaverse", year: 2023, art: [[5,10]], type: "ONA", era: "BUILD", setting: "Modern day",
    summary: "A short series celebrating the Build franchise. A new generation of builders crosses paths with heroes from Build Fighters and Build Divers.",
    characters: ["Rio Hoshino", "Sei Iori", "Riku Mikami"],
    suits: ["Gundam Helios"] },
];

const CHARACTERS = [
  { name: "Amuro Ray", series: "Mobile Suit Gundam · Zeta · Char's Counterattack", era: "UC",
    bio: "A shy, mechanically gifted teen who becomes the Federation's greatest ace and one of the first Newtypes, people whose awareness lets them sense others. He is Char's lifelong rival." },
  { name: "Char Aznable", series: "Mobile Suit Gundam · Zeta · Char's Counterattack", era: "UC",
    bio: "The 'Red Comet', a masked Zeon ace secretly out for revenge on the Zabi family. Charismatic and tragic, he became the template for every masked rival in anime." },
  { name: "Bright Noa", series: "Mobile Suit Gundam → Hathaway", era: "UC",
    bio: "The young captain of the White Base, who later commands across the whole Universal Century. Famous for keeping a crew of teenagers alive." },
  { name: "Kamille Bidan", series: "Zeta Gundam", era: "UC",
    bio: "An angry, deeply sensitive Newtype who pilots the Zeta Gundam. His story is one of the most intense in the franchise." },
  { name: "Haman Karn", series: "Zeta Gundam · Gundam ZZ", era: "UC",
    bio: "The steely regent of Axis and leader of Neo Zeon, ruling in the name of the young Mineva Zabi. She pilots the Qubeley." },
  { name: "Banagher Links", series: "Gundam Unicorn", era: "UC",
    bio: "A kind-hearted student who becomes the pilot of the Unicorn Gundam and the key to Laplace's Box." },
  { name: "Domon Kasshu", series: "G Gundam", era: "FC",
    bio: "Neo Japan's Gundam Fighter, a hot-blooded martial artist whose glowing 'Shining Finger' became iconic." },
  { name: "Heero Yuy", series: "Gundam Wing", era: "AC",
    bio: "A stoic, ruthlessly trained operative piloting Wing Gundam, who slowly learns what he's actually fighting for." },
  { name: "Kira Yamato", series: "Gundam SEED · Destiny · Freedom", era: "CE",
    bio: "A gentle Coordinator forced into war, who becomes an unstoppable pilot of the Strike and Freedom Gundams while trying not to kill." },
  { name: "Athrun Zala", series: "Gundam SEED · Destiny · Freedom", era: "CE",
    bio: "Kira's childhood friend turned enemy, a ZAFT ace torn between duty, family and friendship." },
  { name: "Setsuna F. Seiei", series: "Gundam 00", era: "AD",
    bio: "A former child soldier who believes the Gundam itself can end war. He pilots the Exia and later the 00 Gundam." },
  { name: "Mikazuki Augus", series: "Iron-Blooded Orphans", era: "PD",
    bio: "A quiet, ferocious pilot linked to the Barbatos through spinal implants, loyal above all to his friend Orga." },
  { name: "Suletta Mercury", series: "The Witch from Mercury", era: "AS",
    bio: "A shy girl from Mercury who duels her way into a corporate academy's politics. Her Gundam Aerial is more than it seems." },
  { name: "Sei Iori", series: "Gundam Build Fighters", era: "BUILD",
    bio: "A gifted Gunpla builder who can't pilot to save his life, until he teams up with Reiji. Every builder knows the feeling." },
];

// ---------------- RENDER ----------------
(function () {
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const eraTag = (key) => { const e = ERAS[key]; return `<span class="era-tag" style="--ec:${e.color}">${esc(e.short)}</span>`; };
  let filter = "all";
  let query = "";

  /* Card art: images/gundam-grid.jpg is a 554×554 sheet of 5 rows × 10 cards.
     Each thumbnail shows one card from it via background-position (a CSS sprite). */
  const GRID = { x: [3, 58, 113, 168, 223, 278, 333, 388, 444, 499], y: [16, 127, 236, 347, 457], w: 53, h: 92 };
  const THUMB_W = 74, SCALE = THUMB_W / GRID.w;
  const sprite = ([r, c], title) => `<span class="mech-thumb" role="img" aria-label="${esc(title)} mobile suit art" style="
      width:${THUMB_W}px;height:${Math.round(GRID.h * SCALE)}px;
      background-size:${Math.round(554 * SCALE)}px ${Math.round(554 * SCALE)}px;
      background-position:-${Math.round(GRID.x[c - 1] * SCALE)}px -${Math.round(GRID.y[r - 1] * SCALE)}px"></span>`;
  const artStrip = (s) => s.art ? `<div class="art-strip">${s.art.map((a) => sprite(a, s.title)).join("")}</div>` : "";

  // Era explainer
  $("#eraGrid").innerHTML = Object.entries(ERAS).map(([key, e]) => `
    <button class="panel era-card" data-era="${key}" style="--ec:${e.color}">
      <span class="era-abbr">${esc(e.short)}</span>
      <h4>${esc(e.name)}</h4>
      <p>${esc(e.about)}</p>
      <span class="era-count">${SERIES.filter((s) => s.era === key).length} entries →</span>
    </button>`).join("");

  // Where to start
  $("#startGrid").innerHTML = SERIES.filter((s) => s.start).map((s) => `
    <a class="panel start-card" href="#series-${slug(s.title)}" data-jump="${slug(s.title)}">
      ${eraTag(s.era)} <b>${esc(s.title)}</b><span>${s.year} · ${esc(s.type)}</span>
    </a>`).join("");

  function slug(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

  function matches(s) {
    if (filter === "UC" && s.era !== "UC") return false;
    if (filter === "ALTS" && ["UC", "BUILD"].includes(s.era)) return false;
    if (filter === "BUILD" && s.era !== "BUILD") return false;
    if (!["all", "UC", "ALTS", "BUILD"].includes(filter) && s.era !== filter) return false;
    if (!query) return true;
    const hay = [s.title, s.setting, s.summary, ERAS[s.era].name, ...s.characters, ...s.suits].join(" ").toLowerCase();
    return hay.includes(query);
  }

  function renderSeries() {
    const list = SERIES.filter(matches);
    $("#seriesCount").textContent = `${list.length} of ${SERIES.length}`;
    $("#seriesGrid").innerHTML = list.length ? list.map((s) => `
      <article class="panel series-card" id="series-${slug(s.title)}" style="--ec:${ERAS[s.era].color}">
        ${artStrip(s)}
        <div class="series-top">
          ${eraTag(s.era)}
          <span class="series-meta">${s.year} · ${esc(s.type)}</span>
          ${s.start ? `<span class="start-badge">GOOD FIRST WATCH</span>` : ""}
        </div>
        <h3>${esc(s.title)}</h3>
        <div class="series-setting">${esc(ERAS[s.era].name)} — ${esc(s.setting)}</div>
        <p>${esc(s.summary)}</p>
        <details>
          <summary>Characters &amp; mobile suits</summary>
          <div class="detail-cols">
            <div><h5>Key characters</h5><ul>${s.characters.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
            <div><h5>Key mobile suits</h5><ul>${s.suits.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>
          </div>
        </details>
      </article>`).join("")
      : `<div class="panel empty">Nothing matches "${esc(query)}". Try a pilot, suit or series name.</div>`;
  }

  $("#charGrid").innerHTML = CHARACTERS.map((c) => `
    <div class="panel char-card" style="--ec:${ERAS[c.era].color}">
      <div class="char-top"><span class="char-initial">${esc(c.name[0])}</span><div><h4>${esc(c.name)}</h4><small>${esc(c.series)}</small></div></div>
      <p>${esc(c.bio)}</p>
    </div>`).join("");

  // Filters + search
  const chips = [["all", "All"], ["UC", "Universal Century"], ["ALTS", "Alternate timelines"], ["BUILD", "Build series"]];
  $("#seriesFilters").innerHTML = chips.map(([k, l]) => `<button class="chip ${k === "all" ? "on" : ""}" data-f="${k}">${l}</button>`).join("");
  function setFilter(f) {
    filter = f;
    $$("#seriesFilters .chip").forEach((c) => c.classList.toggle("on", c.dataset.f === f));
    renderSeries();
  }
  $("#seriesFilters").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) setFilter(c.dataset.f); });
  $("#seriesSearch").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); renderSeries(); });

  // Era card → filter the series list to that era
  $("#eraGrid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-era]");
    if (!card) return;
    const era = card.dataset.era;
    filter = era;
    $$("#seriesFilters .chip").forEach((c) => c.classList.remove("on"));
    renderSeries();
    $("#series").scrollIntoView({ behavior: "smooth" });
  });

  // "Where to start" → reset filters, open that card
  $("#startGrid").addEventListener("click", (e) => {
    const a = e.target.closest("[data-jump]");
    if (!a) return;
    e.preventDefault();
    query = ""; $("#seriesSearch").value = "";
    setFilter("all");
    const card = document.getElementById("series-" + a.dataset.jump);
    if (card) { card.querySelector("details").open = true; card.scrollIntoView({ behavior: "smooth", block: "start" }); card.classList.add("flash"); setTimeout(() => card.classList.remove("flash"), 1600); }
  });

  renderSeries();
})();
