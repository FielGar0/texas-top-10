// City data for Texas Top 10.
// Each city: slug (used in the URL), name, region, tagline, two gradient colors, and a ranked list of 10 places.
// Each place: name, category, area (neighborhood or district), blurb.
window.CITIES = [
  {
    slug: "austin",
    name: "Austin",
    region: "Central Texas · Hill Country",
    tagline: "Live music, spring-fed swimming and brisket worth the line.",
    colors: ["#bf5700", "#13294b"],
    places: [
      { name: "Barton Springs Pool", category: "Outdoors", area: "Zilker", blurb: "A three-acre, spring-fed pool that stays around 68 degrees all year. The classic Austin cool-off on a summer afternoon." },
      { name: "Texas State Capitol", category: "Landmark", area: "Downtown", blurb: "Built from pink Texas granite and taller than the U.S. Capitol. Free guided tours run most days." },
      { name: "Franklin Barbecue", category: "Food", area: "East Austin", blurb: "Famous brisket and an even more famous line. Bring a chair and plan to get there early." },
      { name: "Lady Bird Lake Hike-and-Bike Trail", category: "Outdoors", area: "Downtown", blurb: "About ten miles of trail looping the lake through the middle of the city, with skyline views the whole way." },
      { name: "Congress Avenue Bridge Bats", category: "Nature", area: "Downtown", blurb: "From roughly spring through fall, a huge colony of Mexican free-tailed bats pours out from under the bridge at dusk." },
      { name: "South Congress Avenue", category: "Neighborhood", area: "SoCo", blurb: "Boutiques, vintage shops, food trucks and murals, with a straight-on view of the Capitol." },
      { name: "Zilker Park", category: "Outdoors", area: "Zilker", blurb: "Austin's big front yard: botanical garden, kayak rentals, and home of Austin City Limits Music Festival." },
      { name: "Mount Bonnell", category: "Outdoors", area: "West Austin", blurb: "A short climb up to one of the best sunset views of the Colorado River and the hills west of town." },
      { name: "Blanton Museum of Art", category: "Museum", area: "UT Campus", blurb: "The University of Texas art museum, home to Ellsworth Kelly's light-filled chapel-like building, \"Austin.\"" },
      { name: "The Continental Club", category: "Music", area: "SoCo", blurb: "A South Congress institution for live music since the 1950s. Small room, big talent." }
    ]
  },
  {
    slug: "san-antonio",
    name: "San Antonio",
    region: "South Central Texas",
    tagline: "Three hundred years of history along a river lined with cypress.",
    colors: ["#0e6e5c", "#c2410c"],
    places: [
      { name: "The Alamo", category: "Landmark", area: "Downtown", blurb: "The most famous mission in Texas and the heart of the state's story. Reserve a free entry time ahead." },
      { name: "San Antonio River Walk", category: "Neighborhood", area: "Downtown", blurb: "Miles of stone paths a story below street level, lined with restaurants, river barges and bridges." },
      { name: "Mission San José", category: "Landmark", area: "Mission Trail", blurb: "The \"Queen of the Missions,\" part of the San Antonio Missions UNESCO World Heritage Site." },
      { name: "The Pearl", category: "Neighborhood", area: "Pearl District", blurb: "A former brewery turned food and shopping district, with a weekend farmers market and riverside restaurants." },
      { name: "Historic Market Square", category: "Shopping", area: "Downtown", blurb: "The largest Mexican market in the U.S., full of crafts, music and pan dulce." },
      { name: "San Antonio Museum of Art", category: "Museum", area: "Museum Reach", blurb: "Housed in the old Lone Star Brewery, known for its Latin American and ancient Mediterranean collections." },
      { name: "Japanese Tea Garden", category: "Outdoors", area: "Brackenridge Park", blurb: "A peaceful garden built into an old rock quarry, with koi ponds, stone bridges and a waterfall." },
      { name: "McNay Art Museum", category: "Museum", area: "Alamo Heights", blurb: "Texas's first modern art museum, in a Spanish Colonial Revival mansion with beautiful grounds." },
      { name: "Tower of the Americas", category: "Landmark", area: "Hemisfair", blurb: "Built for the 1968 World's Fair. Ride up for a 360-degree view of the city." },
      { name: "King William Historic District", category: "Neighborhood", area: "Southtown", blurb: "Grand 19th-century homes on shady streets, an easy walk from the River Walk." }
    ]
  },
  {
    slug: "houston",
    name: "Houston",
    region: "Gulf Coast",
    tagline: "Space flight, world-class museums and the most diverse food scene in Texas.",
    colors: ["#1e3a8a", "#0891b2"],
    places: [
      { name: "Space Center Houston", category: "Museum", area: "Clear Lake", blurb: "The visitor center for NASA Johnson Space Center, with real spacecraft and tram tours of mission control." },
      { name: "Museum of Fine Arts, Houston", category: "Museum", area: "Museum District", blurb: "One of the largest art museums in the country, spread across several buildings and a sculpture garden." },
      { name: "The Menil Collection", category: "Museum", area: "Montrose", blurb: "A free museum in a calm, light-filled building, set in a neighborhood of gray bungalows and green lawns." },
      { name: "Rothko Chapel", category: "Landmark", area: "Montrose", blurb: "An octagonal, meditative space holding fourteen large Mark Rothko paintings. Quiet and unforgettable." },
      { name: "Buffalo Bayou Park", category: "Outdoors", area: "Downtown / Memorial", blurb: "Trails, kayaking and skyline views along the bayou, plus a historic underground cistern you can tour." },
      { name: "Houston Museum of Natural Science", category: "Museum", area: "Museum District", blurb: "Dinosaur halls, a gem and mineral collection, a planetarium and a butterfly center under one roof." },
      { name: "Hermann Park", category: "Outdoors", area: "Museum District", blurb: "A huge urban park with a Japanese garden, paddle boats, a miniature train and an outdoor theater." },
      { name: "Houston Zoo", category: "Family", area: "Hermann Park", blurb: "A large, well-shaded zoo inside Hermann Park with thousands of animals." },
      { name: "Discovery Green", category: "Outdoors", area: "Downtown", blurb: "A downtown park with a lake, playgrounds, free concerts and seasonal events." },
      { name: "Beer Can House", category: "Quirky", area: "Rice Military", blurb: "A house covered in thousands of flattened beer cans. Pure Houston folk art." }
    ]
  },
  {
    slug: "dallas",
    name: "Dallas",
    region: "North Texas",
    tagline: "Big-city art, history that changed the country and a lake for every weekend.",
    colors: ["#0f172a", "#2563eb"],
    places: [
      { name: "The Sixth Floor Museum at Dealey Plaza", category: "Museum", area: "Downtown / West End", blurb: "Tells the story of President Kennedy's life and assassination from the former Texas School Book Depository." },
      { name: "Dallas Arboretum and Botanical Garden", category: "Outdoors", area: "White Rock Lake", blurb: "Sixty-six acres of gardens on the lake, famous for its spring tulips and fall pumpkin village." },
      { name: "Klyde Warren Park", category: "Outdoors", area: "Arts District", blurb: "A park built over a freeway, with food trucks, lawn games and free events." },
      { name: "Dallas Museum of Art", category: "Museum", area: "Arts District", blurb: "A huge, free general collection spanning thousands of years, in the largest arts district in the country." },
      { name: "Perot Museum of Nature and Science", category: "Family", area: "Victory Park", blurb: "Hands-on science across five floors, inside a striking cube-shaped building." },
      { name: "Deep Ellum", category: "Neighborhood", area: "Deep Ellum", blurb: "Dallas's historic music and arts district, with murals, bars and live shows most nights." },
      { name: "Bishop Arts District", category: "Neighborhood", area: "Oak Cliff", blurb: "Walkable blocks of independent shops, galleries and restaurants in Oak Cliff." },
      { name: "Reunion Tower", category: "Landmark", area: "Downtown", blurb: "The lit-up ball on the skyline, with an observation deck and sweeping views of the city." },
      { name: "White Rock Lake", category: "Outdoors", area: "East Dallas", blurb: "A nine-mile loop for biking, running and sunset paddling." },
      { name: "Nasher Sculpture Center", category: "Museum", area: "Arts District", blurb: "Modern and contemporary sculpture inside and out, with a quiet garden in the middle of downtown." }
    ]
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    region: "North Texas",
    tagline: "Where the West begins, with a world-class art scene down the road.",
    colors: ["#7c2d12", "#a16207"],
    places: [
      { name: "Fort Worth Stockyards", category: "Landmark", area: "Stockyards", blurb: "Twice-daily cattle drives down Exchange Avenue, rodeos, honky-tonks and western wear." },
      { name: "Kimbell Art Museum", category: "Museum", area: "Cultural District", blurb: "A small, superb collection in a Louis Kahn building often called one of the most beautiful museums anywhere." },
      { name: "Modern Art Museum of Fort Worth", category: "Museum", area: "Cultural District", blurb: "Postwar art in a concrete-and-glass building that seems to float on a reflecting pond." },
      { name: "Amon Carter Museum of American Art", category: "Museum", area: "Cultural District", blurb: "Free admission and a standout collection of Western art, including Remington and Russell." },
      { name: "Billy Bob's Texas", category: "Music", area: "Stockyards", blurb: "A giant honky-tonk with live country music, line dancing and indoor bull riding." },
      { name: "Sundance Square", category: "Neighborhood", area: "Downtown", blurb: "A lively downtown plaza surrounded by restored brick buildings, restaurants and shops." },
      { name: "Fort Worth Botanic Garden", category: "Outdoors", area: "Cultural District", blurb: "One of the oldest botanic gardens in Texas, with a beloved Japanese garden." },
      { name: "Fort Worth Water Gardens", category: "Outdoors", area: "Downtown", blurb: "A dramatic concrete park of terraced pools and cascading water designed by Philip Johnson." },
      { name: "Fort Worth Zoo", category: "Family", area: "Forest Park", blurb: "One of the oldest zoos in Texas and a regular on lists of the best zoos in the country." },
      { name: "National Cowgirl Museum and Hall of Fame", category: "Museum", area: "Cultural District", blurb: "Celebrates women who shaped the American West, from ranchers to rodeo stars." }
    ]
  },
  {
    slug: "el-paso",
    name: "El Paso",
    region: "Far West Texas",
    tagline: "Desert mountains, borderland culture and the oldest missions in Texas.",
    colors: ["#9a3412", "#6d28d9"],
    places: [
      { name: "Franklin Mountains State Park", category: "Outdoors", area: "Northwest El Paso", blurb: "One of the largest urban parks in the country, with desert hiking and mountain biking inside the city." },
      { name: "Scenic Drive Overlook", category: "Landmark", area: "Rim Area", blurb: "A winding road along the mountain with a sweeping view of El Paso and Ciudad Juárez, best at night." },
      { name: "Hueco Tanks State Park & Historic Site", category: "Outdoors", area: "East of town", blurb: "Famous for rock climbing and ancient pictographs. Entry is limited, so reserve ahead." },
      { name: "Mission Trail", category: "Landmark", area: "Lower Valley", blurb: "Ysleta, Socorro and San Elizario: historic adobe missions along a short drive through the valley." },
      { name: "Chamizal National Memorial", category: "Landmark", area: "South Central", blurb: "A National Park Service site honoring the peaceful settlement of a border dispute, with free outdoor concerts." },
      { name: "El Paso Museum of Art", category: "Museum", area: "Downtown", blurb: "A free museum with European, American and Mexican art, right downtown." },
      { name: "Plaza Theatre", category: "Landmark", area: "Downtown", blurb: "A restored 1930 Spanish-style movie palace that now hosts Broadway tours and concerts." },
      { name: "San Jacinto Plaza", category: "Outdoors", area: "Downtown", blurb: "The heart of downtown, with a fountain, events, and a nod to the alligators that once lived here." },
      { name: "El Paso Holocaust Museum", category: "Museum", area: "Downtown", blurb: "A moving, free museum dedicated to Holocaust education and remembrance." },
      { name: "L&J Cafe", category: "Food", area: "Central El Paso", blurb: "A family-run Mexican restaurant serving El Paso since 1927, next to Concordia Cemetery." }
    ]
  }
];
