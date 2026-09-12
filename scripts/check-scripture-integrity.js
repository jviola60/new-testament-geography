/**
 * Scripture-integrity guards for place cards.
 * Run: node scripts/check-scripture-integrity.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const files = [
  "js/data/regions.js",
  "js/data/cities.js",
  "js/data/jerusalemSites.js",
  "js/data/jerusalemGeography.js",
  "js/data/saviorEvents.js",
  "js/data/missionaryJourneys.js",
  "js/data/communities.js",
  "js/data/timelineEvents.js",
  "js/data/tours.js",
  "js/data/placeDossiers.js",
  "js/data/scriptureTranslations.js",
  "js/data/churchVideos.js",
  "js/uiController.js"
];

const sandbox = { window: {}, console, document: { getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; } } };
vm.createContext(sandbox);
let bundle = files.map((f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8")).join("\n;\n");
bundle = bundle.replace(/^const ([A-Z_][A-Z0-9_]*)/gm, "var $1");
bundle = bundle.replace(/^class UIController/m, "var UIController = class UIController");
vm.runInContext(bundle, sandbox);

const ui = new sandbox.UIController();
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

const bannedFallback = /Jesus Christ & His Apostles|Early Believers, Inquirers, and Synagogue Worshippers/;
ok(!bannedFallback.test(fs.readFileSync("js/uiController.js", "utf8")), "uiController still contains the old Jesus+synagogue fallback strings");

const empty = ui.normalizeTeachings("geo", { name: "Unknown Ridge", region: "Nowhere" });
ok(empty.teacher === "See scriptures for who taught here.", `empty fallback teacher is "${empty.teacher}"`);
ok(!/Jesus/.test(empty.teacher), "empty fallback still names Jesus as teacher");
ok(!/synagogue/i.test(empty.audience), `empty fallback audience invents a synagogue: "${empty.audience}"`);

const missingTeacher = ui.normalizeTeachings("city", { teachings: { whatWasTaught: "silence" } });
ok(missingTeacher.teacher === "See scriptures for who taught here.", "empty teacher field defaults to Jesus");

ok(ui.findCityByName("Pisidian Antioch")?.id === "pisidian-antioch", "Pisidian Antioch lookup failed");
ok(ui.findCityByName("Antioch in Pisidia")?.id === "pisidian-antioch", "Antioch in Pisidia lookup failed");
ok(ui.findCityByName("Antioch on the Orontes")?.id === "antioch-syria", "Syrian Antioch lookup failed");
ok(ui.findCityByName("Antioch")?.id === "antioch-syria", "bare Antioch must not inherit Pisidian");
ok(ui.findCityByName("Caesarea Philippi")?.id === "caesarea-philippi", "Caesarea Philippi lookup failed");
ok(ui.findCityByName("Caesarea Maritima")?.id === "caesarea-maritima", "Caesarea Maritima lookup failed");
ok(ui.findCityByName("Caesarea") == null, "bare Caesarea must not guess a city");

const requiredIds = [
  "caesarea-philippi",
  "caesarea-maritima",
  "antioch-syria",
  "salamis-cyprus",
  "paphos-cyprus",
  "pisidian-antioch"
];
const cities = sandbox.CITIES_DATA || [];
requiredIds.forEach((id) => {
  const city = cities.find((c) => c.id === id);
  ok(city, `missing city pin ${id}`);
  ok(city && city.teachings && city.teachings.teacher, `missing CITY_DOSSIER teachings for ${id}`);
});

const malta = cities.find((c) => c.id === "malta");
ok(malta && /Paul/.test(malta.teachings.teacher), `Malta teacher is "${malta && malta.teachings && malta.teachings.teacher}"`);
ok(malta && !/Jesus/.test(malta.teachings.teacher), "Malta still names Jesus as teacher");
ok(malta && !/synagogue/i.test(malta.teachings.whatWasTaught + malta.teachings.context) || /does not.*synagogue/i.test(malta.teachings.whatWasTaught + " " + malta.teachings.context), "Malta teachings do not deny a synagogue");
ok(malta && malta.hasSynagogue === false, "Malta synagogue badge should be false");
ok(/Mark 16:18/.test(malta.teachings.whatWasTaught) && /not taught content|Related footnote/i.test(malta.teachings.whatWasTaught), "Malta should mention Mark 16:18 only as a related footnote");

const eventMalta = ui.normalizeTeachings("event", { id: "event-malta-shipwreck", name: "The Shipwreck on the Island of Malta", title: "The Shipwreck on the Island of Malta" });
ok(/Paul/.test(eventMalta.teacher), `Malta event inherit teacher is "${eventMalta.teacher}"`);
ok(!/Jesus Christ &/.test(eventMalta.teacher), "Malta event still uses the old Jesus fallback");

const pisidian = ui.normalizeTeachings("city", { name: "Pisidian Antioch", id: "pisidian-antioch" });
ok(/Paul/.test(pisidian.teacher), "Pisidian Antioch teacher is not Paul");
ok(/Pisid/i.test(pisidian.context + pisidian.whatWasTaught) || /Acts 13/.test(JSON.stringify(pisidian)), "Pisidian teachings missing Acts 13");
ok(!/Orontes|first called Christians/i.test(pisidian.whatWasTaught), "Pisidian Antioch inherited Syrian Antioch content");

const paulineNoJesus = ["malta", "tarsus", "alexandria", "cyrene", "paphos-cyprus", "philippi", "rome"];
paulineNoJesus.forEach((id) => {
  const city = cities.find((c) => c.id === id);
  const t = city && city.teachings && city.teachings.teacher;
  ok(t && !/^Jesus Christ$/.test(t) && !/Jesus Christ & His Apostles/.test(t), `${id} teacher invents Jesus's personal ministry: "${t}"`);
});

const synagogueFalse = [
  "philippi", "paphos-cyprus", "bethlehem", "bethsaida", "jericho", "joppa",
  "tarsus", "colossae", "miletus", "cyrene", "laodicea", "pergamum",
  "smyrna", "philadelphia", "malta", "magdala", "tiberias", "bethany",
  "sardis", "rome", "antioch-syria", "emmaus"
];
synagogueFalse.forEach((id) => {
  const city = cities.find((c) => c.id === id);
  ok(city && city.hasSynagogue === false, `${id} hasSynagogue should be false (got ${city && city.hasSynagogue})`);
});
ok(cities.find((c) => c.id === "athens")?.hasSynagogue === true, "Athens synagogue badge should stay true");
ok(cities.find((c) => c.id === "salamis-cyprus")?.hasSynagogue === true, "Salamis synagogue badge should stay true");
ok(cities.find((c) => c.id === "pisidian-antioch")?.hasSynagogue === true, "Pisidian Antioch synagogue badge should stay true");

const pisidianCity = cities.find((c) => c.id === "pisidian-antioch");
const pisidianPassages = JSON.stringify(pisidianCity && pisidianCity.teachings && pisidianCity.teachings.passages);
ok(pisidianPassages.includes("Acts 13"), "Pisidian Antioch lost Acts 13 passages");
ok(!/Galatians 2/.test(pisidianPassages), "Pisidian Antioch still cites Galatians 2 (Syrian Antioch)");

const bethlehem = cities.find((c) => c.id === "bethlehem");
const bethTeacher = bethlehem && bethlehem.teachings && bethlehem.teachings.teacher;
ok(bethTeacher && !/Micah|Wise Men|Magi/i.test(bethTeacher), `Bethlehem teacher still lists Micah or Magi: "${bethTeacher}"`);
ok(bethlehem && /angel/i.test(bethlehem.teachings.teacher), "Bethlehem teacher should be the angelic announcement");

const nazareth = cities.find((c) => c.id === "nazareth");
ok(nazareth && /^Jesus/.test(nazareth.teachings.teacher) && !/Gabriel/i.test(nazareth.teachings.teacher), `Nazareth teacher should be Jesus, not Gabriel as co-teacher: "${nazareth && nazareth.teachings && nazareth.teachings.teacher}"`);
ok(nazareth && /Annunciation note|prior note/i.test(nazareth.teachings.audience + nazareth.teachings.whatWasTaught), "Nazareth should keep Gabriel as an Annunciation note");

const cana = cities.find((c) => c.id === "cana");
ok(cana && cana.teachings.teacher === "Jesus Christ", `Cana teacher should be Jesus only: "${cana && cana.teachings && cana.teachings.teacher}"`);
ok(cana && /counsel to the servants|not a teaching office/i.test(cana.teachings.whatWasTaught), "Cana should label Mary's John 2:5 as counsel, not teaching office");
ok(cana && /later reading|not the plain sense/i.test(cana.teachings.whatWasTaught), "Cana should not state OT→NT wine allegory as plain sense");

const bethsaida = cities.find((c) => c.id === "bethsaida");
ok(bethsaida && !/make Him an earthly political king|make him a king/i.test(bethsaida.teachings.howAccepted), "Bethsaida howAccepted still treats John 6:15 as a Bethsaida scene");
ok(bethsaida && /John 6:15/.test(bethsaida.teachings.context) && /Capernaum|Tiberias/.test(bethsaida.teachings.context), "Bethsaida should relocate John 6:15 to the Capernaum/Tiberias arc");
ok(bethsaida && bethsaida.teachings.passages.includes("Luke 9:10-17") && bethsaida.teachings.passages.includes("Mark 8:22-26") && bethsaida.teachings.passages.includes("Matthew 11:21-22"), "Bethsaida lost Luke 9 / Mark 8 / Matt 11 passages");
ok(bethsaida && !bethsaida.teachings.passages.some((p) => /John 6/.test(p)), "Bethsaida passages still include the John 6 feeding arc");

const jericho = cities.find((c) => c.id === "jericho");
ok(jericho && !jericho.teachings.passages.some((p) => /Luke 10/.test(p)), "Jericho teachings passages still list Luke 10 as a Jericho sermon");
ok(jericho && /parable/.test(jericho.teachings.context), "Jericho should mark Luke 10 as parable setting, not a local sermon");

const lystra = cities.find((c) => c.id === "lystra");
ok(lystra && /already/.test(lystra.teachings.howAccepted) && /Acts 16:1/.test(lystra.teachings.howAccepted), "Lystra should say Timothy was already a disciple (Acts 16:1)");
ok(lystra && /2 Timothy 1:5/.test(lystra.teachings.howAccepted) && !/conversion and spiritual formation of young Timothy/.test(lystra.teachings.howAccepted), "Lystra should not treat Lois/Eunice as an Acts 14 conversion");

const smyrna = cities.find((c) => c.id === "smyrna");
ok(smyrna && /later Christian memory/i.test(smyrna.teachings.howAccepted) && /Polycarp/.test(smyrna.teachings.howAccepted), "Smyrna should label Polycarp as later Christian memory");

const philadelphia = cities.find((c) => c.id === "philadelphia");
ok(philadelphia && !/1390|14th/.test(philadelphia.teachings.howAccepted), "Philadelphia howAccepted should stop at Revelation 3");
ok(philadelphia && /Revelation 3/.test(philadelphia.teachings.howAccepted), "Philadelphia howAccepted should cite Revelation 3");

const laodicea = cities.find((c) => c.id === "laodicea");
ok(laodicea && /epistle from Laodicea/i.test(laodicea.teachings.howAccepted) && !/lost Epistle/.test(laodicea.teachings.howAccepted + JSON.stringify(laodicea.epistles || [])), "Laodicea should treat Col 4:16 as a letter exchange, not a proven lost Pauline epistle");
ok(laodicea && /inference/.test(laodicea.teachings.howAccepted) && /later history/i.test(laodicea.teachings.howAccepted), "Laodicea should label Epaphras planting as inference and the Council as later history");

const pergamum = cities.find((c) => c.id === "pergamum");
ok(pergamum && /Antipas/.test(pergamum.teachings.howAccepted), "Pergamum lost Antipas");
ok(pergamum && !/lasting Christian center|Byzantine era/.test(pergamum.teachings.howAccepted), "Pergamum howAccepted still claims later civic triumph");

const thyatira = cities.find((c) => c.id === "thyatira");
ok(thyatira && /Reconstruction/.test(thyatira.teachings.context), "Thyatira should label guild/Apollo as reconstruction");
ok(thyatira && !/centuries of subsequent/.test(thyatira.teachings.howAccepted), "Thyatira howAccepted still invents centuries of witness");

const jerusalem = cities.find((c) => c.id === "jerusalem");
ok(jerusalem && /brother of the Lord/.test(jerusalem.teachings.teacher), "Jerusalem teacher should name James as brother of the Lord, not bishop");
ok(jerusalem && !/bishop/i.test(jerusalem.teachings.teacher + jerusalem.teachings.howAccepted), "Jerusalem teaching fields still use bishop");
ok(jerusalem && /Later history/.test(jerusalem.teachings.howAccepted) && /70/.test(jerusalem.teachings.howAccepted), "Jerusalem should label James ~62 and Temple 70 as later history");

const emmaus = cities.find((c) => c.id === "emmaus");
ok(emmaus && emmaus.lat && emmaus.lng, "Emmaus city pin missing");
ok(emmaus && /traditional/i.test(emmaus.jewishDiasporaInfo + (emmaus.overview || "")), "Emmaus pin should document traditional site identification");

const magdala = cities.find((c) => c.id === "magdala");
ok(magdala && magdala.teachings.passages.includes("Matthew 15:39"), "Magdala passages should include Matthew 15:39");
ok(magdala && /Magadan/.test(magdala.teachings.whatWasTaught) && /No synagogue sermon/i.test(magdala.teachings.whatWasTaught), "Magdala should be honest about coasts of Magdala/Magadan and no synagogue sermon");
ok(magdala && !/^Jesus Christ$/.test(magdala.teachings.teacher), `Magdala teacher still invents a local office: "${magdala && magdala.teachings && magdala.teachings.teacher}"`);
ok(magdala && /Matthew 15:39/.test(magdala.teachings.teacher) && /no synagogue sermon/i.test(magdala.teachings.teacher), "Magdala teacher should mirror Malta-style honesty (coasts recorded; no narrated synagogue sermon)");

const capernaumContext = cities.find((c) => c.id === "capernaum");
ok(capernaumContext && /Archaeological color \(not a verse\)/.test(capernaumContext.teachings.context), "Capernaum context should label basalt/Peter's house as archaeological color, not a verse");
ok(capernaumContext && /Mark 1:21/.test(capernaumContext.teachings.context), "Capernaum context should keep the synagogue on a verse (Mark 1:21)");

ok(cities.find((c) => c.id === "antioch-syria")?.hasSynagogue === false, "Antioch on the Orontes synagogue badge should be false (no narrated synagogue discourse)");

if (fails.length) {
  console.error(`FAIL ${fails.length}`);
  fails.forEach((f) => console.error(" -", f));
  process.exit(1);
}
console.log("Scripture integrity checks passed.");
