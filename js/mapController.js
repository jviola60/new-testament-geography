/**
 * Map Controller - Manages Leaflet Map, Layers, Cartographic Styling,
 * Custom Biblical Markers, Polylines, and Camera Transitions.
 */
class MapController {
  constructor() {
    this.map = null;
    this.currentTheme = "parchment"; // 'parchment' or 'satellite'
    
    // Layer Groups
    this.layers = {
      saviorMarkers: L.layerGroup(),
      saviorRoute: L.layerGroup(),
      cities: L.layerGroup(),
      diaspora: L.layerGroup(),
      churches: L.layerGroup(),
      revelationChurches: L.layerGroup(),
      missionaryJourneys: L.layerGroup(),
      provinces: L.layerGroup(),
      heatmaps: L.layerGroup(),
      modernOverlay: L.layerGroup(),
      jerusalemSites: L.layerGroup(),
      jerusalemGeography: L.layerGroup(),
      firstCenturySatellite: L.layerGroup()
    };

    // Tile layers
    this.tileLayers = {
      parchment: null,
      shaded: null,
      satellite: null,
      modern: null,
      modernOverlay: null
    };

    // Filter states
    this.filterState = {
      all: true,
      savior: true,
      diaspora: true,
      churches: true,
      journeys: true,
      heatmaps: false,
      provinces: true,
      modernOverlay: false,
      jerusalemSites: true,
      jerusalemGeography: true,
      firstCenturySatellite: false
    };

    this.currentYear = -6;
    this.activeHighlightMarker = null;
  }

  init(containerId = "map") {
    // Center initially on the Eastern Mediterranean encompassing Rome to Jerusalem
    this.map = L.map(containerId, {
      center: [34.5, 31.0],
      zoom: 6,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: false
    });

    // Custom attribution control positioned bottom right
    L.control.attribution({ position: "bottomright", prefix: false })
      .addAttribution('New Testament Atlas • Cartography: Esri Topo, Shaded & OSM')
      .addTo(this.map);

    // Setup Tile Layers
    this.setupTileLayers();

    // Attach Base Layer Groups to Map (excluding separate 1st-c satellite image overlays)
    Object.entries(this.layers).forEach(([k, layer]) => {
      if (k !== "firstCenturySatellite") {
        layer.addTo(this.map);
      }
    });

    // Draw Static & Foundational Geographic Layers
    this.drawProvinces();
    this.drawCities();
    this.drawFirstCenturySatelliteOverlays();
    this.drawJerusalemGeography();
    this.drawJerusalemSites();
    this.drawSaviorRoute();
    this.drawMissionaryJourneys();
    this.drawJewishDiaspora();

    // Hide micro-sites & city quarters on initial Roman world overview (zoom 6)
    if (this.map.getZoom() < 11) {
      this.map.removeLayer(this.layers.jerusalemSites);
    }
    if (this.map.getZoom() < 12) {
      this.map.removeLayer(this.layers.jerusalemGeography);
    }

    // Dynamic Zoom & Region Adaptations
    this.map.on("zoomend moveend", () => {
      const zoom = this.map.getZoom();
      const center = this.map.getCenter();
      const isJerusalemVicinity = Math.abs(center.lat - 31.777) < 0.08 && Math.abs(center.lng - 35.234) < 0.08;

      // 1. Show granular Jerusalem sites at zoom >= 11
      if (this.filterState.jerusalemSites) {
        if (zoom >= 11) {
          if (!this.map.hasLayer(this.layers.jerusalemSites)) {
            this.map.addLayer(this.layers.jerusalemSites);
          }
        } else {
          if (this.map.hasLayer(this.layers.jerusalemSites)) {
            this.map.removeLayer(this.layers.jerusalemSites);
          }
        }
      }

      // 2. Show 1st-Century Jerusalem Topographical Quarters & Defensive Walls at zoom >= 12
      if (this.filterState.jerusalemGeography) {
        if (zoom >= 12 && isJerusalemVicinity) {
          if (!this.map.hasLayer(this.layers.jerusalemGeography)) {
            this.map.addLayer(this.layers.jerusalemGeography);
          }
        } else {
          if (this.map.hasLayer(this.layers.jerusalemGeography)) {
            this.map.removeLayer(this.layers.jerusalemGeography);
          }
        }
      }

      // 3. Hide macro travel paths and coarse city marker when deeply zoomed into Jerusalem to eliminate line clutter!
      if (zoom >= 13 && isJerusalemVicinity) {
        if (this.map.hasLayer(this.layers.saviorRoute)) {
          this.map.removeLayer(this.layers.saviorRoute);
        }
        if (this.map.hasLayer(this.layers.missionaryJourneys)) {
          this.map.removeLayer(this.layers.missionaryJourneys);
        }
        if (this.jerusalemCityMarker && this.layers.cities.hasLayer(this.jerusalemCityMarker)) {
          this.layers.cities.removeLayer(this.jerusalemCityMarker);
        }
      } else {
        if (this.filterState.savior && !this.map.hasLayer(this.layers.saviorRoute)) {
          this.map.addLayer(this.layers.saviorRoute);
        }
        if (this.filterState.journeys && !this.map.hasLayer(this.layers.missionaryJourneys)) {
          this.map.addLayer(this.layers.missionaryJourneys);
        }
        if (this.jerusalemCityMarker && !this.layers.cities.hasLayer(this.jerusalemCityMarker)) {
          this.layers.cities.addLayer(this.jerusalemCityMarker);
        }
      }
    });

    // Initial update based on starting year (-6 BC)
    this.updateTimelineYear(-6);
  }

  setupTileLayers() {
    // 1. Clean Ancient Shaded Relief (Default: pure historical terrain without modern street names or city labels)
    this.tileLayers.parchment = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
      {
        maxNativeZoom: 13,
        maxZoom: 18,
        opacity: 0.95,
        attribution: "Cartography &copy; Esri World Shaded Relief"
      }
    );

    // 2. Pure Modern 21st-Century Satellite Imagery (Separate Option: continuous global aerial photography)
    this.tileLayers.satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxNativeZoom: 18, maxZoom: 18, opacity: 1.0, attribution: "Cartography &copy; Esri World Satellite Imagery" }
    );

    // 3. Topographic Contours & Relief (elevation contours, hillshading, mountain names)
    this.tileLayers.topo = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      {
        maxNativeZoom: 18,
        maxZoom: 18,
        opacity: 0.95,
        attribution: "Cartography &copy; Esri World Topographic Map"
      }
    );

    // 4. Full Modern Street Map (OpenStreetMap with modern streets, cities, and borders)
    this.tileLayers.modern = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxNativeZoom: 18, maxZoom: 18, opacity: 1.0, attribution: "&copy; OpenStreetMap contributors" }
    );

    // 5. Modern Streets Overlay Layer (Semi-transparent modern road & street grid for cross-referencing)
    this.tileLayers.modernOverlay = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxNativeZoom: 18, maxZoom: 18, opacity: 0.55, attribution: "&copy; OpenStreetMap contributors" }
    );

    // Default to clean ancient shaded relief
    this.tileLayers.parchment.addTo(this.map);
    document.body.classList.add("parchment-theme");
  }

  setMapStyle(theme) {
    this.currentTheme = theme;
    const body = document.body;

    // Remove all basemap tiles first
    this.map.removeLayer(this.tileLayers.parchment);
    if (this.tileLayers.topo) this.map.removeLayer(this.tileLayers.topo);
    this.map.removeLayer(this.tileLayers.satellite);
    this.map.removeLayer(this.tileLayers.modern);

    // Remove theme classes
    body.classList.remove("parchment-theme", "satellite-theme", "modern-theme");

    if (theme === "satellite") {
      this.tileLayers.satellite.addTo(this.map);
      body.classList.add("satellite-theme");
    } else if (theme === "modern") {
      this.tileLayers.modern.addTo(this.map);
      body.classList.add("modern-theme");
    } else if (theme === "topo") {
      this.tileLayers.topo.addTo(this.map);
      body.classList.add("parchment-theme");
    } else {
      this.tileLayers.parchment.addTo(this.map);
      body.classList.add("parchment-theme");
    }
  }

  // Draw Roman Provincial Boundaries / Approximate Polygons
  drawProvinces() {
    if (!REGIONS_DATA || !REGIONS_DATA.regions) return;

    REGIONS_DATA.regions.forEach(region => {
      const bounds = region.bounds;
      const rect = L.rectangle(bounds, {
        color: region.color || "#84532B",
        weight: 1.5,
        dashArray: "4, 6",
        fillColor: region.color || "#C5A059",
        fillOpacity: 0.04
      });

      rect.bindTooltip(
        `<div class="custom-province-tooltip"><strong>PROVINCIA ${region.name.toUpperCase()}</strong><br><small>${region.governor}</small></div>`,
        { permanent: false, direction: "center", className: "custom-bible-tooltip" }
      );

      rect.on("click", () => {
        window.app.ui.showRegionDetail(region);
      });

      this.layers.provinces.addLayer(rect);
    });
  }

  // Draw New Testament Cities & Demographic Pins
  drawCities() {
    if (!CITIES_DATA) return;

    CITIES_DATA.forEach(city => {
      // Create custom HTML label
      const isMajor = city.isMajor;
      const labelHtml = `<div class="city-label-text ${isMajor ? 'city-label-major' : ''}">${city.name}</div>`;

      const textMarker = L.marker([city.lat, city.lng], {
        icon: L.divIcon({
          className: "custom-city-label",
          html: labelHtml,
          iconSize: [80, 20],
          iconAnchor: [40, 10]
        }),
        zIndexOffset: isMajor ? 300 : 100
      });

      textMarker.on("click", () => {
        window.app.ui.showCityDetail(city);
      });

      if (city.id === "jerusalem") {
        this.jerusalemCityMarker = textMarker;
      }

      this.layers.cities.addLayer(textMarker);
    });
  }

  // Draw 1st-Century Jerusalem Topographical Quarters, Defensive Walls, and Gates
  drawJerusalemGeography() {
    if (typeof JERUSALEM_GEOGRAPHY === "undefined") return;

    // 1. Draw Quarters / Geographic Sectors (Mount Moriah, Kidron, Hinnom, Mount of Olives, Upper City, etc.)
    JERUSALEM_GEOGRAPHY.quarters.forEach(quarter => {
      const polygon = L.polygon(quarter.coordinates, {
        color: quarter.color,
        weight: 2,
        dashArray: "4, 6",
        fillColor: quarter.fillColor,
        fillOpacity: quarter.fillOpacity,
        className: `jerusalem-quarter-${quarter.id}`
      });

      polygon.bindTooltip(`
        <div class="tooltip-title">${quarter.name}</div>
        <div style="font-size:11px; color:#B45309; font-weight:700;">${quarter.ancientName} • Elevation: ${quarter.elevation}</div>
        <div style="font-size:11px; color:#4B5563; margin-top:3px; line-height:1.35;">${quarter.summary}</div>
        <div style="font-size:10px; color:#92400E; margin-top:4px; font-weight:600;">👆 Click to explore this area's geography & scriptures</div>
      `, { className: "custom-bible-tooltip", sticky: true });

      polygon.on("mouseover", () => {
        polygon.setStyle({ fillOpacity: quarter.fillOpacity + 0.22, weight: 3 });
      });

      polygon.on("mouseout", () => {
        polygon.setStyle({ fillOpacity: quarter.fillOpacity, weight: 2 });
      });

      polygon.on("click", (e) => {
        if (e && e.originalEvent) L.DomEvent.stopPropagation(e);
        window.app.ui.showJerusalemQuarterDetail(quarter);
      });

      this.layers.jerusalemGeography.addLayer(polygon);
    });

    // 2. Draw 1st-Century Herodian Defensive Walls
    JERUSALEM_GEOGRAPHY.walls.forEach(wall => {
      const line = L.polyline(wall.coordinates, {
        color: wall.color,
        weight: wall.weight,
        dashArray: wall.dashArray,
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round",
        className: `jerusalem-wall-${wall.id}`
      });

      line.bindTooltip(`
        <div class="tooltip-title">🧱 ${wall.name}</div>
        <div style="font-size:11px; color:#4B5563;">${wall.description}</div>
      `, { className: "custom-bible-tooltip", sticky: true });

      this.layers.jerusalemGeography.addLayer(line);
    });

    // 3. Draw Ancient Gates (Compact Icon to prevent text clutter)
    JERUSALEM_GEOGRAPHY.gates.forEach(gate => {
      const gateMarker = L.marker([gate.lat, gate.lng], {
        icon: L.divIcon({
          className: "leaflet-div-gate",
          html: `<div class="custom-marker-gate" title="${gate.name}">
                   <div class="gate-icon-inner">⛩️</div>
                 </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        }),
        zIndexOffset: 950
      });

      gateMarker.bindTooltip(`
        <div class="tooltip-title">⛩️ ${gate.name}</div>
        <div style="font-size:11px; color:#4B5563;">${gate.note}</div>
      `, { className: "custom-bible-tooltip", direction: "top" });

      this.layers.jerusalemGeography.addLayer(gateMarker);
    });
  }

  // Draw 1st-Century High-Resolution Satellite & Aerial Reconnaissance Overlays
  drawFirstCenturySatelliteOverlays() {
    // 1. 1st-Century Jerusalem Satellite & Aerial Reconnaissance Overlay
    // Exact geographic bounding box matching Second Temple Jerusalem
    const jerusalemBounds = [[31.7680, 35.2220], [31.7865, 35.2450]];
    const jerusalemOverlay = L.imageOverlay("assets/satellite/jerusalem_satellite_1st_century.jpg", jerusalemBounds, {
      opacity: 0.94,
      interactive: true,
      zIndex: 200,
      attribution: "1st Century Aerial Satellite Reconnaissance &copy; Jerusalem"
    });

    jerusalemOverlay.bindTooltip(`
      <div class="custom-bible-tooltip">
        <strong>🛰️ 1ST CENTURY JERUSALEM SATELLITE RECONNAISSANCE</strong><br>
        <small>Temple Mount, Antonia Fortress, Kidron Valley, Mount of Olives, Gethsemane & Upper City</small><br>
        <span style="color:#D97706;font-size:10px;font-weight:700;">👆 Click to open in Full 1st-C. Satellite Explorer</span>
      </div>
    `, { sticky: true });

    jerusalemOverlay.on("click", (e) => {
      if (e && e.originalEvent) L.DomEvent.stopPropagation(e);
      if (window.app && window.app.satelliteExplorer) {
        window.app.satelliteExplorer.open("jerusalem");
      }
    });

    this.layers.firstCenturySatellite.addLayer(jerusalemOverlay);

    // 2. 1st-Century Sea of Galilee Satellite Reconnaissance Overlay
    const galileeBounds = [[32.695, 35.472], [32.898, 35.668]];
    const galileeOverlay = L.imageOverlay("assets/satellite/galilee_satellite_1st_century.jpg", galileeBounds, {
      opacity: 0.94,
      interactive: true,
      zIndex: 200,
      attribution: "1st Century Satellite Reconnaissance &copy; Sea of Galilee"
    });

    galileeOverlay.bindTooltip(`
      <div class="custom-bible-tooltip">
        <strong>🛰️ 1ST CENTURY SEA OF GALILEE SATELLITE RECONNAISSANCE</strong><br>
        <small>Capernaum, Bethsaida, Magdala, Tiberias, Mount of Beatitudes & Jordan River</small><br>
        <span style="color:#D97706;font-size:10px;font-weight:700;">👆 Click to open in Full 1st-C. Satellite Explorer</span>
      </div>
    `, { sticky: true });

    galileeOverlay.on("click", (e) => {
      if (e && e.originalEvent) L.DomEvent.stopPropagation(e);
      if (window.app && window.app.satelliteExplorer) {
        window.app.satelliteExplorer.open("galilee");
      }
    });

    this.layers.firstCenturySatellite.addLayer(galileeOverlay);
  }

  // Draw Granular 1st-Century Sacred Sites Across Jerusalem
  drawJerusalemSites() {
    if (typeof JERUSALEM_SITES === "undefined") return;

    JERUSALEM_SITES.forEach(site => {
      const categoryClass = `cat-${site.category || 'temple'}`;
      const iconHtml = `
        <div class="custom-marker-jerusalem ${categoryClass}" title="${site.name}">
          <div class="jerusalem-icon-inner">${site.icon}</div>
          <div class="jerusalem-site-label">${site.name}</div>
        </div>`;

      const marker = L.marker([site.lat, site.lng], {
        icon: L.divIcon({
          className: "leaflet-div-jerusalem-site",
          html: iconHtml,
          iconSize: [110, 56],
          iconAnchor: [55, 20]
        }),
        zIndexOffset: 1200
      });

      marker.bindTooltip(`
        <div class="tooltip-title">${site.icon} ${site.name}</div>
        <div style="font-size:11px; color:#B45309; font-weight:700; margin:2px 0;">${site.area}</div>
        <div style="font-size:11px; color:#4B5563; line-height:1.35; margin-bottom:4px;">${site.summary}</div>
        <div class="tooltip-scripture">📖 ${site.scriptures[0] ? site.scriptures[0].ref : ''}</div>
      `, { className: "custom-bible-tooltip", direction: "top" });

      marker.on("click", (e) => {
        if (e && e.originalEvent) {
          L.DomEvent.stopPropagation(e);
        }
        window.app.ui.showJerusalemSiteDetail(site);
      });

      this.layers.jerusalemSites.addLayer(marker);
    });
  }

  // Draw the Savior's Footsteps / Connecting Route
  drawSaviorRoute() {
    if (!SAVIOR_EVENTS) return;

    // Filter events chronologically to build Jesus's path
    const routeCoordinates = SAVIOR_EVENTS
      .filter(e => e.lat && e.lng)
      .map(e => [e.lat, e.lng]);

    const saviorLine = L.polyline(routeCoordinates, {
      color: "#D97706",
      weight: 3.5,
      opacity: 0.75,
      lineCap: "round",
      lineJoin: "round",
      className: "savior-travel-path"
    });

    saviorLine.bindTooltip("Footsteps & Journeys of Jesus Christ (~6 BC - 30 AD)", {
      className: "custom-bible-tooltip",
      sticky: true
    });

    this.layers.saviorRoute.addLayer(saviorLine);
  }

  // Draw Jewish Diaspora Centers
  drawJewishDiaspora() {
    if (!COMMUNITIES_DATA || !COMMUNITIES_DATA.diasporaSettlements) return;

    COMMUNITIES_DATA.diasporaSettlements.forEach(diaspora => {
      const iconHtml = `
        <div class="custom-marker-diaspora">
          <div class="diaspora-icon-inner" title="Jewish Diaspora: ${diaspora.city}">✡</div>
        </div>`;

      const marker = L.marker([diaspora.lat, diaspora.lng], {
        icon: L.divIcon({
          className: "leaflet-div-diaspora",
          html: iconHtml,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        }),
        zIndexOffset: 400
      });

      marker.bindTooltip(`
        <div class="tooltip-title">Jewish Diaspora • ${diaspora.city}</div>
        <div style="font-size:11px; color:#4B5563;">${diaspora.estimatedPopulation}</div>
        <div class="tooltip-scripture">${diaspora.synagogues}</div>
      `, { className: "custom-bible-tooltip", direction: "top" });

      marker.on("click", () => {
        window.app.ui.showDiasporaDetail(diaspora);
      });

      this.layers.diaspora.addLayer(marker);
    });
  }

  // Draw Paul's Missionary Journeys
  drawMissionaryJourneys() {
    if (!MISSIONARY_JOURNEYS) return;

    MISSIONARY_JOURNEYS.forEach(journey => {
      const polyline = L.polyline(journey.path, {
        color: journey.color,
        weight: 3,
        opacity: 0.85,
        dashArray: "6, 8",
        className: `journey-line-${journey.id}`
      });

      polyline.bindTooltip(`<strong>${journey.name}</strong> (${journey.years})`, {
        className: "custom-bible-tooltip",
        sticky: true
      });

      polyline.on("click", () => {
        window.app.ui.showJourneyDetail(journey);
      });

      this.layers.missionaryJourneys.addLayer(polyline);
    });
  }

  // Update Dynamic Layers Based on Current Year (-6 BC to 100 AD)
  updateTimelineYear(year) {
    this.currentYear = year;

    // 1. Clear dynamic markers
    this.layers.saviorMarkers.clearLayers();
    this.layers.churches.clearLayers();
    this.layers.heatmaps.clearLayers();

    // 2. Render Savior's Events active by current year
    let visibleEventsCount = 0;
    if (this.filterState.savior || this.filterState.all) {
      SAVIOR_EVENTS.forEach(event => {
        // Show events that have occurred up to the current year
        // Highlight active event if exactly in this year
        if (event.year <= year) {
          visibleEventsCount++;
          const isCurrentYear = Math.abs(event.year - Math.floor(year)) < 0.5;

          const iconHtml = `
            <div class="custom-marker-savior ${isCurrentYear ? 'active-highlight' : ''}">
              ${isCurrentYear ? '<div class="savior-pulse-ring"></div>' : ''}
              <div class="savior-icon-inner" title="${event.title}">✝</div>
            </div>`;

          const marker = L.marker([event.lat, event.lng], {
            icon: L.divIcon({
              className: "leaflet-div-savior",
              html: iconHtml,
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            }),
            zIndexOffset: isCurrentYear ? 1000 : 500
          });

          marker.bindTooltip(`
            <div class="tooltip-title">${event.title}</div>
            <div style="font-size:11px; color:#92400E; font-weight:600;">${event.season}</div>
            <div class="tooltip-scripture">${event.scriptures[0] ? event.scriptures[0].ref : ''}</div>
          `, { className: "custom-bible-tooltip", direction: "top" });

          marker.on("click", () => {
            window.app.ui.showEventDetail(event);
          });

          this.layers.saviorMarkers.addLayer(marker);
        }
      });
    }

    // 3. Render Christian Churches that have multiplied by this year
    let activeChurchesCount = 0;
    if (this.filterState.churches || this.filterState.all) {
      COMMUNITIES_DATA.churchesMultiplication.forEach(church => {
        if (church.foundedYear <= year) {
          activeChurchesCount++;
          const isRecentlyPlanted = (year - church.foundedYear) <= 2;

          const iconHtml = `
            <div class="custom-marker-church ${isRecentlyPlanted ? 'recent-church' : ''}">
              <div class="church-pulse-ring"></div>
              <div class="church-icon-inner" title="Church at ${church.city}">☩</div>
            </div>`;

          const marker = L.marker([church.lat, church.lng], {
            icon: L.divIcon({
              className: "leaflet-div-church",
              html: iconHtml,
              iconSize: [26, 26],
              iconAnchor: [13, 13]
            }),
            zIndexOffset: 600
          });

          marker.bindTooltip(`
            <div class="tooltip-title">Christian Church • ${church.city}</div>
            <div style="font-size:11px; color:#991B1B;">Founded ~${church.foundedYear} AD by ${church.founders}</div>
          `, { className: "custom-bible-tooltip", direction: "top" });

          marker.on("click", () => {
            window.app.ui.showChurchDetail(church);
          });

          this.layers.churches.addLayer(marker);

          // If growth heatmap is enabled, add circular density glow
          if (this.filterState.heatmaps) {
            const circle = L.circle([church.lat, church.lng], {
              radius: Math.min(180000, 30000 + (year - church.foundedYear) * 4000),
              color: "#DC2626",
              weight: 0,
              fillColor: "#DC2626",
              fillOpacity: 0.14
            });
            this.layers.heatmaps.addLayer(circle);
          }
        }
      });
    }

    // 4. Update UI Stat counters
    if (document.getElementById("statEventsCount")) {
      document.getElementById("statEventsCount").textContent = visibleEventsCount;
    }
    if (document.getElementById("statChurchesCount")) {
      document.getElementById("statChurchesCount").textContent = activeChurchesCount;
    }
    if (document.getElementById("statDiasporaCount")) {
      document.getElementById("statDiasporaCount").textContent = COMMUNITIES_DATA.diasporaSettlements.length;
    }
  }

  // Filter Layer Visibility by Toggle
  setLayerFilter(filterType, isEnabled) {
    this.filterState[filterType] = isEnabled;

    if (filterType === "all") {
      Object.keys(this.filterState).forEach(k => {
        this.filterState[k] = isEnabled;
      });
    }

    // Manage Layer Group attachments
    if (!this.filterState.savior && !this.filterState.all) {
      this.map.removeLayer(this.layers.saviorMarkers);
      this.map.removeLayer(this.layers.saviorRoute);
    } else {
      this.map.addLayer(this.layers.saviorMarkers);
      this.map.addLayer(this.layers.saviorRoute);
    }

    if (!this.filterState.diaspora && !this.filterState.all) {
      this.map.removeLayer(this.layers.diaspora);
    } else {
      this.map.addLayer(this.layers.diaspora);
    }

    if (!this.filterState.churches && !this.filterState.all) {
      this.map.removeLayer(this.layers.churches);
    } else {
      this.map.addLayer(this.layers.churches);
    }

    if (!this.filterState.journeys && !this.filterState.all) {
      this.map.removeLayer(this.layers.missionaryJourneys);
    } else {
      this.map.addLayer(this.layers.missionaryJourneys);
    }

    if (!this.filterState.provinces && !this.filterState.all) {
      this.map.removeLayer(this.layers.provinces);
    } else {
      this.map.addLayer(this.layers.provinces);
    }

    if (!this.filterState.heatmaps) {
      this.map.removeLayer(this.layers.heatmaps);
    } else {
      this.map.addLayer(this.layers.heatmaps);
    }

    if (this.filterState.modernOverlay) {
      if (!this.layers.modernOverlay.hasLayer(this.tileLayers.modernOverlay)) {
        this.layers.modernOverlay.addLayer(this.tileLayers.modernOverlay);
      }
      this.map.addLayer(this.layers.modernOverlay);
    } else {
      this.map.removeLayer(this.layers.modernOverlay);
      this.layers.modernOverlay.clearLayers();
    }

    if (!this.filterState.jerusalemSites && !this.filterState.all) {
      this.map.removeLayer(this.layers.jerusalemSites);
    } else {
      const zoom = this.map.getZoom();
      if (zoom >= 11 || this.filterState.jerusalemSites) {
        this.map.addLayer(this.layers.jerusalemSites);
      }
    }

    if (!this.filterState.jerusalemGeography && !this.filterState.all) {
      this.map.removeLayer(this.layers.jerusalemGeography);
    } else {
      const zoom = this.map.getZoom();
      const center = this.map.getCenter();
      const isJerusalemVicinity = Math.abs(center.lat - 31.777) < 0.08 && Math.abs(center.lng - 35.234) < 0.08;
      if (zoom >= 12 && isJerusalemVicinity) {
        this.map.addLayer(this.layers.jerusalemGeography);
      }
    }

    if (!this.filterState.firstCenturySatellite && !this.filterState.all) {
      this.map.removeLayer(this.layers.firstCenturySatellite);
    } else {
      this.map.addLayer(this.layers.firstCenturySatellite);
    }

    this.updateTimelineYear(this.currentYear);
  }

  // Camera Navigation
  flyToLocation(lat, lng, zoom = 11) {
    this.map.flyTo([lat, lng], zoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }

  focusRegion(regionKey) {
    const preset = REGIONS_DATA.cameraPresets[regionKey];
    if (preset) {
      this.map.flyTo(preset.center, preset.zoom, { duration: 1.4 });
      if (regionKey === "jerusalem" && typeof JERUSALEM_SITES !== "undefined" && JERUSALEM_SITES.length > 0) {
        setTimeout(() => {
          if (window.app && window.app.ui) {
            window.app.ui.showJerusalemSiteDetail(JERUSALEM_SITES[0]);
          }
        }, 750);
      }
    }
  }

  recenter() {
    this.focusRegion("mediterranean");
  }
}
