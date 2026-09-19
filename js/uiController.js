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
    this.setupDistanceTool();
    this.setupMobileInterface();
    this.updateActiveFiltersBadge();

    // Mobile map-first experience: keep map visible on initial load
    if (typeof window !== "undefined" && window.innerWidth <= 900) {
      this.closeSidebar();
    }
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

    const edgeToggleBtn = document.getElementById("sidebarEdgeToggleBtn");
    if (edgeToggleBtn) {
      edgeToggleBtn.addEventListener("click", () => this.toggleSidebar());
    }

    // Floating Era Badge Collapse / Expand Toggle
    const eraBadge = document.getElementById("floatingEraBadge");
    const eraBadgeToggleBtn = document.getElementById("eraBadgeToggleBtn");
    if (eraBadge && eraBadgeToggleBtn) {
      const toggleEra = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        const isExp = eraBadge.classList.toggle("is-expanded");
        eraBadgeToggleBtn.textContent = isExp ? "−" : "+";
      };
      eraBadgeToggleBtn.addEventListener("click", toggleEra);
      eraBadge.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 && e.target !== eraBadgeToggleBtn) {
          toggleEra(e);
        }
      });
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

    // Consolidated Atlas Tools Dropdown (Matching Book of Mormon Atlas)
    const toolsBtn = document.getElementById("toolsDropdownBtn");
    const toolsMenu = document.getElementById("toolsDropdownMenu");
    if (toolsBtn && toolsMenu) {
      toolsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = toolsMenu.classList.contains("open");
        toolsMenu.classList.toggle("open", !isOpen);
        toolsBtn.setAttribute("aria-expanded", String(!isOpen));
      });

      document.addEventListener("click", (e) => {
        const container = document.getElementById("toolsDropdownContainer");
        if (!container || !container.contains(e.target)) {
          toolsMenu.classList.remove("open");
          toolsBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Map style items inside tools menu
      toolsMenu.querySelectorAll(".map-style-item").forEach(item => {
        item.addEventListener("click", () => {
          const style = item.dataset.style;
          if (style === "first-century-satellite") {
            if (window.app && window.app.satelliteExplorer) {
              window.app.satelliteExplorer.open("holy-land");
            }
          } else if (style === "modern-satellite" || style === "satellite") {
            window.app.map.setMapStyle("satellite");
          } else if (style === "modern") {
            window.app.map.setMapStyle("modern");
          } else {
            window.app.map.setMapStyle("parchment");
          }
          toolsMenu.querySelectorAll(".map-style-item").forEach(i => i.classList.remove("active-style"));
          item.classList.add("active-style");
          toolsMenu.classList.remove("open");
          toolsBtn.setAttribute("aria-expanded", "false");
        });
      });

      // Region focus items inside tools menu
      toolsMenu.querySelectorAll(".region-item").forEach(item => {
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
                if (regionKey !== "jerusalem") {
                  window.app.ui.showRegionDetail(region);
                }
              }
            }
          }
          toolsMenu.classList.remove("open");
          toolsBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Ambient Audio Button
    const audioBtn = document.getElementById("ambientAudioBtn");
    if (audioBtn) {
      audioBtn.addEventListener("click", () => this.toggleAmbientAudio());
    }

    // Backward-compatible individual dropdowns if present
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
            if (window.app && window.app.satelliteExplorer) {
              window.app.satelliteExplorer.open("holy-land");
            }
          } else if (style === "modern-satellite" || style === "satellite") {
            window.app.map.setMapStyle("satellite");
            if (mapStyleIcon) mapStyleIcon.textContent = "🛰️";
            if (mapStyleText) mapStyleText.textContent = "Satellite Earth";
          } else if (style === "modern") {
            window.app.map.setMapStyle("modern");
            if (mapStyleIcon) mapStyleIcon.textContent = "🗺️";
            if (mapStyleText) mapStyleText.textContent = "Modern Streets";
          } else {
            window.app.map.setMapStyle("parchment");
            if (mapStyleIcon) mapStyleIcon.textContent = "📜";
            if (mapStyleText) mapStyleText.textContent = "Ancient Relief";
          }
          mapStyleDropdown.classList.remove("open");
        });
      });
    }

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

    // Permanent Scriptural Atlases Dropdown Toggle
    const atlasesBtn = document.getElementById("atlasesDropdownBtn");
    const atlasesDropdown = document.getElementById("atlasesDropdown");
    if (atlasesBtn && atlasesDropdown) {
      atlasesBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        atlasesDropdown.classList.toggle("open");
      });
      document.addEventListener("click", () => {
        atlasesDropdown.classList.remove("open");
      });
    }

    // More Layers Dropdown Toggle (Secondary Layers)
    const moreLayersBtn = document.getElementById("moreLayersBtn");
    const moreLayersDropdown = document.getElementById("moreLayersDropdown");
    if (moreLayersBtn && moreLayersDropdown) {
      moreLayersBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        moreLayersDropdown.classList.toggle("open");
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".more-layers-container")) {
          moreLayersDropdown.classList.remove("open");
        }
      });
    }

    // Expandable Desktop Filters Panel Toggle
    const togglePanelBtn = document.getElementById("toggleFiltersPanelBtn");
    const desktopPanel = document.getElementById("desktopFiltersPanel");
    if (togglePanelBtn && desktopPanel) {
      togglePanelBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        desktopPanel.classList.toggle("open");
        const isOpen = desktopPanel.classList.contains("open");
        togglePanelBtn.setAttribute("aria-expanded", isOpen);
      });

      // Close when clicking outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest("#desktopFiltersPanel") && !e.target.closest("#toggleFiltersPanelBtn")) {
          desktopPanel.classList.remove("open");
          togglePanelBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    const closePanelBtn = document.getElementById("closeFiltersPanelBtn");
    if (closePanelBtn && desktopPanel) {
      closePanelBtn.addEventListener("click", () => {
        desktopPanel.classList.remove("open");
        if (togglePanelBtn) togglePanelBtn.setAttribute("aria-expanded", "false");
      });
    }

    const clearFiltersBtn = document.getElementById("clearAllFiltersBtn");
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        document.querySelectorAll(".filter-chip[data-filter]").forEach(c => {
          c.classList.remove("active");
        });
        if (window.app && window.app.map) {
          const allKeys = ["savior", "jerusalemSites", "jerusalemGeography", "journeys", "churches", "heatmaps", "diaspora", "provinces", "all"];
          allKeys.forEach(k => window.app.map.setLayerFilter(k, false));
        }
        this.updateActiveFiltersBadge();
      });
    }

    // Filter Chips (Both primary toolbar chips and expandable filters panel chips)
    document.querySelectorAll(".filter-chip[data-filter]").forEach(chip => {
      chip.addEventListener("click", () => {
        const filterKey = chip.dataset.filter;
        if (!filterKey) return;
        const willBeActive = !chip.classList.contains("active");

        // Synchronize all chips sharing this filterKey across toolbar and flyout panel
        document.querySelectorAll(`.filter-chip[data-filter="${filterKey}"]`).forEach(c => {
          c.classList.toggle("active", willBeActive);
        });

        // Special handling for 'All Visible'
        if (filterKey === "all") {
          const foundational = ["savior", "jerusalemSites", "jerusalemGeography", "journeys", "churches", "heatmaps", "diaspora", "provinces"];
          foundational.forEach(fk => {
            document.querySelectorAll(`.filter-chip[data-filter="${fk}"]`).forEach(c => {
              c.classList.toggle("active", willBeActive);
            });
          });
        }

        window.app.map.setLayerFilter(filterKey, willBeActive);
        this.updateActiveFiltersBadge();
      });
    });

    // Legend Collapsible & Menu Toggle
    const legendHeader = document.getElementById("legendToggleHeader");
    const legendBody = document.getElementById("legendBody");
    const legendCollapseBtn = document.getElementById("legendCollapseBtn");
    const legendBox = document.getElementById("mapLegend");
    const chipLegendToggle = document.getElementById("chipLegendToggle");
    const legendToolMenuItem = document.getElementById("legendToolMenuItem");

    const toggleLegend = () => {
      if (!legendBox) return;
      const isHidden = legendBox.style.display === "none" || !legendBox.style.display;
      if (isHidden) {
        legendBox.style.display = "block";
        legendBox.classList.remove("is-minimized");
        if (legendBody) legendBody.style.display = "flex";
        if (legendCollapseBtn) legendCollapseBtn.textContent = "−";
      } else if (legendBox.classList.contains("is-minimized")) {
        legendBox.classList.remove("is-minimized");
        if (legendBody) legendBody.style.display = "flex";
        if (legendCollapseBtn) legendCollapseBtn.textContent = "−";
      } else {
        legendBox.style.display = "none";
      }
      if (chipLegendToggle) chipLegendToggle.classList.toggle("active", legendBox.style.display !== "none");
    };

    if (chipLegendToggle) chipLegendToggle.addEventListener("click", toggleLegend);
    if (legendToolMenuItem) {
      legendToolMenuItem.addEventListener("click", () => {
        toggleLegend();
        const toolsMenu = document.getElementById("toolsDropdownMenu");
        if (toolsMenu) toolsMenu.classList.remove("show");
      });
    }

    if (legendCollapseBtn && legendBox) {
      legendCollapseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        legendBox.classList.toggle("is-minimized");
      });
    }

    if (legendHeader && legendBox) {
      legendHeader.addEventListener("click", () => {
        if (legendBox.classList.contains("is-minimized")) {
          legendBox.classList.remove("is-minimized");
          if (legendBody) legendBody.style.display = "flex";
        } else if (legendBody) {
          const isHidden = legendBody.style.display === "none";
          legendBody.style.display = isHidden ? "flex" : "none";
          if (legendCollapseBtn) legendCollapseBtn.textContent = isHidden ? "−" : "+";
        }
      });
    }

    // Mobile Leaflet Attribution Collapsible Badge (Tap to expand, outside click to collapse)
    const attrControl = document.querySelector(".leaflet-control-attribution");
    if (attrControl) {
      attrControl.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          attrControl.classList.toggle("is-expanded");
        }
      });
      document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 && !attrControl.contains(e.target)) {
          attrControl.classList.remove("is-expanded");
        }
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

  // =========================================================================
  // DEDICATED MOBILE INTERFACE (HAMBURGER DRAWER & FULL-WIDTH SEARCH SHEET)
  // Matches Book of Mormon Atlas mobile patterns
  // =========================================================================
  closeAllMobileSheets() {
    document.querySelectorAll(".mobile-nav-sheet, .mobile-picker-sheet").forEach(s => s.classList.remove("open"));
    const backdrop = document.getElementById("mobileSheetBackdrop");
    if (backdrop) backdrop.classList.remove("active");
  }

  openMobileSheet(sheet) {
    this.closeAllMobileSheets();
    if (sheet) sheet.classList.add("open");
    const backdrop = document.getElementById("mobileSheetBackdrop");
    if (backdrop) backdrop.classList.add("active");
  }

  setupMobileInterface() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNavSheet = document.getElementById("mobileNavSheet");
    const closeMobileNavBtn = document.getElementById("closeMobileNavBtn");
    const mobileSheetBackdrop = document.getElementById("mobileSheetBackdrop");

    const mobileSearchToggleBtn = document.getElementById("mobileSearchToggleBtn");
    const mobileCodexToggleBtn = document.getElementById("mobileCodexToggleBtn");

    const mobilePickerSheet = document.getElementById("mobilePickerSheet");
    const closeMobilePickerBtn = document.getElementById("closeMobilePickerBtn");
    const mobilePickerSearchInput = document.getElementById("mobilePickerSearchInput");

    const mobNavSearchBtn = document.getElementById("mobNavSearchBtn");
    const mobNavJumpBtn = document.getElementById("mobNavJumpBtn");
    const mobNavCodexBtn = document.getElementById("mobNavCodexBtn");
    const mobNavToursBtn = document.getElementById("mobNavToursBtn");

    // Backdrop click dismisses any active sheets
    if (mobileSheetBackdrop) {
      mobileSheetBackdrop.addEventListener("click", () => this.closeAllMobileSheets());
    }

    // Hamburger Menu button
    if (mobileMenuBtn && mobileNavSheet) {
      mobileMenuBtn.addEventListener("click", () => this.openMobileSheet(mobileNavSheet));
    }
    if (closeMobileNavBtn) {
      closeMobileNavBtn.addEventListener("click", () => this.closeAllMobileSheets());
    }

    // Quick open helper for mobile search picker
    const openSearchPicker = (query = "") => {
      this.openMobileSheet(mobilePickerSheet);
      if (mobilePickerSearchInput) {
        mobilePickerSearchInput.value = query;
        setTimeout(() => mobilePickerSearchInput.focus(), 150);
      }
      this.renderMobilePickerList(query);
    };

    // Mobile Header Quick Action Buttons
    if (mobileSearchToggleBtn) {
      mobileSearchToggleBtn.addEventListener("click", () => openSearchPicker());
    }
    if (mobileCodexToggleBtn) {
      mobileCodexToggleBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        this.toggleSidebar();
      });
    }

    // Drawer internal shortcuts
    if (mobNavSearchBtn) {
      mobNavSearchBtn.addEventListener("click", () => openSearchPicker());
    }
    if (mobNavJumpBtn) {
      mobNavJumpBtn.addEventListener("click", () => openSearchPicker());
    }
    if (mobNavCodexBtn) {
      mobNavCodexBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        this.openSidebar();
      });
    }
    if (mobNavToursBtn) {
      mobNavToursBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        const toursBtn = document.getElementById("storyToursBtn");
        if (toursBtn) toursBtn.click();
      });
    }

    // Picker close button & search input
    if (closeMobilePickerBtn) {
      closeMobilePickerBtn.addEventListener("click", () => this.closeAllMobileSheets());
    }
    if (mobilePickerSearchInput) {
      mobilePickerSearchInput.addEventListener("input", (e) => {
        this.renderMobilePickerList(e.target.value);
      });
    }

    // Synchronize layer chips inside mobile drawer
    const drawerChips = document.querySelectorAll("#mobileNavFiltersSection .filter-chip[data-filter]");
    drawerChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const filterKey = chip.dataset.filter;
        if (!filterKey) return;
        const willBeActive = !chip.classList.contains("active");

        if (filterKey === "all") {
          const allChips = document.querySelectorAll(".filter-chip[data-filter]");
          allChips.forEach(c => c.classList.toggle("active", willBeActive));
          if (window.app && window.app.map) {
            ["savior", "jerusalemSites", "jerusalemGeography", "journeys", "churches", "heatmaps", "diaspora", "provinces", "hydrography", "decapolis"].forEach(k => {
              window.app.map.setLayerFilter(k, willBeActive);
            });
          }
        } else {
          chip.classList.toggle("active", willBeActive);
          const desktopChip = document.querySelector(`.layer-filter-bar .filter-chip[data-filter="${filterKey}"]`);
          if (desktopChip) desktopChip.classList.toggle("active", willBeActive);

          if (window.app && window.app.map) {
            window.app.map.setLayerFilter(filterKey, willBeActive);
          }
        }
        this.updateActiveFiltersBadge();
      });
    });

    const resetBtn = document.getElementById("mobNavResetFiltersBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const allChips = document.querySelectorAll(".filter-chip[data-filter]");
        allChips.forEach(c => c.classList.add("active"));
        if (window.app && window.app.map) {
          ["savior", "jerusalemSites", "jerusalemGeography", "journeys", "churches", "heatmaps", "diaspora", "provinces", "hydrography", "decapolis", "all"].forEach(k => {
            window.app.map.setLayerFilter(k, true);
          });
        }
        this.updateActiveFiltersBadge();
      });
    }

    // Secondary tool items in drawer
    const mobDistanceBtn = document.getElementById("mobNavDistanceToolBtn");
    if (mobDistanceBtn) {
      mobDistanceBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        const modal = document.getElementById("distanceCalculatorModal");
        if (modal) modal.style.display = "flex";
      });
    }

    const mobLegendBtn = document.getElementById("mobNavLegendBtn");
    if (mobLegendBtn) {
      mobLegendBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        const legendBox = document.getElementById("mapLegendBox");
        if (legendBox) {
          const isHidden = legendBox.style.display === "none" || !legendBox.style.display;
          legendBox.style.display = isHidden ? "block" : "none";
        }
      });
    }

    const mobSatelliteBtn = document.getElementById("mobNavSatelliteBtn");
    if (mobSatelliteBtn) {
      mobSatelliteBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        if (window.app && window.app.satelliteExplorer) {
          window.app.satelliteExplorer.open("holy-land");
        }
      });
    }

    const mobReliefBtn = document.getElementById("mobNavReliefBtn");
    if (mobReliefBtn) {
      mobReliefBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        if (window.app && window.app.map) {
          window.app.map.setMapStyle("parchment");
        }
      });
    }

    const mobModernEarthBtn = document.getElementById("mobNavModernEarthBtn");
    if (mobModernEarthBtn) {
      mobModernEarthBtn.addEventListener("click", () => {
        this.closeAllMobileSheets();
        if (window.app && window.app.map) {
          window.app.map.setMapStyle("satellite");
        }
      });
    }

    // Region focus items in drawer
    document.querySelectorAll(".mob-region-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const regionKey = btn.dataset.region;
        this.closeAllMobileSheets();
        if (regionKey && window.app && window.app.map) {
          window.app.map.focusRegion(regionKey);
        }
      });
    });
  }

  renderMobilePickerList(query = "") {
    const list = document.getElementById("mobilePickerList");
    if (!list) return;

    const q = (query || "").trim().toLowerCase();
    let results = [];

    if (!q) {
      // Default curated list when opened without a search query:
      // Show prime New Testament holy sites, cities, and landmarks so the user can immediately jump!
      const curatedSites = [
        { type: "jerusalemSite", id: "garden-tomb", title: "✝️ The Garden Tomb (Resurrection)", subtitle: "Jerusalem • Golgotha / Gordon's Calvary", badge: "Tomb" },
        { type: "jerusalemSite", id: "gethsemane", title: "🌿 Garden of Gethsemane", subtitle: "Jerusalem • Mount of Olives Slope", badge: "Sacred" },
        { type: "jerusalemSite", id: "temple-mount", title: "🏛️ Herod's Temple (The Sanctuary)", subtitle: "Jerusalem • Mount Moriah", badge: "Temple" },
        { type: "jerusalemSite", id: "upper-room", title: "🍷 The Upper Room (Cenacle)", subtitle: "Jerusalem • Mount Zion", badge: "Sacred" },
        { type: "geo", id: "sea-of-galilee", title: "🌊 Sea of Galilee (Lake Kinneret)", subtitle: "Galilee • Calling Apostles & Miracles", badge: "Water" },
        { type: "city", id: "capernaum", title: "📍 Capernaum", subtitle: "Galilee • Jesus' 'Own City' & Ministry Hub", badge: "City" },
        { type: "city", id: "nazareth", title: "📍 Nazareth", subtitle: "Galilee • Boyhood Home & Synagogue Rejection", badge: "City" },
        { type: "city", id: "bethlehem", title: "📍 Bethlehem of Judea", subtitle: "Judea • Birthplace of Jesus Christ", badge: "City" },
        { type: "city", id: "jericho", title: "📍 Jericho", subtitle: "Jordan Valley • Zacchaeus & Blind Bartimaeus", badge: "City" },
        { type: "city", id: "antioch-syria", title: "📍 Antioch of Syria", subtitle: "Syria • First Called Christians & Apostolic Base", badge: "Apostolic" },
        { type: "city", id: "ephesus", title: "📍 Ephesus", subtitle: "Asia Minor • Temple of Diana & Paul's 3-Yr Ministry", badge: "Apostolic" },
        { type: "city", id: "athens", title: "📍 Athens", subtitle: "Achaia (Greece) • Mars' Hill & The Unknown God", badge: "Apostolic" },
        { type: "city", id: "rome", title: "📍 Rome", subtitle: "Italia • Imperial Capital & Paul's Martyrdom", badge: "Imperial" },
        { type: "city", id: "patmos", title: "📜 Isle of Patmos", subtitle: "Aegean Sea • John's Exile & Book of Revelation", badge: "Revelation" },
        { type: "savior", id: "resurrection-500", title: "✝️ Christ Appears to Over 500 Brethren", subtitle: "AD 33 • Galilee Mountain (1 Cor 15:6)", badge: "Savior" }
      ];

      results = curatedSites.map(c => {
        let item = null;
        if (c.type === "jerusalemSite" && typeof JERUSALEM_SITES !== "undefined") {
          item = JERUSALEM_SITES.find(s => s.id === c.id);
        } else if (c.type === "city") {
          item = this.citiesList().find(s => s.id === c.id);
        } else if (c.type === "geo") {
          item = this.findGeoFeature(c.id);
        } else if (c.type === "savior" && typeof SAVIOR_EVENTS !== "undefined") {
          item = SAVIOR_EVENTS.find(s => s.id === c.id);
        }
        return {
          type: c.type,
          item: item || { id: c.id, lat: 31.78, lng: 35.23 },
          title: c.title,
          subtitle: c.subtitle,
          badge: c.badge
        };
      });
    } else {
      // 1. Roman Provinces
      if (typeof REGIONS_DATA !== "undefined" && REGIONS_DATA.regions) {
        REGIONS_DATA.regions.forEach(region => {
          if (
            region.name.toLowerCase().includes(q) ||
            (region.ancientName && region.ancientName.toLowerCase().includes(q)) ||
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

      // 2. Jerusalem Sites
      if (typeof JERUSALEM_SITES !== "undefined") {
        JERUSALEM_SITES.forEach(site => {
          if (
            site.name.toLowerCase().includes(q) ||
            site.ancientName.toLowerCase().includes(q) ||
            site.area.toLowerCase().includes(q) ||
            (site.summary && site.summary.toLowerCase().includes(q)) ||
            site.scriptures.some(s => s.ref.toLowerCase().includes(q) || s.text.toLowerCase().includes(q))
          ) {
            results.push({
              type: "jerusalemSite",
              item: site,
              title: `${site.icon || "🏛️"} ${site.name}`,
              subtitle: `Jerusalem • ${site.area}`,
              badge: "Jerusalem"
            });
          }
        });
      }

      // 3. Jerusalem Quarters
      if (typeof JERUSALEM_GEOGRAPHY !== "undefined" && JERUSALEM_GEOGRAPHY.quarters) {
        JERUSALEM_GEOGRAPHY.quarters.forEach(quarter => {
          if (quarter.name.toLowerCase().includes(q) || quarter.ancientName.toLowerCase().includes(q)) {
            results.push({
              type: "jerusalemQuarter",
              item: quarter,
              title: `🏔️ ${quarter.name}`,
              subtitle: `Jerusalem Topography • ${quarter.elevation}`,
              badge: "Quarter"
            });
          }
        });
      }

      // 4. Cities
      this.citiesList().forEach(city => {
        const isPatmos = (q.includes("pathom") || q.includes("patm")) && city.id === "patmos";
        if (
          city.name.toLowerCase().includes(q) ||
          (city.ancientName && city.ancientName.toLowerCase().includes(q)) ||
          (city.region && city.region.toLowerCase().includes(q)) ||
          (city.significance && city.significance.toLowerCase().includes(q)) ||
          isPatmos
        ) {
          const title = city.id === "patmos" ? "📜 Patmos (Isle of Patmos • John's Exile)" : `📍 ${city.name}`;
          results.push({
            type: "city",
            item: city,
            title: title,
            subtitle: `${city.region} • ${city.ancientName || ""}`,
            badge: "City"
          });
        }
      });

      // 5. Geo features
      const geoList = (typeof GEO_FEATURES !== "undefined" && GEO_FEATURES) || window.GEO_FEATURES || [];
      geoList.forEach(feature => {
        if (feature.name.toLowerCase().includes(q) || (feature.ancientName && feature.ancientName.toLowerCase().includes(q))) {
          results.push({
            type: "geo",
            item: feature,
            title: `🌊 ${feature.name}`,
            subtitle: `${feature.region || "Holy Land"} • ${feature.category || "Geography"}`,
            badge: "Water"
          });
        }
      });

      // 6. Savior Events
      if (typeof SAVIOR_EVENTS !== "undefined") {
        SAVIOR_EVENTS.forEach(event => {
          if (
            event.title.toLowerCase().includes(q) ||
            event.description.toLowerCase().includes(q) ||
            event.locationName.toLowerCase().includes(q) ||
            (event.scriptures && event.scriptures.some(s => s.ref.toLowerCase().includes(q) || s.text.toLowerCase().includes(q)))
          ) {
            results.push({
              type: "savior",
              item: event,
              title: `✝️ ${event.title}`,
              subtitle: `${event.season} • ${event.locationName}`,
              badge: "Savior"
            });
          }
        });
      }

      // 7. Missionary Journeys
      if (typeof MISSIONARY_JOURNEYS !== "undefined") {
        MISSIONARY_JOURNEYS.forEach(j => {
          if (j.name.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)) {
            results.push({
              type: "journey",
              item: j,
              title: `⛵ ${j.name}`,
              subtitle: `${j.years} • ${j.companions}`,
              badge: "Journey"
            });
          }
        });
      }
    }

    list.innerHTML = "";
    if (results.length === 0) {
      list.innerHTML = `<div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">No biblical locations or events found matching "${query}".</div>`;
      return;
    }

    const maxItems = q ? 35 : results.length;
    results.slice(0, maxItems).forEach(res => {
      const row = document.createElement("div");
      row.className = "mobile-picker-item";
      row.innerHTML = `
        <div>
          <div class="mobile-picker-name">${res.title}</div>
          <div class="mobile-picker-meta">${res.subtitle}</div>
        </div>
        <span class="mobile-picker-badge badge-${res.type}">${res.badge}</span>
      `;
      row.addEventListener("click", () => {
        this.closeAllMobileSheets();
        this.executeSearchResult(res);
      });
      list.appendChild(row);
    });
  }

  // Synchronize numeric badge on Filters button and any legacy badge
  updateActiveFiltersBadge() {
    const badge = document.getElementById("activeFiltersBadge");
    const foundational = ["savior", "jerusalemSites", "jerusalemGeography", "journeys", "churches", "heatmaps", "diaspora", "provinces"];
    let count = 0;
    foundational.forEach(key => {
      if (document.querySelector(`.filter-chip[data-filter="${key}"].active`)) {
        count++;
      }
    });

    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    }

    const legacyBadge = document.getElementById("moreLayersActiveBadge");
    if (legacyBadge) {
      legacyBadge.textContent = count;
      legacyBadge.style.display = count > 0 ? "inline-flex" : "none";
    }
  }

  updateMoreLayersBadge() {
    this.updateActiveFiltersBadge();
  }

  // Quick Jump Dropdown for All Biblical Locations & Holy Sites
  initQuickJumpDropdown() {
    const select = document.getElementById("quickJumpSelect");
    if (!select) return;

    select.innerHTML = `<option value="" disabled selected>Jump to Any Biblical Location...</option>`;

    // 1. Jerusalem Sacred Sites & Landmarks
    if (typeof JERUSALEM_SITES !== "undefined" && JERUSALEM_SITES.length > 0) {
      const jerGroup = document.createElement("optgroup");
      jerGroup.label = "🏛️ Jerusalem Sacred Landmarks";
      JERUSALEM_SITES.forEach(site => {
        const opt = document.createElement("option");
        opt.value = `jerusalemSite:${site.id}`;
        opt.textContent = `${site.icon || "🏛️"} ${site.name} (${site.area})`;
        jerGroup.appendChild(opt);
      });
      select.appendChild(jerGroup);
    }

    // 2. Jerusalem Quarters & Historic Topography
    if (typeof JERUSALEM_GEOGRAPHY !== "undefined" && JERUSALEM_GEOGRAPHY.quarters && JERUSALEM_GEOGRAPHY.quarters.length > 0) {
      const qGroup = document.createElement("optgroup");
      qGroup.label = "🏔️ Jerusalem Quarters & Topography";
      JERUSALEM_GEOGRAPHY.quarters.forEach(quarter => {
        const opt = document.createElement("option");
        opt.value = `jerusalemQuarter:${quarter.id}`;
        opt.textContent = `🏔️ ${quarter.name} (${quarter.elevation || "Jerusalem"})`;
        qGroup.appendChild(opt);
      });
      select.appendChild(qGroup);
    }

    // 3. Holy Land Waters, Mountains & Biblical Landscapes
    const geoList = (typeof GEO_FEATURES !== "undefined" && GEO_FEATURES) || (typeof window !== "undefined" && window.GEO_FEATURES) || [];
    if (geoList.length > 0) {
      const waterGroup = document.createElement("optgroup");
      waterGroup.label = "🌊 Holy Land Waters & Landscapes";
      geoList.forEach(geo => {
        const opt = document.createElement("option");
        opt.value = `geo:${geo.id}`;
        opt.textContent = `🌊 ${geo.name} (${geo.region || geo.category || "Holy Land"})`;
        waterGroup.appendChild(opt);
      });
      select.appendChild(waterGroup);
    }

    // 4. Holy Land Biblical Cities (Galilee, Judea, Samaria, Decapolis, Perea)
    const holyLandCities = this.citiesList()
      .filter(c => ["Galilee", "Judea", "Samaria", "Decapolis", "Perea"].includes(c.region))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (holyLandCities.length > 0) {
      const hlGroup = document.createElement("optgroup");
      hlGroup.label = "📍 Holy Land Cities (Galilee, Judea, Samaria)";
      holyLandCities.forEach(city => {
        const opt = document.createElement("option");
        opt.value = `city:${city.id}`;
        opt.textContent = `${city.name} (${city.region})`;
        hlGroup.appendChild(opt);
      });
      select.appendChild(hlGroup);
    }

    // 5. Mediterranean & Apostolic Cities (Paul's Journeys, Epistles, Rome, Asia Minor, Greece)
    const apostolicCities = this.citiesList()
      .filter(c => !["Galilee", "Judea", "Samaria", "Decapolis", "Perea"].includes(c.region))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (apostolicCities.length > 0) {
      const apGroup = document.createElement("optgroup");
      apGroup.label = "🌍 Mediterranean & Apostolic Cities";
      apostolicCities.forEach(city => {
        const opt = document.createElement("option");
        opt.value = `city:${city.id}`;
        if (city.id === "patmos") {
          opt.textContent = `📜 Patmos (Isle of Patmos • John's Exile & Revelation)`;
        } else {
          opt.textContent = `${city.name} (${city.region})`;
        }
        apGroup.appendChild(opt);
      });
      select.appendChild(apGroup);
    }

    // 6. Roman Provinces & Biblical Regions
    if (typeof REGIONS_DATA !== "undefined" && REGIONS_DATA.regions && REGIONS_DATA.regions.length > 0) {
      const regGroup = document.createElement("optgroup");
      regGroup.label = "🗺️ Roman Provinces & Regions";
      REGIONS_DATA.regions.forEach(region => {
        const opt = document.createElement("option");
        opt.value = `region:${region.id}`;
        opt.textContent = `🏛️ ${region.name} (${region.capital ? "Cap: " + region.capital : "Province"})`;
        regGroup.appendChild(opt);
      });
      select.appendChild(regGroup);
    }

    // Event listener on location selection
    select.addEventListener("change", (e) => {
      const val = e.target.value;
      if (!val) return;
      const [type, id] = val.split(":");

      if (type === "jerusalemSite") {
        const site = typeof JERUSALEM_SITES !== "undefined" && JERUSALEM_SITES.find(s => s.id === id);
        if (site) {
          if (window.app && window.app.map) window.app.map.flyToLocation(site.lat, site.lng, 16);
          this.showJerusalemSiteDetail(site);
        }
      } else if (type === "jerusalemQuarter") {
        const quarter = typeof JERUSALEM_GEOGRAPHY !== "undefined" && JERUSALEM_GEOGRAPHY.quarters && JERUSALEM_GEOGRAPHY.quarters.find(q => q.id === id);
        if (quarter) {
          const center = this.polygonCenter ? this.polygonCenter(quarter.coordinates) : quarter.coordinates[0];
          if (center && window.app && window.app.map) window.app.map.flyToLocation(center[0], center[1], 15);
          this.showJerusalemQuarterDetail(quarter);
        }
      } else if (type === "geo") {
        const geo = this.findGeoFeature(id);
        if (geo) {
          if (window.app && window.app.map) window.app.map.flyToLocation(geo.lat, geo.lng, geo.zoom || 11);
          this.showGeoFeatureDetail(geo);
        }
      } else if (type === "city") {
        const city = this.citiesList().find(c => c.id === id);
        if (city) {
          if (window.app && window.app.map) window.app.map.flyToLocation(city.lat, city.lng, 12);
          this.showCityDetail(city);
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
        }
      }

      // Reset selection placeholder after brief delay so user can select the same or another location
      setTimeout(() => {
        select.value = "";
      }, 400);
    });
  }

  // Sidebar Controls
  openSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.remove("closed");
      const edgeBtn = document.getElementById("sidebarEdgeToggleBtn");
      if (edgeBtn) {
        const icon = edgeBtn.querySelector(".edge-toggle-icon");
        if (icon) icon.textContent = "▶";
      }
    }
  }

  closeSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.add("closed");
      const edgeBtn = document.getElementById("sidebarEdgeToggleBtn");
      if (edgeBtn) {
        const icon = edgeBtn.querySelector(".edge-toggle-icon");
        if (icon) icon.textContent = "◀";
      }
    }
  }

  toggleSidebar() {
    if (this.sidebar) {
      if (this.sidebar.classList.contains("closed")) {
        this.openSidebar();
      } else {
        this.closeSidebar();
      }
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
    this.closeAllMobileSheets();
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

  normalizeTeachings(type, data) {
    if (!data) return {
      teacher: "Jesus Christ & the Apostles",
      audience: "The Disciples and Multitudes",
      whatWasTaught: "The Gospel of the Kingdom, repentance, faith in Christ, and the resurrection of the dead.",
      whyTaught: "To proclaim salvation and call all people into covenant with God.",
      context: "Recorded in the New Testament Scriptures.",
      howAccepted: "Many humble souls believed and followed the Lord and His apostles, while traditional religious and civil rulers often opposed the word.",
      passages: []
    };

    if (data.teachings && typeof data.teachings === "object") {
      return {
        teacher: data.teachings.teacher || "Jesus Christ",
        audience: data.teachings.audience || "Disciples and Multitudes",
        whatWasTaught: data.teachings.whatWasTaught || data.teachings.doctrine || data.summary || "",
        whyTaught: data.teachings.whyTaught || data.teachings.purpose || "To bear testimony of the Son of God.",
        context: data.teachings.context || data.teachings.setting || data.overview || "",
        howAccepted: data.teachings.howAccepted || data.teachings.reception || data.teachings.acceptance || "",
        passages: data.teachings.passages || data.scriptures || []
      };
    }

    const name = String((data.name || data.city || data.title || "")).toLowerCase();
    const region = String((data.region || "")).toLowerCase();

    // Jerusalem Sacred Sites
    if (type === "jerusalemSite" || type === "jerusalemQuarter" || name.includes("jerusalem")) {
      if (name.includes("gethsemane")) {
        return {
          teacher: "Jesus Christ (The Son of God)",
          audience: "Peter, James, and John (the Inner Apostolic Circle)",
          whatWasTaught: "Watch and pray that ye enter not into temptation; perfect submission to the Father: 'O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt.'",
          whyTaught: "To accomplish the infinite suffering Atonement for the sins of the world and instruct the Apostles on endurance in times of severe spiritual trial.",
          context: "Late Thursday night of Passion Week in an olive grove across the Brook Kidron, where Jesus was in an agony and sweat drops of blood (Luke 22:44).",
          howAccepted: "Overcome with exhaustion and sorrow, the apostles slept; Judas led an armed band to betray Him with a kiss; the disciples initially drew a sword, then all forsook Him and fled as Jesus submitted to His arrest.",
          passages: data.scriptures || ["Matthew 26:36-46", "Luke 22:39-46", "Mark 14:32-42"]
        };
      }
      if (name.includes("temple") || name.includes("solomon") || name.includes("beautiful gate") || name.includes("antonia")) {
        return {
          teacher: "Jesus Christ & the Apostles Peter and John",
          audience: "Temple Pilgrims, Jewish Worshippers, Pharisees, Sadducees, and Sanhedrin",
          whatWasTaught: "My house shall be called the house of prayer for all nations; the Light of the World; the Father who sent Me; healing of the lame man in the name of Jesus Christ of Nazareth (Acts 3).",
          whyTaught: "To declare divine authority over the Temple, condemn hypocritical commercialism, and preach the resurrection through Christ to the rulers of Israel.",
          context: "The vast marble and gold Second Temple complex rebuilt by Herod the Great during major Jewish pilgrimage festivals (Passover, Tabernacles, Hanukkah).",
          howAccepted: "Multitudes marveled at Jesus's wisdom and Peter's miraculous healing, leading thousands to be baptized into the Church; however, the chief priests and Sadducees were indignant, repeatedly arresting the apostles and commanding them never to speak in Jesus's name.",
          passages: data.scriptures || ["John 7:37-39", "John 8:12", "Acts 3:1-16", "Matthew 21:12-17"]
        };
      }
      if (name.includes("upper room") || name.includes("zion") || name.includes("caiaphas") || name.includes("last supper")) {
        return {
          teacher: "Jesus Christ",
          audience: "The Twelve Apostles",
          whatWasTaught: "The Sacrament of the Lord's Supper ('This is my body... this is my blood of the new testament'); foot washing as humble service; the promise of the Holy Ghost (Comforter); 'A new commandment I give unto you, That ye love one another.'",
          whyTaught: "To institute the holy memorial sacrament of His sacrifice, comfort His disciples before His crucifixion, and establish covenant unity among the Apostles.",
          context: "A furnished upper room on Mount Zion during the Passover meal on the eve of the Crucifixion (Spring 30 AD).",
          howAccepted: "The Apostles were filled with sorrow and self-examination, each asking, 'Lord, is it I?' Judas departed into the night to consummate his betrayal, while the Eleven accepted the covenant sacrament and sang an hymn before going to Gethsemane.",
          passages: data.scriptures || ["Luke 22:14-20", "John 13:34-35", "John 14:15-27", "1 Corinthians 11:23-26"]
        };
      }
      if (name.includes("olives") || name.includes("ascension") || name.includes("bethphage")) {
        return {
          teacher: "Jesus Christ",
          audience: "The Apostles & Disciples",
          whatWasTaught: "The Olivet Discourse on the signs of the Second Coming and the destruction of the Temple; the Great Commission to be witnesses unto the uttermost part of the earth (Acts 1:8).",
          whyTaught: "To fortify believers against deception in perilous times and empower the Apostles for the universal spread of the Gospel.",
          context: "The ridge of the Mount of Olives looking down across the Kidron Valley upon the Temple Mount and the Holy City.",
          howAccepted: "The disciples took His warnings to heart—tradition records that early Jerusalem Christians remembered Christ's words and escaped to Pella before the Roman siege of 70 AD; at the Ascension, the apostles returned to Jerusalem with great joy, continually praising God.",
          passages: data.scriptures || ["Matthew 24:1-14", "Acts 1:6-12", "Luke 21:20-28"]
        };
      }
      if (name.includes("golgotha") || name.includes("calvary") || name.includes("tomb") || name.includes("sepulchre")) {
        return {
          teacher: "Jesus Christ & the Angelic Messengers",
          audience: "Mary the Mother of Jesus, John the Beloved, Mary Magdalene, Roman Soldiers, and Mourning Saints",
          whatWasTaught: "The Seven Words from the Cross ('Father, forgive them... It is finished') and the proclamation of the Resurrection: 'He is not here: for he is risen, as he said' (Matt 28:6).",
          whyTaught: "To finish the work of redemption, break the bands of physical death, and usher in the morning of the Resurrection for all mankind.",
          context: "Outside the walls of Jerusalem at Golgotha and in the nearby garden tomb belonging to Joseph of Arimathea.",
          howAccepted: "A Roman centurion cried, 'Truly this man was the Son of God'; crowds smote their breasts in remorse; on the third day, sorrowing women found the stone rolled away and became the first witnesses of the resurrected Lord, turning apostolic despair into triumph.",
          passages: data.scriptures || ["Luke 23:33-46", "John 19:25-30", "Matthew 28:1-10", "John 20:11-18"]
        };
      }
      return {
        teacher: "Jesus Christ & the Apostles",
        audience: "Inhabitants of Jerusalem, Priests, Levites, and Roman Cohorts",
        whatWasTaught: "Covenant repentance, fulfillment of the Law in Christ, and salvation through His name.",
        whyTaught: "Jerusalem was the holy city of God where the Messiah had to accomplish His decease and resurrection.",
        context: "1st-century Roman Judea under Pontius Pilate and High Priest Caiaphas.",
        howAccepted: "On Pentecost, 3,000 were pricked in their hearts and baptized (Acts 2), quickly swelling to over 5,000; however, fierce aristocratic Sanhedrin persecution erupted, resulting in the martyrdom of Stephen and James.",
        passages: data.scriptures || ["Acts 2:22-36", "Luke 24:44-48"]
      };
    }

    // Specific Cities
    if (name.includes("capernaum")) {
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
    if (name.includes("nazareth")) {
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
    if (name.includes("beatitudes") || name.includes("mountain")) {
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
    if (name.includes("sychar") || name.includes("samaria") || name.includes("jacob's well")) {
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
    if (name.includes("athens")) {
      return {
        teacher: "The Apostle Paul",
        audience: "Epicurean and Stoic Philosophers and Athenian Citizens at the Areopagus",
        whatWasTaught: "The Unknown God: God who created heaven and earth dwelleth not in temples made with hands; 'For in him we live, and move, and have our being'; the bodily Resurrection of Christ.",
        whyTaught: "To turn intellectual pagan idolaters toward the living Creator and call all humanity to repentance before the appointed day of judgment.",
        context: "Standing upon the limestone rock of Mars' Hill in view of the Parthenon in classical Athens.",
        howAccepted: "Mixed and skeptical reception: when Paul spoke of the bodily resurrection of the dead, some mocked, and others delayed saying, 'We will hear thee again of this matter.' Nevertheless, certain persons clave unto him and believed, including Dionysius the Areopagite (a member of the supreme judicial council) and a woman named Damaris.",
        passages: data.scriptures || ["Acts 17:22-34"]
      };
    }
    if (name.includes("corinth")) {
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
    if (name.includes("ephesus")) {
      return {
        teacher: "The Apostle Paul & the Apostle John",
        audience: "Ephesian Disciples, Students at the Hall of Tyrannus, and Asian Saints",
        whatWasTaught: "The Holy Ghost and true baptism; grace through faith (Ephesians 2:8); the unity of the body of Christ; the Whole Armour of God (Eph 6); letters to the Seven Churches (Rev 2:1-7).",
        whyTaught: "To anchor believers against idolatrous commercial pressure (the cult of Diana/Artemis) and occult sorcery.",
        context: "The capital of Roman Asia, where Paul reasoned daily for two years in the lecture hall of Tyrannus.",
        howAccepted: "Enormous regional harvest: all who dwelt in Asia heard the word; repentant magicians burned occult books worth 50,000 drachmas; Demetrius the silversmith incited a massive 2-hour riot in the 25,000-seat Great Theater shouting 'Great is Diana of the Ephesians!', but the church stood firm and became the apostolic hub of Asia Minor.",
        passages: data.scriptures || ["Acts 19:1-20", "Acts 19:23-41", "Ephesians 2:8-10", "Ephesians 6:10-18"]
      };
    }
    if (name.includes("rome")) {
      return {
        teacher: "The Apostle Paul & the Apostle Peter",
        audience: "Jewish and Gentile Saints at Rome, Praetorian Guards, and Imperial Inquirers",
        whatWasTaught: "Justification by faith in Jesus Christ; reconciliation of Jews and Gentiles; 'The just shall live by faith'; no condemnation to them which are in Christ Jesus (Romans 8).",
        whyTaught: "To establish doctrinal foundations for the central church of the Western Mediterranean and prepare for missions to the ends of the empire.",
        context: "The imperial capital of the Caesars, where Paul preached under house arrest and both apostles later suffered martyrdom.",
        howAccepted: "Roman Christians came out along the Appian Way as far as Appii Forum to welcome Paul; local Jewish leaders listened with divided opinions; for two years Paul preached in his rented house unhindered, converting soldiers and members of Caesar's household. Later under Nero (~64 AD), severe persecution broke out, leading to Peter and Paul's martyrdoms.",
        passages: data.scriptures || ["Romans 1:16-17", "Romans 8:31-39", "Acts 28:23-31", "Philippians 4:22"]
      };
    }
    if (name.includes("galilee") || region.includes("galilee")) {
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
    if (name.includes("antioch")) {
      return {
        teacher: "Barnabas, Saul (Paul), and the Prophet Agabus",
        audience: "The Mixed Congregation of Hellenistic Jews and Greek Believers",
        whatWasTaught: "The grace of God extended to the Gentiles; discipleship where believers were first called 'Christians' (Acts 11:26); world evangelism.",
        whyTaught: "To build a welcoming multi-ethnic church and launch the world missionary journeys into Asia Minor and Europe.",
        context: "The capital of Roman Syria along the Orontes River, the 3rd largest city of the Roman world.",
        howAccepted: "A great multitude believed and turned unto the Lord; disciples were first called Christians here; the congregation sent generous famine relief to Judean saints and, under the guidance of the Holy Ghost, commissioned Paul and Barnabas on their missionary journeys.",
        passages: data.scriptures || ["Acts 11:19-26", "Acts 13:1-4"]
      };
    }
    if (name.includes("bethany")) {
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
        teacher: "Heavenly Angels & Prophets of Israel",
        audience: "Shepherds Keeping Watch, Mary, Joseph, and the Magi",
        whatWasTaught: "The Good Tidings of Great Joy: A Saviour is born in the City of David, Christ the Lord; fulfillment of Micah 5:2.",
        whyTaught: "To herald the incarnation of the Son of God to the meek of the earth.",
        context: "Judean hill country during the imperial Roman census ordered by Caesar Augustus.",
        howAccepted: "Humble shepherds made known abroad the angelic saying, glorifying God; Persian Magi worshipped the child King with costly gifts; while paranoid King Herod slew the infants of Bethlehem in an attempt to destroy the Messiah.",
        passages: data.scriptures || ["Luke 2:8-20", "Matthew 2:1-12"]
      };
    }

    // General Fallback
    return {
      teacher: "Jesus Christ & His Apostles",
      audience: "Early Believers, Inquirers, and Synagogue Worshippers",
      whatWasTaught: "The message of the Kingdom of God, repentance, the atonement and resurrection of Christ, and righteous living.",
      whyTaught: "To establish the Church of God, gather souls to Christ, and bear witness of His gospel.",
      context: `The 1st-century New Testament world (${data.region || "Roman Empire"}).`,
      howAccepted: "Wherever the Word was preached, sincere seekers embraced the truth and gathered into house churches, often persevering through civic and familial opposition.",
      passages: data.scriptures || []
    };
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
    const matchingCity = (type === "diaspora" || type === "church")
      ? this.findCityByName(data.city || data.name)
      : null;

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
    if (this.currentTab === "archaeology") eyebrow = "1ST-CENTURY ARCHAEOLOGY & MATERIAL REMAINS";
    else if (this.currentTab === "scripture") eyebrow = "FOUNDATIONAL SCRIPTURES • KJV & MULTI-VERSION";
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
              <li><strong>Click Any Pin or City</strong> to reveal ancient geography, demographics, and biblical references.</li>
              <li><strong>Switch Map Modes</strong> via the top bar to compare Ancient Biblical Parchment with High-Res Satellite Terrain.</li>
              <li><strong>Start a Guided Tour</strong> to journey through Jesus's Ministry, Passion Week, or Paul's Travels.</li>
            </ul>
          </div>

          <!-- Growth of Christianity Showcase Card -->
          <div class="feature-card christian-growth-showcase">
            <div class="growth-showcase-header">
              <span class="growth-showcase-icon">🔥</span>
              <h3 class="growth-showcase-title">The Exponential Growth of Christianity (~30–100 AD)</h3>
            </div>
            
            <p class="growth-showcase-intro">
              The New Testament records one of the most astonishing transformations in human history: the exponential multiplication of a humble gathering in Roman Judea into a vibrant spiritual movement spanning the entire Mediterranean world within a single generation.
            </p>

            <div class="growth-heatmap-callout">
              <div class="growth-callout-header">
                <span>🔴 Interactive Growth Heatmap</span>
              </div>
              <p class="growth-callout-text">
                Click <strong>Growth Heatmap</strong> in the top layers bar and scrub the timeline. Radiant diffusion halos emerge at Pentecost (~30 AD) and swell across the Mediterranean as churches multiply from Jerusalem to Rome.
              </p>
            </div>

            <div class="demographic-stats-grid">
              <div class="demographic-stat-box stat-upper-room">
                <span class="demographic-label">Upper Room (30 AD)</span>
                <span class="demographic-value">~120 Disciples</span>
                <span class="demographic-stat-ref">Acts 1:15</span>
              </div>
              <div class="demographic-stat-box stat-pentecost">
                <span class="demographic-label">Pentecost Ingathering</span>
                <span class="demographic-value">+3,000 Souls</span>
                <span class="demographic-stat-ref">Acts 2:41</span>
              </div>
              <div class="demographic-stat-box stat-early-church">
                <span class="demographic-label">Early Jerusalem Church</span>
                <span class="demographic-value">5,000+ Men</span>
                <span class="demographic-stat-ref">Acts 4:4</span>
              </div>
              <div class="demographic-stat-box stat-empire-wide">
                <span class="demographic-label">Empire-Wide (100 AD)</span>
                <span class="demographic-value">100,000s of Saints</span>
                <span class="demographic-stat-ref">Across 40+ Hubs</span>
              </div>
            </div>

            <h4 class="growth-waves-title">
              Four Waves of Apostolic Expansion
            </h4>
            <ul class="feature-steps growth-waves-list">
              <li><strong>Wave 1 — Pentecost & Judea (30–34 AD):</strong> Endowed with the Holy Ghost, apostles bore eyewitness testimony of Christ's resurrection.</li>
              <li><strong>Wave 2 — Samaria & Syrian Antioch (34–44 AD):</strong> Scattered by persecution, disciples shared the Word beyond Jewish borders; Gentiles poured in at Antioch.</li>
              <li><strong>Wave 3 — Paul's Missionary Journeys (47–62 AD):</strong> Crossing 10,000+ miles via Roman roads and seas, Paul planted assemblies in Galatia, Macedonia, Greece, and Asia.</li>
              <li><strong>Wave 4 — Apostolic Consolidation (62–100 AD):</strong> Surviving imperial persecutions and Jerusalem's 70 AD fall, the Church matured into resilient regional networks across three continents.</li>
            </ul>
          </div>

          <div class="curated-shortcut-grid">
            <div class="tours-section-header">
              <span class="tours-header-icon">✦</span>
              <h4 style="margin:0;">Guided Tours of Jesus' Life</h4>
            </div>
            <p class="tours-section-sub">Walk where the Savior was born, taught, healed, suffered for us, and rose again triumphant.</p>
            <div class="tour-mini-cards">
              <div class="tour-mini-card tour-card-featured" data-tour-id="start-here-jesus">
                <div class="tour-icon">🕊️</div>
                <div class="tour-meta">
                  <span class="tour-name">Start Here: Where Jesus Walked</span>
                  <span class="tour-era">Simple & Welcoming for All Ages • 6 Sacred Stops</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="savior-life">
                <div class="tour-icon">🌟</div>
                <div class="tour-meta">
                  <span class="tour-name">Walk with the Savior (Core Ministry)</span>
                  <span class="tour-era">6 BC – 30 AD • 12 Sacred Stops</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="passion-week">
                <div class="tour-icon">✝️</div>
                <div class="tour-meta">
                  <span class="tour-name">Passion Week in Jerusalem</span>
                  <span class="tour-era">Spring 30 AD • 8 Sacred Stations</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="living-christ">
                <div class="tour-icon">👑</div>
                <div class="tour-meta">
                  <span class="tour-name">The Living Christ (Key Testimony Sites)</span>
                  <span class="tour-era">Heavenly Witnesses • 7 Sacred Locations</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="acts-early-church">
                <div class="tour-icon">🔥</div>
                <div class="tour-meta">
                  <span class="tour-name">Pentecost & Church Birth</span>
                  <span class="tour-era">30 AD – 47 AD • 6 Crucial Steps</span>
                </div>
              </div>
              <div class="tour-mini-card" data-tour-id="paul-journeys">
                <div class="tour-icon">⛵</div>
                <div class="tour-meta">
                  <span class="tour-name">Paul's Missionary Journeys</span>
                  <span class="tour-era">47 AD – 62 AD • 8 Key Portals</span>
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

          <!-- Cross-Atlas Discovery Card -->
          <div class="feature-card cross-atlas-card">
            <div class="atlas-card-header">
              <span class="atlas-card-icon">📖</span>
              <h4 class="atlas-card-title">Companion Scriptural Atlases</h4>
            </div>
            <p class="atlas-card-sub">Explore the sacred geography of all the standard works of scripture:</p>
            <div class="atlas-links-grid">
              <a href="https://www.interactivebibleatlas.xyz/" target="_blank" rel="noopener" class="atlas-nav-link" title="Open Old Testament Interactive Atlas">
                <span class="atlas-nav-badge">📜 Old Testament</span>
                <span class="atlas-nav-name">Old Testament Atlas</span>
                <span class="atlas-nav-arrow">↗</span>
              </a>
              <a href="https://jviola60.github.io/new-testament-geography/index.html" class="atlas-nav-link active-atlas-link" title="You are currently viewing the New Testament Atlas">
                <span class="atlas-nav-badge">✝️ New Testament</span>
                <span class="atlas-nav-name">New Testament Atlas (Current)</span>
                <span class="atlas-nav-arrow">✓</span>
              </a>
              <a href="https://jviola60.github.io/book-of-mormon-geography/" target="_blank" rel="noopener" class="atlas-nav-link" title="Open Book of Mormon Interactive Atlas">
                <span class="atlas-nav-badge">🪙 Book of Mormon</span>
                <span class="atlas-nav-name">Book of Mormon Atlas</span>
                <span class="atlas-nav-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      `;
    } else if (this.currentTab === "archaeology") {
      html = `
        <div class="archaeology-header-card">
          <div class="archaeology-header-top">
            <span class="arch-badge-tag">1ST-CENTURY BIBLICAL ARCHAEOLOGY</span>
            <div class="location-confidence-badge confidence-well-attested">
              <span>✓</span>
              <span>Material Attestation Overview</span>
            </div>
          </div>
          <p class="arch-confidence-desc">
            Archaeological discoveries across the Holy Land and Greco-Roman Mediterranean have repeatedly validated the historical and cultural setting of the New Testament Gospels and Acts.
          </p>
        </div>

        <div class="arch-section-card">
          <div class="arch-card-header">
            <span class="arch-card-icon">🏛️</span>
            <h4 class="arch-card-title">Monumental Herodian & Roman Architecture</h4>
          </div>
          <p class="arch-card-body">
            Excavations at the Western Wall, Robinson's Arch, Southern Steps of the Temple Mount, and the Roman theatre and aqueduct at Caesarea Maritima display colossal ashlar masonry matching the descriptions in Josephus and the Gospels.
          </p>
        </div>

        <div class="arch-section-card">
          <div class="arch-card-header">
            <span class="arch-card-icon">🌊</span>
            <h4 class="arch-card-title">Stepped Pilgrim Pools & Healing Waters</h4>
          </div>
          <p class="arch-card-body">
            The 2004 discovery of the monumental <strong>Pool of Siloam</strong> with its tiered stone steps and 1st-century coins, alongside the twin reservoirs and five colonnaded porches of the <strong>Pool of Bethesda</strong>, confirm the precise topographical details recorded in John 5 and John 9.
          </p>
        </div>

        <div class="arch-section-card">
          <div class="arch-card-header">
            <span class="arch-card-icon">📜</span>
            <h4 class="arch-card-title">Epigraphy & Historical Inscriptions</h4>
          </div>
          <p class="arch-card-body">
            The <strong>Pilate Stone</strong> discovered at Caesarea Maritima ('Pontius Pilatus, Prefect of Judea'), the <strong>Caiaphas Family Ossuary</strong> uncovered in Jerusalem, the <strong>Gallio Inscription</strong> at Delphi dating Paul's trial in Corinth (Acts 18), and the <strong>Politarch Inscription</strong> at Thessalonica directly confirm the historical figures named in the New Testament.
          </p>
        </div>

        <div class="arch-section-card">
          <div class="arch-card-header">
            <span class="arch-card-icon">⚖️</span>
            <h4 class="arch-card-title">3-Level Scholarly Confidence Rating System</h4>
          </div>
          <p class="arch-card-body">
            This atlas classifies biblical sites into three honest scholarly tiers:
            <br>• <strong style="color:#065F46;">Well-attested:</strong> Undisputed identification supported by inscriptions and extensive stratigraphy (e.g. Jerusalem, Capernaum, Caesarea, Rome).
            <br>• <strong style="color:#92400E;">Strong traditional identification:</strong> Ancient, venerable tradition dating to apostolic or Byzantine eras matching classical topography (e.g. Gethsemane, Bethany, Nazareth).
            <br>• <strong style="color:#0369A1;">Scholarly discussion / alternative proposals:</strong> Multiple candidate sites exist (e.g. Emmaus, Cana, Mount of Transfiguration).
          </p>
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

  // Retrieve lead scripture and Christ-centered takeaway for biblical sites, cities, events, and features
  getChristCenteredTakeaway(entity, type) {
    if (!entity) return null;
    const id = (entity.id || "").toLowerCase();
    const name = (entity.name || entity.title || "").toLowerCase();

    // 1. Jerusalem Sacred Sites & Landmarks
    if (id.includes("temple") || name.includes("temple") || id === "second-temple" || id === "temple-mount") {
      return {
        leadScripture: {
          ref: "John 2:16 • Matthew 21:14",
          verse: "Make not my Father's house an house of merchandise... And the blind and the lame came to him in the temple; and he healed them.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/21?lang=eng&id=p14#p14"
        },
        takeaway: "Jesus reclaimed the temple as His Father's holy house of prayer, refuge, and mercy, teaching that divine sanctuaries exist to draw us into God's healing presence.",
        invitation: "How can you make your worship and personal life a holy sanctuary of communion with God?"
      };
    }
    if (id.includes("gethsemane") || name.includes("gethsemane")) {
      return {
        leadScripture: {
          ref: "Luke 22:42, 44",
          verse: "Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done... and his sweat was as it were great drops of blood falling down to the ground.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/22?lang=eng&id=p42,p44#p42"
        },
        takeaway: "In this olive orchard, the Savior bore the infinite weight of all our sins, griefs, and pains out of boundless love, submitting His will completely to the Father.",
        invitation: "What burden can you lay at the Savior's feet today, trusting fully in His atoning grace?"
      };
    }
    if (id.includes("golgotha") || name.includes("golgotha") || id.includes("calvary") || name.includes("calvary") || id.includes("crucifixion")) {
      return {
        leadScripture: {
          ref: "Luke 23:34, 46 • John 19:30",
          verse: "Father, forgive them; for they know not what they do... Father, into thy hands I commend my spirit... It is finished.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/23?lang=eng&id=p34,p46#p34"
        },
        takeaway: "Upon the cross at Calvary, the Lamb of God gave His life to ransom all humanity, exemplifying unconditional mercy by pleading forgiveness for those who crucified Him.",
        invitation: "How does the Savior's forgiving love inspire you to extend grace and reconciliation to others?"
      };
    }
    if (id.includes("tomb") || name.includes("tomb") || id.includes("sepulchre") || id.includes("resurrection")) {
      return {
        leadScripture: {
          ref: "Luke 24:5–6 • 1 Corinthians 15:20",
          verse: "Why seek ye the living among the dead? He is not here, but is risen... But now is Christ risen from the dead, and become the firstfruits of them that slept.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/24?lang=eng&id=p5-p6#p5"
        },
        takeaway: "The empty garden tomb stands as the eternal witness that Jesus Christ conquered death, ensuring that every son and daughter of God will live again in resurrected glory.",
        invitation: "How does the reality of Christ's resurrection bring you peace, hope, and courage in times of loss?"
      };
    }
    if (id.includes("upper-room") || name.includes("upper room") || id.includes("cenacle") || id.includes("last-supper")) {
      return {
        leadScripture: {
          ref: "John 13:34–35 • Luke 22:19",
          verse: "A new commandment I give unto you, That ye love one another; as I have loved you... this do in remembrance of me.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/13?lang=eng&id=p34-p35#p34"
        },
        takeaway: "Here Christ instituted the holy sacrament and washed His disciples' feet, demonstrating that true discipleship and leadership are rooted in humble, loving service to others.",
        invitation: "In what practical way can you 'wash the feet' of someone in need around you this week?"
      };
    }
    if (id.includes("olives") || name.includes("olives") || id.includes("ascension")) {
      return {
        leadScripture: {
          ref: "Acts 1:11 • Matthew 24:3",
          verse: "This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/1?lang=eng&id=p11#p11"
        },
        takeaway: "From this sacred ridge Jesus taught His disciples of the last days and ascended into heaven, leaving the sure apostolic promise of His glorious Second Coming.",
        invitation: "How can you live each day more intentionally prepared to welcome the Lord?"
      };
    }
    if (id.includes("bethesda") || name.includes("bethesda")) {
      return {
        leadScripture: {
          ref: "John 5:8–9",
          verse: "Jesus saith unto him, Rise, take up thy bed, and walk. And immediately the man was made whole, and took up his bed, and walked.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/5?lang=eng&id=p8-p9#p8"
        },
        takeaway: "Jesus noticed and healed a man who had suffered for thirty-eight years without a helper, proving that the Savior's compassion reaches directly to those who feel forgotten.",
        invitation: "Who in your life might feel overlooked or alone that you can reach out to in Christ's name?"
      };
    }
    if (id.includes("siloam") || name.includes("siloam")) {
      return {
        leadScripture: {
          ref: "John 9:7, 25",
          verse: "Go, wash in the pool of Siloam... He went his way therefore, and washed, and came seeing... One thing I know, that, whereas I was blind, now I see.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/9?lang=eng&id=p7,p25#p7"
        },
        takeaway: "Through obedient action at the pool of Siloam, a blind man received sight, revealing that Jesus is the Light of the World who dispels all darkness and doubt.",
        invitation: "What step of faithful obedience is the Lord inviting you to take so your spiritual vision may be renewed?"
      };
    }
    if (id.includes("antonia") || name.includes("antonia") || id.includes("praetorium") || name.includes("praetorium") || id.includes("trial")) {
      return {
        leadScripture: {
          ref: "John 18:36–37 • Isaiah 53:5",
          verse: "My kingdom is not of this world... To this end was I born, and for this cause came I into the world, that I should bear witness unto the truth.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/18?lang=eng&id=p36-p37#p36"
        },
        takeaway: "Before the authority of imperial Rome, the Savior stood with divine majesty and meekness, bearing our scourging and reproach so we could be redeemed.",
        invitation: "How can the Savior's meek courage help you stand true to your faith when misunderstood?"
      };
    }

    // 2. Major Biblical Cities Connected to Jesus' Ministry
    if (id === "bethlehem" || name === "bethlehem") {
      return {
        leadScripture: {
          ref: "Luke 2:10–11",
          verse: "Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/2?lang=eng&id=p10-p11#p10"
        },
        takeaway: "In this humble village, God fulfilled ancient prophecy by sending His Only Begotten Son to dwell among mortals and redeem all who come unto Him.",
        invitation: "How can you make room in your heart and home for the Savior's peace this day?"
      };
    }
    if (id === "nazareth" || name === "nazareth") {
      return {
        leadScripture: {
          ref: "Luke 4:18 • Luke 2:52",
          verse: "The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted, to preach deliverance to the captives.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/4?lang=eng&id=p18#p18"
        },
        takeaway: "In the quiet hills of Nazareth, Jesus grew in wisdom and grace, showing that daily faithfulness, work, and devotion prepare us for sacred callings.",
        invitation: "In what quiet, unseen ways can you grow closer to the Father in your daily routines?"
      };
    }
    if (id === "capernaum" || name === "capernaum") {
      return {
        leadScripture: {
          ref: "Matthew 4:23 • Mark 2:10–11",
          verse: "And Jesus went about all Galilee, teaching in their synagogues, and preaching the gospel of the kingdom, and healing all manner of sickness and all manner of disease.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/4?lang=eng&id=p23#p23"
        },
        takeaway: "As the center of Jesus' Galilean ministry, Capernaum witnessed His boundless mercy in forgiving sins, restoring health, and calling disciples to follow Him.",
        invitation: "Where do you need the Savior's forgiving and healing touch in your life right now?"
      };
    }
    if (id === "jerusalem" || name === "jerusalem") {
      return {
        leadScripture: {
          ref: "John 3:16–17 • Luke 19:41–42",
          verse: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/3?lang=eng&id=p16-p17#p16"
        },
        takeaway: "In Jerusalem the Savior accomplished the greatest act of love in all eternity—suffering in Gethsemane, dying on Calvary, and rising triumphant from the tomb.",
        invitation: "How does the Savior's infinite sacrifice for you personally deepen your gratitude and love for Him?"
      };
    }
    if (id === "bethany" || name === "bethany") {
      return {
        leadScripture: {
          ref: "John 11:25–26",
          verse: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/11?lang=eng&id=p25-p26#p25"
        },
        takeaway: "Jesus found friendship and refuge in the home of Mary, Martha, and Lazarus, revealing His tender empathy for the grieving and His supreme victory over the grave.",
        invitation: "How can you turn your home into a sanctuary of peace where the Savior's Spirit loves to abide?"
      };
    }
    if (id === "emmaus" || name === "emmaus") {
      return {
        leadScripture: {
          ref: "Luke 24:32",
          verse: "And they said one to another, Did not our heart burn within us, while he talked with us by the way, and while he opened to us the scriptures?",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/24?lang=eng&id=p32#p32"
        },
        takeaway: "The resurrected Lord drew near to two sorrowing disciples, opening the scriptures until their hearts burned with spiritual clarity, comfort, and peace.",
        invitation: "When have you felt your heart burn with the quiet confirmation of the Holy Ghost as you read the scriptures?"
      };
    }
    if (id === "cana" || name === "cana") {
      return {
        leadScripture: {
          ref: "John 2:11",
          verse: "This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/2?lang=eng&id=p11#p11"
        },
        takeaway: "By turning water into wine at a wedding, Jesus blessed marriage and family joy, illustrating how His grace transforms the ordinary elements of life into the extraordinary.",
        invitation: "What ordinary aspect of your life are you willing to place into the Savior's hands to be sanctified?"
      };
    }
    if (id === "jericho" || name === "jericho") {
      return {
        leadScripture: {
          ref: "Luke 19:10 • Mark 10:52",
          verse: "For the Son of man is come to seek and to save that which was lost... Jesus said unto him, Go thy way; thy faith hath made thee whole.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/19?lang=eng&id=p10#p10"
        },
        takeaway: "In Jericho, Jesus sought out Zacchaeus in the sycamore tree and restored sight to blind Bartimaeus, demonstrating that no soul is beyond the reach of His love.",
        invitation: "Who around you might feel lost or unworthy of Christ's mercy that you can invite back with warmth?"
      };
    }
    if (id === "sychar" || name === "sychar" || id.includes("jacob-well") || name.includes("jacob's well")) {
      return {
        leadScripture: {
          ref: "John 4:14",
          verse: "Whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/4?lang=eng&id=p14#p14"
        },
        takeaway: "Overcoming ancient cultural divisions, Jesus offered living water to the Samaritan woman at the well, teaching that only His gospel can truly satisfy the human soul.",
        invitation: "In what ways do earthly pursuits leave you thirsty, and how does coming unto Christ fill you with lasting joy?"
      };
    }
    if (id.includes("caesarea-philippi") || name.includes("caesarea philippi")) {
      return {
        leadScripture: {
          ref: "Matthew 16:16, 18",
          verse: "Simon Peter answered and said, Thou art the Christ, the Son of the living God... and upon this rock I will build my church.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/16?lang=eng&id=p16,p18#p16"
        },
        takeaway: "Against the backdrop of pagan shrines at Caesarea Philippi, Peter bore testimony through personal revelation that Jesus is the Son of the Living God, the rock of our faith.",
        invitation: "How did you gain your personal testimony of Jesus Christ, and how can you nourish it today?"
      };
    }
    if (id === "bethsaida" || name === "bethsaida") {
      return {
        leadScripture: {
          ref: "Mark 8:23–25 • Luke 9:16–17",
          verse: "He took the five loaves and the two fishes, and looking up to heaven, he blessed them, and brake... and they did eat, and were all filled.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/9?lang=eng&id=p16-p17#p16"
        },
        takeaway: "Near Bethsaida, Jesus fed the five thousand and healed a blind man stage-by-stage, revealing that His grace nourishes us and clarifies our spiritual vision step by step.",
        invitation: "How has the Lord multiplied your small offerings when you have trusted Him in faith?"
      };
    }
    if (id === "nain" || name === "nain") {
      return {
        leadScripture: {
          ref: "Luke 7:13–14",
          verse: "And when the Lord saw her, he had compassion on her, and said unto her, Weep not. And he came and touched the bier... Young man, I say unto thee, Arise.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/7?lang=eng&id=p13-p14#p13"
        },
        takeaway: "Moved with tender compassion for a grieving widow, Jesus halted the funeral procession and restored her son to life, proving His power over sorrow and death.",
        invitation: "When have you felt the Savior's tender compassion during times of personal grief or distress?"
      };
    }
    if (id === "magdala" || name === "magdala") {
      return {
        leadScripture: {
          ref: "Luke 8:2 • John 20:17–18",
          verse: "Mary called Magdalene, out of whom went seven devils... Mary Magdalene came and told the disciples that she had seen the Lord.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/20?lang=eng&id=p18#p18"
        },
        takeaway: "Healed by the Savior from affliction, Mary Magdalene became a devoted disciple and was chosen as the first eyewitness to declare the Risen Lord.",
        invitation: "How has the Savior transformed your life, and how can you share your witness of Him with others?"
      };
    }
    if (id === "tiberias" || name === "tiberias") {
      return {
        leadScripture: {
          ref: "John 21:15–17",
          verse: "Jesus saith to Simon Peter, Simon, son of Jonas, lovest thou me more than these? He saith unto him, Yea, Lord; thou knowest that I love thee. He saith unto him, Feed my lambs.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/21?lang=eng&id=p15-p17#p15"
        },
        takeaway: "On the shore of the Sea of Tiberias, the resurrected Savior prepared breakfast for His disciples and gently commissioned Peter to show his love by nourishing His sheep.",
        invitation: "How can you express your love for Jesus by caring for and lifting His disciples today?"
      };
    }

    // 3. Landscape & Sacred Waters
    if (id.includes("galilee") || name.includes("sea of galilee")) {
      return {
        leadScripture: {
          ref: "Mark 4:39 • Matthew 14:27",
          verse: "And he arose, and rebuked the wind, and said unto the sea, Peace, be still... Be of good cheer; it is I; be not afraid.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/mark/4?lang=eng&id=p39#p39"
        },
        takeaway: "Upon these waters Jesus walked and commanded the raging storm to be still, reminding us that no tempest in our life is beyond His calming peace.",
        invitation: "What wind or wave in your life can you place in the Savior's hands, trusting in His words: 'Peace, be still'?"
      };
    }
    if (id.includes("jordan") || name.includes("jordan")) {
      return {
        leadScripture: {
          ref: "Matthew 3:16–17",
          verse: "And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/3?lang=eng&id=p16-p17#p16"
        },
        takeaway: "In the waters of the Jordan River, Jesus fulfilled all righteousness by being baptized, establishing the covenant gate through which all disciples enter His kingdom.",
        invitation: "How does remembering your baptismal covenants help you follow the Savior with a willing heart?"
      };
    }
    if (id.includes("transfiguration") || name.includes("transfiguration") || id.includes("hermon") || id.includes("tabor")) {
      return {
        leadScripture: {
          ref: "Matthew 17:5",
          verse: "Behold, a bright cloud overshadowed them: and behold a voice out of the cloud, which said, This is my beloved Son, in whom I am well pleased; hear ye him.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/17?lang=eng&id=p5#p5"
        },
        takeaway: "On the Mount of Transfiguration, the Father's voice bore heavenly witness of His Son, inviting all mankind to heed His divine counsel: 'Hear ye Him.'",
        invitation: "How do you quiet the noise around you each day in order to hear the voice of the Lord?"
      };
    }

    // 4. Timeline Events connected to Jesus
    if (type === "event" && (entity.category === "savior" || id.startsWith("savior-"))) {
      const scriptRef = entity.scripture || "New Testament Gospels";
      return {
        leadScripture: {
          ref: scriptRef,
          verse: entity.description || "Learn of me, and listen to my words; walk in the meekness of my Spirit, and you shall have peace in me.",
          churchLink: this.getChurchScriptureLink(scriptRef)
        },
        takeaway: `During this sacred event, the Savior revealed His divine power and love, inviting all who follow Him to have faith and walk in His light.`,
        invitation: "How does this sacred event strengthen your trust in Jesus Christ as your personal Redeemer?"
      };
    }

    // 5. Default for other Biblical Sites / Apostolic Hubs
    const scriptures = (entity.scriptures && entity.scriptures.length) ? entity.scriptures[0] : null;
    const leadRef = (scriptures && (scriptures.ref || scriptures)) || "Acts 1:8";
    return {
      leadScripture: {
        ref: leadRef,
        verse: "Ye shall be witnesses unto me both in Jerusalem, and in all Judea, and in Samaria, and unto the uttermost part of the earth.",
        churchLink: this.getChurchScriptureLink(leadRef)
      },
      takeaway: `Through the power of the Holy Ghost, the early disciples proclaimed Jesus Christ and Him crucified, testifying that He lives and saves all who turn to Him.`,
      invitation: "How can you be a faithful witness of Jesus Christ in your circles of influence today?"
    };
  }

  // Render the Christ-Centered Takeaway card at the top of place dossiers
  renderChristTakeawayCard(entity, type) {
    const takeawayData = this.getChristCenteredTakeaway(entity, type);
    if (!takeawayData) return "";

    const { leadScripture, takeaway, invitation } = takeawayData;
    const churchLink = leadScripture.churchLink || this.getChurchScriptureLink(leadScripture.ref);

    return `
      <div class="christ-takeaway-card">
        <div class="takeaway-header">
          <span class="takeaway-icon">🕊️</span>
          <span class="takeaway-lead-title">Come Unto Christ • Sacred Witness</span>
        </div>
        <div class="takeaway-lead-scripture">
          <div class="scripture-lead-ref">
            <span class="scripture-badge">Lead Scripture</span>
            <a href="${churchLink}" target="_blank" rel="noopener" class="lead-ref-link" title="Study on ChurchofJesusChrist.org">
              📖 ${leadScripture.ref} ↗
            </a>
          </div>
          <blockquote class="lead-scripture-quote">"${leadScripture.verse}"</blockquote>
        </div>
        <div class="takeaway-invitation-box">
          <p class="takeaway-text"><strong>Christ-Centered Takeaway:</strong> ${takeaway}</p>
          ${invitation ? `<p class="takeaway-invitation">💡 <em>Spiritual Reflection:</em> ${invitation}</p>` : ""}
        </div>
      </div>
    `;
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
    // ARCHAEOLOGY TAB (ALL ENTITY TYPES: SITES, CITIES, REGIONS, WATERS)
    // -------------------------------------------------------------------------
    if (this.currentTab === "archaeology") {
      const dossier = this.normalizeDossier(type, data);
      this.sidebarContent.innerHTML = this.renderArchaeologyTab(dossier, type, data);
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
            ${this.renderConfidenceBadge(data, "jerusalemSite")}
          </div>

          ${this.renderChristTakeawayCard(data, "jerusalemSite")}

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
            ${this.renderConfidenceBadge(data, "jerusalemQuarter")}
          </div>

          ${this.renderChristTakeawayCard(data, "jerusalemQuarter")}

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
            ${this.renderConfidenceBadge(data, "city")}
          </div>

          ${this.renderChristTakeawayCard(data, "city")}

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

          ${this.renderChristTakeawayCard(data, "geo")}
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
          ${this.renderChristTakeawayCard(data, "event")}

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
        // Populate modal with categorized tours
        if (tourModalBody) {
          const saviorTours = TOURS_DATA.filter(t => ["start-here-jesus", "savior-life", "passion-week", "living-christ"].includes(t.id));
          const apostolicTours = TOURS_DATA.filter(t => !["start-here-jesus", "savior-life", "passion-week", "living-christ"].includes(t.id));

          tourModalBody.innerHTML = `
            <div class="tour-modal-group">
              <div class="tour-group-header">
                <span class="tour-group-icon">✦</span>
                <span class="tour-group-title">Guided Tours of Jesus' Life & Ministry</span>
              </div>
              <p class="tour-group-sub">Walk where the Savior was born, taught, healed, suffered for us, and rose again in victory.</p>
              <div class="tour-cards-grid">
                ${saviorTours.map(tour => `
                  <div class="tour-select-card ${tour.id === 'start-here-jesus' ? 'tour-card-featured' : ''}" data-tour-id="${tour.id}">
                    <div class="tour-card-icon">${tour.icon}</div>
                    <div class="tour-card-body">
                      <span class="tour-card-title">${tour.title}</span>
                      <span class="tour-card-desc">${tour.description}</span>
                      <div class="tour-card-footer">
                        <span>${tour.eraText}</span> • <span>Click to Begin</span>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="tour-modal-group" style="margin-top: 1.25rem;">
              <div class="tour-group-header">
                <span class="tour-group-icon">⛵</span>
                <span class="tour-group-title">Apostolic Missions & Early Church</span>
              </div>
              <p class="tour-group-sub">Follow the Apostles bearing witness of the Risen Christ across the Mediterranean world.</p>
              <div class="tour-cards-grid">
                ${apostolicTours.map(tour => `
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
                `).join("")}
              </div>
            </div>
          `;

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

      // Click outside modal card to close
      tourModal.addEventListener("click", (e) => {
        if (e.target === tourModal) {
          tourModal.style.display = "none";
        }
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
    if (stop.year !== undefined && window.app && window.app.timeline) {
      window.app.timeline.setYear(stop.year);
    }

    // Fly camera
    if (window.app && window.app.map) {
      window.app.map.flyToLocation(stop.lat, stop.lng, stop.zoom || 12);
    }

    // Open detail in sidebar (Event, Jerusalem Site, or City)
    if (stop.eventId && typeof TIMELINE_EVENTS !== "undefined") {
      const event = TIMELINE_EVENTS.find(e => e.id === stop.eventId);
      if (event) {
        this.showEventDetail(event);
        return;
      }
    }
    if (stop.siteId && typeof JERUSALEM_SITES !== "undefined") {
      const site = JERUSALEM_SITES.find(s => s.id === stop.siteId);
      if (site) {
        this.showJerusalemSiteDetail(site);
        return;
      }
    }
    if (stop.cityId) {
      const city = this.findCityByName(stop.cityId);
      if (city) {
        this.showCityDetail(city);
        return;
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

  // =========================================================================
  // LOCATION CONFIDENCE BADGES & ARCHAEOLOGY TAB
  // =========================================================================

  renderConfidenceBadge(entity, type) {
    if (typeof getArchaeologyForEntity !== "function") return "";
    const arch = getArchaeologyForEntity(entity, type);
    if (!arch || !arch.confidence) return "";

    let badgeClass = "confidence-well-attested";
    let icon = "✓";
    if (arch.confidence === "Strong traditional identification") {
      badgeClass = "confidence-traditional";
      icon = "🏛️";
    } else if (arch.confidence === "Scholarly discussion / alternative proposals exist") {
      badgeClass = "confidence-discussion";
      icon = "⚖️";
    }

    return `
      <span class="location-confidence-badge ${badgeClass}" title="${arch.confidenceDesc}">
        <span>${icon}</span>
        <span>${arch.confidence}</span>
      </span>
    `;
  }

  renderArchaeologyTab(dossier, type, entity) {
    const arch = (typeof getArchaeologyForEntity === "function")
      ? getArchaeologyForEntity(entity || dossier, type)
      : null;

    if (!arch) {
      return `
        <div class="feature-card">
          <h3>1st-Century Archaeological Overview</h3>
          <p>${dossier.overview || "Continuous excavations across the Mediterranean and Levant reveal rich 1st-century Roman and Second Temple Jewish material remains."}</p>
        </div>
      `;
    }

    let badgeClass = "confidence-well-attested";
    let badgeIcon = "✓";
    if (arch.confidence === "Strong traditional identification") {
      badgeClass = "confidence-traditional";
      badgeIcon = "🏛️";
    } else if (arch.confidence === "Scholarly discussion / alternative proposals exist") {
      badgeClass = "confidence-discussion";
      badgeIcon = "⚖️";
    }

    return `
      <div class="archaeology-header-card">
        <div class="archaeology-header-top">
          <span class="arch-badge-tag">1ST-CENTURY MATERIAL EVIDENCE</span>
          <div class="location-confidence-badge ${badgeClass}">
            <span>${badgeIcon}</span>
            <span>${arch.confidence}</span>
          </div>
        </div>
        <p class="arch-confidence-desc">${arch.confidenceDesc}</p>
      </div>

      <div class="arch-section-card">
        <div class="arch-card-header">
          <span class="arch-card-icon">⛏️</span>
          <h4 class="arch-card-title">Physical Findings & Excavations</h4>
        </div>
        <p class="arch-card-body">${arch.findings}</p>
      </div>

      <div class="arch-section-card">
        <div class="arch-card-header">
          <span class="arch-card-icon">⏳</span>
          <h4 class="arch-card-title">1st-Century Chronological Consistency</h4>
        </div>
        <p class="arch-card-body">${arch.periodConsistency}</p>
      </div>

      <div class="arch-section-card">
        <div class="arch-card-header">
          <span class="arch-card-icon">📜</span>
          <h4 class="arch-card-title">Scholarly Consensus & Classical Records</h4>
        </div>
        <p class="arch-card-body">${arch.scholarlyConsensus}</p>
      </div>
    `;
  }

  // =========================================================================
  // TRAVEL & DISTANCE CALCULATOR TOOL (Matching Book of Mormon Atlas)
  // =========================================================================

  setupDistanceTool() {
    const modal = document.getElementById("distanceModal");
    const toolBtn = document.getElementById("distanceToolBtn");
    const closeBtn = document.getElementById("closeDistanceModalBtn");
    const originSelect = document.getElementById("distOriginSelect");
    const destSelect = document.getElementById("distDestSelect");
    const swapBtn = document.getElementById("distSwapBtn");
    const viewMapBtn = document.getElementById("viewDistanceOnMapBtn");

    if (!modal) return;

    if (toolBtn) {
      toolBtn.addEventListener("click", () => {
        modal.classList.add("show");
        const toolsMenu = document.getElementById("toolsDropdownMenu");
        if (toolsMenu) toolsMenu.classList.remove("open");
        if (originSelect && (!originSelect.value || !destSelect.value)) {
          // Default selection: Nazareth to Bethlehem
          originSelect.value = "city:nazareth";
          destSelect.value = "city:bethlehem";
          this.updateDistanceCalculation();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });

    // Populate dropdowns with cities and sacred sites
    if (originSelect && destSelect && originSelect.options.length === 0) {
      const populate = (sel) => {
        sel.innerHTML = "";
        
        // Holy Land Cities
        const hlCities = this.citiesList()
          .filter(c => ["Galilee", "Judea", "Samaria", "Decapolis", "Perea"].includes(c.region))
          .sort((a, b) => a.name.localeCompare(b.name));
        const grpHoly = document.createElement("optgroup");
        grpHoly.label = "📍 Holy Land (Galilee, Judea, Samaria)";
        hlCities.forEach(c => {
          const opt = document.createElement("option");
          opt.value = `city:${c.id}`;
          opt.textContent = `${c.name} (${c.region})`;
          grpHoly.appendChild(opt);
        });
        sel.appendChild(grpHoly);

        // Jerusalem Sites
        if (typeof JERUSALEM_SITES !== "undefined" && JERUSALEM_SITES.length) {
          const grpJer = document.createElement("optgroup");
          grpJer.label = "🏛️ Jerusalem Sacred Sites";
          JERUSALEM_SITES.forEach(s => {
            const opt = document.createElement("option");
            opt.value = `site:${s.id}`;
            opt.textContent = `${s.name} (Jerusalem)`;
            grpJer.appendChild(opt);
          });
          sel.appendChild(grpJer);
        }

        // Mediterranean & Roman Empire Cities
        const medCities = this.citiesList()
          .filter(c => !["Galilee", "Judea", "Samaria", "Decapolis", "Perea"].includes(c.region))
          .sort((a, b) => a.name.localeCompare(b.name));
        const grpMed = document.createElement("optgroup");
        grpMed.label = "🌍 Mediterranean & Apostolic Hubs";
        medCities.forEach(c => {
          const opt = document.createElement("option");
          opt.value = `city:${c.id}`;
          opt.textContent = `${c.name} (${c.region})`;
          grpMed.appendChild(opt);
        });
        sel.appendChild(grpMed);
      };

      populate(originSelect);
      populate(destSelect);

      originSelect.value = "city:nazareth";
      destSelect.value = "city:bethlehem";
    }

    if (originSelect && destSelect) {
      originSelect.addEventListener("change", () => this.updateDistanceCalculation());
      destSelect.addEventListener("change", () => this.updateDistanceCalculation());
    }

    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        const temp = originSelect.value;
        originSelect.value = destSelect.value;
        destSelect.value = temp;
        this.updateDistanceCalculation();
      });
    }

    // Curated Journey Preset Buttons
    document.querySelectorAll(".preset-journey-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const originKey = btn.dataset.origin;
        const destKey = btn.dataset.dest;

        const findVal = (key) => {
          const opt = Array.from(originSelect.options).find(o => o.value.endsWith(`:${key}`) || o.value.toLowerCase().includes(key));
          return opt ? opt.value : null;
        };

        const oVal = findVal(originKey);
        const dVal = findVal(destKey);
        if (oVal) originSelect.value = oVal;
        if (dVal) destSelect.value = dVal;
        this.updateDistanceCalculation();
      });
    });

    // Show Route on Map Button
    if (viewMapBtn) {
      viewMapBtn.addEventListener("click", () => {
        const originCoords = this.getCoordsForSelector(originSelect.value);
        const destCoords = this.getCoordsForSelector(destSelect.value);
        if (!originCoords || !destCoords) return;

        modal.classList.remove("show");

        const oName = originSelect.options[originSelect.selectedIndex].textContent.split(" (")[0];
        const dName = destSelect.options[destSelect.selectedIndex].textContent.split(" (")[0];

        const airMiles = this.getHaversineDistanceMiles(originCoords.lat, originCoords.lng, destCoords.lat, destCoords.lng);
        const roadMiles = Math.round(airMiles * 1.25);
        const daysWalk = Math.max(1, Math.round(roadMiles / 20));

        const text = `Distance: ~${roadMiles} road miles (${Math.round(roadMiles * 1.609)} km) • ~${daysWalk} ${daysWalk === 1 ? "day" : "days"} ancient foot travel.`;

        if (window.app && window.app.map) {
          window.app.map.showDistanceRoute(
            originCoords.lat, originCoords.lng,
            destCoords.lat, destCoords.lng,
            `${oName} ➔ ${dName}`,
            text
          );
        }
      });
    }

    this.updateDistanceCalculation();
  }

  getCoordsForSelector(val) {
    if (!val) return null;
    const [type, id] = val.split(":");
    if (type === "city") {
      const city = this.citiesList().find(c => c.id === id);
      if (city) return { lat: city.lat, lng: city.lng, name: city.name };
    } else if (type === "site") {
      const site = typeof JERUSALEM_SITES !== "undefined" && JERUSALEM_SITES.find(s => s.id === id);
      if (site) return { lat: site.lat, lng: site.lng, name: site.name };
    }
    return null;
  }

  getHaversineDistanceMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  updateDistanceCalculation() {
    const originSelect = document.getElementById("distOriginSelect");
    const destSelect = document.getElementById("distDestSelect");
    if (!originSelect || !destSelect) return;

    const oVal = originSelect.value;
    const dVal = destSelect.value;
    const originCoords = this.getCoordsForSelector(oVal);
    const destCoords = this.getCoordsForSelector(dVal);

    if (!originCoords || !destCoords) return;

    const airMiles = this.getHaversineDistanceMiles(originCoords.lat, originCoords.lng, destCoords.lat, destCoords.lng);
    const airKm = Math.round(airMiles * 1.60934);
    const roadMiles = Math.round(airMiles * 1.25);
    const romanMiles = Math.round(roadMiles / 0.92);

    let daysWalking = Math.max(1, Math.round(roadMiles / 20));
    let daysCourier = Math.max(1, Math.round(roadMiles / 52));

    const airMilesEl = document.getElementById("distAirMiles");
    const airKmEl = document.getElementById("distAirKm");
    const roadMilesEl = document.getElementById("distRoadMiles");
    const romanPassuumEl = document.getElementById("distRomanPassuum");
    const walkingTimeEl = document.getElementById("distWalkingTime");
    const courierTimeEl = document.getElementById("distCourierTime");
    const seaBox = document.getElementById("distSeaVoyageBox");
    const seaDesc = document.getElementById("distSeaVoyageDesc");
    const contextEl = document.getElementById("distHistoricalContext");

    if (airMilesEl) airMilesEl.textContent = `${Math.round(airMiles)} mi`;
    if (airKmEl) airKmEl.textContent = `${airKm} km`;
    if (roadMilesEl) roadMilesEl.textContent = `~${roadMiles} mi`;
    if (romanPassuumEl) romanPassuumEl.textContent = `~${romanMiles} Roman miles (mille passus)`;
    
    if (walkingTimeEl) {
      if (roadMiles <= 5) {
        walkingTimeEl.textContent = "< 2 hours";
      } else if (roadMiles <= 15) {
        walkingTimeEl.textContent = "1/2 to 1 day";
      } else {
        walkingTimeEl.textContent = `~${daysWalking} ${daysWalking === 1 ? "day" : "days"}`;
      }
    }

    if (courierTimeEl) {
      if (roadMiles <= 25) {
        courierTimeEl.textContent = "Same day";
      } else {
        courierTimeEl.textContent = `~${daysCourier} ${daysCourier === 1 ? "day" : "days"}`;
      }
    }

    // Detect if this journey typically crossed the Mediterranean Sea
    const seaKeywords = ["rome", "corinth", "athens", "philippi", "thessalonica", "ephesus", "alexandria", "cyprus", "patmos", "crete", "malta"];
    const isSeaJourney = airMiles > 120 && (
      seaKeywords.some(k => oVal.includes(k)) || 
      seaKeywords.some(k => dVal.includes(k))
    );

    if (seaBox && seaDesc) {
      if (isSeaJourney) {
        seaBox.style.display = "flex";
        const sailingDays = Math.max(2, Math.round(airMiles / 75));
        seaDesc.textContent = `Maritime crossing: ~${sailingDays}–${Math.round(sailingDays * 1.5)} days under favorable wind (~4–6 knots), avoiding hazardous winter storms (Acts 27).`;
      } else {
        seaBox.style.display = "none";
      }
    }

    if (contextEl) {
      const oName = originCoords.name;
      const dName = destCoords.name;
      let note = `Traveling from ${oName} to ${dName} covers approximately ${roadMiles} road miles along 1st-century Roman and regional tracks.`;

      if ((oName.includes("Jerusalem") && dName.includes("Jericho")) || (oName.includes("Jericho") && dName.includes("Jerusalem"))) {
        note = `The Jerusalem–Jericho road plunges 3,300 feet over just 18 miles through the barren Judean desert. Renowned in antiquity for steep switchbacks, blinding heat, and predatory bandits, this is the historic setting of the Parable of the Good Samaritan (Luke 10:30).`;
      } else if ((oName.includes("Nazareth") && dName.includes("Bethlehem")) || (oName.includes("Bethlehem") && dName.includes("Nazareth"))) {
        note = `Joseph and Mary's journey for the Roman census required traversing ~85–90 miles, likely following the Jordan River valley route around Samaria to avoid steep central ridges, enduring 4 to 5 arduous days on foot with pack animals (Luke 2:4).`;
      } else if (oName.includes("Rome") || dName.includes("Rome")) {
        note = `Voyages to the imperial capital of Rome typically combined Mediterranean grain freighters and the paved Via Appia. Because ancient ships could not easily sail into contrary prevailing westerlies, sea journeys took weeks and were suspended during stormy winter months (mare clausum, Nov–Feb; Acts 28:11).`;
      } else if ((oName.includes("Capernaum") && dName.includes("Caesarea Philippi")) || (oName.includes("Caesarea Philippi") && dName.includes("Capernaum"))) {
        note = `Jesus and the disciples ascended ~30 miles north along the upper Jordan into the foothills of Mount Hermon, a rigorous 1.5-to-2-day hike to the pagan grottoes of Pan where Peter bore his testimony: 'Thou art the Christ' (Matthew 16:16).`;
      }
      contextEl.innerHTML = `<p style="margin: 0; line-height: 1.45;">💡 <strong>1st-Century Context:</strong> ${note}</p>`;
    }
  }
}
