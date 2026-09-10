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
      recenterBtn.addEventListener("click", () => window.app.map.recenter());
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

    // Curated Tour Mini Card Clicks in Welcome Intro
    document.querySelectorAll(".tour-mini-card").forEach(card => {
      card.addEventListener("click", () => {
        const tourId = card.dataset.tourId;
        this.startTour(tourId);
      });
    });
  }

  // Sidebar Controls
  openSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.remove("closed");
    }
  }

  closeSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.add("closed");
    }
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.toggle("closed");
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
      if (
        city.name.toLowerCase().includes(q) ||
        (city.ancientName && city.ancientName.toLowerCase().includes(q)) ||
        (city.region && city.region.toLowerCase().includes(q)) ||
        (city.significance && city.significance.toLowerCase().includes(q)) ||
        (city.overview && city.overview.toLowerCase().includes(q))
      ) {
        results.push({ type: "city", item: city, title: city.name, subtitle: `${city.region} • ${city.ancientName}`, badge: "City" });
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

    const cleaned = String(citation).replace(/&/g, " ").split(/[;,—]/)[0].trim();
    const match = cleaned.match(/^([\d]?\s*[A-Za-z]+)\s+(\d+)(?::(\d+))?/);
    if (!match) return "https://www.churchofjesuschrist.org/study/scriptures/nt?lang=eng";

    const rawBook = match[1].trim().toLowerCase();
    const chapter = match[2];
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
      <div class="kjv-translation-notice">
        <span class="kjv-badge">King James Version (KJV)</span>
        <span>Official Holy Bible translation with direct Church of Jesus Christ study links.</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.9rem; margin-top:0.75rem;">
        ${list.map((s) => `
          <div class="scripture-verse-card">
            <div class="scripture-card-top">
              <span class="scripture-citation">📖 ${s.ref}</span>
              <span class="scripture-kjv-tag">KJV</span>
            </div>
            ${s.text ? `<div class="scripture-body">"${s.text}"</div>` : ""}
            <div class="scripture-action-row">
              <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn">
                <span>Read ${s.ref} on ChurchofJesusChrist.org</span>
                <span class="btn-arrow">↗</span>
              </a>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  normalizeDossier(type, data) {
    const region = this.getRelatedRegion(data);
    const name = data.name || data.city || data.title || "Selected Place";
    const scriptures = this.gatherRelatedScriptures(data);
    return {
      name,
      ancientName: data.ancientName || "",
      summary: data.summary || data.significance || data.description || data.history || "",
      overview: data.overview || data.significance || data.description || data.history || data.summary || "",
      scriptures,
      peopleAndChurch: data.peopleAndChurch || [data.jewishDiasporaInfo, data.christianChurchInfo, data.founders, data.companions].filter(Boolean).join(" "),
      politicalInsights: data.politicalInsights || (region && region.politicalInsights) || "",
      eraChronology: data.eraChronology || data.growthMilestone || "",
      region: data.region || (region && region.name) || "",
      capital: data.capital || "",
      governor: data.governor || "",
      elevation: data.elevation || data.elev || "",
      population: data.population || data.estimatedPopulation || "",
      epistles: data.epistles || [],
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
    return this.citiesList().find((c) =>
      c.id === needle ||
      c.name.toLowerCase() === needle ||
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
    if (pin.linkType === "view" && pin.viewTarget) return false;

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

  // Render Tabs Content based on Active Item and Selected Tab
  renderActiveItemTabs() {
    if (!this.currentActiveItem) return;
    const { type, data } = this.currentActiveItem;
    let html = "";

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
        html = `
          <div class="kjv-translation-notice">
            <span class="kjv-badge">King James Version (KJV)</span>
            <span>Official Holy Bible translation with direct Church of Jesus Christ study links.</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.9rem; margin-top:0.75rem;">
            ${data.scriptures.map(s => `
              <div class="scripture-verse-card">
                <div class="scripture-card-top">
                  <span class="scripture-citation">📖 ${s.ref}</span>
                  <span class="scripture-kjv-tag">KJV</span>
                </div>
                <div class="scripture-body">"${s.text}"</div>
                <div class="scripture-action-row">
                  <a href="${s.churchLink || this.getChurchScriptureLink(s.ref)}" target="_blank" rel="noopener" class="church-scripture-btn" title="Open full chapter on ChurchofJesusChrist.org">
                    <span>Read Full Chapter on ChurchofJesusChrist.org</span>
                    <span class="btn-arrow">↗</span>
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        `;
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
        html = `
          <div class="kjv-translation-notice">
            <span class="kjv-badge">King James Version (KJV)</span>
            <span>Official Holy Bible translation with direct Church of Jesus Christ study links.</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.9rem; margin-top:0.75rem;">
            ${data.scriptures.map(s => `
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
            `).join("")}
          </div>
        `;
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
              ${dossier.peopleAndChurch || `Recorded at <strong>${data.locationName}</strong> during <strong>${data.era}</strong>. Witnesses include the Savior Jesus Christ, His Apostles and disciples, and local people named in the Gospels and Acts.`}
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
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(dossier.scriptures);
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card">
            <h3>Founders & Saints</h3>
            <p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">
              ${dossier.peopleAndChurch || `Planted by ${data.founders}. ${data.significance}`}
            </p>
          </div>
        `;
      } else if (this.currentTab === "political") {
        html = `
          <div class="political-insight-card">
            <div class="insight-header"><span class="insight-icon">🏛️</span><h3 style="margin:0; color:#78350F;">Civic Setting</h3></div>
            <p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">
              ${dossier.politicalInsights || `The church at ${data.city} grew in ${data.region || "the Roman world"} under imperial peace, synagogue networks, and local magistrates.`}
            </p>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block">
            <h4>Era Chronicle</h4>
            <p>${dossier.eraChronology || data.growthMilestone}</p>
            <p><strong>Founded:</strong> ~${data.foundedYear} AD</p>
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
        `;
      } else if (this.currentTab === "scripture") {
        html = this.renderScriptureCards(dossier.scriptures);
      } else if (this.currentTab === "people") {
        html = `<div class="feature-card"><h3>Community & Witnesses</h3><p style="font-size:0.88rem; line-height:1.55; color:var(--text-secondary); margin-top:0.5rem;">${dossier.peopleAndChurch || data.scriptureRole}</p></div>`;
      } else if (this.currentTab === "political") {
        html = `<div class="political-insight-card"><div class="insight-header"><span class="insight-icon">🏛️</span><h3 style="margin:0; color:#78350F;">Diaspora Standing under Rome</h3></div><p style="font-size:0.88rem; line-height:1.55; color:#451A03; margin-top:0.6rem;">${dossier.politicalInsights || data.history}</p></div>`;
      } else if (this.currentTab === "chronology") {
        html = `<div class="history-block"><h4>Era Chronicle</h4><p>${dossier.eraChronology || `Established ${data.established}; active throughout the New Testament era.`}</p></div>`;
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
