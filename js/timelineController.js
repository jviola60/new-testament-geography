/**
 * Timeline Controller - Scrubber engine, playback loops,
 * BC/AD calendar conversions, and era detection (~6 BC - 100 AD).
 */
class TimelineController {
  constructor() {
    this.currentYear = 100;
    this.isPlaying = false;
    this.playbackSpeed = 1; // 1x, 2x, 5x
    this.timer = null;

    // Elements
    this.slider = null;
    this.displayYear = null;
    this.displaySeason = null;
    this.playBtn = null;
    this.playIcon = null;
    this.pauseIcon = null;
    this.eraTabs = [];

    // Era Definitions
    this.eras = [
      {
        id: "nativity",
        start: -6,
        end: -4,
        tag: "ERA I • 6 BC – 4 BC",
        title: "Nativity & Infancy of Jesus",
        desc: "Roman census under Caesar Augustus; birth in Bethlehem, angelic witness, and flight to Egypt.",
        season: "Roman Census • Bethlehem • Nativity"
      },
      {
        id: "nazareth",
        start: -4,
        end: 26,
        tag: "ERA II • 4 BC – 26 AD",
        title: "Silent Years in Nazareth",
        desc: "Jesus grows in wisdom and stature in Galilee; visits the Temple at age twelve.",
        season: "Nazareth • Carpenter's Youth • Temple Visit"
      },
      {
        id: "early-ministry",
        start: 26,
        end: 29,
        tag: "ERA III • 26 AD – 29 AD",
        title: "Baptism & Early Ministry",
        desc: "Baptism by John in the Jordan River, temptation in wilderness, miracle at Cana, and Nicodemus.",
        season: "Jordan River Baptism • Sychar • Early Signs"
      },
      {
        id: "galilee-passion",
        start: 29,
        end: 30,
        tag: "ERA IV • 29 AD – 30 AD",
        title: "Galilean Ministry & Passion Week",
        desc: "Sermon on the Mount, miracles at Sea of Galilee, Transfiguration, Atonement in Gethsemane, Crucifixion & Resurrection.",
        season: "Sermon on Mount • Gethsemane • Resurrection"
      },
      {
        id: "pentecost",
        start: 30,
        end: 47,
        tag: "ERA V • 30 AD – 47 AD",
        title: "Pentecost & the Early Church",
        desc: "Outpouring of the Holy Ghost, 3,000 baptized, martyrdom of Stephen, and Saul's conversion on Damascus road.",
        season: "Pentecost • Dispersal • Gentiles at Antioch"
      },
      {
        id: "missionary",
        start: 47,
        end: 57,
        tag: "ERA VI • 47 AD – 57 AD",
        title: "Paul's Missionary Journeys",
        desc: "Three epic apostolic journeys through Cyprus, Galatia, Macedonia, Greece, and Ephesus planting churches.",
        season: "Philippi • Mars Hill • Ephesus Revival"
      },
      {
        id: "rome-70ad",
        start: 58,
        end: 70,
        tag: "ERA VII • 58 AD – 70 AD",
        title: "Rome, Persecution & Fall of Jerusalem",
        desc: "Paul's voyage and shipwreck at Malta, Roman house arrest, Nero's persecutions, and Titus destroying Jerusalem in 70 AD.",
        season: "Shipwreck • Rome House Arrest • 70 AD Fall"
      },
      {
        id: "apostolic-age",
        start: 70,
        end: 100,
        tag: "ERA VIII • 70 AD – 100 AD",
        title: "Close of the Apostolic Era",
        desc: "Spread of the Four Gospels, John's apocalyptic exile on the Isle of Patmos, and letters to the Seven Churches.",
        season: "Gospel Writings • Patmos • Revelation"
      }
    ];
  }

  init() {
    this.slider = document.getElementById("timelineSlider");
    this.displayYear = document.getElementById("displayYear");
    this.displaySeason = document.getElementById("displaySeason");
    this.playBtn = document.getElementById("playPauseBtn");
    this.playIcon = document.getElementById("playIcon");
    this.pauseIcon = document.getElementById("pauseIcon");
    this.eraTabs = document.querySelectorAll(".era-tab");

    this.bindEvents();
    this.setYear(100);
  }

  bindEvents() {
    // Slider Drag & Input
    if (this.slider) {
      this.slider.addEventListener("input", (e) => {
        this.setYear(parseFloat(e.target.value), false);
      });
    }

    // Play / Pause Toggle
    if (this.playBtn) {
      this.playBtn.addEventListener("click", () => this.togglePlay());
    }

    // Step Back & Forward
    const stepBackBtn = document.getElementById("stepBackBtn");
    if (stepBackBtn) {
      stepBackBtn.addEventListener("click", () => this.stepYear(-1));
    }

    const stepFwdBtn = document.getElementById("stepForwardBtn");
    if (stepFwdBtn) {
      stepFwdBtn.addEventListener("click", () => this.stepYear(1));
    }

    // Speed Selector Buttons
    document.querySelectorAll(".speed-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.playbackSpeed = parseFloat(btn.dataset.speed || 1);
        if (this.isPlaying) {
          this.pause();
          this.play();
        }
      });
    });

    // Era Tab Clicks
    this.eraTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const startYear = parseFloat(tab.dataset.startYear);
        this.setYear(startYear);
      });
    });

    // Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      // Ignore if typing in search input
      if (document.activeElement && document.activeElement.tagName === "INPUT" && document.activeElement.type === "text") {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === "ArrowLeft") {
        this.stepYear(-1);
      } else if (e.code === "ArrowRight") {
        this.stepYear(1);
      }
    });
  }

  // Format Year Number into Historical BC / AD notation
  formatYear(year) {
    const roundY = Math.round(year);
    if (roundY < 0) {
      return `${Math.abs(roundY)} BC`;
    } else if (roundY === 0) {
      return `1 BC / 1 AD`;
    } else {
      return `${roundY} AD`;
    }
  }

  // Find Active Era
  getEraForYear(year) {
    for (let i = 0; i < this.eras.length; i++) {
      const era = this.eras[i];
      if (year >= era.start && year <= era.end) {
        return era;
      }
    }
    return this.eras[this.eras.length - 1];
  }

  setYear(year, updateSlider = true) {
    this.currentYear = Math.max(-6, Math.min(100, year));

    if (updateSlider && this.slider) {
      this.slider.value = this.currentYear;
    }

    // Format display
    const formattedStr = this.formatYear(this.currentYear);
    if (this.displayYear) {
      this.displayYear.textContent = formattedStr;
    }

    // Detect Era
    const era = this.getEraForYear(this.currentYear);
    if (this.displaySeason) {
      this.displaySeason.textContent = era.season;
    }

    // Update Floating Era Badge on Map
    const eraTag = document.getElementById("eraTag");
    const eraTitle = document.getElementById("eraTitle");
    const eraDesc = document.getElementById("eraDesc");
    if (eraTag && eraTitle && eraDesc) {
      eraTag.textContent = era.tag;
      eraTitle.textContent = era.title;
      eraDesc.textContent = era.desc;
    }

    // Sync Era Tabs
    this.eraTabs.forEach(tab => {
      const start = parseFloat(tab.dataset.startYear);
      const end = parseFloat(tab.dataset.endYear);
      if (this.currentYear >= start && this.currentYear <= end) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Notify Map Controller
    if (window.app && window.app.map) {
      window.app.map.updateTimelineYear(this.currentYear);
    }

    // Notify UI Controller
    if (window.app && window.app.ui) {
      window.app.ui.onTimelineYearChanged(this.currentYear, era);
    }
  }

  stepYear(amount) {
    this.setYear(this.currentYear + amount);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    if (this.playIcon) this.playIcon.style.display = "none";
    if (this.pauseIcon) this.pauseIcon.style.display = "block";

    // If at the end, restart from beginning
    if (this.currentYear >= 100) {
      this.setYear(-6);
    }

    const intervalMs = Math.max(80, 400 / this.playbackSpeed);

    this.timer = setInterval(() => {
      const stepIncrement = 0.5;
      if (this.currentYear + stepIncrement > 100) {
        this.setYear(100);
        this.pause();
      } else {
        this.setYear(this.currentYear + stepIncrement);
      }
    }, intervalMs);
  }

  pause() {
    this.isPlaying = false;
    if (this.playIcon) this.playIcon.style.display = "block";
    if (this.pauseIcon) this.pauseIcon.style.display = "none";

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
