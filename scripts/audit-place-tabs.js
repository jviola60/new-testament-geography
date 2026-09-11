/**
 * Audit every map entity for the 5 sidebar tab fields.
 * Run: node scripts/audit-place-tabs.js
 */
const fs = require("fs");
const vm = require("vm");
const path = require("path");

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
  "js/data/placeDossiers.js"
];

const sandbox = { window: {}, console };
vm.createContext(sandbox);
let bundle = files.map((f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8")).join("\n;\n");
bundle = bundle.replace(/^const ([A-Z_][A-Z0-9_]*)/gm, "var $1");
vm.runInContext(bundle, sandbox);

const GEO = sandbox.GEO_FEATURES || sandbox.window.GEO_FEATURES;
sandbox.GEO_FEATURES = GEO;
if (!GEO) {
  console.error("GEO_FEATURES missing");
  process.exit(1);
}

const required = ["overview", "scriptures", "peopleAndChurch", "politicalInsights", "eraChronology"];
const missing = [];

function check(kind, id, obj) {
  required.forEach((field) => {
    const val = obj[field];
    const empty = val == null || val === "" || (Array.isArray(val) && val.length === 0);
    if (empty) missing.push(`${kind}:${id}:${field}`);
  });
}

sandbox.REGIONS_DATA.regions.forEach((r) => check("region", r.id, r));
sandbox.CITIES_DATA.forEach((c) => check("city", c.id, c));
sandbox.JERUSALEM_SITES.forEach((s) => check("site", s.id, s));
sandbox.JERUSALEM_GEOGRAPHY.quarters.forEach((q) => check("quarter", q.id, q));
sandbox.COMMUNITIES_DATA.churchesMultiplication.forEach((c) => check("church", c.city, c));
sandbox.COMMUNITIES_DATA.diasporaSettlements.forEach((d) => check("diaspora", d.id, d));
sandbox.GEO_FEATURES.forEach((g) => check("geo", g.id, g));

const cityIds = sandbox.CITIES_DATA.map((c) => c.id);
["bethany", "emmaus", "magdala", "tiberias", "jerusalem", "nazareth", "capernaum"].forEach((id) => {
  if (!cityIds.includes(id)) missing.push(`missing-city:${id}`);
});

console.log("cities:", sandbox.CITIES_DATA.length);
console.log("regions:", sandbox.REGIONS_DATA.regions.length);
console.log("geo features:", sandbox.GEO_FEATURES.length);
if (missing.length) {
  console.log("MISSING", missing.length);
  missing.forEach((m) => console.log(" -", m));
  process.exit(1);
}
console.log("All places have 5-tab fields.");

// Satellite pin ID mismatches that previously closed the modal with no dossier
const pinCases = [
  { kind: "city", q: "Bethany" },
  { kind: "city", q: "Magdala" },
  { kind: "city", q: "Tiberias" },
  { kind: "city", q: "Emmaus" },
  { kind: "city", q: "Caesarea Maritima" },
  { kind: "quarter", q: "temple-mount" },
  { kind: "quarter", q: "hinnom-valley" },
  { kind: "quarter", q: "golgotha" },
  { kind: "site", q: "gethsemane" },
  { kind: "site", q: "pool-of-siloam" },
  { kind: "region", q: "Judea" },
  { kind: "geo", q: "Jordan River" },
  { kind: "geo", q: "Sea of Galilee" },
  { kind: "geo", q: "Decapolis" }
];
const pinMiss = [];
pinCases.forEach(({ kind, q }) => {
  const n = q.toLowerCase();
  let found = false;
  if (kind === "city") {
    found = sandbox.CITIES_DATA.some((c) => c.name.toLowerCase() === n || c.name.toLowerCase().includes(n) || n.includes(c.name.toLowerCase()));
  } else if (kind === "quarter") {
    found = sandbox.JERUSALEM_GEOGRAPHY.quarters.some((x) => x.id === q || x.id === `area-${q}` || x.id.includes(q.replace("-valley", "")) || x.name.toLowerCase().includes(n));
  } else if (kind === "site") {
    found = sandbox.JERUSALEM_SITES.some((s) => {
      const compact = (x) => String(x).toLowerCase().replace(/[^a-z0-9]+/g, "");
      return s.id.includes(q) || compact(s.id).includes(compact(q)) || s.name.toLowerCase().includes(n.replace(/-/g, " "));
    });
  } else if (kind === "region") {
    found = sandbox.REGIONS_DATA.regions.some((r) => r.name.toLowerCase().includes(n) || r.id === n);
  } else if (kind === "geo") {
    found = GEO.some((g) => g.name.toLowerCase().includes(n) || (g.ancientName && g.ancientName.toLowerCase().includes(n)) || n.includes(g.id.replace(/-/g, " ")));
    if (!found && n === "decapolis") {
      found = sandbox.REGIONS_DATA.regions.some((r) => r.id === "decapolis");
    }
  }
  if (!found) pinMiss.push(`${kind}:${q}`);
});
if (pinMiss.length) {
  console.log("PIN LOOKUP GAPS", pinMiss);
  process.exit(1);
}
console.log("Priority pin lookups resolve.");

