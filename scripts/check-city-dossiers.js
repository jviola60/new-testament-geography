const fs = require("fs");
const vm = require("vm");

const sandbox = { window: {}, console };
vm.createContext(sandbox);

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

let bundle = files.map(f => fs.readFileSync(f, "utf8")).join("\n;\n");
bundle = bundle.replace(/^const ([A-Z_][A-Z0-9_]*)/gm, "var $1");
bundle = bundle.replace(/^class UIController/, "var UIController = class UIController");
vm.runInContext(bundle, sandbox);

const cities = sandbox.CITIES_DATA || [];
console.log(`Checking ${cities.length} cities against Corinth Gold Standard...\n`);

let passCount = 0;
let failCount = 0;

cities.forEach((c) => {
  const sc = (c.scriptures || []).length;
  const ppl = c.peopleAndChurch || "";
  const pol = c.politicalInsights || "";
  const era = c.eraChronology || "";
  const t = c.teachings;

  const hasTeach = t && t.teacher && t.audience && t.whatWasTaught && t.whyTaught && t.context && t.howAccepted && (t.passages || []).length > 0;
  const pplBullets = ppl.includes("• ");
  const polBullets = pol.includes("• ");
  const eraBullets = era.includes("• ");
  const minLength = ppl.length >= 250 && pol.length >= 250 && era.length >= 200 && (c.overview || "").length >= 250;
  const scSufficient = sc >= 3;

  const passes = hasTeach && pplBullets && polBullets && eraBullets && minLength && scSufficient;
  if (passes) {
    passCount++;
    console.log(`PASS [${c.id.padEnd(20)}] sc: ${sc} | ppl: ${ppl.length} | pol: ${pol.length} | era: ${era.length} | teach: YES`);
  } else {
    failCount++;
    const issues = [];
    if (!scSufficient) issues.push(`sc=${sc}<3`);
    if (!hasTeach) issues.push("missing/incomplete teachings");
    if (!pplBullets) issues.push("ppl missing '• '");
    if (!polBullets) issues.push("pol missing '• '");
    if (!eraBullets) issues.push("era missing '• '");
    if (!minLength) issues.push("text too short");
    console.log(`FAIL [${c.id.padEnd(20)}] ${issues.join(", ")}`);
  }
});

console.log(`\nResults: ${passCount} Passed, ${failCount} Failed (Total: ${cities.length})`);

