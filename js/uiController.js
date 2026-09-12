/**
 * UI Controller - Manages the Information Sidebar Drawer, Tabs,
 * Guided Story Tours, Global Search, and Ambient Sound Generator.
 */
class UIController {
  constructor() {
    this.sidebar = null;
    this.sidebarTitle = null;
    this.sidebarEyebrow = null;
    this.sidebarContent = null;
    this.tabButtons = [];
    this.currentTab = "overview";
    this.currentActiveItem = null; // Stored entity for tab switching

    // Search elements
    this.searchInput = null;
    this.searchDropdown = null;
    this.clearSearchBtn = null;

    // Tour state
    this.activeTour = null;
    this.currentTourStopIndex = 0;

    // Ambient audio synth
    this.audioContext = null;
    this.isAudioPlaying = false;
    this.audioTimer = null;
  }

  init() {
    this.sidebar = document.getElementById("detailSidebar");
    this.sidebarTitle = document.getElementById("sidebarTitle");
    this.sidebarEyebrow = document.getElementById("sidebarEyebrow");
    this.sidebarContent = document.getElementById("sidebarContent");
    this.tabButtons = document.querySelectorAll(".sidebar-tabs .tab-btn");

    this.searchInput = document.getElementById("globalSearchInput");
    this.searchDropdown = document.getElementById("searchResultsDropdown");
    this.clearSearchBtn = document.getElementById("clearSearchBtn");

    this.bindEvents();
    this.setupTours();
  }

  bindEvents() {
    // Sidebar Close & Toggle
    const closeBtn = document.getElementById("closeSidebarBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeSidebar());
    }

    const toggleBtn = document.getElementById("sidebarToggleBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleSidebar());
    }

    // Sidebar Tab Switching
    this.tabButtons.forEach(tab => {
      tab.addEventListener("click", () => {
        this.tabButtons.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.currentTab = tab.dataset.tab;
        this.renderActiveItemTabs();
      });
    });

    // Map Style Mode Dropdown (Parchment / Satellite / Modern Streets)
    const mapStyleBtn = document.getElementById("mapStyleToggle");
    const mapStyleDropdown = document.getElementById("mapStyleDropdown");
    const mapStyleIcon = document.getElementById("mapStyleIcon");
    const mapStyleText = document.getElementById("mapStyleText");

    if (mapStyleBtn && mapStyleDropdown) {
      mapStyleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mapStyleDropdown.classList.toggle("open");
      });

      document.addEventListener("click", () => {
        mapStyleDropdown.classList.remove("open");
      });

      mapStyleDropdown.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", () => {
          const style = item.dataset.style;

          if (style === "first-century-satellite") {
            // 1st-Century Satellite Explorer (Archaeological orbital reconstructions)
            if (window.app && window.app.satelliteExplorer) {
              window.app.satelliteExplorer.open("holy-land");
            }
          } else if (style === "modern-satellite" || style === "satellite") {
            // Satellite Earth Terrain (Continuous global satellite imagery across whole world)
            window.app.map.setMapStyle("satellite");
            if (mapStyleIcon) mapStyleIcon.textContent = "🛰️";
            if (mapStyleText) mapStyleText.textContent = "Satellite Earth";
          } else if (style === "modern") {
            // Modern Streets & Infrastructure
            window.app.map.setMapStyle("modern");
            if (mapStyleIcon) mapStyleIcon.textContent = "🗺️";
            if (mapStyleText) mapStyleText.textContent = "Modern Streets";
          } else {
            // Ancient Shaded Relief (Biblical Terrain)
            window.app.map.setMapStyle("parchment");
            if (mapStyleIcon) mapStyleIcon.textContent = "📜";
            if (mapStyleText) mapStyleText.textContent = "Ancient Relief";
          }
          mapStyleDropdown.classList.remove("open");
        });
      });
    }

    // Ambient Audio Button
    const audioBtn = document.getElementById("ambientAudioBtn");
    if (audioBtn) {
      audioBtn.addEventListener("click", () => this.toggleAmbientAudio());
    }

    // Quick Regions Dropdown
    const regionBtn = document.getElementById("regionSelectBtn");
    const regionDropdown = document.getElementById("regionDropdown");
    if (regionBtn && regionDropdown) {
      regionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        regionDropdown.classList.toggle("open");
      });

      document.addEventListener("click", () => {
        regionDropdown.classList.remove("open");
      });

      regionDropdown.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", () => {
          const regionKey = item.dataset.region;
          if (regionKey === "satellite-explorer") {
            if (window.app && window.app.satelliteExplorer) {
              window.app.satelliteExplorer.open("holy-land");
            }
          } else {
            window.app.map.focusRegion(regionKey);
            const presetToRegion = {
              galilee: "galilee",
              jerusalem: "judea",
              "holy-land": "judea",
              "asia-minor": "asia",
              greece: "achaia",
              rome: "italia",
              egypt: "egypt"
            };
            const regionId = presetToRegion[regionKey];
            if (regionId && typeof REGIONS_DATA !== "undefined" && REGIONS_DATA.regions) {
              const region = REGIONS_DATA.regions.find(r => r.id === regionId);
              if (region && window.app.ui) {
                if (regionKey === "jerusalem") {
                  // keep existing Jerusalem site opener in focusRegion
                } else {
                  window.app.ui.showRegionDetail(region);
                }
              }
            }
          }
          regionDropdown.classList.remove("open");
        });
      });
    }

    // Floating Map Buttons
    const recenterBtn = document.getElementById("recenterBtn");
    if (recenterBtn) {
      recenterBtn.addEventListener("click", () => {
        window.app.map.recenter();
        this.showWelcome();
      });
    }

    const holyLandBtn = document.getElementById("holyLandQuickBtn");
    if (holyLandBtn) {
      holyLandBtn.addEventListener("click", () => window.app.map.focusRegion("holy-land"));
    }

    const jerusalemBtn = document.getElementById("jerusalemQuickBtn");
    if (jerusalemBtn) {
      jerusalemBtn.addEventListener("click", () => window.app.map.focusRegion("jerusalem"));
    }

    // Filter Chips
    document.querySelectorAll(".filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const filterKey = chip.dataset.filter;
        const isActive = chip.classList.toggle("active");
        window.app.map.setLayerFilter(filterKey, isActive);
      });
    });

    // Legend Collapsible
    const legendHeader = document.getElementById("legendToggleHeader");
    const legendBody = document.getElementById("legendBody");
    const legendCollapseBtn = document.getElementById("legendCollapseBtn");
    if (legendHeader && legendBody) {
      legendHeader.addEventListener("click", () => {
        const isHidden = legendBody.style.display === "none";
        legendBody.style.display = isHidden ? "flex" : "none";
        legendCollapseBtn.textContent = isHidden ? "−" : "+";
      });
    }

    // Search Bar
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value));
      this.searchInput.addEventListener("focus", (e) => this.handleSearch(e.target.value));

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-box-wrapper")) {
          if (this.searchDropdown) this.searchDropdown.style.display = "none";
        }
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener("click", () => {
        this.searchInput.value = "";
        this.clearSearchBtn.style.display = "none";
        if (this.searchDropdown) this.searchDropdown.style.display = "none";
      });
    }

    // Curated Tour Mini Card Clicks, Era Jumps, and Scripture Translation Dropdown (Sidebar Event Delegation)
    if (this.sidebarContent) {
      this.sidebarContent.addEventListener("click", (e) => {
        // Scripture version menu button toggle (⋮)
        const menuBtn = e.target.closest(".scripture-card-menu-btn");
        if (menuBtn) {
          e.stopPropagation();
          const dropdown = menuBtn.nextElementSibling;
          this.sidebarContent.querySelectorAll(".scripture-version-dropdown.open").forEach(d => {
            if (d !== dropdown) d.classList.remove("open");
          });
          if (dropdown) dropdown.classList.toggle("open");
          return;
        }

        // Scripture version item selection
        const versionItem = e.target.closest(".scripture-version-item");
        if (versionItem) {
          e.stopPropagation();
          const card = versionItem.closest(".scripture-verse-card");
          const version = versionItem.dataset.version;
          if (card && version) {
            this.switchScriptureVersion(card, version);
          }
          const dropdown = versionItem.closest(".scripture-version-dropdown");
          if (dropdown) dropdown.classList.remove("open");
          return;
        }

        // Tour card clicked
        const tourCard = e.target.closest(".tour-mini-card");
        if (tourCard) {
          const tourId = tourCard.dataset.tourId;
          this.startTour(tourId);
          return;
        }

        // Era jump button clicked
        const eraBtn = e.target.closest(".era-jump-btn");
        if (eraBtn) {
          const year = parseFloat(eraBtn.dataset.year);
          if (window.app && window.app.timeline) {
            window.app.timeline.setYear(year);
          }
          return;
        }

        // Close any open scripture dropdowns when clicking elsewhere in sidebar
        this.sidebarContent.querySelectorAll(".scripture-version-dropdown.open").forEach(d => {
          d.classList.remove("open");
        });
      });

      // Close dropdowns if clicked outside sidebar content
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".scripture-card-menu-btn") && !e.target.closest(".scripture-version-dropdown")) {
          this.sidebarContent.querySelectorAll(".scripture-version-dropdown.open").forEach(d => {
            d.classList.remove("open");
          });
        }
      });
    }

    document.querySelectorAll(".tour-mini-card").forEach(card => {
      card.addEventListener("click", () => {
        const tourId = card.dataset.tourId;
        this.startTour(tourId);
      });
    });

    // Populate and bind Quick Jump Location Dropdown (All Cities, Holy Sites, Quarters & Landmarks)
    this.initQuickJumpDropdown();
  }

  getQuickJumpCatalog() {
    const groups = [];

    if (typeof JERUSALEM_SITES !== "undefined" && JERUSALEM_SITES.length > 0) {
      groups.push({
        label: "🏛️ Jerusalem Sacred Landmarks",
        items: JERUSALEM_SITES.map(site => ({
          value: `jerusalemSite:${site.id}`,
          label: `${site.icon || "🏛️"} ${site.name} (${site.area})`,
          searchText: `${site.name} ${site.area} ${site.ancientName || ""} jerusalem`
        }))
      });
    }

    if (typeof JERUSALEM_GEOGRAPHY !== "undefined" && JERUSALEM_GEOGRAPHY.quarters && JERUSALEM_GEOGRAPHY.quarters.length > 0) {
      groups.push({
        label: "🏔️ Jerusalem Quarters & Topography",
        items: JERUSALEM_GEOGRAPHY.quarters.map(quarter => ({
          value: `jerusalemQuarter:${quarter.id}`,
          label: `🏔️ ${quarter.name} (${quarter.elevation || "Jerusalem"})`,
          searchText: `${quarter.name} ${quarter.elevation || ""} jerusalem quarter`
        }))
      });
    }

    const geoList = (typeof GEO_FEATURES !== "undefined" && GEO_FEATURES) || (typeof window !== "undefined" && window.GEO_FEATURES) || [];
    if (geoList.length > 0) {
      groups.push({
        label: "🌊 Holy Land Waters & Landscapes",
        items: geoList.map(geo => ({
          value: `geo:${geo.id}`,
          label: `🌊 ${geo.name} (${geo.region || geo.category || "Holy Land"})`,
          searchText: `${geo.name} ${geo.region || ""} ${geo.category || ""}`
        }))
      });
    }

    const holyLandCities = this.citiesList()
      .filter(c => ["Galilee", "Judea", "Samaria", "Decapolis", "Perea"].includes(c.region))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (holyLandCities.length > 0) {
      groups.push({
        label: "📍 Holy Land Cities (Galilee, Judea, Samaria)",
        items: holyLandCities.map(city => ({
          value: `city:${city.id}`,
          label: `${city.name} (${city.region})`,
          searchText: `${city.name} ${city.region} ${city.modernName || ""}`
        }))
      });
    }

    const apostolicCities = this.citiesList()
      .filter(c => !["Galilee", "Judea", "Samaria", "Decapolis", "Perea"].includes(c.region))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (apostolicCities.length > 0) {
      groups.push({
        label: "🌍 Mediterranean & Apostolic Cities",
        items: apostolicCities.map(city => ({
          value: `city:${city.id}`,
          label: city.id === "patmos"
            ? `📜 Patmos (Isle of Patmos • John's Exile & Revelation)`
            : `${city.name} (${city.region})`,
          searchText: `${city.name} ${city.region} ${city.modernName || ""}`
        }))
      });
    }

    if (typeof REGIONS_DATA !== "undefined" && REGIONS_DATA.regions && REGIONS_DATA.regions.length > 0) {
      groups.push({
        label: "🗺️ Roman Provinces & Regions",
        items: REGIONS_DATA.regions.map(region => ({
          value: `region:${region.id}`,
          label: `🏛️ ${region.name} (${region.capital ? "Cap: " + region.capital : "Province"})`,
          searchText: `${region.name} ${region.capital || ""} ${region.ancientName || ""}`
        }))
      });
    }

    return groups;
  }

  jumpToQuickJumpValue(val) {
    if (!val) return false;
    const [type, id] = val.split(":");

    if (type === "jerusalemSite") {
      const site = typeof JERUSALEM_SITES !== "undefined" && JERUSALEM_SITES.find(s => s.id === id);
      if (site) {
        if (window.app && window.app.map) window.app.map.flyToLocation(site.lat, site.lng, 16);
        this.showJerusalemSiteDetail(site);
        return true;
      }
    } else if (type === "jerusalemQuarter") {
      const quarter = typeof JERUSALEM_GEOGRAPHY !== "undefined" && JERUSALEM_GEOGRAPHY.quarters && JERUSALEM_GEOGRAPHY.quarters.find(q => q.id === id);
      if (quarter) {
        const center = this.polygonCenter ? this.polygonCenter(quarter.coordinates) : quarter.coordinates[0];
        if (center && window.app && window.app.map) window.app.map.flyToLocation(center[0], center[1], 15);
        this.showJerusalemQuarterDetail(quarter);
        return true;
      }
    } else if (type === "geo") {
      const geo = this.findGeoFeature(id);
      if (geo) {
        if (window.app && window.app.map) window.app.map.flyToLocation(geo.lat, geo.lng, geo.zoom || 11);
        this.showGeoFeatureDetail(geo);
        return true;
      }
    } else if (type === "city") {
      const city = this.citiesList().find(c => c.id === id);
      if (city) {
        if (window.app && window.app.map) window.app.map.flyToLocation(city.lat, city.lng, 12);
        this.showCityDetail(city);
        return true;
      }
    } else if (type === "region") {
      const region = typeof REGIONS_DATA !== "undefined" && REGIONS_DATA.regions && REGIONS_DATA.regions.find(r => r.id === id);
      if (region) {
        if (window.app && window.app.map) {
          if (REGIONS_DATA.cameraPresets && REGIONS_DATA.cameraPresets[region.id]) {
            window.app.map.focusRegion(region.id);
          } else if (region.bounds) {
            const b = region.bounds;
            window.app.map.flyToLocation((b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2, 8);
          }
        }
        this.showRegionDetail(region);
        return true;
      }
    }

    return false;
  }

  // Quick Jump Dropdown for All Biblical Locations & Holy Sites
  initQuickJumpDropdown() {
    const select = document.getElementById("quickJumpSelect");
    if (!select) return;

    select.innerHTML = `<option value="" disabled selected>Jump to Any Biblical Location...</option>`;

    this.getQuickJumpCatalog().forEach(group => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = group.label;
      group.items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.value;
        opt.textContent = item.label;
        optgroup.appendChild(opt);
      });
      select.appendChild(optgroup);
    });

    select.addEventListener("change", (e) => {
      const val = e.target.value;
      if (!val) return;
      this.jumpToQuickJumpValue(val);
      setTimeout(() => {
        select.value = "";
      }, 400);
    });
  }

  // Sidebar Controls
  openSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.remove("closed");
    }
    if (window.app && window.app.mobile) {
      window.app.mobile.onSidebarOpened();
    }
  }

  closeSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.add("closed");
    }
    if (window.app && window.app.mobile) {
      window.app.mobile.onSidebarClosed();
    }
  }

  toggleSidebar() {
    if (this.sidebar && this.sidebar.classList.contains("closed")) {
      this.openSidebar();
    } else {
      this.closeSidebar();
    }
  }

  // Global Search Engine
  handleSearch(query) {
    if (!query || query.trim().length < 2) {
      if (this.searchDropdown) this.searchDropdown.style.display = "none";
      if (this.clearSearchBtn) this.clearSearchBtn.style.display = "none";
      return;
    }

    if (this.clearSearchBtn) this.clearSearchBtn.style.display = "block";
    const q = query.toLowerCase().trim();
    const results = [];

    // Search Roman Provinces & Biblical Regions
    if (typeof REGIONS_DATA !== "undefined" && REGIONS_DATA.regions) {
      REGIONS_DATA.regions.forEach(region => {
        if (
          region.name.toLowerCase().includes(q) ||
          (region.ancientName && region.ancientName.toLowerCase().includes(q)) ||
          (region.summary && region.summary.toLowerCase().includes(q)) ||
          (region.capital && region.capital.toLowerCase().includes(q))
        ) {
          results.push({
            type: "region",
            item: region,
            title: `🏛️ ${region.name}`,
            subtitle: `Roman Province • Capital: ${region.capital}`,
            badge: "Region"
          });
        }
      });
    }

    // Search Jerusalem Sacred Sites
    if (typeof JERUSALEM_SITES !== "undefined") {
      JERUSALEM_SITES.forEach(site => {
        if (
          site.name.toLowerCase().includes(q) ||
          site.ancientName.toLowerCase().includes(q) ||
          site.area.toLowerCase().includes(q) ||
          site.summary.toLowerCase().includes(q) ||
          site.overview.toLowerCase().includes(q) ||
          site.scriptures.some(s => s.ref.toLowerCase().includes(q) || s.text.toLowerCase().includes(q))
        ) {
          results.push({ type: "jerusalemSite", item: site, title: `${site.icon} ${site.name}`, subtitle: `Jerusalem • ${site.area}`, badge: "Jerusalem" });
        }
      });
    }

    // Search Jerusalem Topographical Quarters & Sectors
    if (typeof JERUSALEM_GEOGRAPHY !== "undefined" && JERUSALEM_GEOGRAPHY.quarters) {
      JERUSALEM_GEOGRAPHY.quarters.forEach(quarter => {
        if (
          quarter.name.toLowerCase().includes(q) ||
          quarter.ancientName.toLowerCase().includes(q) ||
          quarter.summary.toLowerCase().includes(q) ||
          quarter.overview.toLowerCase().includes(q) ||
          quarter.topography.toLowerCase().includes(q)
        ) {
          results.push({
            type: "jerusalemQuarter",
            item: quarter,
            title: `🏔️ ${quarter.name}`,
            subtitle: `Topography & Quarter • ${quarter.elevation}`,
            badge: "Quarter"
          });
        }
      });
    }

    // Search Cities
    this.citiesList().forEach(city => {
      const isPathomisMatch = (q.includes("pathom") || q.includes("patm")) && city.id === "patmos";
      if (
        city.name.toLowerCase().includes(q) ||
        (city.ancientName && city.ancientName.toLowerCase().includes(q)) ||
        (city.region && city.region.toLowerCase().includes(q)) ||
        (city.significance && city.significance.toLowerCase().includes(q)) ||
        (city.overview && city.overview.toLowerCase().includes(q)) ||
        (city.aliases && city.aliases.some(a => a.toLowerCase().includes(q))) ||
        isPathomisMatch
      ) {
        const title = city.id === "patmos" ? "📜 Patmos (Isle of Patmos • John's Exile)" : city.name;
        results.push({ type: "city", item: city, title: title, subtitle: `${city.region} • ${city.ancientName}`, badge: "City" });
      }
    });

    // Search landscape features (Sea of Galilee, Jordan, Hermon, etc.)
    const geoList = (typeof GEO_FEATURES !== "undefined" && GEO_FEATURES) || window.GEO_FEATURES || [];
    geoList.forEach(feature => {
      if (
        feature.name.toLowerCase().includes(q) ||
        (feature.ancientName && feature.ancientName.toLowerCase().includes(q)) ||
        (feature.summary && feature.summary.toLowerCase().includes(q)) ||
        (feature.overview && feature.overview.toLowerCase().includes(q))
      ) {
        results.push({
          type: "geo",
          item: feature,
          title: `🌊 ${feature.name}`,
          subtitle: `${feature.region || "Holy Land"} • ${feature.category || "Geography"}`,
          badge: "Place"
        });
      }
    });

    // Search Savior Events
    SAVIOR_EVENTS.forEach(event => {
      if (
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.locationName.toLowerCase().includes(q) ||
        event.scriptures.some(s => s.ref.toLowerCase().includes(q) || s.text.toLowerCase().includes(q))
      ) {
        results.push({ type: "savior", item: event, title: event.title, subtitle: `${event.season} • ${event.locationName}`, badge: "Savior" });
      }
    });

    // Search Acts Timeline Events
    TIMELINE_EVENTS.forEach(event => {
      if (
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.locationName.toLowerCase().includes(q)
      ) {
        // Avoid duplicate if already in savior
        if (!results.some(r => r.item.id === event.id)) {
          results.push({ type: "event", item: event, title: event.title, subtitle: `${event.season} • ${event.locationName}`, badge: "Event" });
        }
      }
    });

    // Search Missionary Journeys
    MISSIONARY_JOURNEYS.forEach(j => {
      if (j.name.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)) {
        results.push({ type: "journey", item: j, title: j.name, subtitle: `${j.years} • ${j.companions}`, badge: "Journey" });
      }
    });

    // Render Search Results
    if (this.searchDropdown) {
      if (results.length === 0) {
        this.searchDropdown.innerHTML = `<div style="padding: 1rem; color: #78716C; text-align: center; font-size: 0.82rem;">No matching biblical locations or events found.</div>`;
      } else {
        this.searchDropdown.innerHTML = results.slice(0, 10).map((r, idx) => `
          <div class="search-result-item" data-idx="${idx}">
            <div class="search-res-info">
              <span class="search-res-name">${r.title}</span>
              <span class="search-res-sub">${r.subtitle}</span>
            </div>
            <span class="search-res-badge badge-${r.type}">${r.badge}</span>
          </div>
        `).join("");

        // Attach Clicks
        this.searchDropdown.querySelectorAll(".search-result-item").forEach((el, idx) => {
          el.addEventListener("click", () => {
            const res = results[idx];
            this.searchDropdown.style.display = "none";
            this.executeSearchResult(res);
          });
        });
      }
      this.searchDropdown.style.display = "block";
    }
  }

  executeSearchResult(res) {
    if (res.type === "jerusalemSite") {
      window.app.map.flyToLocation(res.item.lat, res.item.lng, 16);
      this.showJerusalemSiteDetail(res.item);
    } else if (res.type === "jerusalemQuarter") {
      const center = res.item.coordinates[0];
      window.app.map.flyToLocation(center[0], center[1], 15);
      this.showJerusalemQuarterDetail(res.item);
    } else if (res.type === "city") {
      window.app.map.flyToLocation(res.item.lat, res.item.lng, 12);
      this.showCityDetail(res.item);
    } else if (res.type === "savior" || res.type === "event") {
      window.app.timeline.setYear(res.item.year);
      window.app.map.flyToLocation(res.item.lat, res.item.lng, 13);
      this.showEventDetail(res.item);
    } else if (res.type === "journey") {
      window.app.timeline.setYear(res.item.startYear);
      window.app.map.focusRegion("mediterranean");
      this.showJourneyDetail(res.item);
    } else if (res.type === "region") {
      if (REGIONS_DATA && REGIONS_DATA.cameraPresets && REGIONS_DATA.cameraPresets[res.item.id]) {
        window.app.map.focusRegion(res.item.id);
      } else if (res.item.bounds) {
        const b = res.item.bounds;
        const centerLat = (b[0][0] + b[1][0]) / 2;
        const centerLng = (b[0][1] + b[1][1]) / 2;
        window.app.map.flyToLocation(centerLat, centerLng, 8);
      }
      this.showRegionDetail(res.item);
    } else if (res.type === "geo") {
      window.app.map.flyToLocation(res.item.lat, res.item.lng, 11);
      this.showGeoFeatureDetail(res.item);
    }
  }

  // =========================================================================
  // DETAIL VIEWS (Cities, Events, Churches, Diaspora, Journeys)
  // =========================================================================

  // Helper to construct ChurchofJesusChrist.org scripture links (NT and OT)
  getChurchScriptureLink(citation) {
    if (!citation) return "https://www.churchofjesuschrist.org/study/scriptures/nt?lang=eng";
    const ntBooks = {
      "matthew": "matt", "matt": "matt",
      "mark": "mark",
      "luke": "luke",
      "john": "john",
      "acts": "acts",
      "romans": "rom", "rom": "rom",
      "1 corinthians": "1-cor", "1 cor": "1-cor",
      "2 corinthians": "2-cor", "2 cor": "2-cor",
      "galatians": "gal", "gal": "gal",
      "ephesians": "eph", "eph": "eph",
      "philippians": "philip", "phil": "philip",
      "colossians": "col", "col": "col",
      "1 thessalonians": "1-thes", "1 thes": "1-thes",
      "2 thessalonians": "2-thes", "2 thes": "2-thes",
      "1 timothy": "1-tim", "1 tim": "1-tim",
      "2 timothy": "2-tim", "2 tim": "2-tim",
      "titus": "titus",
      "philemon": "philem",
      "hebrews": "heb", "heb": "heb",
      "james": "jas", "jas": "jas",
      "1 peter": "1-pet", "1 pet": "1-pet",
      "2 peter": "2-pet", "2 pet": "2-pet",
      "1 john": "1-jn", "1 jn": "1-jn",
      "2 john": "2-jn", "2 jn": "2-jn",
      "3 john": "3-jn", "3 jn": "3-jn",
      "jude": "jude",
      "revelation": "rev", "rev": "rev"
    };
    const otBooks = {
      "genesis": "gen", "gen": "gen",
      "exodus": "ex", "ex": "ex",
      "leviticus": "lev", "lev": "lev",
      "numbers": "num", "num": "num",
      "deuteronomy": "deut", "deut": "deut",
      "joshua": "josh", "josh": "josh",
      "judges": "judg",
      "ruth": "ruth",
      "1 samuel": "1-sam", "1 sam": "1-sam",
      "2 samuel": "2-sam", "2 sam": "2-sam",
      "1 kings": "1-kgs", "1 kgs": "1-kgs",
      "2 kings": "2-kgs", "2 kgs": "2-kgs",
      "ezra": "ezra",
      "nehemiah": "neh", "neh": "neh",
      "esther": "esth",
      "job": "job",
      "psalm": "ps", "psalms": "ps", "ps": "ps",
      "proverbs": "prov", "prov": "prov",
      "isaiah": "isa", "isa": "isa",
      "jeremiah": "jer", "jer": "jer",
      "lamentations": "lam",
      "ezekiel": "ezek", "ezek": "ezek",
      "daniel": "dan", "dan": "dan",
      "hosea": "hosea",
      "joel": "joel",
      "amos": "amos",
      "obadiah": "obad",
      "jonah": "jonah",
      "micah": "micah",
      "nahum": "nahum",
      "habakkuk": "hab",
      "zephaniah": "zeph",
      "haggai": "hag",
      "zechariah": "zech",
      "malachi": "mal"
    };

    // 1. Direct handling for Revelation & Seven Churches letters
    const lower = String(citation).toLowerCase().trim();
    if (lower.includes("revelation") || lower.includes("apocalypse")) {
      if (lower.includes("ephesus")) return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/2?lang=eng&id=p1-p7#p1";
      if (lower.includes("smyrna")) return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/2?lang=eng&id=p8-p11#p8";
      if (lower.includes("pergamum") || lower.includes("pergamos")) return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/2?lang=eng&id=p12-p17#p12";
      if (lower.includes("thyatira")) return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/2?lang=eng&id=p18-p29#p18";
      if (lower.includes("sardis")) return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/3?lang=eng&id=p1-p6#p1";
      if (lower.includes("philadelphia")) return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/3?lang=eng&id=p7-p13#p7";
      if (lower.includes("laodicea")) return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/3?lang=eng&id=p14-p22#p14";
      const revMatch = lower.match(/rev(?:elation)?\s*(\d+)(?::(\d+))?/);
      if (revMatch) {
        const ch = revMatch[1];
        const v = revMatch[2];
        return v ? `https://www.churchofjesuschrist.org/study/scriptures/nt/rev/${ch}?lang=eng&id=p${v}#p${v}` : `https://www.churchofjesuschrist.org/study/scriptures/nt/rev/${ch}?lang=eng`;
      }
      return "https://www.churchofjesuschrist.org/study/scriptures/nt/rev/1?lang=eng";
    }

    const cleaned = String(citation).replace(/&/g, " ").split(/[;,—]/)[0].trim();
    const cleanLower = cleaned.toLowerCase();

    // 2. Check for whole book name match (e.g. "Romans", "1 Corinthians", "Galatians")
    for (const [bookName, slug] of Object.entries(ntBooks)) {
      if (cleanLower === bookName || cleanLower.startsWith(bookName + " ")) {
        const remainder = cleanLower.slice(bookName.length).trim();
        const chMatch = remainder.match(/^(\d+)(?::(\d+))?/);
        const ch = chMatch ? chMatch[1] : "1";
        const v = chMatch && chMatch[2] ? chMatch[2] : null;
        return v
          ? `https://www.churchofjesuschrist.org/study/scriptures/nt/${slug}/${ch}?lang=eng&id=p${v}#p${v}`
          : `https://www.churchofjesuschrist.org/study/scriptures/nt/${slug}/${ch}?lang=eng`;
      }
    }

    for (const [bookName, slug] of Object.entries(otBooks)) {
      if (cleanLower === bookName || cleanLower.startsWith(bookName + " ")) {
        const remainder = cleanLower.slice(bookName.length).trim();
        const chMatch = remainder.match(/^(\d+)(?::(\d+))?/);
        const ch = chMatch ? chMatch[1] : "1";
        const v = chMatch && chMatch[2] ? chMatch[2] : null;
        return v
          ? `https://www.churchofjesuschrist.org/study/scriptures/ot/${slug}/${ch}?lang=eng&id=p${v}#p${v}`
          : `https://www.churchofjesuschrist.org/study/scriptures/ot/${slug}/${ch}?lang=eng`;
      }
    }

    const match = cleaned.match(/^([\d]?\s*[A-Za-z]+)\s*(\d+)?(?::(\d+))?/);
    if (!match) return "https://www.churchofjesuschrist.org/study/scriptures/nt?lang=eng";

    const rawBook = match[1].trim().toLowerCase();
    const chapter = match[2] || "1";
    const verse = match[3] || "1";
    if (otBooks[rawBook]) {
      return `https://www.churchofjesuschrist.org/study/scriptures/ot/${otBooks[rawBook]}/${chapter}?lang=eng#${verse}`;
    }
    const bookSlug = ntBooks[rawBook] || rawBook;
    return `https://www.churchofjesuschrist.org/study/scriptures/nt/${bookSlug}/${chapter}?lang=eng#${verse}`;
  }

  asScriptureList(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw.map((s) => {
        if (!s) return null;
        if (typeof s === "string") {
          return { ref: s, text: "", churchLink: this.getChurchScriptureLink(s) };
        }
        return {
          ref: s.ref || "",
          text: s.text || "",
          churchLink: s.churchLink || this.getChurchScriptureLink(s.ref)
        };
      }).filter((s) => s && s.ref);
    }
    if (typeof raw === "string") {
      return [{ ref: raw, text: "", churchLink: this.getChurchScriptureLink(raw) }];
    }
    return [];
  }

  gatherRelatedScriptures(data) {
    const existing = this.asScriptureList(data && data.scriptures);
    const names = [
      data && data.name,
      data && data.city,
      data && data.ancientName,
      data && data.locationName,
      data && data.title
    ].filter(Boolean).map((n) => String(n).toLowerCase());
    const tokens = names.flatMap((n) => n.split(/[(),/]/).map((p) => p.trim()).filter((p) => p.length > 3));
    const seen = new Set(existing.map((s) => s.ref));
    const addFrom = (list) => {
      if (!list) return;
      list.forEach((item) => {
        const hay = `${item.locationName || ""} ${item.title || ""} ${item.name || ""} ${item.description || ""}`.toLowerCase();
        if (!tokens.some((t) => hay.includes(t))) return;
        this.asScriptureList(item.scriptures).forEach((s) => {
          if (s.ref && !seen.has(s.ref)) {
            seen.add(s.ref);
            existing.push(s);
          }
        });
      });
    };
    if (typeof SAVIOR_EVENTS !== "undefined") addFrom(SAVIOR_EVENTS);
    if (typeof TIMELINE_EVENTS !== "undefined") addFrom(TIMELINE_EVENTS);
    if (typeof JERUSALEM_SITES !== "undefined") addFrom(JERUSALEM_SITES);
    return existing;
  }

  getRelatedRegion(data) {
    if (typeof REGIONS_DATA === "undefined" || !REGIONS_DATA.regions) return null;
    const needle = String((data && (data.region || data.name || data.city)) || "").toLowerCase();
    if (!needle) return null;
    return REGIONS_DATA.regions.find((r) =>
      needle.includes(r.id) ||
      r.name.toLowerCase().includes(needle.split(/[,(]/)[0].trim()) ||
      needle.includes(r.name.toLowerCase().split(" ")[0])
    ) || null;
  }

  polygonCenter(coordinates) {
    if (!coordinates || !coordinates.length) return null;
    const lats = coordinates.map((c) => c[0]);
    const lngs = coordinates.map((c) => c[1]);
    return [
      (Math.min(...lats) + Math.max(...lats)) / 2,
      (Math.min(...lngs) + Math.max(...lngs)) / 2
    ];
  }

  renderScriptureCards(scriptures) {
    const list = this.asScriptureList(scriptures);
    if (!list.length) {
      return `<div class="history-block"><p>Referenced across the New Testament Gospels, Acts, and Epistles. Use search to open related events and read full KJV chapters on ChurchofJesusChrist.org.</p></div>`;
    }
    return `
      <div class="kjv-translation-notice" style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="kjv-badge">Multi-Translation Active</span>
          <span style="font-size:0.76rem; color:var(--text-secondary); margin-left:6px;">Default: KJV. Tap <strong>⋮</strong> on any card for Easy-to-Read NIV (7th/8th Grade), JST & Greek.</span>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.9rem; margin-top:0.75rem;">
        ${list.map((s, idx) => {
          const trans = (typeof SCRIPTURE_TRANSLATIONS !== "undefined")
            ? SCRIPTURE_TRANSLATIONS.get(s.ref, s.text)
            : { kjv: s.text, niv: s.text, jst: s.text, greek: "" };

          const kjvText = (trans && trans.kjv) ? trans.kjv : (s.text || "");
          const nivText = (trans && trans.niv) ? trans.niv : kjvText;
          const jstText = (trans && trans.jst) ? trans.jst : kjvText;
          const greekText = (trans && trans.greek) ? trans.greek : "";

          const enc = (val) => encodeURIComponent(val || "");

          return `
            <div class="scripture-verse-card"
                 id="verseCard_${idx}"
                 data-ref="${s.ref}"
                 data-kjv="${enc(kjvText)}"
                 data-niv="${enc(nivText)}"
                 data-jst="${enc(jstText)}"
                 data-greek="${enc(greekText)}">
              <div class="scripture-card-top">
                <span class="scripture-citation">📖 ${s.ref}</span>
                <div class="scripture-card-top-right">
                  <span class="scripture-kjv-tag version-badge">KJV</span>
                  <button class="scripture-card-menu-btn" title="Choose Bible Translation (KJV, NIV, JST, Greek)" aria-label="Version options">⋮</button>
                  <div class="scripture-version-dropdown">
                    <button class="scripture-version-item selected" data-version="kjv">
                      <span>King James (KJV)</span>
                      <span style="font-size:0.68rem; color:var(--color-crimson); font-weight:700;">DEFAULT</span>
                    </button>
                    <button class="scripture-version-item" data-version="niv">
                      <span>Easy-to-Read (NIV • 7th/8th Grade)</span>
                      <span style="font-size:0.65rem; color:#0284C7; font-weight:700;">EASY ENGLISH</span>
                    </button>
                    <button class="scripture-version-item" data-version="jst">
                      <span>Joseph Smith Translation (JST)</span>
                      <span style="font-size:0.65rem; color:#854D0E; font-weight:700;">CHURCH EDITION</span>
                    </button>
                    <button class="scripture-version-item" data-version="greek">
                      <span>Original Greek (Ἑλληνική • Koine)</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="scripture-body">"${kjvText}"</div>
              <div class="scripture-action-row">
                <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                  <span>Read Chapter on ChurchofJesusChrist.org</span>
                  <span class="btn-arrow">↗</span>
                </a>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  switchScriptureVersion(cardEl, version) {
    if (!cardEl) return;
    const bodyEl = cardEl.querySelector(".scripture-body");
    const badgeEl = cardEl.querySelector(".version-badge") || cardEl.querySelector(".scripture-kjv-tag");
    const dropdown = cardEl.querySelector(".scripture-version-dropdown");
    if (!bodyEl) return;

    if (dropdown && typeof dropdown.querySelectorAll === "function") {
      dropdown.querySelectorAll(".scripture-version-item").forEach(item => {
        if (item.dataset.version === version) item.classList.add("selected");
        else item.classList.remove("selected");
      });
    }

    const ref = cardEl.dataset.ref || "";
    const dec = (attr) => decodeURIComponent(cardEl.getAttribute(attr) || "");
    const kjvText = dec("data-kjv") || bodyEl.textContent.replace(/^"|"$/g, "");

    // Dynamically retrieve translation to ensure newest translation engine is used
    const trans = (typeof SCRIPTURE_TRANSLATIONS !== "undefined")
      ? SCRIPTURE_TRANSLATIONS.get(ref, kjvText)
      : null;

    let text = "";
    bodyEl.classList.remove("jst-text", "greek-text", "hebrew-text");

    if (version === "kjv") {
      text = kjvText;
      if (badgeEl) badgeEl.textContent = "KJV";
    } else if (version === "niv") {
      // Primary: read from dynamic engine, secondary: attribute
      if (trans && trans.niv && trans.niv !== kjvText) {
        text = trans.niv;
      } else {
        const attrNiv = dec("data-niv");
        if (attrNiv && attrNiv !== kjvText) {
          text = attrNiv;
        } else if (typeof SCRIPTURE_TRANSLATIONS !== "undefined" && SCRIPTURE_TRANSLATIONS.modernizeToPlainEnglish) {
          text = SCRIPTURE_TRANSLATIONS.modernizeToPlainEnglish(kjvText);
        } else {
          text = kjvText;
        }
      }
      if (badgeEl) badgeEl.textContent = "NIV (Easy-to-Read)";
    } else if (version === "jst") {
      text = (trans && trans.jst) ? trans.jst : dec("data-jst");
      if (!text) text = kjvText;
      bodyEl.classList.add("jst-text");
      if (badgeEl) badgeEl.textContent = "JST (Joseph Smith Translation)";
    } else if (version === "greek") {
      text = (trans && trans.greek) ? trans.greek : dec("data-greek");
      if (!text) text = `[Textus Receptus Koine Greek: ${ref}]`;
      bodyEl.classList.add("greek-text");
      if (badgeEl) badgeEl.textContent = "ORIGINAL GREEK (Ἑλληνική)";
    }

    bodyEl.textContent = text.startsWith("[") ? text : `"${text}"`;
  }

  conservativeTeachingsFallback(data = {}) {
    return {
      teacher: "See scriptures for who taught here.",
      audience: "See the cited verses.",
      whatWasTaught: "The New Testament does not record a teaching discourse at this place in enough detail to name a teacher, audience, or synagogue setting.",
      whyTaught: "When the text is silent, this atlas does not invent a sermon, synagogue, or ministry.",
      context: data.region
        ? `The 1st-century New Testament world (${data.region}).`
        : "The 1st-century New Testament world.",
      howAccepted: "Reception is recorded only where the Gospels or Acts describe it.",
      passages: data.scriptures || data.passages || []
    };
  }

  lookupRelatedCity(data) {
    if (!data) return null;
    const keys = [
      data.id,
      data.city,
      data.name,
      data.title,
      data.locationName,
      data.ancientName
    ].filter(Boolean);
    for (const key of keys) {
      const city = this.findCityByName(key);
      if (city) return city;
    }
    return null;
  }

  teachingsYear(data) {
    if (!data) return null;
    if (typeof data.year === "number" && !Number.isNaN(data.year)) return data.year;
    if (data.extra && typeof data.extra.year === "number") return data.extra.year;
    return null;
  }

  teachingsSearchBlob(data) {
    return [
      data && data.id,
      data && data.name,
      data && data.title,
      data && data.city,
      data && data.locationName,
      data && data.category
    ].filter(Boolean).join(" ").toLowerCase();
  }

  isAppearanceOrVision(data) {
    const year = this.teachingsYear(data);
    const blob = this.teachingsSearchBlob(data);
    if (/emmaus/.test(blob)) return year == null || year <= 30;
    if (/(^|[^a-z])ascension([^a-z]|$)|mount of olives summit/.test(blob)) return year == null || year <= 33;
    if (/damascus|saul-conversion|event-saul/.test(blob)) return true;
    if (/patmos|apocalypse|revelation/.test(blob)) return true;
    if (/savior-resurrection|garden tomb|empty tomb|holy sepulchre/.test(blob)) return year == null || year <= 30;
    if (/sea of tiberias|john 21/.test(blob) && (year == null || year <= 30)) return true;
    return false;
  }

  shouldSkipPlaceHardcode(type, data) {
    const year = this.teachingsYear(data);
    const category = String((data && data.category) || "").toLowerCase();
    if (type === "event" && /^(apostolic|persecution|war|historical)$/.test(category)) return true;
    if (this.isAppearanceOrVision(data)) return false;
    if (year != null && year > 33) return true;
    if (type === "event" && year != null && year < 26) return true;
    return false;
  }

  yearGateInherited(teachings, data) {
    if (!teachings) return this.conservativeTeachingsFallback(data);
    if (this.isAppearanceOrVision(data)) return teachings;
    const year = this.teachingsYear(data);
    const namesJesus = /Jesus(\s+Christ)?/i.test(teachings.teacher || "");
    if (year != null && year > 33 && namesJesus) {
      return {
        ...this.conservativeTeachingsFallback(data),
        passages: teachings.passages || data.scriptures || [],
        context: `${teachings.context || ""} This card's year is after the crucifixion (~30–33 AD); the atlas does not keep a mortal-Jesus teacher on a later event.`.trim()
      };
    }
    if (year != null && year < 26 && namesJesus) {
      return this.conservativeTeachingsFallback(data);
    }
    return teachings;
  }

  eventSpecificTeachings(data) {
    if (!data) return null;
    const id = String(data.id || "");
    const blob = this.teachingsSearchBlob(data);

    if (id === "savior-annunciation" || /annunciation/.test(blob)) {
      return {
        teacher: "The angel Gabriel (Luke 1:26–38)",
        audience: "Mary of Nazareth (Luke 1:27)",
        whatWasTaught: "Thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS. He shall be great, and shall be called the Son of the Highest (Luke 1:31–32).",
        whyTaught: "Gabriel was sent from God unto a city of Galilee, named Nazareth (Luke 1:26).",
        context: "Nazareth, before the birth. This is an announcement, not Jesus teaching.",
        howAccepted: "Mary said, Behold the handmaid of the Lord; be it unto me according to thy word (Luke 1:38).",
        passages: data.scriptures || ["Luke 1:26-38"]
      };
    }
    if (id === "savior-feeding-5000" || /feeding the 5,000|feeding the 5000/.test(blob)) {
      return {
        teacher: "Jesus Christ (Luke 9:10–17; Mark 6:30–44; Matthew 14:13–21)—mortal ministry",
        audience: "About five thousand men (Luke 9:14)",
        whatWasTaught: "He received them, and spake unto them of the kingdom of God, and healed them that had need of healing; then they did eat, and were all filled (Luke 9:11, 17).",
        whyTaught: "He was moved with compassion toward them (Mark 6:34).",
        context: "A desert place belonging to the city called Bethsaida (Luke 9:10). John's lad-and-loaves account and the sea of Tiberias / Capernaum sequel are John 6, not this Bethsaida citation.",
        howAccepted: "They did eat, and were all filled; twelve baskets of fragments remained (Luke 9:17).",
        passages: data.scriptures || ["Luke 9:10-17", "Mark 6:30-44", "Matthew 14:13-21"]
      };
    }
    if (id === "savior-transfiguration" || /transfiguration/.test(blob)) {
      return {
        teacher: "Jesus Christ on a high mountain (Matthew 17:1–8)—mortal ministry",
        audience: "Peter, James, and John (Matthew 17:1)",
        whatWasTaught: "This is my beloved Son, in whom I am well pleased; hear ye him (Matthew 17:5).",
        whyTaught: "He bringeth them up into an high mountain apart (Matthew 17:1).",
        context: "A high mountain apart (Matthew 17:1). Mount Hermon is a traditional identification only; the Gospels do not name the peak.",
        howAccepted: "The disciples fell on their face, and were sore afraid (Matthew 17:6). Tell the vision to no man, until the Son of man be risen again from the dead (Matthew 17:9).",
        passages: data.scriptures || ["Matthew 17:1-9"]
      };
    }
    if (id === "savior-return-nazareth" || /^settlement in nazareth/.test(blob)) {
      return {
        teacher: "No teaching discourse is recorded (Matthew 2:19–23)",
        audience: "Joseph, Mary, and the young child (Matthew 2:20–21)",
        whatWasTaught: "An angel of the Lord told Joseph in Egypt that they were dead which sought the young child's life; he came and dwelt in a city called Nazareth (Matthew 2:19–23).",
        whyTaught: "To record the Holy Family's dwelling, not a synagogue sermon.",
        context: "Nazareth of Galilee after Herod's death (Matthew 2:19–23).",
        howAccepted: "He came and dwelt in a city called Nazareth: that it might be fulfilled which was spoken by the prophets, He shall be called a Nazarene (Matthew 2:23).",
        passages: data.scriptures || ["Matthew 2:19-23", "Luke 2:39-40"]
      };
    }
    if (id === "savior-temple-12") {
      return {
        teacher: "Jesus, age twelve, in the temple (Luke 2:46–49)—not later apostolic preaching",
        audience: "The doctors, both hearing them, and asking them questions (Luke 2:46)",
        whatWasTaught: "Wist ye not that I must be about my Father's business? (Luke 2:49).",
        whyTaught: "They found him in the temple after three days (Luke 2:46).",
        context: "Passover pilgrimage, about 8 AD (Luke 2:41–49).",
        howAccepted: "All that heard him were astonished at his understanding and answers (Luke 2:47).",
        passages: data.scriptures || ["Luke 2:46-49"]
      };
    }
    if (id === "event-philip-samaria-gaza" || /philip in samaria|ethiopian eunuch/.test(blob)) {
      return {
        teacher: "Philip (Acts 8:5–8, 26–35); Peter and John later in Samaria (Acts 8:14–17)",
        audience: "The people of the city of Samaria (Acts 8:5–8); the Ethiopian eunuch on the Gaza road (Acts 8:27–35)",
        whatWasTaught: "Philip preached Christ unto them (Acts 8:5). Beginning at Isaiah, he preached unto him Jesus (Acts 8:35).",
        whyTaught: "They that were scattered went every where preaching the word (Acts 8:4). The angel of the Lord sent Philip toward Gaza (Acts 8:26).",
        context: "Samaria, then the way that goeth down from Jerusalem unto Gaza (Acts 8:5, 26). Jesus at Jacob's well is the earlier Sychar scene (John 4), not this 34 AD mission.",
        howAccepted: "The people with one accord gave heed... and there was great joy in that city (Acts 8:6–8). The eunuch went on his way rejoicing (Acts 8:39). Peter and John prayed that they might receive the Holy Ghost (Acts 8:14–17).",
        passages: data.scriptures || ["Acts 8:5-8", "Acts 8:14-17", "Acts 8:26-39"]
      };
    }
    if (id === "event-council-jerusalem" || /apostolic council/.test(blob)) {
      return {
        teacher: "The apostles and elders; James (Acts 15:6, 13–19); Peter and Paul (Acts 15:7–12)",
        audience: "The church, the apostles, and elders, with the multitude (Acts 15:4, 12, 22)",
        whatWasTaught: "Peter: God put no difference between us and them, purifying their hearts by faith (Acts 15:8–9). James: my sentence is, that we trouble not them, which from among the Gentiles are turned to God (Acts 15:19).",
        whyTaught: "Certain men taught, Except ye be circumcised after the manner of Moses, ye cannot be saved (Acts 15:1).",
        context: "Jerusalem, the council of Acts 15 (~49 AD). Not a mortal-Jesus teaching scene.",
        howAccepted: "It pleased the apostles and elders, with the whole church, to send chosen men and a letter (Acts 15:22–29).",
        passages: data.scriptures || ["Acts 15:1-29"]
      };
    }
    if (id === "event-neronian-persecution" || /great fire of rome|neronian/.test(blob)) {
      return {
        teacher: "Not a teaching scene. 2 Timothy 4:6–7 is Paul's farewell, not a sermon at the Circus Maximus.",
        audience: "No discourse audience is named for the fire itself.",
        whatWasTaught: "The New Testament does not narrate Nero's fire. Paul wrote, 'I have fought a good fight, I have finished my course, I have kept the faith' (2 Timothy 4:7).",
        whyTaught: "To keep this 64 AD persecution from inheriting Paul's earlier hired-house teaching (Acts 28:30–31).",
        context: "Rome, after the fire (later history). Acts 28 is an earlier house-arrest scene.",
        howAccepted: "Scripture does not describe how Rome received the fire or the persecution. 2 Timothy 4 looks toward Paul's departure.",
        passages: data.scriptures || ["2 Timothy 4:6-8"]
      };
    }
    if (id === "event-destruction-jerusalem" || id === "event-jewish-revolt" || /burning of the second temple|fall of jerusalem|first jewish-roman war/.test(blob)) {
      return {
        teacher: "Not a teaching scene in 66–70 AD. The destruction was foretold earlier (Matthew 24:1–2; Luke 21:20–24).",
        audience: "The disciples, privately, upon the mount of Olives, during Passion Week (Matthew 24:3)",
        whatWasTaught: "There shall not be left here one stone upon another (Matthew 24:2). When ye shall see Jerusalem compassed with armies, then know that the desolation thereof is nigh (Luke 21:20).",
        whyTaught: "To warn the disciples before the Passion—not to narrate a later visit.",
        context: "The prophecy is ~30 AD. The siege is 66–70 AD (Josephus; not a New Testament narrative).",
        howAccepted: "The New Testament does not narrate Titus's siege. Luke 21:20 is the Lord's prior word.",
        passages: data.scriptures || ["Matthew 24:1-2", "Luke 21:20-24"]
      };
    }
    if (id === "event-stephen-martyrdom" || (blob.includes("stephen") && !blob.includes("gate beautiful"))) {
      return {
        teacher: "Stephen (Acts 6:8–7:60)—not a later earthly ministry of the Lord",
        audience: "The council, and they that stoned him; Saul was consenting (Acts 7:54–58; 8:1)",
        whatWasTaught: "Stephen's defense of Abraham, Moses, and the prophets (Acts 7:2–53). He looked up and said he saw the Son of man standing on the right hand of God (Acts 7:55–56)—a vision, not a sermon by the Lord at the stoning.",
        whyTaught: "To keep this ~34 AD scene as Stephen's testimony.",
        context: "They cast him out of the city and stoned him (Acts 7:58).",
        howAccepted: "They were cut to the heart (Acts 7:54). Devout men carried Stephen to his burial (Acts 8:2).",
        passages: data.scriptures || ["Acts 6:8-15", "Acts 7:54-60", "Acts 8:1-2"]
      };
    }
    if (id === "event-pentecost" || /day of pentecost/.test(blob)) {
      return {
        teacher: "The Apostle Peter (Acts 2:14). The Lord had already been taken up (Acts 1:9).",
        audience: "Jews, devout men, out of every nation under heaven (Acts 2:5)",
        whatWasTaught: "Jesus of Nazareth, a man approved of God; crucified and raised; God hath made that same Jesus, whom ye have crucified, both Lord and Christ (Acts 2:22–36).",
        whyTaught: "They were all filled with the Holy Ghost (Acts 2:4); Peter lifted up his voice.",
        context: "Jerusalem, when the day of Pentecost was fully come (Acts 2:1).",
        howAccepted: "They that gladly received his word were baptized: about three thousand souls (Acts 2:41).",
        passages: data.scriptures || ["Acts 2:1-41"]
      };
    }
    if (id === "savior-nicodemus") {
      return {
        teacher: "Jesus Christ (John 3:1–21)—mortal ministry",
        audience: "Nicodemus, a ruler of the Jews (John 3:1)",
        whatWasTaught: "Except a man be born again, he cannot see the kingdom of God (John 3:3). For God so loved the world, that he gave his only begotten Son (John 3:16).",
        whyTaught: "Nicodemus came to Jesus by night (John 3:2).",
        context: "Jerusalem, early ministry—not the later apostolic council.",
        howAccepted: "Nicodemus later spoke in the council (John 7:50–51) and brought spices at the burial (John 19:39).",
        passages: data.scriptures || ["John 3:1-21"]
      };
    }
    if (id === "savior-triumphal-entry") {
      return {
        teacher: "Jesus Christ (Matthew 21:1–11; Luke 19:37–44)—Palm Sunday, not later ministry",
        audience: "The multitude of the disciples (Luke 19:37)",
        whatWasTaught: "If these should hold their peace, the stones would immediately cry out (Luke 19:40). He beheld the city, and wept over it (Luke 19:41).",
        whyTaught: "All this was done, that it might be fulfilled which was spoken by the prophet (Matthew 21:4).",
        context: "Descent of the mount of Olives into Jerusalem (Luke 19:37).",
        howAccepted: "The multitude cried, Hosanna (Matthew 21:9). Some of the Pharisees said, Master, rebuke thy disciples (Luke 19:39).",
        passages: data.scriptures || ["Matthew 21:1-11", "Luke 19:37-44"]
      };
    }
    if (id === "savior-cleansing-temple") {
      return {
        teacher: "Jesus Christ (Matthew 21:12–13; John 2:13–17)—mortal ministry",
        audience: "Them that sold and bought in the temple (Matthew 21:12)",
        whatWasTaught: "My house shall be called the house of prayer; but ye have made it a den of thieves (Matthew 21:13).",
        whyTaught: "He found in the temple those that sold oxen and sheep and doves (John 2:14).",
        context: "The temple in Jerusalem, ~27–30 AD—not apostolic preaching in Acts 3.",
        howAccepted: "The scribes and chief priests heard it, and sought how they might destroy him (Mark 11:18).",
        passages: data.scriptures || ["Matthew 21:12-13", "John 2:13-17"]
      };
    }
    if (id === "savior-last-supper") {
      return {
        teacher: "Jesus Christ (Luke 22:14–20; John 13–17)—eve of the crucifixion",
        audience: "The apostles (Luke 22:14)",
        whatWasTaught: "This is my body which is given for you... this cup is the new testament in my blood (Luke 22:19–20). A new commandment I give unto you, That ye love one another (John 13:34).",
        whyTaught: "With desire I have desired to eat this passover with you before I suffer (Luke 22:15).",
        context: "A large upper room furnished (Luke 22:12). Not Pentecost (Acts 2).",
        howAccepted: "They asked, Lord, is it I? (Matthew 26:22). Judas went immediately out (John 13:30).",
        passages: data.scriptures || ["Luke 22:14-20", "John 13:34-35"]
      };
    }
    if (id === "savior-gethsemane") {
      return {
        teacher: "Jesus Christ (Matthew 26:36–46; Luke 22:39–46)—Passion Week",
        audience: "Peter, James, and John (Matthew 26:37)",
        whatWasTaught: "Watch and pray, that ye enter not into temptation (Matthew 26:41). Nevertheless not as I will, but as thou wilt (Matthew 26:39).",
        whyTaught: "My soul is exceeding sorrowful, even unto death (Matthew 26:38).",
        context: "A place called Gethsemane (Matthew 26:36).",
        howAccepted: "He findeth them asleep (Matthew 26:40). All the disciples forsook him, and fled (Matthew 26:56).",
        passages: data.scriptures || ["Matthew 26:36-46", "Luke 22:39-46"]
      };
    }
    if (id === "savior-crucifixion") {
      return {
        teacher: "Jesus Christ from the cross (Luke 23:34, 46; John 19:30)—Friday of Passion Week",
        audience: "They that passed by; the soldiers; Mary and John (John 19:25–27)",
        whatWasTaught: "Father, forgive them; for they know not what they do (Luke 23:34). It is finished (John 19:30).",
        whyTaught: "The Son of man must be delivered... and be crucified (Luke 24:7).",
        context: "A place called Golgotha (Matthew 27:33).",
        howAccepted: "The centurion said, Truly this was the Son of God (Matthew 27:54).",
        passages: data.scriptures || ["Luke 23:33-46", "John 19:25-30"]
      };
    }
    if (id === "savior-resurrection") {
      return {
        teacher: "The angel and the risen Lord (Matthew 28:5–10; John 20:16–17)",
        audience: "Mary Magdalene and the other Mary (Matthew 28:1)",
        whatWasTaught: "He is not here: for he is risen, as he said (Matthew 28:6). I ascend unto my Father, and your Father (John 20:17).",
        whyTaught: "To shew that he was risen (Luke 24:46; John 20:20).",
        context: "The sepulchre, first day of the week (Matthew 28:1). A recorded appearance.",
        howAccepted: "Mary Magdalene came and told the disciples that she had seen the Lord (John 20:18).",
        passages: data.scriptures || ["Matthew 28:1-10", "John 20:11-18"]
      };
    }
    if (id === "savior-emmaus") {
      return {
        teacher: "The risen Jesus Christ (Luke 24:13–35)",
        audience: "Cleopas and his companion (Luke 24:18)",
        whatWasTaught: "Ought not Christ to have suffered these things, and to enter into his glory? Beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself (Luke 24:26–27).",
        whyTaught: "A recorded resurrection-day appearance (Luke 24:13).",
        context: "The way to Emmaus, about threescore furlongs from Jerusalem (Luke 24:13).",
        howAccepted: "Their eyes were opened, and they knew him (Luke 24:31). They said, Did not our heart burn within us? (Luke 24:32).",
        passages: data.scriptures || ["Luke 24:13-35"]
      };
    }
    if (id === "savior-ascension") {
      return {
        teacher: "The risen Lord (Acts 1:3–11; Luke 24:50–51)—a recorded appearance, then taken up",
        audience: "The apostles whom he had chosen (Acts 1:2)",
        whatWasTaught: "Ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth (Acts 1:8). He lifted up his hands, and blessed them (Luke 24:50).",
        whyTaught: "He shewed himself alive after his passion by many infallible proofs (Acts 1:3).",
        context: "The mount called Olivet (Acts 1:12); as far as to Bethany (Luke 24:50).",
        howAccepted: "They worshipped him, and returned to Jerusalem with great joy (Luke 24:52).",
        passages: data.scriptures || ["Acts 1:3-12", "Luke 24:50-53"]
      };
    }
    if (id === "event-saul-conversion" || /conversion of saul|damascus road/.test(blob)) {
      return {
        teacher: "The risen Lord appeared to Saul on the road (Acts 9:3–6). Ananias then spoke in the city (Acts 9:17). Saul preached in the synagogues (Acts 9:20).",
        audience: "Saul of Tarsus (Acts 9:1–6)",
        whatWasTaught: "I am Jesus whom thou persecutest (Acts 9:5). Ananias: the Lord, even Jesus, hath sent me, that thou mightest receive thy sight (Acts 9:17).",
        whyTaught: "He is a chosen vessel unto me, to bear my name (Acts 9:15).",
        context: "Near Damascus (Acts 9:3). A genuine appearance after the Ascension, not generic later ministry.",
        howAccepted: "Saul was baptized (Acts 9:18) and straightway preached Christ in the synagogues (Acts 9:20).",
        passages: data.scriptures || ["Acts 9:1-20"]
      };
    }
    if (id === "event-john-patmos-revelation" || /john on patmos|apocalypse/.test(blob)) {
      return {
        teacher: "The glorified Christ, in vision to John on Patmos (Revelation 1:9–18). John was told to write to the seven churches (Revelation 1:11)—not a visit of the Lord to those cities.",
        audience: "John, then the seven churches which are in Asia (Revelation 1:4, 11)",
        whatWasTaught: "I am he that liveth, and was dead; and, behold, I am alive for evermore (Revelation 1:18). What thou seest, write in a book, and send it unto the seven churches (Revelation 1:11).",
        whyTaught: "John was in the isle that is called Patmos, for the word of God, and for the testimony of Jesus Christ (Revelation 1:9).",
        context: "Patmos. The Cave of the Apocalypse is later Christian memory, not named in the text.",
        howAccepted: "John fell at his feet as dead, then was told to write (Revelation 1:17–19).",
        passages: data.scriptures || ["Revelation 1:9-20"]
      };
    }
    return null;
  }

  extractTeachingsObject(raw, data) {
    return {
      teacher: raw.teacher || "See scriptures for who taught here.",
      audience: raw.audience || "See the cited verses.",
      whatWasTaught: raw.whatWasTaught || raw.doctrine || raw.summary || "",
      whyTaught: raw.whyTaught || raw.purpose || "Recorded so that readers may know what the New Testament actually says of this place.",
      context: raw.context || raw.setting || raw.overview || "",
      howAccepted: raw.howAccepted || raw.reception || raw.acceptance || "",
      passages: raw.passages || data.scriptures || []
    };
  }

  normalizeTeachings(type, data, _inheritDepth = 0) {
    if (!data) return this.conservativeTeachingsFallback();

    const eventSpecific = this.eventSpecificTeachings(data);
    if (eventSpecific && _inheritDepth === 0) return eventSpecific;

    if (data.teachings && typeof data.teachings === "object" && type !== "event") {
      const extracted = this.extractTeachingsObject(data.teachings, data);
      if (_inheritDepth === 0) return this.yearGateInherited(extracted, data);
      return extracted;
    }

    const name = String((data.name || data.city || data.title || data.locationName || "")).toLowerCase();
    const region = String((data.region || data.locationName || "")).toLowerCase();
    const searchBlob = `${name} ${region} ${data.id || ""}`.toLowerCase();
    const skipPlaceHardcode = this.shouldSkipPlaceHardcode(type, data);

    if (searchBlob.includes("malta") || searchBlob.includes("melita")) {
      const malta = this.findCityByName("Malta");
      if (malta && malta.teachings && _inheritDepth < 2) {
        return this.yearGateInherited(this.normalizeTeachings("city", malta, _inheritDepth + 1), data);
      }
    }

    if (searchBlob.includes("antonia") || /jer-antonia/.test(String(data.id || ""))) {
      return {
        teacher: "The Apostle Paul (Acts 21:31–22:29). Scripture does not record a teaching of the Lord in the Antonia.",
        audience: "The multitude on the stairs, then the chief captain and centurions in the castle (Acts 21:40; 22:24)",
        whatWasTaught: "Paul's Hebrew defense: he is a Jew of Tarsus, taught at the feet of Gamaliel, and the risen Lord said unto him, 'I am Jesus of Nazareth, whom thou persecutest' (Acts 22:3–8).",
        whyTaught: "To answer the uproar after they went about to kill him (Acts 21:31).",
        context: "The castle / stairs of the Roman garrison overlooking the temple (Acts 21:34–40). Traditional identification: the Antonia.",
        howAccepted: "They gave him audience unto 'Depart: for I will send thee far hence unto the Gentiles,' then lifted up their voices (Acts 22:21–22). The chief captain loosed him when he learned Paul was a Roman (Acts 22:25–29).",
        passages: data.scriptures || ["Acts 21:31-40", "Acts 22:1-29"]
      };
    }

    // Jerusalem sites/quarters only — never for category apostolic|persecution|war events.
    if (!skipPlaceHardcode && (type === "jerusalemSite" || type === "jerusalemQuarter")) {
      if (name.includes("gethsemane")) {
        return {
          teacher: "Jesus Christ (Passion Week, ~30 AD; Matthew 26:36–46; Luke 22:39–46)",
          audience: "Peter, James, and John (Matthew 26:37)",
          whatWasTaught: "Watch and pray, that ye enter not into temptation (Matthew 26:41). 'O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt' (Matthew 26:39).",
          whyTaught: "He saith, 'My soul is exceeding sorrowful, even unto death' (Matthew 26:38).",
          context: "A place called Gethsemane (Matthew 26:36); over the brook Cedron (John 18:1).",
          howAccepted: "He findeth them asleep (Matthew 26:40). Judas came with a multitude; they laid hands on Jesus (Matthew 26:47–50). All the disciples forsook him and fled (Matthew 26:56).",
          passages: data.scriptures || ["Matthew 26:36-46", "Luke 22:39-46", "Mark 14:32-42"]
        };
      }
      if (name.includes("caiaphas")) {
        return {
          teacher: "Jesus Christ, answering the high priest (Matthew 26:63–64)—Passion Week, ~30 AD, not later ministry",
          audience: "Caiaphas, the scribes and the elders (Matthew 26:57)",
          whatWasTaught: "The high priest said, 'tell us whether thou be the Christ, the Son of God.' Jesus saith, 'Thou hast said: nevertheless I say unto you, Hereafter shall ye see the Son of man sitting on the right hand of power' (Matthew 26:63–64).",
          whyTaught: "They sought false witness against him (Matthew 26:59).",
          context: "The palace of the high priest (Matthew 26:58). Peter sat without in the palace and denied him (Matthew 26:69–75).",
          howAccepted: "The high priest rent his clothes, saying, He hath spoken blasphemy (Matthew 26:65). They condemned him to be guilty of death (Matthew 26:66).",
          passages: data.scriptures || ["Matthew 26:57-75", "Luke 22:54-62"]
        };
      }
      if (name.includes("praetorium") || name.includes("pilate")) {
        return {
          teacher: "Jesus Christ before Pontius Pilate (John 18:33–19:11)—Friday of Passion Week, ~30 AD",
          audience: "Pilate, and they who cried, Crucify him (John 19:6)",
          whatWasTaught: "'My kingdom is not of this world' (John 18:36). 'To this end was I born... that I should bear witness unto the truth' (John 18:37).",
          whyTaught: "Pilate asked, Art thou the King of the Jews? (John 18:33).",
          context: "The hall of judgment / praetorium (John 18:28, 33).",
          howAccepted: "Pilate sought to release him; they cried, Crucify him (John 19:6, 12). He delivered him unto them to be crucified (John 19:16).",
          passages: data.scriptures || ["John 18:28-40", "John 19:1-16", "Luke 23:1-25"]
        };
      }
      if (name.includes("solomon") || name.includes("beautiful gate")) {
        return {
          teacher: "Jesus Christ in Solomon's porch at the feast of the dedication (John 10:22–30); thereafter Peter and John (Acts 3:1–11; 5:12)—not Jesus teaching after ~33 AD",
          audience: "The Jews who came round about him (John 10:24); later the people at the Beautiful Gate (Acts 3:9–11)",
          whatWasTaught: "Jesus said, 'I and my Father are one' (John 10:30). Peter said, 'In the name of Jesus Christ of Nazareth rise up and walk' (Acts 3:6).",
          whyTaught: "They said, If thou be the Christ, tell us plainly (John 10:24). The lame man asked alms (Acts 3:3).",
          context: "Solomon's porch (John 10:23; Acts 3:11; 5:12). The Beautiful Gate (Acts 3:2).",
          howAccepted: "They took up stones to stone him (John 10:31). The lame man walked and leaped and praised God (Acts 3:8).",
          passages: data.scriptures || ["John 10:22-39", "Acts 3:1-16", "Acts 5:12"]
        };
      }
      if (name.includes("temple") && !name.includes("antonia")) {
        return {
          teacher: "Jesus Christ in mortal ministry (Matthew 21:12–13; John 2:13–17); thereafter Peter and John (Acts 3:1–16)—not the Lord teaching after ~33 AD",
          audience: "Them that sold and bought in the temple (Matthew 21:12); later the people at the Beautiful Gate (Acts 3:9–11)",
          whatWasTaught: "My house shall be called the house of prayer; but ye have made it a den of thieves (Matthew 21:13; cf. John 2:16). Peter: In the name of Jesus Christ of Nazareth rise up and walk (Acts 3:6).",
          whyTaught: "He taught daily in the temple (Luke 19:47). After Pentecost Peter and John went up into the temple at the hour of prayer (Acts 3:1).",
          context: "Split eras: cleansing and teaching ~27–30 AD (Matthew 21:12–13; John 2:13–17); apostolic witness from Pentecost (Acts 3:1–16).",
          howAccepted: "The chief priests sought to destroy him (Luke 19:47). Many that heard the word believed (Acts 4:4).",
          passages: data.scriptures || ["Matthew 21:12-13", "John 2:13-17", "Acts 3:1-16"]
        };
      }
      if (name.includes("upper room") || name.includes("last supper")) {
        return {
          teacher: "Jesus Christ at the Last Supper (Luke 22:14–20) and the risen Lord to the disciples (John 20:19–29). At Pentecost Peter preached (Acts 2:14)—not a later earthly ministry of Jesus.",
          audience: "The apostles (Luke 22:14); later the disciples assembled (John 20:19); at Pentecost Jews from every nation (Acts 2:5)",
          whatWasTaught: "This is my body... this is my blood of the new testament (Luke 22:19–20). Peace be unto you (John 20:19). Peter: God hath made that same Jesus both Lord and Christ (Acts 2:36).",
          whyTaught: "He desired to eat the passover with them before he suffered (Luke 22:15).",
          context: "A large upper room furnished (Luke 22:12). Identifying that room with the Pentecost gathering is later tradition.",
          howAccepted: "They asked, Lord, is it I? (Matthew 26:22). Thomas answered, My Lord and my God (John 20:28). About three thousand were baptized (Acts 2:41).",
          passages: data.scriptures || ["Luke 22:14-20", "John 20:19-29", "Acts 1:13-14", "Acts 2:1-41"]
        };
      }
      if (name.includes("olives") || name.includes("ascension") || name.includes("bethphage")) {
        return {
          teacher: "Jesus Christ: Olivet Discourse (Matthew 24:3, Passion Week) and the risen Lord at the Ascension (Acts 1:9–12; Luke 24:50–51)",
          audience: "The disciples (Matthew 24:3); the apostles whom he had chosen (Acts 1:2)",
          whatWasTaught: "The signs of his coming (Matthew 24). Ye shall be witnesses unto me (Acts 1:8). He lifted up his hands, and blessed them (Luke 24:50).",
          whyTaught: "They asked, when shall these things be? (Matthew 24:3). He shewed himself alive after his passion by many infallible proofs (Acts 1:3).",
          context: "The mount of Olives (Matthew 24:3; Acts 1:12). Bethphage at the mount (Matthew 21:1).",
          howAccepted: "They worshipped him, and returned to Jerusalem with great joy (Luke 24:52).",
          passages: data.scriptures || ["Matthew 24:1-14", "Matthew 21:1-7", "Acts 1:6-12", "Luke 24:50-53"]
        };
      }
      if (name.includes("golgotha") || name.includes("calvary") || name.includes("tomb") || name.includes("sepulchre")) {
        return {
          teacher: "Jesus Christ from the cross (Luke 23:34, 46); the angel and the risen Lord at the sepulchre (Matthew 28:5–10; John 20:16–17)",
          audience: "They that passed by; Mary Magdalene and the other Mary (Matthew 28:1)",
          whatWasTaught: "'Father, forgive them' (Luke 23:34). 'It is finished' (John 19:30). 'He is not here: for he is risen' (Matthew 28:6).",
          whyTaught: "To finish the work of the cross and to shew that he was risen (Luke 24:46; John 20:20).",
          context: "A place called Golgotha (Matthew 27:33). A new sepulchre (John 19:41).",
          howAccepted: "The centurion said, Truly this was the Son of God (Matthew 27:54). Mary Magdalene came and told the disciples that she had seen the Lord (John 20:18).",
          passages: data.scriptures || ["Luke 23:33-46", "John 19:25-30", "Matthew 28:1-10", "John 20:11-18"]
        };
      }
      if (name.includes("bethesda")) {
        return {
          teacher: "Jesus Christ (John 5:1–9)—mortal ministry, not after the crucifixion",
          audience: "A man which had an infirmity thirty and eight years (John 5:5), and the Jews (John 5:10)",
          whatWasTaught: "'Rise, take up thy bed, and walk' (John 5:8). 'My Father worketh hitherto, and I work' (John 5:17).",
          whyTaught: "Jesus saw him lie, and knew that he had been now a long time in that case (John 5:6).",
          context: "A pool... called... Bethesda, having five porches (John 5:2).",
          howAccepted: "Immediately the man was made whole (John 5:9). The Jews sought to slay him, because he had done these things on the sabbath (John 5:16).",
          passages: data.scriptures || ["John 5:1-18"]
        };
      }
      if (name.includes("siloam")) {
        return {
          teacher: "Jesus Christ (John 9:1–11)—mortal ministry, not after the crucifixion",
          audience: "A man which was blind from his birth (John 9:1)",
          whatWasTaught: "'Go, wash in the pool of Siloam' (John 9:7). 'I am the light of the world' (John 9:5).",
          whyTaught: "That the works of God should be made manifest in him (John 9:3).",
          context: "The pool of Siloam, which is by interpretation, Sent (John 9:7).",
          howAccepted: "He went his way therefore, and washed, and came seeing (John 9:7). The Jews did not believe concerning him (John 9:18).",
          passages: data.scriptures || ["John 9:1-11"]
        };
      }
      if (name.includes("hinnom") || name.includes("kidron") || name.includes("bezetha") || name.includes("wall")) {
        return this.conservativeTeachingsFallback(data);
      }
      const jerusalemCity = this.findCityByName("Jerusalem");
      if (jerusalemCity && jerusalemCity.teachings && _inheritDepth < 2) {
        return this.normalizeTeachings("city", jerusalemCity, _inheritDepth + 1);
      }
      return this.conservativeTeachingsFallback(data);
    }

    // Specific Cities — skipped for post-33 / apostolic|persecution|war events.
    if (!skipPlaceHardcode && name.includes("capernaum")) {
      return {
        teacher: "Jesus Christ",
        audience: "Galilean Disciples, Crowds from the Decapolis, Synagogue Elders, and Roman Centurion",
        whatWasTaught: "The Bread of Life Discourse: 'I am the bread of life: he that cometh to me shall never hunger' (John 6); divine power to forgive sins; kingdom repentance.",
        whyTaught: "To redirect physical cravings for bread to spiritual sustenance, reveal His divine Sonship, and establish the doctrinal core of eternal life.",
        context: "The Capernaum synagogue and shoreline homes along the Sea of Galilee after the feeding of the five thousand.",
        howAccepted: "Enthusiastic crowds initially thronged Him for healings and free bread; but when He taught the spiritual necessity of eating His flesh and drinking His blood, many turned back and walked no more with Him. Despite witnessing unmatched miracles, the city largely failed to repent, eliciting Jesus's solemn lament in Matthew 11:23.",
        passages: data.scriptures || ["John 6:35-51", "Matthew 4:13-17", "Mark 2:1-12"]
      };
    }
    if (!skipPlaceHardcode && name.includes("nazareth")) {
      return {
        teacher: "Jesus Christ",
        audience: "Townsfolk, Childhood Elders, and Synagogue Attendants",
        whatWasTaught: "Messianic Fulfillment of Isaiah: 'The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor... This day is this scripture fulfilled in your ears' (Luke 4:18-21).",
        whyTaught: "To announce the arrival of the Messianic Jubilee and reveal that God's grace extends to the humble rather than the self-righteous.",
        context: "The local village synagogue in the hills of Lower Galilee on the Sabbath day.",
        howAccepted: "Hearers initially marveled at His gracious speech; but when Jesus pointed out that in times of famine and leprosy God favored Gentile widows and lepers over Israel, the congregation was filled with wrath, rose up, and tried to cast Him headlong from the brow of the hill. He did not many mighty works there because of their unbelief.",
        passages: data.scriptures || ["Luke 4:16-30", "Matthew 13:54-58"]
      };
    }
    if (!skipPlaceHardcode && (name.includes("beatitudes") || name.includes("sermon on the mount"))) {
      return {
        teacher: "Jesus Christ",
        audience: "The Disciples and Multitudes gathered on the mountain slopes",
        whatWasTaught: "The Sermon on the Mount (Matthew 5–7): The Beatitudes, the salt and light of the world, fulfillment of the Law, inner purity, loving enemies, and the Golden Rule.",
        whyTaught: "To reveal the divine character required of citizens of the Kingdom of God and provide the moral law of the New Covenant.",
        context: "A hillside amphitheater overlooking the tranquil waters of the Sea of Galilee.",
        howAccepted: "The multitudes were astonished at His doctrine, for He taught them as one having divine authority and not as the scribes; vast crowds followed Him down the mountainside eager to hear more and be healed.",
        passages: data.scriptures || ["Matthew 5:1-12", "Matthew 6:9-13", "Matthew 7:24-27"]
      };
    }
    if (!skipPlaceHardcode && (name.includes("sychar") || name.includes("jacob's well"))) {
      return {
        teacher: "Jesus Christ",
        audience: "The Samaritan Woman and Townspeople of Sychar",
        whatWasTaught: "The Living Water springing up into everlasting life; true worship in spirit and truth rather than geographic rivalry on Mount Gerizim vs. Jerusalem.",
        whyTaught: "To overcome centuries of ethnic hatred and reveal the Messiah to those outside conventional Jewish boundaries.",
        context: "At midday around the ancient well of Jacob near Mount Gerizim in Samaria.",
        howAccepted: "Remarkably receptive: the Samaritan woman hurried back to the city testifying of Him; the Samaritans besought Jesus to stay two days, and many believed on Him, declaring: 'We have heard him ourselves, and know that this is indeed the Christ, the Saviour of the world' (John 4:42).",
        passages: data.scriptures || ["John 4:5-26", "John 4:39-42"]
      };
    }
    if (!skipPlaceHardcode && name.includes("athens")) {
      return {
        teacher: "The Apostle Paul",
        audience: "Jews and devout persons in the synagogue (Acts 17:17), then Epicurean and Stoic philosophers and the Council of the Areopagus",
        whatWasTaught: "The Unknown God: God who created heaven and earth dwelleth not in temples made with hands; 'For in him we live, and move, and have our being'; the bodily Resurrection of Christ.",
        whyTaught: "To turn intellectual pagan idolaters toward the living Creator and call all humanity to repentance before the appointed day of judgment.",
        context: "Paul disputed in the synagogue and in the market (Acts 17:17); the recorded sermon is on Mars' Hill / the Areopagus (Acts 17:19–22).",
        howAccepted: "Mixed and skeptical reception: when Paul spoke of the bodily resurrection of the dead, some mocked, and others delayed saying, 'We will hear thee again of this matter.' Nevertheless, certain persons clave unto him and believed, including Dionysius the Areopagite (a member of the supreme judicial council) and a woman named Damaris.",
        passages: data.scriptures || ["Acts 17:22-34"]
      };
    }
    if (!skipPlaceHardcode && name.includes("corinth")) {
      return {
        teacher: "The Apostle Paul (with Aquila, Priscilla, Silas, and Timothy; later Apollos)",
        audience: "Synagogue Chief Rulers (Crispus), Justus, Gaius, Erastus, and Cosmopolitan Gentile Converts",
        whatWasTaught: "Jesus Christ and Him crucified; the body as a temple of the Holy Ghost; spiritual gifts in unity; the supreme virtue of Charity (agape love); the triumphant physical Resurrection of the Dead (1 Cor 15).",
        whyTaught: "To correct doctrinal factions, moral laxity, legal disputes, and spiritual pride in a wealthy, commercial Roman seaport city.",
        context: "A bustling Isthmian trading hub under the Roman governor Gallio.",
        howAccepted: "A vibrant church was established: synagogue leader Crispus believed on the Lord with all his house and was baptized, along with Gaius, Stephanas, and many Corinthians. Unbelieving opponents united against Paul and dragged him before Proconsul Gallio's judgment seat (Bema); when Gallio dismissed the case, Paul enjoyed legal protection to preach for another full year.",
        passages: data.scriptures || ["1 Corinthians 1:18-25", "1 Corinthians 6:19-20", "1 Corinthians 13:1-13", "1 Corinthians 15:12-22"]
      };
    }
    if (!skipPlaceHardcode && name.includes("ephesus")) {
      return {
        teacher: "The Apostle Paul (Acts 19). The glorified Christ addressed this church by letter through John on Patmos (Revelation 2:1–7)—not a visit of the Lord to Ephesus.",
        audience: "Ephesian Disciples, Students at the Hall of Tyrannus, and Asian Saints",
        whatWasTaught: "Paul: the Holy Ghost and true baptism; grace through faith (Ephesians 2:8); the unity of the body of Christ; the Whole Armour of God (Eph 6). Separately, the glorified Christ said they had left their first love (Revelation 2:1–7).",
        whyTaught: "To anchor believers against idolatrous commercial pressure (the cult of Diana/Artemis) and occult sorcery.",
        context: "The capital of Roman Asia, where Paul reasoned daily for two years in the lecture hall of Tyrannus.",
        howAccepted: "Enormous regional harvest: all who dwelt in Asia heard the word; repentant magicians burned occult books worth 50,000 drachmas; Demetrius the silversmith incited a massive 2-hour riot in the 25,000-seat Great Theater shouting 'Great is Diana of the Ephesians!', but the church stood firm and became the apostolic hub of Asia Minor.",
        passages: data.scriptures || ["Acts 19:1-20", "Acts 19:23-41", "Ephesians 2:8-10", "Ephesians 6:10-18"]
      };
    }
    if (!skipPlaceHardcode && name.includes("rome")) {
      return {
        teacher: "The Apostle Paul (Acts 28); the Apostle Peter by later Christian memory",
        audience: "Jewish elders summoned to Paul's hired house, Gentile saints, Praetorian guards, and members of Caesar's household",
        whatWasTaught: "Justification by faith in Jesus Christ; reconciliation of Jews and Gentiles; 'The just shall live by faith'; no condemnation to them which are in Christ Jesus (Romans 8).",
        whyTaught: "To establish doctrinal foundations for the central church of the Western Mediterranean and prepare for missions to the ends of the empire.",
        context: "The imperial capital, where Paul preached two years in his own hired house (Acts 28:30–31). He called the chief of the Jews to that lodging (Acts 28:17)—not a synagogue sermon. Peter's presence and martyrdom in Rome are early-church testimony, not an Acts narrative.",
        howAccepted: "Roman Christians came out along the Appian Way as far as Appii Forum to welcome Paul; local Jewish leaders listened with divided opinions; for two years Paul preached in his rented house unhindered, converting soldiers and members of Caesar's household. Later under Nero (~64 AD), severe persecution broke out, leading to Peter and Paul's martyrdoms.",
        passages: data.scriptures || ["Romans 1:16-17", "Romans 8:31-39", "Acts 28:23-31", "Philippians 4:22"]
      };
    }
    if (!skipPlaceHardcode && (name.includes("galilee") || region.includes("galilee")) && !name.includes("magdala") && !name.includes("tiberias") && /sea of galilee|gennesaret|beatitudes|sermon on the mount|capernaum|bethsaida|cana|nazareth|mount of beatitudes/.test(name + " " + (data.id || ""))) {
      return {
        teacher: "Jesus Christ",
        audience: "Galilean Fishermen, Tax Collectors, Farmers, and Village Disciples",
        whatWasTaught: "Parables of the Kingdom (the Sower, the Pearl of Great Price, the Mustard Seed); calming the storm; walking upon the water; feeding the multitudes.",
        whyTaught: "To train His Apostles in unwavering faith and demonstrate His sovereign authority over nature, sickness, and spiritual powers.",
        context: "Shorelines, fishing boats, and hillside terraces around the Sea of Galilee.",
        howAccepted: "Fishermen immediately left their nets to follow Him; multitudes brought their sick and glorified God; yet village leaders and Pharisees continually questioned His Sabbath actions and plotted against Him.",
        passages: data.scriptures || ["Matthew 13:1-23", "Mark 4:35-41", "Matthew 14:22-33"]
      };
    }
    if (name.includes("pisidian") || (name.includes("antioch") && (name.includes("pisidia") || searchBlob.includes("pisidian")))) {
      const pisidian = this.findCityByName("Pisidian Antioch");
      if (pisidian && pisidian.teachings && _inheritDepth < 2) {
        return this.normalizeTeachings("city", pisidian, _inheritDepth + 1);
      }
      return {
        teacher: "The Apostle Paul and Barnabas",
        audience: "Jews and God-fearers in the synagogue, then almost the whole city (Acts 13:14–44)",
        whatWasTaught: "Forgiveness of sins and justification by Jesus, which the law of Moses could not give (Acts 13:38–39); turning to the Gentiles as a light of the Gentiles (Acts 13:46–47).",
        whyTaught: "To preach Christ first in the synagogue at Antioch in Pisidia, then openly to the Gentiles when synagogue leaders contradicted and blasphemed.",
        context: "A synagogue in the Roman colony of Antioch in Pisidia—not Syrian Antioch on the Orontes (Acts 13:14).",
        howAccepted: "Many Gentiles believed; opponents stirred up honourable women and chief men and expelled Paul and Barnabas (Acts 13:48–50).",
        passages: data.scriptures || ["Acts 13:14-52", "Acts 14:21-23"]
      };
    }
    if (name.includes("antioch")) {
      return {
        teacher: "Barnabas, Saul (Paul), and the Prophet Agabus",
        audience: "The Mixed Congregation of Hellenistic Jews and Greek Believers",
        whatWasTaught: "The grace of God extended to the Gentiles; discipleship where believers were first called 'Christians' (Acts 11:26); world evangelism.",
        whyTaught: "To build a welcoming multi-ethnic church and launch the world missionary journeys into Asia Minor and Europe.",
        context: "The capital of Roman Syria along the Orontes River—not Pisidian Antioch (Acts 11:26; 13:1–4). They assembled with the church (Acts 11:26). A Jewish community is historical setting; no synagogue discourse is narrated.",
        howAccepted: "A great multitude believed and turned unto the Lord; disciples were first called Christians here; the congregation sent generous famine relief to Judean saints and, under the guidance of the Holy Ghost, commissioned Paul and Barnabas on their missionary journeys.",
        passages: data.scriptures || ["Acts 11:19-26", "Acts 13:1-4"]
      };
    }
    if (!skipPlaceHardcode && name.includes("bethany")) {
      return {
        teacher: "Jesus Christ",
        audience: "Martha, Mary, Lazarus, and Jewish Mourners from Jerusalem",
        whatWasTaught: "'I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die' (John 11:25-26); anointing for His burial.",
        whyTaught: "To give an undeniable foretaste of His power over physical death and prepare His followers for His impending Passion and Resurrection.",
        context: "The quiet village of Bethany on the eastern slope of the Mount of Olives.",
        howAccepted: "Many Jewish mourners who witnessed Lazarus raised believed on Jesus; but the chief priests took counsel to put both Jesus and Lazarus to death because many were leaving them to believe on Christ.",
        passages: data.scriptures || ["John 11:1-44", "John 12:1-8"]
      };
    }
    if (name.includes("bethlehem")) {
      return {
        teacher: "The angel of the Lord and the heavenly host (Luke 2:9–14)",
        audience: "Shepherds keeping watch by night (Luke 2:8–18). The Magi worshiped; they did not preach.",
        whatWasTaught: "Good tidings of great joy: a Saviour is born in the city of David, Christ the Lord (Luke 2:10–11). Micah 5:2 is a prior prophecy, not an on-site teacher.",
        whyTaught: "To announce the birth of Christ the Lord to the shepherds.",
        context: "Fields near Bethlehem and the manger (Luke 2:8–16).",
        howAccepted: "The shepherds made known abroad the saying and glorified God (Luke 2:17–20). The Magi later worshiped and offered gifts (Matthew 2:11). Herod slew the infants of Bethlehem (Matthew 2:16).",
        passages: data.scriptures || ["Luke 2:8-20", "Matthew 2:1-12"]
      };
    }

    if (_inheritDepth < 2) {
      const related = this.lookupRelatedCity(data);
      if (related && related.teachings && related !== data) {
        return this.yearGateInherited(this.normalizeTeachings("city", related, _inheritDepth + 1), data);
      }
    }

    // Conservative fallback: never invent Jesus's personal ministry or a synagogue.
    return this.conservativeTeachingsFallback(data);
  }

  renderTeachingsTab(dossier, type) {
    const t = this.normalizeTeachings(type, dossier);
    const passages = (t.passages && t.passages.length) ? t.passages : (dossier.scriptures || []);

    return `
      <div class="teachings-role-grid">
        <div class="teachings-stat-box" style="border-left: 3px solid var(--color-crimson);">
          <span class="teachings-stat-label">Who Was Teaching</span>
          <span class="teachings-stat-value">${t.teacher}</span>
        </div>
        <div class="teachings-stat-box" style="border-left: 3px solid var(--color-gold);">
          <span class="teachings-stat-label">Who Was Being Taught</span>
          <span class="teachings-stat-value">${t.audience}</span>
        </div>
      </div>

      <div class="teachings-card teachings-card-gold">
        <div class="teachings-card-title">
          <span>📜</span>
          <span>What Was Taught</span>
        </div>
        <div class="teachings-card-body">
          ${t.whatWasTaught}
        </div>
      </div>

      <div class="teachings-card teachings-card-crimson">
        <div class="teachings-card-title">
          <span>🎯</span>
          <span>Why It Was Taught</span>
        </div>
        <div class="teachings-card-body">
          ${t.whyTaught}
        </div>
      </div>

      <div class="teachings-card teachings-card-bronze">
        <div class="teachings-card-title">
          <span>🏛️</span>
          <span>Historical & Cultural Context</span>
        </div>
        <div class="teachings-card-body">
          ${t.context}
        </div>
      </div>

      ${t.howAccepted ? `
        <div class="teachings-card teachings-card-sage">
          <div class="teachings-card-title">
            <span>🤝</span>
            <span>How the Teachings Were Accepted & Community Response</span>
          </div>
          <div class="teachings-card-body">
            ${t.howAccepted}
          </div>
        </div>
      ` : ''}

      ${passages && passages.length > 0 ? `
        <div class="feature-card" style="margin-top: 0.5rem;">
          <h4 style="font-family: var(--font-serif-title); font-size: 0.88rem; margin: 0 0 0.5rem 0; color: var(--color-crimson);">
            Key Scriptural Passages & Discourses
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${this.asScriptureList(passages).map(s => `
              <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                <span>📖 Read ${s.ref} (KJV)</span>
                <span class="btn-arrow">↗</span>
              </a>
            `).join("")}
          </div>
        </div>
      ` : ''}
    `;
  }

  renderVideosTab(data, type) {
    const list = (typeof findChurchVideosForPlace === "function")
      ? findChurchVideosForPlace(data, type)
      : ((typeof CHURCH_BIBLE_VIDEOS !== "undefined" && CHURCH_BIBLE_VIDEOS) ? CHURCH_BIBLE_VIDEOS.slice(0, 4) : []);

    const placeName = (data && (data.name || data.city || data.title)) || "the New Testament World";
    const isWelcome = !data;

    return `
      <div class="video-tab-header">
        <div class="video-tab-title">
          <span>🎬</span>
          <span>${isWelcome ? "Official Bible Videos Collection" : `Bible Videos for ${placeName}`}</span>
        </div>
        <div class="video-tab-subtitle">
          Produced by The Church of Jesus Christ of Latter-day Saints. These videos faithfully portray the mortal ministry, miracles, teachings, and Resurrection of Jesus Christ and the Apostles.
        </div>
        <div style="margin-top:0.75rem;">
          <a href="https://www.churchofjesuschrist.org/tools/help/new-testament-videos?lang=eng" target="_blank" rel="noopener" class="video-directory-btn" style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.45rem 0.85rem; background:#F8FAFC; border:1px solid #CBD5E1; border-radius:6px; color:#1E3A8A; font-size:0.78rem; text-decoration:none; font-weight:600; box-shadow:0 1px 3px rgba(0,0,0,0.05); transition:all 0.15s ease;">
            <span>🎬 Browse Full New Testament Videos Index (ChurchofJesusChrist.org)</span>
            <span class="btn-arrow" style="font-size:0.85rem;">↗</span>
          </a>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.9rem;">
        ${list.map(v => `
          <div class="video-card">
            <a href="${v.churchUrl}" target="_blank" rel="noopener" class="video-preview-banner" style="text-decoration:none; cursor:pointer;" title="Watch this Bible Video on ChurchofJesusChrist.org">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="video-category-pill">${v.category || "BIBLE VIDEO"}</span>
                <span style="font-size:0.72rem; color:#FDE68A; opacity:0.85;">ChurchofJesusChrist.org</span>
              </div>
              <div class="video-play-overlay" title="Watch on ChurchofJesusChrist.org">
                ▶
              </div>
              <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                <span style="font-size:0.74rem; color:rgba(255,255,255,0.8); font-style:italic;">${v.thumbnailText || placeName}</span>
                <span class="video-duration-pill">⏱️ ${v.duration || "Video"}</span>
              </div>
            </a>

            <div class="video-card-body">
              <h4 class="video-title">${v.title}</h4>
              <div class="video-scripture-ref">
                <span>📖</span>
                <span>${v.scriptureRef}</span>
              </div>
              <p class="video-description">${v.description}</p>

              <div class="video-action-row">
                <a href="${v.churchUrl}" target="_blank" rel="noopener" class="video-watch-btn" title="Watch this Bible Video on ChurchofJesusChrist.org">
                  <span>▶ Watch Video on ChurchofJesusChrist.org</span>
                  <span class="btn-arrow">↗</span>
                </a>
                <a href="${this.getChurchScriptureLink(v.scriptureRef)}" target="_blank" rel="noopener" class="church-scripture-btn" style="font-size:0.76rem; padding:0.4rem 0.65rem;">
                  <span>📖 Read Chapter Context (KJV)</span>
                  <span class="btn-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  formatParagraphs(text) {
    if (!text) return "";
    if (text.includes("<p>") || text.includes("<div") || text.includes("<ul>")) return text;
    return text.split(/\n\n+/).map(p => `<p style="font-size:0.88rem; line-height:1.6; color:inherit; margin-top:0.5rem; margin-bottom:0.5rem;">${p.replace(/\n/g, '<br>')}</p>`).join("");
  }

  normalizeDossier(type, data) {
    const matchingCity = this.lookupRelatedCity(data) ||
      ((type === "diaspora" || type === "church")
        ? this.findCityByName(data.city || data.name)
        : null);

    const region = this.getRelatedRegion(data) || (matchingCity && this.getRelatedRegion(matchingCity));
    const name = data.name || data.city || data.title || (matchingCity && matchingCity.name) || "Selected Place";
    const scriptures = this.gatherRelatedScriptures(data);

    if (matchingCity && matchingCity.scriptures) {
      const seenRefs = new Set(scriptures.map(s => s.ref));
      this.asScriptureList(matchingCity.scriptures).forEach(s => {
        if (!seenRefs.has(s.ref)) {
          seenRefs.add(s.ref);
          scriptures.push(s);
        }
      });
    }

    const epistles = (data.epistles && data.epistles.length)
      ? data.epistles
      : (matchingCity && matchingCity.epistles ? matchingCity.epistles : []);

    const teachings = this.normalizeTeachings(type, {
      ...data,
      name,
      region: data.region || (matchingCity && matchingCity.region),
      scriptures
    });

    return {
      name,
      ancientName: data.ancientName || (matchingCity && matchingCity.ancientName) || "",
      summary: data.summary || data.significance || data.description || data.history || (matchingCity && matchingCity.summary) || "",
      overview: data.overview || data.significance || data.description || data.history || data.summary || (matchingCity && matchingCity.overview) || "",
      scriptures,
      teachings,
      peopleAndChurch: data.peopleAndChurch || (matchingCity && matchingCity.peopleAndChurch) || [data.jewishDiasporaInfo, data.christianChurchInfo, data.founders, data.companions].filter(Boolean).join(" "),
      politicalInsights: data.politicalInsights || (matchingCity && matchingCity.politicalInsights) || (region && region.politicalInsights) || "",
      eraChronology: data.eraChronology || (matchingCity && matchingCity.eraChronology) || data.growthMilestone || "",
      region: data.region || (region && region.name) || (matchingCity && matchingCity.region) || "",
      capital: data.capital || (matchingCity && matchingCity.capital) || "",
      governor: data.governor || (matchingCity && matchingCity.governor) || "",
      elevation: data.elevation || data.elev || (matchingCity && matchingCity.elevation) || "",
      population: data.population || data.estimatedPopulation || (matchingCity && matchingCity.population) || "",
      epistles,
      extra: data
    };
  }

  citiesList() {
    if (typeof CITIES_DATA === "undefined") return [];
    return Array.isArray(CITIES_DATA) ? CITIES_DATA : (CITIES_DATA.cities || []);
  }

  fuzzyMatch(hay, needle) {
    if (!hay || !needle) return false;
    const h = String(hay).toLowerCase();
    const n = String(needle).toLowerCase().trim();
    if (h === n || h.includes(n) || n.includes(h)) return true;
    const compact = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
    const hc = compact(hay);
    const nc = compact(needle);
    return !!(hc && nc && (hc === nc || hc.includes(nc) || nc.includes(hc)));
  }

  findCityByName(name) {
    const needle = (name || "").toLowerCase().trim();
    if (!needle) return null;
    const cities = this.citiesList();
    const byId = cities.find((c) => c.id === needle);
    if (byId) return byId;
    const exactName = cities.find((c) => c.name.toLowerCase() === needle);
    if (exactName) return exactName;

    // Never let Pisidian Antioch inherit Syrian Antioch, or the two Caesareas collide.
    if (needle.includes("antioch") || needle.includes("pisid")) {
      if (/pisid/.test(needle)) {
        return cities.find((c) => c.id === "pisidian-antioch") || null;
      }
      return cities.find((c) => c.id === "antioch-syria") || null;
    }
    if (needle.includes("caesarea") || needle.includes("paneas") || needle.includes("banias")) {
      if (needle.includes("philippi") || needle.includes("paneas") || needle.includes("banias")) {
        return cities.find((c) => c.id === "caesarea-philippi") || null;
      }
      if (needle.includes("maritima") || needle.includes("sebastos") || needle.includes("palest")) {
        return cities.find((c) => c.id === "caesarea-maritima") || null;
      }
      return null;
    }

    return cities.find((c) =>
      this.fuzzyMatch(c.name, needle) ||
      this.fuzzyMatch(c.ancientName, needle)
    ) || null;
  }

  findQuarterById(id, name) {
    if (typeof JERUSALEM_GEOGRAPHY === "undefined" || !JERUSALEM_GEOGRAPHY.quarters) return null;
    const needle = (id || name || "").toLowerCase();
    return JERUSALEM_GEOGRAPHY.quarters.find((q) =>
      q.id === id ||
      q.id === `area-${id}` ||
      (id && q.id.replace(/^area-/, "") === id.replace(/^area-/, "").replace(/-valley$/, "").replace(/^hinnom.*/, "valley-of-hinnom")) ||
      this.fuzzyMatch(q.id, needle) ||
      this.fuzzyMatch(q.name, name || id)
    ) || null;
  }

  findSiteById(id, name) {
    if (typeof JERUSALEM_SITES === "undefined") return null;
    const needle = (id || name || "").toLowerCase();
    return JERUSALEM_SITES.find((s) =>
      s.id === id ||
      s.id === `jer-${id}` ||
      (id && s.id.includes(id)) ||
      this.fuzzyMatch(s.name, name || id) ||
      (name && name.toLowerCase().includes((s.name || "").toLowerCase()))
    ) || null;
  }

  findGeoFeature(query) {
    const list = (typeof GEO_FEATURES !== "undefined" && GEO_FEATURES) || window.GEO_FEATURES || [];
    const needle = (query || "").toLowerCase();
    return list.find((g) =>
      g.id === query ||
      this.fuzzyMatch(g.name, query) ||
      this.fuzzyMatch(g.ancientName, query) ||
      (g.category && needle.includes(g.category.toLowerCase()))
    ) || null;
  }

  openPlaceFromQuery(query) {
    if (!query) return false;
    const q = String(query).trim();

    const city = this.findCityByName(q);
    if (city) {
      if (window.app && window.app.map) window.app.map.flyToLocation(city.lat, city.lng, 12);
      this.showCityDetail(city);
      return true;
    }

    if (typeof REGIONS_DATA !== "undefined" && REGIONS_DATA.regions) {
      const region = REGIONS_DATA.regions.find((r) =>
        r.id === q.toLowerCase() || this.fuzzyMatch(r.name, q) || this.fuzzyMatch(r.ancientName, q)
      );
      if (region) {
        this.showRegionDetail(region);
        if (region.bounds && window.app && window.app.map) {
          const b = region.bounds;
          window.app.map.flyToLocation((b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2, 8);
        }
        return true;
      }
    }

    const site = this.findSiteById(null, q);
    if (site) {
      if (window.app && window.app.map) window.app.map.flyToLocation(site.lat, site.lng, 16);
      this.showJerusalemSiteDetail(site);
      return true;
    }

    const quarter = this.findQuarterById(null, q);
    if (quarter) {
      const center = this.polygonCenter(quarter.coordinates);
      if (center && window.app && window.app.map) window.app.map.flyToLocation(center[0], center[1], 15);
      this.showJerusalemQuarterDetail(quarter);
      return true;
    }

    const geo = this.findGeoFeature(q);
    if (geo) {
      if (window.app && window.app.map) window.app.map.flyToLocation(geo.lat, geo.lng, 11);
      this.showGeoFeatureDetail(geo);
      return true;
    }

    if (typeof SAVIOR_EVENTS !== "undefined") {
      const event = SAVIOR_EVENTS.find((e) =>
        this.fuzzyMatch(e.title, q) || this.fuzzyMatch(e.locationName, q)
      );
      if (event) {
        if (window.app && window.app.map) window.app.map.flyToLocation(event.lat, event.lng, 13);
        this.showEventDetail(event);
        return true;
      }
    }

    return false;
  }

  openPlaceFromPin(pin) {
    if (!pin) return false;

    // 1. Geo Features (Sea of Galilee, River Jordan, Dead Sea, Mount Hermon, etc.)
    const geo = this.findGeoFeature(pin.linkGeoId || pin.id || pin.name);
    if (geo) {
      if (window.app && window.app.map) window.app.map.flyToLocation(geo.lat, geo.lng, 12);
      this.showGeoFeatureDetail(geo);
      return true;
    }

    if (pin.linkType === "city" || !pin.linkType) {
      const city = this.findCityByName(pin.linkName || pin.name);
      if (city) {
        if (window.app && window.app.map) window.app.map.flyToLocation(city.lat, city.lng, 13);
        this.showCityDetail(city);
        return true;
      }
    }

    if (pin.linkType === "quarter" || pin.linkQuarterId) {
      const quarter = this.findQuarterById(pin.linkQuarterId, pin.name);
      if (quarter) {
        const center = this.polygonCenter(quarter.coordinates);
        if (center && window.app && window.app.map) window.app.map.flyToLocation(center[0], center[1], 15);
        this.showJerusalemQuarterDetail(quarter);
        return true;
      }
    }

    if (pin.linkType === "site" || pin.linkSiteId) {
      const site = this.findSiteById(pin.linkSiteId || pin.id, pin.name);
      if (site) {
        if (window.app && window.app.map) window.app.map.flyToLocation(site.lat, site.lng, 16);
        this.showJerusalemSiteDetail(site);
        return true;
      }
    }

    if (pin.linkType === "search" && pin.searchQuery) {
      return this.openPlaceFromQuery(pin.searchQuery);
    }

    return this.openPlaceFromQuery(pin.linkName || pin.name);
  }

  showWelcome() {
    this.currentActiveItem = null;
    this.currentTab = "overview";
    this.tabButtons.forEach(t => {
      if (t.dataset.tab === "overview") t.classList.add("active");
      else t.classList.remove("active");
    });
    this.renderWelcomeTabs();
    this.openSidebar();
  }

  showJerusalemSiteDetail(site) {
    if (!site) return;
    this.currentActiveItem = { type: "jerusalemSite", data: site };
    const area = site.area || "SACRED SITE";
    this.sidebarEyebrow.textContent = `1ST-CENTURY JERUSALEM • ${area.toUpperCase()}`;
    this.sidebarTitle.textContent = `${site.icon || "🏛️"} ${site.name}`;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showJerusalemQuarterDetail(quarter) {
    this.currentActiveItem = { type: "jerusalemQuarter", data: quarter };
    this.sidebarEyebrow.textContent = `1ST-CENTURY JERUSALEM TOPOGRAPHY • ${quarter.category.toUpperCase()}`;
    this.sidebarTitle.textContent = `🏔️ ${quarter.name}`;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showCityDetail(city) {
    this.currentActiveItem = { type: "city", data: city };
    this.sidebarEyebrow.textContent = `BIBLICAL CITY • ${city.region.toUpperCase()}`;
    this.sidebarTitle.textContent = city.name;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showEventDetail(event) {
    this.currentActiveItem = { type: "event", data: event };
    this.sidebarEyebrow.textContent = `${event.era.toUpperCase()} • ${event.season}`;
    this.sidebarTitle.textContent = event.title;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showChurchDetail(church) {
    this.currentActiveItem = { type: "church", data: church };
    this.sidebarEyebrow.textContent = `EARLY CHRISTIAN CONGREGATION • ${church.region.toUpperCase()}`;
    this.sidebarTitle.textContent = `Church at ${church.city}`;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showDiasporaDetail(diaspora) {
    this.currentActiveItem = { type: "diaspora", data: diaspora };
    this.sidebarEyebrow.textContent = `JEWISH DIASPORA HUB • ${diaspora.region.toUpperCase()}`;
    this.sidebarTitle.textContent = diaspora.city;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showJourneyDetail(journey) {
    this.currentActiveItem = { type: "journey", data: journey };
    this.sidebarEyebrow.textContent = `APOSTOLIC EXPANSION • ${journey.years}`;
    this.sidebarTitle.textContent = journey.name;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showRegionDetail(region) {
    this.currentActiveItem = { type: "region", data: region };
    this.sidebarEyebrow.textContent = `ROMAN PROVINCE / REGION`;
    this.sidebarTitle.textContent = region.name;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  showGeoFeatureDetail(feature) {
    this.currentActiveItem = { type: "geo", data: feature };
    this.sidebarEyebrow.textContent = `LANDSCAPE & SACRED GEOGRAPHY • ${(feature.region || "HOLY LAND").toUpperCase()}`;
    this.sidebarTitle.textContent = feature.name;
    this.renderActiveItemTabs();
    this.openSidebar();
  }

  // Render Tabs Content for Default "Welcome to the New Testament Atlas" Flyout
  renderWelcomeTabs() {
    let eyebrow = "SELECTION DETAILS";
    if (this.currentTab === "scripture") eyebrow = "FOUNDATIONAL SCRIPTURES • KJV & MULTI-VERSION";
    else if (this.currentTab === "teachings") eyebrow = "NEW TESTAMENT DOCTRINE & CONTEXT";
    else if (this.currentTab === "people") eyebrow = "APOSTOLIC WITNESSES & EARLY CHURCH";
    else if (this.currentTab === "political") eyebrow = "1ST-CENTURY GEOPOLITICS & PAX ROMANA";
    else if (this.currentTab === "chronology") eyebrow = "NEW TESTAMENT TIMELINE (~6 BC – 100 AD)";

    if (this.sidebarEyebrow) this.sidebarEyebrow.textContent = eyebrow;
    if (this.sidebarTitle) this.sidebarTitle.textContent = "Welcome to the New Testament Atlas";

    let html = "";

    if (this.currentTab === "overview") {
      html = `
        <div class="sidebar-section welcome-intro">
          <div class="hero-quote">
            <p class="quote-text">"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."</p>
            <span class="quote-ref">— John 3:16</span>
          </div>

          <div class="feature-card">
            <h3>How to Explore</h3>
            <ul class="feature-steps">
              <li><strong>Scrub the Timeline</strong> at the bottom from <strong>6 BC to 100 AD</strong> to witness history unfold.</li>
              <li><strong>Click Any Pin, City or Region</strong> to reveal ancient geography, demographics, and biblical references.</li>
              <li><strong>Switch Map Modes</strong> via the top bar to compare Ancient Biblical Parchment with High-Res Satellite Terrain.</li>
              <li><strong>Start a Guided Tour</strong> to journey through Jesus's Ministry, Passion Week, or Paul's Travels.</li>
            </ul>
          </div>

          <!-- Growth of Christianity Showcase Card -->
          <div class="feature-card christian-growth-showcase" style="border-left: 4px solid #DC2626; background: linear-gradient(180deg, #FFFDF9 0%, #FEF2F2 100%);">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem;">
              <span style="font-size: 1.25rem;">🔥</span>
              <h3 style="margin: 0; color: #991B1B; font-family: var(--font-serif-title); font-size: 0.98rem;">The Exponential Growth of Christianity (~30–100 AD)</h3>
            </div>
            
            <p style="font-size: 0.82rem; line-height: 1.55; color: var(--text-primary); margin-bottom: 0.75rem;">
              The New Testament records one of the most astonishing transformations in human history: the exponential multiplication of a humble gathering in Roman Judea into a vibrant spiritual movement spanning the entire Mediterranean world within a single generation.
            </p>

            <div style="background: rgba(220,38,38,0.06); border: 1px dashed rgba(220,38,38,0.3); border-radius: 6px; padding: 0.65rem 0.8rem; margin-bottom: 0.75rem;">
              <div style="display:flex; align-items:center; gap:6px; font-weight:700; color:#B91C1C; font-size:0.8rem; margin-bottom:3px;">
                <span>🔴 Interactive Growth Heatmap</span>
              </div>
              <p style="font-size:0.77rem; line-height:1.4; color:#7F1D1D; margin:0;">
                Click <strong>Growth Heatmap</strong> in the top layers bar and scrub the timeline. Radiant diffusion halos emerge at Pentecost (~30 AD) and swell across the Mediterranean as churches multiply from Jerusalem to Rome.
              </p>
            </div>

            <div class="demographic-stats-grid" style="margin-bottom: 0.75rem;">
              <div class="demographic-stat-box" style="border-left: 2px solid #DC2626;">
                <span class="demographic-label">Upper Room (30 AD)</span>
                <span class="demographic-value" style="font-size: 0.95rem; color: #991B1B;">~120 Disciples</span>
                <span style="font-size: 0.65rem; color: var(--text-muted);">Acts 1:15</span>
              </div>
              <div class="demographic-stat-box" style="border-left: 2px solid #D97706;">
                <span class="demographic-label">Pentecost Ingathering</span>
                <span class="demographic-value" style="font-size: 0.95rem; color: #B45309;">+3,000 Souls</span>
                <span style="font-size: 0.65rem; color: var(--text-muted);">Acts 2:41</span>
              </div>
              <div class="demographic-stat-box" style="border-left: 2px solid #059669;">
                <span class="demographic-label">Early Jerusalem Church</span>
                <span class="demographic-value" style="font-size: 0.95rem; color: #047857;">5,000+ Men</span>
                <span style="font-size: 0.65rem; color: var(--text-muted);">Acts 4:4</span>
              </div>
              <div class="demographic-stat-box" style="border-left: 2px solid #2563EB;">
                <span class="demographic-label">Empire-Wide (100 AD)</span>
                <span class="demographic-value" style="font-size: 0.95rem; color: #1D4ED8;">100,000s of Saints</span>
                <span style="font-size: 0.65rem; color: var(--text-muted);">Across 40+ Hubs</span>
              </div>
            </div>

            <h4 style="font-family: var(--font-serif-title); font-size: 0.84rem; color: #991B1B; margin: 0 0 0.4rem 0;">
              Four Waves of Apostolic Expansion
            </h4>
            <ul class="feature-steps" style="font-size: 0.78rem; line-height: 1.45;">
              <li><strong>Wave 1 — Pentecost & Judea (30–34 AD):</strong> Endowed with the Holy Ghost, apostles bore eyewitness testimony of Christ's resurrection.</li>
              <li><strong>Wave 2 — Samaria & Syrian Antioch (34–44 AD):</strong> Scattered by persecution, disciples shared the Word beyond Jewish borders; Gentiles poured in at Antioch.</li>
              <li><strong>Wave 3 — Paul's Missionary Journeys (47–62 AD):</strong> Crossing 10,000+ miles via Roman roads and seas, Paul planted assemblies in Galatia, Macedonia, Greece, and Asia.</li>
              <li><strong>Wave 4 — Apostolic Consolidation (62–100 AD):</strong> Surviving imperial persecutions and Jerusalem's 70 AD fall, the Church matured into resilient regional networks across three continents.</li>
            </ul>
          </div>

          <div class="curated-shortcut-grid">
            <h4>Quick Focus Tours</h4>
            <div class="tour-mini-cards">
              <div class="tour-mini-card" data-tour-id="savior-life">
                <div class="tour-icon">🌟</div>
                <div class="tour-meta">
                  <span class="tour-name">Life & Ministry of Jesus</span>
                  <span class="tour-era">6 BC – 30 AD • 14 Stops</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="passion-week">
                <div class="tour-icon">✝️</div>
                <div class="tour-meta">
                  <span class="tour-name">Passion Week in Jerusalem</span>
                  <span class="tour-era">Spring 30 AD • 9 Stations</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="acts-early-church">
                <div class="tour-icon">🔥</div>
                <div class="tour-meta">
                  <span class="tour-name">Pentecost & Church Birth</span>
                  <span class="tour-era">30 AD – 47 AD • 10 Sites</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="paul-journeys">
                <div class="tour-icon">⛵</div>
                <div class="tour-meta">
                  <span class="tour-name">Paul's Missionary Journeys</span>
                  <span class="tour-era">47 AD – 62 AD • 4 Voyages</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="revelation-churches">
                <div class="tour-icon">📜</div>
                <div class="tour-meta">
                  <span class="tour-name">Seven Churches of Revelation</span>
                  <span class="tour-era">95 AD • Patmos & Asia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.currentTab === "scripture") {
      const foundationalVerses = [
        {
          ref: "John 1:1, 14",
          text: "In the beginning was the Word, and the Word was with God, and the Word was God... And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/1?lang=eng&id=p1,p14#p1"
        },
        {
          ref: "Luke 2:10-11",
          text: "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/2?lang=eng&id=p10-p11#p10"
        },
        {
          ref: "Matthew 28:19-20",
          text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/28?lang=eng&id=p19-p20#p19"
        },
        {
          ref: "Acts 1:8",
          text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/1?lang=eng&id=p8#p8"
        },
        {
          ref: "2 Timothy 3:16-17",
          text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, thoroughly furnished unto all good works.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/2-tim/3?lang=eng&id=p16-p17#p16"
        }
      ];

      html = `
        <div class="history-block" style="margin-bottom:0.75rem;">
          <h4>The Word of God in the Apostolic Era</h4>
          <p>The New Testament scriptures testify of the mortal ministry, atonement, and resurrection of Jesus Christ, and the inspired witness of His Apostles across the ancient Mediterranean world.</p>
        </div>
        ${this.renderScriptureCards(foundationalVerses)}
      `;
    } else if (this.currentTab === "teachings") {
      html = `
        <div class="teachings-role-grid">
          <div class="teachings-stat-box" style="border-left: 3px solid var(--color-crimson);">
            <span class="teachings-stat-label">Primary Teachers</span>
            <span class="teachings-stat-value">Jesus Christ, the Apostles & Evangelists</span>
          </div>
          <div class="teachings-stat-box" style="border-left: 3px solid var(--color-gold);">
            <span class="teachings-stat-label">Primary Audience</span>
            <span class="teachings-stat-value">Israel, Disciples & All Nations</span>
          </div>
        </div>

        <div class="teachings-card teachings-card-gold">
          <div class="teachings-card-title">
            <span>📜</span>
            <span>What Was Taught</span>
          </div>
          <div class="teachings-card-body">
            The Gospel of Jesus Christ: Faith in Him as the Son of God, repentance, baptism for the remission of sins, the gift of the Holy Ghost, the higher law of love (Sermon on the Mount), His infinite Atonement and bodily Resurrection, and the coming of the Kingdom of Heaven.
          </div>
        </div>

        <div class="teachings-card teachings-card-crimson">
          <div class="teachings-card-title">
            <span>🎯</span>
            <span>Why It Was Taught</span>
          </div>
          <div class="teachings-card-body">
            To fulfill all the Law and the Prophets, redeem humanity from spiritual and physical death, gather the scattered house of Israel, break down the middle wall of partition between Jews and Gentiles, and offer eternal life to whosoever believeth on Him.
          </div>
        </div>

        <div class="teachings-card teachings-card-bronze">
          <div class="teachings-card-title">
            <span>🏛️</span>
            <span>Historical & Cultural Context</span>
          </div>
          <div class="teachings-card-body">
            Proclaimed in 1st-century Roman Judea, Galilee, Samaria, and across the Greco-Roman Mediterranean during the Pax Romana. Teachings took place in synagogues, on hillsides, in temple courtyards, beside public wells, in lecture halls, and before Roman governors and Greek philosophical councils.
          </div>
        </div>

        <div class="feature-card" style="margin-top:0.5rem;">
          <h4 style="font-family: var(--font-serif-title); font-size: 0.88rem; margin: 0 0 0.5rem 0; color: var(--color-crimson);">
            Key Doctrinal Discourses of the New Testament
          </h4>
          <div style="display:flex; flex-direction:column; gap:0.4rem;">
            <a href="https://www.churchofjesuschrist.org/study/scriptures/nt/matt/5?lang=eng" target="_blank" rel="noopener" class="church-scripture-btn">
              <span>📖 The Sermon on the Mount (Matthew 5–7)</span>
              <span class="btn-arrow">↗</span>
            </a>
            <a href="https://www.churchofjesuschrist.org/study/scriptures/nt/john/6?lang=eng" target="_blank" rel="noopener" class="church-scripture-btn">
              <span>📖 The Bread of Life Discourse (John 6)</span>
              <span class="btn-arrow">↗</span>
            </a>
            <a href="https://www.churchofjesuschrist.org/study/scriptures/nt/john/14?lang=eng" target="_blank" rel="noopener" class="church-scripture-btn">
              <span>📖 The Upper Room Discourse (John 14–17)</span>
              <span class="btn-arrow">↗</span>
            </a>
            <a href="https://www.churchofjesuschrist.org/study/scriptures/nt/acts/2?lang=eng" target="_blank" rel="noopener" class="church-scripture-btn">
              <span>📖 Peter's Pentecost Sermon (Acts 2)</span>
              <span class="btn-arrow">↗</span>
            </a>
            <a href="https://www.churchofjesuschrist.org/study/scriptures/nt/acts/17?lang=eng" target="_blank" rel="noopener" class="church-scripture-btn">
              <span>📖 Paul at the Areopagus (Acts 17)</span>
              <span class="btn-arrow">↗</span>
            </a>
          </div>
        </div>

        <div class="teachings-card teachings-card-gold" style="margin-top:0.75rem; border-left: 3px solid #DC2626;">
          <div class="teachings-card-title">
            <span>🌱</span>
            <span>The Prophesied Growth of the Kingdom</span>
          </div>
          <div class="teachings-card-body">
            Jesus taught through vivid parables that His Church, though beginning as the smallest of seeds, possessed divine vital power that would fill the earth:
            <ul style="padding-left:1.2rem; margin:0.4rem 0; font-size:0.83rem; line-height:1.5;">
              <li><strong>The Mustard Seed (Matt 13:31–32):</strong> <em>"The kingdom of heaven is like to a grain of mustard seed... which indeed is the least of all seeds: but when it is grown, it is the greatest among herbs, and becometh a tree."</em></li>
              <li><strong>The Three Measures of Meal (Matt 13:33):</strong> <em>"The kingdom of heaven is like unto leaven, which a woman took, and hid in three measures of meal, till the whole was leavened."</em></li>
              <li><strong>The Great Commission (Matt 28:19–20; Acts 1:8):</strong> <em>"Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost... and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth."</em></li>
            </ul>
          </div>
        </div>
      `;
    } else if (this.currentTab === "videos") {
      html = this.renderVideosTab(null, "welcome");
    } else if (this.currentTab === "people") {
      html = `
        <div class="feature-card" style="margin-bottom:1rem;">
          <div class="insight-header">
            <span class="insight-icon">👥</span>
            <h3 style="margin:0;">The Apostolic Eyewitnesses</h3>
          </div>
          <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
            Jesus called and ordained Twelve Apostles—Simon Peter, Andrew, James and John (the sons of Zebedee), Philip, Bartholomew (Nathanael), Thomas, Matthew the tax collector, James the son of Alphaeus, Simon the Zealot, Judas the brother of James (Thaddaeus), and Matthias (Acts 1:26). Together with Paul of Tarsus (the Apostle to the Gentiles), they bore special witness of Christ's resurrection.
          </p>
        </div>

        <div class="history-block" style="margin-bottom:1rem;">
          <h4>Faithful Women Disciples & Leaders</h4>
          <p>
            Women disciples ministered to Jesus of their substance and were the first witnesses of His glorious resurrection: Mary the mother of Jesus, Mary Magdalene, Joanna, Susanna, Martha and Mary of Bethany, and Salome. In the early church, women like Tabitha (Dorcas), Lydia of Philippi, and Priscilla played prominent roles hosting and nurturing congregations.
          </p>
        </div>

        <div class="feature-card" style="margin-bottom:1rem;">
          <div class="insight-header">
            <span class="insight-icon">🕍</span>
            <h3 style="margin:0;">The Jewish Diaspora & Synagogue Network</h3>
          </div>
          <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
            An estimated 4 to 5 million Jewish people lived outside Judea across Syria, Egypt (Alexandria had over 100,000 Jewish residents), Asia Minor, Greece, and Rome. Their synagogues provided the initial theological foundation and scriptural language for the Apostles' preaching of the Messiah.
          </p>
        </div>

        <div class="history-block" style="margin-bottom:1rem; border-left: 3px solid #DC2626;">
          <h4>The Multiplication & Dynamics of Early Christian Communities</h4>
          <p>
            From ~120 disciples praying in Jerusalem's upper room (Acts 1:15), the Church exploded by 3,000 souls on the day of Pentecost (Acts 2:41) and soon reached over 5,000 men (Acts 4:4). Following Stephen's martyrdom, dispersed disciples carried the Gospel to Samaria, Phoenicia, Cyprus, and Antioch, where believers were first named Christians (Acts 11:26).
          </p>
          <p style="margin-top:0.45rem;">
            Early Christianity multiplied primarily through a dynamic network of <strong>house churches</strong> (e.g., Philemon in Colossae, Lydia in Philippi, Priscilla and Aquila in Rome and Corinth). Gathering in domestic spaces, believers broke bread, shared all things common, and welcomed people across every social divide—slaves and masters, Greek philosophers and Roman centurions, wealthy patronesses and humble laborers—united as one in Christ Jesus (Galatians 3:28).
          </p>
          <p style="margin-top:0.45rem;">
            Historians note that early Christian growth averaged an estimated <strong>40% per decade</strong>, fueled by unflinching apostolic witness of the Resurrection, profound moral integrity, and unprecedented communal charity—such as rescuing exposed infants, nursing the plague-stricken, and providing burial for the impoverished.
          </p>
        </div>

        <div class="demographic-stats-grid">
          <div class="demographic-stat-box">
            <span class="demographic-label">Apostles & Witnesses</span>
            <span class="demographic-value" style="font-size:0.95rem;">12 + Paul & Saints</span>
          </div>
          <div class="demographic-stat-box">
            <span class="demographic-label">First Pentecost Ingathering</span>
            <span class="demographic-value" style="font-size:0.95rem; color:#B45309;">3,000+ Souls (Acts 2)</span>
          </div>
          <div class="demographic-stat-box">
            <span class="demographic-label">Estimated 100 AD Faithful</span>
            <span class="demographic-value" style="font-size:0.95rem; color:#DC2626;">100,000–500,000</span>
          </div>
          <div class="demographic-stat-box">
            <span class="demographic-label">Decadal Growth Rate</span>
            <span class="demographic-value" style="font-size:0.95rem; color:#047857;">~40% per Decade</span>
          </div>
        </div>
      `;
    } else if (this.currentTab === "political") {
      html = `
        <div class="political-insight-card" style="margin-bottom:1rem;">
          <div class="insight-header">
            <span class="insight-icon">🏛️</span>
            <h3 style="margin:0; color:#78350F;">The Pax Romana & Imperial Infrastructure</h3>
          </div>
          <p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">
            The New Testament unfolded entirely within the Roman Empire. The <em>Pax Romana</em> (Roman Peace) instituted by Caesar Augustus cleared maritime piracy and constructed 50,000 miles of paved military highways (such as the Via Egnatia and Via Appia), providing safe passage that enabled the rapid spread of the Gospel.
          </p>
        </div>

        <div class="history-block" style="margin-bottom:1rem;">
          <h4>Roman Emperors of the Biblical Era</h4>
          <ul style="padding-left:1.2rem; margin:0.4rem 0; font-size:0.85rem; line-height:1.5;">
            <li><strong>Caesar Augustus (27 BC – 14 AD):</strong> Decreed the empire-wide census that brought Mary and Joseph to Bethlehem (Luke 2:1).</li>
            <li><strong>Tiberius Caesar (14 – 37 AD):</strong> Reigned during the public ministry, crucifixion, and resurrection of Jesus Christ (Luke 3:1).</li>
            <li><strong>Claudius (41 – 54 AD):</strong> Expelled Jews from Rome (Acts 18:2), leading Aquila and Priscilla to Corinth.</li>
            <li><strong>Nero (54 – 68 AD):</strong> Emperor to whom Paul appealed (Acts 25:11); initiated severe persecutions after the Great Fire of Rome.</li>
            <li><strong>Vespasian & Titus (69 – 81 AD):</strong> Legions under Titus besieged and destroyed Jerusalem and the Second Temple in 70 AD.</li>
            <li><strong>Domitian (81 – 96 AD):</strong> Exiled the Apostle John to the Isle of Patmos, where he received the Book of Revelation.</li>
          </ul>
        </div>

        <div class="feature-card" style="margin-bottom:1rem;">
          <div class="insight-header">
            <span class="insight-icon">👑</span>
            <h3 style="margin:0;">The Herodian Dynasty & Roman Governors</h3>
          </div>
          <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
            Rome ruled Judea through client kings like Herod the Great and his sons (Archelaus, Herod Antipas, and Philip), supplemented after 6 AD by Roman equestrian governors (such as Pontius Pilate, Felix, and Festus). Herod Agrippa I executed James, and Agrippa II heard Paul's defense at Caesarea (Acts 26).
          </p>
        </div>

        <div class="history-block">
          <h4>The Jerusalem Sanhedrin & Jewish Councils</h4>
          <p>
            The Supreme Council in Jerusalem comprised 71 members: the Sadducean High Priestly aristocracy (Annas, Caiaphas), elders, and Pharisaic scribes (Gamaliel, Nicodemus). Rome granted the council extensive internal religious jurisdiction, while reserving the ultimate power of capital punishment.
          </p>
        </div>
      `;
    } else if (this.currentTab === "chronology") {
      const eras = (window.app && window.app.timeline && window.app.timeline.eras) || [
        { start: -6, end: -4, tag: "ERA I • 6 BC – 4 BC", title: "Nativity & Infancy of Jesus", desc: "Roman census under Caesar Augustus; birth in Bethlehem, angelic witness, and flight to Egypt." },
        { start: -4, end: 26, tag: "ERA II • 4 BC – 26 AD", title: "Silent Years in Nazareth", desc: "Jesus grows in wisdom and stature in Galilee; visits the Temple at age twelve." },
        { start: 26, end: 29, tag: "ERA III • 26 AD – 29 AD", title: "Baptism & Early Ministry", desc: "Baptism by John in the Jordan River, temptation in wilderness, miracle at Cana, and Nicodemus." },
        { start: 29, end: 30, tag: "ERA IV • 29 AD – 30 AD", title: "Galilean Ministry & Passion Week", desc: "Sermon on the Mount, miracles at Sea of Galilee, Transfiguration, Atonement in Gethsemane, Crucifixion & Resurrection." },
        { start: 30, end: 47, tag: "ERA V • 30 AD – 47 AD", title: "Pentecost & the Early Church", desc: "Outpouring of the Holy Ghost, 3,000 baptized, martyrdom of Stephen, and Saul's conversion on Damascus road." },
        { start: 47, end: 57, tag: "ERA VI • 47 AD – 57 AD", title: "Paul's Missionary Journeys", desc: "Three epic apostolic journeys through Cyprus, Galatia, Macedonia, Greece, and Ephesus planting churches." },
        { start: 58, end: 70, tag: "ERA VII • 58 AD – 70 AD", title: "Rome, Persecution & Fall of Jerusalem", desc: "Paul's voyage and shipwreck at Malta, Roman house arrest, Nero's persecutions, and Titus destroying Jerusalem in 70 AD." },
        { start: 70, end: 100, tag: "ERA VIII • 70 AD – 100 AD", title: "Close of the Apostolic Era", desc: "Spread of the Four Gospels, John's apocalyptic exile on the Isle of Patmos, and letters to the Seven Churches." }
      ];

      html = `
        <div class="history-block" style="margin-bottom:1rem;">
          <h4>The Eight Major Eras of the New Testament</h4>
          <p>Journey through history from the Nativity in Bethlehem (~6 BC) to the revelation given to John on the Isle of Patmos (~100 AD). Click any era below to scrub the timeline and map.</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${eras.map(era => `
            <div class="era-welcome-card" style="background:#FFFDF9; border:1px solid var(--border-parchment); border-left:3px solid var(--color-gold); border-radius:6px; padding:0.8rem 0.9rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                <span style="font-size:0.75rem; font-weight:700; color:var(--color-crimson); text-transform:uppercase; letter-spacing:0.5px;">${era.tag || `${era.start < 0 ? Math.abs(era.start) + ' BC' : era.start + ' AD'} – ${era.end < 0 ? Math.abs(era.end) + ' BC' : era.end + ' AD'}`}</span>
                <button class="btn btn-sm btn-outline era-jump-btn" data-year="${era.start}" style="font-size:0.75rem; padding:2px 8px; border-color:var(--color-gold); color:var(--color-crimson); cursor:pointer;">Scrub to Era ▶</button>
              </div>
              <h4 style="font-family:var(--font-serif-title); font-size:0.92rem; color:var(--text-primary); margin:0 0 0.3rem 0;">${era.title}</h4>
              <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.45; margin:0;">${era.desc}</p>
            </div>
          `).join("")}
        </div>
      `;
    }

    this.sidebarContent.innerHTML = html;
  }

  // Render Tabs Content based on Active Item and Selected Tab
  renderActiveItemTabs() {
    if (!this.currentActiveItem) {
      this.renderWelcomeTabs();
      return;
    }
    const { type, data } = this.currentActiveItem;
    let html = "";

    // -------------------------------------------------------------------------
    // TEACHINGS & CONTEXT TAB (ALL ENTITY TYPES)
    // -------------------------------------------------------------------------
    if (this.currentTab === "teachings") {
      const dossier = this.normalizeDossier(type, data);
      this.sidebarContent.innerHTML = this.renderTeachingsTab(dossier, type);
      return;
    }

    // -------------------------------------------------------------------------
    // BIBLE VIDEOS TAB (ALL ENTITY TYPES: CITIES, SITES, WATERS, REGIONS)
    // -------------------------------------------------------------------------
    if (this.currentTab === "videos") {
      this.sidebarContent.innerHTML = this.renderVideosTab(data, type);
      return;
    }

    // -------------------------------------------------------------------------
    // 1ST-CENTURY JERUSALEM SACRED SITES & LANDMARKS
    // -------------------------------------------------------------------------
    if (type === "jerusalemSite") {
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-jerusalem-area">${data.area}</span>
            <span class="city-badge badge-category-${data.category}">${data.category.toUpperCase()}</span>
            <span class="city-badge badge-province">1st-Century Judea</span>
          </div>

          <div class="hero-quote" style="margin-bottom:1rem;">
            <div class="quote-text" style="font-size:0.96rem; font-style:normal; font-family:var(--font-serif);">
              ${data.summary}
            </div>
            <span class="quote-ref">${data.ancientName}</span>
          </div>

          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Historical & Scriptural Overview</h4>
            <p>${data.overview}</p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Ancient Hebrew / Greek Name</span>
              <span class="demographic-value" style="font-size:0.92rem;">${data.ancientName}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Precinct / Quarter</span>
              <span class="demographic-value" style="font-size:0.92rem;">${data.area}</span>
            </div>
          </div>

          <div class="feature-card">
            <h3>Scriptures Recorded at this Site</h3>
            <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:0.6rem;">
              This sacred location features prominently in ${data.scriptures.length} major New Testament passages.
            </p>
            <div style="display:flex; flex-direction:column; gap:0.4rem;">
              ${data.scriptures.map(s => `
                <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                  <span>📖 Read ${s.ref} (KJV)</span>
                  <span class="btn-arrow">↗</span>
                </a>
              `).join("")}
            </div>
          </div>
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(data.scriptures);
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">👥</span>
              <h3 style="margin:0;">Biblical Witnesses & Key Figures</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
              ${data.peopleAndChurch}
            </p>
          </div>

          <div class="history-block">
            <h4>Role in the Savior's Ministry & Early Church</h4>
            <p>
              From the preaching of Christ to the gatherings of the early Apostles, this site was an eyewitness to pivotal covenants, ordinances, miracles, and the birth of the Christian community.
            </p>
          </div>
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">🏛️</span>
              <h3 style="margin:0; color:#78350F;">Roman Administration & Imperial Politics</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">
              ${data.politicalInsights}
            </p>
          </div>

          <div class="history-block">
            <h4>1st-Century Geopolitical Background</h4>
            <p>
              Jerusalem during the 1st century was governed under the Roman province of Judea. The Roman Prefect (headquartered at Caesarea Maritima) arrived in Jerusalem with military cohorts during major pilgrim festivals to preserve the <em>Pax Romana</em>, while the Sadducean High Priests and Sanhedrin managed internal Jewish civil and religious jurisdiction.
            </p>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Sacred Milestones & Era Chronicle</h4>
            <p style="font-size:0.9rem; line-height:1.55;">
              ${data.eraChronology}
            </p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Timeline Span</span>
              <span class="demographic-value" style="font-size:0.95rem;">~6 BC – 70 AD</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Destruction Era</span>
              <span class="demographic-value" style="font-size:0.95rem; color:#DC2626;">70 AD (Siege of Titus)</span>
            </div>
          </div>
        `;
      }

    // -------------------------------------------------------------------------
    // 1ST-CENTURY JERUSALEM TOPOGRAPHICAL QUARTERS & SECTORS
    // -------------------------------------------------------------------------
    } else if (type === "jerusalemQuarter") {
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-jerusalem-area">${data.category.toUpperCase()}</span>
            <span class="city-badge badge-elevation">Elevation: ${data.elevation}</span>
            <span class="city-badge badge-province">1st-Century Jerusalem</span>
          </div>

          <div class="hero-quote" style="margin-bottom:1rem;">
            <div class="quote-text" style="font-size:0.95rem; font-style:normal; font-family:var(--font-serif);">
              ${data.summary}
            </div>
            <span class="quote-ref">${data.ancientName}</span>
          </div>

          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Historical & Archaeological Overview</h4>
            <p>${data.overview}</p>
          </div>

          <div class="feature-card" style="margin-bottom:1rem; border-left:4px solid #D97706;">
            <h3 style="display:flex; align-items:center; gap:6px;">
              <span>🏔️</span> Topographical & Geological Formation
            </h3>
            <p style="font-size:0.86rem; line-height:1.55; color:var(--text-secondary); margin-top:0.45rem;">
              ${data.topography}
            </p>
            <div class="demographic-stats-grid" style="margin-top:0.75rem; margin-bottom:0;">
              <div class="demographic-stat-box">
                <span class="demographic-label">Peak Elevation</span>
                <span class="demographic-value" style="font-size:0.95rem;">${data.elevation}</span>
              </div>
              <div class="demographic-stat-box">
                <span class="demographic-label">Sector Category</span>
                <span class="demographic-value" style="font-size:0.85rem; text-transform:capitalize;">${data.category.replace("-", " ")}</span>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <h3>Scriptures Linked to this Sector (${data.scriptures.length})</h3>
            <div style="display:flex; flex-direction:column; gap:0.4rem; margin-top:0.5rem;">
              ${data.scriptures.map(s => `
                <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                  <span>📖 Read ${s.ref} (KJV)</span>
                  <span class="btn-arrow">↗</span>
                </a>
              `).join("")}
            </div>
          </div>
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(data.scriptures);
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">👥</span>
              <h3 style="margin:0;">Inhabitants, Eyewitnesses & Assembly</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
              ${data.peopleAndChurch}
            </p>
          </div>

          <div class="history-block">
            <h4>Social & Community Demographics</h4>
            <p>
              Different quarters of 1st-century Jerusalem reflected sharp socioeconomic divisions—from the palatial Romanized mansions of the Sadducean high priests in the Upper City, to the crowded artisan alleys in the Lower City, and the sacred pilgrim halls of the Temple Mount.
            </p>
          </div>
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">🏛️</span>
              <h3 style="margin:0; color:#78350F;">Roman Administration & Military Strategic Footprint</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">
              ${data.politicalInsights}
            </p>
          </div>

          <div class="history-block">
            <h4>Tactical Military Geography</h4>
            <p>
              Jerusalem's natural ravines (Kidron, Hinnom) made southern and eastern assaults impossible. Every conqueror from the Babylonians to the Roman Legions attacked from the gentler northern plateau (Bezetha), progressively breaching the Third, Second, and First Walls.
            </p>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Sacred Milestones & Era Chronicle</h4>
            <p style="font-size:0.9rem; line-height:1.55;">
              ${data.eraChronology}
            </p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Sector Name</span>
              <span class="demographic-value" style="font-size:0.88rem;">${data.name}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Fall of Jerusalem</span>
              <span class="demographic-value" style="font-size:0.88rem; color:#DC2626;">70 AD (Destroyed by Titus)</span>
            </div>
          </div>
        `;
      }

    // -------------------------------------------------------------------------
    // BIBLICAL CITIES
    // -------------------------------------------------------------------------
    } else if (type === "city") {
      const dossier = this.normalizeDossier("city", data);
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-province">${data.region || "New Testament World"}</span>
            ${data.hasSynagogue ? '<span class="city-badge badge-synagogue">Synagogue</span>' : ''}
            ${data.hasChurch ? '<span class="city-badge badge-church">Christian Church</span>' : ''}
          </div>

          <div class="hero-quote" style="margin-bottom:1rem;">
            <div class="quote-text" style="font-size:0.95rem; font-style:normal; font-family:var(--font-serif); color:#451A03;">
              ${dossier.summary}
            </div>
            <span class="quote-ref">${data.ancientName || data.name}</span>
          </div>

          <div class="history-block">
            <h4>Historical & Scriptural Overview</h4>
            <p>${dossier.overview}</p>
          </div>

          <div class="demographic-stats-grid" style="margin-top:1rem;">
            <div class="demographic-stat-box">
              <span class="demographic-label">Ancient Name</span>
              <span class="demographic-value" style="font-size:0.95rem;">${data.ancientName || data.name}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Est. Population</span>
              <span class="demographic-value" style="font-size:0.95rem;">${data.population || "Town of the NT era"}</span>
            </div>
          </div>

          ${dossier.scriptures.length ? `
            <div class="feature-card" style="margin-top:1rem;">
              <h3>Key Scriptures (${dossier.scriptures.length})</h3>
              <div style="display:flex; flex-direction:column; gap:0.4rem; margin-top:0.4rem;">
                ${dossier.scriptures.map(s => `
                  <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                    <span>📖 ${s.ref} • Read on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          ` : ''}

          ${data.epistles && data.epistles.length > 0 ? `
            <div style="margin-top:0.75rem;">
              <h4 style="font-family:var(--font-serif-title); font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.4rem;">Connected New Testament Epistles</h4>
              <div class="epistle-tag-list">
                ${data.epistles.map(e => `
                  <a href="${this.getChurchScriptureLink(e)}" target="_blank" rel="noopener" class="epistle-tag" title="Study ${e} on ChurchofJesusChrist.org">
                    📜 ${e} ↗
                  </a>
                `).join("")}
              </div>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(dossier.scriptures);
        if (data.epistles && data.epistles.length > 0) {
          html += `
            <div class="feature-card" style="margin-top:1rem;">
              <h3>Epistles Connected with ${data.name}</h3>
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
                ${data.epistles.map(e => `
                  <a href="${this.getChurchScriptureLink(e)}" target="_blank" rel="noopener" class="church-scripture-btn">
                    <span>📖 Study ${e} on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          `;
        }
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">👥</span>
              <h3 style="margin:0;">Inhabitants, Disciples & Early Church</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
              ${dossier.peopleAndChurch || data.christianChurchInfo || "Disciples, synagogue communities, and households recorded in the New Testament."}
            </p>
          </div>
          ${data.jewishDiasporaInfo ? `
            <div class="history-block">
              <h4>Jewish Community</h4>
              <p>${data.jewishDiasporaInfo}</p>
            </div>
          ` : ''}
          ${data.christianChurchInfo ? `
            <div class="history-block">
              <h4>Christian Congregation</h4>
              <p>${data.christianChurchInfo}</p>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">🏛️</span>
              <h3 style="margin:0; color:#78350F;">Roman Administration & Civic Setting</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">
              ${dossier.politicalInsights || `Located within <strong>${data.region || "the Roman world"}</strong>, ${data.name} lived under imperial roads, harbors, and governors while local councils and synagogues ordered daily life.`}
            </p>
          </div>
          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Region / Province</span>
              <span class="demographic-value" style="font-size:0.88rem;">${data.region || "Roman world"}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">NT Era Standing</span>
              <span class="demographic-value" style="font-size:0.88rem;">${data.hasChurch ? "Church planted" : "Gospel setting"}</span>
            </div>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Sacred Era Chronology & Milestones</h4>
            <p style="font-size:0.9rem; line-height:1.55;">
              ${dossier.eraChronology || `${data.name} is inhabited across the New Testament era (~6 BC – 100 AD), from the days of Herod and Augustus through the apostolic missions.`}
            </p>
          </div>
          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Biblical Era Span</span>
              <span class="demographic-value" style="font-size:0.92rem;">~6 BC – 100 AD</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Region</span>
              <span class="demographic-value" style="font-size:0.88rem;">${data.region || "Mediterranean"}</span>
            </div>
          </div>
        `;
      }

    // -------------------------------------------------------------------------
    // LANDSCAPE FEATURES (Sea of Galilee, Jordan, Hermon, etc.)
    // -------------------------------------------------------------------------
    } else if (type === "geo") {
      const dossier = this.normalizeDossier("geo", data);
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-province">${data.category || "Sacred Geography"}</span>
            ${data.elevation ? `<span class="city-badge badge-elevation">${data.elevation}</span>` : ""}
            <span class="city-badge badge-jerusalem-area">${data.region || "Holy Land"}</span>
          </div>
          <div class="hero-quote" style="margin-bottom:1rem;">
            <div class="quote-text" style="font-size:0.95rem; font-style:normal; font-family:var(--font-serif);">${dossier.summary}</div>
            <span class="quote-ref">${data.ancientName || data.name}</span>
          </div>
          <div class="history-block"><h4>Geographical & Scriptural Overview</h4><p>${dossier.overview}</p></div>
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(dossier.scriptures);
      } else if (this.currentTab === "people") {
        html = `<div class="feature-card"><h3>People & Witnesses</h3><p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">${dossier.peopleAndChurch}</p></div>`;
      } else if (this.currentTab === "political") {
        html = `<div class="political-insight-card"><div class="insight-header"><span class="insight-icon">🏛️</span><h3 style="margin:0; color:#78350F;">Setting in the Roman World</h3></div><p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">${dossier.politicalInsights}</p></div>`;
      } else if (this.currentTab === "chronology") {
        html = `<div class="history-block"><h4>Era Chronicle</h4><p>${dossier.eraChronology}</p></div>`;
      }

    // -------------------------------------------------------------------------
    // SAVIOR'S FOOTSTEPS & EVENTS
    // -------------------------------------------------------------------------
    } else if (type === "event") {
      const dossier = this.normalizeDossier("event", data);
      const region = this.getRelatedRegion({ region: data.locationName, name: data.locationName });
      if (this.currentTab === "overview") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Event Overview</h4>
            <p>${data.description}</p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Location</span>
              <span class="demographic-value" style="font-size:0.92rem;">${data.locationName}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Season / Date</span>
              <span class="demographic-value" style="font-size:0.92rem;">${data.season}</span>
            </div>
          </div>

          <div class="feature-card">
            <h3>Scripture Record (KJV)</h3>
            <div style="display:flex; flex-direction:column; gap:0.4rem; margin-top:0.4rem;">
              ${this.asScriptureList(data.scriptures).map(s => `
                <a href="${this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                  <span>📖 Read ${s.ref} on ChurchofJesusChrist.org</span>
                  <span class="btn-arrow">↗</span>
                </a>
              `).join("")}
            </div>
          </div>
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(data.scriptures);
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card">
            <h3>Biblical Witnesses</h3>
            <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.55;">
              ${dossier.peopleAndChurch || `Recorded at <strong>${data.locationName}</strong> during <strong>${data.era}</strong>. Names and witnesses are those the New Testament actually records at this place—not a general template.`}
            </p>
          </div>
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card">
            <div class="insight-header">
              <span class="insight-icon">🏛️</span>
              <h3 style="margin:0; color:#78350F;">Political & Civic Climate</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">
              ${dossier.politicalInsights || (region && region.politicalInsights) || `Took place during the era of <strong>${data.era}</strong> at ${data.locationName}. Roman authority was exercised through provincial governors and Herodian client kings, while Jewish civic and religious life operated under that oversight.`}
            </p>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block">
            <h4>Era Chronicle</h4>
            <p>${dossier.eraChronology || ""}</p>
            <p><strong>Era:</strong> ${data.era}</p>
            <p><strong>Year:</strong> ${window.app.timeline.formatYear(data.year)}</p>
            <p><strong>Season:</strong> ${data.season}</p>
            <p><strong>Place:</strong> ${data.locationName}</p>
          </div>
        `;
      }

    // -------------------------------------------------------------------------
    // EARLY CHRISTIAN CHURCHES
    // -------------------------------------------------------------------------
    } else if (type === "church") {
      const dossier = this.normalizeDossier("church", { ...data, name: data.city, scriptures: data.scriptures });
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-church">Christian Church</span>
            <span class="city-badge badge-province">${data.region || ""}</span>
          </div>
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>The Congregation at ${data.city}</h4>
            <p><strong>Founded:</strong> ~${data.foundedYear} AD</p>
            <p><strong>Founders:</strong> ${data.founders}</p>
            <p style="margin-top:0.5rem;">${data.significance}</p>
          </div>
          <div class="scripture-verse-card">
            <div class="scripture-citation">Multiplication Milestone</div>
            <div class="scripture-body">${data.growthMilestone}</div>
          </div>
          ${dossier.epistles && dossier.epistles.length > 0 ? `
            <div class="feature-card" style="margin-top:1rem;">
              <h3>Connected New Testament Epistles</h3>
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
                ${dossier.epistles.map(e => `
                  <a href="${this.getChurchScriptureLink(e)}" target="_blank" rel="noopener" class="church-scripture-btn">
                    <span>📖 Study ${e} on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(dossier.scriptures);
        if (dossier.epistles && dossier.epistles.length > 0) {
          html += `
            <div class="feature-card" style="margin-top:1rem;">
              <h3>Epistles Connected with ${dossier.name}</h3>
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
                ${dossier.epistles.map(e => `
                  <a href="${this.getChurchScriptureLink(e)}" target="_blank" rel="noopener" class="church-scripture-btn">
                    <span>📖 Study ${e} on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          `;
        }
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">👥</span>
              <h3 style="margin:0;">Founders, Witnesses & Early Church</h3>
            </div>
            <div style="color:var(--text-secondary); margin-top:0.5rem;">
              ${this.formatParagraphs(dossier.peopleAndChurch || `Planted by ${data.founders}. ${data.significance}`)}
            </div>
          </div>
          ${data.founders && !dossier.peopleAndChurch.includes(data.founders) ? `
            <div class="history-block">
              <h4>Apostolic Leadership</h4>
              <p>Planted under the direction of <strong>${data.founders}</strong> (~${data.foundedYear || "50"} AD).</p>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">🏛️</span>
              <h3 style="margin:0; color:#78350F;">Civic Setting & Roman Governance</h3>
            </div>
            <div style="color:#451A03; margin-top:0.6rem;">
              ${this.formatParagraphs(dossier.politicalInsights || `The church at ${data.city} grew in ${data.region || "the Roman world"} under imperial peace, synagogue networks, and local magistrates.`)}
            </div>
          </div>
          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Province / Region</span>
              <span class="demographic-value" style="font-size:0.88rem;">${data.region || "Roman Empire"}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">First Church Planted</span>
              <span class="demographic-value" style="font-size:0.88rem;">~${data.foundedYear || "50"} AD</span>
            </div>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Era Chronicle & Growth Milestones</h4>
            <div style="font-size:0.9rem; line-height:1.55;">
              ${this.formatParagraphs(dossier.eraChronology || data.growthMilestone)}
            </div>
          </div>
          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Congregation Founded</span>
              <span class="demographic-value" style="font-size:0.88rem;">~${data.foundedYear || "50"} AD</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Apostolic Era Span</span>
              <span class="demographic-value" style="font-size:0.88rem;">~30 AD – 100 AD</span>
            </div>
          </div>
        `;
      }

    // -------------------------------------------------------------------------
    // JEWISH DIASPORA CENTERS
    // -------------------------------------------------------------------------
    } else if (type === "diaspora") {
      const dossier = this.normalizeDossier("diaspora", { ...data, name: data.city, scriptures: data.scriptures, overview: data.history });
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-synagogue">Jewish Diaspora</span>
            <span class="city-badge badge-province">${data.region || ""}</span>
          </div>
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Jewish Settlement in ${data.city}</h4>
            <p><strong>Estimated Population:</strong> ${data.estimatedPopulation}</p>
            <p><strong>Established:</strong> ${data.established}</p>
            <p><strong>Synagogues:</strong> ${data.synagogues}</p>
            <p style="margin-top:0.5rem;">${data.history}</p>
          </div>
          <div class="feature-card">
            <h3>Role in Apostolic Missions</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary);">${data.scriptureRole}</p>
          </div>
          ${dossier.epistles && dossier.epistles.length > 0 ? `
            <div class="feature-card" style="margin-top:1rem;">
              <h3>Connected New Testament Epistles</h3>
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
                ${dossier.epistles.map(e => `
                  <a href="${this.getChurchScriptureLink(e)}" target="_blank" rel="noopener" class="church-scripture-btn">
                    <span>📖 Study ${e} on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(dossier.scriptures);
        if (dossier.epistles && dossier.epistles.length > 0) {
          html += `
            <div class="feature-card" style="margin-top:1rem;">
              <h3>Epistles Connected with ${dossier.name}</h3>
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
                ${dossier.epistles.map(e => `
                  <a href="${this.getChurchScriptureLink(e)}" target="_blank" rel="noopener" class="church-scripture-btn">
                    <span>📖 Study ${e} on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          `;
        }
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">👥</span>
              <h3 style="margin:0;">Community, Witnesses & Named Figures</h3>
            </div>
            <div style="color:var(--text-secondary); margin-top:0.5rem;">
              ${this.formatParagraphs(dossier.peopleAndChurch || data.scriptureRole)}
            </div>
          </div>
          ${data.scriptureRole && !dossier.peopleAndChurch.includes(data.scriptureRole) ? `
            <div class="history-block">
              <h4>Role in Apostolic Missions</h4>
              <p>${data.scriptureRole}</p>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">🏛️</span>
              <h3 style="margin:0; color:#78350F;">Diaspora Standing under Rome (~6 BC – 100 AD)</h3>
            </div>
            <div style="color:#451A03; margin-top:0.6rem;">
              ${this.formatParagraphs(dossier.politicalInsights || data.history)}
            </div>
          </div>
          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Province / Region</span>
              <span class="demographic-value" style="font-size:0.88rem;">${data.region || "Roman Empire"}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Legal Charter</span>
              <span class="demographic-value" style="font-size:0.88rem;">Collegium Licitum</span>
            </div>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Era Chronicle & Historical Milestones</h4>
            <div style="font-size:0.9rem; line-height:1.55;">
              ${this.formatParagraphs(dossier.eraChronology || `Established ${data.established}; active throughout the New Testament era.`)}
            </div>
          </div>
          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Settlement Established</span>
              <span class="demographic-value" style="font-size:0.88rem;">${data.established || "Antiquity"}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Biblical Era Span</span>
              <span class="demographic-value" style="font-size:0.88rem;">~6 BC – 100 AD</span>
            </div>
          </div>
        `;
      }

    // -------------------------------------------------------------------------
    // PAUL'S MISSIONARY JOURNEYS
    // -------------------------------------------------------------------------
    } else if (type === "journey") {
      if (this.currentTab === "overview") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>${data.name} (${data.years})</h4>
            <p><strong>Companions:</strong> ${data.companions}</p>
            <p><strong>Scripture Record:</strong> ${data.scriptures}</p>
            <p style="margin-top:0.6rem;">${data.description}</p>
          </div>
          <h4 style="font-family:var(--font-serif-title); font-size:0.85rem; margin-bottom:0.5rem;">Journey Stations (${data.stops.length} Stops)</h4>
          <div style="display:flex; flex-direction:column; gap:0.45rem;">
            ${data.stops.map((stop, i) => `
              <div style="background:#FFF; border:1px solid var(--border-parchment); border-radius:6px; padding:0.45rem 0.75rem; font-size:0.8rem;">
                <strong>${i + 1}. ${stop.name}</strong><br>
                <span style="color:var(--text-muted); font-size:0.75rem;">${stop.note}</span>
              </div>
            `).join("")}
          </div>
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(this.asScriptureList(data.scriptures));
        html += `<div class="history-block" style="margin-top:1rem;"><h4>Narrative</h4><p>${data.description}</p></div>`;
      } else if (this.currentTab === "people") {
        html = `<div class="feature-card"><h3>Companions & Churches</h3><p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary);">${data.companions}. Stations include ${data.stops.map((s) => s.name).slice(0, 8).join(", ")}.</p></div>`;
      } else if (this.currentTab === "political") {
        html = `<div class="political-insight-card"><div class="insight-header"><span class="insight-icon">🏛️</span><h3 style="margin:0; color:#78350F;">Roads, Harbors & Roman Peace</h3></div><p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">${data.name} (${data.years}) used imperial sea lanes and the Via Egnatia / Augustan roads. Local magistrates, synagogue rulers, and proconsuls (as at Paphos and Corinth) decided whether the word would have free course.</p></div>`;
      } else if (this.currentTab === "chronology") {
        html = `<div class="history-block"><h4>Era Chronicle</h4><p><strong>${data.years}</strong> — ${data.description}</p><p>Scripture: ${data.scriptures}</p></div>`;
      }

    // -------------------------------------------------------------------------
    // ROMAN PROVINCES & BIBLICAL REGIONS (Judea, Galilee, Samaria, etc.)
    // -------------------------------------------------------------------------
    } else if (type === "region") {
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-province">Roman Province</span>
            <span class="city-badge badge-jerusalem-area">Capital: ${data.capital}</span>
            ${data.elevation ? `<span class="city-badge badge-elevation">${data.elevation}</span>` : ''}
          </div>

          <div class="hero-quote" style="margin-bottom:1rem;">
            <div class="quote-text" style="font-size:0.95rem; font-style:normal; font-family:var(--font-serif); color:#451A03;">
              ${data.summary || data.description}
            </div>
            <span class="quote-ref">${data.ancientName || data.name}</span>
          </div>

          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Geographical & Scriptural Overview</h4>
            <p>${data.overview || data.description}</p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Provincial Capital</span>
              <span class="demographic-value" style="font-size:0.92rem;">${data.capital}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Roman Administration</span>
              <span class="demographic-value" style="font-size:0.85rem;">${data.governor ? data.governor.split(',')[0] : 'Roman Legate'}</span>
            </div>
          </div>

          ${data.scriptures && data.scriptures.length > 0 ? `
            <div class="feature-card" style="margin-top:1rem;">
              <h3>Key New Testament Scriptures (KJV)</h3>
              <div style="display:flex; flex-direction:column; gap:0.45rem; margin-top:0.4rem;">
                ${data.scriptures.map(s => `
                  <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn" title="Read ${s.ref} on ChurchofJesusChrist.org">
                    <span>📖 ${s.ref} • Read on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "scripture") {
        html = `
          <div class="kjv-translation-notice">
            <span class="kjv-badge">King James Version (KJV)</span>
            <span>Verbatim biblical record with direct study links to ChurchofJesusChrist.org.</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.85rem; margin-top:0.75rem;">
            ${data.scriptures && data.scriptures.length > 0 ? data.scriptures.map(s => `
              <div class="scripture-verse-card">
                <div class="scripture-card-top">
                  <span class="scripture-citation">📖 ${s.ref}</span>
                  <span class="scripture-kjv-tag">KJV</span>
                </div>
                <div class="scripture-body">"${s.text}"</div>
                <div class="scripture-action-row">
                  <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                    <span>Read Full Chapter on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                </div>
              </div>
            `).join("") : `
              <div class="history-block">
                <p>Referenced across the New Testament Gospels, Acts of the Apostles, and Pauline Epistles.</p>
              </div>
            `}
          </div>
        `;
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card" style="margin-bottom:1rem;">
            <h3>Inhabitants, Communities & Early Church</h3>
            <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
              ${data.peopleAndChurch || data.description}
            </p>
          </div>

          <div class="history-block">
            <h4>Apostolic Reach</h4>
            <p>Constituted the principal missionary corridor for the Savior Jesus Christ and the Twelve Apostles throughout the 1st century.</p>
          </div>
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card" style="margin-bottom:1rem;">
            <div class="insight-header">
              <span class="insight-icon">🏛️</span>
              <h3 style="margin:0; color:#78350F;">Imperial Roman Administration & Governance</h3>
            </div>
            <p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">
              ${data.politicalInsights || `Governed by: ${data.governor}`}
            </p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Administrative Seat</span>
              <span class="demographic-value" style="font-size:0.92rem;">${data.capital}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Authority Type</span>
              <span class="demographic-value" style="font-size:0.88rem;">Roman Province / Client Tetrarchy</span>
            </div>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Sacred Era Chronology & Milestones</h4>
            <p style="font-size:0.9rem; line-height:1.55;">
              ${data.eraChronology || `Active throughout the New Testament era (~6 BC – 100 AD).`}
            </p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Biblical Era Span</span>
              <span class="demographic-value" style="font-size:0.92rem;">~6 BC – 100 AD</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Roman Annexation</span>
              <span class="demographic-value" style="font-size:0.92rem; color:#B45309;">1st Century AD</span>
            </div>
          </div>
        `;
      }
    }

    if (!html) {
      const dossier = this.normalizeDossier(type, data);
      html = `
        <div class="history-block">
          <h4>${dossier.name}</h4>
          <p>${dossier.overview || dossier.summary || "This place belongs to the New Testament world (~6 BC – 100 AD). Use the Scriptures tab for KJV passages and ChurchofJesusChrist.org study links."}</p>
        </div>
      `;
      if (this.currentTab === "scripture") html = this.renderScriptureCards(dossier.scriptures);
      if (this.currentTab === "people") html = `<div class="feature-card"><h3>People & Church</h3><p>${dossier.peopleAndChurch || dossier.overview}</p></div>`;
      if (this.currentTab === "political") html = `<div class="political-insight-card"><p>${dossier.politicalInsights || dossier.overview}</p></div>`;
      if (this.currentTab === "chronology") html = `<div class="history-block"><h4>Era Events</h4><p>${dossier.eraChronology || "Active in the New Testament era (~6 BC – 100 AD)."}</p></div>`;
    }

    this.sidebarContent.innerHTML = html;
  }

  onTimelineYearChanged(year, era) {
    // If welcome screen is visible and no specific city is selected, we can update the active era text
    if (!this.currentActiveItem) {
      const eraSection = document.querySelector(".sidebar-section.welcome-intro");
      if (eraSection) {
        // Can subtly update or keep welcome intact
      }
    }
  }

  // =========================================================================
  // GUIDED STORY TOURS
  // =========================================================================

  setupTours() {
    const toursBtn = document.getElementById("storyToursBtn");
    const tourModal = document.getElementById("tourModal");
    const closeTourModalBtn = document.getElementById("closeTourModalBtn");
    const tourModalBody = document.getElementById("tourModalBody");

    if (toursBtn && tourModal) {
      toursBtn.addEventListener("click", () => {
        // Populate modal with tours
        if (tourModalBody) {
          tourModalBody.innerHTML = TOURS_DATA.map(tour => `
            <div class="tour-select-card" data-tour-id="${tour.id}">
              <div class="tour-card-icon">${tour.icon}</div>
              <div class="tour-card-body">
                <span class="tour-card-title">${tour.title}</span>
                <span class="tour-card-desc">${tour.description}</span>
                <div class="tour-card-footer">
                  <span>${tour.eraText}</span> • <span>Click to Begin</span>
                </div>
              </div>
            </div>
          `).join("");

          tourModalBody.querySelectorAll(".tour-select-card").forEach(c => {
            c.addEventListener("click", () => {
              const tid = c.dataset.tourId;
              tourModal.style.display = "none";
              this.startTour(tid);
            });
          });
        }
        tourModal.style.display = "flex";
      });
    }

    if (closeTourModalBtn && tourModal) {
      closeTourModalBtn.addEventListener("click", () => {
        tourModal.style.display = "none";
      });
    }

    // Tour Stepper Controls
    const prevStepBtn = document.getElementById("tourPrevStepBtn");
    const nextStepBtn = document.getElementById("tourNextStepBtn");
    const exitTourBtn = document.getElementById("tourExitBtn");

    if (prevStepBtn) {
      prevStepBtn.addEventListener("click", () => this.stepTour(-1));
    }
    if (nextStepBtn) {
      nextStepBtn.addEventListener("click", () => this.stepTour(1));
    }
    if (exitTourBtn) {
      exitTourBtn.addEventListener("click", () => this.exitTour());
    }
  }

  startTour(tourId) {
    const tour = TOURS_DATA.find(t => t.id === tourId);
    if (!tour) return;

    this.activeTour = tour;
    this.currentTourStopIndex = 0;

    // Show tour stepper bar
    const stepperBar = document.getElementById("tourStepperBar");
    const tourName = document.getElementById("stepperTourName");
    if (stepperBar && tourName) {
      tourName.textContent = tour.title;
      stepperBar.style.display = "flex";
    }

    this.goToTourStop(0);
  }

  stepTour(delta) {
    if (!this.activeTour) return;
    const newIdx = this.currentTourStopIndex + delta;
    if (newIdx >= 0 && newIdx < this.activeTour.stops.length) {
      this.goToTourStop(newIdx);
    }
  }

  goToTourStop(index) {
    if (!this.activeTour) return;
    this.currentTourStopIndex = index;
    const stop = this.activeTour.stops[index];

    // Update indicator
    const stepCount = document.getElementById("stepperStepCount");
    if (stepCount) {
      stepCount.textContent = `Stop ${index + 1} of ${this.activeTour.stops.length}: ${stop.title}`;
    }

    // Sync timeline year
    if (stop.year !== undefined) {
      window.app.timeline.setYear(stop.year);
    }

    // Fly camera
    window.app.map.flyToLocation(stop.lat, stop.lng, stop.zoom || 12);

    // If linked to an event, open in sidebar
    if (stop.eventId) {
      const event = TIMELINE_EVENTS.find(e => e.id === stop.eventId);
      if (event) {
        this.showEventDetail(event);
      }
    }
  }

  exitTour() {
    this.activeTour = null;
    const stepperBar = document.getElementById("tourStepperBar");
    if (stepperBar) {
      stepperBar.style.display = "none";
    }
  }

  // =========================================================================
  // AMBIENT BIBLICAL HARP SOUND GENERATOR (Web Audio API)
  // Synthesizes soothing, gentle acoustic harp plucks on pentatonic chords.
  // =========================================================================

  toggleAmbientAudio() {
    const iconOff = document.getElementById("audioIconOff");
    const iconOn = document.getElementById("audioIconOn");

    if (this.isAudioPlaying) {
      this.stopAmbientAudio();
      if (iconOff) iconOff.style.display = "block";
      if (iconOn) iconOn.style.display = "none";
    } else {
      this.startAmbientAudio();
      if (iconOff) iconOff.style.display = "none";
      if (iconOn) iconOn.style.display = "block";
    }
  }

  startAmbientAudio() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      this.isAudioPlaying = true;

      // Pentatonic / Classical Biblical harp frequencies (D minor / Dorian peaceful modal notes)
      // D4, F4, G4, A4, C5, D5, E5, F5
      const harpNotes = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 659.25, 698.46];

      const playPluck = () => {
        if (!this.isAudioPlaying) return;
        const note = harpNotes[Math.floor(Math.random() * harpNotes.length)];
        this.synthesizeHarpString(note);

        // Schedule next gentle pluck
        const delay = 1800 + Math.random() * 2400;
        this.audioTimer = setTimeout(playPluck, delay);
      };

      playPluck();
    } catch (e) {
      console.warn("Web Audio ambient player not supported or blocked", e);
    }
  }

  synthesizeHarpString(freq) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    // Warm harp-like timbre: sine blended with gentle triangle harmonics
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Exponential pluck envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 2.85);
  }

  stopAmbientAudio() {
    this.isAudioPlaying = false;
    if (this.audioTimer) {
      clearTimeout(this.audioTimer);
      this.audioTimer = null;
    }
  }
}
