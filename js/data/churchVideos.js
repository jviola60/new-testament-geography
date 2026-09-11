/**
 * Official The Life of Jesus Christ & Acts of the Apostles Bible Videos
 * from ChurchofJesusChrist.org
 */

const CHURCH_BIBLE_VIDEOS = [
  // --- NATIVITY & INFANCY ---
  {
    id: "nativity-glad-tidings",
    title: "The Nativity",
    scriptureRef: "Luke 2:1–20; Matthew 1–2",
    duration: "25:57",
    category: "Nativity",
    locations: ["bethlehem", "nazareth", "judea"],
    description: "Mary and Joseph travel to Bethlehem where Jesus the Christ is born in a humble manger, heralded by heavenly hosts to shepherds.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-001-the-nativity?lang=eng",
    thumbnailText: "Mary, Joseph, and the Christ Child in Bethlehem"
  },
  {
    id: "mary-and-elisabeth",
    title: "Mary and Elisabeth Rejoice Together",
    scriptureRef: "Luke 1:39–56",
    duration: "3:12",
    category: "Nativity",
    locations: ["judea", "hebron", "bethlehem", "ein-karem"],
    description: "Mary visits Elisabeth in the hill country of Judea. John leaps in Elisabeth's womb, and Mary magnifies the Lord.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-004-mary-and-elisabeth?lang=eng",
    thumbnailText: "Mary visits Elisabeth in the hill country of Judea"
  },
  {
    id: "wise-men-seek-jesus",
    title: "The Wise Men Seek Jesus",
    scriptureRef: "Matthew 2:1–12",
    duration: "3:40",
    category: "Infancy",
    locations: ["bethlehem", "jerusalem", "judea"],
    description: "Wise men from the East follow the star to Jerusalem and Bethlehem, presenting gifts of gold, frankincense, and myrrh to the young child.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-006-the-wise-men-seek-jesus?lang=eng",
    thumbnailText: "Magi worship Christ in Bethlehem"
  },
  {
    id: "boy-jesus-in-temple",
    title: "The Boy Jesus in the Temple",
    scriptureRef: "Luke 2:41–52",
    duration: "2:46",
    category: "Youth",
    locations: ["jerusalem", "temple-mount", "nazareth"],
    description: "At age twelve, Jesus stays behind in the Temple at Jerusalem, conversing with Jewish doctors who are astonished at His understanding and answers.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-008-the-boy-jesus-in-the-temple?lang=eng",
    thumbnailText: "Twelve-year-old Jesus in the Second Temple"
  },

  // --- BAPTISM & EARLY MINISTRY (RIVER JORDAN & JUDEAN WILDERNESS) ---
  {
    id: "baptism-of-jesus",
    title: "The Baptism of Jesus",
    scriptureRef: "Matthew 3:13–17; Mark 1:9–11",
    duration: "2:54",
    category: "Ministry",
    locations: ["river-jordan", "bethabara", "judea", "perea"],
    description: "Jesus travels from Galilee to the River Jordan to be baptized by John the Baptist, fulfilling all righteousness as the Spirit of God descends like a dove.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-009-the-baptism-of-jesus?lang=eng",
    thumbnailText: "John baptizes Jesus in the River Jordan at Bethabara"
  },
  {
    id: "jesus-tempted-in-wilderness",
    title: "Jesus Is Tempted by Satan",
    scriptureRef: "Matthew 4:1–11; Luke 4:1–13",
    duration: "5:20",
    category: "Ministry",
    locations: ["judea", "jericho", "dead-sea", "jerusalem"],
    description: "After fasting 40 days in the Judean wilderness, the Savior counters every temptation of the adversary with sacred scripture.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-010-jesus-is-tempted-by-satan?lang=eng",
    thumbnailText: "Jesus overcomes temptation in the Judean wilderness"
  },
  {
    id: "water-into-wine",
    title: "Jesus Turns Water into Wine at Cana",
    scriptureRef: "John 2:1–11",
    duration: "2:48",
    category: "Miracles",
    locations: ["cana", "galilee"],
    description: "At a marriage feast in Cana of Galilee, Jesus performs His first recorded miracle, manifesting His glory by transforming water into wine.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-011-jesus-turns-water-into-wine?lang=eng",
    thumbnailText: "The wedding feast in Cana of Galilee"
  },
  {
    id: "jesus-cleanses-temple",
    title: "Jesus Cleanses the Temple",
    scriptureRef: "John 2:13–22; Matthew 21:12–17",
    duration: "2:25",
    category: "Ministry",
    locations: ["temple-mount", "jerusalem", "judea"],
    description: "The Savior drives the moneychangers and livestock merchants out of the Temple Court, declaring, 'Make not my Father’s house an house of merchandise.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-012-jesus-cleanses-the-temple?lang=eng",
    thumbnailText: "Cleansing the Court of the Gentiles in Jerusalem"
  },
  {
    id: "nicodemus-born-again",
    title: "Jesus Teaches Nicodemus: Ye Must Be Born Again",
    scriptureRef: "John 3:1–21",
    duration: "4:15",
    category: "Teachings",
    locations: ["jerusalem", "judea"],
    description: "Nicodemus, a ruler of the Jews, visits Jesus by night. The Savior teaches of spiritual rebirth through water and the Spirit, and the love of God.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-013-jesus-teaches-nicodemus?lang=eng",
    thumbnailText: "Jesus teaches Nicodemus by night in Jerusalem"
  },
  {
    id: "woman-at-the-well",
    title: "Jesus Teaches the Samaritan Woman at the Well",
    scriptureRef: "John 4:5–42",
    duration: "6:14",
    category: "Teachings",
    locations: ["samaria", "sychar", "jacobs-well"],
    description: "At Jacob's Well in Sychar of Samaria, Jesus offers living water that springs up into everlasting life, revealing Himself as the Messiah.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-014-jesus-teaches-a-samaritan-woman?lang=eng",
    thumbnailText: "Jacob's Well in Samaria"
  },
  {
    id: "jesus-declares-messiah-nazareth",
    title: "Jesus Declares He Is the Messiah in Nazareth",
    scriptureRef: "Luke 4:16–30",
    duration: "4:50",
    category: "Ministry",
    locations: ["nazareth", "galilee"],
    description: "In the synagogue of His childhood home of Nazareth, Jesus reads Isaiah 61 and proclaims: 'This day is this scripture fulfilled in your ears.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-015-jesus-declares-he-is-the-messiah?lang=eng",
    thumbnailText: "Synagogue in Nazareth reading the Isaiah Scroll"
  },

  // --- GALILEE & CAPERNAUM MINISTRY ---
  {
    id: "follow-me-disciples-called",
    title: "Jesus Calls Peter and Andrew: Fishers of Men",
    scriptureRef: "Matthew 4:18–22; Luke 5:1–11",
    duration: "5:08",
    category: "Ministry",
    locations: ["sea-of-galilee", "capernaum", "galilee"],
    description: "Following a miraculous draught of fishes on the Sea of Galilee, Jesus tells Simon Peter and his partners to fear not: from henceforth thou shalt catch men.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-017-jesus-calls-fishermen?lang=eng",
    thumbnailText: "Fishing boats along the shores of the Sea of Galilee"
  },
  {
    id: "sermon-on-the-mount",
    title: "The Sermon on the Mount & The Beatitudes",
    scriptureRef: "Matthew 5–7",
    duration: "12:45",
    category: "Teachings",
    locations: ["galilee", "capernaum", "mount-of-beatitudes"],
    description: "Overlooking the Sea of Galilee, Jesus delivers the celestial law of the Kingdom: the Beatitudes, being salt and light, love of enemies, and the Lord's Prayer.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-019-the-sermon-on-the-mount?lang=eng",
    thumbnailText: "Christ preaching on the hillside overlooking Galilee"
  },
  {
    id: "jesus-calms-storm",
    title: "Jesus Calms the Tempest: Peace, Be Still",
    scriptureRef: "Mark 4:35–41; Matthew 8:23–27",
    duration: "2:40",
    category: "Miracles",
    locations: ["sea-of-galilee", "galilee", "capernaum", "tiberias"],
    description: "When a sudden gale threatens to swamp their boat on the Sea of Galilee, Jesus arises and commands the wind and waves: 'Peace, be still.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-022-peace-be-still?lang=eng",
    thumbnailText: "Jesus rebukes the wind and the Sea of Galilee"
  },
  {
    id: "jesus-walks-on-water",
    title: "Jesus Walks on the Water & Rescues Peter",
    scriptureRef: "Matthew 14:22–33",
    duration: "3:30",
    category: "Miracles",
    locations: ["sea-of-galilee", "galilee", "capernaum", "bethsaida"],
    description: "In the fourth watch of the night, Jesus walks across the waters of Galilee. Peter steps out in faith, and Jesus catches him saying, 'O thou of little faith, wherefore didst thou doubt?'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-024-jesus-walks-on-the-water?lang=eng",
    thumbnailText: "Jesus walks upon the water of the Sea of Galilee"
  },
  {
    id: "healing-the-paralytic",
    title: "Jesus Forgives Sins and Heals a Paralytic",
    scriptureRef: "Mark 2:1–12; Luke 5:17–26",
    duration: "3:15",
    category: "Miracles",
    locations: ["capernaum", "galilee"],
    description: "Four friends lower a paralyzed man through the roof of a house in Capernaum. Jesus heals him, demonstrating power to forgive sins on earth.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-026-jesus-heals-a-paralytic?lang=eng",
    thumbnailText: "House in Capernaum where the paralytic is healed"
  },
  {
    id: "raising-jairus-daughter",
    title: "Jesus Raises the Daughter of Jairus",
    scriptureRef: "Mark 5:21–43; Luke 8:40–56",
    duration: "4:22",
    category: "Miracles",
    locations: ["capernaum", "galilee"],
    description: "In Capernaum, Jesus heals the woman with an issue of blood and raises the twelve-year-old daughter of the synagogue ruler from death.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-028-jesus-raises-the-daughter-of-jairus?lang=eng",
    thumbnailText: "Jairus' home in Capernaum"
  },
  {
    id: "feeding-the-five-thousand",
    title: "Feeding the 5,000",
    scriptureRef: "Matthew 14:13–21; John 6:1–14",
    duration: "3:58",
    category: "Miracles",
    locations: ["sea-of-galilee", "bethsaida", "galilee", "capernaum"],
    description: "Near Bethsaida on the northeastern shore of Galilee, Jesus multiplies five barley loaves and two small fishes to feed thousands.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-030-feeding-the-5000?lang=eng",
    thumbnailText: "Multiplying loaves and fishes near Bethsaida"
  },
  {
    id: "bread-of-life-discourse",
    title: "The Bread of Life Discourse",
    scriptureRef: "John 6:22–59",
    duration: "5:45",
    category: "Teachings",
    locations: ["capernaum", "galilee", "sea-of-galilee"],
    description: "In the synagogue at Capernaum, Jesus proclaims: 'I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-032-the-bread-of-life?lang=eng",
    thumbnailText: "Synagogue at Capernaum: The Bread of Life"
  },
  {
    id: "peter-testifies-of-christ",
    title: "Thou Art the Christ: Peter's Testimony",
    scriptureRef: "Matthew 16:13–20",
    duration: "2:50",
    category: "Ministry",
    locations: ["caesarea-philippi", "galilee", "hermon"],
    description: "In Caesarea Philippi at the base of Mount Hermon, Peter declares: 'Thou art the Christ, the Son of the living God.' Jesus promises the keys of the kingdom.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-034-thou-art-the-christ?lang=eng",
    thumbnailText: "Caesarea Philippi cliffside"
  },
  {
    id: "the-transfiguration",
    title: "The Transfiguration",
    scriptureRef: "Matthew 17:1–9; Mark 9:2–10",
    duration: "4:05",
    category: "Ministry",
    locations: ["mount-tabor", "mount-hermon", "galilee"],
    description: "Jesus takes Peter, James, and John into a high mountain where His face shines as the sun. Moses and Elias appear to minister to Him.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-036-the-transfiguration?lang=eng",
    thumbnailText: "The Mount of Transfiguration"
  },

  // --- JERICHO & SAMARIA & BETHANY ---
  {
    id: "good-samaritan",
    title: "Parable of the Good Samaritan",
    scriptureRef: "Luke 10:25–37",
    duration: "5:12",
    category: "Parables",
    locations: ["jericho", "jerusalem", "judea"],
    description: "Along the treacherous road from Jerusalem down to Jericho, a compassionate Samaritan tends the wounds of an assaulted traveler.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-038-parable-of-the-good-samaritan?lang=eng",
    thumbnailText: "The descent road from Jerusalem to Jericho"
  },
  {
    id: "mary-and-martha",
    title: "Mary and Martha: That Good Part",
    scriptureRef: "Luke 10:38–42",
    duration: "3:02",
    category: "Teachings",
    locations: ["bethany", "judea", "jerusalem"],
    description: "In Bethany, Martha serves diligently while Mary sits at Jesus' feet to hear His word. Jesus reminds Martha of the one thing needful.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-040-mary-and-martha?lang=eng",
    thumbnailText: "The home of Martha and Mary in Bethany"
  },
  {
    id: "raising-of-lazarus",
    title: "Lazarus, Come Forth: Raising Lazarus from the Dead",
    scriptureRef: "John 11:1–44",
    duration: "8:25",
    category: "Miracles",
    locations: ["bethany", "judea", "jerusalem"],
    description: "At the tomb in Bethany, Jesus weeps with Mary and Martha, declares 'I am the resurrection, and the life,' and calls Lazarus forth from the grave.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-042-lazarus-is-raised-from-the-dead?lang=eng",
    thumbnailText: "The rock-hewn tomb of Lazarus in Bethany"
  },
  {
    id: "zacchaeus-meets-jesus",
    title: "Zacchaeus: This Day Is Salvation Come to This House",
    scriptureRef: "Luke 19:1–10",
    duration: "3:35",
    category: "Ministry",
    locations: ["jericho", "judea"],
    description: "In Jericho, Zacchaeus climbs a sycomore tree to see Jesus. The Savior calls him down, dining in his home and declaring His mission to seek and save the lost.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-044-zacchaeus?lang=eng",
    thumbnailText: "Sycomore tree in ancient Jericho"
  },
  {
    id: "blind-bartimaeus",
    title: "Jesus Heals Blind Bartimaeus",
    scriptureRef: "Mark 10:46–52",
    duration: "2:45",
    category: "Miracles",
    locations: ["jericho", "judea"],
    description: "As Jesus departs Jericho, blind Bartimaeus cries out, 'Jesus, thou Son of David, have mercy on me!' Jesus restores his sight through faith.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-046-blind-bartimaeus?lang=eng",
    thumbnailText: "The gates of Jericho"
  },

  // --- JERUSALEM SACRED SITES & PASSION WEEK ---
  {
    id: "pool-of-bethesda",
    title: "Jesus Heals at the Pool of Bethesda",
    scriptureRef: "John 5:1–16",
    duration: "4:32",
    category: "Miracles",
    locations: ["pool-of-bethesda", "jerusalem", "judea"],
    description: "By the Sheep Gate in Jerusalem at the five-porched Pool of Bethesda, Jesus commands an invalid of thirty-eight years: 'Rise, take up thy bed, and walk.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-048-pool-of-bethesda?lang=eng",
    thumbnailText: "Five porticoes of the Pool of Bethesda in Jerusalem"
  },
  {
    id: "pool-of-siloam",
    title: "Jesus Heals a Man Born Blind at the Pool of Siloam",
    scriptureRef: "John 9:1–41",
    duration: "6:50",
    category: "Miracles",
    locations: ["pool-of-siloam", "jerusalem", "temple-mount", "judea"],
    description: "Jesus anoints the eyes of a blind beggar with clay and sends him to wash in the Pool of Siloam. The man returns seeing, testifying before the Pharisees.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-050-pool-of-siloam?lang=eng",
    thumbnailText: "Pool of Siloam in lower Jerusalem"
  },
  {
    id: "woman-taken-in-adultery",
    title: "He That Is Without Sin: Go, and Sin No More",
    scriptureRef: "John 8:1–11",
    duration: "3:40",
    category: "Teachings",
    locations: ["temple-mount", "jerusalem", "judea"],
    description: "In the Temple courts, scribes and Pharisees bring a woman caught in adultery. Jesus stoops to write in the dust, extending mercy and redemptive truth.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-052-go-and-sin-no-more?lang=eng",
    thumbnailText: "Solomon's Porch at the Second Temple Mount"
  },
  {
    id: "triumphal-entry",
    title: "The Triumphal Entry into Jerusalem",
    scriptureRef: "Matthew 21:1–11; Luke 19:28–40",
    duration: "3:10",
    category: "Passion",
    locations: ["mount-of-olives", "bethphage", "jerusalem", "temple-mount"],
    description: "Jesus rides down the western slope of the Mount of Olives into Jerusalem on a colt, as crowds carpet the road with palm branches singing 'Hosanna!'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-054-the-triumphal-entry?lang=eng",
    thumbnailText: "Mount of Olives descending into Jerusalem"
  },
  {
    id: "last-supper-sacrament",
    title: "The Last Supper: In Remembrance of Me",
    scriptureRef: "Matthew 26:17–30; Luke 22:14–20; John 13",
    duration: "7:18",
    category: "Passion",
    locations: ["upper-room", "mount-zion", "jerusalem"],
    description: "In a furnished Upper Room on Mount Zion, Jesus washes the Apostles' feet and institutes the Sacrament of the Lord's Supper before His suffering.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-056-the-last-supper?lang=eng",
    thumbnailText: "The Upper Room on Mount Zion in Jerusalem"
  },
  {
    id: "savior-suffers-in-gethsemane",
    title: "The Savior Suffers in Gethsemane",
    scriptureRef: "Matthew 26:36–46; Luke 22:39–46",
    duration: "8:30",
    category: "Atonement",
    locations: ["gethsemane", "kidron-valley", "mount-of-olives", "jerusalem"],
    description: "In the olive grove of Gethsemane across the Brook Kidron, Jesus kneels in agony, sweating great drops of blood to atone for the sins and sorrows of all mankind.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-058-the-savior-suffers-in-gethsemane?lang=eng",
    thumbnailText: "The ancient olive trees of the Garden of Gethsemane"
  },
  {
    id: "jesus-tried-by-caiaphas",
    title: "Jesus Is Condemned by Caiaphas & Peter's Denial",
    scriptureRef: "Matthew 26:57–75; Luke 22:54–71",
    duration: "6:15",
    category: "Passion",
    locations: ["palace-of-caiaphas", "mount-zion", "jerusalem"],
    description: "Brought bound to the palace of the High Priest Caiaphas, Jesus bears testimony of His divine Sonship while Peter weeps bitterly outside in the courtyard.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-060-jesus-is-tried-by-caiaphas?lang=eng",
    thumbnailText: "Courtyard of Caiaphas on Mount Zion"
  },
  {
    id: "jesus-tried-by-pilate",
    title: "Jesus Is Accused Before Pilate at the Praetorium",
    scriptureRef: "Matthew 27:1–26; John 18:28–40",
    duration: "5:50",
    category: "Passion",
    locations: ["praetorium", "antonia-fortress", "jerusalem"],
    description: "Pontius Pilate examines Jesus inside the Praetorium. Despite finding no fault in Him, Pilate yields to political pressure and delivers Him to be scourged.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-062-jesus-is-tried-by-pilate?lang=eng",
    thumbnailText: "The Roman Judgment Seat at the Praetorium"
  },
  {
    id: "the-crucifixion",
    title: "The Crucifixion of the Savior",
    scriptureRef: "Matthew 27:27–54; Luke 23:33–49; John 19",
    duration: "7:45",
    category: "Atonement",
    locations: ["golgotha", "calvary", "jerusalem"],
    description: "At the hill of Golgotha outside the gates of Jerusalem, Jesus is nailed to the cross, prays for His executioners ('Father, forgive them'), and yields up His spirit.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-064-the-crucifixion?lang=eng",
    thumbnailText: "Golgotha outside the northern walls of Jerusalem"
  },
  {
    id: "he-is-risen-resurrection",
    title: "He Is Risen: The Morning of the Resurrection",
    scriptureRef: "Matthew 28:1–10; Luke 24:1–12; John 20:1–18",
    duration: "6:20",
    category: "Resurrection",
    locations: ["garden-tomb", "holy-sepulchre", "jerusalem"],
    description: "At the garden tomb belonging to Joseph of Arimathea, angels announce to weeping disciples: 'Why seek ye the living among the dead? He is not here, but is risen.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-066-he-is-risen?lang=eng",
    thumbnailText: "The Empty Garden Tomb at Jerusalem"
  },
  {
    id: "road-to-emmaus",
    title: "The Walk to Emmaus: Did Not Our Heart Burn Within Us?",
    scriptureRef: "Luke 24:13–35",
    duration: "6:05",
    category: "Resurrection",
    locations: ["emmaus", "jerusalem", "judea"],
    description: "The resurrected Lord walks with two disciples along the seven-mile road from Jerusalem to Emmaus, expounding all the scriptures concerning Himself.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-068-the-road-to-emmaus?lang=eng",
    thumbnailText: "The countryside road leading to Emmaus"
  },
  {
    id: "resurrected-lord-at-galilee",
    title: "Feed My Sheep: The Savior at the Sea of Tiberias",
    scriptureRef: "John 21:1–19",
    duration: "5:30",
    category: "Resurrection",
    locations: ["sea-of-galilee", "tiberias", "capernaum", "galilee"],
    description: "On the shore of the Sea of Galilee, the resurrected Christ prepares coals with fish and bread, thrice asking Simon Peter: 'Lovest thou me? ... Feed my sheep.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-070-feed-my-sheep?lang=eng",
    thumbnailText: "Sunrise coals on the shore of the Sea of Galilee"
  },
  {
    id: "the-ascension",
    title: "The Ascension from the Mount of Olives",
    scriptureRef: "Acts 1:1–12",
    duration: "3:10",
    category: "Ascension",
    locations: ["mount-of-olives", "jerusalem", "judea"],
    description: "From the summit of the Mount of Olives, the Savior gives the apostolic commission before ascending into heaven, with angels promising His triumphant return.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2011-10-072-the-ascension?lang=eng",
    thumbnailText: "The crest of the Mount of Olives"
  },

  // --- ACTS OF THE APOSTLES & PAUL'S JOURNEYS ---
  {
    id: "day-of-pentecost",
    title: "The Day of Pentecost & Apostolic Power",
    scriptureRef: "Acts 2:1–47",
    duration: "6:40",
    category: "Acts",
    locations: ["jerusalem", "upper-room", "temple-mount"],
    description: "The Holy Ghost descends as a rushing mighty wind with cloven tongues of fire. Peter preaches with power, and three thousand souls are baptized.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-001-the-day-of-pentecost?lang=eng",
    thumbnailText: "Apostles filled with the Holy Ghost in Jerusalem"
  },
  {
    id: "peter-and-john-heal-lame-man",
    title: "Peter and John Heal a Lame Man at the Beautiful Gate",
    scriptureRef: "Acts 3:1–26",
    duration: "4:55",
    category: "Acts",
    locations: ["temple-mount", "jerusalem"],
    description: "At the Beautiful Gate of the Temple, Peter commands: 'Silver and gold have I none; but such as I have give I thee: In the name of Jesus Christ of Nazareth rise up and walk.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-003-peter-and-john-heal-a-lame-man?lang=eng",
    thumbnailText: "The Beautiful Gate of Herod's Temple"
  },
  {
    id: "conversion-of-saul",
    title: "The Road to Damascus: Conversion of Saul",
    scriptureRef: "Acts 9:1–22",
    duration: "5:15",
    category: "Acts",
    locations: ["damascus", "syria", "jerusalem"],
    description: "A blinding light shines from heaven on the road to Damascus as the risen Christ calls: 'Saul, Saul, why persecutest thou me?' In Damascus, Ananias restores his sight.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-005-the-road-to-damascus?lang=eng",
    thumbnailText: "The desert road entering Damascus"
  },
  {
    id: "peter-and-cornelius",
    title: "Peter Receives Revelation to Preach to the Gentiles",
    scriptureRef: "Acts 10:1–48",
    duration: "6:10",
    category: "Acts",
    locations: ["caesarea-maritima", "joppa", "judea"],
    description: "In Joppa, Peter sees a vision of the great sheet, and travels to Caesarea Maritima to baptize the Roman centurion Cornelius, opening the Gospel to all nations.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-007-peter-and-cornelius?lang=eng",
    thumbnailText: "Caesarea Maritima harbor and roman centurion quarters"
  },
  {
    id: "paul-and-silas-prison",
    title: "Paul and Silas in Prison: The Earthquake at Philippi",
    scriptureRef: "Acts 16:16–40",
    duration: "5:40",
    category: "Acts",
    locations: ["philippi", "macedonia", "greece"],
    description: "Beaten and imprisoned at Philippi, Paul and Silas sing praises at midnight. A miraculous earthquake shakes the prison, leading to the baptism of the jailer and his house.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-009-paul-and-silas-in-prison?lang=eng",
    thumbnailText: "Roman jail ruins at Philippi"
  },
  {
    id: "paul-at-athens-mars-hill",
    title: "Paul Preaches on Mars' Hill in Athens",
    scriptureRef: "Acts 17:16–34",
    duration: "5:25",
    category: "Acts",
    locations: ["athens", "areopagus", "greece", "achaia"],
    description: "Standing atop the Areopagus overlooking Athens, Paul declares the 'Unknown God' as the Creator of heaven and earth in whom we live, move, and have our being.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-011-paul-preaches-at-mars-hill?lang=eng",
    thumbnailText: "The Areopagus / Mars' Hill in Athens"
  },
  {
    id: "paul-at-ephesus",
    title: "Paul at Ephesus: Great Is Diana of the Ephesians",
    scriptureRef: "Acts 19:1–41",
    duration: "5:55",
    category: "Acts",
    locations: ["ephesus", "asia-minor"],
    description: "Paul ministers two years at Ephesus, working special miracles until the silversmiths riot in the Great 24,000-seat Theater defending their idol craft.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-013-paul-at-ephesus?lang=eng",
    thumbnailText: "The Great Greco-Roman Theater at Ephesus"
  },
  {
    id: "paul-before-agrippa",
    title: "Paul Testifies Before King Agrippa and Festus",
    scriptureRef: "Acts 26:1–32",
    duration: "6:30",
    category: "Acts",
    locations: ["caesarea-maritima", "judea"],
    description: "In the royal judgment hall at Caesarea Maritima, Paul recounts his heavenly vision. King Agrippa confesses: 'Almost thou persuadest me to be a Christian.'",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-015-paul-before-agrippa?lang=eng",
    thumbnailText: "Herod's palace at Caesarea Maritima"
  },
  {
    id: "paul-in-rome",
    title: "Paul Preaches the Gospel in Rome",
    scriptureRef: "Acts 28:16–31; Romans 1",
    duration: "4:45",
    category: "Acts",
    locations: ["rome", "italy"],
    description: "Under Roman guard in his own hired house in the imperial capital, Paul preaches the Kingdom of God with all confidence, no man forbidding him.",
    churchUrl: "https://www.churchofjesuschrist.org/media/video/2012-05-017-paul-in-rome?lang=eng",
    thumbnailText: "Paul writing and teaching under house arrest in Rome"
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
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("damascus") || v.locations.includes("syria"));
    } else if (region.includes("asia") || name.includes("ephesus") || name.includes("smyrna")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("ephesus") || v.locations.includes("asia-minor"));
    } else if (region.includes("greece") || region.includes("macedonia") || region.includes("achaia") || name.includes("corinth") || name.includes("athens") || name.includes("philippi")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("greece") || v.locations.includes("athens") || v.locations.includes("philippi"));
    } else if (region.includes("italy") || name.includes("rome")) {
      matches = CHURCH_BIBLE_VIDEOS.filter(v => v.locations.includes("rome") || v.locations.includes("italy"));
    }
  }

  // 3. Guaranteed minimum 2 videos for every single place
  if (matches.length < 2) {
    const generalPicks = [
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "sermon-on-the-mount"),
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "he-is-risen-resurrection"),
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "savior-suffers-in-gethsemane"),
      CHURCH_BIBLE_VIDEOS.find(v => v.id === "the-ascension")
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
