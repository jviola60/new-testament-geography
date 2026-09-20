/**
 * Curated Guided Narrative Tours
 * 
 * Comprehensive Scripture Journeys across the New Testament:
 * - Ministry, Miracles & Life of Jesus Christ
 * - The Resurrected Lord & Holy Appearances
 * - Apostolic Acts & Spreading the Gospel
 * 
 * CORE EMPHASIS: Guided Tours of the Savior's Life and Ministry
 * are elevated as the primary spiritual feature of the atlas.
 */
const TOURS_DATA = [
  // =========================================================================
  // CATEGORY 1: MINISTRY, MIRACLES & LIFE OF JESUS CHRIST
  // =========================================================================
  {
    id: "start-here-jesus",
    category: "savior",
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
        scriptureRef: "Luke 2:11",
        summary: "Luke 2:11 • 'For unto you is born this day in the city of David a Saviour, which is Christ the Lord.' In this quiet village of Judea, God gave His Only Begotten Son to bring peace, hope, and everlasting light to all mankind."
      },
      {
        title: "Growing Up in Kindness & Love (Nazareth)",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 13,
        eventId: "savior-return-nazareth",
        year: -3,
        scriptureRef: "Luke 2:52",
        summary: "Luke 2:52 • 'And Jesus increased in wisdom and stature, and in favour with God and man.' Nestled in the rolling hills of Lower Galilee, Jesus lived in quiet devotion, laboring as a carpenter and exemplifying perfect obedience."
      },
      {
        title: "The Loving Teacher & Healer (Capernaum & Sea of Galilee)",
        lat: 32.8808,
        lng: 35.5750,
        zoom: 13,
        eventId: "savior-base-capernaum",
        year: 28,
        scriptureRef: "Matthew 4:23",
        summary: "Matthew 4:23 • 'And Jesus went about all Galilee, teaching in their synagogues, and preaching the gospel of the kingdom, and healing all manner of sickness.' Along this freshwater sea, the Savior called humble fishermen and brought healing to all who came in faith."
      },
      {
        title: "Teaching Compassion at the Temple (Jerusalem)",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 15,
        eventId: "savior-cleansing-temple",
        year: 30,
        scriptureRef: "Matthew 21:14",
        summary: "Matthew 21:14 • 'And the blind and the lame came to him in the temple; and he healed them.' In the sacred courts of His Father's House, the Savior taught that God's house is a house of prayer, mercy, and welcoming refuge for all nations."
      },
      {
        title: "Jesus Prays for Us in Love (Garden of Gethsemane)",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        scriptureRef: "Luke 22:42",
        summary: "Luke 22:42 • 'Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done.' In this ancient olive grove at the base of the Mount of Olives, Jesus bore the sins, pains, and heartaches of the entire human family."
      },
      {
        title: "He Is Risen! (The Empty Garden Tomb)",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 15,
        eventId: "savior-resurrection",
        year: 30,
        scriptureRef: "Matthew 28:6",
        summary: "Matthew 28:6 • 'He is not here: for he is risen, as he said.' In a quiet rock-hewn garden tomb just outside Jerusalem's walls, Jesus Christ broke the bands of death forever, assuring eternal life to all God's children."
      }
    ]
  },
  {
    id: "baptism-early-ministry",
    category: "savior",
    title: "Baptism & Early Judean Ministry",
    icon: "🌊",
    eraText: "26–28 AD • 7 Sacred Stations",
    description: "Follow the beginning of the Savior's public ministry: from His baptism in the Jordan River and temptation in the wilderness to Cana, Jerusalem, and Sychar.",
    stops: [
      {
        title: "Departure from Nazareth",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 12,
        eventId: "savior-baptism",
        year: 26,
        scriptureRef: "Mark 1:9",
        summary: "Mark 1:9 • 'Jesus came from Nazareth of Galilee, and was baptized of John in Jordan.' Leaving behind His carpenter's bench, the Savior set His face toward the Jordan Valley to fulfill all righteousness."
      },
      {
        title: "Baptism at Bethabara beyond Jordan",
        lat: 31.8385,
        lng: 35.5478,
        zoom: 13,
        eventId: "savior-baptism",
        year: 26,
        scriptureRef: "Matthew 3:16–17",
        summary: "Matthew 3:16–17 • 'And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him... and lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.'"
      },
      {
        title: "Overcoming Temptation in the Judean Wilderness",
        lat: 31.8600,
        lng: 35.4300,
        zoom: 13,
        eventId: "savior-wilderness",
        year: 26,
        scriptureRef: "Matthew 4:1–4",
        summary: "Matthew 4:4 • 'Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.' In the arid crags overlooking Jericho, Jesus fasted forty days and vanquished every temptation of the adversary."
      },
      {
        title: "The First Miracle in Cana of Galilee",
        lat: 32.7480,
        lng: 35.3380,
        zoom: 13,
        eventId: "savior-first-miracle",
        year: 27,
        scriptureRef: "John 2:11",
        summary: "John 2:11 • 'This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him.' Turning water into wine at a wedding feast, Jesus consecrated domestic joy and revealed His divine power."
      },
      {
        title: "Passover & Nicodemus in Jerusalem",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 15,
        eventId: "savior-nicodemus",
        year: 27,
        scriptureRef: "John 3:16",
        summary: "John 3:16 • 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' In nighttime discourse with Nicodemus, Jesus taught of spiritual rebirth."
      },
      {
        title: "Ministry near Aenon near Salim",
        lat: 32.3600,
        lng: 35.5300,
        zoom: 12,
        eventId: "savior-judea-ministry",
        year: 27,
        scriptureRef: "John 3:23, 30",
        summary: "John 3:30 • 'He must increase, but I must decrease.' In the abundant springs of the Jordan Valley, John bore witness that the Bridegroom had arrived and the Messiah had begun His harvest."
      },
      {
        title: "Living Water at Jacob's Well (Sychar in Samaria)",
        lat: 32.2094,
        lng: 35.2839,
        zoom: 13,
        eventId: "savior-woman-well",
        year: 28,
        scriptureRef: "John 4:14",
        summary: "John 4:14 • 'Whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life.' Crossing ethnic barriers, Jesus revealed His identity as the Messiah."
      }
    ]
  },
  {
    id: "galilean-ministry-miracles",
    category: "savior",
    title: "Galilean Ministry & Miracles",
    icon: "⛵",
    eraText: "28–29 AD • 8 Sacred Stations",
    description: "Experience the vibrant heart of the Savior's ministry around the Sea of Galilee—His headquarters at Capernaum, the Sermon on the Mount, and marvelous miracles of healing.",
    stops: [
      {
        title: "Rejection & Proclamation in Nazareth",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 13,
        eventId: "savior-rejection-nazareth",
        year: 28,
        scriptureRef: "Luke 4:18–19",
        summary: "Luke 4:18 • 'The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted.' Jesus announced His messianic calling in His hometown synagogue."
      },
      {
        title: "Ministry Headquarters in Capernaum",
        lat: 32.8808,
        lng: 35.5750,
        zoom: 14,
        eventId: "savior-base-capernaum",
        year: 28,
        scriptureRef: "Matthew 4:13",
        summary: "Matthew 9:2 • 'Son, be of good cheer; thy sins be forgiven thee.' In Peter's home and the Capernaum synagogue, Jesus healed the paralytic lowered through the roof, healed Peter's mother-in-law, and taught with authority."
      },
      {
        title: "The Sermon on the Mount (Mount of Beatitudes)",
        lat: 32.8810,
        lng: 35.5550,
        zoom: 14,
        eventId: "savior-sermon-mount",
        year: 28,
        scriptureRef: "Matthew 5:3, 14",
        summary: "Matthew 5:14 • 'Ye are the light of the world. A city that is set on an hill cannot be hid.' Overlooking the blue waters of Gennesaret, Jesus delivered the charter of the Christian soul: the Beatitudes, love for enemies, and the Lord's Prayer."
      },
      {
        title: "Raising the Widow's Son at Nain",
        lat: 32.6310,
        lng: 35.3480,
        zoom: 13,
        eventId: "savior-widow-nain",
        year: 28,
        scriptureRef: "Luke 7:13–14",
        summary: "Luke 7:13 • 'And when the Lord saw her, he had compassion on her, and said unto her, Weep not.' Meeting a funeral procession at Nain's gate, Jesus touched the bier and restored the only son of a weeping widow to life."
      },
      {
        title: "Stilling the Tempest on the Sea of Galilee",
        lat: 32.8250,
        lng: 35.5850,
        zoom: 12,
        eventId: "savior-stilling-tempest",
        year: 28,
        scriptureRef: "Mark 4:39",
        summary: "Mark 4:39 • 'And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm.' In a violent squall, Christ demonstrated His sovereignty over creation."
      },
      {
        title: "Feeding the 5,000 at Bethsaida & Tabgha",
        lat: 32.8850,
        lng: 35.6480,
        zoom: 13,
        eventId: "savior-feeding-5000",
        year: 29,
        scriptureRef: "John 6:11, 35",
        summary: "John 6:35 • 'I am the bread of life: he that cometh to me shall never hunger.' Blessing five barley loaves and two small fishes, Jesus fed the multitude and revealed Himself as the true spiritual Manna from heaven."
      },
      {
        title: "Peter's Testimony at Caesarea Philippi",
        lat: 33.2483,
        lng: 35.6933,
        zoom: 13,
        eventId: "savior-peter-confession",
        year: 29,
        scriptureRef: "Matthew 16:16",
        summary: "Matthew 16:16 • 'Thou art the Christ, the Son of the living God.' At the rocky headwaters of the Jordan beneath Mount Hermon, Peter received divine revelation of Jesus' messiahship, and Christ promised the keys of the kingdom."
      },
      {
        title: "The Mount of Transfiguration",
        lat: 32.6860,
        lng: 35.3890,
        zoom: 13,
        eventId: "savior-transfiguration",
        year: 29,
        scriptureRef: "Matthew 17:2",
        summary: "Matthew 17:2 • 'And was transfigured before them: and his face did shine as the sun, and his raiment was white as the light.' Moses and Elijah appeared in glory, conferring authority and strengthening Christ for His upcoming sacrifice."
      }
    ]
  },
  {
    id: "savior-life",
    category: "savior",
    title: "Walk with the Savior (Core Ministry Milestones)",
    icon: "🌟",
    eraText: "6 BC – 30 AD • 13 Sacred Milestones",
    description: "A comprehensive chronological journey following the mortal life and major milestones of Jesus Christ from Nazareth and Bethlehem to Galilee and the Temple Mount.",
    stops: [
      {
        title: "The Annunciation in Nazareth",
        lat: 32.7019,
        lng: 35.2979,
        zoom: 12,
        eventId: "savior-annunciation",
        year: -6,
        scriptureRef: "Luke 1:28",
        summary: "The angel Gabriel brings tidings of great joy to Mary in Nazareth: 'Hail, thou that art highly favoured, the Lord is with thee: blessed art thou among women.'"
      },
      {
        title: "Birth of Jesus in Bethlehem",
        lat: 31.7054,
        lng: 35.2024,
        zoom: 13,
        eventId: "savior-birth",
        year: -5,
        scriptureRef: "Luke 2:7",
        summary: "The Savior of all mankind is born in humble circumstances in the City of David amidst angelic heralds singing peace and goodwill toward men."
      },
      {
        title: "Baptism in the Jordan River",
        lat: 31.8385,
        lng: 35.5478,
        zoom: 13,
        eventId: "savior-baptism",
        year: 26,
        scriptureRef: "Matthew 3:17",
        summary: "John baptizes Jesus in the Jordan River; the Holy Ghost descends as a dove, and the Father proclaims: 'This is my beloved Son, in whom I am well pleased.'"
      },
      {
        title: "Temptation in the Judean Wilderness",
        lat: 31.8600,
        lng: 35.4300,
        zoom: 13,
        eventId: "savior-wilderness",
        year: 26,
        scriptureRef: "Matthew 4:10",
        summary: "Fasting forty days in the wilderness, Jesus rejects worldly kingdoms, physical appetite, and spiritual pride, answering every temptation with Holy Scripture."
      },
      {
        title: "First Miracle in Cana of Galilee",
        lat: 32.7480,
        lng: 35.3380,
        zoom: 13,
        eventId: "savior-first-miracle",
        year: 27,
        scriptureRef: "John 2:11",
        summary: "Jesus turns water into wine at the wedding feast in Cana, beginning His public miracles and manifesting His glory to His disciples."
      },
      {
        title: "Ministry Headquarters in Capernaum",
        lat: 32.8808,
        lng: 35.5750,
        zoom: 14,
        eventId: "savior-base-capernaum",
        year: 28,
        scriptureRef: "Matthew 4:13",
        summary: "Establishing His primary center in Capernaum, Jesus heals the sick, calls Peter, Andrew, James, and John, and teaches in the lakeside synagogue."
      },
      {
        title: "Sermon on the Mount",
        lat: 32.8810,
        lng: 35.5550,
        zoom: 14,
        eventId: "savior-sermon-mount",
        year: 28,
        scriptureRef: "Matthew 5:3–12",
        summary: "On the gentle hills above Galilee, Jesus delivers the Beatitudes, preaching meekness, pureness of heart, peacemaking, and covenant righteousness."
      },
      {
        title: "Feeding the Five Thousand",
        lat: 32.8850,
        lng: 35.6480,
        zoom: 13,
        eventId: "savior-feeding-5000",
        year: 29,
        scriptureRef: "John 6:11",
        summary: "Multiplying five barley loaves and two small fishes near Bethsaida, Jesus feeds five thousand and teaches that He is the true Bread of Life."
      },
      {
        title: "Walking upon the Water",
        lat: 32.8400,
        lng: 35.5700,
        zoom: 13,
        eventId: "savior-walking-water",
        year: 29,
        scriptureRef: "Matthew 14:27",
        summary: "In the fourth watch of the night, Jesus walks upon the stormy waves of Galilee, stretching out His hand to rescue Peter when faith wavered."
      },
      {
        title: "The Transfiguration on Mount Tabor / Hermon",
        lat: 32.6860,
        lng: 35.3890,
        zoom: 13,
        eventId: "savior-transfiguration",
        year: 29,
        scriptureRef: "Matthew 17:2",
        summary: "Jesus is transfigured before Peter, James, and John; His face shines as the sun, and Moses and Elijah minister to Him in divine glory."
      },
      {
        title: "Triumphal Entry into Jerusalem",
        lat: 31.7780,
        lng: 35.2420,
        zoom: 14,
        eventId: "savior-triumphal-entry",
        year: 30,
        scriptureRef: "Matthew 21:9",
        summary: "Descending the Mount of Olives on a colt, Jesus is hailed by disciples laying palms: 'Hosanna to the Son of David: Blessed is he that cometh in the name of the Lord.'"
      },
      {
        title: "Agony in the Garden of Gethsemane",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        scriptureRef: "Luke 22:44",
        summary: "In the quiet olive garden across the Kidron Valley, Jesus kneels in infinite love, bearing our transgressions and bleeding at every pore for our redemption."
      },
      {
        title: "The Crucifixion and Resurrection",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 15,
        eventId: "savior-crucifixion",
        year: 30,
        scriptureRef: "John 19:30; Matthew 28:6",
        summary: "Completing His atoning sacrifice at Golgotha and rising triumphant from the tomb on the third day, the Risen Christ brings victory over death to all."
      }
    ]
  },
  {
    id: "later-judean-perean",
    category: "savior",
    title: "Later Judean & Perean Ministry",
    icon: "🌾",
    eraText: "Autumn 29 – Spring 30 AD • 6 Sacred Stations",
    description: "Follow the Savior through Jerusalem during the Feast of Tabernacles, across the Jordan into Perea, and up through Jericho to the home of Lazarus in Bethany.",
    stops: [
      {
        title: "The Light of the World at the Temple (Jerusalem)",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 15,
        eventId: "savior-tabernacles",
        year: 29,
        scriptureRef: "John 8:12",
        summary: "John 8:12 • 'I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.' At the Feast of Tabernacles, Jesus pardoned the woman taken in adultery and proclaimed His eternal divinity."
      },
      {
        title: "Healing the Man Born Blind at the Pool of Siloam",
        lat: 31.7705,
        lng: 35.2345,
        zoom: 16,
        eventId: "savior-pool-siloam",
        year: 29,
        scriptureRef: "John 9:7, 25",
        summary: "John 9:25 • 'One thing I know, that, whereas I was blind, now I see.' Anointing a blind man's eyes with clay, Jesus commanded him to wash in Siloam, demonstrating that He brings spiritual sight to a darkened world."
      },
      {
        title: "Raising Lazarus from the Dead in Bethany",
        lat: 31.7710,
        lng: 35.2600,
        zoom: 14,
        eventId: "savior-raising-lazarus",
        year: 30,
        scriptureRef: "John 11:25, 43",
        summary: "John 11:25 • 'I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.' Standing before the four-day tomb of Lazarus, Jesus wept in empathy and cried: 'Lazarus, come forth!'"
      },
      {
        title: "Ministry in Perea: Blessing the Little Children",
        lat: 31.8500,
        lng: 35.5400,
        zoom: 12,
        eventId: "savior-perea",
        year: 30,
        scriptureRef: "Mark 10:14",
        summary: "Mark 10:14 • 'Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God.' East of the Jordan, Jesus blessed infants, taught the parable of the Prodigal Son, and counselled the rich young ruler."
      },
      {
        title: "Blind Bartimaeus & Zacchaeus in Jericho",
        lat: 31.8650,
        lng: 35.4600,
        zoom: 13,
        eventId: "savior-jericho",
        year: 30,
        scriptureRef: "Luke 19:9–10",
        summary: "Luke 19:10 • 'For the Son of man is come to seek and to save that which was lost.' Passing through historic Jericho, Jesus restored sight to crying Bartimaeus and brought salvation to the home of repentant Zacchaeus."
      },
      {
        title: "Anointed by Mary in Bethany",
        lat: 31.7710,
        lng: 35.2600,
        zoom: 14,
        eventId: "savior-anointing-bethany",
        year: 30,
        scriptureRef: "John 12:3",
        summary: "John 12:3 • 'Then took Mary a pound of ointment of spikenard, very costly, and anointed the feet of Jesus, and wiped his feet with her hair.' Six days before Passover, Mary consecrated her costliest possession to prepare Jesus for His burial."
      }
    ]
  },
  {
    id: "passion-week",
    category: "savior",
    title: "Passion Week in Jerusalem",
    icon: "✝️",
    eraText: "Spring 30 AD • 8 Sacred Stations",
    description: "Follow the final week of the Savior's mortal life from the Triumphal Entry on the Mount of Olives to Gethsemane, the halls of trial, Golgotha, and the Resurrection.",
    stops: [
      {
        title: "Triumphal Entry (Bethphage & Mount of Olives)",
        lat: 31.7780,
        lng: 35.2450,
        zoom: 14,
        eventId: "savior-triumphal-entry",
        year: 30,
        scriptureRef: "Matthew 21:8–9",
        summary: "Jesus rides down the Mount of Olives into Jerusalem on Palm Sunday; crowds cast their garments and palm branches before the Prince of Peace, shouting 'Hosanna!'"
      },
      {
        title: "Cleansing the Temple & Final Teachings",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 15,
        eventId: "savior-cleansing-temple",
        year: 30,
        scriptureRef: "Matthew 21:12–13",
        summary: "Jesus cleanses the Temple courts of moneychangers, delivers the Olivet Discourse on the Second Coming, and teaches the parables of the Ten Virgins and the Talents."
      },
      {
        title: "The Last Supper (The Upper Room)",
        lat: 31.7720,
        lng: 35.2290,
        zoom: 15,
        eventId: "savior-last-supper",
        year: 30,
        scriptureRef: "Luke 22:19–20",
        summary: "In an upper room on Mount Zion, Jesus washes the disciples' feet, institutes the holy Sacrament of the Lord's Supper, and gives the new commandment to love one another."
      },
      {
        title: "The Atoning Agony in Gethsemane",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        scriptureRef: "Luke 22:42–44",
        summary: "Across the Kidron Valley, Jesus endures the unimaginable weight of human sin and sorrow. An angel strengthens Him as His sweat was as it were great drops of blood falling to the ground."
      },
      {
        title: "Trial before Caiaphas and the Sanhedrin",
        lat: 31.7715,
        lng: 35.2310,
        zoom: 15,
        eventId: "savior-trial-sanhedrin",
        year: 30,
        scriptureRef: "Matthew 26:63–64",
        summary: "Brought bound to the High Priest's palace, Jesus confesses: 'I am: and ye shall see the Son of man sitting on the right hand of power.' In the courtyard below, Peter weeps bitterly after his denial."
      },
      {
        title: "Before Pontius Pilate (Antonia Fortress / Praetorium)",
        lat: 31.7795,
        lng: 35.2340,
        zoom: 15,
        eventId: "savior-trial-pilate",
        year: 30,
        scriptureRef: "John 18:37",
        summary: "Pilate examines Jesus: 'Art thou a king then?' Jesus answers: 'To this end was I born, and for this cause came I into the world, that I should bear witness unto the truth.' Pilate finds no fault in Him."
      },
      {
        title: "The Crucifixion at Golgotha",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 15,
        eventId: "savior-crucifixion",
        year: 30,
        scriptureRef: "Luke 23:34, 46",
        summary: "Nailed to the cross between two thieves, the Savior prays: 'Father, forgive them; for they know not what they do.' Bowing His head, He proclaims 'It is finished' and yields up His spirit."
      },
      {
        title: "The Resurrection at the Empty Tomb",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 15,
        eventId: "savior-resurrection",
        year: 30,
        scriptureRef: "John 20:15–16",
        summary: "Early Sunday morning, Mary Magdalene finds the stone rolled away. The angels declare He is risen, and the Living Christ appears to Mary, calling her tenderly by name."
      }
    ]
  },

  // =========================================================================
  // CATEGORY 2: THE RESURRECTED LORD & HOLY APPEARANCES
  // =========================================================================
  {
    id: "road-to-emmaus",
    category: "resurrection",
    title: "The Road to Emmaus & Jerusalem",
    icon: "🌅",
    eraText: "Resurrection Sunday, 30 AD • 4 Sacred Stations",
    description: "Walk alongside Cleopas and his companion as the risen Savior joins them on the 7-mile road to Emmaus, opening the scriptures and their spiritual eyes.",
    stops: [
      {
        title: "A Mournful Morning in Jerusalem",
        lat: 31.7780,
        lng: 35.2350,
        zoom: 14,
        eventId: "resurrection-emmaus-start",
        year: 30,
        scriptureRef: "Luke 24:13–14",
        summary: "Luke 24:14 • 'And they talked together of all these things which had happened.' Sorrowful and perplexed after the crucifixion and reports of an empty tomb, two disciples depart Jerusalem for Emmaus."
      },
      {
        title: "The Seven-Mile Walk to Emmaus",
        lat: 31.8100,
        lng: 35.1200,
        zoom: 12,
        eventId: "resurrection-emmaus-walk",
        year: 30,
        scriptureRef: "Luke 24:27, 32",
        summary: "Luke 24:27 • 'And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself.' A stranger draws near and opens their hearts until they burn within."
      },
      {
        title: "Breaking Bread in the Village of Emmaus",
        lat: 31.8400,
        lng: 35.0200,
        zoom: 14,
        eventId: "resurrection-emmaus-meal",
        year: 30,
        scriptureRef: "Luke 24:30–31",
        summary: "Luke 24:30–31 • 'As he sat at meat with them, he took bread, and blessed it, and brake, and gave to them. And their eyes were opened, and they knew him; and he vanished out of their sight.'"
      },
      {
        title: "Joyous Return to the Upper Room in Jerusalem",
        lat: 31.7720,
        lng: 35.2290,
        zoom: 15,
        eventId: "resurrection-upper-room",
        year: 30,
        scriptureRef: "Luke 24:36, 39",
        summary: "Luke 24:36, 39 • 'Jesus himself stood in the midst of them, and saith unto them, Peace be unto you... Behold my hands and my feet, that it is I myself: handle me, and see; for a spirit hath not flesh and bones, as ye see me have.'"
      }
    ]
  },
  {
    id: "post-resurrection-appearances",
    category: "resurrection",
    title: "Post-Resurrection Appearances",
    icon: "👑",
    eraText: "Spring 30 AD • 7 Glorious Witnesses",
    description: "Follow the forty days of glorious witness: from the Garden Tomb to the locked Upper Room, the tranquil shores of Galilee, and the Mount of Olives Ascension.",
    stops: [
      {
        title: "Mary Magdalene at the Garden Tomb",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 15,
        eventId: "savior-resurrection",
        year: 30,
        scriptureRef: "John 20:16",
        summary: "John 20:16 • 'Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni; which is to say, Master.' Weeping outside the tomb, Mary became the first mortal witness of the resurrected Redeemer."
      },
      {
        title: "The Women on the Way from the Tomb",
        lat: 31.7800,
        lng: 35.2320,
        zoom: 15,
        eventId: "resurrection-women",
        year: 30,
        scriptureRef: "Matthew 28:9",
        summary: "Matthew 28:9 • 'And as they went to tell his disciples, behold, Jesus met them, saying, All hail. And they came and held him by the feet, and worshipped him.' The faithful women receive the Savior's personal blessing."
      },
      {
        title: "The Upper Room on Resurrection Evening",
        lat: 31.7720,
        lng: 35.2290,
        zoom: 15,
        eventId: "resurrection-disciples",
        year: 30,
        scriptureRef: "John 20:19–20",
        summary: "John 20:19 • 'When the doors were shut where the disciples were assembled for fear of the Jews, came Jesus and stood in the midst, and saith unto them, Peace be unto you.' He showed them His wounded hands and side."
      },
      {
        title: "Thomas Confesses the Risen Lord (8 Days Later)",
        lat: 31.7720,
        lng: 35.2290,
        zoom: 15,
        eventId: "resurrection-thomas",
        year: 30,
        scriptureRef: "John 20:28",
        summary: "John 20:28 • 'And Thomas answered and said unto him, My Lord and my God.' Touching the prints of the nails and spear, Thomas's doubts are swept away in awe and worship."
      },
      {
        title: "Miraculous Catch on the Sea of Galilee",
        lat: 32.8750,
        lng: 35.5600,
        zoom: 13,
        eventId: "resurrection-galilee-shore",
        year: 30,
        scriptureRef: "John 21:6, 17",
        summary: "John 21:17 • 'He saith unto him the third time, Simon, son of Jonas, lovest thou me?... Feed my sheep.' At dawn on the Galilean shore, Christ prepares breakfast for His tired disciples and commissions Peter to shepherd His flock."
      },
      {
        title: "The Great Commission on a Mountain in Galilee",
        lat: 32.8810,
        lng: 35.5550,
        zoom: 13,
        eventId: "resurrection-great-commission",
        year: 30,
        scriptureRef: "Matthew 28:19–20",
        summary: "Matthew 28:19–20 • 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost... and, lo, I am with you alway, even unto the end of the world.'"
      },
      {
        title: "The Ascension from the Mount of Olives",
        lat: 31.7790,
        lng: 35.2440,
        zoom: 14,
        eventId: "savior-ascension",
        year: 30,
        scriptureRef: "Acts 1:9, 11",
        summary: "Acts 1:11 • 'This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.' Lifting His hands in blessing, Jesus ascends into heaven before the assembled apostles."
      }
    ]
  },
  {
    id: "living-christ",
    category: "resurrection",
    title: "The Living Christ: Key Testimony Locations",
    icon: "🕊️",
    eraText: "Heavenly Witnesses • 7 Sacred Locations",
    description: "Journey to the holy locations where divine testimonies and angelic manifestations bore witness that Jesus Christ is the Son of the Living God.",
    stops: [
      {
        title: "Plains of Bethlehem (Angelic Proclamation)",
        lat: 31.7054,
        lng: 35.2024,
        zoom: 13,
        eventId: "savior-birth",
        year: -5,
        scriptureRef: "Luke 2:14",
        summary: "Angelic hosts light the Judean night sky, proclaiming: 'Glory to God in the highest, and on earth peace, good will toward men.'"
      },
      {
        title: "Jordan River (The Father's Voice)",
        lat: 31.8385,
        lng: 35.5478,
        zoom: 13,
        eventId: "savior-baptism",
        year: 26,
        scriptureRef: "Matthew 3:17",
        summary: "As Jesus rises from the baptismal waters, the heavens open and God the Father's voice resounds: 'This is my beloved Son, in whom I am well pleased.'"
      },
      {
        title: "Mount of Transfiguration (The Father's Voice)",
        lat: 32.6860,
        lng: 35.3890,
        zoom: 13,
        eventId: "savior-transfiguration",
        year: 29,
        scriptureRef: "Matthew 17:5",
        summary: "Overshadowed by a bright cloud on the holy mountain, the Father again bears witness: 'This is my beloved Son, in whom I am well pleased; hear ye him.'"
      },
      {
        title: "Garden of Gethsemane (Angelic Ministrant)",
        lat: 31.7794,
        lng: 35.2397,
        zoom: 15,
        eventId: "savior-gethsemane",
        year: 30,
        scriptureRef: "Luke 22:43",
        summary: "In the darkest hour of the Atonement, an angel appears from heaven strengthening the Savior as He pours out His soul for all humanity."
      },
      {
        title: "The Garden Tomb (Angels of the Resurrection)",
        lat: 31.7836,
        lng: 35.2300,
        zoom: 15,
        eventId: "savior-resurrection",
        year: 30,
        scriptureRef: "Luke 24:5–6",
        summary: "Two men in shining garments testify to the weeping disciples: 'Why seek ye the living among the dead? He is not here, but is risen.'"
      },
      {
        title: "Mount of Olives (Angels of the Ascension)",
        lat: 31.7790,
        lng: 35.2440,
        zoom: 14,
        eventId: "savior-ascension",
        year: 30,
        scriptureRef: "Acts 1:11",
        summary: "Two angels in white apparel promise the apostles: 'This same Jesus, which is taken up from you into heaven, shall so come in like manner.'"
      },
      {
        title: "Road to Damascus (The Risen Christ Speaks to Saul)",
        lat: 33.5138,
        lng: 36.2765,
        zoom: 12,
        eventId: "paul-conversion",
        year: 34,
        scriptureRef: "Acts 9:4–5",
        summary: "A heavenly light brighter than the noon sun strikes down Saul of Tarsus, and the glorified Lord testifies: 'I am Jesus whom thou persecutest.'"
      }
    ]
  },

  // =========================================================================
  // CATEGORY 3: APOSTOLIC ACTS & SPREADING THE GOSPEL
  // =========================================================================
  {
    id: "acts-early-church",
    category: "apostles",
    title: "Pentecost & the Early Church",
    icon: "🔥",
    eraText: "30–35 AD • 6 Sacred Stops",
    description: "Witness the endowment of the Holy Ghost at Pentecost, the miracles of the early Apostles, and the spread of the Gospel from Jerusalem to Samaria.",
    stops: [
      {
        title: "The Upper Room in Jerusalem (Day of Pentecost)",
        lat: 31.7720,
        lng: 35.2290,
        zoom: 14,
        eventId: "church-pentecost",
        year: 30,
        scriptureRef: "Acts 2:1–4",
        summary: "Acts 2:4 • 'And they were all filled with the Holy Ghost, and began to speak with other tongues.' Cloven tongues as of fire rest upon the disciples, inaugurating the apostolic era."
      },
      {
        title: "Temple Beautiful Gate (Healing the Lame Man)",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 15,
        eventId: "church-healing-temple",
        year: 30,
        scriptureRef: "Acts 3:6",
        summary: "Acts 3:6 • 'Silver and gold have I none; but such as I have give I thee: In the name of Jesus Christ of Nazareth rise up and walk.' Peter and John demonstrate the power of the Savior's name."
      },
      {
        title: "Solomon's Porch & Deliverance from Prison",
        lat: 31.7785,
        lng: 35.2365,
        zoom: 15,
        eventId: "church-solomon-porch",
        year: 31,
        scriptureRef: "Acts 5:19–20",
        summary: "Acts 5:20 • 'Go, stand and speak in the temple to the people all the words of this life.' The angel of the Lord opens the prison doors by night, bidding the apostles continue their public testimony."
      },
      {
        title: "Stoning of Stephen outside Jerusalem's Walls",
        lat: 31.7815,
        lng: 35.2385,
        zoom: 15,
        eventId: "church-stephen-martyr",
        year: 34,
        scriptureRef: "Acts 7:55–56",
        summary: "Acts 7:55 • 'He, being full of the Holy Ghost, looked up stedfastly into heaven, and saw the glory of God, and Jesus standing on the right hand of God.' Stephen seals his testimony as the first Christian martyr."
      },
      {
        title: "Samaria Embraces the Word under Philip",
        lat: 32.2770,
        lng: 35.1890,
        zoom: 13,
        eventId: "church-samaria-philip",
        year: 34,
        scriptureRef: "Acts 8:5–6",
        summary: "Acts 8:6 • 'And the people with one accord gave heed unto those things which Philip spake.' Miracles attend Philip's preaching, and Peter and John lay hands upon the converts to confer the Holy Ghost."
      },
      {
        title: "Gaza Road (Philip and the Ethiopian)",
        lat: 31.5010,
        lng: 34.4660,
        zoom: 12,
        eventId: "church-ethiopian-eunuch",
        year: 35,
        scriptureRef: "Acts 8:37–38",
        summary: "Acts 8:37 • 'I believe that Jesus Christ is the Son of God.' Philip expounds Isaiah 53 to an Ethiopian royal treasurer, baptizing him in a desert watercourse before returning rejoicing to Africa."
      }
    ]
  },
  {
    id: "peter-early-ministry",
    category: "apostles",
    title: "Peter’s Early Ministry (Jerusalem to Caesarea)",
    icon: "🔑",
    eraText: "35–40 AD • 5 Sacred Stations",
    description: "Follow the chief Apostle Peter as he carries the Gospel through Judea and the coastal plain, culminating in the historic vision at Joppa and the baptism of Cornelius at Caesarea.",
    stops: [
      {
        title: "Apostolic Leadership in Jerusalem",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 14,
        eventId: "peter-jerusalem-counsel",
        year: 36,
        scriptureRef: "Acts 4:12",
        summary: "Acts 4:12 • 'Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.' Peter fearlessly leads the growing Jerusalem congregation despite persecution."
      },
      {
        title: "Samaritan Confirmation (Conferring the Holy Ghost)",
        lat: 32.2770,
        lng: 35.1890,
        zoom: 12,
        eventId: "peter-samaria-visit",
        year: 36,
        scriptureRef: "Acts 8:17",
        summary: "Acts 8:17 • 'Then laid they their hands on them, and they received the Holy Ghost.' Peter and John confirm the Samaritan believers, rebuking Simon Magus who sought to purchase God's gift with money."
      },
      {
        title: "Healing Aeneas at Lydda (Lod)",
        lat: 31.9510,
        lng: 34.8880,
        zoom: 13,
        eventId: "peter-healing-aeneas",
        year: 37,
        scriptureRef: "Acts 9:34",
        summary: "Acts 9:34 • 'And Peter said unto him, Aeneas, Jesus Christ maketh thee whole: arise, and make thy bed. And he arose immediately.' The healing of this bedridden disciple leads all in Lydda and Sharon to turn to the Lord."
      },
      {
        title: "Raising Tabitha & Rooftop Vision in Joppa (Jaffa)",
        lat: 32.0536,
        lng: 34.7544,
        zoom: 14,
        eventId: "peter-joppa-vision",
        year: 38,
        scriptureRef: "Acts 9:40; Acts 10:15",
        summary: "Acts 10:15 • 'What God hath cleansed, that call not thou common.' In seaside Joppa, Peter raises beloved Tabitha from the dead and on Simon the tanner's rooftop receives the revelatory vision opening the gospel to Gentiles."
      },
      {
        title: "Conversion of Cornelius at Caesarea Maritima",
        lat: 32.5011,
        lng: 34.8925,
        zoom: 13,
        eventId: "peter-cornelius-caesarea",
        year: 38,
        scriptureRef: "Acts 10:34–35, 47",
        summary: "Acts 10:34–35 • 'Of a truth I perceive that God is no respecter of persons: But in every nation he that feareth him, and worketh righteousness, is accepted with him.' The Roman centurion's household receives the Holy Ghost and is baptized."
      }
    ]
  },
  {
    id: "paul-conversion-early-years",
    category: "apostles",
    title: "Paul’s Conversion & Early Years",
    icon: "⚡",
    eraText: "34–47 AD • 8 Transformative Stops",
    description: "Follow the dramatic transformation of Saul of Tarsus from a zealous persecutor into the chosen vessel of Christ across Damascus, Arabia, Jerusalem, and Antioch.",
    stops: [
      {
        title: "Persecution in Jerusalem",
        lat: 31.7780,
        lng: 35.2354,
        zoom: 14,
        eventId: "paul-persecution",
        year: 34,
        scriptureRef: "Acts 8:3",
        summary: "Acts 8:3 • 'As for Saul, he made havock of the church, entering into every house, and haling men and women committed them to prison.' Armed with letters from the High Priest, Saul sets out for Damascus."
      },
      {
        title: "The Damascus Road Theophany",
        lat: 33.4500,
        lng: 36.2000,
        zoom: 12,
        eventId: "paul-conversion",
        year: 34,
        scriptureRef: "Acts 9:3–5",
        summary: "Acts 9:4 • 'Saul, Saul, why persecutest thou me? And he said, Who art thou, Lord? And the Lord said, I am Jesus whom thou persecutest.' Blinded by the celestial radiance, Saul falls to the earth in repentance."
      },
      {
        title: "Straight Street in Damascus (Baptism by Ananias)",
        lat: 33.5097,
        lng: 36.3117,
        zoom: 15,
        eventId: "paul-ananias-damascus",
        year: 34,
        scriptureRef: "Acts 9:15, 18",
        summary: "Acts 9:15 • 'He is a chosen vessel unto me, to bear my name before the Gentiles, and kings, and the children of Israel.' Ananias lays hands on Saul, restoring his sight and baptizing him."
      },
      {
        title: "Solitude and Revelation in Arabia (Nabataea)",
        lat: 30.3285,
        lng: 35.4444,
        zoom: 10,
        eventId: "paul-arabia",
        year: 35,
        scriptureRef: "Galatians 1:17",
        summary: "Galatians 1:17 • 'Neither went I up to Jerusalem to them which were apostles before me; but I went into Arabia.' In the desert solitudes, Paul communes with the Lord, receiving the Gospel not of men but by direct revelation."
      },
      {
        title: "Escape over the Damascus Wall in a Basket",
        lat: 33.5120,
        lng: 36.3150,
        zoom: 14,
        eventId: "paul-escape-damascus",
        year: 37,
        scriptureRef: "Acts 9:25; 2 Cor 11:32–33",
        summary: "Acts 9:25 • 'Then the disciples took him by night, and let him down by the wall in a basket.' Preaching boldly that Jesus is the Son of God, Paul escapes an assassination plot by Governor Aretas's garrison."
      },
      {
        title: "Meeting Peter & James in Jerusalem",
        lat: 31.7720,
        lng: 35.2290,
        zoom: 14,
        eventId: "paul-first-jerusalem-visit",
        year: 37,
        scriptureRef: "Acts 9:27; Galatians 1:18–19",
        summary: "Galatians 1:18 • 'Then after three years I went up to Jerusalem to see Peter, and abode with him fifteen days.' Barnabas vouches for Paul's conversion before the initially fearful Jerusalem disciples."
      },
      {
        title: "Years of Preparation in Tarsus of Cilicia",
        lat: 36.9167,
        lng: 34.8956,
        zoom: 12,
        eventId: "paul-tarsus-preparation",
        year: 38,
        scriptureRef: "Acts 9:30; Acts 11:25",
        summary: "Acts 11:25 • 'Then departed Barnabas to Tarsus, for to seek Saul.' Paul returns to his native Roman city beneath the Taurus Mountains, teaching and preparing for his world-altering mission."
      },
      {
        title: "Co-Laboring in Syrian Antioch",
        lat: 36.2021,
        lng: 36.1606,
        zoom: 13,
        eventId: "paul-antioch-calling",
        year: 44,
        scriptureRef: "Acts 11:26",
        summary: "Acts 11:26 • 'And the disciples were called Christians first in Antioch.' For a full year, Barnabas and Paul teach large crowds in the third city of the Roman Empire, establishing the headquarters of Gentile missions."
      }
    ]
  },
  {
    id: "paul-journeys",
    category: "apostles",
    title: "Paul’s Journeys Across the Roman World",
    icon: "🗺️",
    eraText: "47–58 AD • 8 Key Centers",
    description: "Follow the Apostle Paul across thousands of miles through Cyprus, Galatia, Macedonia, Greece, and Asia Minor, planting churches and penning the Epistles.",
    stops: [
      {
        title: "Departure from Syrian Antioch",
        lat: 36.2021,
        lng: 36.1606,
        zoom: 10,
        eventId: "paul-first-journey-start",
        year: 47,
        scriptureRef: "Acts 13:2–3",
        summary: "The Holy Ghost directs the church at Antioch: 'Separate me Barnabas and Saul for the work whereunto I have called them.' Fasting and praying, they lay hands on them and send them forth."
      },
      {
        title: "Witnessing in Cyprus (Paphos)",
        lat: 34.7500,
        lng: 32.4167,
        zoom: 11,
        eventId: "paul-paphos-sergius",
        year: 47,
        scriptureRef: "Acts 13:12",
        summary: "At Paphos, the Roman proconsul Sergius Paulus believes the Gospel after Paul rebukes the sorcerer Elymas, marking Saul's emergence as Paul the Apostle to the Gentiles."
      },
      {
        title: "Synagogue at Pisidian Antioch",
        lat: 38.3000,
        lng: 31.1833,
        zoom: 11,
        eventId: "paul-pisidian-antioch",
        year: 48,
        scriptureRef: "Acts 13:46–47",
        summary: "When jealous leaders reject the Word, Paul proclaims: 'Lo, we turn to the Gentiles. For so hath the Lord commanded us, saying, I have set thee to be a light of the Gentiles.'"
      },
      {
        title: "Stoning and Survival at Lystra",
        lat: 37.5833,
        lng: 32.4500,
        zoom: 12,
        eventId: "paul-lystra-stoning",
        year: 48,
        scriptureRef: "Acts 14:19–20",
        summary: "Stoned and dragged outside Lystra for dead, Paul rises up as disciples surround him in prayer and courageously walks back into the city to confirm the saints."
      },
      {
        title: "Macedonian Call and Prison at Philippi",
        lat: 41.0125,
        lng: 24.2858,
        zoom: 12,
        eventId: "paul-philippi-jailer",
        year: 50,
        scriptureRef: "Acts 16:9, 31",
        summary: "Following a vision of a man of Macedonia crying 'Come over and help us', Paul crosses into Europe. Praising God in the Philippian dungeon at midnight, an earthquake opens the doors, and the jailer's family is baptized."
      },
      {
        title: "Mars Hill (Areopagus) in Athens",
        lat: 37.9715,
        lng: 23.7267,
        zoom: 13,
        eventId: "paul-areopagus-athens",
        year: 51,
        scriptureRef: "Acts 17:23, 28",
        summary: "Addressing philosophers on the Areopagus regarding the 'Unknown God', Paul proclaims: 'For in him we live, and move, and have our being... We ought not to think that the Godhead is like unto gold, or silver, or stone.'"
      },
      {
        title: "Eighteen Months in Corinth",
        lat: 37.9386,
        lng: 22.9322,
        zoom: 12,
        eventId: "paul-corinth-ministry",
        year: 51,
        scriptureRef: "Acts 18:9–10",
        summary: "Working alongside Aquila and Priscilla as a tentmaker, Paul receives the Lord's assurance in a night vision: 'Be not afraid, but speak, and hold not thy peace: for I am with thee, and no man shall set on thee to hurt thee.'"
      },
      {
        title: "Three Years in Ephesus (The Great Revival)",
        lat: 37.9497,
        lng: 27.3639,
        zoom: 12,
        eventId: "paul-ephesus-revival",
        year: 54,
        scriptureRef: "Acts 19:20",
        summary: "Teaching daily in the school of Tyrannus for over two years, all who dwelt in Asia heard the Word of the Lord. Special miracles are wrought by Paul's hands, causing the word of God to grow mightily and prevail."
      }
    ]
  },
  {
    id: "paul-voyage-to-rome",
    category: "apostles",
    title: "Paul’s Voyage to Rome (including Malta)",
    icon: "🚢",
    eraText: "59–62 AD • 9 Dramatic Stations",
    description: "Follow the harrowing sea voyage of the Apostle Paul: appealing to Caesar, surviving the two-week Euroclydon hurricane and Malta shipwreck, and preaching in Rome under house arrest.",
    stops: [
      {
        title: "Departure from Caesarea Maritima",
        lat: 32.5011,
        lng: 34.8925,
        zoom: 12,
        eventId: "voyage-caesarea-embark",
        year: 59,
        scriptureRef: "Acts 27:1–2",
        summary: "Acts 27:1 • 'When it was determined that we should sail into Italy, they delivered Paul and certain other prisoners unto one named Julius, a centurion of Augustus' band.' Luke and Aristarchus accompany Paul on the ship."
      },
      {
        title: "Refreshing with Friends in Sidon",
        lat: 33.5631,
        lng: 35.3689,
        zoom: 12,
        eventId: "voyage-sidon",
        year: 59,
        scriptureRef: "Acts 27:3",
        summary: "Acts 27:3 • 'And the next day we touched at Sidon. And Julius courteously entreated Paul, and gave him liberty to go unto his friends to refresh himself.' Christian hospitality strengthens the apostle."
      },
      {
        title: "Transfer to Alexandrian Grain Freighter at Myra",
        lat: 36.2442,
        lng: 29.9856,
        zoom: 12,
        eventId: "voyage-myra",
        year: 59,
        scriptureRef: "Acts 27:5–6",
        summary: "Acts 27:6 • 'And there the centurion found a ship of Alexandria sailing into Italy; and he put us therein.' Boarding a large Roman grain carrier, the voyage heads into adverse autumn winds."
      },
      {
        title: "Fair Havens (Crete) & Paul's Warning",
        lat: 34.9333,
        lng: 24.8167,
        zoom: 12,
        eventId: "voyage-fair-havens",
        year: 59,
        scriptureRef: "Acts 27:9–10",
        summary: "Acts 27:10 • 'Sirs, I perceive that this voyage will be with hurt and much damage, not only of the lading and ship, but also of our lives.' The master and owner disregard Paul's prophetic counsel, seeking a better harbor."
      },
      {
        title: "The Euroclydon Hurricane in the Adriatic",
        lat: 35.5000,
        lng: 19.5000,
        zoom: 8,
        eventId: "voyage-euroclydon",
        year: 59,
        scriptureRef: "Acts 27:22–24",
        summary: "Acts 27:23–24 • 'For there stood by me this night the angel of God, whose I am, and whom I serve, Saying, Fear not, Paul; thou must be brought before Caesar: and, lo, God hath given thee all them that sail with thee.' Driven fourteen days in total tempest, all 276 souls are spared."
      },
      {
        title: "Shipwreck & Viper at Malta (Melita)",
        lat: 35.9375,
        lng: 14.3754,
        zoom: 12,
        eventId: "voyage-malta",
        year: 60,
        scriptureRef: "Acts 28:1–6, 8–9",
        summary: "Acts 28:5 • 'And he shook off the beast into the fire, and felt no harm.' The shipwrecked crew and prisoners swim safely ashore at St. Paul's Bay; Paul is unharmed by a deadly viper and heals the father of Publius."
      },
      {
        title: "Three Days in Syracuse (Sicily)",
        lat: 37.0755,
        lng: 15.2866,
        zoom: 12,
        eventId: "voyage-syracuse",
        year: 60,
        scriptureRef: "Acts 28:11–12",
        summary: "Acts 28:11–12 • 'After three months we departed in a ship of Alexandria, which had wintered in the isle, whose sign was Castor and Pollux. And landing at Syracuse, we tarried there three days.'"
      },
      {
        title: "Arrival on Italian Soil at Puteoli",
        lat: 40.8222,
        lng: 14.1206,
        zoom: 12,
        eventId: "voyage-puteoli",
        year: 60,
        scriptureRef: "Acts 28:13–14",
        summary: "Acts 28:14 • 'Where we found brethren, and were desired to tarry with them seven days: and so we went toward Rome.' In the Bay of Naples, Italian believers welcome the apostle with joyous fellowship."
      },
      {
        title: "Two Years Preaching in Rome",
        lat: 41.9028,
        lng: 12.4964,
        zoom: 13,
        eventId: "voyage-rome-arrival",
        year: 60,
        scriptureRef: "Acts 28:30–31",
        summary: "Acts 28:30–31 • 'And Paul dwelt two whole years in his own hired house, and received all that came in unto him, Preaching the kingdom of God, and teaching those things which concern the Lord Jesus Christ, with all confidence, no man forbidding him.'"
      }
    ]
  },
  {
    id: "revelation-churches",
    category: "apostles",
    title: "Seven Churches of Revelation & Patmos",
    icon: "🕯️",
    eraText: "95–96 AD • 8 Sacred Locations",
    description: "Accompany the beloved Apostle John on the isle of Patmos as the glorified Savior reveals His apocalyptic letters to the seven congregations of Asia Minor.",
    stops: [
      {
        title: "Isle of Patmos (The Vision of Christ in Glory)",
        lat: 37.3100,
        lng: 26.5400,
        zoom: 11,
        eventId: "revelation-patmos",
        year: 95,
        scriptureRef: "Revelation 1:9–10, 17–18",
        summary: "John receives the apocalyptic vision of the Son of Man standing amidst seven golden candlesticks, declaring: 'I am he that liveth, and was dead; and, behold, I am alive for evermore, Amen; and have the keys of hell and of death.'"
      },
      {
        title: "Church at Ephesus (The Tree of Life)",
        lat: 37.9497,
        lng: 27.3639,
        zoom: 13,
        eventId: "church-ephesus",
        year: 95,
        scriptureRef: "Revelation 2:1, 7",
        summary: "Christ commends Ephesus for labor and patience, calling them to remember their first love: 'To him that overcometh will I give to eat of the tree of life, which is in the midst of the paradise of God.'"
      },
      {
        title: "Church at Smyrna (The Crown of Life)",
        lat: 38.4192,
        lng: 27.1287,
        zoom: 13,
        eventId: "church-smyrna",
        year: 95,
        scriptureRef: "Revelation 2:8, 10",
        summary: "To the persecuted saints at Smyrna, the Lord comforts: 'Fear none of those things which thou shalt suffer... be thou faithful unto death, and I will give thee a crown of life.'"
      },
      {
        title: "Church at Pergamum (The Hidden Manna)",
        lat: 39.1325,
        lng: 27.1842,
        zoom: 13,
        eventId: "church-pergamum",
        year: 95,
        scriptureRef: "Revelation 2:12, 17",
        summary: "Situated where Satan's seat was, Pergamum held fast to Christ's name: 'To him that overcometh will I give to eat of the hidden manna, and will give him a white stone, and in the stone a new name written.'"
      },
      {
        title: "Church at Thyatira (The Morning Star)",
        lat: 38.9242,
        lng: 27.8406,
        zoom: 13,
        eventId: "church-thyatira",
        year: 95,
        scriptureRef: "Revelation 2:18, 28",
        summary: "Commended for charity, service, faith, and patience: 'And he that overcometh, and keepeth my works unto the end, to him will I give power over the nations... and I will give him the morning star.'"
      },
      {
        title: "Church at Sardis (Clothed in White Raiment)",
        lat: 38.4883,
        lng: 28.0403,
        zoom: 13,
        eventId: "church-sardis",
        year: 95,
        scriptureRef: "Revelation 3:1, 5",
        summary: "Admonished to be watchful and strengthen the things which remain: 'He that overcometh, the same shall be clothed in white raiment; and I will not blot out his name out of the book of life.'"
      },
      {
        title: "Church at Philadelphia (An Open Door)",
        lat: 38.3514,
        lng: 28.5175,
        zoom: 13,
        eventId: "church-philadelphia",
        year: 95,
        scriptureRef: "Revelation 3:7–8, 12",
        summary: "The faithful congregation praised for keeping Christ's word: 'Him that overcometh will I make a pillar in the temple of my God, and he shall go no more out: and I will write upon him the name of my God.'"
      },
      {
        title: "Church at Laodicea (Behold, I Stand at the Door)",
        lat: 37.8344,
        lng: 29.1086,
        zoom: 13,
        eventId: "church-laodicea",
        year: 95,
        scriptureRef: "Revelation 3:14, 20–21",
        summary: "Rebuked for being neither cold nor hot, yet extended the most tender invitation: 'Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me.'"
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TOURS_DATA };
}
