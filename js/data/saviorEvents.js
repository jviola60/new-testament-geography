/**
 * The Life, Ministry, Footsteps, Miracles, and Passion of Jesus Christ (~6 BC - 30 AD)
 * Chronological order with exact biblical coordinates, scriptures, and event descriptions.
 */
const SAVIOR_EVENTS = [
  {
    id: "savior-annunciation",
    title: "The Annunciation in Nazareth",
    year: -6,
    season: "Spring 6 BC",
    era: "Nativity & Infancy",
    lat: 32.7019,
    lng: 35.2979,
    locationName: "Nazareth, Galilee",
    category: "nativity",
    scriptures: [
      { ref: "Luke 1:26-38", text: "And the angel Gabriel was sent from God unto a city of Galilee, named Nazareth, to a virgin espoused to a man whose name was Joseph... And the angel said unto her, Fear not, Mary: for thou hast found favour with God." }
    ],
    description: "The angel Gabriel visits the Virgin Mary in humble Nazareth, announcing that she will conceive by the Holy Ghost and bear Jesus, the Son of the Highest."
  },
  {
    id: "savior-birth",
    title: "Birth of the Savior in Bethlehem",
    year: -5,
    season: "Winter 5 BC",
    era: "Nativity & Infancy",
    lat: 31.7054,
    lng: 35.2024,
    locationName: "Bethlehem, Judea",
    category: "nativity",
    scriptures: [
      { ref: "Luke 2:4-7", text: "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem... And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger." },
      { ref: "Micah 5:2", text: "But thou, Bethlehem Ephratah... out of thee shall he come forth unto me that is to be ruler in Israel." }
    ],
    description: "In fulfillment of prophecy, Jesus Christ is born in a manger in Bethlehem following the Roman census decreed by Caesar Augustus. Shepherds keep watch over their flocks as angels sing 'Glory to God in the highest'."
  },
  {
    id: "savior-flight-egypt",
    title: "Flight of the Holy Family into Egypt",
    year: -4,
    season: "Winter 4 BC",
    era: "Nativity & Infancy",
    lat: 31.2001,
    lng: 29.9187,
    locationName: "Alexandria / Nile Delta, Egypt",
    category: "nativity",
    scriptures: [
      { ref: "Matthew 2:13-15", text: "Arise, and take the young child and his mother, and flee into Egypt, and be thou there until I bring thee word: for Herod will seek the young child to destroy him." }
    ],
    description: "Warned by an angel in a dream of Herod the Great's decree of the massacre of the innocents, Joseph flees by night with Mary and the young Child to the safety of Egypt."
  },
  {
    id: "savior-return-nazareth",
    title: "Settlement in Nazareth",
    year: -3,
    season: "Spring 3 BC",
    era: "Nazareth Years",
    lat: 32.7019,
    lng: 35.2979,
    locationName: "Nazareth, Galilee",
    category: "childhood",
    scriptures: [
      { ref: "Matthew 2:23", text: "And he came and dwelt in a city called Nazareth: that it might be fulfilled which was spoken by the prophets, He shall be called a Nazarene." },
      { ref: "Luke 2:40", text: "And the child grew, and waxed strong in spirit, filled with wisdom: and the grace of God was upon him." }
    ],
    description: "Following Herod's death, the Holy Family returns from Egypt and settles in Nazareth of Galilee, where Jesus grows up learning carpentry under Joseph."
  },
  {
    id: "savior-temple-12",
    title: "Jesus at the Temple at Age Twelve",
    year: 8,
    season: "Passover 8 AD",
    era: "Nazareth Years",
    lat: 31.7775,
    lng: 35.2355,
    locationName: "Temple Mount, Jerusalem",
    category: "youth",
    scriptures: [
      { ref: "Luke 2:46-49", text: "After three days they found him in the temple, sitting in the midst of the doctors, both hearing them, and asking them questions... And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?" }
    ],
    description: "During the annual Passover pilgrimage to Jerusalem, the boy Jesus remains behind in the courts of the Temple, amazing the chief doctors of the law with His understanding and answers."
  },
  {
    id: "savior-baptism",
    title: "Baptism in the Jordan River by John",
    year: 26,
    season: "Autumn 26 AD",
    era: "Baptism & Judea",
    lat: 31.8385,
    lng: 35.5478,
    locationName: "Bethabara / Bethany Beyond Jordan",
    category: "ministry",
    scriptures: [
      { ref: "Matthew 3:16-17", text: "And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him, and he saw the Spirit of God descending like a dove, and lighting upon him: And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased." }
    ],
    description: "Jesus journeys to the Jordan River to be baptized of John the Baptist 'to fulfill all righteousness'. The Holy Ghost descends like a dove and the Father's voice witnesses from heaven."
  },
  {
    id: "savior-temptation",
    title: "Temptation in the Judean Wilderness",
    year: 26,
    season: "Winter 26 AD",
    era: "Baptism & Judea",
    lat: 31.8600,
    lng: 35.4300,
    locationName: "Mount of Temptation / Judean Wilderness",
    category: "ministry",
    scriptures: [
      { ref: "Matthew 4:1-11", text: "Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil. And when he had fasted forty days and forty nights, he was afterward an hungred." }
    ],
    description: "Jesus fasts for forty days and forty nights in the arid Judean wilderness overlooking Jericho, rebuking Satan's threefold temptations with the word of God ('It is written')."
  },
  {
    id: "savior-wedding-cana",
    title: "First Miracle: Water into Wine at Cana",
    year: 27,
    season: "Spring 27 AD",
    era: "Early Ministry",
    lat: 32.7481,
    lng: 35.3381,
    locationName: "Cana of Galilee",
    category: "miracle",
    scriptures: [
      { ref: "John 2:1-11", text: "This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him." }
    ],
    description: "At a marriage celebration in Cana, attended by His mother and disciples, Jesus transforms six stone waterpots into the finest wine, inaugurating His public miracles."
  },
  {
    id: "savior-nicodemus",
    title: "Nicodemus Visits Jesus by Night",
    year: 27,
    season: "Passover 27 AD",
    era: "Early Ministry",
    lat: 31.7767,
    lng: 35.2345,
    locationName: "Jerusalem, Judea",
    category: "teaching",
    scriptures: [
      { ref: "John 3:3-16", text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God... For God so loved the world, that he gave his only begotten Son." }
    ],
    description: "Nicodemus, a ruler of the Pharisees and member of the Sanhedrin, seeks Jesus in secret in Jerusalem, learning of the spiritual rebirth of water and of the Spirit."
  },
  {
    id: "savior-woman-samaria",
    title: "Living Water at Jacob's Well in Samaria",
    year: 27,
    season: "Autumn 27 AD",
    era: "Early Ministry",
    lat: 32.2133,
    lng: 35.2817,
    locationName: "Sychar (Jacob's Well), Samaria",
    category: "teaching",
    scriptures: [
      { ref: "John 4:13-14", text: "Whosoever drinketh of this water shall thirst again: But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life." }
    ],
    description: "Jesus travels through Samaria and rests at Jacob's Well. He transcends cultural barriers to speak with a Samaritan woman, declaring Himself to be the promised Messiah."
  },
  {
    id: "savior-rejection-nazareth",
    title: "Synagogue Sermon and Rejection at Nazareth",
    year: 28,
    season: "Spring 28 AD",
    era: "Galilean Ministry",
    lat: 32.7019,
    lng: 35.2979,
    locationName: "Nazareth, Galilee",
    category: "teaching",
    scriptures: [
      { ref: "Luke 4:18-21", text: "The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor... This day is this scripture fulfilled in your ears." }
    ],
    description: "In His hometown synagogue, Jesus reads Isaiah 61 and proclaims its fulfillment. The townsfolk, offended, attempt to cast Him down the brow of the hill, but He passes safely through their midst."
  },
  {
    id: "savior-base-capernaum",
    title: "Ministry Headquarters in Capernaum",
    year: 28,
    season: "Summer 28 AD",
    era: "Galilean Ministry",
    lat: 32.8808,
    lng: 35.5750,
    locationName: "Capernaum, Sea of Galilee",
    category: "miracle",
    scriptures: [
      { ref: "Matthew 4:13", text: "And leaving Nazareth, he came and dwelt in Capernaum, which is upon the sea coast, in the borders of Zabulon and Nephthalim." },
      { ref: "Mark 2:1-12", text: "And again he entered into Capernaum... and they uncover the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay." }
    ],
    description: "Jesus makes Capernaum His ministry center. In Peter's house and the Capernaum synagogue, He heals Peter's mother-in-law, casts out unclean spirits, and forgives and heals the paralytic."
  },
  {
    id: "savior-sermon-mount",
    title: "The Sermon on the Mount & Beatitudes",
    year: 28,
    season: "Autumn 28 AD",
    era: "Galilean Ministry",
    lat: 32.8814,
    lng: 35.5561,
    locationName: "Mount of Beatitudes (near Tabgha)",
    category: "teaching",
    scriptures: [
      { ref: "Matthew 5:3-14", text: "Blessed are the poor in spirit: for theirs is the kingdom of heaven... Ye are the light of the world. A city that is set on an hill cannot be hid." }
    ],
    description: "On a hillside gently sloping down toward the Sea of Galilee, Jesus delivers the constitution of His kingdom: the Beatitudes, the Lord's Prayer, and the foundational laws of love, forgiveness, and discipleship."
  },
  {
    id: "savior-calms-storm",
    title: "Calming the Tempest on the Sea of Galilee",
    year: 28,
    season: "Autumn 28 AD",
    era: "Galilean Ministry",
    lat: 32.8300,
    lng: 35.5800,
    locationName: "Sea of Galilee (Kinneret)",
    category: "miracle",
    scriptures: [
      { ref: "Mark 4:39", text: "And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm." }
    ],
    description: "When a sudden furious gale imperils the disciples' fishing boat, Jesus awakens from sleep at the stern, rebuking the winds and the waves into immediate stillness."
  },
  {
    id: "savior-feeding-5000",
    title: "Feeding the 5,000 at Bethsaida",
    year: 29,
    season: "Passover 29 AD",
    era: "Galilean Ministry",
    lat: 32.9090,
    lng: 35.6310,
    locationName: "A desert place belonging to Bethsaida (Luke 9:10)",
    category: "miracle",
    scriptures: [
      { ref: "Luke 9:10-17", text: "And he took them, and went aside privately into a desert place belonging to the city called Bethsaida... And they did eat, and were all filled: and there was taken up of fragments that remained to them twelve baskets." },
      { ref: "Mark 6:34-44", text: "And Jesus, when he came out, saw much people, and was moved with compassion toward them... And they took up twelve baskets full of the fragments, and of the fishes." },
      { ref: "Matthew 14:15-21", text: "They say unto him, We have here but five loaves, and two fishes... And they that had eaten were about five thousand men, beside women and children." }
    ],
    description: "He went aside into a desert place belonging to the city called Bethsaida (Luke 9:10) and fed about five thousand men (Luke 9:14; Mark 6:44; Matthew 14:21). John's lad-and-loaves account and the sea of Tiberias / Capernaum sequel belong to John 6, not this Bethsaida citation."
  },
  {
    id: "savior-walks-water",
    title: "Walking on Water",
    year: 29,
    season: "Spring 29 AD",
    era: "Galilean Ministry",
    lat: 32.8600,
    lng: 35.5650,
    locationName: "Sea of Galilee",
    category: "miracle",
    scriptures: [
      { ref: "Matthew 14:27-31", text: "Be of good cheer; it is I; be not afraid. And Peter answered him and said, Lord, if it be thou, bid me come unto thee on the water. And he said, Come." }
    ],
    description: "In the fourth watch of the night, Jesus walks out across the churning water to the disciples' boat. Peter steps out in faith until fear overtakes him, whereupon Christ catches his hand."
  },
  {
    id: "savior-peter-confession",
    title: "Peter's Confession at Caesarea Philippi",
    year: 29,
    season: "Summer 29 AD",
    era: "Galilean Ministry",
    lat: 33.2483,
    lng: 35.6933,
    locationName: "Caesarea Philippi (Paneas)",
    category: "teaching",
    scriptures: [
      { ref: "Matthew 16:16-18", text: "Simon Peter answered and said, Thou art the Christ, the Son of the living God... And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it." }
    ],
    description: "At the northern boundary of the Holy Land before pagan grottoes, Jesus asks, 'Whom say ye that I am?' Peter professes divine revelation, and Christ promises the keys of the kingdom."
  },
  {
    id: "savior-transfiguration",
    title: "The Transfiguration on a High Mountain",
    year: 29,
    season: "Summer 29 AD",
    era: "Galilean Ministry",
    lat: 33.4167,
    lng: 35.8500,
    locationName: "A high mountain apart (Matthew 17:1); Hermon is a traditional identification",
    category: "miracle",
    scriptures: [
      { ref: "Matthew 17:1-5", text: "And after six days Jesus taketh Peter, James, and John his brother, and bringeth them up into an high mountain apart, And was transfigured before them: and his face did shine as the sun, and his raiment was white as the light." }
    ],
    description: "Jesus takes Peter, James, and John up into a high mountain apart (Matthew 17:1). Moses and Elijah appear in glory, and the Father speaks from a bright cloud. The Gospels do not name the peak; Mount Hermon is a traditional identification only."
  },
  {
    id: "savior-raising-lazarus",
    title: "Raising Lazarus from the Dead at Bethany",
    year: 30,
    season: "Winter 30 AD",
    era: "Judea & Final Journey",
    lat: 31.7719,
    lng: 35.2617,
    locationName: "Bethany (near Jerusalem)",
    category: "miracle",
    scriptures: [
      { ref: "John 11:25, 43", text: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live... He cried with a loud voice, Lazarus, come forth." }
    ],
    description: "At Bethany, weeping with Mary and Martha, Jesus stands before the tomb of Lazarus who has lain dead four days, commanding him forth alive, confirming Himself as Lord over death."
  },
  {
    id: "savior-triumphal-entry",
    title: "Triumphal Entry into Jerusalem (Palm Sunday)",
    year: 30,
    season: "Spring 30 AD (Nisan 9)",
    era: "Passion Week",
    lat: 31.7781,
    lng: 35.2450,
    locationName: "Mount of Olives to Jerusalem",
    category: "passion",
    scriptures: [
      { ref: "Luke 19:37-38", text: "The whole multitude of the disciples began to rejoice and praise God with a loud voice for all the mighty works that they had seen; Saying, Blessed be the King that cometh in the name of the Lord!" }
    ],
    description: "Riding an unbroken colt from the Mount of Olives into the holy city, Jesus is hailed by disciples waving palm branches and laying cloaks upon the road, weeping over Jerusalem's impending ruin."
  },
  {
    id: "savior-cleansing-temple",
    title: "Cleansing the Temple Courts",
    year: 30,
    season: "Spring 30 AD (Nisan 10)",
    era: "Passion Week",
    lat: 31.7775,
    lng: 35.2355,
    locationName: "Temple Court of the Gentiles, Jerusalem",
    category: "passion",
    scriptures: [
      { ref: "Matthew 21:12-13", text: "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers... My house shall be called the house of prayer; but ye have made it a den of thieves." }
    ],
    description: "Zealous for His Father's sanctuary, Jesus overturns the tables of the extortionate money changers and dove merchants, healing the blind and the lame who come to Him in the temple."
  },
  {
    id: "savior-last-supper",
    title: "The Last Supper in the Upper Room",
    year: 30,
    season: "Spring 30 AD (Passover Eve)",
    era: "Passion Week",
    lat: 31.7717,
    lng: 35.2289,
    locationName: "Upper Room (Cenacle), Mount Zion, Jerusalem",
    category: "passion",
    scriptures: [
      { ref: "Luke 22:19-20", text: "And he took bread, and gave thanks, and brake it, and gave unto them, saying, This is my body which is given for you: this do in remembrance of me. Likewise also the cup after supper, saying, This cup is the new testament in my blood." }
    ],
    description: "Jesus washes the disciples' feet, institutes the holy Sacrament / Lord's Supper, identifies Judas's impending betrayal, and gives the great farewell discourse on the Vine and branches."
  },
  {
    id: "savior-gethsemane",
    title: "The Agony and Atonement in Gethsemane",
    year: 30,
    season: "Spring 30 AD (Thursday Night)",
    era: "Passion Week",
    lat: 31.7794,
    lng: 35.2397,
    locationName: "Garden of Gethsemane, Mount of Olives",
    category: "passion",
    scriptures: [
      { ref: "Luke 22:42-44", text: "Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done... And being in an agony he prayed more earnestly: and his sweat was as it were great drops of blood falling down to the ground." }
    ],
    description: "In the olive grove across the Kidron Valley, Jesus takes upon Himself the sins and infirmities of mankind. An angel strengthens Him as He sweats great drops of blood, submitting to the Father's will before being betrayed with a kiss."
  },
  {
    id: "savior-crucifixion",
    title: "Crucifixion and Death on Golgotha",
    year: 30,
    season: "Spring 30 AD (Good Friday)",
    era: "Passion Week",
    lat: 31.7785,
    lng: 35.2298,
    locationName: "Golgotha / Calvary, Jerusalem",
    category: "passion",
    scriptures: [
      { ref: "Luke 23:34, 46", text: "Then said Jesus, Father, forgive them; for they know not what they do... Father, into thy hands I commend my spirit: and having said thus, he gave up the ghost." },
      { ref: "John 19:30", text: "When Jesus therefore had received the vinegar, he said, It is finished: and he bowed his head, and gave up the ghost." }
    ],
    description: "Condemned unjustly before Caiaphas and Pontius Pilate, scourged and crowned with thorns, the Lamb of God bears His cross to Golgotha. He is crucified between two thieves, darkness covers the earth, the temple veil is rent, and He completes the eternal Atonement."
  },
  {
    id: "savior-resurrection",
    title: "The Glorious Resurrection at the Garden Tomb",
    year: 30,
    season: "Spring 30 AD (Easter Sunday)",
    era: "Passion Week",
    lat: 31.7836,
    lng: 35.2300,
    locationName: "The Empty Tomb, Jerusalem",
    category: "resurrection",
    scriptures: [
      { ref: "Matthew 28:5-6", text: "And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said. Come, see the place where the Lord lay." },
      { ref: "John 20:16", text: "Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni; which is to say, Master." }
    ],
    description: "On the third day, the heavy stone is rolled away from the sepulchre. Angels proclaim Christ's victory over the grave. The risen Lord appears first to Mary Magdalene in the garden, and subsequently to Peter and the apostles."
  },
  {
    id: "savior-emmaus",
    title: "Appearance on the Road to Emmaus",
    year: 30,
    season: "Spring 30 AD (Resurrection Day)",
    era: "Resurrection",
    lat: 31.8394,
    lng: 34.9886,
    locationName: "Road to Emmaus",
    category: "resurrection",
    scriptures: [
      { ref: "Luke 24:30-32", text: "And it came to pass, as he sat at meat with them, he took bread, and blessed it, and brake, and gave to them. And their eyes were opened, and they knew him... Did not our heart burn within us, while he talked with us by the way?" }
    ],
    description: "The resurrected Christ joins Cleopas and another disciple walking toward Emmaus, expounding all scriptures concerning Himself, and is recognized in the breaking of bread."
  },
  {
    id: "savior-ascension",
    title: "The Ascension from the Mount of Olives",
    year: 30,
    season: "Spring 30 AD (40 Days Post-Resurrection)",
    era: "Ascension",
    lat: 31.7781,
    lng: 35.2450,
    locationName: "Mount of Olives, Jerusalem",
    category: "ascension",
    scriptures: [
      { ref: "Acts 1:9-11", text: "And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight... This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven." }
    ],
    description: "Having spent forty days instructing His disciples and issuing the Great Commission to preach the Gospel to all nations, the Savior ascends into heaven from the Mount of Olives as angels testify of His glorious return."
  }
];
