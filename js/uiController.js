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

    // Curated Tour Mini Card Clicks & Era Jumps (Sidebar Event Delegation)
    if (this.sidebarContent) {
      this.sidebarContent.addEventListener("click", (e) => {
        const tourCard = e.target.closest(".tour-mini-card");
        if (tourCard) {
          const tourId = tourCard.dataset.tourId;
          this.startTour(tourId);
          return;
        }

        const eraBtn = e.target.closest(".era-jump-btn");
        if (eraBtn) {
          const year = parseFloat(eraBtn.dataset.year);
          if (window.app && window.app.timeline) {
            window.app.timeline.setYear(year);
          }
          return;
        }
      });
    }

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
    if (this.currentTab === "scripture") eyebrow = "FOUNDATIONAL SCRIPTURES • KJV";
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

        <div class="history-block" style="margin-bottom:1rem;">
          <h4>Multiplication of the Early Church</h4>
          <p>
            From ~120 believers gathered in Jerusalem's upper room (Acts 1:15), the Church grew by 3,000 souls on the day of Pentecost (Acts 2:41) and soon 5,000 men (Acts 4:4). Following Stephen's martyrdom, believers dispersed preaching throughout Samaria, Phoenicia, Cyprus, and Antioch, where disciples were first called Christians (Acts 11:26).
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
            <span class="demographic-label">Mediterranean Churches</span>
            <span class="demographic-value" style="font-size:0.95rem;">40+ Major Hubs</span>
          </div>
          <div class="demographic-stat-box">
            <span class="demographic-label">Diaspora Population</span>
            <span class="demographic-value" style="font-size:0.95rem;">~4–5 Million</span>
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
