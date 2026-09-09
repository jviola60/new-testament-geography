/**
 * Headless render check: every tab for Judea, priority cities, churches.
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
  "js/data/placeDossiers.js",
  "js/uiController.js"
];

const mockEl = () => {
  const el = {
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    style: {},
    innerHTML: "",
    textContent: "",
    addEventListener() {},
    querySelectorAll() { return []; },
    querySelector() { return mockEl(); }
  };
  return el;
};

const sandbox = {
  window: { app: { timeline: { formatYear: (y) => (y < 0 ? `${-y} BC` : `${y} AD`) }, map: { flyToLocation() {}, focusRegion() {} } } },
  console,
  document: {
    getElementById: () => mockEl(),
    querySelectorAll: () => [],
    querySelector: () => mockEl(),
    addEventListener() {}
  },
  L: {}
};
sandbox.window = Object.assign(sandbox.window, sandbox);
vm.createContext(sandbox);
let bundle = files.map((f) => fs.readFileSync(path.join("/workspace", f), "utf8")).join("\n;\n");
bundle = bundle.replace(/^const ([A-Z_][A-Z0-9_]*)/gm, "var $1");
bundle = bundle.replace(/^class UIController/, "var UIController = class UIController");
vm.runInContext(bundle, sandbox);

const ui = vm.runInContext("new UIController()", sandbox);
ui.sidebar = mockEl();
ui.sidebarTitle = mockEl();
ui.sidebarEyebrow = mockEl();
ui.sidebarContent = mockEl();
ui.tabButtons = [];

const tabs = ["overview", "scripture", "people", "political", "chronology"];
const failures = [];

function assertTabs(label, type, data) {
  ui.currentActiveItem = { type, data };
  tabs.forEach((tab) => {
    ui.currentTab = tab;
    ui.sidebarContent.innerHTML = "";
    ui.renderActiveItemTabs();
    const html = ui.sidebarContent.innerHTML || "";
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length < 40) {
      failures.push(`${label} / ${tab}: too short (${text.length}) "${text.slice(0, 60)}"`);
    }
    if (/undefined/.test(html)) {
      failures.push(`${label} / ${tab}: contains undefined`);
    }
  });
}

const judea = sandbox.REGIONS_DATA.regions.find((r) => r.id === "judea");
assertTabs("Judea", "region", judea);

["jerusalem", "nazareth", "bethlehem", "capernaum", "jericho", "bethany", "caesarea-maritima", "damascus", "antioch-syria", "ephesus", "corinth", "rome"].forEach((id) => {
  const city = sandbox.CITIES_DATA.find((c) => c.id === id);
  if (!city) failures.push(`missing city ${id}`);
  else assertTabs(city.name, "city", city);
});

sandbox.CITIES_DATA.forEach((c) => assertTabs(`city:${c.id}`, "city", c));
sandbox.COMMUNITIES_DATA.churchesMultiplication.forEach((c) => assertTabs(`church:${c.city}`, "church", c));
sandbox.COMMUNITIES_DATA.diasporaSettlements.forEach((d) => assertTabs(`diaspora:${d.id}`, "diaspora", d));
sandbox.MISSIONARY_JOURNEYS.forEach((j) => assertTabs(`journey:${j.id}`, "journey", j));
(sandbox.window.GEO_FEATURES || []).forEach((g) => assertTabs(`geo:${g.id}`, "geo", g));

if (failures.length) {
  console.log("FAILURES", failures.length);
  failures.slice(0, 40).forEach((f) => console.log(" -", f));
  process.exit(1);
}
console.log("Rendered all five tabs for regions, cities, churches, diaspora, journeys, and geo features with no blank panels.");
