/**
 * 1st Century Satellite Explorer Controller
 * Provides an authentic orbital satellite experience of the New Testament world c. 30 AD,
 * complete with high-resolution imagery, interactive location pins, pan/zoom, and 5-tab dossier linking.
 */
class SatelliteExplorer {
  constructor() {
    this.modal = null;
    this.currentView = "holy-land"; // 'holy-land', 'jerusalem', 'galilee'
    this.zoomLevel = 1;
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };
    this.panOffset = { x: 0, y: 0 };

    this.views = {
      "holy-land": {
        id: "holy-land",
        title: "The Holy Land & Eastern Mediterranean",
        subtitle: "Orbital Satellite Reconnaissance (c. 30 AD) • Mount Hermon to the Dead Sea",
        image: "assets/satellite/holy_land_satellite_1st_century.jpg",
        geospatialTarget: { lat: 31.9, lng: 35.2, zoom: 8 },
        pins: [
          {
            id: "jerusalem",
            name: "Jerusalem (Ierosolyma)",
            ancientName: "Hierosolyma / Mount Moriah",
            category: "Holy City & Temple",
            x: 44.5,
            y: 58.5,
            elev: "740 m",
            scripture: "Luke 2:41-52; Matthew 21; John 19",
            desc: "The sacred capital, Herodian Second Temple, site of the Last Supper, Atonement, Crucifixion, and Resurrection.",
            linkType: "city",
            linkName: "Jerusalem"
          },
          {
            id: "bethlehem",
            name: "Bethlehem of Judea",
            ancientName: "Beit Lechem (House of Bread)",
            category: "Nativity City",
            x: 43.5,
            y: 66.5,
            elev: "775 m",
            scripture: "Luke 2:1-20; Matthew 2:1",
            desc: "City of David, 5 miles south of Jerusalem; birthplace of the Savior Jesus Christ fulfilling Micah 5:2.",
            linkType: "city",
            linkName: "Bethlehem"
          },
          {
            id: "nazareth",
            name: "Nazareth of Galilee",
            ancientName: "Natzrat",
            category: "Childhood Home",
            x: 49.0,
            y: 24.5,
            elev: "350 m",
            scripture: "Luke 1:26-38; Luke 4:16-30",
            desc: "Secluded hill town in lower Galilee where Jesus grew to manhood and proclaimed His messianic mission in the synagogue.",
            linkType: "city",
            linkName: "Nazareth"
          },
          {
            id: "capernaum",
            name: "Capernaum",
            ancientName: "Kfar Nahum (Village of Comfort)",
            category: "Ministry Headquarters",
            x: 60.0,
            y: 19.5,
            elev: "-209 m (Below Sea Level)",
            scripture: "Matthew 4:13; Mark 2:1-12; John 6",
            desc: "Thriving fishing hub on the northern shore of Galilee; home of Peter and center of the Savior's Galilean miracles.",
            linkType: "city",
            linkName: "Capernaum"
          },
          {
            id: "sea-of-galilee",
            name: "Sea of Galilee",
            ancientName: "Lake of Gennesaret / Sea of Tiberias",
            category: "Sacred Waters",
            x: 60.5,
            y: 22.5,
            elev: "-212 m",
            scripture: "Matthew 8:23-27; Matthew 14:22-33",
            desc: "Freshwater rift lake where Jesus walked upon the waves, stilled the tempest, and called fishermen to be fishers of men.",
            linkType: "view",
            viewTarget: "galilee"
          },
          {
            id: "jordan-river",
            name: "The River Jordan",
            ancientName: "Yarden (The Descender)",
            category: "Waters of Baptism",
            x: 62.5,
            y: 36.5,
            elev: "-250 m to -430 m",
            scripture: "Matthew 3:13-17; John 1:28",
            desc: "The great rift river flowing from Mount Hermon to the Dead Sea; site of the Savior's baptism by John the Baptist.",
            linkType: "search",
            searchQuery: "Jordan River"
          },
          {
            id: "jericho",
            name: "Jericho",
            ancientName: "City of Palm Trees",
            category: "Ancient Oasis",
            x: 56.5,
            y: 53.5,
            elev: "-258 m",
            scripture: "Luke 18:35-43; Luke 19:1-10",
            desc: "Subtropical oasis on the pilgrim road up to Jerusalem; healing of blind Bartimaeus and conversion of Zacchaeus.",
            linkType: "city",
            linkName: "Jericho"
          },
          {
            id: "caesarea-maritima",
            name: "Caesarea Maritima",
            ancientName: "Sebastos Harbor",
            category: "Roman Provincial Capital",
            x: 38.0,
            y: 31.5,
            elev: "10 m",
            scripture: "Acts 10; Acts 23:23-35; Acts 26",
            desc: "Herod's master harbor and residence of Roman procurators (Pontius Pilate); baptism of Cornelius and Paul's trial.",
            linkType: "city",
            linkName: "Caesarea Maritima"
          },
          {
            id: "emmaus",
            name: "Emmaus",
            ancientName: "Emmaus Nicopolis",
            category: "Resurrection Appearance",
            x: 43.5,
            y: 55.0,
            elev: "230 m",
            scripture: "Luke 24:13-35",
            desc: "Village located threescore furlongs (7.5 miles) from Jerusalem where the risen Lord broke bread with two disciples.",
            linkType: "city",
            linkName: "Emmaus"
          },
          {
            id: "bethany",
            name: "Bethany",
            ancientName: "Beit Aniya (House of Dates)",
            category: "Beloved Sanctuary",
            x: 52.0,
            y: 65.5,
            elev: "730 m",
            scripture: "John 11; John 12:1-8; Luke 24:50",
            desc: "Eastern slope of the Mount of Olives; home of Mary, Martha, and Lazarus whom Jesus raised from the dead.",
            linkType: "city",
            linkName: "Bethany"
          },
          {
            id: "mount-of-olives",
            name: "Mount of Olives",
            ancientName: "Har HaZeitim",
            category: "Sacred Ridge",
            x: 54.0,
            y: 60.0,
            elev: "818 m",
            scripture: "Matthew 24-25; Luke 22:39-46; Acts 1:9-12",
            desc: "Ridge dominating eastern Jerusalem; site of the Olivet Discourse, Agony in Gethsemane, and the Ascension into Heaven.",
            linkType: "view",
            viewTarget: "jerusalem"
          },
          {
            id: "dead-sea",
            name: "The Dead Sea (Salt Sea)",
            ancientName: "Lacus Asphaltites / Yam HaMelakh",
            category: "Lowest Point on Earth",
            x: 65.0,
            y: 76.5,
            elev: "-430 m",
            scripture: "Ezekiel 47:8-10; Genesis 14",
            desc: "Hypersaline lake in the Judean wilderness; Qumran community and Ein Gedi desert refuge.",
            linkType: "search",
            searchQuery: "Dead Sea"
          },
          {
            id: "mount-hermon",
            name: "Mount Hermon",
            ancientName: "Sirion / Senir",
            category: "Northern Snow Peak",
            x: 63.5,
            y: 9.5,
            elev: "2,814 m",
            scripture: "Matthew 17:1-9; Psalm 133:3",
            desc: "Towering snow-crowned northern summit near Caesarea Philippi; probable site of the holy Mount of Transfiguration.",
            linkType: "search",
            searchQuery: "Mount Hermon"
          }
        ]
      },
      "jerusalem": {
        id: "jerusalem",
        title: "1st Century Jerusalem & Sacred Mounts",
        subtitle: "High-Altitude Aerial Satellite Reconnaissance (c. 30 AD, Reign of Pontius Pilate)",
        image: "assets/satellite/jerusalem_satellite_1st_century.jpg",
        geospatialTarget: { lat: 31.7775, lng: 35.234, zoom: 15 },
        pins: [
          {
            id: "temple-mount",
            name: "The Herodian Temple Mount",
            ancientName: "Beit HaMikdash / Mount Moriah",
            category: "Sanctuary of God",
            x: 56.0,
            y: 46.0,
            elev: "740 m",
            scripture: "Luke 2:46; John 2:13-22; Matthew 24:1-2",
            desc: "Massive ashlar stone platform expanded by Herod the Great; white limestone and golden Holy Place, Court of the Gentiles, and Royal Stoa.",
            linkType: "quarter",
            linkQuarterId: "temple-mount"
          },
          {
            id: "antonia-fortress",
            name: "Antonia Fortress",
            ancientName: "Castra Antonia",
            category: "Roman Military Garrison",
            x: 55.0,
            y: 25.0,
            elev: "755 m",
            scripture: "Acts 21:31-40; John 19:13",
            desc: "Formidable four-towered Roman fortress commanding the northwest corner of the Temple Mount; headquarters of the Roman cohort.",
            linkType: "site",
            linkSiteId: "antonia-fortress"
          },
          {
            id: "mount-of-olives-close",
            name: "Mount of Olives",
            ancientName: "Har HaZeitim",
            category: "Prominent Ridge",
            x: 91.0,
            y: 28.0,
            elev: "818 m",
            scripture: "Luke 19:28-44; Acts 1:9-12",
            desc: "Towering limestone ridge east of the Kidron ravine providing commanding views of the Temple sanctuary; scene of Christ's lamentation and Ascension.",
            linkType: "quarter",
            linkQuarterId: "mount-of-olives"
          },
          {
            id: "gethsemane",
            name: "Garden of Gethsemane",
            ancientName: "Gat Shmanim (Oil Press)",
            category: "Sacred Atonement Sanctuary",
            x: 82.0,
            y: 52.0,
            elev: "700 m",
            scripture: "Matthew 26:36-46; Luke 22:39-44",
            desc: "Terraced olive grove at the foot of Mount Olives where the Savior sweat great drops of blood taking upon Himself the sins and griefs of mankind.",
            linkType: "site",
            linkSiteId: "gethsemane"
          },
          {
            id: "kidron-valley",
            name: "Kidron Valley (Brook Cedron)",
            ancientName: "Nahal Qidron",
            category: "Natural Defense Ravine",
            x: 69.0,
            y: 38.0,
            elev: "650 m - 700 m",
            scripture: "John 18:1; 2 Samuel 15:23",
            desc: "Steep gorge separating the Temple Mount from the Mount of Olives; crossed by Jesus and His Apostles during the Passover night.",
            linkType: "quarter",
            linkQuarterId: "kidron-valley"
          },
          {
            id: "upper-city",
            name: "The Upper City & Mount Zion",
            ancientName: "Upper Agora / Western Hill",
            category: "Aristocratic & Royal Quarter",
            x: 35.0,
            y: 52.0,
            elev: "770 m",
            scripture: "Mark 14:12-26; Matthew 26:57-68",
            desc: "Elevated residential quarter of the High Priests (Caiaphas, Annas), Herod's fortified royal palace, and the traditional Upper Room of the Last Supper.",
            linkType: "quarter",
            linkQuarterId: "upper-city"
          },
          {
            id: "golgotha",
            name: "Golgotha & The Garden Tomb",
            ancientName: "Calvary (Place of the Skull)",
            category: "Crucifixion & Resurrection",
            x: 8.0,
            y: 31.0,
            elev: "765 m",
            scripture: "Matthew 27:33-60; John 19:17-42",
            desc: "Rock quarry knoll situated outside the Second Wall near an ancient road; site of the crucifixion of Jesus Christ and the rock-hewn tomb of Joseph of Arimathea.",
            linkType: "quarter",
            linkQuarterId: "golgotha"
          },
          {
            id: "pool-of-siloam",
            name: "Pool of Siloam",
            ancientName: "Birket Silwan",
            category: "Ritual Purification Waters",
            x: 48.0,
            y: 88.0,
            elev: "630 m",
            scripture: "John 9:1-11; Isaiah 8:6",
            desc: "Stepped ceremonial reservoir fed by the Gihon Spring where Jesus commanded the blind man to wash and receive his sight.",
            linkType: "site",
            linkSiteId: "pool-of-siloam"
          },
          {
            id: "city-of-david",
            name: "Lower City & City of David",
            ancientName: "Acra / Ophel Spur",
            category: "Ancient Settlement",
            x: 68.0,
            y: 85.0,
            elev: "670 m - 710 m",
            scripture: "Nehemiah 3; Acts 2:29",
            desc: "Historic ridge settled by King David; densely packed residential quarter of common artisans, pilgrims, and markets.",
            linkType: "quarter",
            linkQuarterId: "lower-city"
          },
          {
            id: "valley-of-hinnom",
            name: "Valley of Hinnom (Gehenna)",
            ancientName: "Gei Hinnom",
            category: "Southern Ravine",
            x: 38.0,
            y: 95.0,
            elev: "670 m - 710 m",
            scripture: "Matthew 5:22; Matthew 10:28",
            desc: "Deep, winding ravine encircling western and southern Jerusalem; ancient border of Judah and Benjamin.",
            linkType: "quarter",
            linkQuarterId: "hinnom-valley"
          }
        ]
      },
      "galilee": {
        id: "galilee",
        title: "1st Century Sea of Galilee & Northern Ministry",
        subtitle: "High-Altitude Reconnaissance of the Lake of Gennesaret (c. 30 AD)",
        image: "assets/satellite/galilee_satellite_1st_century.jpg",
        geospatialTarget: { lat: 32.82, lng: 35.58, zoom: 12 },
        pins: [
          {
            id: "capernaum-galilee",
            name: "Capernaum",
            ancientName: "Kfar Nahum",
            category: "The Savior's City",
            x: 41.0,
            y: 21.0,
            elev: "-209 m",
            scripture: "Matthew 9:1; Mark 1:21-28; John 6:22-59",
            desc: "Basalt fishing town; headquarters of Christ's Galilean ministry where He healed the paralytic and taught the Bread of Life sermon.",
            linkType: "city",
            linkName: "Capernaum"
          },
          {
            id: "mount-of-beatitudes",
            name: "Mount of Beatitudes",
            ancientName: "Eremos Hill",
            category: "The Sermon on the Mount",
            x: 28.0,
            y: 13.0,
            elev: "-120 m",
            scripture: "Matthew 5-7; Luke 6:17-49",
            desc: "Natural hillside amphitheater overlooking the lake where Jesus delivered the foundational Sermon on the Mount.",
            linkType: "search",
            searchQuery: "Mount of Beatitudes"
          },
          {
            id: "bethsaida-galilee",
            name: "Bethsaida of Galilee",
            ancientName: "Beit Tsaida (House of Fishing)",
            category: "Apostolic Hometown",
            x: 66.0,
            y: 18.0,
            elev: "-200 m",
            scripture: "Mark 8:22-26; Luke 9:10-17; John 1:44",
            desc: "Home city of Apostles Peter, Andrew, and Philip; site of the miraculous feeding of the five thousand.",
            linkType: "city",
            linkName: "Bethsaida"
          },
          {
            id: "magdala",
            name: "Magdala (Taricheae)",
            ancientName: "Migdal Nunia (Tower of Fish)",
            category: "Harbor & Fish Processing",
            x: 29.0,
            y: 37.0,
            elev: "-210 m",
            scripture: "Matthew 15:39; Luke 8:2",
            desc: "Prosperous harbor and salt-curing center; hometown of Mary Magdalene from whom Jesus cast seven devils.",
            linkType: "city",
            linkName: "Magdala"
          },
          {
            id: "tiberias",
            name: "Tiberias",
            ancientName: "Tiberias Sebaste",
            category: "Herodian Capital",
            x: 31.0,
            y: 70.0,
            elev: "-208 m",
            scripture: "John 6:1, 23; John 21:1",
            desc: "Roman-style administrative capital built by tetrarch Herod Antipas, named in honor of Roman Emperor Tiberius.",
            linkType: "city",
            linkName: "Tiberias"
          },
          {
            id: "jordan-river-inflow",
            name: "Jordan River Inflow",
            ancientName: "Upper Jordan",
            category: "River Delta",
            x: 57.0,
            y: 9.0,
            elev: "-210 m",
            scripture: "Joshua 3; Mark 1:5",
            desc: "Mountain streams fed by snows of Mount Hermon entering the northern headwaters of the Sea of Galilee.",
            linkType: "search",
            searchQuery: "Jordan River"
          },
          {
            id: "mount-arbel",
            name: "Mount Arbel",
            ancientName: "Cliffs of Arbel",
            category: "Sheer Basalt Precipice",
            x: 72.0,
            y: 68.0,
            elev: "181 m (400m above lake)",
            scripture: "Hosea 10:14; Matthew 28:16-20",
            desc: "Dramatic limestone and basalt precipice towering above the Plain of Gennesaret with views across the entire sea.",
            linkType: "search",
            searchQuery: "Arbel"
          },
          {
            id: "golan-heights",
            name: "Golan Heights & Decapolis",
            ancientName: "Gaulanitis / Decapolis",
            category: "Eastern Shore",
            x: 86.0,
            y: 45.0,
            elev: "300 m - 600 m",
            scripture: "Mark 5:1-20; Matthew 8:28-34",
            desc: "Eastern volcanic plateau inhabited by Gentiles; healing of the Gerasene demoniac and feeding of the four thousand.",
            linkType: "search",
            searchQuery: "Decapolis"
          }
        ]
      }
    };
  }

  init() {
    this.createModalDOM();
    this.attachEventListeners();
    console.log("🛰️ 1st Century Satellite Explorer ready.");
  }

  createModalDOM() {
    // Check if already exists
    if (document.getElementById("satelliteExplorerModal")) return;

    const modalHTML = `
      <div id="satelliteExplorerModal" class="satellite-modal" style="display: none;" role="dialog" aria-label="1st Century Satellite Reconnaissance Explorer">
        <div class="satellite-modal-backdrop"></div>
        <div class="satellite-modal-window">
          
          <!-- Header Bar -->
          <div class="satellite-modal-header">
            <div class="satellite-header-left">
              <span class="satellite-badge">🛰️ 1ST CENTURY ORBITAL SATELLITE RECONNAISSANCE</span>
              <h2 id="satModalTitle" class="satellite-modal-title">The Holy Land & Eastern Mediterranean</h2>
              <p id="satModalSubtitle" class="satellite-modal-subtitle">Orbital Satellite View c. 30 AD • Zero Modern Asphalt • Key New Testament Locations</p>
            </div>

            <!-- View Switcher Tabs -->
            <div class="satellite-view-tabs" role="tablist">
              <button class="sat-tab active" data-view="holy-land" role="tab" aria-selected="true">
                🌍 Holy Land Overview
              </button>
              <button class="sat-tab" data-view="jerusalem" role="tab" aria-selected="false">
                🏛️ Jerusalem & Valleys
              </button>
              <button class="sat-tab" data-view="galilee" role="tab" aria-selected="false">
                🌊 Sea of Galilee
              </button>
            </div>

            <!-- Actions Right -->
            <div class="satellite-header-actions">
              <button id="satJumpToMapBtn" class="btn btn-outline btn-sat-action" title="Jump to this coordinate on the interactive geospatial map">
                🗺️ Jump to Geospatial Map
              </button>
              <button id="satCloseBtn" class="satellite-close-btn" title="Close satellite view" aria-label="Close">
                &times;
              </button>
            </div>
          </div>

          <!-- Viewer Body / Canvas -->
          <div class="satellite-viewer-container" id="satViewerContainer">
            <div class="satellite-image-wrapper" id="satImageWrapper">
              <img id="satImageElement" src="assets/satellite/holy_land_satellite_1st_century.jpg" alt="1st Century Satellite View" draggable="false" />
              <div id="satPinsContainer" class="satellite-pins-overlay"></div>
            </div>

            <!-- Floating Zoom & Controls Widget -->
            <div class="satellite-controls-widget">
              <button id="satZoomInBtn" class="sat-ctrl-btn" title="Zoom In">+</button>
              <span id="satZoomPercent" class="sat-zoom-display">100%</span>
              <button id="satZoomOutBtn" class="sat-ctrl-btn" title="Zoom Out">&minus;</button>
              <button id="satResetViewBtn" class="sat-ctrl-btn" title="Reset View">⟲</button>
            </div>

            <!-- Floating Info Card (Hover/Focus) -->
            <div id="satInfoCard" class="satellite-info-card" style="display: none;">
              <div class="sat-card-badge" id="satCardCategory">Category</div>
              <h3 class="sat-card-title" id="satCardTitle">Location Name</h3>
              <div class="sat-card-elev" id="satCardElev">Elevation: 740 m</div>
              <div class="sat-card-scripture" id="satCardScripture">Scripture Ref</div>
              <p class="sat-card-desc" id="satCardDesc">Description text goes here.</p>
              <div class="sat-card-action">
                <span class="sat-click-hint">Click pin to open 5-Tab Biblical Dossier & KJV Scriptures ↗</span>
              </div>
            </div>

            <!-- Floating Legend / Compass Pill -->
            <div class="satellite-watermark-pill">
              <span class="sat-recon-icon">🛰️</span>
              <div class="sat-recon-text">
                <strong>1ST CENTURY HIGH-RESOLUTION SATELLITE CARTOGRAPHY</strong>
                <small>Authentic Physical Earth Terrain • Ancient Hydrology, Relief & 1st-Century Settlements</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    this.modal = document.getElementById("satelliteExplorerModal");
  }

  attachEventListeners() {
    // Open Trigger Buttons
    const openBtn = document.getElementById("openSatelliteExplorerBtn");
    if (openBtn) {
      openBtn.addEventListener("click", () => this.open("holy-land"));
    }

    const floatingPill = document.getElementById("floatingSatellitePill");
    if (floatingPill) {
      floatingPill.addEventListener("click", () => this.open("holy-land"));
    }

    // Close Button & Backdrop
    const closeBtn = document.getElementById("satCloseBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    const backdrop = this.modal.querySelector(".satellite-modal-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", () => this.close());
    }

    // Escape Key to Close
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // Tab Switcher
    const tabs = this.modal.querySelectorAll(".sat-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        const viewId = e.currentTarget.getAttribute("data-view");
        this.switchView(viewId);
      });
    });

    // Zoom Controls
    const zoomInBtn = document.getElementById("satZoomInBtn");
    const zoomOutBtn = document.getElementById("satZoomOutBtn");
    const resetBtn = document.getElementById("satResetViewBtn");

    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", () => this.zoom(0.25));
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", () => this.zoom(-0.25));
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetView());
    }

    // Pan & Mousewheel Zooming on Viewer
    const viewer = document.getElementById("satViewerContainer");
    if (viewer) {
      viewer.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.15 : -0.15;
        this.zoom(delta);
      }, { passive: false });

      viewer.addEventListener("mousedown", (e) => {
        // Only pan if not clicking a pin or button
        if (e.target.closest(".satellite-pin-marker") || e.target.closest("button")) return;
        this.isPanning = true;
        this.panStart = { x: e.clientX - this.panOffset.x, y: e.clientY - this.panOffset.y };
        viewer.classList.add("panning");
      });

      window.addEventListener("mousemove", (e) => {
        if (!this.isPanning) return;
        this.panOffset = {
          x: e.clientX - this.panStart.x,
          y: e.clientY - this.panStart.y
        };
        this.applyTransform();
      });

      window.addEventListener("mouseup", () => {
        if (this.isPanning) {
          this.isPanning = false;
          viewer.classList.remove("panning");
        }
      });
    }

    // Jump to Geospatial Map
    const jumpBtn = document.getElementById("satJumpToMapBtn");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", () => {
        const currentData = this.views[this.currentView];
        if (currentData && currentData.geospatialTarget && window.app && window.app.map) {
          this.close();
          const target = currentData.geospatialTarget;
          window.app.map.flyToLocation([target.lat, target.lng], target.zoom);
        }
      });
    }
  }

  open(viewId = "holy-land") {
    if (!this.modal) this.createModalDOM();
    this.modal.style.display = "flex";
    document.body.classList.add("modal-open");
    this.switchView(viewId);
  }

  close() {
    if (!this.modal) return;
    this.modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }

  isOpen() {
    return this.modal && this.modal.style.display === "flex";
  }

  switchView(viewId) {
    if (!this.views[viewId]) return;
    this.currentView = viewId;
    const viewData = this.views[viewId];

    // Update Header Text
    const titleEl = document.getElementById("satModalTitle");
    const subtitleEl = document.getElementById("satModalSubtitle");
    if (titleEl) titleEl.textContent = viewData.title;
    if (subtitleEl) subtitleEl.textContent = viewData.subtitle;

    // Update Active Tab UI
    const tabs = this.modal.querySelectorAll(".sat-tab");
    tabs.forEach(tab => {
      const match = tab.getAttribute("data-view") === viewId;
      tab.classList.toggle("active", match);
      tab.setAttribute("aria-selected", match ? "true" : "false");
    });

    // Update Image Source
    const imgEl = document.getElementById("satImageElement");
    if (imgEl) {
      imgEl.src = viewData.image;
    }

    // Reset Zoom & Pan
    this.resetView();

    // Render Location Pins
    this.renderPins(viewData.pins);

    // Hide Info Card
    const infoCard = document.getElementById("satInfoCard");
    if (infoCard) infoCard.style.display = "none";
  }

  renderPins(pins) {
    const container = document.getElementById("satPinsContainer");
    if (!container) return;
    container.innerHTML = "";

    pins.forEach(pin => {
      const pinEl = document.createElement("div");
      pinEl.className = "satellite-pin-marker";
      pinEl.style.left = `${pin.x}%`;
      pinEl.style.top = `${pin.y}%`;
      pinEl.setAttribute("data-pin-id", pin.id);

      pinEl.innerHTML = `
        <div class="sat-pin-core">
          <div class="sat-pin-radar"></div>
          <div class="sat-pin-dot"></div>
        </div>
        <div class="sat-pin-label">${pin.name}</div>
      `;

      // Hover / Focus Info Card
      pinEl.addEventListener("mouseenter", (e) => {
        this.showInfoCard(pin, e.currentTarget);
      });

      pinEl.addEventListener("mouseleave", () => {
        // Let user inspect card if needed
      });

      // Click: Open Full 5-Tab Biblical Dossier!
      pinEl.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handlePinClick(pin);
      });

      container.appendChild(pinEl);
    });
  }

  showInfoCard(pin, pinElement) {
    const card = document.getElementById("satInfoCard");
    if (!card) return;

    document.getElementById("satCardCategory").textContent = pin.category.toUpperCase();
    document.getElementById("satCardTitle").textContent = pin.name;
    document.getElementById("satCardElev").textContent = `Elevation: ${pin.elev} • ${pin.ancientName}`;
    document.getElementById("satCardScripture").textContent = `📖 KJV: ${pin.scripture}`;
    document.getElementById("satCardDesc").textContent = pin.desc;

    card.style.display = "block";
  }

  handlePinClick(pin) {
    if (pin.linkType === "view" && pin.viewTarget) {
      this.switchView(pin.viewTarget);
      return;
    }

    this.close();

    if (window.app && window.app.ui && typeof window.app.ui.openPlaceFromPin === "function") {
      const opened = window.app.ui.openPlaceFromPin(pin);
      if (opened) return;
    }

    if (pin.linkType === "search" && window.app && window.app.ui) {
      window.app.ui.handleSearch(pin.searchQuery);
    }
  }

  zoom(amount) {
    const newZoom = Math.max(0.75, Math.min(3.0, this.zoomLevel + amount));
    this.zoomLevel = newZoom;
    this.applyTransform();
  }

  resetView() {
    this.zoomLevel = 1.0;
    this.panOffset = { x: 0, y: 0 };
    this.applyTransform();
  }

  applyTransform() {
    const wrapper = document.getElementById("satImageWrapper");
    const zoomDisplay = document.getElementById("satZoomPercent");
    if (!wrapper) return;

    wrapper.style.transform = `translate(${this.panOffset.x}px, ${this.panOffset.y}px) scale(${this.zoomLevel})`;
    if (zoomDisplay) {
      zoomDisplay.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }
}

// Attach globally
window.SatelliteExplorer = SatelliteExplorer;
