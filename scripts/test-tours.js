const assert = require("assert");
const { TOURS_DATA } = require("../js/data/tours.js");

console.log(`Auditing ${TOURS_DATA.length} Guided Tours...`);

assert.strictEqual(TOURS_DATA.length, 15, "Expected exactly 15 Guided Tours");

const expectedIds = [
  // Existing 7
  "start-here-jesus",
  "savior-life",
  "passion-week",
  "living-christ",
  "acts-early-church",
  "paul-journeys",
  "revelation-churches",
  // New 8
  "baptism-early-ministry",
  "galilean-ministry-miracles",
  "later-judean-perean",
  "road-to-emmaus",
  "post-resurrection-appearances",
  "peter-early-ministry",
  "paul-conversion-early-years",
  "paul-voyage-to-rome"
];

const foundIds = TOURS_DATA.map(t => t.id);
expectedIds.forEach(id => {
  assert(foundIds.includes(id), `Missing expected tour ID: ${id}`);
});

let totalStops = 0;
TOURS_DATA.forEach(tour => {
  assert(tour.title, `Tour ${tour.id} missing title`);
  assert(tour.category, `Tour ${tour.id} missing category`);
  assert(["savior", "resurrection", "apostles"].includes(tour.category), `Tour ${tour.id} invalid category ${tour.category}`);
  assert(Array.isArray(tour.stops) && tour.stops.length >= 4, `Tour ${tour.id} stops must be an array with at least 4 stops`);

  tour.stops.forEach((stop, idx) => {
    totalStops++;
    assert(stop.title, `Tour ${tour.id} stop ${idx} missing title`);
    assert(typeof stop.lat === "number" && !isNaN(stop.lat), `Tour ${tour.id} stop ${idx} invalid lat: ${stop.lat}`);
    assert(typeof stop.lng === "number" && !isNaN(stop.lng), `Tour ${tour.id} stop ${idx} invalid lng: ${stop.lng}`);
    assert(stop.lat >= 25 && stop.lat <= 46, `Tour ${tour.id} stop ${idx} lat out of bounds: ${stop.lat}`);
    assert(stop.lng >= 10 && stop.lng <= 45, `Tour ${tour.id} stop ${idx} lng out of bounds: ${stop.lng}`);
    assert(typeof stop.zoom === "number" && stop.zoom >= 6 && stop.zoom <= 18, `Tour ${tour.id} stop ${idx} invalid zoom: ${stop.zoom}`);
    assert(stop.scriptureRef && stop.scriptureRef.length > 0, `Tour ${tour.id} stop ${idx} missing scriptureRef`);
    assert(stop.summary && stop.summary.length > 10, `Tour ${tour.id} stop ${idx} missing summary`);
  });
});

console.log(`✓ All 15 tours verified successfully with a total of ${totalStops} validated stops!`);
