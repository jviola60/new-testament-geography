/**
 * Biblical Hydrography & Waterways (~6 BC - 100 AD)
 * High-resolution geographic coordinates for the River Jordan, Sea of Galilee, and Dead Sea.
 * Renders authentic azure water bodies directly onto the cartographic basemap.
 */
const HYDROGRAPHY_DATA = {
  // The River Jordan (Yarden - "The Descender")
  // Flowing from Mount Hermon and Caesarea Philippi in the north, through the Sea of Galilee,
  // winding through the Great Jordan Rift Valley down to Bethabara and the Dead Sea.
  jordanRiver: [
    // Upper Jordan (Mount Hermon springs to Lake Hula)
    [33.284, 35.670], // Banias / Caesarea Philippi spring
    [33.248, 35.652], // Dan spring confluence
    [33.155, 35.628], // Hula Valley
    [33.060, 35.618], // South of Hula
    [32.960, 35.625], // Entering basalt canyon
    [32.905, 35.632], // Upper Jordan inflow into Sea of Galilee
    // Gap through Sea of Galilee (32.905 to 32.712)
    // Lower Jordan (Exiting Sea of Galilee to the Dead Sea)
    [32.712, 35.578], // Southern outlet of Sea of Galilee (Degania)
    [32.685, 35.568],
    [32.645, 35.560], // Near Scythopolis / Beth Shean
    [32.580, 35.552],
    [32.510, 35.545],
    [32.440, 35.548], // Valley of Perea / Samaria border
    [32.360, 35.555],
    [32.280, 35.562], // Near Adam (Damieh ford)
    [32.200, 35.558],
    [32.110, 35.550],
    [32.020, 35.548],
    [31.940, 35.545], // North of Jericho
    [31.880, 35.548], // Plains of Jericho
    [31.8385, 35.548], // Bethabara / Bethany Beyond Jordan (Traditional Baptism Site of Jesus Christ)
    [31.790, 35.552], // River Jordan Delta entering the Dead Sea
  ],

  // Sea of Galilee (Lake of Gennesaret / Sea of Tiberias / Yam Kinneret)
  seaOfGalilee: [
    [32.898, 35.632], // Jordan inflow
    [32.885, 35.648], // Bethsaida shore
    [32.855, 35.662], // Eastern shore (Golan / Decapolis)
    [32.810, 35.655], // Gergesa / Kursi
    [32.770, 35.645], // Hippos shore
    [32.730, 35.615], // Southeastern corner
    [32.710, 35.580], // Southern outlet (Degania)
    [32.735, 35.565], // South of Tiberias (Hot Springs)
    [32.790, 35.542], // Tiberias harbor
    [32.825, 35.525], // Magdala shore
    [32.860, 35.528], // Plain of Gennesaret
    [32.880, 35.550], // Tabgha / Seven Springs
    [32.890, 35.578], // Capernaum harbor
    [32.898, 35.632]  // Return to Jordan inflow
  ],

  // The Dead Sea (Salt Sea / Lacus Asphaltites / Yam HaMelakh)
  deadSea: [
    [31.790, 35.552], // Northern tip at Jordan River mouth
    [31.750, 35.555],
    [31.680, 35.565], // Callirrhoe thermal springs (Perea)
    [31.550, 35.570], // Arnon River gorge mouth
    [31.420, 35.565], // Lisan Peninsula
    [31.330, 35.540], // Southern tongue
    [31.180, 35.490], // Mount Sodom area
    [31.120, 35.430], // South basin
    [31.250, 35.390], // Masada western shore
    [31.460, 35.395], // Ein Gedi oasis
    [31.600, 35.435], // Qumran / Dead Sea Scrolls caves
    [31.740, 35.480], // Northwestern shore
    [31.790, 35.552]  // Return to northern tip
  ],

  // Historic Biblical Highway Travel Corridors (Authentic 1st-century Roman & Pilgrim roads)
  roads: [
    {
      id: "jordan-valley-road",
      name: "Jordan Valley Pilgrim Highway",
      desc: "The primary Jewish pilgrim route between Galilee and Jerusalem, avoiding Samaritan territory.",
      coordinates: [
        [32.880, 35.550], // Capernaum / Galilee
        [32.780, 35.540], // Tiberias
        [32.645, 35.560], // Scythopolis
        [32.360, 35.555], // Jordan Valley midsection
        [31.865, 35.460]  // Jericho Oasis
      ]
    },
    {
      id: "jericho-jerusalem-ascent",
      name: "The Jericho to Jerusalem Road (Ascent of Adummim)",
      desc: "Steep 17-mile mountain highway ascending 3,500 feet from Jericho to the Mount of Olives. Setting of the Parable of the Good Samaritan.",
      coordinates: [
        [31.865, 35.460], // Jericho (-258m)
        [31.835, 35.370], // Wadi Qelt / Judean desert canyon
        [31.810, 35.300], // Inn of the Good Samaritan (Ma'ale Adummim)
        [31.780, 35.265], // Bethany & Bethphage
        [31.778, 35.242], // Mount of Olives
        [31.777, 35.234]  // Jerusalem (Temple Mount)
      ]
    },
    {
      id: "way-of-patriarchs",
      name: "Way of the Patriarchs (Ridge Route)",
      desc: "Central ridge highway connecting Jerusalem, Bethlehem, and Hebron.",
      coordinates: [
        [31.777, 35.234], // Jerusalem
        [31.705, 35.204], // Bethlehem
        [31.530, 35.095]  // Hebron
      ]
    },
    {
      id: "nazareth-capernaum",
      name: "Nazareth to Capernaum Highway",
      desc: "Northern trade route through the Valley of Jezreel and Cana of Galilee.",
      coordinates: [
        [32.702, 35.298], // Nazareth
        [32.748, 35.338], // Cana of Galilee
        [32.825, 35.525], // Magdala
        [32.880, 35.550]  // Capernaum
      ]
    }
  ]
};
