/**
 * Official New Testament Bible Videos from ChurchofJesusChrist.org
 * Verified against the official directory:
 * https://www.churchofjesuschrist.org/tools/help/new-testament-videos?lang=eng
 */

const CHURCH_BIBLE_VIDEOS = [
  // --- NATIVITY & EARLY LIFE ---
  {
    id: "the-nativity",
    title: "The Nativity",
    scriptureRef: "Luke 2:1–20; Matthew 1–2",
    duration: "5:52",
    category: "Nativity",
    locations: ["bethlehem", "nazareth", "judea"],
    description: "Mary and Joseph travel to Bethlehem where Jesus Christ is born in a humble stable, heralded by angels to shepherds keeping watch over their flocks.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1470-the-nativity?lang=eng",
    thumbnailText: "Mary, Joseph, and the Christ Child in Bethlehem"
  },
  {
    id: "increased-in-wisdom",
    title: "Increased In Wisdom",
    scriptureRef: "Luke 2:40–52",
    duration: "1:06",
    category: "Youth",
    locations: ["nazareth", "jerusalem", "galilee"],
    description: "Jesus grew and waxed strong in spirit, filled with wisdom, and the grace of God was upon Him in Nazareth and Jerusalem.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1480-increased-in-wisdom?lang=eng",
    thumbnailText: "The youth of the Savior in Nazareth"
  },
  {
    id: "jesus-creator",
    title: "Jesus Was God The Creator",
    scriptureRef: "John 1:1–3, 14",
    duration: "1:40",
    category: "Divinity",
    locations: ["galilee", "judea", "jerusalem"],
    description: "In the beginning was the Word, and the Word was with God, and the Word was God. All things were made by Him.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1660-jesus-was-god-the-creator?lang=eng",
    thumbnailText: "The Premortal and Divine Christ"
  },
  {
    id: "finding-the-lamb",
    title: "Finding The Lamb",
    scriptureRef: "John 1:35–42",
    duration: "3:09",
    category: "Ministry",
    locations: ["bethabara", "river-jordan", "galilee", "judea"],
    description: "John the Baptist declares, 'Behold the Lamb of God!' Andrew and another disciple hear him speak and follow Jesus.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1670-finding-the-lamb?lang=eng",
    thumbnailText: "John the Baptist bears testimony of Christ at the Jordan"
  },
  {
    id: "come-and-see",
    title: "Come And See",
    scriptureRef: "John 1:38–51",
    duration: "1:30",
    category: "Discipleship",
    locations: ["galilee", "bethsaida", "river-jordan"],
    description: "Jesus invites the inquiring disciples to 'Come and see.' Philip invites Nathanael to meet Jesus of Nazareth.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1680-come-and-see?lang=eng",
    thumbnailText: "Christ calls His first disciples in Galilee"
  },
  {
    id: "stand-firm",
    title: "Stand Firm: Overcoming Temptation",
    scriptureRef: "Luke 4:1–13; Matthew 4:1–11",
    duration: "0:27",
    category: "Ministry",
    locations: ["judea", "jericho", "dead-sea", "jerusalem"],
    description: "In the Judean wilderness, Jesus stands firm against the adversary's temptations using the power of holy scripture.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1500-stand-firm?lang=eng",
    thumbnailText: "Temptation in the Judean wilderness"
  },
  {
    id: "born-again-nicodemus",
    title: "Born Again: Jesus Teaches Nicodemus",
    scriptureRef: "John 3:1–21",
    duration: "2:02",
    category: "Teachings",
    locations: ["jerusalem", "judea"],
    description: "Jesus teaches the ruler Nicodemus that except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1700-born-again?lang=eng",
    thumbnailText: "Jesus teaches Nicodemus by night in Jerusalem"
  },
  {
    id: "heavenly-things",
    title: "Heavenly Things",
    scriptureRef: "John 3:12–17",
    duration: "8:55",
    category: "Teachings",
    locations: ["jerusalem", "judea"],
    description: "For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1690-heavenly-things?lang=eng",
    thumbnailText: "God so loved the world that He gave His Son"
  },

  // --- SAMARIA & WATER OF LIFE ---
  {
    id: "woman-at-the-well",
    title: "The Woman at the Well",
    scriptureRef: "John 4:1–42",
    duration: "7:29",
    category: "Ministry",
    locations: ["sychar", "samaria", "jacobs-well"],
    description: "At Jacob's Well in Sychar of Samaria, Jesus reveals His messianic mission to a Samaritan woman and offers living water.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1710-the-woman-at-the-well?lang=eng",
    thumbnailText: "Jesus at Jacob's Well in Sychar"
  },
  {
    id: "living-water",
    title: "Living Water",
    scriptureRef: "John 4:10–14",
    duration: "2:32",
    category: "Teachings",
    locations: ["samaria", "sychar", "jacobs-well"],
    description: "Whosoever drinketh of the water that I shall give him shall never thirst; but it shall be in him a well of water springing up into everlasting life.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1720-living-water?lang=eng",
    thumbnailText: "The living water of eternal life"
  },

  // --- GALILEE & MIRACLES ---
  {
    id: "peter-walks-on-water",
    title: "Peter Walks On Water",
    scriptureRef: "Matthew 14:22–33; Mark 6:45–52",
    duration: "1:50",
    category: "Miracles",
    locations: ["sea-of-galilee", "capernaum", "galilee", "gennesaret"],
    description: "During a storm on the Sea of Galilee, Jesus walks upon the water. Peter steps out in faith, and Jesus rescues him with hand outstretched.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1300-peter-walks-on-water?lang=eng",
    thumbnailText: "Jesus saves Peter walking on the waves"
  },
  {
    id: "lifes-storms",
    title: "Life’s Storms: Peace, Be Still",
    scriptureRef: "Mark 4:35–41",
    duration: "2:54",
    category: "Miracles",
    locations: ["sea-of-galilee", "galilee", "capernaum", "tiberias"],
    description: "As violent waves crash over their ship on the Sea of Galilee, Jesus arises and rebukes the wind: 'Peace, be still.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1410-lifes-storms?lang=eng",
    thumbnailText: "Jesus calms the tempest on Galilee"
  },
  {
    id: "miracles-of-jesus",
    title: "Miracles of the Savior",
    scriptureRef: "Mark 1:23–34; 2:1–12",
    duration: "0:15",
    category: "Miracles",
    locations: ["capernaum", "galilee"],
    description: "In Capernaum, Jesus heals the sick, casts out unclean spirits, and heals the man sick of the palsy.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1380-miracles?lang=eng",
    thumbnailText: "Healing and ministry in Capernaum"
  },
  {
    id: "we-must-believe",
    title: "We Must Believe: Jairus’ Daughter",
    scriptureRef: "Mark 5:22–43; Luke 8:41–56",
    duration: "1:18",
    category: "Miracles",
    locations: ["capernaum", "galilee"],
    description: "Jesus brings hope to Jairus in Capernaum: 'Be not afraid, only believe.' He raises the young daughter saying, 'Talitha cumi.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1420-we-must-believe?lang=eng",
    thumbnailText: "Raising Jairus' daughter in Capernaum"
  },
  {
    id: "widow-of-nain",
    title: "The Widow of Nain",
    scriptureRef: "Luke 7:11–17",
    duration: "0:49",
    category: "Miracles",
    locations: ["nain", "galilee", "nazareth"],
    description: "Approaching the gate of Nain in Galilee, Jesus has compassion on a grieving widow and raises her only son from the dead.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1510-widow-of-nain?lang=eng",
    thumbnailText: "Jesus raises the widow's son at Nain"
  },
  {
    id: "power-to-raise-dead",
    title: "Power to Raise the Dead & Minister",
    scriptureRef: "Matthew 10:1–15; Luke 9:1–6",
    duration: "5:44",
    category: "Apostles",
    locations: ["galilee", "capernaum", "judea"],
    description: "Jesus commissions His Twelve Apostles, giving them power against unclean spirits and to heal all manner of sickness.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1250-power-to-raise-the-dead?lang=eng",
    thumbnailText: "Commissioning the Twelve Apostles in Galilee"
  },
  {
    id: "lifts-our-burdens",
    title: "Come unto Me and I Will Give You Rest",
    scriptureRef: "Matthew 11:28–30",
    duration: "2:13",
    category: "Teachings",
    locations: ["galilee", "capernaum", "chorazin", "bethsaida"],
    description: "'Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1260-lifts-our-burdens?lang=eng",
    thumbnailText: "The Savior's eternal invitation of rest"
  },
  {
    id: "test-of-faith",
    title: "A Test of Faith",
    scriptureRef: "Matthew 9:18–31",
    duration: "8:33",
    category: "Faith",
    locations: ["capernaum", "galilee"],
    description: "According to your faith be it unto you. Blind men receive sight and the faithful find healing in Capernaum.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1240-a-test-of-faith?lang=eng",
    thumbnailText: "Faith and healing in Galilee"
  },
  {
    id: "pray-in-solitude",
    title: "Pray In Solitude",
    scriptureRef: "Mark 1:35; Luke 5:16",
    duration: "1:12",
    category: "Teachings",
    locations: ["galilee", "capernaum", "mount-of-beatitudes"],
    description: "Rising up a great while before day, Jesus departs into a solitary desert place and there prays.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1390-pray-in-solitude?lang=eng",
    thumbnailText: "The Savior's example of personal prayer in Galilee"
  },
  {
    id: "keeping-the-sabbath",
    title: "Keeping The Sabbath",
    scriptureRef: "Mark 2:23–28; Matthew 12:1–13",
    duration: "1:05",
    category: "Teachings",
    locations: ["galilee", "capernaum"],
    description: "The Sabbath was made for man, and not man for the Sabbath: Therefore the Son of man is Lord also of the Sabbath.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1400-keeping-the-sabbath?lang=eng",
    thumbnailText: "Lord of the Sabbath in Galilee"
  },

  // --- CAESAREA PHILIPPI & THE KEYS ---
  {
    id: "keys-restored",
    title: "The Keys of the Kingdom",
    scriptureRef: "Matthew 16:13–19",
    duration: "1:18",
    category: "Apostles",
    locations: ["caesarea-philippi", "galilee", "mount-hermon"],
    description: "In Caesarea Philippi, Peter testifies, 'Thou art the Christ.' Jesus promises the keys of the kingdom of heaven.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1320-keys-restored?lang=eng",
    thumbnailText: "Peter receives keys at Caesarea Philippi"
  },

  // --- PARABLES & TEACHINGS ---
  {
    id: "good-samaritan",
    title: "Parable of the Good Samaritan",
    scriptureRef: "Luke 10:25–37",
    duration: "1:33",
    category: "Parables",
    locations: ["jericho", "jerusalem", "judea", "samaria"],
    description: "On the dangerous road from Jerusalem down to Jericho, a Samaritan shows divine mercy to a wounded traveler.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1550-good-samaritan?lang=eng",
    thumbnailText: "The road from Jerusalem to Jericho"
  },
  {
    id: "prodigal-son",
    title: "The Prodigal Son",
    scriptureRef: "Luke 15:11–32",
    duration: "1:56",
    category: "Parables",
    locations: ["galilee", "perea", "judea"],
    description: "The parable of the loving father who runs to welcome home his repentant younger son with open arms and joyous celebration.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1590-prodigal-son?lang=eng",
    thumbnailText: "The Father's forgiving embrace"
  },
  {
    id: "good-shepherd",
    title: "The Good Shepherd",
    scriptureRef: "John 10:1–18, 27–30",
    duration: "3:04",
    category: "Teachings",
    locations: ["jerusalem", "temple-mount", "judea"],
    description: "'I am the good shepherd: the good shepherd giveth his life for the sheep.' My sheep hear my voice, and I know them.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1760-good-shepherd?lang=eng",
    thumbnailText: "The Good Shepherd at Solomon's Porch in Jerusalem"
  },
  {
    id: "taking-blessings-for-granted-ten-lepers",
    title: "The Ten Lepers: Where Are the Nine?",
    scriptureRef: "Luke 17:11–19",
    duration: "3:35",
    category: "Miracles",
    locations: ["samaria", "galilee"],
    description: "As Jesus passes through the midst of Samaria and Galilee, ten lepers are cleansed, but only one returns to give thanks.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1600-taking-the-lords-blessings-for-granted?lang=eng",
    thumbnailText: "Cleansing ten lepers between Samaria and Galilee"
  },
  {
    id: "occupied-with-routine",
    title: "Mary and Martha: That Good Part",
    scriptureRef: "Luke 10:38–42",
    duration: "0:19",
    category: "Teachings",
    locations: ["bethany", "judea", "jerusalem"],
    description: "In Bethany, Martha is cumbered about much serving, while Mary sits at Jesus' feet. One thing is needful.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1570-occupied-with-routine?lang=eng",
    thumbnailText: "At the home of Mary and Martha in Bethany"
  },
  {
    id: "raising-of-lazarus",
    title: "I Am the Resurrection and the Life: Lazarus",
    scriptureRef: "John 11:1–44",
    duration: "1:23",
    category: "Miracles",
    locations: ["bethany", "judea", "jerusalem"],
    description: "In Bethany near Jerusalem, Jesus declares, 'I am the resurrection, and the life' before commanding Lazarus to come forth from the tomb.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1770-i-am-the-resurrection-and-the-life?lang=eng",
    thumbnailText: "Jesus raises Lazarus from the tomb in Bethany"
  },

  // --- JERUSALEM MINISTRY, PASSION & RESURRECTION ---
  {
    id: "reverence-in-temple",
    title: "Cleansing the Temple: Reverence",
    scriptureRef: "Mark 11:15–18; Luke 19:45–48",
    duration: "0:58",
    category: "Ministry",
    locations: ["jerusalem", "temple-mount", "judea"],
    description: "Jesus casts out buyers and sellers in the Temple Court in Jerusalem, declaring, 'My house shall be called of all nations the house of prayer.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1440-reverence-invites-revelation?lang=eng",
    thumbnailText: "Jesus in the Temple courts of Jerusalem"
  },
  {
    id: "hypocrisy-scribes-pharisees",
    title: "Hypocrisy and the Scribes and Pharisees",
    scriptureRef: "Matthew 23:1–39",
    duration: "0:34",
    category: "Teachings",
    locations: ["jerusalem", "temple-mount", "judea"],
    description: "Jesus rebukes religious hypocrisy at the Temple in Jerusalem and reminds disciples of justice, mercy, and faith.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1350-hypocrisy?lang=eng",
    thumbnailText: "Teaching at the Second Temple in Jerusalem"
  },
  {
    id: "sacredness-of-sacrament",
    title: "The Last Supper: Sacredness of the Sacrament",
    scriptureRef: "Matthew 26:26–29; Luke 22:14–20",
    duration: "2:59",
    category: "Sacrament",
    locations: ["jerusalem", "upper-room", "mount-zion"],
    description: "In an Upper Room in Jerusalem, Jesus institutes the Sacrament: 'Take, eat; this is my body... this is my blood of the new testament.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1370-sacredness-of-the-sacrament?lang=eng",
    thumbnailText: "The Last Supper in the Upper Room in Jerusalem"
  },
  {
    id: "strengthen-thy-brethren",
    title: "Strengthen Thy Brethren",
    scriptureRef: "Luke 22:31–34",
    duration: "1:48",
    category: "Apostles",
    locations: ["jerusalem", "upper-room"],
    description: "Jesus cautions Peter at the Last Supper: 'I have prayed for thee, that thy faith fail not: and when thou art converted, strengthen thy brethren.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1640-strengthen-thy-brethren?lang=eng",
    thumbnailText: "Peter and the Savior in Jerusalem"
  },
  {
    id: "comfortless-holy-ghost",
    title: "I Will Not Leave You Comfortless",
    scriptureRef: "John 14:15–27",
    duration: "2:50",
    category: "Teachings",
    locations: ["jerusalem", "upper-room"],
    description: "'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1780-comfortless?lang=eng",
    thumbnailText: "The Savior's farewell discourse in Jerusalem"
  },
  {
    id: "true-vine",
    title: "I Am The True Vine",
    scriptureRef: "John 15:1–12",
    duration: "2:37",
    category: "Teachings",
    locations: ["jerusalem", "mount-of-olives", "kidron-valley"],
    description: "'I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1790-true-vine?lang=eng",
    thumbnailText: "Crossing Kidron Valley toward the Mount of Olives"
  },
  {
    id: "gethsemane-atonement",
    title: "Gethsemane",
    scriptureRef: "Matthew 26:36–46; Luke 22:39–46",
    duration: "0:45",
    category: "Atonement",
    locations: ["gethsemane", "mount-of-olives", "jerusalem", "kidron-valley"],
    description: "In the Garden of Gethsemane at the foot of the Mount of Olives, the Savior kneels and works the infinite Atonement for all mankind.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1090-gethsemane?lang=eng",
    thumbnailText: "The Garden of Gethsemane in Jerusalem"
  },
  {
    id: "testimony-saviors-suffering",
    title: "Testimony of the Savior’s Suffering",
    scriptureRef: "John 18:1–14; Matthew 26:47–56",
    duration: "2:38",
    category: "Passion",
    locations: ["gethsemane", "jerusalem", "kidron-valley"],
    description: "In Gethsemane, officers and chief priests arrive. Jesus willingly yields Himself to drink the cup the Father gave Him.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1800-testimony-of-the-saviors-suffering?lang=eng",
    thumbnailText: "Arrest and submission in Gethsemane"
  },
  {
    id: "to-this-end-was-i-born",
    title: "To This End Was I Born: The Passion & Triumph",
    scriptureRef: "Matthew 26–28; John 18–19",
    duration: "27:11",
    category: "Atonement",
    locations: ["jerusalem", "golgotha", "praetorium", "garden-tomb", "gethsemane"],
    description: "A profound depiction of the Savior's final hours: Gethsemane, trial before Pilate, Golgotha, and glorious Resurrection on the third day.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1360-to-this-end-was-i-born?lang=eng",
    thumbnailText: "The mortal ministry and Resurrection of Christ"
  },
  {
    id: "living-christ-resurrection",
    title: "The Living Christ: He Is Risen",
    scriptureRef: "Mark 16:1–14; Matthew 28:1–10",
    duration: "1:01",
    category: "Resurrection",
    locations: ["jerusalem", "garden-tomb", "judea"],
    description: "On the first day of the week, the angel proclaims: 'He is not here: for he is risen, as he said. Come, see the place where the Lord lay.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1460-living-christ?lang=eng",
    thumbnailText: "The empty tomb in Jerusalem on Easter morning"
  },
  {
    id: "wine-press-resurrection",
    title: "The Risen Lord Appears to Mary and the Apostles",
    scriptureRef: "John 20:1–23",
    duration: "4:00",
    category: "Resurrection",
    locations: ["jerusalem", "garden-tomb", "upper-room"],
    description: "The resurrected Savior appears to Mary Magdalene at the garden sepulchre, and to His disciples behind shut doors saying, 'Peace be unto you.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1810-wine-press?lang=eng",
    thumbnailText: "Resurrected Lord appears to disciples in Jerusalem"
  },
  {
    id: "except-i-shall-see-thomas",
    title: "Except I Shall See: Blessed Are They That Have Not Seen",
    scriptureRef: "John 20:24–29",
    duration: "2:30",
    category: "Faith",
    locations: ["jerusalem", "upper-room"],
    description: "Eight days later in Jerusalem, Jesus bids Thomas: 'Reach hither thy hand... be not faithless, but believing.' Thomas responds: 'My Lord and my God.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1820-except-i-shall-see?lang=eng",
    thumbnailText: "Thomas confesses the resurrected Lord in Jerusalem"
  },
  {
    id: "road-to-emmaus",
    title: "The Road to Emmaus",
    scriptureRef: "Luke 24:13–35",
    duration: "5:34",
    category: "Resurrection",
    locations: ["emmaus", "jerusalem", "judea"],
    description: "Two disciples walk toward Emmaus when the risen Savior accompanies them, expounding scriptures until their hearts burn within them.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1650-the-road-to-emmaus?lang=eng",
    thumbnailText: "Walking with the Savior on the road to Emmaus"
  },
  {
    id: "feed-my-lambs-galilee",
    title: "Feed My Lambs: Sea of Tiberias",
    scriptureRef: "John 21:1–17",
    duration: "0:25",
    category: "Apostles",
    locations: ["sea-of-galilee", "tiberias", "galilee", "capernaum"],
    description: "On the shore of the Sea of Galilee, the resurrected Savior asks Peter three times: 'Lovest thou me?' and commands him: 'Feed my sheep.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1880-feed-my-lambs?lang=eng",
    thumbnailText: "Feed my sheep at the Sea of Galilee"
  },

  // --- ACTS OF THE APOSTLES & MISSIONS ---
  {
    id: "a-new-apostle-matthias",
    title: "A New Apostle: Matthias Called",
    scriptureRef: "Acts 1:15–26",
    duration: "1:01",
    category: "Acts",
    locations: ["jerusalem", "mount-zion", "upper-room"],
    description: "In the Upper Room in Jerusalem, the Apostles pray and Matthias is numbered with the eleven apostles as a special witness of the Resurrection.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1890-a-new-apostle?lang=eng",
    thumbnailText: "Calling Matthias in Jerusalem"
  },
  {
    id: "peter-heals-lame-man",
    title: "The Lame Man Healed at the Beautiful Gate",
    scriptureRef: "Acts 3:1–16",
    duration: "2:15",
    category: "Acts",
    locations: ["jerusalem", "temple-mount", "beautiful-gate"],
    description: "Peter proclaims at the Temple Gate Beautiful: 'Silver and gold have I none; but such as I have give I thee: In the name of Jesus Christ of Nazareth rise up and walk.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1900-the-lame-man?lang=eng",
    thumbnailText: "Peter and John heal the lame man at the Temple"
  },
  {
    id: "ananias-and-sapphira",
    title: "Ananias and Sapphira",
    scriptureRef: "Acts 5:1–11",
    duration: "1:19",
    category: "Acts",
    locations: ["jerusalem", "judea"],
    description: "The early Church in Jerusalem is taught solemn integrity in consecrated offerings before God.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1910-ananias-and-sapphira?lang=eng",
    thumbnailText: "Integrity in the early Jerusalem Church"
  },
  {
    id: "godhead-stephen",
    title: "Stephen’s Vision of the Godhead",
    scriptureRef: "Acts 7:51–60",
    duration: "1:57",
    category: "Acts",
    locations: ["jerusalem", "kidron-valley", "judea"],
    description: "Being full of the Holy Ghost, Stephen looks up steadfastly into heaven and sees the glory of God, and Jesus standing on the right hand of God.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1920-godhead?lang=eng",
    thumbnailText: "Stephen sees the heavens opened outside Jerusalem"
  },
  {
    id: "long-promised-day-cornelius",
    title: "The Long-Promised Day: Cornelius & Peter",
    scriptureRef: "Acts 10:1–48",
    duration: "8:38",
    category: "Acts",
    locations: ["caesarea", "joppa", "judea", "samaria"],
    description: "At Joppa and Caesarea Maritima, Peter receives revelation that the gospel of Jesus Christ is to be proclaimed to all nations and peoples.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1930-long-promised-day?lang=eng",
    thumbnailText: "Peter preaches to Cornelius in Caesarea"
  },
  {
    id: "respector-of-persons",
    title: "God Is No Respecter of Persons",
    scriptureRef: "Acts 10:34–43",
    duration: "1:09",
    category: "Acts",
    locations: ["caesarea", "judea"],
    description: "'Of a truth I perceive that God is no respecter of persons: But in every nation he that feareth him, and worketh righteousness, is accepted with him.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1940-respector-of-persons?lang=eng",
    thumbnailText: "Peter declares gospel universality in Caesarea"
  },
  {
    id: "culture-of-christ",
    title: "The Culture of Christ: Jerusalem Council",
    scriptureRef: "Acts 15:1–29",
    duration: "1:29",
    category: "Acts",
    locations: ["jerusalem", "antioch", "syria", "judea"],
    description: "The Apostles and elders assemble in Jerusalem to counsel together under revelation regarding the unity of Jewish and Gentile disciples.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1950-culture-of-christ?lang=eng",
    thumbnailText: "The Council of Jerusalem"
  },
  {
    id: "proclaim-the-gospel-philippi",
    title: "Proclaim The Gospel in Macedonia & Philippi",
    scriptureRef: "Acts 16:9–15",
    duration: "2:21",
    category: "Missions",
    locations: ["philippi", "macedonia", "troas", "greece", "neapolis"],
    description: "Responding to the Macedonian call, Paul, Silas, and Luke sail to Philippi in Europe, teaching Lydia and baptizing believers by the riverside.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1960-proclaim-the-gospel?lang=eng",
    thumbnailText: "Paul preaches at Philippi in Macedonia"
  },
  {
    id: "spread-doubt-miletus",
    title: "Paul’s Farewell to the Ephesian Elders at Miletus",
    scriptureRef: "Acts 20:17–38",
    duration: "1:10",
    category: "Missions",
    locations: ["miletus", "ephesus", "asia-minor"],
    description: "At the port of Miletus, Paul summons the elders of Ephesus, urging them to feed the church of God which He hath purchased with His own blood.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1970-spread-doubt?lang=eng",
    thumbnailText: "Paul exhorts the Ephesian elders at Miletus"
  },
  {
    id: "paul-chosen-vessel",
    title: "Paul: A Chosen Vessel",
    scriptureRef: "Acts 21–28",
    duration: "11:24",
    category: "Missions",
    locations: ["jerusalem", "caesarea", "rome", "malta", "italy"],
    description: "The inspiring saga of Paul's trials in Jerusalem, defense before Roman governors in Caesarea, tempestuous voyage, and preaching in Rome.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1980-paul-a-chosen-vessel?lang=eng",
    thumbnailText: "Paul's apostolic ministry from Jerusalem to Rome"
  },
  {
    id: "valiant-in-testimony-caesarea",
    title: "Valiant In Testimony Before Governors",
    scriptureRef: "Acts 24:10–25; 26:1–29",
    duration: "0:37",
    category: "Missions",
    locations: ["caesarea", "judea"],
    description: "Imprisoned at Caesarea Maritima, Paul testifies boldly of the Resurrection before governor Felix and King Agrippa.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-2000-valiant-in-testimony?lang=eng",
    thumbnailText: "Paul testifies in Caesarea"
  },
  {
    id: "prophets-warning-shipwreck",
    title: "Prophet’s Warning: Voyage to Rome",
    scriptureRef: "Acts 27:9–44",
    duration: "1:24",
    category: "Missions",
    locations: ["crete", "malta", "mediterranean", "rome", "italy"],
    description: "On the tempest-tossed Mediterranean ship heading toward Rome, Paul encourages the crew: 'Be of good cheer: for there shall be no loss of any man’s life.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-2010-prophets-warning?lang=eng",
    thumbnailText: "Paul during shipwreck on the journey to Rome"
  },
  {
    id: "growing-through-trials-malta-rome",
    title: "Growing Through Life’s Trials: Malta to Rome",
    scriptureRef: "Acts 28:1–16, 30–31",
    duration: "1:00",
    category: "Missions",
    locations: ["malta", "rome", "italy", "syracuse", "puteoli"],
    description: "After shipwreck on the island of Malta, Paul arrives in Rome, dwelling two whole years in his own hired house preaching the kingdom of God.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-2020-growing-through-lifes-trials?lang=eng",
    thumbnailText: "Paul preaches unhindered in Rome"
  },

  // --- BIBLICAL CUSTOMS, GEOGRAPHY & CULTURAL BACKGROUND ---
  {
    id: "synagogue-worship",
    title: "Synagogue Worship in the New Testament",
    scriptureRef: "Luke 4:16–21; Acts 13:14–43",
    duration: "0:36",
    category: "Culture",
    locations: ["nazareth", "capernaum", "antioch-pisidia", "galilee", "judea"],
    description: "Insight into Sabbath worship, reading of the Torah and Prophets, and the synagogue setting of Christ's and Paul's teachings.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1190-synagogue-worship?lang=eng",
    thumbnailText: "Synagogue service in biblical antiquity"
  },
  {
    id: "the-anointed-one",
    title: "The Anointed One (Messiah / Christ)",
    scriptureRef: "Luke 4:18; Acts 10:38",
    duration: "0:40",
    category: "Culture",
    locations: ["nazareth", "jerusalem", "judea"],
    description: "The scriptural meaning of Messiah in Hebrew and Christ in Greek: The Anointed One chosen to redeem Israel and the world.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1110-the-anointed-one?lang=eng",
    thumbnailText: "The prophetic title of the Messiah"
  },
  {
    id: "pharisees-sadducees-scribes",
    title: "Pharisees, Sadducees, and Scribes",
    scriptureRef: "Matthew 3:7; 23:1–36; Acts 23:6–9",
    duration: "5:21",
    category: "Culture",
    locations: ["jerusalem", "judea", "galilee"],
    description: "Understanding the religious sects, Sanhedrin leadership, and legal debates in First Century Roman Judea.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1050-pharisees-sadducees-and-scribes?lang=eng",
    thumbnailText: "Religious leaders of First Century Judea"
  },
  {
    id: "wedding-feasts-antiquity",
    title: "Wedding Feasts in the New Testament World",
    scriptureRef: "John 2:1–11; Matthew 22:1–14",
    duration: "0:54",
    category: "Culture",
    locations: ["cana", "galilee", "judea"],
    description: "The traditions, processions, and banquets of First-Century Jewish marriages, shedding light on the miracle at Cana and Savior's parables.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1080-wedding-feasts?lang=eng",
    thumbnailText: "Biblical marriage customs in Galilee"
  },
  {
    id: "sheepfold-shepherd",
    title: "The Sheepfold & The Eastern Shepherd",
    scriptureRef: "John 10:1–16; Luke 15:3–7",
    duration: "0:41",
    category: "Culture",
    locations: ["judea", "bethlehem", "galilee"],
    description: "How ancient Judean shepherds guarded the door of the sheepfold, called each sheep by name, and led flocks through wilderness terrain.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1160-sheepfold?lang=eng",
    thumbnailText: "Judean hillside sheepfold"
  },
  {
    id: "shepherd-calling-flock",
    title: "The Shepherd",
    scriptureRef: "Psalm 23; Luke 15:4–6",
    duration: "0:30",
    category: "Culture",
    locations: ["judea", "galilee", "bethlehem"],
    description: "The relationship of trust between the shepherd and his sheep in ancient Judea.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1170-shepherd?lang=eng",
    thumbnailText: "The Eastern shepherd in Judea"
  },
  {
    id: "leprosy-antiquity",
    title: "Leprosy in the Ancient Biblical World",
    scriptureRef: "Luke 5:12–14; 17:11–19",
    duration: "0:55",
    category: "Culture",
    locations: ["galilee", "samaria", "judea"],
    description: "The medical condition, social isolation, and Levitical laws surrounding leprosy in biblical times, highlighting Christ's compassion.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1140-leprosy?lang=eng",
    thumbnailText: "Social and religious context of leprosy"
  },
  {
    id: "purse-and-scrip",
    title: "Purse and Scrip: Apostolic Travel",
    scriptureRef: "Matthew 10:9–10; Luke 10:4; 22:35–36",
    duration: "0:32",
    category: "Culture",
    locations: ["galilee", "judea", "samaria"],
    description: "What a first-century traveler carried on dusty Roman roads and Christ's charge to trust in divine providence.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1120-purse-and-scrip?lang=eng",
    thumbnailText: "Travel gear in the New Testament world"
  },
  {
    id: "phylacteries-antiquity",
    title: "Phylacteries & Borders of Garments",
    scriptureRef: "Matthew 23:5; Deuteronomy 6:8",
    duration: "1:06",
    category: "Culture",
    locations: ["jerusalem", "judea", "galilee"],
    description: "The biblical background of tefillin (phylacteries) and tzitzit (fringes) worn by faithful Jews in the New Testament.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1070-phylacteries?lang=eng",
    thumbnailText: "Jewish religious vestments in antiquity"
  },
  {
    id: "gird-up-loins",
    title: "Gird Up Your Loins: Ancient Dress",
    scriptureRef: "1 Peter 1:13; Luke 12:35",
    duration: "0:47",
    category: "Culture",
    locations: ["judea", "galilee", "rome", "greece"],
    description: "The practical meaning of gathering ancient tunics to prepare for swift travel, battle, or diligent labor.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1210-gird-up-your-loins?lang=eng",
    thumbnailText: "Ancient clothing and idioms explained"
  },
  {
    id: "come-unto-me-presentation",
    title: "Come Unto Me: The Life of Jesus Christ",
    scriptureRef: "Matthew 11:28; John 14:6",
    duration: "11:34",
    category: "Ministry",
    locations: ["galilee", "judea", "jerusalem", "bethlehem", "nazareth"],
    description: "A sweeping presentation depicting the Savior's birth, mortal ministry, teachings, and Resurrection across the Holy Land.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-06-1020-come-unto-me?lang=eng",
    thumbnailText: "Comprehensive portrayal of the mortal Messiah"
  }
];

/**
 * Intelligent video search for any location, city, body of water, landmark, or region
 */
function findChurchVideosForPlace(placeData, type) {
  if (!placeData) {
    return CHURCH_BIBLE_VIDEOS.slice(0, 6);
  }

  const id = String(placeData.id || "").toLowerCase();
  const name = String(placeData.name || placeData.city || placeData.title || "").toLowerCase();
  const region = String(placeData.region || "").toLowerCase();

  // 1. Direct location ID match
  let matches = CHURCH_BIBLE_VIDEOS.filter(v => {
    return v.locations.some(loc => loc === id || name.includes(loc) || id.includes(loc));
  });

  // 2. Specific landmark or water feature mappings
  if (matches.length === 0) {
    if (name.includes("galilee") || region.includes("galilee")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("galilee") || v.locations.includes("sea-of-galilee"));
    } else if (name.includes("jordan") || id.includes("jordan") || name.includes("bethabara")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("river-jordan"));
    } else if (name.includes("dead sea") || id.includes("dead-sea")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("dead-sea") || v.locations.includes("judea"));
    } else if (name.includes("jerusalem") || region.includes("judea") || id.includes("judea")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("jerusalem") || v.locations.includes("judea"));
    } else if (region.includes("syria") || name.includes("damascus") || name.includes("antioch")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("syria") || v.locations.includes("antioch"));
    } else if (region.includes("asia") || name.includes("ephesus") || name.includes("smyrna") || name.includes("miletus")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("asia-minor") || v.locations.includes("ephesus") || v.locations.includes("miletus"));
    } else if (region.includes("greece") || region.includes("macedonia") || region.includes("achaia") || name.includes("corinth") || name.includes("athens") || name.includes("philippi")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("greece") || v.locations.includes("philippi") || v.locations.includes("macedonia"));
    } else if (region.includes("italy") || name.includes("rome") || name.includes("malta")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("rome") || v.locations.includes("italy") || v.locations.includes("malta"));
    }
  }

  // 3. Guaranteed minimum 2 videos for every single place
  if (matches.length < 2) {
    const generalPicks = [
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "come-unto-me-presentation"),
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "to-this-end-was-i-born"),
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "living-christ-resurrection"),
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "gethsemane-atonement")
    ].filter(Boolean);

    generalPicks.forEach(p => {
      if (!matches.some(m => m.id === p.id)) {
        matches.push(p);
      }
    });
  }

  return matches;
}

if (typeof window !== "undefined") {
  window.CHURCH_BIBLE_VIDEOS = CHURCH_BIBLE_VIDEOS;
  window.findChurchVideosForPlace = findChurchVideosForPlace;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CHURCH_BIBLE_VIDEOS, findChurchVideosForPlace };
}
