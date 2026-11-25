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
  }
];
