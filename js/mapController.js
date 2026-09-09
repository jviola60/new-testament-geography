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
      modernOverlay: L.layerGroup()
    };

    // Tile layers
    this.tileLayers = {
      parchment: null,
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
      modernOverlay: false
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
      .addAttribution('New Testament Atlas • Cartography: CARTO, Esri & OSM')
      .addTo(this.map);

    // Setup Tile Layers
    this.setupTileLayers();

    // Attach All Layer Groups to Map
    Object.values(this.layers).forEach(layer => layer.addTo(this.map));

    // Draw Static & Foundational Geographic Layers
    this.drawProvinces();
    this.drawCities();
    this.drawSaviorRoute();
    this.drawMissionaryJourneys();
    this.drawJewishDiaspora();

    // Initial update based on starting year (-6 BC)
    this.updateTimelineYear(-6);
  }

  setupTileLayers() {
    // 1. Parchment base layer: Esri World Shaded Relief
    // maxNativeZoom: 13 ensures Leaflet scales tiles smoothly when zooming in beyond level 13,
    // completely preventing 'Map data not yet available' tiles from ever appearing.
    this.tileLayers.parchment = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
      {
        maxNativeZoom: 13,
        maxZoom: 18,
        opacity: 0.95,
        attribution: "Cartography &copy; Esri World Shaded Relief"
      }
    );

    // 2. Satellite / Aerial imagery layer (Esri World Imagery)
    this.tileLayers.satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxNativeZoom: 18, maxZoom: 18, opacity: 1.0, attribution: "Esri World Imagery" }
    );

    // 3. Full Modern Street Map (OpenStreetMap with modern streets, cities, and borders)
    this.tileLayers.modern = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxNativeZoom: 18, maxZoom: 18, opacity: 1.0, attribution: "&copy; OpenStreetMap contributors" }
    );

    // 4. Modern Streets Overlay Layer (Semi-transparent modern road & street grid for cross-referencing)
    this.tileLayers.modernOverlay = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxNativeZoom: 18, maxZoom: 18, opacity: 0.55, attribution: "&copy; OpenStreetMap contributors" }
    );

    // Default to parchment
    this.tileLayers.parchment.addTo(this.map);
  }

  setMapStyle(theme) {
    this.currentTheme = theme;
    const body = document.body;

    // Remove all basemap tiles first
    this.map.removeLayer(this.tileLayers.parchment);
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

      this.layers.cities.addLayer(textMarker);
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
      this.map.flyTo(preset.center, preset.zoom, { duration: 1.6 });
    }
  }

  recenter() {
    this.focusRegion("mediterranean");
  }
}
