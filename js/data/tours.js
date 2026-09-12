/**
 * Curated Guided Narrative Tours
 * Allows the user to step through historic journeys with auto-camera pans,
 * highlighted routes, and synced scripture readings.
 */
const TOURS_DATA = [
  {
    id: "savior-life",
    title: "Life & Ministry of Jesus Christ",
    icon: "🌟",
    eraText: "6 BC – 30 AD • 14 Milestones",
    description: "Follow the footsteps of the Savior from the Annunciation in Nazareth, His birth in Bethlehem, baptism in the Jordan, great miracles in Galilee, through His final ascent to Jerusalem.",
    stops: [
      {
        title: "The Annunciation in Nazareth",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 12,
        eventId: "savior-annunciation",
        year: -6,
        summary: "The angel Gabriel brings tidings of great joy to Mary in Nazareth."
      },
      {
        title: "Birth of Jesus in Bethlehem",
        lat: 31.7054,
        lng: 35.2024,
        zoom: 13,
        eventId: "savior-birth",
        year: -5,
        summary: "The Savior is born in a manger in the City of David amidst angelic praise."
      },
      {
        title: "Flight into Egypt",
        lat: 31.2001,
        lng: 29.9187,
        zoom: 9,
        eventId: "savior-flight-egypt",
        year: -4,
        summary: "Joseph and Mary escape Herod's wrath, finding refuge in Alexandria and the Nile Delta."
      },
      {
        title: "Growing up in Nazareth",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 12,
        eventId: "savior-return-nazareth",
        year: -3,
        summary: "Jesus waxes strong in spirit, filled with wisdom in Nazareth."
      },
      {
        title: "Baptism in the Jordan River",
        lat: 31.8385,
        lng: 35.5478,
        zoom: 12,
        eventId: "savior-baptism",
        year: 26,
        summary: "John baptizes Jesus in the Jordan River; the Holy Ghost descends like a dove."
      },
      {
        title: "First Miracle at Cana",
        lat: 32.7481,
        lng: 35.3381,
        zoom: 12,
        eventId: "savior-wedding-cana",
        year: 27,
        summary: "At a wedding in Cana, Jesus manifests His glory by turning water into wine."
      },
      {
        title: "Living Water in Samaria",
        lat: 32.2133,
        lng: 35.2817,
        zoom: 12,
        eventId: "savior-woman-samaria",
        year: 27,
        summary: "At Jacob's Well near Sychar, Jesus speaks with the Samaritan woman."
      },
      {
        title: "Headquarters in Capernaum",
        lat: 32.8808,
        lng: 35.5750,
        zoom: 13,
        eventId: "savior-base-capernaum",
        year: 28,
        summary: "Jesus establishes His ministry headquarters in Peter's seaside city."
      },
      {
        title: "The Sermon on the Mount",
        lat: 32.8814,
        lng: 35.5561,
        zoom: 14,
        eventId: "savior-sermon-mount",
        year: 28,
        summary: "On the mount overlooking the Sea of Galilee, Jesus teaches the Beatitudes."
      },
      {
        title: "Calming the Tempest",
        lat: 32.8300,
        lng: 35.5800,
        zoom: 12,
        eventId: "savior-calms-storm",
        year: 28,
        summary: "Jesus commands the winds and sea: 'Peace, be still.'"
      },
      {
        title: "Feeding the 5,000",
        lat: 32.9090,
        lng: 35.6310,
        zoom: 13,
        eventId: "savior-feeding-5000",
        year: 29,
        summary: "A desert place belonging to Bethsaida (Luke 9:10–17); Mark 6 and Matthew 14. John's lad-and-loaves account is John 6 (Capernaum/Tiberias arc)."
      },
      {
        title: "Peter's Confession at Caesarea Philippi",
        lat: 33.2483,
        lng: 35.6933,
        zoom: 12,
        eventId: "savior-peter-confession",
        year: 29,
        summary: "'Thou art the Christ, the Son of the living God.'"
      },
      {
        title: "The Transfiguration",
        lat: 33.4167,
        lng: 35.8500,
        zoom: 11,
        eventId: "savior-transfiguration",
        year: 29,
        summary: "Moses and Elijah appear in glory atop the high mountain."
      },
      {
        title: "Raising Lazarus at Bethany",
        lat: 31.7719,
        lng: 35.2617,
        zoom: 13,
        eventId: "savior-raising-lazarus",
        year: 30,
        summary: "Christ calls Lazarus from the tomb, declaring 'I am the resurrection and the life.'"
      }
    ]
  },
  {
    id: "passion-week",
    title: "Passion Week in Jerusalem",
    icon: "✝️",
    eraText: "Spring 30 AD • 9 Stations",
    description: "Experience the decisive week of human history in holy Jerusalem: the Triumphal Entry, Cleansing the Temple, Gethsemane, Golgotha, the Garden Tomb, and the Ascension.",
    stops: [
      {
        title: "Triumphal Entry (Palm Sunday)",
        lat: 31.7781,
        lng: 35.2450,
        zoom: 14,
        eventId: "savior-triumphal-entry",
        year: 30,
        summary: "Jesus rides down the Mount of Olives amidst waving palm branches."
      },
      {
        title: "Cleansing the Temple Courts",
        lat: 31.7775,
        lng: 35.2355,
        zoom: 15,
        eventId: "savior-cleansing-temple",
        year: 30,
        summary: "Jesus overturns the money changers' tables: 'My house shall be called a house of prayer.'"
      },
      {
        title: "The Last Supper in the Upper Room",
        lat: 31.7717,
        lng: 35.2289,
        zoom: 16,
        eventId: "savior-last-supper",
        year: 30,
        summary: "Jesus washes feet and institutes the Holy Sacrament on Mount Zion."
      },
      {
        title: "The Agony in Gethsemane",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        summary: "The Savior takes upon Himself the sins of the world, sweating great drops of blood."
      },
      {
        title: "Crucifixion on Golgotha",
        lat: 31.7785,
        lng: 35.2298,
        zoom: 15,
        eventId: "savior-crucifixion",
        year: 30,
        summary: "The Lamb of God completes the eternal Atonement on Calvary: 'It is finished.'"
      },
      {
        title: "The Empty Garden Tomb (Resurrection)",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 16,
        eventId: "savior-resurrection",
        year: 30,
        summary: "Christ triumphs over death: 'He is not here: for he is risen.'"
      },
      {
        title: "Appearance on Road to Emmaus",
        lat: 31.8394,
        lng: 34.9886,
        zoom: 12,
        eventId: "savior-emmaus",
        year: 30,
        summary: "Disciples' hearts burn as the risen Lord opens the scriptures."
      },
      {
        title: "Ascension from Mount of Olives",
        lat: 31.7781,
        lng: 35.2450,
        zoom: 14,
        eventId: "savior-ascension",
        year: 30,
        summary: "Jesus ascends to the right hand of the Father, promising to return in like manner."
      }
    ]
  },
  {
    id: "acts-early-church",
    title: "Pentecost & the Early Church",
    icon: "🔥",
    eraText: "30 AD – 47 AD • 6 Crucial Steps",
    description: "Witness the Holy Spirit falling at Pentecost, Stephen's courageous martyrdom, Philip's evangelism, Saul's radical conversion, and the first Gentile baptisms.",
    stops: [
      {
        title: "Day of Pentecost in Jerusalem",
        lat: 31.7767,
        lng: 35.2345,
        zoom: 13,
        eventId: "event-pentecost",
        year: 30,
        summary: "Tongues of fire appear; 3,000 baptized as the Christian Church is born."
      },
      {
        title: "Stephen's Witness & Dispersal",
        lat: 31.7800,
        lng: 35.2400,
        zoom: 14,
        eventId: "event-stephen-martyrdom",
        year: 34,
        summary: "Stephen sees the glory of God; persecution scatters believers across Judea and Samaria."
      },
      {
        title: "Philip & Ethiopian Eunuch in Gaza",
        lat: 31.5000,
        lng: 34.4667,
        zoom: 11,
        eventId: "event-philip-samaria-gaza",
        year: 34,
        summary: "Philip baptizes the Ethiopian royal treasurer on the desert road."
      },
      {
        title: "Saul's Conversion on Damascus Road",
        lat: 33.5138,
        lng: 36.2765,
        zoom: 11,
        eventId: "event-saul-conversion",
        year: 35,
        summary: "The risen Christ appears to Saul in blinding light: 'I am Jesus whom thou persecutest.'"
      },
      {
        title: "Cornelius & Gentiles in Caesarea",
        lat: 32.5011,
        lng: 34.8925,
        zoom: 12,
        eventId: "event-peter-cornelius",
        year: 38,
        summary: "Peter preaches to Roman centurion Cornelius; Gentiles receive the Holy Ghost."
      },
      {
        title: "Antioch: First Called 'Christians'",
        lat: 36.2021,
        lng: 36.1606,
        zoom: 11,
        eventId: "event-church-antioch",
        year: 40,
        summary: "Barnabas and Saul teach in Antioch, which becomes the missionary hub of Christendom."
      }
    ]
  },
  {
    id: "paul-journeys",
    title: "Paul's Journeys Across the Roman World",
    icon: "⛵",
    eraText: "47 AD – 62 AD • 8 Key Portals",
    description: "Follow the Apostle Paul from Antioch through Cyprus, Galatia, Greece, Asia, Malta, and ultimately to imperial Rome.",
    stops: [
      {
        title: "Paphos, Cyprus (1st Journey)",
        lat: 34.7556,
        lng: 32.4097,
        zoom: 10,
        year: 47,
        summary: "Roman proconsul Sergius Paulus believes after Elymas the sorcerer is rebuked."
      },
      {
        title: "Pisidian Antioch & Lystra",
        lat: 38.3075,
        lng: 31.1897,
        zoom: 10,
        year: 48,
        summary: "Gentiles rejoice in the Word; churches established throughout Galatia."
      },
      {
        title: "Philippi Jail (Europe Reached)",
        lat: 41.0133,
        lng: 24.2858,
        zoom: 11,
        eventId: "event-paul-philippi",
        year: 50,
        summary: "Midnight earthquake shakes the prison; the jailer and household are baptized."
      },
      {
        title: "Athens & Mars Hill",
        lat: 37.9838,
        lng: 23.7275,
        zoom: 12,
        eventId: "event-paul-athens-areopagus",
        year: 51,
        summary: "Paul proclaims the Unknown God to Athenian philosophers on the Areopagus."
      },
      {
        title: "Corinth (18-Month Stay)",
        lat: 37.9056,
        lng: 22.8797,
        zoom: 11,
        year: 51,
        summary: "Paul works as a tentmaker with Aquila & Priscilla, planting a massive church."
      },
      {
        title: "Ephesus (Great Awakening)",
        lat: 37.9400,
        lng: 27.3414,
        zoom: 12,
        eventId: "event-ephesus-hall-tyrannus",
        year: 55,
        summary: "All Asia hears the Word; demonic scrolls burned; silversmith theater riot."
      },
      {
        title: "Shipwreck at Malta",
        lat: 35.9375,
        lng: 14.3754,
        zoom: 11,
        eventId: "event-malta-shipwreck",
        year: 60,
        summary: "All 276 spared from the Mediterranean tempest; snake bite harmless."
      },
      {
        title: "Rome: Preaching Unhindered",
        lat: 41.9028,
        lng: 12.4964,
        zoom: 11,
        eventId: "event-paul-rome-house-arrest",
        year: 61,
        summary: "Paul preaches Christ from his rented house under guard, penning the Prison Epistles."
      }
    ]
  },
  {
    id: "revelation-churches",
    title: "Seven Churches of Revelation & Patmos",
    icon: "📜",
    eraText: "95 AD • Patmos & Western Asia",
    description: "Journey to the rocky island of Patmos where John saw the vision of the glorified Lord, and visit the seven cities of Asia addressed in Revelation 2–3.",
    stops: [
      {
        title: "Isle of Patmos (Revelation 1:9)",
        lat: 37.3090,
        lng: 26.5460,
        zoom: 11,
        eventId: "event-john-patmos-revelation",
        year: 95,
        summary: "John was in the isle that is called Patmos (Revelation 1:9). Later memory names a Cave of the Apocalypse; the book names the isle, not a cave."
      },
      {
        title: "Ephesus: The Desirable Church",
        lat: 37.9400,
        lng: 27.3414,
        zoom: 12,
        year: 95,
        summary: "'Remember therefore from whence thou art fallen, and repent, and do the first works.'"
      },
      {
        title: "Smyrna: Faithful in Suffering",
        lat: 38.4192,
        lng: 27.1287,
        zoom: 12,
        year: 95,
        summary: "'Fear none of those things which thou shalt suffer... Be thou faithful unto death, and I will give thee a crown of life.'"
      },
      {
        title: "Pergamum: Where Satan's Seat Is",
        lat: 39.1306,
        lng: 27.1817,
        zoom: 12,
        year: 95,
        summary: "'To him that overcometh will I give to eat of the hidden manna.'"
      },
      {
        title: "Thyatira: Labor and Patience",
        lat: 38.9214,
        lng: 27.8406,
        zoom: 12,
        year: 95,
        summary: "'He that overcometh, and keepeth my works unto the end, to him will I give power over the nations.'"
      },
      {
        title: "Sardis: Awakening from Slumber",
        lat: 38.4883,
        lng: 28.0400,
        zoom: 12,
        year: 95,
        summary: "'Thou hast a few names even in Sardis which have not defiled their garments; and they shall walk with me in white.'"
      },
      {
        title: "Philadelphia: The Open Door",
        lat: 38.3517,
        lng: 28.5175,
        zoom: 12,
        year: 95,
        summary: "'Behold, I have set before thee an open door, and no man can shut it.'"
      },
      {
        title: "Laodicea: Stand at the Door & Knock",
        lat: 37.8344,
        lng: 29.1083,
        zoom: 12,
        year: 95,
        summary: "'Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him.'"
      }
    ]
  }
];
