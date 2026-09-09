/**
 * The Missionary Journeys of the Apostle Paul & Luke's Travelogues in Acts
 * Includes GPS waypoints, polyline routes, scripture citations, dates, and significance.
 */
const MISSIONARY_JOURNEYS = [
  {
    id: "paul-journey-1",
    name: "Paul's 1st Missionary Journey",
    years: "47 – 49 AD",
    startYear: 47,
    endYear: 49,
    color: "#16A34A",
    companions: "Barnabas, John Mark",
    scriptures: "Acts 13:1 – 14:28",
    description: "Commissioned by the Holy Ghost through the church at Antioch in Syria, Paul and Barnabas sail to Cyprus, traverse the island, and preach across southern Galatia (Pisidian Antioch, Iconium, Lystra, Derbe), planting churches among the Gentiles.",
    stops: [
      { name: "Antioch (Syria)", lat: 36.2021, lng: 36.1606, note: "Set apart with fasting and laying on of hands (Acts 13:1-3)" },
      { name: "Seleucia Pieria", lat: 36.1242, lng: 35.9189, note: "Port from which they sailed to Cyprus" },
      { name: "Salamis (Cyprus)", lat: 35.1847, lng: 33.9017, note: "Preached the word in Jewish synagogues" },
      { name: "Paphos (Cyprus)", lat: 34.7556, lng: 32.4097, note: "Sergius Paulus believes; Elymas struck blind" },
      { name: "Perga (Pamphylia)", lat: 36.9614, lng: 30.8528, note: "John Mark departs and returns to Jerusalem" },
      { name: "Pisidian Antioch", lat: 38.3075, lng: 31.1897, note: "Synagogue sermon; Gentiles beg to hear next Sabbath" },
      { name: "Iconium", lat: 37.8746, lng: 32.4932, note: "Great multitude believes; flee plot to stone them" },
      { name: "Lystra", lat: 37.5750, lng: 32.2139, note: "Lame man healed; Paul stoned and survives" },
      { name: "Derbe", lat: 37.3486, lng: 33.1597, note: "Preached gospel and taught many disciples" },
      { name: "Lystra / Iconium / Antioch", lat: 37.8746, lng: 32.4932, note: "Revisiting churches, ordaining elders in every city" },
      { name: "Attalia", lat: 36.8841, lng: 30.7056, note: "Port where they sailed back to Syria" },
      { name: "Antioch (Syria)", lat: 36.2021, lng: 36.1606, note: "Rehearsed all that God had done with them" }
    ],
    path: [
      [36.2021, 36.1606], [36.1242, 35.9189], [35.1847, 33.9017], [34.7556, 32.4097],
      [36.9614, 30.8528], [38.3075, 31.1897], [37.8746, 32.4932], [37.5750, 32.2139],
      [37.3486, 33.1597], [37.5750, 32.2139], [37.8746, 32.4932], [38.3075, 31.1897],
      [36.9614, 30.8528], [36.8841, 30.7056], [36.1242, 35.9189], [36.2021, 36.1606]
    ]
  },
  {
    id: "paul-journey-2",
    name: "Paul's 2nd Missionary Journey",
    years: "49 – 52 AD",
    startYear: 49,
    endYear: 52,
    color: "#EA580C",
    companions: "Silas, Timothy, Luke",
    scriptures: "Acts 15:36 – 18:22",
    description: "Following the Council of Jerusalem, Paul journeys overland through Cilicia and Galatia, enlists Timothy at Lystra, receives the 'Macedonian Call' in Troas, and establishes the earliest European churches in Philippi, Thessalonica, Berea, and Corinth.",
    stops: [
      { name: "Antioch (Syria)", lat: 36.2021, lng: 36.1606, note: "Departing with Silas through Syria and Cilicia" },
      { name: "Tarsus", lat: 36.9177, lng: 34.8953, note: "Strengthening the churches through the Cilician Gates" },
      { name: "Derbe & Lystra", lat: 37.5750, lng: 32.2139, note: "Timothy joins the apostolic company" },
      { name: "Troas", lat: 39.7564, lng: 26.1558, note: "Night vision: 'Come over into Macedonia, and help us'" },
      { name: "Philippi", lat: 41.0133, lng: 24.2858, note: "Lydia converted; midnight jail praise & earthquake" },
      { name: "Thessalonica", lat: 40.6401, lng: 22.9444, note: "Reasoned from scriptures for 3 Sabbaths; uproar" },
      { name: "Berea", lat: 40.5236, lng: 22.2039, note: "Noble believers searched scriptures daily" },
      { name: "Athens", lat: 37.9838, lng: 23.7275, note: "Areopagus sermon to Stoics and Epicureans on Unknown God" },
      { name: "Corinth", lat: 37.9056, lng: 22.8797, note: "Paul stays 18 months tentmaking with Aquila & Priscilla" },
      { name: "Ephesus", lat: 37.9400, lng: 27.3414, note: "Brief visit to synagogue; leaves Aquila & Priscilla" },
      { name: "Caesarea & Jerusalem", lat: 31.7767, lng: 35.2345, note: "Greets the Jerusalem church before returning to Antioch" }
    ],
    path: [
      [36.2021, 36.1606], [36.9177, 34.8953], [37.3486, 33.1597], [37.5750, 32.2139],
      [37.8746, 32.4932], [38.3075, 31.1897], [39.7564, 26.1558], [40.9372, 24.4128],
      [41.0133, 24.2858], [40.8242, 23.8475], [40.6401, 22.9444], [40.5236, 22.2039],
      [37.9838, 23.7275], [37.9056, 22.8797], [37.9053, 22.9903], [37.9400, 27.3414],
      [32.5011, 34.8925], [31.7767, 35.2345], [36.2021, 36.1606]
    ]
  },
  {
    id: "paul-journey-3",
    name: "Paul's 3rd Missionary Journey",
    years: "53 – 58 AD",
    startYear: 53,
    endYear: 58,
    color: "#0284C7",
    companions: "Timothy, Titus, Luke, Erastus",
    scriptures: "Acts 18:23 – 21:17",
    description: "Paul spends nearly three years ministering in Ephesus, where the Gospel transforms the entire province of Asia. He later revisits Macedonia and Greece, pens Galatians, Romans, and Corinthians, and bids an affectionate farewell to the Ephesian elders at Miletus.",
    stops: [
      { name: "Antioch (Syria)", lat: 36.2021, lng: 36.1606, note: "Departs to strengthen disciples in Galatia & Phrygia" },
      { name: "Ephesus", lat: 37.9400, lng: 27.3414, note: "Teaches daily in School of Tyrannus; Artemis riot" },
      { name: "Troas & Macedonia", lat: 40.6401, lng: 22.9444, note: "Revisiting Philippi and Thessalonica; writes 2 Cor" },
      { name: "Corinth (Greece)", lat: 37.9056, lng: 22.8797, note: "Stays three months; writes the Epistle to the Romans" },
      { name: "Troas", lat: 39.7564, lng: 26.1558, note: "Eutychus raised from death after falling from window" },
      { name: "Miletus", lat: 37.5311, lng: 27.2789, note: "Tearful farewell address to Ephesian elders" },
      { name: "Tyre & Ptolemais", lat: 33.2708, lng: 35.1961, note: "Believers warn Paul not to enter Jerusalem" },
      { name: "Caesarea", lat: 32.5011, lng: 34.8925, note: "Agabus binds hands with Paul's girdle prophesying arrest" },
      { name: "Jerusalem", lat: 31.7767, lng: 35.2345, note: "Paul welcomed by James; arrested on Temple Mount" }
    ],
    path: [
      [36.2021, 36.1606], [37.3486, 33.1597], [37.8746, 32.4932], [37.9400, 27.3414],
      [39.7564, 26.1558], [41.0133, 24.2858], [40.6401, 22.9444], [37.9056, 22.8797],
      [40.6401, 22.9444], [41.0133, 24.2858], [39.7564, 26.1558], [37.5311, 27.2789],
      [36.4349, 28.2175], [33.2708, 35.1961], [32.5011, 34.8925], [31.7767, 35.2345]
    ]
  },
  {
    id: "paul-journey-4",
    name: "Paul's Voyage to Rome (Under Arrest)",
    years: "59 – 62 AD",
    startYear: 59,
    endYear: 62,
    color: "#475569",
    companions: "Luke, Aristarchus, Centurion Julius",
    scriptures: "Acts 27:1 – 28:31",
    description: "Appealing unto Caesar after two years of imprisonment in Caesarea, Paul is transported by sea to Rome. Despite a catastrophic two-week tempest and shipwreck at Malta, all 276 souls are spared, and Paul arrives in Rome to preach freely under house arrest.",
    stops: [
      { name: "Caesarea", lat: 32.5011, lng: 34.8925, note: "Boarding ship under Centurion Julius (Acts 27:1)" },
      { name: "Sidon", lat: 33.5631, lng: 35.3689, note: "Julius permits Paul to refresh himself with friends" },
      { name: "Myra (Lycia)", lat: 36.2442, lng: 29.9856, note: "Transferred to Alexandrian grain ship sailing for Italy" },
      { name: "Cnidus", lat: 36.6858, lng: 27.3750, note: "Sailing slowly against adverse winds" },
      { name: "Fair Havens (Crete)", lat: 34.9333, lng: 24.8167, note: "Paul warns of danger; captain presses forward" },
      { name: "Clauda", lat: 34.8417, lng: 24.0833, note: "Caught in the violent northeaster storm Euroclydon" },
      { name: "Malta (Melita)", lat: 35.9375, lng: 14.3754, note: "Shipwreck; all safe; viper bite harmless; heals islanders" },
      { name: "Syracuse (Sicily)", lat: 37.0755, lng: 15.2866, note: "Stayed three days on Alexandrian ship Castor & Pollux" },
      { name: "Rhegium", lat: 38.1113, lng: 15.6473, note: "Waited for favorable south wind" },
      { name: "Puteoli", lat: 40.8222, lng: 14.1206, note: "Disembarked in Italy; found brethren and tarried 7 days" },
      { name: "Appii Forum & Three Taverns", lat: 41.4886, lng: 12.9864, note: "Brethren from Rome travel out to meet Paul" },
      { name: "Rome", lat: 41.9028, lng: 12.4964, note: "Two years in rented house preaching kingdom of God (Acts 28)" }
    ],
    path: [
      [32.5011, 34.8925], [33.5631, 35.3689], [35.5, 34.0], [36.2442, 29.9856],
      [36.6858, 27.3750], [34.9333, 24.8167], [34.8417, 24.0833], [35.9375, 14.3754],
      [37.0755, 15.2866], [38.1113, 15.6473], [40.8222, 14.1206], [41.4886, 12.9864],
      [41.6047, 12.7933], [41.9028, 12.4964]
    ]
  }
];
