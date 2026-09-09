/**
 * Roman Provinces, Tetrarchies, and Biblical Regional Boundaries
 * Circa 6 BC - 100 AD
 */
const REGIONS_DATA = {
  regions: [
    {
      id: "judea",
      name: "Judea",
      capital: "Jerusalem",
      governor: "Herod the Great (-4 BC), Archelaus (-4 to 6 AD), Roman Prefects (Pontius Pilate 26–36 AD)",
      description: "The historical heartland of the Jewish nation, home to the Temple at Jerusalem, Bethlehem, and Jericho.",
      bounds: [[31.3, 34.7], [32.1, 35.5]],
      color: "#92400E"
    },
    {
      id: "galilee",
      name: "Galilee",
      capital: "Sepphoris / Tiberias",
      governor: "Herod Antipas (4 BC – 39 AD)",
      description: "Northern region where Jesus was raised (Nazareth) and carried out the majority of His public ministry around the Sea of Galilee.",
      bounds: [[32.5, 35.1], [33.1, 35.7]],
      color: "#D97706"
    },
    {
      id: "samaria",
      name: "Samaria",
      capital: "Sebaste (Samaria)",
      governor: "Roman Province of Judea",
      description: "Region situated between Judea and Galilee. The Samaritan woman met the Savior at Jacob's Well near Sychar (John 4).",
      bounds: [[32.0, 35.0], [32.5, 35.5]],
      color: "#854D0E"
    },
    {
      id: "decapolis",
      name: "The Decapolis",
      capital: "Scythopolis / Gadara",
      governor: "Roman League of Ten Hellenistic Cities",
      description: "A confederation of ten Greco-Roman cities east and south of the Sea of Galilee where Jesus healed many.",
      bounds: [[32.1, 35.6], [32.9, 36.3]],
      color: "#65A30D"
    },
    {
      id: "perea",
      name: "Perea",
      capital: "Machaerus",
      governor: "Herod Antipas (4 BC – 39 AD)",
      description: "The Jewish territory east of the Jordan River where Jesus frequently taught during His final journey to Jerusalem.",
      bounds: [[31.5, 35.5], [32.3, 36.0]],
      color: "#CA8A04"
    },
    {
      id: "syria",
      name: "Syria",
      capital: "Antioch on the Orontes",
      governor: "Imperial Roman Legate",
      description: "Vast Roman province. Antioch became the cradle of gentile Christianity and launching pad for Paul's missionary journeys.",
      bounds: [[33.0, 35.0], [37.5, 38.0]],
      color: "#B45309"
    },
    {
      id: "asia",
      name: "Asia Proconsularis",
      capital: "Ephesus",
      governor: "Senatorial Proconsul",
      description: "Western Anatolia, rich and influential. Center of Paul's extended ministry and home to the Seven Churches of Revelation.",
      bounds: [[37.0, 26.5], [40.0, 30.5]],
      color: "#C2410C"
    },
    {
      id: "macedonia",
      name: "Macedonia",
      capital: "Thessalonica",
      governor: "Roman Proconsul",
      description: "Northern Greece where Paul entered Europe after the 'Macedonian Call' (Philippi, Thessalonica, Berea).",
      bounds: [[40.0, 21.0], [42.0, 25.5]],
      color: "#0369A1"
    },
    {
      id: "achaia",
      name: "Achaia (Greece)",
      capital: "Corinth",
      governor: "Roman Proconsul (Gallio in 51 AD)",
      description: "Southern Greece, encompassing cultural Athens and the commercial crossroads of Corinth.",
      bounds: [[36.5, 21.5], [39.0, 24.5]],
      color: "#1D4ED8"
    },
    {
      id: "italia",
      name: "Italia & Rome",
      capital: "Rome",
      governor: "Emperor / Senate",
      description: "The imperial capital of the Roman Empire, where Paul and Peter were martyred under Nero (~64–67 AD).",
      bounds: [[40.5, 11.5], [43.0, 15.5]],
      color: "#991B1B"
    },
    {
      id: "egypt",
      name: "Aegyptus (Egypt)",
      capital: "Alexandria",
      governor: "Imperial Prefect",
      description: "Safe haven for the Holy Family during Herod's decree. Alexandria hosted the largest Jewish diaspora community of antiquity.",
      bounds: [[30.0, 29.0], [32.0, 33.0]],
      color: "#B45309"
    },
    {
      id: "cyprus",
      name: "Cyprus",
      capital: "Paphos",
      governor: "Sergius Paulus (Proconsul)",
      description: "Island home of Barnabas and the first major stop of Paul's First Missionary Journey.",
      bounds: [[34.5, 32.0], [35.5, 34.5]],
      color: "#0F766E"
    }
  ],

  // Camera Presets for Quick Focus Buttons
  cameraPresets: {
    "holy-land": { center: [32.1, 35.3], zoom: 9 },
    "galilee": { center: [32.85, 35.55], zoom: 11 },
    "jerusalem": { center: [31.7767, 35.2345], zoom: 14 },
    "mediterranean": { center: [36.5, 27.5], zoom: 5 },
    "asia-minor": { center: [38.5, 28.5], zoom: 7 },
    "greece": { center: [39.2, 23.0], zoom: 7 },
    "rome": { center: [41.9, 13.5], zoom: 7 },
    "egypt": { center: [31.2, 30.5], zoom: 8 }
  }
};
