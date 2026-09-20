/**
 * Automated verification test for:
 * 1. Zero Counters Fix: Correct real numbers on initial load, during timeline scrubbing, and during tours
 * 2. Guided Tour Map & Animation: Rich labeled map preservation, smooth animation parameters, layer retention
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

// Setup mock DOM and Leaflet environment
const domElements = {
  mapLegend: { style: { display: 'none' } },
  statEventsCount: { textContent: "0" },
  statChurchesCount: { textContent: "0" },
  statDiasporaCount: { textContent: "0" }
};

global.document = {
  body: { classList: { add: () => {}, remove: () => {}, contains: () => false } },
  getElementById: (id) => domElements[id] || null,
  querySelector: () => null,
  querySelectorAll: () => []
};

global.window = {
  innerWidth: 1200
};

let stoppedCount = 0;
let flyToCalls = [];

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
    const handlers = {};
    return {
      center: [34.5, 31.0],
      zoom: 6,
      getZoom: () => 6,
      getCenter: () => ({ lat: 34.5, lng: 31.0 }),
      addLayer: (l) => mapLayers.add(l),
      removeLayer: (l) => mapLayers.delete(l),
      hasLayer: (l) => mapLayers.has(l),
      on: (evt, fn) => { handlers[evt] = fn; },
      trigger: (evt) => { if (handlers[evt]) handlers[evt](); },
      stop: () => { stoppedCount++; },
      flyTo: (center, zoom, options) => {
        flyToCalls.push({ center, zoom, options });
      },
      _mapLayers: mapLayers
    };
  },
  control: { attribution: () => ({ addAttribution: () => ({ addTo: () => {} }) }) },
  tileLayer: (url, opts) => ({ url, opts, addTo: function(m) { m.addLayer(this); return this; } }),
  marker: () => ({ bindTooltip: () => {}, on: () => {} }),
  divIcon: () => ({}),
  polygon: () => ({ bindTooltip: () => {}, on: () => {} }),
  polyline: () => ({ bindTooltip: () => {}, on: () => {}, addTo: () => {} }),
  circle: () => ({ bindTooltip: () => {}, on: () => {} }),
  circleMarker: () => ({ bindTooltip: () => {}, on: () => {} }),
  rectangle: () => ({ bindTooltip: () => {}, on: () => {} }),
  imageOverlay: () => ({ addTo: () => {}, bindTooltip: () => {}, on: () => {} }),
  DomEvent: { stopPropagation: () => {} }
};

// Global data mocks matching the atlas
global.HYDROGRAPHY_DATA = { jordanRiver: [[32, 35]], seaOfGalilee: [[32, 35]], deadSea: [[31, 35]], roads: [] };
global.REGIONS_DATA = { regions: [], cameraPresets: { mediterranean: { center: [34.5, 31.0], zoom: 6 } } };
global.CITIES_DATA = [{ id: "jerusalem", name: "Jerusalem", lat: 31.77, lng: 35.23, isMajor: true }];
global.JERUSALEM_SITES = [{ id: "temple", name: "Second Temple", lat: 31.778, lng: 35.235, scriptures: [] }];
global.JERUSALEM_GEOGRAPHY = { quarters: [], walls: [], valleys: [], gates: [] };
global.TIMELINE_EVENTS = [
  { id: "e1", year: -6, title: "Annunciation" },
  { id: "e2", year: -5, title: "Nativity in Bethlehem" },
  { id: "e3", year: 26, title: "Baptism of Jesus" },
  { id: "e4", year: 30, title: "The Crucifixion and Resurrection" },
  { id: "e5", year: 50, title: "Council of Jerusalem" },
  { id: "e6", year: 96, title: "John on the Isle of Patmos" }
];
global.SAVIOR_EVENTS = global.TIMELINE_EVENTS;
global.MISSIONARY_JOURNEYS = [];
global.COMMUNITIES_DATA = {
  diasporaSettlements: [
    { city: "Rome" }, { city: "Alexandria" }, { city: "Antioch" },
    { city: "Babylon" }, { city: "Cyrene" }, { city: "Ephesus" },
    { city: "Corinth" }, { city: "Damascus" }, { city: "Athens" }
  ],
  churchesMultiplication: [
    { city: "Jerusalem", foundedYear: 30 },
    { city: "Antioch", foundedYear: 34 },
    { city: "Rome", foundedYear: 40 },
    { city: "Corinth", foundedYear: 50 },
    { city: "Ephesus", foundedYear: 52 }
  ]
};

// Load MapController
const mapControllerCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'mapController.js'), 'utf8');
vm.runInThisContext(mapControllerCode);

const mapCtrl = new MapController();
mapCtrl.init("map");

// 1. Verify Parchment Tile Layer is CartoDB Voyager
assert(mapCtrl.tileLayers.parchment.url.includes("cartocdn.com/rastertiles/voyager"), "Parchment basemap must be CartoDB Voyager");
assert.strictEqual(mapCtrl.tileLayers.parchment.opts.maxNativeZoom, 19, "Voyager must support maxNativeZoom 19");
console.log("✓ Parchment basemap is configured to CartoDB Voyager with maxNativeZoom 19.");

// 2. Verify Initial Stat Counters (-6 BC)
console.log(`Initial stats: Events=${domElements.statEventsCount.textContent}, Churches=${domElements.statChurchesCount.textContent}, Diaspora=${domElements.statDiasporaCount.textContent}`);
assert.strictEqual(domElements.statEventsCount.textContent, "1", "Events at -6 BC should be 1, never 0");
assert.strictEqual(domElements.statChurchesCount.textContent, "1", "Churches at -6 BC should be 1 (Jerusalem seed), never 0");
assert.strictEqual(domElements.statDiasporaCount.textContent, "9", "Diaspora Hubs should be 9, never 0");
console.log("✓ Initial counters are NOT zero and display authentic atlas figures.");

// 3. Verify Timeline Progression
mapCtrl.updateTimelineYear(30);
assert.strictEqual(domElements.statEventsCount.textContent, "4", "Events up to 30 AD should be 4");
assert.strictEqual(domElements.statChurchesCount.textContent, "1", "Churches founded up to 30 AD should be 1");
assert.strictEqual(domElements.statDiasporaCount.textContent, "9", "Diaspora Hubs remains 9");

mapCtrl.updateTimelineYear(50);
assert.strictEqual(domElements.statEventsCount.textContent, "5", "Events up to 50 AD should be 5");
assert.strictEqual(domElements.statChurchesCount.textContent, "4", "Churches founded up to 50 AD should be 4");

mapCtrl.updateTimelineYear(100);
assert.strictEqual(domElements.statEventsCount.textContent, "6", "Events up to 100 AD should be 6");
assert.strictEqual(domElements.statChurchesCount.textContent, "5", "Churches founded up to 100 AD should be 5");
console.log("✓ Timeline updates counters accurately from 1 up to full historical totals.");

// 4. Verify Guided Tour Visualization & Camera Animation
const mockTour = {
  id: "test-tour",
  title: "Passion Week Tour",
  category: "savior",
  stops: [
    { title: "Bethany", lat: 31.77, lng: 35.26, zoom: 14, year: 30 },
    { title: "Temple Mount", lat: 31.778, lng: 35.235, zoom: 15, year: 30 },
    { title: "Gethsemane", lat: 31.779, lng: 35.239, zoom: 15, year: 30 }
  ]
};

stoppedCount = 0;
flyToCalls = [];

mapCtrl.startTourVisualization(mockTour, 0);

assert.strictEqual(mapCtrl.isTourActive, true, "isTourActive must be true during guided tour");
assert.strictEqual(domElements.statEventsCount.textContent, "3", "Events counter during tour should show tour stop count (3)");
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.cities), "Cities must remain visible during tour");
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.hydrography), "Hydrography must remain visible during tour");
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.saviorRoute), "Savior route must remain visible during savior tour");
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.jerusalemSites), "Jerusalem sites must remain visible during savior tour");

assert(stoppedCount >= 1, "map.stop() must be called to halt previous camera animations");
assert.strictEqual(flyToCalls.length, 1, "map.flyTo must be called for initial stop");
assert.strictEqual(flyToCalls[0].options.animate, true, "flyTo must have animate: true");
assert.strictEqual(flyToCalls[0].options.duration, 2.0, "flyTo duration must be 2.0s for smooth cinematic transition");
console.log("✓ startTourVisualization sets isTourActive, mounts context layers, and smoothly flies to stop 1.");

// 5. Verify Next Stop Transition
mapCtrl.updateTourActiveStop(mockTour, 1);
assert.strictEqual(flyToCalls.length, 2, "map.flyTo must be called for stop 2");
assert.strictEqual(flyToCalls[1].zoom, 15, "flyTo zoom must match stop zoom");
console.log("✓ updateTourActiveStop animates camera smoothly to stop 2.");

// 6. Verify zoomend does not strip layers when tour is active
mapCtrl.map.trigger("zoomend");
assert(mapCtrl.map._mapLayers.has(mapCtrl.layers.jerusalemSites), "Jerusalem sites must NOT be stripped by zoomend during tour");
console.log("✓ zoomend handler preserves contextual layers during active tour.");

// 7. Verify Tour Exit
mapCtrl.clearTourVisualization();
assert.strictEqual(mapCtrl.isTourActive, false, "isTourActive must be false after exit");
assert.strictEqual(mapCtrl.activeTourObj, null, "activeTourObj must be null after exit");
console.log("✓ clearTourVisualization successfully resets tour state.");

console.log("\nALL COUNTERS AND TOUR ANIMATION TESTS PASSED!");
