/**
 * 1st-Century Jerusalem Topography, Geographic Quarters, Ancient Walls, and Gates (~6 BC - 100 AD)
 * Provides vector polygons, elevation data, archaeological boundaries, KJV scriptures,
 * Roman political context, and historical overviews for every geographic sector of Jerusalem.
 */

const JERUSALEM_GEOGRAPHY = {
  // Major Topographical & Urban Quarters
  quarters: [
    {
      id: "area-temple-mount",
      name: "The Temple Mount & Mount Moriah",
      ancientName: "Har HaBayit / Mons Moriah",
      elevation: "740 m (2,428 ft)",
      category: "sacred-precinct",
      color: "#D97706",
      fillColor: "#FDE68A",
      fillOpacity: 0.35,
      coordinates: [
        [31.7762, 35.2345], // Southwest corner (Robinson's Arch)
        [31.7798, 35.2342], // Northwest corner (Antonia Fortress)
        [31.7797, 35.2372], // Northeast corner (Stork Tower)
        [31.7757, 35.2370], // Southeast corner (Pinnacle of Temple)
        [31.7758, 35.2356]  // Southern Double & Triple Gates
      ],
      summary: "The colossal rectangular sacred esplanade expanded by Herod the Great, forming the religious and symbolic epicenter of the Jewish world.",
      overview: "Mount Moriah was the site of Abraham's offering of Isaac and Solomon's First Temple. Herod the Great doubled the platform's surface area by building massive ashlar retaining walls—some stones weighing over 400 tons (such as the Master Course). The complex encompassed the Court of the Gentiles, the Royal Stoa with 162 Corinthian columns, and the sacred inner sanctuary with the Holy of Holies.",
      topography: "An elevated limestone plateau bordered on the east by the precipitous Kidron Valley (plunging 100 meters) and on the west by the Tyropoeon Valley. The Temple dominated the skyline, visible for miles across Judea.",
      scriptures: [
        {
          ref: "Matthew 24:1-2",
          text: "And Jesus went out, and departed from the temple: and his disciples came to him for to shew him the buildings of the temple. And Jesus said unto them, See ye not all these things? verily I say unto you, There shall not be left here one stone upon another, that shall not be thrown down.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/24?lang=eng#1"
        },
        {
          ref: "John 10:22-23",
          text: "And it was at Jerusalem the feast of the dedication, and it was winter. And Jesus walked in the temple in Solomon's porch.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/10?lang=eng#22"
        },
        {
          ref: "Luke 2:46-49",
          text: "And it came to pass, that after three days they found him in the temple, sitting in the midst of the doctors, both hearing them, and asking them questions... And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/2?lang=eng#46"
        }
      ],
      peopleAndChurch: "The twelve-year-old Jesus with doctors of the law; Simeon and Anna; Jesus overturning moneychangers' tables; Peter and John healing at the Beautiful Gate; thousands of early Christian converts meeting daily in Solomon's Porch (Acts 5:12).",
      politicalInsights: "The Roman Prefect stationed in Caesarea kept custody of the High Priest's holy garments inside the adjoining Antonia Fortress. During Passover, the garrison watched over the esplanade from battlements to crush nationalistic riots against Roman rule.",
      eraChronology: "20 BC: Herodian reconstruction commences; ~8 AD: boy Jesus in the Temple (Luke 2:46–49); ~27–30 AD: Passion Week teachings of Jesus (Matthew 21:12–13; John 2:13–17); after Pentecost: apostolic preaching (Acts 3:1–16; 5:12)—not the Lord discoursing in 30–35 AD; 70 AD: incinerated and razed by Roman Legions under Titus."
    },
    {
      id: "area-mount-of-olives",
      name: "The Mount of Olives",
      ancientName: "Har HaZeitim / Mons Oliveti",
      elevation: "818 m (2,684 ft)",
      category: "mountain-ridge",
      color: "#16A34A",
      fillColor: "#BBF7D0",
      fillOpacity: 0.32,
      coordinates: [
        [31.7880, 35.2420],
        [31.7860, 35.2480],
        [31.7760, 35.2500],
        [31.7700, 35.2470],
        [31.7720, 35.2400],
        [31.7810, 35.2395]
      ],
      summary: "The prominent limestone ridge rising east of Jerusalem across the Kidron Valley, crowned with olive orchards and ancient pilgrim trails.",
      overview: "Towering nearly 100 meters above the Temple Mount, the Mount of Olives provides an unobstructed panoramic view over the holy city. Along its western slopes lies the Garden of Gethsemane. Further east along the ridge lie Bethphage and Bethany. Jesus spent His evenings here during Passover, gave the Olivet Discourse regarding the Last Days, and ascended into heaven from its summit.",
      topography: "A 3.5 km long north-south ridge consisting of three main peaks (Mount Scopus, Viri Galilaei, and the Ascension summit). The descent to Jerusalem is very steep, dropping sharply into the Kidron gorge.",
      scriptures: [
        {
          ref: "Luke 22:39-44",
          text: "And he came out, and went, as he was wont, to the mount of Olives; and his disciples also followed him... And he was withdrawn from them about a stone's cast, and kneeled down, and prayed, Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/22?lang=eng#39"
        },
        {
          ref: "Acts 1:9-12",
          text: "And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight... Then returned they unto Jerusalem from the mount called Olivet, which is from Jerusalem a sabbath day's journey.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/1?lang=eng#9"
        },
        {
          ref: "Luke 19:37-41",
          text: "And when he was come nigh, even now at the descent of the mount of Olives, the whole multitude of the disciples began to rejoice and praise God... And when he was come near, he beheld the city, and wept over it.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/19?lang=eng#37"
        }
      ],
      peopleAndChurch: "The Savior Jesus Christ, Peter, James, John, the strengthening angel in Gethsemane, Judas and the armed band, the Eleven Apostles witnessing the Ascension, two angels in white apparel.",
      politicalInsights: "Old Testament prophecy (Zechariah 14:4) proclaimed that the Messiah's feet would stand upon the Mount of Olives. In 70 AD, the Roman 10th Legion (Legio X Fretensis) established its primary assault camp here to launch siege projectiles into the Temple Mount.",
      eraChronology: "Spring 30 AD: Triumphal Descent, Gethsemane Agony, and the Ascension; 70 AD: Headquarters of Roman catapult bombardment."
    },
    {
      id: "area-kidron-valley",
      name: "The Kidron Valley (Brook Cedron)",
      ancientName: "Nahal Qidron / Valley of Jehoshaphat",
      elevation: "650 m – 700 m",
      category: "valley-ravine",
      color: "#0D9488",
      fillColor: "#99F6E4",
      fillOpacity: 0.35,
      coordinates: [
        [31.7850, 35.2385],
        [31.7850, 35.2415],
        [31.7780, 35.2410],
        [31.7700, 35.2390],
        [31.7660, 35.2380],
        [31.7660, 35.2360],
        [31.7750, 35.2375],
        [31.7810, 35.2380]
      ],
      summary: "The deep, rugged ravine hugging the eastern walls of Jerusalem, separating Mount Moriah from the Mount of Olives.",
      overview: "The Kidron Valley was the natural defensive barrier shielding Jerusalem's eastern flank. During winter and spring rains, a seasonal brook flowed along its rocky bottom down to the Dead Sea. The valley was lined with monumental rock-hewn tombs (such as the Tomb of Zechariah and Absalom's Pillar). Jesus crossed this valley on Thursday night of Passion Week to reach Gethsemane.",
      topography: "Extremely steep V-shaped ravine with rocky cliffs on both sides. From the southeastern Temple corner (the 'Pinnacle of the Temple'), the sheer drop to the valley floor was over 45 meters.",
      scriptures: [
        {
          ref: "John 18:1-2",
          text: "When Jesus had spoken these words, he went forth with his disciples over the brook Cedron, where was a garden, into the which he entered, and his disciples. And Judas also, which betrayed him, knew the place: for Jesus ofttimes resorted thither with his disciples.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/18?lang=eng#1"
        },
        {
          ref: "Acts 7:58",
          text: "And cast him out of the city, and stoned him: and the witnesses laid down their clothes at a young man's feet, whose name was Saul.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/7?lang=eng#58"
        }
      ],
      peopleAndChurch: "Jesus and the Eleven disciples walking in moonlight on Passover night; temple police carrying torches; Stephen dragged down the northeastern slope near the Lion's Gate to be stoned.",
      politicalInsights: "Blood from the tens of thousands of Passover lambs sacrificed on the Temple altar flowed through channels cut in the rock directly into the Kidron Valley, turning the stream red—a vivid symbol of Christ's blood shed in Gethsemane just across the stream.",
      eraChronology: "Passed repeatedly during Jesus's ministry; site of Stephen's martyrdom (~34 AD); eastern perimeter breached during the siege of 70 AD."
    },
    {
      id: "area-valley-of-hinnom",
      name: "Valley of Hinnom (Gehenna)",
      ancientName: "Gei Ben Hinnom / Gehenna",
      elevation: "670 m – 710 m",
      category: "valley-ravine",
      color: "#B91C1C",
      fillColor: "#FCA5A5",
      fillOpacity: 0.35,
      coordinates: [
        [31.7760, 35.2230],
        [31.7760, 35.2255],
        [31.7700, 35.2260],
        [31.7670, 35.2310],
        [31.7660, 35.2365],
        [31.7645, 35.2360],
        [31.7655, 35.2290],
        [31.7690, 35.2240]
      ],
      summary: "The deep southwestern gorge wrapping around Mount Zion, historically associated with fire and used by Christ as a vivid metaphor for Gehenna.",
      overview: "Forming the southern and western boundary of ancient Jerusalem, the Valley of Hinnom was infamous in Old Testament times as Tophet—the site where idolatrous kings sacrificed children in fire to Molech (2 Kings 23:10). By the 1st century, it had become the city refuse dump where fires burned continually. Jesus drew upon this notorious physical geography when warning of 'hell fire' (literally <em>Gehenna</em>).",
      topography: "A formidable natural trench that made an assault on Jerusalem's southern and western walls virtually impossible. It converges with the Kidron Valley south of the City of David.",
      scriptures: [
        {
          ref: "Matthew 5:22",
          text: "But I say unto you, That whosoever is angry with his brother without a cause shall be in danger of the judgment... but whosoever shall say, Thou fool, shall be in danger of hell fire [Gehenna].",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/5?lang=eng#22"
        },
        {
          ref: "Matthew 10:28",
          text: "And fear not them which kill the body, but are not able to kill the soul: but rather fear him which is able to destroy both soul and body in hell [Gehenna].",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/10?lang=eng#28"
        },
        {
          ref: "Matthew 27:7-8",
          text: "And they took counsel, and bought with them the potter's field, to bury strangers in. Wherefore that field was called, The field of blood, unto this day.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/27?lang=eng#7"
        }
      ],
      peopleAndChurch: "Judas Iscariot (potter's field / Akeldama bought with the 30 pieces of silver on the southern slopes); outcasts, lepers, and travelers.",
      politicalInsights: "Akeldama (the Field of Blood) was purchased by the chief priests using blood money returned by Judas. It lay on the southern cliffside of Hinnom, where rich clay soil was harvested for pottery.",
      eraChronology: "Active throughout the biblical era; burial ground for foreigners established in 30 AD."
    },
    {
      id: "area-upper-city",
      name: "The Upper City & Mount Zion",
      ancientName: "HaIr HaElyona / Upper Agora",
      elevation: "770 m (2,526 ft)",
      category: "urban-quarter",
      color: "#7C3AED",
      fillColor: "#DDD6FE",
      fillOpacity: 0.32,
      coordinates: [
        [31.7760, 35.2265], // Northwest near Herod's Palace
        [31.7762, 35.2315], // Northeast near Xystus / Tyropoeon
        [31.7710, 35.2320], // Southeast near Essene Gate
        [31.7705, 35.2270]  // Southwest Mount Zion crest
      ],
      summary: "The affluent aristocratic hilltop quarter of Jerusalem, home to the High Priests, Herod's Palace, and the Upper Room.",
      overview: "Mount Zion, or the Upper City, was the most elevated residential sector of Jerusalem. Archaeological excavations revealed multi-level Herodian mansions adorned with ornate mosaics, frescoed walls, reception halls, and private ritual immersion pools (Mikva'ot). Here stood the luxurious Palace of Caiaphas where Jesus was interrogated, and the furnished Upper Room where the Last Supper and Pentecost took place.",
      topography: "A broad, elevated western plateau overlooking the Temple Mount. Connected to the Temple via a grand viaduct across the Tyropoeon Valley (Wilson's Arch).",
      scriptures: [
        {
          ref: "Luke 22:11-13",
          text: "The Master saith unto thee, Where is the guestchamber, where I shall eat the passover with my disciples? And he shall shew you a large upper room furnished: there make ready. And they went, and found as he had said unto them: and they made ready the passover.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/luke/22?lang=eng#11"
        },
        {
          ref: "Matthew 26:57-58",
          text: "And they that had laid hold on Jesus led him away to Caiaphas the high priest, where the scribes and the elders were assembled. But Peter followed him afar off unto the high priest's palace, and went in, and sat with the servants, to see the end.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/26?lang=eng#57"
        },
        {
          ref: "Acts 2:1-4",
          text: "And when the day of Pentecost was fully come, they were all with one accord in one place... And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/2?lang=eng#1"
        }
      ],
      peopleAndChurch: "High Priest Caiaphas, Annas, wealthy Sadducees, the Twelve Apostles, Mary the Mother of Jesus, Peter weeping bitterly in the high priest's courtyard.",
      politicalInsights: "The Sadducean aristocracy who resided here maintained tight control over temple revenues and collaborated closely with the Roman administration to preserve their political wealth and prestige.",
      eraChronology: "Scene of the Last Supper and trials (Nisan 14, 30 AD); birthplace of the Christian Church on Pentecost (Summer 30 AD); final stronghold burned by Titus in September 70 AD."
    },
    {
      id: "area-lower-city",
      name: "The Lower City & City of David (Ophel)",
      ancientName: "Ir David / Lower City / Acra",
      elevation: "670 m – 710 m",
      category: "urban-quarter",
      color: "#EA580C",
      fillColor: "#FED7AA",
      fillOpacity: 0.35,
      coordinates: [
        [31.7755, 35.2340], // Below Southern Steps of Temple
        [31.7755, 35.2370], // Ophel eastern slope
        [31.7695, 35.2360], // Southern tip above Kidron/Hinnom junction
        [31.7695, 35.2335], // Pool of Siloam area
        [31.7725, 35.2330]  // Central Tyropoeon street
      ],
      summary: "The ancient historic ridge south of the Temple Mount, densely settled by common citizens, craftsmen, and pilgrims.",
      overview: "The original Bronze and Iron Age core of Jerusalem conquered by King David from the Jebusites. In the 1st century, the Lower City was packed with stepped stone streets, markets, water cisterns, and tenements. Massive stepped monumental avenues led upward from the freshwater Pool of Siloam to the Southern Gates (Huldah Gates) of the Temple Mount.",
      topography: "A narrow southward-tapering ridge sandwiched between the Kidron Valley on the east and the Tyropoeon Valley on the west.",
      scriptures: [
        {
          ref: "John 9:6-7",
          text: "He spat on the ground, and made clay of the spittle, and he anointed the eyes of the blind man with the clay, And said unto him, Go, wash in the pool of Siloam, (which is by interpretation, Sent.) He went his way therefore, and washed, and came seeing.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/9?lang=eng#6"
        },
        {
          ref: "Acts 2:41-47",
          text: "Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls... And they, continuing daily with one accord in the temple, and breaking bread from house to house, did eat their meat with gladness and singleness of heart.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/acts/2?lang=eng#41"
        }
      ],
      peopleAndChurch: "The man born blind; thousands of Jewish pilgrims carrying golden vessels during the Water Libation ceremony; early Christian converts meeting house to house.",
      politicalInsights: "The Lower City was the hotbed of anti-Roman zeal and messianic fervor. While the wealthy elite lived securely in the Upper City, the working-class citizens in the Lower City bore the brunt of heavy Roman and temple taxation.",
      eraChronology: "Fall 29 AD: Healing of the blind man; Summer 30 AD: Baptism of 3,000 in ritual pools; 70 AD: Lower City captured and burned early in Titus's siege."
    },
    {
      id: "area-bezetha",
      name: "Bezetha (The New City / Northern Suburb)",
      ancientName: "Beit Zeita (House of Olives) / Caenopolis",
      elevation: "760 m – 780 m",
      category: "urban-quarter",
      color: "#0284C7",
      fillColor: "#BAE6FD",
      fillOpacity: 0.32,
      coordinates: [
        [31.7800, 35.2300],
        [31.7850, 35.2315],
        [31.7845, 35.2380],
        [31.7800, 35.2370],
        [31.7795, 35.2335]
      ],
      summary: "The rapidly expanding residential and artisan quarter north of the Temple Mount, surrounding the Sheep Market and Pools of Bethesda.",
      overview: "During the ministry of Jesus, Bezetha was an open northern suburb with olive groves, quarries, and residential villas extending outside the Second Wall. Here stood the twin deep reservoirs of the Pool of Bethesda, enclosed by five colonnaded porticoes where sick and lame gathered for healing. Herod Agrippa I began constructing the Third Wall in ~41 AD to enclose this entire district.",
      topography: "A high limestone ridge north of the Temple and Antonia Fortress, naturally vulnerable to military approaches from the north.",
      scriptures: [
        {
          ref: "John 5:2-9",
          text: "Now there is at Jerusalem by the sheep market a pool, which is called in the Hebrew tongue Bethesda, having five porches... And a certain man was there, which had an infirmity thirty and eight years. When Jesus saw him lie... he saith unto him, Wilt thou be made whole?... Rise, take up thy bed, and walk. And immediately the man was made whole.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/5?lang=eng#2"
        }
      ],
      peopleAndChurch: "Jesus Christ, the man healed after 38 years of infirmity, sheep merchants, pilgrims entering from northern Galilee via the Damascus Road.",
      politicalInsights: "Emperor Claudius ordered Herod Agrippa I to cease building the massive northern fortifications of Bezetha, fearing the Jewish kingdom was preparing a revolt.",
      eraChronology: "Spring 28 AD: Sabbath healing at Bethesda; 41–44 AD: Agrippa's Third Wall construction; May 70 AD: First district breached by Titus's battering rams."
    },
    {
      id: "area-golgotha-quarry",
      name: "Golgotha & Western Approaches",
      ancientName: "Golgotha / Calvaria / The Gardens",
      elevation: "765 m",
      category: "sacred-precinct",
      color: "#991B1B",
      fillColor: "#FECACA",
      fillOpacity: 0.35,
      coordinates: [
        [31.7770, 35.2275],
        [31.7820, 35.2285],
        [31.7820, 35.2315],
        [31.7770, 35.2305]
      ],
      summary: "The rocky hill and garden cemetery situated immediately outside the Second Wall, where Jesus was crucified and resurrected.",
      overview: "In the 1st century, Jewish and Roman law strictly prohibited burials and executions inside the city walls. This area was an abandoned limestone quarry with an exposed rocky knoll resembling a skull (Golgotha / Calvary). Surrounding the knoll were olive orchards, gardens, and freshly cut family tombs, including the new rock-cut sepulchre of Joseph of Arimathea.",
      topography: "Located just outside the Gennath Gate along a major public thoroughfare entering Jerusalem from the northwest, maximizing public visibility of crucifixions.",
      scriptures: [
        {
          ref: "John 19:17-20",
          text: "And he bearing his cross went forth into a place called the place of a skull, which is called in the Hebrew Golgotha: Where they crucified him, and two other with him... for the place where Jesus was crucified was nigh to the city.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/19?lang=eng#17"
        },
        {
          ref: "John 19:41-42",
          text: "Now in the place where he was crucified there was a garden; and in the garden a new sepulchre, wherein was never man yet laid. There laid they Jesus therefore because of the Jews' preparation day; for the sepulchre was nigh at hand.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/john/19?lang=eng#41"
        },
        {
          ref: "Matthew 28:5-6",
          text: "And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said. Come, see the place where the Lord lay.",
          churchLink: "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/28?lang=eng#5"
        }
      ],
      peopleAndChurch: "The Savior on the cross, Mary His mother, John the beloved, Mary Magdalene, the Roman centurion testifying 'Truly this was the Son of God!', Joseph of Arimathea, Nicodemus, the resurrection angels.",
      politicalInsights: "Crucifixion was the Roman imperial execution method used for treason and insurrection. Pontius Pilate placed the trilingual accusation ('JESUS OF NAZARETH THE KING OF THE JEWS') above the cross in Hebrew, Greek, and Latin.",
      eraChronology: "Friday, Nisan 14, 30 AD: Crucifixion; Sunday Dawn, Nisan 16, 30 AD: Glorious Resurrection of Jesus Christ."
    }
  ],

  // 1st-Century Herodian Defensive Walls
  walls: [
    {
      id: "wall-first",
      name: "The First Wall (Old Hasmonean Wall)",
      color: "#78350F",
      weight: 3.5,
      dashArray: null,
      description: "Encircled the Upper City on Mount Zion and the Lower City to the Pool of Siloam and Ophel.",
      coordinates: [
        [31.7760, 35.2275], // Hippicus Tower
        [31.7762, 35.2340], // Running east to Xystus & Temple
        [31.7758, 35.2345], // South along Tyropoeon
        [31.7700, 35.2355], // Down to Pool of Siloam
        [31.7695, 35.2325], // Essene Gate (southernmost crest)
        [31.7710, 35.2268], // Southwest crest of Mount Zion
        [31.7760, 35.2275]  // Returning to Herod's Citadel Towers
      ]
    },
    {
      id: "wall-second",
      name: "The Second Wall (Northern Suburb Defense)",
      color: "#92400E",
      weight: 3.5,
      dashArray: "6, 6",
      description: "Ran from the Gennath Gate north and east to the Antonia Fortress, deliberately placing Golgotha outside the gate.",
      coordinates: [
        [31.7762, 35.2295], // Gennath Gate
        [31.7795, 35.2298], // Northern elbow
        [31.7802, 35.2330], // Across central valley
        [31.7793, 35.2340]  // Connecting to Antonia Fortress
      ]
    },
    {
      id: "wall-temple-enclosure",
      name: "Herodian Temple Retaining Walls",
      color: "#B45309",
      weight: 4,
      dashArray: null,
      description: "The massive ashlar stone retaining walls enclosing the Temple Mount esplanade.",
      coordinates: [
        [31.7762, 35.2345],
        [31.7798, 35.2342],
        [31.7797, 35.2372],
        [31.7757, 35.2370],
        [31.7762, 35.2345]
      ]
    }
  ],

  // Historic 1st-Century Gates
  gates: [
    { name: "Gennath Gate (Garden Gate)", lat: 31.7762, lng: 35.2295, note: "Gateway through First Wall leading to Golgotha and northern gardens." },
    { name: "Beautiful Gate (Shushan Gate)", lat: 31.7778, lng: 35.2360, note: "Ornate bronze gate between Court of Women and Court of Gentiles where Peter healed the lame man." },
    { name: "Golden Gate (Eastern Gate)", lat: 31.7788, lng: 35.2372, note: "Grand eastern entrance overlooking the Kidron Valley and Mount of Olives." },
    { name: "Sheep Gate (Bethesda Gate)", lat: 31.7812, lng: 35.2365, note: "Northeastern gate where sacrificial sheep were washed before temple offering." },
    { name: "Double & Triple Huldah Gates", lat: 31.7758, lng: 35.2355, note: "Monumental pilgrim entrance from the Southern Monumental Steps into the Temple Mount." },
    { name: "Essene Gate", lat: 31.7695, lng: 35.2325, note: "Southern gate leading into the Valley of Hinnom and ascetic settlements." },
    { name: "Water Gate", lat: 31.7725, lng: 35.2362, note: "Gate through which priests carried water from the Pool of Siloam during Sukkot." }
  ]
};
