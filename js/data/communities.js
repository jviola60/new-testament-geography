/**
 * Historical Data for Jewish Diaspora Settlements and the Exponential Multiplication
 * of Early Christian Communities (~6 BC - 100 AD)
 */
const COMMUNITIES_DATA = {
  // Jewish Diaspora Settlements across the Roman Empire
  diasporaSettlements: [
    {
      id: "diaspora-alexandria",
      city: "Alexandria",
      region: "Egypt",
      lat: 31.2001,
      lng: 29.9187,
      estimatedPopulation: "150,000 – 200,000 Jews",
      established: "~300 BC",
      synagogues: "Great Basilica Synagogue (Diapleuston) + dozens of local proseuchai",
      history: "Occupied two entire civic quarters (Delta and Beta). Translators of the Hebrew Tanakh into the Greek Septuagint (LXX). Home to Philo Judaeus.",
      scriptureRole: "Source of Hellenistic Jewish learning; hometown of the eloquent preacher Apollos (Acts 18:24)."
    },
    {
      id: "diaspora-antioch",
      city: "Antioch",
      region: "Syria",
      lat: 36.2021,
      lng: 36.1606,
      estimatedPopulation: "40,000 – 60,000 Jews",
      established: "~300 BC by Seleucus I",
      synagogues: "Multiple synagogues; Jewish community enjoyed full Hellenistic citizen rights",
      history: "Possessed sacred bronze offerings presented by Antiochus Epiphanes. Many Gentile God-fearers attended synagogue services.",
      scriptureRole: "Became the springboard where Hellenistic Jewish disciples first reached Greek Gentiles with the Gospel (Acts 11:19-26)."
    },
    {
      id: "diaspora-rome",
      city: "Rome",
      region: "Italia",
      lat: 41.9028,
      lng: 12.4964,
      estimatedPopulation: "40,000 – 50,000 Jews",
      established: "~160 BC (Maccabean treaties)",
      synagogues: "At least 11 identified synagogues (e.g., Augustenses, Agrippenses, Suburenses)",
      history: "Existed primarily in the Trastevere district across the Tiber. Expelled by Claudius in 49 AD ('over the instigator Chrestus') but quickly returned.",
      scriptureRole: "Aquila and Priscilla fled Rome to Corinth (Acts 18:2); Paul addressed the extensive Jewish leadership upon arriving in Rome (Acts 28:17)."
    },
    {
      id: "diaspora-babylon",
      city: "Babylon / Mesopotamia",
      region: "Parthia",
      lat: 32.5422,
      lng: 44.4211,
      estimatedPopulation: "250,000+ Jews",
      established: "586 BC (Babylonian Exile)",
      synagogues: "Vast scholarly academies and ancient synagogues (Nehardea, Nisibis)",
      history: "The largest single demographic concentration of Jews outside Judea, living beyond the Roman frontier under Parthian rule.",
      scriptureRole: "Parthians, Medes, and Elamites present at Pentecost (Acts 2:9); Peter sent greetings from 'the church that is at Babylon' (1 Peter 5:13)."
    },
    {
      id: "diaspora-cyrene",
      city: "Cyrene",
      region: "North Africa (Libya)",
      lat: 32.8272,
      lng: 21.8592,
      estimatedPopulation: "30,000 – 40,000 Jews",
      established: "~300 BC under Ptolemy I",
      synagogues: "Major city synagogue with extensive civic land holdings",
      history: "Strabo noted that the inhabitants of Cyrene were divided into four classes, one of which was the Jews.",
      scriptureRole: "Simon of Cyrene compelled to carry the cross; Cyrenian Jews founded the church in Antioch (Acts 11:20)."
    },
    {
      id: "diaspora-damascus",
      city: "Damascus",
      region: "Syria",
      lat: 33.5138,
      lng: 36.2765,
      estimatedPopulation: "20,000 – 30,000 Jews",
      established: "Antiquity",
      synagogues: "Numerous synagogues throughout the city (Acts 9:2)",
      history: "Josephus states that almost all the married women of Damascus were addicted to the Jewish religion.",
      scriptureRole: "Saul requested letters from the High Priest to extradite Christians from Damascus synagogues back to Jerusalem (Acts 9:1-2)."
    },
    {
      id: "diaspora-sardis",
      city: "Sardis",
      region: "Asia",
      lat: 38.4883,
      lng: 28.0400,
      estimatedPopulation: "15,000 Jews",
      established: "~500 BC (Sepharad / Obadiah 1:20)",
      synagogues: "Monumental synagogue adjoining the Roman bath-gymnasium complex",
      history: "Unusually prominent and wealthy Jewish community recognized with royal charters by Antiochus the Great and Roman decrees.",
      scriptureRole: "Archaeological testimony to deep diaspora integration in Asia Minor."
    },
    {
      id: "diaspora-corinth",
      city: "Corinth",
      region: "Achaia (Greece)",
      lat: 37.9056,
      lng: 22.8797,
      estimatedPopulation: "10,000 – 15,000 Jews",
      established: "Rebuilt 44 BC",
      synagogues: "Synagogue near the Lechaion Road",
      history: "Cosmopolitan mercantile center attracting Jewish traders between the Aegean and Ionian seas.",
      scriptureRole: "Paul reasoned in the synagogue every Sabbath. When opposed, he moved next door to the house of Titius Justus (Acts 18:4-7)."
    },
    {
      id: "diaspora-ephesus",
      city: "Ephesus",
      region: "Asia",
      lat: 37.9400,
      lng: 27.3414,
      estimatedPopulation: "20,000 Jews",
      established: "Ptolemaic / Seleucid period",
      synagogues: "Central synagogue on the harbor road",
      history: "Granted military exemption and religious autonomy by Roman magistrates.",
      scriptureRole: "Paul preached boldly for three months in the synagogue before withdrawing disciples to the School of Tyrannus (Acts 19:8-9)."
    }
  ],

  // Chronological Expansion and Multiplication of Christian Churches (30 – 100 AD)
  churchesMultiplication: [
    {
      city: "Jerusalem",
      foundedYear: 30,
      region: "Judea",
      lat: 31.7767,
      lng: 35.2345,
      founders: "Peter, John, and the Twelve Apostles",
      growthMilestone: "3,000 converts on Pentecost (Acts 2:41), rapidly multiplying to over 5,000 men (Acts 4:4) and tens of thousands (Acts 21:20).",
      significance: "Mother church of all Christendom. Center of apostolic governance until dispersion and destruction in 70 AD."
    },
    {
      city: "Samaria (Sychar & Sebaste)",
      foundedYear: 34,
      region: "Samaria",
      lat: 32.2770,
      lng: 35.1910,
      founders: "Philip the Evangelist, confirmed by Peter and John",
      growthMilestone: "Great multitude believed with one accord; Simon the Sorcerer confronted (Acts 8:4-17).",
      significance: "First expansion beyond Judean ethnic boundaries, fulfilling Acts 1:8."
    },
    {
      city: "Damascus",
      foundedYear: 35,
      region: "Syria",
      lat: 33.5138,
      lng: 36.2765,
      founders: "Hellenistic disciples fleeing persecution following Stephen's martyrdom; Ananias",
      growthMilestone: "House churches established; Saul preached Christ immediately in the synagogues (Acts 9:20).",
      significance: "Crucial Syrian outpost that preserved early disciples."
    },
    {
      city: "Caesarea Maritima",
      foundedYear: 38,
      region: "Judea (Coast)",
      lat: 32.5011,
      lng: 34.8925,
      founders: "Philip the Evangelist, Peter",
      growthMilestone: "Centurion Cornelius and his entire household receive the Holy Ghost and are baptized (Acts 10).",
      significance: "The door of faith officially opened to the Gentiles."
    },
    {
      city: "Antioch",
      foundedYear: 40,
      region: "Syria",
      lat: 36.2021,
      lng: 36.1606,
      founders: "Men of Cyprus and Cyrene, Barnabas, Saul",
      growthMilestone: "A great number believed and turned unto the Lord; disciples first called Christians here (Acts 11:21-26).",
      significance: "International headquarters for foreign missions; funded famine relief for Judea."
    },
    {
      city: "Alexandria",
      foundedYear: 42,
      region: "Egypt",
      lat: 31.2001,
      lng: 29.9187,
      founders: "John Mark (according to Eusebius / Church Tradition)",
      growthMilestone: "Rapid growth among Greek-speaking Jews and Egyptians; founded Catechetical School.",
      significance: "Cornerstone of North African Christianity."
    },
    {
      city: "Salamis & Paphos",
      foundedYear: 47,
      region: "Cyprus",
      lat: 34.7556,
      lng: 32.4097,
      founders: "Paul, Barnabas, John Mark",
      growthMilestone: "Churches established along the southern and eastern coast.",
      significance: "Proconsul Sergius Paulus brought under Christian influence."
    },
    {
      city: "Pisidian Antioch",
      foundedYear: 48,
      region: "Galatia",
      lat: 38.3075,
      lng: 31.1897,
      founders: "Paul and Barnabas",
      growthMilestone: "Whole city gathered to hear the word of God (Acts 13:44).",
      significance: "Foundational church of Southern Galatia."
    },
    {
      city: "Iconium, Lystra & Derbe",
      foundedYear: 48,
      region: "Galatia",
      lat: 37.5750,
      lng: 32.2139,
      founders: "Paul and Barnabas",
      growthMilestone: "Elders ordained in every congregation (Acts 14:23).",
      significance: "Hometown of Timothy; addressed in the Epistle to the Galatians."
    },
    {
      city: "Philippi",
      foundedYear: 50,
      region: "Macedonia",
      lat: 41.0133,
      lng: 24.2858,
      founders: "Paul, Silas, Timothy, Luke",
      growthMilestone: "Lydia's house church, Philippian jailer's family (Acts 16).",
      significance: "First Christian congregation on European soil."
    },
    {
      city: "Thessalonica & Berea",
      foundedYear: 50,
      region: "Macedonia",
      lat: 40.6401,
      lng: 22.9444,
      founders: "Paul, Silas, Timothy",
      growthMilestone: "Consisting of devout Greeks, chief women, and Bereans (Acts 17).",
      significance: "Model churches whose faith sounded forth throughout Macedonia and Achaia."
    },
    {
      city: "Corinth & Cenchreae",
      foundedYear: 51,
      region: "Achaia (Greece)",
      lat: 37.9056,
      lng: 22.8797,
      founders: "Paul, Aquila, Priscilla, Silas, Timothy",
      growthMilestone: "Vast congregation of Gentiles and Jews; 'I have much people in this city' (Acts 18:10).",
      significance: "Cosmopolitan powerhouse; recipient of 1 & 2 Corinthians."
    },
    {
      city: "Ephesus",
      foundedYear: 53,
      region: "Asia",
      lat: 37.9400,
      lng: 27.3414,
      founders: "Paul, Aquila, Priscilla, Apollos",
      growthMilestone: "All who dwelt in Asia heard the word of the Lord, both Jews and Greeks (Acts 19:10).",
      significance: "Apostolic center of Asia Minor; home to John, Timothy, and the Ephesian epistle."
    },
    {
      city: "Colossae, Laodicea & Hierapolis",
      foundedYear: 55,
      region: "Asia",
      lat: 37.8344,
      lng: 29.1083,
      founders: "Epaphras, Philemon",
      growthMilestone: "Network of house churches in the Lycus Valley.",
      significance: "Recipient of Colossians and Philemon."
    },
    {
      city: "Rome",
      foundedYear: 45,
      region: "Italia",
      lat: 41.9028,
      lng: 12.4964,
      founders: "Pilgrims from Pentecost (Acts 2:10), later bolstered by Aquila, Priscilla, Peter, and Paul",
      growthMilestone: "Numerous house churches across the imperial capital whose faith was 'spoken of throughout the whole world' (Romans 1:8).",
      significance: "Endured Neronian persecution (64 AD); became principal Western apostolic seat."
    },
    {
      city: "Seven Churches of Asia (Smyrna, Pergamum, Thyatira, Sardis, Philadelphia)",
      foundedYear: 55,
      region: "Asia",
      lat: 38.6,
      lng: 27.8,
      founders: "Disciples of Paul and the Apostle John",
      growthMilestone: "Established in key commercial centers of western Asia Minor.",
      significance: "Direct recipients of the prophetic letters in Revelation chapters 2 & 3 (~95 AD)."
    },
    {
      city: "Patmos (Apostle John's Exile)",
      foundedYear: 95,
      region: "Aegean Sea",
      lat: 37.3090,
      lng: 26.5460,
      founders: "The Apostle John (the Beloved / the Revelator)",
      growthMilestone: "John was in the isle called Patmos 'for the word of God, and for the testimony of Jesus Christ' (Revelation 1:9). The Cave of the Apocalypse is later Christian memory, not named in the text.",
      significance: "Penal exile island where the glorified Savior unveiled His cosmic victory, messages to the Seven Churches, and vision of the New Jerusalem."
    }
  ],

  // Estimated Empire-wide Christian population growth curve
  growthMetrics: [
    { year: -6, believers: 0, label: "Pre-Nativity" },
    { year: 30, believers: 3000, label: "Pentecost in Jerusalem" },
    { year: 35, believers: 8000, label: "Judea & Samaria" },
    { year: 45, believers: 25000, label: "Antioch & Levant" },
    { year: 55, believers: 60000, label: "Paul's Journeys (Greece & Asia)" },
    { year: 65, believers: 120000, label: "Rome & Empire-wide" },
    { year: 70, believers: 160000, label: "Fall of Jerusalem (Dispersal)" },
    { year: 100, believers: 300000, label: "Close of Apostolic Age" }
  ]
};
