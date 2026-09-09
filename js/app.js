/**
 * Application Entry Point & Master Coordinator
 * Connects the Map, Timeline, and UI Controllers.
 */
class App {
  constructor() {
    this.map = new MapController();
    this.timeline = new TimelineController();
    this.ui = new UIController();
    this.satelliteExplorer = new SatelliteExplorer();
  }

  init() {
    console.log("📜 Initializing New Testament Geography Atlas (~6 BC - 100 AD)...");

    // 1. Initialize Map
    this.map.init("map");

    // 2. Initialize Timeline Scrubber
    this.timeline.init();

    // 3. Initialize UI & Search
    this.ui.init();

    // 4. Initialize 1st Century Satellite Explorer
    this.satelliteExplorer.init();

    if (typeof CITIES_DATA !== "undefined") window.CITIES_DATA = CITIES_DATA;
    if (typeof REGIONS_DATA !== "undefined") window.REGIONS_DATA = REGIONS_DATA;
    if (typeof JERUSALEM_SITES !== "undefined") window.JERUSALEM_SITES = JERUSALEM_SITES;
    if (typeof JERUSALEM_GEOGRAPHY !== "undefined") window.JERUSALEM_GEOGRAPHY = JERUSALEM_GEOGRAPHY;

    // 5. Generate Slider Track Tick Marks
    this.generateSliderTicks();

    // 5. Handle Responsive Window Resizing
    window.addEventListener("resize", () => {
      if (this.map && this.map.map) {
        this.map.map.invalidateSize();
      }
    });

    console.log("✨ New Testament Geography Atlas successfully initialized.");
  }

  generateSliderTicks() {
    const ticksContainer = document.getElementById("sliderTicks");
    if (!ticksContainer) return;

    // Years span from -6 to 100 = 106 total years
    const minYear = -6;
    const maxYear = 100;
    const totalSpan = maxYear - minYear;

    // Major milestone years
    const majorYears = [-6, -4, 1, 26, 30, 35, 47, 50, 64, 70, 95, 100];

    for (let y = minYear; y <= maxYear; y += 2) {
      const isMajor = majorYears.includes(y);
      const tick = document.createElement("div");
      tick.className = `tick-mark ${isMajor ? 'major' : ''}`;
      tick.title = this.timeline.formatYear(y);
      ticksContainer.appendChild(tick);
    }
  }
}

// Instantiate global app instance and launch on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
  window.app.init();
});
