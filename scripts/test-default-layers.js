/**
 * Verification test for default map layers, atlas legend visibility, and quick jump location dropdown.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Verify index.html markup
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Fresh-load chips: every core overlay ON except Growth Heatmap
const filterChipRe = /<button class="filter-chip([^"]*)"[^>]*data-filter="([^"]+)"/g;
const filterChips = [];
let chipMatch;
while ((chipMatch = filterChipRe.exec(htmlContent)) !== null) {
  filterChips.push({ classAttr: chipMatch[1], key: chipMatch[2], html: chipMatch[0] });
}
console.log(`Found ${filterChips.length} filter chips in index.html`);
assert(filterChips.length >= 8, 'Expected at least 8 filter chips');
const expectedOn = ["all", "savior", "diaspora", "churches", "journeys", "provinces", "jerusalemSites", "jerusalemGeography"];
filterChips.forEach(chip => {
  const isActive = chip.classAttr.includes("active");
  if (chip.key === "heatmaps") {
    assert(!isActive, `Growth Heatmap must start OFF: ${chip.html}`);
  } else if (expectedOn.includes(chip.key)) {
    assert(isActive, `Expected ${chip.key} chip to start ON: ${chip.html}`);
  }
});
console.log('✓ Core overlay chips start active; Growth Heatmap starts inactive.');

assert(htmlContent.includes('id="displayYear">100 AD<'), 'Expected first-paint year badge 100 AD');
assert(/id="timelineSlider"[^>]*value="100"/.test(htmlContent), 'Expected timeline slider to start at 100');
assert(/class="era-tab active"[^>]*data-start-year="70"/.test(htmlContent), 'Expected Apostolic Age era tab active at 100 AD');
assert(!/class="era-tab active"[^>]*data-start-year="-6"/.test(htmlContent), 'Nativity must not be the default era tab');
console.log('✓ HTML first paint starts at 100 AD / Apostolic Age.');

// Legend markup stays hidden until JS mounts default-on overlays
assert(htmlContent.includes('id="mapLegend" style="display: none;"'), 'Expected #mapLegend to have style="display: none;"');
console.log('✓ #mapLegend is style="display: none;" before JS init.');

// Ensure quick-jump-container and quickJumpSelect are present in index.html
assert(htmlContent.includes('id="quickJumpContainer"'), 'Expected #quickJumpContainer to exist');
assert(htmlContent.includes('id="quickJumpSelect"'), 'Expected #quickJumpSelect to exist');
console.log('✓ #quickJumpContainer and #quickJumpSelect are present in index.html.');

// Ensure legend items have data-layer attributes
const legendItemMatches = htmlContent.match(/<div class="legend-item"[^>]*data-layer="([^"]+)"/g) || [];
assert(legendItemMatches.length >= 10, `Expected at least 10 legend items with data-layer, found ${legendItemMatches.length}`);
console.log(`✓ Found ${legendItemMatches.length} legend items with data-layer attributes.`);

// 2. Mock Leaflet and test MapController logic
global.L = {
  layerGroup: () => {
    const layers = new Set();
    return {
      addLayer: (l) => layers.add(l),
      removeLayer: (l) => layers.delete(l),
      clearLayers: () => layers.clear(),
      hasLayer: (l) => layers.has(l),
      addTo: function(m) { m.addLayer(this); return this; },
      _layers: layers
    };
  },
  map: () => {
    const mapLayers = new Set();
    return {
      center: [34.5, 31.0],
      zoom: 6,
      getZoom: () => 6,
      getCenter: () => ({ lat: 34.5, lng: 31.0 }),
      addLayer: (l) => mapLayers.add(l),
      removeLayer: (l) => mapLayers.delete(l),
      hasLayer: (l) => mapLayers.has(l),
      on: () => {},
      flyTo: () => {},
      _mapLayers: mapLayers
    };
  },
  control: { attribution: () => ({ addAttribution: () => ({ addTo: () => {} }) }) },
  tileLayer: () => ({ addTo: () => {} }),
  marker: () => ({ bindTooltip: () => {}, on: () => {} }),
  divIcon: () => ({}),
  polygon: () => ({ bindTooltip: () => {}, on: () => {} }),
  polyline: () => ({ bindTooltip: () => {}, on: () => {} }),
  rectangle: () => ({ bindTooltip: () => {}, on: () => {} }),
  imageOverlay: () => ({ addTo: () => {}, bindTooltip: () => {}, on: () => {} }),
  circle: () => ({ bindTooltip: () => {}, on: () => {} }),
  circleMarker: () => ({ bindTooltip: () => {}, on: () => {} }),
  DomEvent: { stopPropagation: () => {} }
};

// Global mocks
global.HYDROGRAPHY_DATA = { jordanRiver: [[32, 35]], seaOfGalilee: [[32, 35]], deadSea: [[31, 35]], roads: [] };
global.REGIONS_DATA = { regions: [{ id: "judea", name: "Judea", capital: "Caesarea", bounds: [[31, 34], [32, 36]] }], cameraPresets: { mediterranean: { center: [34.5, 31.0], zoom: 6 } } };
global.CITIES_DATA = [
  { id: "jerusalem", name: "Jerusalem", region: "Judea", lat: 31.77, lng: 35.23, isMajor: true },
  { id: "corinth", name: "Corinth", region: "Achaia", lat: 37.93, lng: 22.93, isMajor: true }
];
global.JERUSALEM_SITES = [
  { id: "jer-temple", name: "Second Temple", area: "Temple Mount", icon: "🏛️", lat: 31.778, lng: 35.235, scriptures: [] }
];
global.JERUSALEM_GEOGRAPHY = {
  quarters: [{ id: "upper-city", name: "Upper City", elevation: "770m", coordinates: [[31.77, 35.23]] }],
  walls: [],
  valleys: [],
  gates: []
};
global.SAVIOR_EVENTS = [{ id: "s1", year: 28, lat: 32, lng: 35, title: "Ministry Event", scriptures: [] }];
global.MISSIONARY_JOURNEYS = [];
global.COMMUNITIES_DATA = {
  diasporaSettlements: [{ city: "Rome" }],
  churchesMultiplication: [
    { city: "Jerusalem", foundedYear: 30, region: "Judea", lat: 31.77, lng: 35.23, founders: "Apostles" },
    { city: "Corinth", foundedYear: 50, region: "Achaia", lat: 37.93, lng: 22.93, founders: "Paul" }
  ]
};

// DOM mock elements
const domElements = {
  mapLegend: {
    style: { display: "none" },
    querySelectorAll: (selector) => {
      if (selector === ".legend-item[data-layer]") {
        return [
          { dataset: { layer: "savior" }, style: { display: "none" } },
          { dataset: { layer: "journeys" }, style: { display: "none" } },
          { dataset: { layer: "provinces" }, style: { display: "none" } }
        ];
      }
      return [];
    }
  },
  quickJumpSelect: {
    innerHTML: '',
    children: [],
    appendChild: function(child) { this.children.push(child); },
    addEventListener: () => {}
  },
  statEventsCount: { textContent: "0" },
  statChurchesCount: { textContent: "0" },
  statDiasporaCount: { textContent: "0" }
};

global.document = {
  body: { classList: { add: () => {}, remove: () => {} } },
  getElementById: (id) => domElements[id] || null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: (tag) => ({
    tag,
    children: [],
    appendChild: function(c) { this.children.push(c); },
    addEventListener: () => {}
  })
};

// Load MapController
const vm = require('vm');
const mapControllerCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'mapController.js'), 'utf8');
vm.runInThisContext(mapControllerCode);

const mapCtrl = new MapController();
assert.strictEqual(mapCtrl.currentYear, 100, 'Default timeline year should be 100 AD');
assert.strictEqual(mapCtrl.filterState.all, true, 'Default all should be true');
assert.strictEqual(mapCtrl.filterState.savior, true, 'Default savior should be true');
assert.strictEqual(mapCtrl.filterState.diaspora, true, 'Default diaspora should be true');
assert.strictEqual(mapCtrl.filterState.churches, true, 'Default churches should be true');
assert.strictEqual(mapCtrl.filterState.journeys, true, 'Default journeys should be true');
assert.strictEqual(mapCtrl.filterState.provinces, true, 'Default provinces should be true');
assert.strictEqual(mapCtrl.filterState.jerusalemSites, true, 'Default jerusalemSites should be true');
assert.strictEqual(mapCtrl.filterState.jerusalemGeography, true, 'Default jerusalemGeography should be true');
assert.strictEqual(mapCtrl.filterState.heatmaps, false, 'Default Growth Heatmap should be false');
console.log('✓ MapController constructor enables core overlays and starts at 100 AD with Growth off.');

// Init map
mapCtrl.init("map");
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.hydrography), 'Hydrography must be on map by default');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.cities), 'Cities must be on map by default');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.provinces), 'Provinces must be on map by default');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.saviorRoute), 'Savior route must be on map by default');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.saviorMarkers), 'Savior markers must be on map by default');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.missionaryJourneys), 'Missionary journeys must be on map by default');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.diaspora), 'Diaspora must be on map by default');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.churches), 'Churches must be on map by default');
assert(!mapCtrl.map._mapLayers.has(mapCtrl.layers.heatmaps), 'Growth Heatmap must NOT be on map by default');
assert.strictEqual(domElements.mapLegend.style.display, 'block', '#mapLegend must appear when default overlays are on');
console.log('✓ Initial map mounts core overlays, hides Growth, and shows the Atlas Legend.');

// User toggle after load: turning Savior off must not reset other defaults
mapCtrl.setLayerFilter("savior", false);
assert(!mapCtrl.map._mapLayers.has(mapCtrl.layers.saviorMarkers), 'saviorMarkers should unmount when toggled off');
assert(!mapCtrl.map._mapLayers.has(mapCtrl.layers.saviorRoute), 'saviorRoute should unmount when toggled off');
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.missionaryJourneys), 'Other overlays stay mounted after a single toggle');
assert.strictEqual(mapCtrl.filterState.churches, true, 'Churches stay on after Savior is toggled off');
assert.strictEqual(mapCtrl.filterState.heatmaps, false, 'Growth stays off unless the user enables it');
assert.strictEqual(domElements.mapLegend.style.display, 'block', '#mapLegend stays visible while other overlays remain on');
console.log('✓ Toggling one chip after load does not reset the rest of the start state.');

// Growth Heatmap independently of churches filter at year 95
mapCtrl.updateTimelineYear(95);
mapCtrl.setLayerFilter("heatmaps", true);
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.heatmaps), 'heatmaps should be mounted on map');
assert.strictEqual(mapCtrl.filterState.churches, true, 'Churches filter remains independently on');
assert(mapCtrl.layers.heatmaps._layers.size > 0, 'Heatmap circles must be generated even when independently toggled');
assert.strictEqual(domElements.mapLegend.style.display, 'block', '#mapLegend should remain for heatmaps');
console.log('✓ Growth Heatmap can still be toggled on after load without disturbing other filters.');

// Turn off heatmaps; remaining overlays keep the legend open
mapCtrl.setLayerFilter("heatmaps", false);
assert(!mapCtrl.map._mapLayers.has(mapCtrl.layers.heatmaps), 'heatmaps removed from map');
assert.strictEqual(domElements.mapLegend.style.display, 'block', '#mapLegend stays visible while core overlays remain on');

// 3. Verify UIController Quick Jump Dropdown population and interaction
const uiControllerCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'uiController.js'), 'utf8');
vm.runInThisContext(uiControllerCode);

let changeListener = null;
domElements.quickJumpSelect.addEventListener = (evt, fn) => {
  if (evt === "change") changeListener = fn;
};

const uiCtrl = new UIController();
uiCtrl.initQuickJumpDropdown();

// Verify optgroups were added
assert(domElements.quickJumpSelect.children.length >= 5, `Expected at least 5 optgroups in quickJumpSelect, got ${domElements.quickJumpSelect.children.length}`);
console.log(`✓ Quick jump dropdown successfully populated with ${domElements.quickJumpSelect.children.length} location categories.`);

// Test changing selection to a city
let flownLocation = null;
let shownCity = null;
global.window = global;
window.app = {
  map: {
    flyToLocation: (lat, lng, zoom) => { flownLocation = { lat, lng, zoom }; }
  },
  ui: uiCtrl
};
uiCtrl.showCityDetail = (city) => { shownCity = city; };

assert(changeListener, 'Change listener should be attached to quickJumpSelect');
changeListener({ target: { value: "city:corinth" } });
assert(flownLocation, 'flyToLocation should be called on city selection');
assert.strictEqual(flownLocation.lat, 37.93);
assert.strictEqual(flownLocation.zoom, 12);
assert.strictEqual(shownCity.id, "corinth");
console.log('✓ Selecting city from quick jump dropdown correctly flies map and opens city dossier.');

// 4. TimelineController fresh-load year
const timelineControllerCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'timelineController.js'), 'utf8');
vm.runInThisContext(timelineControllerCode);
const timelineCtrl = new TimelineController();
assert.strictEqual(timelineCtrl.currentYear, 100, 'TimelineController should start at 100 AD');
console.log('✓ TimelineController constructor starts at 100 AD.');

console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
