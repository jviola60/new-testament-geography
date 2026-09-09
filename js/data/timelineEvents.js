/**
 * Master Chronological Events Index (~6 BC to 100 AD)
 * Integrates Christ's ministry, Acts apostolic milestones, Paul's journeys,
 * the 70 AD Destruction of Jerusalem, and John's Revelation on Patmos.
 */
const TIMELINE_EVENTS = [
  // --- SAVIOR'S LIFE & MINISTRY (-6 BC - 30 AD) ---
  ...SAVIOR_EVENTS,

  // --- EARLY CHURCH & APOSTOLIC EXPANSION (30 AD - 47 AD) ---
  {
    id: "event-pentecost",
    title: "The Day of Pentecost & Birth of the Church",
    year: 30,
    season: "Summer 30 AD (Sivan / Feast of Weeks)",
    era: "Pentecost & Church Birth",
    lat: 31.7767,
    lng: 35.2345,
    locationName: "Jerusalem, Judea",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 2:1-4", text: "And when the day of Pentecost was fully come, they were all with one accord in one place... And there appeared unto them cloven tongues like as of fire, and it sat upon each of them. And they were all filled with the Holy Ghost." },
      { ref: "Acts 2:41", text: "Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls." }
    ],
    description: "The Holy Ghost is poured out with rushing wind and tongues of fire upon the 120 disciples. Peter preaches his first apostolic sermon to pilgrims from throughout the Roman and Parthian worlds, baptizing 3,000 believers."
  },
  {
    id: "event-stephen-martyrdom",
    title: "Martyrdom of Stephen & Great Persecution",
    year: 34,
    season: "Autumn 34 AD",
    era: "Pentecost & Church Birth",
    lat: 31.7800,
    lng: 35.2400,
    locationName: "Outside St. Stephen's Gate, Jerusalem",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 7:55-56, 60", text: "He, being full of the Holy Ghost, looked up stedfastly into heaven, and saw the glory of God, and Jesus standing on the right hand of God... And he kneeled down, and cried with a loud voice, Lord, lay not this sin to their charge." }
    ],
    description: "Stephen, full of faith and power, defends the faith before the Sanhedrin and becomes the first Christian martyr. A young Pharisee named Saul of Tarsus consents unto his death, sparking widespread dispersal of the church."
  },
  {
    id: "event-philip-samaria-gaza",
    title: "Philip in Samaria & the Ethiopian Eunuch",
    year: 34,
    season: "Autumn 34 AD",
    era: "Pentecost & Church Birth",
    lat: 31.5000,
    lng: 34.4667,
    locationName: "Desert Road to Gaza",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 8:26, 35", text: "And the angel of the Lord spake unto Philip, saying, Arise, and go toward the south unto the way that goeth down from Jerusalem unto Gaza, which is desert... Then Philip opened his mouth, and began at the same scripture, and preached unto him Jesus." }
    ],
    description: "Following great revival in Samaria, Philip is led by the Spirit down the desert road toward Gaza, where he expounds Isaiah 53 to the chief treasurer of Queen Candace of Ethiopia and baptizes him."
  },
  {
    id: "event-saul-conversion",
    title: "Conversion of Saul on the Damascus Road",
    year: 35,
    season: "Spring 35 AD",
    era: "Pentecost & Church Birth",
    lat: 33.5138,
    lng: 36.2765,
    locationName: "Road to Damascus, Syria",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 9:3-6", text: "And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven: And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me? And he said, Who art thou, Lord? And the Lord said, I am Jesus whom thou persecutest." }
    ],
    description: "En route to arrest disciples in Damascus, the persecutor Saul is struck down by blinding celestial light from the resurrected Christ. Blinded, he is led to Damascus where Ananias restores his sight and baptizes him."
  },
  {
    id: "event-peter-cornelius",
    title: "Peter's Vision & Conversion of Cornelius",
    year: 38,
    season: "Autumn 38 AD",
    era: "Gentile Mission",
    lat: 32.5011,
    lng: 34.8925,
    locationName: "Caesarea Maritima",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 10:34-35, 44", text: "Then Peter opened his mouth, and said, Of a truth I perceive that God is no respecter of persons: But in every nation he that feareth him, and worketh righteousness, is accepted with him... While Peter yet spake these words, the Holy Ghost fell on all them which heard the word." }
    ],
    description: "After a divine rooftop vision in Joppa declaring all foods clean, Peter visits the Roman centurion Cornelius in Caesarea Maritima. The Holy Ghost falls on Gentile listeners, opening baptism and church fellowship to all nations."
  },
  {
    id: "event-church-antioch",
    title: "The Gentile Church at Antioch Founded",
    year: 40,
    season: "40 AD",
    era: "Gentile Mission",
    lat: 36.2021,
    lng: 36.1606,
    locationName: "Antioch on the Orontes, Syria",
    category: "church",
    scriptures: [
      { ref: "Acts 11:21, 26", text: "And the hand of the Lord was with them: and a great number believed, and turned unto the Lord... And the disciples were called Christians first in Antioch." }
    ],
    description: "Disciples scattered by persecution preach to Greek-speaking Gentiles in Antioch. Barnabas recruits Saul from Tarsus, and together they teach for a whole year in this flourishing, diverse congregation."
  },

  // --- PAUL'S JOURNEYS & THE JERUSALEM COUNCIL (47 AD - 58 AD) ---
  {
    id: "event-council-jerusalem",
    title: "The Apostolic Council of Jerusalem",
    year: 49,
    season: "Autumn 49 AD",
    era: "Missionary Journeys",
    lat: 31.7767,
    lng: 35.2345,
    locationName: "Jerusalem, Judea",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 15:10, 19", text: "Why tempt ye God, to put a yoke upon the neck of the disciples, which neither our fathers nor we were able to bear?... Wherefore my sentence is, that we trouble not them, which from among the Gentiles are turned to God." }
    ],
    description: "The Apostles and elders gather to resolve whether Gentile converts must be circumcised and keep the Mosaic ceremonial law. James, Peter, and Paul reach unanimous agreement: Gentiles are saved by the grace of the Lord Jesus Christ without legalistic burdens."
  },
  {
    id: "event-paul-philippi",
    title: "Gospel Enters Europe: Philippi Prison Praise",
    year: 50,
    season: "Autumn 50 AD",
    era: "Missionary Journeys",
    lat: 41.0133,
    lng: 24.2858,
    locationName: "Philippi, Macedonia",
    category: "missionary",
    scriptures: [
      { ref: "Acts 16:25-31", text: "And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them. And suddenly there was a great earthquake... Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house." }
    ],
    description: "Responding to the Macedonian vision, Paul plants the first European congregation. Jailed and beaten in Philippi, Paul and Silas sing hymns at midnight until an earthquake opens the prison doors, leading to the baptism of the jailer and his family."
  },
  {
    id: "event-paul-athens-areopagus",
    title: "Paul on Mars Hill (The Areopagus in Athens)",
    year: 51,
    season: "Spring 51 AD",
    era: "Missionary Journeys",
    lat: 37.9838,
    lng: 23.7275,
    locationName: "Areopagus (Mars Hill), Athens",
    category: "missionary",
    scriptures: [
      { ref: "Acts 17:22-28", text: "Ye men of Athens, I perceive that in all things ye are too superstitious. For as I passed by... I found an altar with this inscription, TO THE UNKNOWN GOD... For in him we live, and move, and have our being." }
    ],
    description: "Confronting the intellectual elite of the Greco-Roman world in Athens, Paul proclaims the Creator God who made the world and all things therein, commanding all people everywhere to repent in light of the Resurrection."
  },
  {
    id: "event-ephesus-hall-tyrannus",
    title: "Three-Year Revival at Ephesus & Theater Riot",
    year: 55,
    season: "55 AD",
    era: "Missionary Journeys",
    lat: 37.9400,
    lng: 27.3414,
    locationName: "Great Theater, Ephesus, Asia",
    category: "missionary",
    scriptures: [
      { ref: "Acts 19:10, 20", text: "And this continued by the space of two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks... So mightily grew the word of God and prevailed." }
    ],
    description: "Paul teaches daily in the lecture hall of Tyrannus for two years. Extraordinary miracles occur, occult scrolls worth 50,000 pieces of silver are burned, and Demetrius the silversmith incites a riot in the 25,000-seat theater."
  },

  // --- ARREST, ROME & MARTYRDOM (58 AD - 67 AD) ---
  {
    id: "event-paul-temple-arrest",
    title: "Paul's Arrest on the Temple Mount",
    year: 58,
    season: "Pentecost 58 AD",
    era: "Rome & Persecution",
    lat: 31.7775,
    lng: 35.2355,
    locationName: "Antonia Fortress / Temple Mount, Jerusalem",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 21:30-33", text: "And all the city was moved, and the people ran together: and they took Paul, and drew him out of the temple: and forthwith the doors were shut... the chief captain came near, and took him, and commanded him to be bound with two chains." }
    ],
    description: "Falsely accused of bringing Greeks past the middle wall of partition into the sacred temple courts, Paul is beaten by a mob and rescued by Roman soldiers from the Antonia Fortress, beginning four years of custody."
  },
  {
    id: "event-malta-shipwreck",
    title: "The Shipwreck on the Island of Malta",
    year: 60,
    season: "Winter 60 AD",
    era: "Rome & Persecution",
    lat: 35.9375,
    lng: 14.3754,
    locationName: "St. Paul's Bay, Malta",
    category: "missionary",
    scriptures: [
      { ref: "Acts 27:22-24", text: "And now I exhort you to be of good cheer: for there shall be no loss of any man's life among you, but of the ship. For there stood by me this night the angel of God, whose I am, and whom I serve, Saying, Fear not, Paul; thou must be brought before Caesar." }
    ],
    description: "After enduring a harrowing 14-day tempest in the open Mediterranean, the grain ship shatters on the reef of Malta. As promised by an angel, all 276 passengers make it safely ashore on boards and broken pieces."
  },
  {
    id: "event-paul-rome-house-arrest",
    title: "Paul Preaching Under House Arrest in Rome",
    year: 61,
    season: "61 – 62 AD",
    era: "Rome & Persecution",
    lat: 41.9028,
    lng: 12.4964,
    locationName: "Rome, Italia",
    category: "apostolic",
    scriptures: [
      { ref: "Acts 28:30-31", text: "And Paul dwelt two whole years in his own hired house, and received all that came in unto him, Preaching the kingdom of God, and teaching those things which concern the Lord Jesus Christ, with all confidence, no man forbidding him." }
    ],
    description: "Guarded by Roman soldiers, Paul writes Ephesians, Philippians, Colossians, and Philemon from Rome, preaching unhindered to Praetorian guards, Caesar's household, and visiting believers."
  },
  {
    id: "event-neronian-persecution",
    title: "Great Fire of Rome & Neronian Persecution",
    year: 64,
    season: "Summer 64 AD",
    era: "Rome & Persecution",
    lat: 41.8902,
    lng: 12.4922,
    locationName: "Circus Maximus & Vatican Gardens, Rome",
    category: "persecution",
    scriptures: [
      { ref: "2 Timothy 4:6-7", text: "For I am now ready to be offered, and the time of my departure is at hand. I have fought a good fight, I have finished my course, I have kept the faith." }
    ],
    description: "Following the devastating Great Fire of Rome, Emperor Nero blames Christians. Believers are wrapped in animal skins, torn by dogs, and burned as night torches. Peter is crucified upside-down on Vatican Hill, and Paul is beheaded on the Ostian Way (~64–67 AD)."
  },

  // --- JEWISH WAR & DESTRUCTION OF JERUSALEM (66 AD - 70 AD) ---
  {
    id: "event-jewish-revolt",
    title: "Outbreak of the First Jewish-Roman War",
    year: 66,
    season: "Summer 66 AD",
    era: "Jewish War & 70 AD",
    lat: 31.7767,
    lng: 35.2345,
    locationName: "Jerusalem & Judea",
    category: "historical",
    scriptures: [
      { ref: "Luke 21:20", text: "And when ye shall see Jerusalem compassed with armies, then know that the desolation thereof is nigh." }
    ],
    description: "Provoked by Roman procurator Gessius Florus robbing the Temple treasury, Zealots seize Jerusalem and defeat the Roman 12th Legion. Christians, heeding Christ's Olivet warning, flee across the Jordan to Pella."
  },
  {
    id: "event-destruction-jerusalem",
    title: "Fall of Jerusalem & Burning of the Second Temple",
    year: 70,
    season: "Autumn 70 AD (Tisha B'Av)",
    era: "Jewish War & 70 AD",
    lat: 31.7775,
    lng: 35.2355,
    locationName: "Temple Mount, Jerusalem",
    category: "historical",
    scriptures: [
      { ref: "Matthew 24:1-2", text: "And Jesus went out, and departed from the temple: and his disciples came to him for to shew him the buildings of the temple. And Jesus said unto them, See ye not all these things? verily I say unto you, There shall not be left here one stone upon another, that shall not be thrown down." }
    ],
    description: "Roman Legions under Titus breach the three walls of Jerusalem following a five-month brutal siege. The glorious Second Temple is incinerated and leveled to the ground, fulfilling Christ's prophecy. Jewish captives are marched in triumph to Rome."
  },

  // --- POST-70 AD & THE APOSTOLIC AGE CLOSE (70 AD - 100 AD) ---
  {
    id: "event-gospels-written",
    title: "Compilation and Spread of the Four Gospels",
    year: 75,
    season: "70 – 85 AD",
    era: "Apostolic Age",
    lat: 36.2021,
    lng: 36.1606,
    locationName: "Antioch, Ephesus & Rome",
    category: "scripture",
    scriptures: [
      { ref: "Luke 1:1-3", text: "Forasmuch as many have taken in hand to set forth in order a declaration of those things which are most surely believed among us... It seemed good to me also, having had perfect understanding of all things from the very first, to write unto thee in order." }
    ],
    description: "The Holy Spirit guides Matthew, Mark, Luke, and John in committing the Savior's words, signs, and resurrection to writing for copies circulated among expanding churches across the Mediterranean."
  },
  {
    id: "event-john-patmos-revelation",
    title: "John on Patmos: The Apocalypse & Seven Churches",
    year: 95,
    season: "Autumn 95 AD",
    era: "Apostolic Age",
    lat: 37.3090,
    lng: 26.5460,
    locationName: "Cave of the Apocalypse, Patmos",
    category: "prophecy",
    scriptures: [
      { ref: "Revelation 1:10-11, 18", text: "I was in the Spirit on the Lord's day, and heard behind me a great voice, as of a trumpet, Saying, I am Alpha and Omega, the first and the last: and, What thou seest, write in a book, and send it unto the seven churches which are in Asia... I am he that liveth, and was dead; and, behold, I am alive for evermore." }
    ],
    description: "Exiled to the Aegean penal island of Patmos under Emperor Domitian, the elderly Apostle John receives the cosmic vision of the glorified Christ, sending letters to the Seven Churches of Asia (Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, Laodicea) and concluding the canon of Holy Scripture."
  },
  {
    id: "event-close-apostolic-age",
    title: "Close of the Apostolic Era",
    year: 100,
    season: "100 AD",
    era: "Apostolic Age",
    lat: 37.9400,
    lng: 27.3414,
    locationName: "Ephesus, Asia Minor",
    category: "apostolic",
    scriptures: [
      { ref: "Revelation 22:20", text: "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus." }
    ],
    description: "By 100 AD, Christian communities span from Spain, Gaul, and Rome to North Africa, Egypt, the Levant, Asia Minor, Greece, and Parthia. The death of the Apostle John in Ephesus marks the transition to the Early Church Fathers."
  }
];

// Sort chronologically
TIMELINE_EVENTS.sort((a, b) => a.year - b.year);
