// City data for Texas Top 10.
// City: slug (URL), name, region, tagline (one line for the city tile), intro (opening paragraph), places (ranked).
// lat, lon: map position. labelSide: "left" to put the map label on the left of the dot.
// Place: name, category, area, blurb, optional tip (a practical "good to know" note).
window.CITIES = [
  {
    slug: "austin",
    lat: 30.27, lon: -97.74,
    name: "Austin",
    region: "Central Texas",
    tagline: "Cold springs, a pink granite Capitol and brisket at dawn.",
    intro:
      "Austin rewards people who pick a lane. Come for the swimming holes, the barbecue or the live music, and let the rest of the city fill in around it. Most of this list sits within a few miles of Lady Bird Lake, so a bike or a good pair of shoes covers a lot of it.",
    places: [
      { name: "Barton Springs Pool", category: "Outdoors", area: "Zilker", blurb: "A spring-fed pool three acres long that holds at about 68 degrees year-round. On a July afternoon, nothing else in town comes close.", tip: "Bring cash or a card for the entry fee, and arrive early on summer weekends." },
      { name: "Texas State Capitol", category: "Landmark", area: "Downtown", blurb: "Built in the 1880s from pink granite quarried in the Hill Country, and a few feet taller than the U.S. Capitol. The rotunda alone is worth the walk up Congress Avenue.", tip: "Free guided tours start inside the south entrance." },
      { name: "Franklin Barbecue", category: "Food", area: "East Austin", blurb: "The brisket that set the standard for a generation of Texas pitmasters. The line is part of the experience, and the regulars treat it like a tailgate." },
      { name: "Lady Bird Lake Trail", category: "Outdoors", area: "Downtown", blurb: "A ten-mile loop around the river through the middle of the city. Run it, bike it, or rent a paddleboard and see the skyline from the water." },
      { name: "Congress Avenue Bridge Bats", category: "Nature", area: "Downtown", blurb: "Every warm-weather evening, a colony of Mexican free-tailed bats leaves from under the bridge in a long dark ribbon. It's one of the largest urban bat colonies in North America.", tip: "Best from late spring through early fall. Watch from the east side of the bridge around sunset." },
      { name: "South Congress Avenue", category: "Neighborhood", area: "SoCo", blurb: "Boot shops, vintage stores and patios, with the Capitol framed at the north end of the street. Go in the late afternoon and stay for dinner." },
      { name: "Zilker Park", category: "Outdoors", area: "Zilker", blurb: "Three hundred-plus acres next to Barton Springs, with a botanical garden, canoe rentals and the lawn that hosts Austin City Limits Music Festival each fall." },
      { name: "Mount Bonnell", category: "Outdoors", area: "West Austin", blurb: "A short, steep climb to a lookout over Lake Austin and the hills to the west. Locals have been watching the sunset from here since the 1800s." },
      { name: "Blanton Museum of Art", category: "Museum", area: "UT Campus", blurb: "The University of Texas art museum, best known for Austin, Ellsworth Kelly's chapel-like building of colored glass and black-and-white marble panels." },
      { name: "The Continental Club", category: "Music", area: "SoCo", blurb: "Open since 1955 and still one of the best small rooms in a city full of them. Check the calendar for the weekly residencies." }
    ]
  },
  {
    slug: "san-antonio",
    lat: 29.42, lon: -98.49,
    name: "San Antonio",
    region: "South Texas",
    tagline: "Spanish missions, a river below the street and Saturday at the Pearl.",
    intro:
      "San Antonio is older than the United States, and it shows in the best way. Five Spanish colonial missions, including the Alamo, run along the river south of downtown. Pair a morning of history with an afternoon on the River Walk and dinner at the Pearl.",
    places: [
      { name: "The Alamo", category: "Landmark", area: "Downtown", blurb: "The 1718 mission and the site of the 1836 battle that became the rallying cry of the Texas Revolution. Smaller than most people expect, and more moving.", tip: "Entry to the church is free, but you reserve a timed ticket online." },
      { name: "Mission San José", category: "Landmark", area: "Mission Trail", blurb: "The largest of the city's missions, restored with its walls, granary and carved stone window intact. Part of a UNESCO World Heritage Site since 2015.", tip: "The Mission Reach hike-and-bike trail links all four southern missions along the river." },
      { name: "San Antonio River Walk", category: "Neighborhood", area: "Downtown", blurb: "Stone paths a story below street level, shaded by cypress trees. The downtown stretch is busy; walk north toward the Museum Reach for a quieter version." },
      { name: "The Pearl", category: "Neighborhood", area: "Pearl District", blurb: "The old Pearl Brewery, now home to some of the city's best restaurants, a culinary school and Hotel Emma. Weekend mornings bring a farmers market." },
      { name: "Historic Market Square", category: "Shopping", area: "Downtown", blurb: "Three blocks of Mexican crafts, music and bakeries, a few minutes' walk west of the river. Mi Tierra, open around the clock, anchors one corner." },
      { name: "San Antonio Museum of Art", category: "Museum", area: "Museum Reach", blurb: "Inside the old Lone Star Brewery, with a deep Latin American collection and one of the largest collections of ancient Mediterranean art in the South." },
      { name: "Japanese Tea Garden", category: "Outdoors", area: "Brackenridge Park", blurb: "A former rock quarry turned sunken garden, with a waterfall, stone footbridges and koi ponds. Free, and best in the soft light of morning." },
      { name: "McNay Art Museum", category: "Museum", area: "Alamo Heights", blurb: "The first modern art museum in Texas, set in Marion Koogler McNay's 1920s Spanish Colonial Revival home and gardens." },
      { name: "King William Historic District", category: "Neighborhood", area: "Southtown", blurb: "Victorian and Greek Revival mansions built by the city's 19th-century German merchants, along quiet streets just off the river." },
      { name: "Tower of the Americas", category: "Landmark", area: "Hemisfair", blurb: "Built for the 1968 World's Fair. The observation deck, 750 feet up, gives the clearest sense of how the city spreads out across the plain." }
    ]
  },
  {
    slug: "houston",
    lat: 29.76, lon: -95.37,
    name: "Houston",
    region: "Gulf Coast",
    tagline: "Mission control, a museum district and the best eating in the state.",
    intro:
      "Houston doesn't arrange itself for visitors, which is part of its charm. The city is huge, flat and spread out, but its best things cluster: a Museum District within walking distance of Hermann Park, a quiet campus of art in Montrose, and NASA's home base down near the bay.",
    places: [
      { name: "Space Center Houston", category: "Museum", area: "Clear Lake", blurb: "The visitor center for NASA's Johnson Space Center. See a Saturn V rocket laid out on its side and take the tram to the historic Mission Control.", tip: "Plan a full day, and book the tram tour as soon as you arrive." },
      { name: "The Menil Collection", category: "Museum", area: "Montrose", blurb: "John and Dominique de Menil's collection in a calm, gray building by Renzo Piano, surrounded by bungalows and shaded lawns. Admission is free." },
      { name: "Rothko Chapel", category: "Landmark", area: "Montrose", blurb: "An octagonal room holding fourteen dark canvases by Mark Rothko. Sit for ten minutes and the paintings start to change." },
      { name: "Museum of Fine Arts, Houston", category: "Museum", area: "Museum District", blurb: "One of the largest art museums in the country, spread over three gallery buildings and a sculpture garden by Isamu Noguchi." },
      { name: "Buffalo Bayou Park", category: "Outdoors", area: "Downtown", blurb: "Trails, kayaking and skyline views along the bayou west of downtown. Underground, a 1920s drinking-water reservoir is open for tours.", tip: "Cistern tours are short and sell out. Reserve ahead." },
      { name: "Houston Museum of Natural Science", category: "Museum", area: "Museum District", blurb: "A dinosaur hall that rivals any in the country, a gem vault, a planetarium and a three-story butterfly rainforest." },
      { name: "Hermann Park", category: "Outdoors", area: "Museum District", blurb: "Paddle boats, a Japanese garden, a miniature train and free summer shows at Miller Outdoor Theatre, all next to the museums." },
      { name: "Houston Zoo", category: "Family", area: "Hermann Park", blurb: "Thousands of animals on a well-shaded campus inside Hermann Park. Easy to pair with a museum morning." },
      { name: "Discovery Green", category: "Outdoors", area: "Downtown", blurb: "Twelve acres between the convention center and the skyscrapers, with a small lake, concerts and an ice rink in winter." },
      { name: "Beer Can House", category: "Quirky", area: "Rice Military", blurb: "A retired upholsterer spent nearly two decades covering his house in flattened beer cans. It's Houston folk art at its most cheerful." }
    ]
  },
  {
    slug: "dallas",
    lat: 32.78, lon: -96.80,
    name: "Dallas",
    region: "North Texas",
    tagline: "A downtown arts district, Dealey Plaza and a lake for sunset.",
    intro:
      "Dallas packs its essentials into a small area. The Arts District, Klyde Warren Park and Dealey Plaza are all within a short walk of each other downtown. Save an evening for Deep Ellum or Bishop Arts, and a morning for the gardens on White Rock Lake.",
    places: [
      { name: "The Sixth Floor Museum at Dealey Plaza", category: "Museum", area: "West End", blurb: "In the former Texas School Book Depository, the museum walks through President Kennedy's life, death and legacy. The window corner is preserved as it was in 1963.", tip: "Book a timed ticket online. Allow about two hours." },
      { name: "Dallas Arboretum and Botanical Garden", category: "Outdoors", area: "White Rock Lake", blurb: "Sixty-six acres of gardens on the east shore of White Rock Lake. Spring brings hundreds of thousands of tulips; fall brings a famous pumpkin village." },
      { name: "Dallas Museum of Art", category: "Museum", area: "Arts District", blurb: "A broad collection spanning roughly five thousand years, with free general admission, at the heart of one of the largest arts districts in the country." },
      { name: "Nasher Sculpture Center", category: "Museum", area: "Arts District", blurb: "A Renzo Piano building and walled garden filled with modern sculpture, from Rodin to Richard Serra. One of the calmest places downtown." },
      { name: "Klyde Warren Park", category: "Outdoors", area: "Arts District", blurb: "A five-acre park built on a deck over a freeway, joining downtown to Uptown. Food trucks line the edge at lunch." },
      { name: "Deep Ellum", category: "Neighborhood", area: "East of Downtown", blurb: "Blues players like Blind Lemon Jefferson worked these streets in the 1920s. Today it's murals, music venues and late nights." },
      { name: "Bishop Arts District", category: "Neighborhood", area: "Oak Cliff", blurb: "A few walkable blocks of independent shops, galleries and some of the city's best restaurants, across the river in Oak Cliff." },
      { name: "Perot Museum of Nature and Science", category: "Family", area: "Victory Park", blurb: "Five floors of hands-on science inside a stone-clad cube, with an outdoor escalator that gives a view of downtown on the way up." },
      { name: "White Rock Lake", category: "Outdoors", area: "East Dallas", blurb: "A nine-mile loop around the water for running, cycling and sunset-watching, minutes from downtown." },
      { name: "Reunion Tower", category: "Landmark", area: "Downtown", blurb: "The lit-up sphere on the skyline. Ride up for a 360-degree view that makes the city's layout make sense." }
    ]
  },
  {
    slug: "fort-worth",
    lat: 32.75, lon: -97.33, labelSide: "left",
    name: "Fort Worth",
    region: "North Texas",
    tagline: "Longhorns on Exchange Avenue and three great museums.",
    intro:
      "Fort Worth leans into its cattle-town past without being stuck in it. In the morning, see some of the finest museum architecture in the country in the Cultural District. In the afternoon, watch longhorns walk down the street in the Stockyards.",
    places: [
      { name: "Kimbell Art Museum", category: "Museum", area: "Cultural District", blurb: "Louis Kahn's vaulted galleries, lit by silver daylight, are reason enough to come. The collection, from Michelangelo to Matisse, is small and superb.", tip: "The permanent collection is free; special exhibitions are ticketed." },
      { name: "Fort Worth Stockyards", category: "Landmark", area: "Stockyards", blurb: "The old livestock exchange, now a district of saloons, western wear and rodeos. A small herd of longhorns walks down Exchange Avenue twice a day.", tip: "The cattle drives usually run at 11:30 a.m. and 4 p.m." },
      { name: "Modern Art Museum of Fort Worth", category: "Museum", area: "Cultural District", blurb: "Tadao Ando's concrete-and-glass pavilions sit on a reflecting pond, across the lawn from the Kimbell. Postwar and contemporary art inside." },
      { name: "Amon Carter Museum of American Art", category: "Museum", area: "Cultural District", blurb: "A strong collection of American art, from Remington and Russell to Georgia O'Keeffe, with free admission." },
      { name: "Fort Worth Water Gardens", category: "Outdoors", area: "Downtown", blurb: "Philip Johnson's concrete terraces of pools and falling water, including one you can walk down into. Striking, and cool on a hot day." },
      { name: "Fort Worth Botanic Garden", category: "Outdoors", area: "Cultural District", blurb: "Opened in 1934, it's the oldest botanic garden in Texas. The Japanese Garden, with its koi and stone paths, is the highlight." },
      { name: "Billy Bob's Texas", category: "Music", area: "Stockyards", blurb: "A honky-tonk the size of a city block, with live country acts, line dancing and live bull riding on weekends." },
      { name: "National Cowgirl Museum and Hall of Fame", category: "Museum", area: "Cultural District", blurb: "Honors women who shaped the American West, from ranchers and rodeo riders to artists and writers." },
      { name: "Sundance Square", category: "Neighborhood", area: "Downtown", blurb: "A downtown plaza ringed by restored brick buildings, restaurants and a large Chisholm Trail mural. Lively at night." },
      { name: "Fort Worth Zoo", category: "Family", area: "Forest Park", blurb: "Founded in 1909, the oldest zoo in Texas, and regularly ranked among the best in the country." }
    ]
  },
  {
    slug: "el-paso",
    lat: 31.76, lon: -106.49,
    name: "El Paso",
    region: "Far West Texas",
    tagline: "Desert mountains, borderland food and the oldest missions in Texas.",
    intro:
      "El Paso sits closer to San Diego than to Houston, and it feels like nowhere else in the state. The Franklin Mountains split the city in two, Juárez spreads out across the river, and the Mission Trail follows the Rio Grande south through some of the oldest communities in Texas.",
    places: [
      { name: "Franklin Mountains State Park", category: "Outdoors", area: "Northwest El Paso", blurb: "About 26,000 acres of Chihuahuan Desert mountains entirely inside the city limits, with trails for every level.", tip: "Start hikes early. There's little shade, and summer afternoons are brutal." },
      { name: "Scenic Drive Overlook", category: "Landmark", area: "Rim Area", blurb: "A road cut into the side of the mountain with a view across El Paso and Ciudad Juárez. At night, the two cities look like one." },
      { name: "Hueco Tanks State Park & Historic Site", category: "Outdoors", area: "East of El Paso", blurb: "Rock formations known worldwide for bouldering, and home to thousands of years of pictographs, including hundreds of painted masks.", tip: "Daily visitor numbers are capped. Reserve your entry ahead with Texas State Parks." },
      { name: "Mission Trail", category: "Landmark", area: "Lower Valley", blurb: "Ysleta Mission, Socorro Mission and the San Elizario Presidio Chapel, all a short drive apart. Ysleta traces back to 1680, making it among the oldest missions in Texas." },
      { name: "Chamizal National Memorial", category: "Landmark", area: "South Central", blurb: "A National Park Service site marking the peaceful settlement of a century-old border dispute. Free outdoor concerts run in summer." },
      { name: "L&J Cafe", category: "Food", area: "Central El Paso", blurb: "Family-run since 1927, next to Concordia Cemetery, and as good a place as any to learn what El Paso does with green chile." },
      { name: "El Paso Museum of Art", category: "Museum", area: "Downtown", blurb: "European, American and Mexican art in a free downtown museum, a short walk from San Jacinto Plaza." },
      { name: "Plaza Theatre", category: "Landmark", area: "Downtown", blurb: "A 1930 Spanish Colonial movie palace with a ceiling painted like a night sky. Restored, and now home to touring shows and concerts." },
      { name: "El Paso Holocaust Museum", category: "Museum", area: "Downtown", blurb: "A free museum devoted to Holocaust history and remembrance. Small, thoughtful and moving." },
      { name: "San Jacinto Plaza", category: "Outdoors", area: "Downtown", blurb: "The center of downtown since the 1880s. The alligator sculpture remembers the real alligators that lived in its pond for decades." }
    ]
  },
  {
    slug: "corpus-christi",
    lat: 27.8, lon: -97.4,
    name: "Corpus Christi",
    region: "Coastal Bend",
    tagline: "A bayfront city on the doorstep of the wildest beach in Texas.",
    intro:
      "Corpus Christi is a working port with a beach town's pace. The bayfront seawall runs right through downtown, a World War II aircraft carrier sits across the harbor, and just south of the city begins Padre Island, the longest stretch of undeveloped barrier island in the world.",
    places: [
      { name: "Padre Island National Seashore", category: "Outdoors", area: "Padre Island", blurb: "About seventy miles of protected beach and dunes, with no hotels in sight. In summer, rangers release Kemp's ridley sea turtle hatchlings into the surf.", tip: "Past the first few miles of South Beach, you'll need a four-wheel-drive vehicle." },
      { name: "USS Lexington Museum", category: "Museum", area: "North Beach", blurb: "The World War II carrier known as the Blue Ghost, now a floating museum with aircraft on the flight deck and five decks to explore." },
      { name: "Texas State Aquarium", category: "Family", area: "North Beach", blurb: "Focused on the Gulf and the Caribbean, with dolphins, sharks and a wildlife rescue center that treats injured sea turtles and birds." },
      { name: "Corpus Christi Bayfront", category: "Outdoors", area: "Downtown", blurb: "A seawall designed by Gutzon Borglum, the sculptor of Mount Rushmore, with wide stairs down to the water and a path along Shoreline Boulevard." },
      { name: "Mustang Island State Park", category: "Outdoors", area: "Mustang Island", blurb: "Five miles of Gulf beach for swimming, camping and fishing, plus a paddling trail through the bay side." },
      { name: "Art Museum of South Texas", category: "Museum", area: "Downtown", blurb: "A white Philip Johnson building on the water, with a later wing by Ricardo Legorreta and changing exhibitions inside." },
      { name: "Selena Museum", category: "Museum", area: "Westside", blurb: "Run by the Quintanilla family at their recording studio, with the stage costumes and awards of the Queen of Tejano music.", tip: "Hours are limited. Check before you go." },
      { name: "Corpus Christi Museum of Science and History", category: "Museum", area: "Downtown", blurb: "Its best gallery holds artifacts from Spanish ships wrecked off Padre Island in 1554." },
      { name: "South Texas Botanical Gardens & Nature Center", category: "Outdoors", area: "Southside", blurb: "Orchid house, butterfly garden and boardwalk trails along a wetland that draws migrating birds in spring and fall." },
      { name: "Whataburger by the Bay", category: "Food", area: "Downtown", blurb: "Whataburger started in Corpus Christi in 1950. The bayfront flagship is the place to order one where it all began." }
    ]
  },
  {
    slug: "galveston",
    lat: 29.3, lon: -94.8, labelSide: "left",
    name: "Galveston",
    region: "Gulf Coast",
    tagline: "Victorian mansions, a seawall built after the Great Storm and the Gulf.",
    intro:
      "Before the 1900 hurricane, Galveston was among the richest cities in Texas, and its Victorian streets still show it. The island rebuilt behind a seawall that now doubles as its main promenade. Spend the morning on the Strand and the afternoon on the beach.",
    places: [
      { name: "The Strand Historic District", category: "Neighborhood", area: "Downtown", blurb: "Iron-front Victorian buildings from the days when this street was the banking center of Texas, now full of shops, candy stores and cafés.", tip: "Dickens on the Strand fills the district with a Victorian holiday festival in early December." },
      { name: "Bishop's Palace", category: "Landmark", area: "East End", blurb: "An 1890s stone mansion by architect Nicholas Clayton, ornate from the stained glass to the carved staircase. It came through the 1900 Storm intact." },
      { name: "Galveston Seawall", category: "Landmark", area: "Seawall Boulevard", blurb: "Built after the 1900 Storm, the deadliest natural disaster in U.S. history. Ten miles long, with a sidewalk made for biking at sunrise." },
      { name: "Texas Seaport Museum", category: "Museum", area: "Harborside", blurb: "Home of the Elissa, an 1877 iron barque that still sails, and a database of immigrants who arrived through the port." },
      { name: "Moody Gardens", category: "Family", area: "West of Downtown", blurb: "Three glass pyramids holding a rainforest, an aquarium and a science center, with a beach and paddlewheel boat outside." },
      { name: "Galveston Island Historic Pleasure Pier", category: "Family", area: "Seawall Boulevard", blurb: "A boardwalk-style amusement pier over the Gulf, with a roller coaster and rides that hang out above the waves." },
      { name: "Galveston Island State Park", category: "Outdoors", area: "West End", blurb: "Beach on one side, bay marshes on the other, with kayak trails and some of the best birding on the coast." },
      { name: "Moody Mansion", category: "Landmark", area: "Downtown", blurb: "A 1895 Romanesque mansion, home to one of Galveston's most powerful families, with original furnishings throughout." },
      { name: "Ocean Star Offshore Drilling Rig & Museum", category: "Museum", area: "Harborside", blurb: "A retired drilling rig docked in the harbor, showing how offshore oil and gas production works, from the rig floor up." },
      { name: "Gaido's", category: "Food", area: "Seawall Boulevard", blurb: "A family-run seafood restaurant on the seawall since 1911. Order the Gulf fish of the day." }
    ]
  },
  {
    slug: "fredericksburg",
    lat: 30.27, lon: -98.87, labelSide: "left",
    name: "Fredericksburg",
    region: "Hill Country",
    tagline: "German limestone, granite domes and wineries along Highway 290.",
    intro:
      "German settlers founded Fredericksburg in 1846, and their limestone houses still line the streets. Today it's the base for exploring the Hill Country: climb a granite dome in the morning, tour a presidential ranch after lunch, and end the day at a winery.",
    places: [
      { name: "Enchanted Rock State Natural Area", category: "Outdoors", area: "North of Town", blurb: "A pink granite dome rising about 425 feet over the Hill Country. The climb to the top takes about half an hour, and the view is worth it.", tip: "Day passes sell out, especially on weekends. Reserve ahead with Texas State Parks." },
      { name: "National Museum of the Pacific War", category: "Museum", area: "Main Street", blurb: "In Admiral Chester Nimitz's hometown, a museum that covers the war in the Pacific in remarkable depth." },
      { name: "Main Street", category: "Neighborhood", area: "Downtown", blurb: "Two-story limestone storefronts, biergartens and shops, stretching for blocks through the center of town." },
      { name: "Lyndon B. Johnson National Historical Park", category: "Landmark", area: "Stonewall", blurb: "LBJ's ranch, the \"Texas White House,\" about fifteen miles east of town, with his airstrip, home and family cemetery.", tip: "Get the free driving permit at the visitor center in LBJ State Park." },
      { name: "Luckenbach, Texas", category: "Music", area: "Southeast of Town", blurb: "A general store, a dance hall and live music under the oaks. The town Waylon Jennings and Willie Nelson sang about is still just that." },
      { name: "Wildseed Farms", category: "Outdoors", area: "Highway 290", blurb: "Acres of wildflower fields east of town, with seeds to take home. Best in spring, when the bluebonnets and poppies bloom." },
      { name: "Old Tunnel State Park", category: "Nature", area: "South of Town", blurb: "An abandoned railroad tunnel where up to three million bats spend the warm months, pouring out at dusk.", tip: "Bats are present roughly May through October. Lower-area viewing needs a reservation." },
      { name: "Pioneer Museum", category: "Museum", area: "Main Street", blurb: "Original 19th-century homes, a smokehouse and a one-room school on the town's first settlement site." },
      { name: "Marktplatz and Vereins Kirche", category: "Landmark", area: "Downtown", blurb: "The town square, anchored by a replica of the octagonal 1847 church that served as the community's first public building." },
      { name: "Wine Road 290", category: "Food", area: "Highway 290", blurb: "Dozens of wineries and tasting rooms between Fredericksburg and Johnson City. Pick two or three and book a driver." }
    ]
  },
  {
    slug: "waco",
    lat: 31.55, lon: -97.15,
    name: "Waco",
    region: "Central Texas",
    tagline: "Mammoths, the birthplace of Dr Pepper and a bridge over the Brazos.",
    intro:
      "Waco sits on the Brazos halfway between Dallas and Austin, and it has more to show than most people expect. There are Ice Age fossils still in the ground where they were found, the town that invented Dr Pepper, and the official home of the Texas Rangers.",
    places: [
      { name: "Magnolia Market at the Silos", category: "Shopping", area: "Downtown", blurb: "Chip and Joanna Gaines turned a lot with two rusting grain silos into a market, bakery and lawn that draws visitors from around the country." },
      { name: "Waco Mammoth National Monument", category: "Landmark", area: "North Waco", blurb: "A nursery herd of Columbian mammoths, still lying where they died tens of thousands of years ago, under a climate-controlled dig shelter.", tip: "The dig shelter is seen on guided tours that run through the day." },
      { name: "Dr Pepper Museum", category: "Museum", area: "Downtown", blurb: "Dr Pepper was created in a Waco drugstore in 1885. The museum fills the 1906 bottling plant, with a soda fountain at the end." },
      { name: "Texas Ranger Hall of Fame and Museum", category: "Museum", area: "Downtown", blurb: "The official museum of the Texas Rangers, with two centuries of history, weapons and stories from the state's oldest law enforcement agency." },
      { name: "Waco Suspension Bridge", category: "Landmark", area: "Downtown", blurb: "Opened in 1870 for cattle drives crossing the Brazos. It's now a pedestrian bridge with longhorn statues at one end." },
      { name: "Cameron Park", category: "Outdoors", area: "North Waco", blurb: "Over 400 acres of trails and limestone cliffs along the Brazos and Bosque rivers, right next to downtown." },
      { name: "Cameron Park Zoo", category: "Family", area: "North Waco", blurb: "A natural-habitat zoo with a large Brazos River country exhibit. Small enough to see in a morning." },
      { name: "Mayborn Museum", category: "Museum", area: "Baylor University", blurb: "Baylor's natural and cultural history museum, with a historic village and hands-on rooms that kids love." },
      { name: "Armstrong Browning Library", category: "Landmark", area: "Baylor University", blurb: "The world's largest collection of Robert and Elizabeth Barrett Browning materials, in a building lined with stained glass windows." },
      { name: "Hippodrome Theatre", category: "Music", area: "Downtown", blurb: "A restored 1914 theater showing films and hosting concerts, with dinner served in the seats." }
    ]
  },
  {
    slug: "lubbock",
    lat: 33.58, lon: -101.86,
    name: "Lubbock",
    region: "South Plains",
    tagline: "Buddy Holly, Texas Tech and twelve thousand years on the Llano Estacado.",
    intro:
      "Lubbock sits on the flat, open Llano Estacado, and its sky is part of the attraction. Buddy Holly grew up here, Texas Tech fills the town with energy, and the museums tell the story of the ranchers, windmills and early people who made the plains livable.",
    places: [
      { name: "Buddy Holly Center", category: "Museum", area: "Depot District", blurb: "Holly's guitars, his famous glasses and a gallery of West Texas music. Outside, a plaza with his statue honors the Walk of Fame." },
      { name: "National Ranching Heritage Center", category: "Museum", area: "Texas Tech", blurb: "Dozens of original ranch buildings, from dugouts to a two-story stone house, moved here to show how ranching life changed over two centuries." },
      { name: "Lubbock Lake Landmark", category: "Outdoors", area: "North Lubbock", blurb: "An archaeological preserve with evidence of about twelve thousand years of people living along a now-dry draw, with walking trails through the dig sites." },
      { name: "American Windmill Museum", category: "Museum", area: "East Lubbock", blurb: "More than a hundred windmills, inside and out, telling the story of how wind pumps opened the plains to settlement." },
      { name: "Museum of Texas Tech University", category: "Museum", area: "Texas Tech", blurb: "Art, natural history and a planetarium under one roof on the Texas Tech campus." },
      { name: "Silent Wings Museum", category: "Museum", area: "North Lubbock", blurb: "Tells the little-known story of World War II glider pilots, many of whom trained near Lubbock." },
      { name: "Cactus Theater", category: "Music", area: "Depot District", blurb: "A 1938 movie house restored as an intimate venue for country, rock and the occasional Buddy Holly tribute." },
      { name: "Depot District", category: "Neighborhood", area: "Depot District", blurb: "Lubbock's night out, around the old rail depot: bars, music venues, a winery tasting room and a brewery." },
      { name: "Prairie Dog Town", category: "Nature", area: "Mackenzie Park", blurb: "A free prairie dog colony in Mackenzie Park, protected since the 1930s." },
      { name: "Llano Estacado Winery", category: "Food", area: "South Lubbock", blurb: "Opened in 1976, one of the oldest modern wineries in Texas, and proof that the High Plains grows serious grapes." }
    ]
  },
  {
    slug: "amarillo",
    lat: 35.22, lon: -101.83,
    name: "Amarillo",
    region: "Panhandle",
    tagline: "Route 66, buried Cadillacs and a canyon you don't see coming.",
    intro:
      "Amarillo grew up as a cattle and railroad town on the open Panhandle plains, and Route 66 made it a stop for travelers. The biggest surprise is just south of town, where the flat land drops away into Palo Duro Canyon.",
    places: [
      { name: "Palo Duro Canyon State Park", category: "Outdoors", area: "Canyon", blurb: "The second-largest canyon in the country, about thirty minutes south. Red and yellow rock walls, hoodoos and miles of trails.", tip: "Summer afternoons are very hot on the trail. Start early and carry plenty of water." },
      { name: "Cadillac Ranch", category: "Quirky", area: "West of Amarillo", blurb: "Ten Cadillacs buried nose-down in a wheat field in 1974, covered in layers of spray paint from passing visitors." },
      { name: "Panhandle-Plains Historical Museum", category: "Museum", area: "Canyon", blurb: "The largest history museum in Texas, on the West Texas A&M campus, covering dinosaurs, oil, art and pioneer life." },
      { name: "Route 66 Historic District", category: "Neighborhood", area: "Sixth Avenue", blurb: "The stretch of Sixth Avenue that carried Route 66 through town, now lined with antique shops, bars and restaurants." },
      { name: "Big Texan Steak Ranch", category: "Food", area: "Interstate 40", blurb: "Home of the 72-ounce steak challenge since 1960. Finish it, with all the sides, in an hour and the meal is free." },
      { name: "American Quarter Horse Hall of Fame & Museum", category: "Museum", area: "Interstate 40", blurb: "The story of the American Quarter Horse, from ranch work to racing, at the breed's national headquarters." },
      { name: "TEXAS Outdoor Musical", category: "Music", area: "Palo Duro Canyon", blurb: "A summer musical about Panhandle history, staged in an amphitheater against the canyon walls." },
      { name: "Amarillo Botanical Gardens", category: "Outdoors", area: "Medical Center", blurb: "Gardens designed for the High Plains, with a tropical conservatory for cold days." },
      { name: "Don Harrington Discovery Center", category: "Family", area: "Medical Center", blurb: "A hands-on science center with a planetarium. Outside stands the Helium Monument, a nod to Amarillo's history as the Helium Capital of the World." },
      { name: "Wonderland Park", category: "Family", area: "North Amarillo", blurb: "A family-owned amusement park open since 1951, known for the Texas Tornado, a double-loop roller coaster." }
    ]
  }
];
