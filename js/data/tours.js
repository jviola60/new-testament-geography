/**
 * Curated Guided Narrative Tours
 * Allows the user to step through historic journeys with auto-camera pans,
 * highlighted routes, and synced scripture readings.
 * 
 * CORE EMPHASIS: Guided Tours of the Savior's Life and Ministry
 * are elevated as the primary spiritual feature of the atlas.
 */
const TOURS_DATA = [
  {
    id: "start-here-jesus",
    title: "Start Here: Where Jesus Walked",
    icon: "🕊️",
    eraText: "Welcoming Tour for All Ages • 6 Sacred Stops",
    description: "A gentle, welcoming journey through the most sacred moments of the Savior's life—from His birth in Bethlehem to His glorious resurrection in Jerusalem.",
    stops: [
      {
        title: "Where Baby Jesus Was Born (Bethlehem)",
        lat: 31.7054,
        lng: 35.2024,
        zoom: 13,
        eventId: "savior-birth",
        year: -5,
        summary: "Luke 2:11 • 'For unto you is born this day in the city of David a Saviour, which is Christ the Lord.' In this quiet village, God gave His Son to bring peace and light to all the world."
      },
      {
        title: "Growing Up in Kindness & Love (Nazareth)",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 13,
        eventId: "savior-return-nazareth",
        year: -3,
        summary: "Luke 2:52 • 'And Jesus increased in wisdom and stature, and in favour with God and man.' In the hills of Galilee, Jesus lived in quiet devotion, teaching us how to love God and one another."
      },
      {
        title: "The Loving Teacher & Healer (Capernaum & Sea of Galilee)",
        lat: 32.8808,
        lng: 35.5750,
        zoom: 13,
        eventId: "savior-base-capernaum",
        year: 28,
        summary: "Matthew 4:23 • 'And Jesus went about all Galilee, teaching... and healing all manner of sickness.' By this freshwater sea, Jesus invited fishermen to follow Him and healed all who came to Him in faith."
      },
      {
        title: "Teaching Compassion at the Temple (Jerusalem)",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 15,
        eventId: "savior-cleansing-temple",
        year: 30,
        summary: "Matthew 21:14 • 'And the blind and the lame came to him in the temple; and he healed them.' Jesus taught that God's house is a holy place of prayer, refuge, and mercy for all people."
      },
      {
        title: "Jesus Prays for Us in Love (Garden of Gethsemane)",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        summary: "Luke 22:42 • 'Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done.' In this olive orchard, Jesus took upon Himself our pains, griefs, and sins out of infinite love."
      },
      {
        title: "He Is Risen! (The Empty Garden Tomb)",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 16,
        eventId: "savior-resurrection",
        year: 30,
        summary: "Matthew 28:6 • 'He is not here: for he is risen, as he said.' Because Jesus lives, death is overcome and every child of God is invited to live forever in His joyous presence."
      }
    ]
  },
  {
    id: "savior-life",
    title: "Walk with the Savior (Core Ministry Events)",
    icon: "🌟",
    eraText: "6 BC – 30 AD • 13 Sacred Milestones",
    description: "Follow the footsteps of Jesus Christ through His baptism, the Sermon on the Mount, wondrous miracles across Galilee, and His ministry of mercy.",
    stops: [
      {
        title: "The Annunciation in Nazareth",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 12,
        eventId: "savior-annunciation",
        year: -6,
        summary: "The angel Gabriel brings tidings of great joy to Mary in Nazareth: 'Hail, thou that art highly favoured, the Lord is with thee.'"
      },
      {
        title: "Birth of Jesus in Bethlehem",
        lat: 31.7054,
        lng: 35.2024,
        zoom: 13,
        eventId: "savior-birth",
        year: -5,
        summary: "The Savior is born in a manger in the City of David amidst angelic heralds proclaiming peace on earth."
      },
      {
        title: "Baptism in the Jordan River",
        lat: 31.8385,
        lng: 35.5478,
        zoom: 12,
        eventId: "savior-baptism",
        year: 26,
        summary: "John baptizes Jesus in the Jordan River to fulfill all righteousness; the Father declares, 'This is my beloved Son.'"
      },
      {
        title: "First Miracle at Cana",
        lat: 32.7481,
        lng: 35.3381,
        zoom: 12,
        eventId: "savior-wedding-cana",
        year: 27,
        summary: "At a marriage in Cana of Galilee, Jesus manifests His glory by turning water into wine, blessing a humble family celebration."
      },
      {
        title: "Living Water at Jacob's Well (Samaria)",
        lat: 32.2133,
        lng: 35.2817,
        zoom: 12,
        eventId: "savior-woman-samaria",
        year: 27,
        summary: "At Jacob's Well near Sychar, Jesus offers living water to the Samaritan woman: 'Whosoever drinketh of the water that I shall give him shall never thirst.'"
      },
      {
        title: "Calling the First Apostles ('Fishers of Men')",
        lat: 32.8735,
        lng: 35.5700,
        zoom: 13,
        eventId: "savior-call-disciples",
        year: 28,
        summary: "Matthew 4:19 • 'Follow me, and I will make you fishers of men.' Walking by the Sea of Galilee, Jesus calls Simon Peter, Andrew, James, and John into discipleship."
      },
      {
        title: "Ministry Headquarters in Capernaum",
        lat: 32.8808,
        lng: 35.5750,
        zoom: 13,
        eventId: "savior-base-capernaum",
        year: 28,
        summary: "Jesus makes Capernaum His seaside home, casting out demons, healing the paralytic let down through the roof, and welcoming the outcast."
      },
      {
        title: "The Sermon on the Mount",
        lat: 32.8814,
        lng: 35.5561,
        zoom: 14,
        eventId: "savior-sermon-mount",
        year: 28,
        summary: "On the hillside overlooking the Sea of Galilee, Jesus proclaims the Beatitudes: 'Blessed are the peacemakers: for they shall be called the children of God.'"
      },
      {
        title: "Calming the Tempest on Galilee",
        lat: 32.8300,
        lng: 35.5800,
        zoom: 12,
        eventId: "savior-calms-storm",
        year: 28,
        summary: "Arising in the storm-tossed boat, Jesus commands the raging winds and sea: 'Peace, be still.' And there was a great calm."
      },
      {
        title: "Feeding the 5,000 at Bethsaida",
        lat: 32.9090,
        lng: 35.6310,
        zoom: 13,
        eventId: "savior-feeding-5000",
        year: 29,
        summary: "With five loaves and two fishes, Jesus feeds five thousand men plus women and children, testifying 'I am the bread of life.'"
      },
      {
        title: "Peter's Testimony at Caesarea Philippi",
        lat: 33.2483,
        lng: 35.6933,
        zoom: 12,
        eventId: "savior-peter-confession",
        year: 29,
        summary: "At the foot of Mount Hermon, Peter declares by revelation: 'Thou art the Christ, the Son of the living God.'"
      },
      {
        title: "The Transfiguration",
        lat: 33.4167,
        lng: 35.8500,
        zoom: 11,
        eventId: "savior-transfiguration",
        year: 29,
        summary: "Moses and Elijah confer priesthood keys upon Peter, James, and John as the Savior's face shines as the sun."
      },
      {
        title: "Raising Lazarus from Death in Bethany",
        lat: 31.7719,
        lng: 35.2617,
        zoom: 13,
        eventId: "savior-raising-lazarus",
        year: 30,
        summary: "Standing before the rock tomb, Jesus weeps with Mary and Martha, commanding: 'Lazarus, come forth!' declaring 'I am the resurrection and the life.'"
      }
    ]
  },
  {
    id: "passion-week",
    title: "Passion Week: The Final Journey in Jerusalem",
    icon: "✝️",
    eraText: "Spring 30 AD • 8 Sacred Stations",
    description: "Walk with the Savior through the decisive week of divine love: the Triumphal Entry, the Last Supper, Gethsemane, Golgotha, and the triumph of the Resurrection.",
    stops: [
      {
        title: "Triumphal Entry on the Mount of Olives",
        lat: 31.7781,
        lng: 35.2450,
        zoom: 14,
        eventId: "savior-triumphal-entry",
        year: 30,
        summary: "Jesus rides a colt down the Mount of Olives amidst branches of palm: 'Hosanna to the son of David: Blessed is he that cometh in the name of the Lord.'"
      },
      {
        title: "Cleansing the Temple Courts",
        lat: 31.7775,
        lng: 35.2355,
        zoom: 15,
        eventId: "savior-cleansing-temple",
        year: 30,
        summary: "Jesus casts out moneychangers from the court of the Gentiles: 'My house shall be called the house of prayer.'"
      },
      {
        title: "The Last Supper in the Upper Room",
        lat: 31.7717,
        lng: 35.2289,
        zoom: 16,
        eventId: "savior-last-supper",
        year: 30,
        summary: "Jesus washes the disciples' feet, institutes the holy Sacrament, and gives the new commandment: 'Love one another; as I have loved you.'"
      },
      {
        title: "The Agony in the Garden of Gethsemane",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        summary: "The Savior suffers the infinite agony of the Atonement for all humankind, sweating blood from every pore in willing obedience to the Father."
      },
      {
        title: "Crucifixion on Golgotha (Calvary)",
        lat: 31.7785,
        lng: 35.2298,
        zoom: 15,
        eventId: "savior-crucifixion",
        year: 30,
        summary: "The Lamb of God offers His life upon the cross for our sins: 'Father, forgive them; for they know not what they do' and 'It is finished.'"
      },
      {
        title: "The Empty Garden Tomb (Resurrection)",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 16,
        eventId: "savior-resurrection",
        year: 30,
        summary: "Angels greet the weeping Mary Magdalene with joyous tidings: 'Why seek ye the living among the dead? He is not here, but is risen!'"
      },
      {
        title: "Hearts Burning on the Road to Emmaus",
        lat: 31.8394,
        lng: 34.9886,
        zoom: 12,
        eventId: "savior-emmaus",
        year: 30,
        summary: "The resurrected Lord walks with two disciples, opening the scriptures concerning Himself until their hearts burn within them."
      },
      {
        title: "The Ascension from the Mount of Olives",
        lat: 31.7781,
        lng: 35.2450,
        zoom: 14,
        eventId: "savior-ascension",
        year: 30,
        summary: "Jesus blesses the Apostles and ascends into the clouds of heaven with the promise: 'This same Jesus... shall so come in like manner.'"
      }
    ]
  },
  {
    id: "living-christ",
    title: "The Living Christ: Key Testimony Locations",
    icon: "👑",
    eraText: "Sacred Witness of the Son of God • 8 Stops",
    description: "Stand where heaven bore witness of Jesus Christ: the Father's voice at Jordan, divine glory on the Mount of Transfiguration, the Atonement, the Empty Tomb, and His appearances across Galilee.",
    stops: [
      {
        title: "The Word Made Flesh in Bethlehem",
        lat: 31.7054,
        lng: 35.2024,
        zoom: 13,
        eventId: "savior-birth",
        year: -5,
        summary: "John 1:14 • 'And the Word was made flesh, and dwelt among us, (and we beheld his glory...)' The great Creator entered mortality to be our Savior."
      },
      {
        title: "The Father's Voice at the Jordan River",
        lat: 31.8385,
        lng: 35.5478,
        zoom: 12,
        eventId: "savior-baptism",
        year: 26,
        summary: "Matthew 3:17 • 'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.' God the Father testifies of His Beloved Son."
      },
      {
        title: "Divine Glory on the Mount of Transfiguration",
        lat: 33.4167,
        lng: 35.8500,
        zoom: 11,
        eventId: "savior-transfiguration",
        year: 29,
        summary: "Matthew 17:5 • 'Behold a voice out of the cloud, which said, This is my beloved Son, in whom I am well pleased; hear ye him.'"
      },
      {
        title: "The Infinite Atoning Sacrifice in Gethsemane",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        summary: "Luke 22:44 • 'And being in an agony he prayed more earnestly: and his sweat was as it were great drops of blood.' He bore our sorrows that we might be healed."
      },
      {
        title: "The Lamb of God on Calvary",
        lat: 31.7785,
        lng: 35.2298,
        zoom: 15,
        eventId: "savior-crucifixion",
        year: 30,
        summary: "John 1:29 • 'Behold the Lamb of God, which taketh away the sin of the world.' The supreme gift of divine grace and redemption."
      },
      {
        title: "Triumph Over Death at the Garden Tomb",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 16,
        eventId: "savior-resurrection",
        year: 30,
        summary: "1 Corinthians 15:20 • 'Now is Christ risen from the dead, and become the firstfruits of them that slept.' Physical death is permanently conquered."
      },
      {
        title: "The Risen Lord by the Sea of Galilee ('Lovest Thou Me?')",
        lat: 32.8722,
        lng: 35.5492,
        zoom: 14,
        eventId: "savior-lovest-thou-me",
        year: 30,
        summary: "John 21:17 • 'Lord, thou knowest all things; thou knowest that I love thee. Jesus saith unto him, Feed my sheep.' The living Savior commissions His Apostles in unending love."
      },
      {
        title: "The Great Commission & 500 Brethren in Galilee",
        lat: 32.8242,
        lng: 35.4986,
        zoom: 13,
        eventId: "savior-great-commission-500",
        year: 30,
        summary: "Matthew 28:18-20; 1 Cor 15:6 • 'All power is given unto me in heaven and in earth. Go ye therefore, and teach all nations... and lo, I am with you alway.' The risen Redeemer appears to more than 500 brethren at once."
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
        title: "Isle of Patmos (Cave of the Apocalypse)",
        lat: 37.3090,
        lng: 26.5460,
        zoom: 11,
        eventId: "event-john-patmos-revelation",
        year: 95,
        summary: "John hears the voice as of a trumpet: 'I am the first and the last: I am he that liveth, and was dead.'"
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
