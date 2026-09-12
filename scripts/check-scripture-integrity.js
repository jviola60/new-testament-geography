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
  "sardis", "rome"
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

if (fails.length) {
  console.error(`FAIL ${fails.length}`);
  fails.forEach((f) => console.error(" -", f));
  process.exit(1);
}
console.log("Scripture integrity checks passed.");
