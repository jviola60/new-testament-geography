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
          window.app.map.setMapStyle(style);

          if (style === "satellite") {
            if (mapStyleIcon) mapStyleIcon.textContent = "🛰️";
            if (mapStyleText) mapStyleText.textContent = "Satellite";
          } else if (style === "modern") {
            if (mapStyleIcon) mapStyleIcon.textContent = "🗺️";
            if (mapStyleText) mapStyleText.textContent = "Modern";
          } else {
            if (mapStyleIcon) mapStyleIcon.textContent = "📜";
            if (mapStyleText) mapStyleText.textContent = "Parchment";
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
          window.app.map.focusRegion(regionKey);
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

    // Search Cities
    CITIES_DATA.forEach(city => {
      if (
        city.name.toLowerCase().includes(q) ||
        city.ancientName.toLowerCase().includes(q) ||
        city.region.toLowerCase().includes(q) ||
        city.significance.toLowerCase().includes(q)
      ) {
        results.push({ type: "city", item: city, title: city.name, subtitle: `${city.region} • ${city.ancientName}`, badge: "City" });
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
    if (res.type === "city") {
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
    }
  }

  // =========================================================================
  // DETAIL VIEWS (Cities, Events, Churches, Diaspora, Journeys)
  // =========================================================================

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

  // Render Tabs Content based on Active Item and Selected Tab
  renderActiveItemTabs() {
    if (!this.currentActiveItem) return;
    const { type, data } = this.currentActiveItem;
    let html = "";

    if (type === "city") {
      if (this.currentTab === "overview") {
        html = `
          <div class="city-detail-badge-row">
            <span class="city-badge badge-province">${data.region}</span>
            ${data.hasSynagogue ? '<span class="city-badge badge-synagogue">Synagogue</span>' : ''}
            ${data.hasChurch ? '<span class="city-badge badge-church">Christian Church</span>' : ''}
          </div>

          <div class="history-block">
            <h4>Historical & Scriptural Significance</h4>
            <p>${data.significance}</p>
          </div>

          <div class="demographic-stats-grid">
            <div class="demographic-stat-box">
              <span class="demographic-label">Ancient Name</span>
              <span class="demographic-value" style="font-size:0.95rem;">${data.ancientName}</span>
            </div>
            <div class="demographic-stat-box">
              <span class="demographic-label">Est. Population</span>
              <span class="demographic-value" style="font-size:0.95rem;">${data.population}</span>
            </div>
          </div>

          ${data.epistles && data.epistles.length > 0 ? `
            <div>
              <h4 style="font-family:var(--font-serif-title); font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.4rem;">Connected New Testament Epistles</h4>
              <div class="epistle-tag-list">
                ${data.epistles.map(e => `<span class="epistle-tag">📜 ${e}</span>`).join("")}
              </div>
            </div>
          ` : ''}
        `;
      } else if (this.currentTab === "scripture") {
        html = `
          <div class="history-block" style="margin-bottom:1rem;">
            <h4>Scriptural Role in the Early Church</h4>
            <p>${data.christianChurchInfo}</p>
          </div>
          <div class="history-block">
            <h4>Jewish Community & Scripture Connections</h4>
            <p>${data.jewishDiasporaInfo}</p>
          </div>
        `;
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card">
            <h3>Demographics & Communities</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;"><strong>Jewish Diaspora:</strong> ${data.jewishDiasporaInfo}</p>
            <p style="font-size:0.85rem; color:var(--text-secondary);"><strong>Christian Disciples:</strong> ${data.christianChurchInfo}</p>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block">
            <h4>Timeline Position</h4>
            <p>Active across the entire New Testament era (~6 BC – 100 AD).</p>
          </div>
        `;
      }
    } else if (type === "event") {
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
        `;
      } else if (this.currentTab === "scripture") {
        html = `
          ${data.scriptures.map(s => `
            <div class="scripture-verse-card">
              <div class="scripture-citation">📖 ${s.ref}</div>
              <div class="scripture-body">"${s.text}"</div>
            </div>
          `).join("")}
        `;
      } else if (this.currentTab === "people") {
        html = `
          <div class="feature-card">
            <h3>Biblical Witnesses</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.45;">
              Participants in this milestone include the Savior Jesus Christ, His Apostles, disciples, and local witnesses recorded across the Gospels and Acts.
            </p>
          </div>
        `;
      } else if (this.currentTab === "chronology") {
        html = `
          <div class="history-block">
            <h4>Era Chronicle</h4>
            <p><strong>Era:</strong> ${data.era}</p>
            <p><strong>Year:</strong> ${window.app.timeline.formatYear(data.year)}</p>
          </div>
        `;
      }
    } else if (type === "church") {
      html = `
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
    } else if (type === "diaspora") {
      html = `
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
    } else if (type === "journey") {
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
