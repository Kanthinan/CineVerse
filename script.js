const FALLBACK_POSTER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
      <rect width="400" height="600" fill="#141414"/>
      <rect x="20" y="20" width="360" height="560" fill="none" stroke="#e50914" stroke-width="3"/>
      <text x="200" y="300" text-anchor="middle" fill="#e50914" font-family="Arial, sans-serif" font-size="28" font-weight="700">CineVerse</text>
      <text x="200" y="338" text-anchor="middle" fill="#b3b3b3" font-family="Arial, sans-serif" font-size="16">Poster unavailable</text>
    </svg>
  `);

const POSTER = "https://image.tmdb.org/t/p/w500/";
const BACKDROP = "https://image.tmdb.org/t/p/w1280/";
const FEATURED_ID = "dune-2021";
const STORAGE_KEY = "cineverse-favorites";
const GENRE_ORDER = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War"
];

const ROW_DEFS = [
  { id: "trending", title: "Trending Now" },
  { id: "popular", title: "Popular Movies" },
  { id: "korean", title: "Korean Movies" },
  { id: "thai", title: "Thai Movies" },
  { id: "animation", title: "Animation" },
  { id: "action", title: "Action & Adventure" },
  { id: "romance", title: "Romance" },
  { id: "horror", title: "Horror" },
  { id: "scifi", title: "Sci-Fi" },
  { id: "recent", title: "Recently Added" },
  { id: "originals", title: "CineVerse Originals" }
];

const CATALOG = [
  ["the-godfather", "The Godfather", 1972, ["Crime", "Drama"], 9.2, "United States", "movie", "3bhkrj58Vtu7enYsRolD1S6VkY.jpg", "tmU7GeKVybMWFButWEGl2M4SshK.jpg", "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.", ["trending", "popular"]],
  ["the-dark-knight", "The Dark Knight", 2008, ["Action", "Crime", "Drama"], 9.0, "United States", "movie", "qJ2tW6WMUDux911r6m7haRef0WH.jpg", "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", "Batman faces the Joker, a criminal who plunges Gotham into chaos and tests the city's heroes.", ["trending", "popular"]],
  ["inception", "Inception", 2010, ["Action", "Sci-Fi", "Thriller"], 8.8, "United States", "movie", "oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", "s3TBrXY1TsL1tlxHDvZ48wbDO9.jpg", "A thief who steals secrets through shared dreaming is given a chance at redemption if he can plant an idea.", ["trending", "popular"]],
  ["pulp-fiction", "Pulp Fiction", 1994, ["Crime", "Drama"], 8.9, "United States", "movie", "d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", "suaEOtk1i3sbtTYMjuCWThR5bP.jpg", "Intersecting stories of crime, chance, and dark humor unfold across Los Angeles.", ["popular"]],
  ["forrest-gump", "Forrest Gump", 1994, ["Drama", "Romance"], 8.8, "United States", "movie", "arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", "7c9UVTcA25W1QxAQqei1z5kAsy.jpg", "A kind-hearted man from Alabama unwittingly influences decades of American history.", ["popular"]],
  ["the-matrix", "The Matrix", 1999, ["Action", "Sci-Fi"], 8.7, "United States", "movie", "f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", "l4QHerTSbMI7qgvasqxPXpj2R2M.jpg", "A computer hacker learns that reality is a simulation and joins a rebellion against its machines.", ["trending", "popular"]],
  ["interstellar", "Interstellar", 2014, ["Adventure", "Drama", "Sci-Fi"], 8.7, "United States", "movie", "gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", "xJHokMbljvjADYdit5fK5VQsXE.jpg", "Explorers travel through a wormhole in search of a new home for humanity.", ["trending", "popular"]],
  ["gladiator", "Gladiator", 2000, ["Action", "Adventure", "Drama"], 8.5, "United States", "movie", "ty8TGRcvJ8pKuz3s9SC-kO5ODfd.jpg", "hND7-BFmT1eSQTtN8gbg6pXzHKm.jpg", "A betrayed Roman general fights as a gladiator to avenge his family and challenge an emperor.", ["popular"]],
  ["titanic", "Titanic", 1997, ["Drama", "Romance"], 7.9, "United States", "movie", "9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", "6VmFqApQf8ofB3Fi6v7vUscVu0.jpg", "A young aristocrat and a drifter fall in love aboard the doomed RMS Titanic.", ["popular"]],
  ["jurassic-park", "Jurassic Park", 1993, ["Adventure", "Sci-Fi", "Thriller"], 8.2, "United States", "movie", "oU7Oq2kFAAlGqbU3PlaV6ECaKOC.jpg", "8BTsBYMETykhK0L5U22qCHyn2YS.jpg", "Dinosaurs cloned for a theme park escape when a security system fails.", ["popular"]],
  ["shawshank", "The Shawshank Redemption", 1994, ["Drama"], 9.3, "United States", "movie", "q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", "kXfqcdQKsTv4Hc7DhS1Jq7WJq.jpg", "A banker sentenced for a crime he did not commit forms a lasting friendship in prison.", ["popular"]],
  ["fight-club", "Fight Club", 1999, ["Drama"], 8.8, "United States", "movie", "pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", "hZkgoQYus5vegHoak1T0qwRsW.jpg", "An insomniac office worker and a soap maker start an underground fight club that grows beyond them.", ["popular"]],
  ["goodfellas", "Goodfellas", 1990, ["Crime", "Drama"], 8.7, "United States", "movie", "aKuFiU82s5ISSqy3zn1T0FtQwyg.jpg", "sw7MordWTyWXMb2dtQkkHEHUF.jpg", "Henry Hill rises through the ranks of a New York crime family over three decades.", ["popular"]],
  ["lotr-fellowship", "The Lord of the Rings: The Fellowship of the Ring", 2001, ["Adventure", "Fantasy"], 8.8, "New Zealand", "movie", "6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", "x2RS3uTcsJJ9IfjNdwTPTAuNiLG.jpg", "A hobbit sets out from the Shire to destroy a powerful ring before it consumes Middle-earth.", ["trending", "popular"]],
  ["lotr-towers", "The Lord of the Rings: The Two Towers", 2002, ["Adventure", "Fantasy"], 8.8, "New Zealand", "movie", "5VTN0pOf8SUiHDqXqN4E9TGGlex.jpg", "zNNjP8bJQy8pOa1QzbHwJbqz.jpg", "The Fellowship is broken as war gathers at Helm's Deep and Frodo continues toward Mordor.", ["popular"]],
  ["lotr-return", "The Lord of the Rings: The Return of the King", 2003, ["Adventure", "Fantasy"], 9.0, "New Zealand", "movie", "rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", "2u7zbn8EudG6kLlBzCYviW4Di.jpg", "The final battle for Middle-earth arrives as the ring-bearer reaches Mount Doom.", ["popular"]],
  ["star-wars", "Star Wars: A New Hope", 1977, ["Adventure", "Sci-Fi"], 8.6, "United States", "movie", "6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg", "4iJfYYoQzZcONB9h6y0W1T1MkJA.jpg", "A farm boy joins rebels, a smuggler, and a Jedi to strike at a galactic empire.", ["popular"]],
  ["endgame", "Avengers: Endgame", 2019, ["Action", "Adventure", "Sci-Fi"], 8.4, "United States", "movie", "or06FN3Dka5tukK1e9sl16pB3iy.jpg", "7RyHsO4yDXtBv1zUU3mTpHeQ0dP.jpg", "The remaining Avengers assemble one last time to undo a universe-altering snap.", ["trending"]],
  ["spider-verse", "Spider-Man: Into the Spider-Verse", 2018, ["Animation", "Action", "Adventure"], 8.4, "United States", "movie", "iiZZdoQBEYBv6id8su7ImLNOFNy.jpg", "7d6EY00g1c39SGZfXtynufM4uNc.jpg", "Brooklyn teen Miles Morales becomes Spider-Man and meets heroes from other dimensions.", ["trending"]],
  ["fury-road", "Mad Max: Fury Road", 2015, ["Action", "Adventure"], 8.1, "Australia", "movie", "hA2ple9q4qnwxp3hKVNhroipsji.jpg", "tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg", "In a desert wasteland, Max helps Furiosa flee a tyrant with a war rig full of captives.", ["popular"]],
  ["get-out", "Get Out", 2017, ["Horror", "Mystery", "Thriller"], 7.8, "United States", "movie", "tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg", "1p5zU5n58OdrLCLexv1UbWSBSCy.jpg", "A young Black man meets his white girlfriend's family and uncovers a terrifying secret.", ["trending"]],
  ["parasite", "Parasite", 2019, ["Drama", "Thriller"], 8.5, "South Korea", "movie", "7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", "TU9NTiuw1kOYFZjYjW4GwONLzZ.jpg", "A struggling family infiltrates a wealthy household, with consequences neither side expects.", ["trending", "popular"]],
  ["la-la-land", "La La Land", 2016, ["Comedy", "Drama", "Romance"], 8.0, "United States", "movie", "uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", "qJeUAbsYiE0WftMx3qMhF8sS0Jm.jpg", "An actress and a jazz pianist chase their dreams in Los Angeles while falling in love.", ["popular"]],
  ["whiplash", "Whiplash", 2014, ["Drama"], 8.5, "United States", "movie", "7fn624j5lj3xTme2SgiLCeuedmO.jpg", "6uIsdW0JxQ7yQQjfEZ7h2lTmPyc.jpg", "A young drummer enrolls in a cutthroat music conservatory under an abusive conductor.", ["popular"]],
  ["joker-2019", "Joker", 2019, ["Crime", "Drama", "Thriller"], 8.4, "United States", "movie", "udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "A failed comedian in Gotham spirals into violence and a new public identity.", ["trending"]],
  ["dune-2021", "Dune", 2021, ["Adventure", "Sci-Fi"], 8.0, "United States", "movie", "d5NXSklXo0qyIYkgV94XAgMIckC.jpg", "jYEW5xZkJk2OVlKVwW6VdD5q2o.jpg", "Paul Atreides travels to the desert planet Arrakis, where political intrigue and prophecy collide.", ["trending", "popular", "recent"]],
  ["no-country", "No Country for Old Men", 2007, ["Crime", "Drama", "Thriller"], 8.2, "United States", "movie", "6d5XOq3W9qQhfFf1wNqkOXvT5pW.jpg", "bjDIp0b5TQRx5M0R02eAlkMmMPk.jpg", "A hunter, a hit man, and a sheriff cross paths after a drug deal gone wrong in Texas.", ["popular"]],
  ["silence-lambs", "The Silence of the Lambs", 1991, ["Crime", "Thriller"], 8.6, "United States", "movie", "rplLJ2hPcOQmkFhTqUteOkBFteOk.jpg", "mfwq2nMBzArzQ7Y9RKEUKbLBAAF.jpg", "An FBI trainee seeks help from a brilliant prisoner to catch another serial killer.", ["popular"]],
  ["saving-private-ryan", "Saving Private Ryan", 1998, ["Drama", "War"], 8.6, "United States", "movie", "uqx37cS8cpHg8U35f9U5ILyKOqF.jpg", "rWnydU6p2xabVhU5GAwy63jRJq.jpg", "A squad of soldiers is sent behind enemy lines after D-Day to find a missing paratrooper.", ["popular"]],
  ["schindlers-list", "Schindler's List", 1993, ["Drama", "History", "War"], 9.0, "United States", "movie", "sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", "cTNYRUTXkSgPmz4Xcs0WXsbBj5L.jpg", "A German industrialist slowly turns his factory into a refuge for Jewish workers during World War II.", ["popular"]],
  ["casablanca", "Casablanca", 1942, ["Drama", "Romance"], 8.5, "United States", "movie", "5K7cOhoqy619O4O5UjKt2rSgevr.jpg", "5lAMMMW1S8Dt3cODpzKtZkk5Fx8.jpg", "In wartime Morocco, a nightclub owner must choose between love and helping a resistance leader escape.", ["popular"]],
  ["psycho", "Psycho", 1960, ["Horror", "Mystery", "Thriller"], 8.5, "United States", "movie", "6oPmcYKkbp20SsS1ZwbJaK6CXl.jpg", "81epnITzJII7FQbfSAh8mdcJ2t.jpg", "A secretary on the run stops at an isolated motel run by a troubled young man.", ["popular"]],
  ["jaws", "Jaws", 1975, ["Adventure", "Thriller"], 8.1, "United States", "movie", "l1yltvzILaZcx2jYvc5sEMkM7eh.jpg", "r8yTd8A5rLdZ2kUho1nNpeYq6u.jpg", "A police chief, a scientist, and a seafarer hunt a great white shark terrorizing a beach town.", ["popular"]],
  ["back-to-the-future", "Back to the Future", 1985, ["Adventure", "Comedy", "Sci-Fi"], 8.5, "United States", "movie", "fNOH9f1aA7XRTzl1sAOx9iF553t.jpg", "fq3wyOs1RHyz2yfzsb4Hrtv6xwt.jpg", "A teenager is accidentally sent thirty years into the past and must repair his own family timeline.", ["popular"]],
  ["lion-king", "The Lion King", 1994, ["Animation", "Adventure", "Family"], 8.5, "United States", "movie", "sKCr78MXSLixwmZ8DyJLrpMsd15.jpg", "wXsQvli6zWqjaipu4ekbbU7KvLd.jpg", "A young lion prince flees his kingdom after tragedy, then returns to reclaim his place.", ["popular"]],
  ["toy-story", "Toy Story", 1995, ["Animation", "Adventure", "Comedy", "Family"], 8.3, "United States", "movie", "uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", "3Rfvhy1Nl61P2gWLYtYqrGHtaEy.jpg", "Toys come to life when people are gone, and a cowboy doll feels threatened by a new spaceman.", ["popular"]],
  ["finding-nemo", "Finding Nemo", 2003, ["Animation", "Adventure", "Family"], 8.2, "United States", "movie", "eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg", "n2vA8w05FAb7OWHeHYohfDrGxFq.jpg", "An anxious clownfish crosses the ocean to find his captured son.", ["popular"]],
  ["up-2009", "Up", 2009, ["Animation", "Adventure", "Comedy", "Family"], 8.3, "United States", "movie", "vpbaStTj8fxFuv5yVv0SFM3x1c.jpg", "h3uqFk7sZR33JnTw8Qqy4N7kX8.jpg", "A widower ties balloons to his house and flies to South America, with a scout accidentally aboard.", ["popular"]],
  ["coco", "Coco", 2017, ["Animation", "Adventure", "Family"], 8.4, "United States", "movie", "gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", "askg3SMvhqHQ8YK4xlkrkyC4AJw.jpg", "A boy chasing music enters the Land of the Dead and uncovers his family's hidden history.", ["trending"]],
  ["grand-budapest", "The Grand Budapest Hotel", 2014, ["Comedy", "Drama"], 8.1, "Germany", "movie", "eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "A legendary concierge and his lobby boy become entangled in a stolen-painting scandal.", ["popular"]],
  ["superbad", "Superbad", 2007, ["Comedy"], 7.6, "United States", "movie", "ek8e8txUyUwd2BNqj6lFEryqRK.jpg", "8f9dnOtpFqWzO6c2TC5js7WZxP.jpg", "Two high-school friends try to enjoy one last party before college pulls them apart.", []],
  ["groundhog-day", "Groundhog Day", 1993, ["Comedy", "Fantasy", "Romance"], 8.0, "United States", "movie", "gCgt1WARPZaXlaTdackGftECOL.jpg", "mzfx54nfDPTUXZOG48u4JLg3HYw.jpg", "A cynical weatherman relives the same February morning until he finally changes.", ["popular"]],
  ["die-hard", "Die Hard", 1988, ["Action", "Thriller"], 8.2, "United States", "movie", "jX9T2N2DjdDfZX4hzMPBqY2FaOY.jpg", "sih4lkh4v5vYsePVuwRQO0Z2.jpg", "An off-duty cop crawls through a skyscraper after terrorists seize a Christmas party.", ["popular"]],
  ["john-wick", "John Wick", 2014, ["Action", "Thriller"], 7.4, "United States", "movie", "fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg", "7TF4p86Z2vW6y5c0iP3qXgYjN.jpg", "A retired hit man returns to the underworld after a home invasion takes what he loves most.", ["trending"]],
  ["fallout", "Mission: Impossible - Fallout", 2018, ["Action", "Adventure", "Thriller"], 7.7, "United States", "movie", "AkJ80i1F09s0KjH4RnLjj7GLfDA.jpg", "6q0cM5zXVu6t9cP2VSbZWYjP3.jpg", "Ethan Hunt and his team race to stop stolen plutonium from reaching a new extremist plot.", ["trending"]],
  ["raiders", "Raiders of the Lost Ark", 1981, ["Action", "Adventure"], 8.4, "United States", "movie", "ceG9VTwVIAviqkLtbAvs7NtqYSQ.jpg", "c7xJZ4bJBm5oCegH9LQN6C0xS.jpg", "Archaeologist Indiana Jones races Nazis to find the Ark of the Covenant.", ["popular"]],
  ["pirates", "Pirates of the Caribbean: The Curse of the Black Pearl", 2003, ["Action", "Adventure", "Fantasy"], 8.0, "United States", "movie", "z8onk3l4swCd4xcfyqYNmRU3cNr.jpg", "8Y43POKjjKDGI9MH89NW0NAzzp8.jpg", "A blacksmith teams with Captain Jack Sparrow to rescue a governor's daughter from cursed pirates.", ["popular"]],
  ["wizard-of-oz", "The Wizard of Oz", 1939, ["Adventure", "Family", "Fantasy"], 8.1, "United States", "movie", "8G443CdP0XTgO1i4lskNNb4u0l.jpg", "5lAMMMW1S8Dt3cODpzKtZkk5Fx8.jpg", "A Kansas girl is swept into a colorful land and follows a yellow road toward home.", ["popular"]],
  ["harry-potter", "Harry Potter and the Sorcerer's Stone", 2001, ["Adventure", "Family", "Fantasy"], 7.6, "United Kingdom", "movie", "wuMc08IPKEatf9rnMN64VTxr1p.jpg", "hziiv14N4JY3U54PigJR1Xi.jpg", "An orphaned boy learns he is a wizard and begins school at Hogwarts.", ["popular"]],
  ["pans-labyrinth", "Pan's Labyrinth", 2006, ["Drama", "Fantasy", "War"], 8.2, "Mexico", "movie", "7fT2sY0j0e2xgF0j2n3k4p5q6r.jpg", "b6bf8VfqnyZramMTseH7wqXooqS.jpg", "In Franco-era Spain, a girl enters a fairy-tale underworld while living with a brutal captain.", ["popular"]],
  ["the-exorcist", "The Exorcist", 1973, ["Horror"], 8.1, "United States", "movie", "4ucLGcXQVSVovDqt6eKdABuCbbZ.jpg", "xBKG2QTkW3LDKf7R1HFyoHUtq5W.jpg", "A mother seeks help when her daughter appears possessed by an unexplained force.", ["popular"]],
  ["quiet-place", "A Quiet Place", 2018, ["Drama", "Horror", "Sci-Fi"], 7.5, "United States", "movie", "nAU74GmpUk7t5iklEp3bufQ64d.jpg", "roYyPiQDQKmIKUEhQ869tmr9o0.jpg", "A family lives in silence to avoid creatures that hunt by sound.", ["trending"]],
  ["the-conjuring", "The Conjuring", 2013, ["Horror", "Mystery", "Thriller"], 7.5, "United States", "movie", "wVYREutTvI2hQg2P2XurZ9jZt9T.jpg", "y5sGbgZDHu0ktDwW0BP4u0oDQj.jpg", "Investigators help a family plagued by a presence in their farmhouse.", []],
  ["se7en", "Se7en", 1995, ["Crime", "Mystery", "Thriller"], 8.6, "United States", "movie", "6yoghtxdzkvyA0eqk0qWv0Bhv3.jpg", "ba4CFvFf4ldX7ZTuhVKqF3pF8.jpg", "Two detectives hunt a killer who stages murders around the seven deadly sins.", ["popular"]],
  ["gone-girl", "Gone Girl", 2014, ["Drama", "Mystery", "Thriller"], 8.1, "United States", "movie", "qymaJhucqufA9pm5sS3s4eYaYb.jpg", "bt8B1mVQdG5UZjP1n8wJ1k2l3m.jpg", "When a woman vanishes, the media and police turn their gaze on her husband.", ["popular"]],
  ["knives-out", "Knives Out", 2019, ["Comedy", "Crime", "Mystery"], 7.9, "United States", "movie", "pThyQovXQrw2m0sve67LUa4kIB.jpg", "4Hz2FPd4wXg.jpg", "A detective gathers a wealthy family after a famous crime novelist is found dead.", ["trending"]],
  ["social-network", "The Social Network", 2010, ["Drama"], 7.8, "United States", "movie", "n0Oow9UZqJyOfQN3UKVk6R8b0sc.jpg", "8Xt1x5vSBjcZ4.jpg", "The founding of a social network sparks lawsuits, rivalries, and a new kind of fame.", []],
  ["moonlight", "Moonlight", 2016, ["Drama"], 7.4, "United States", "movie", "qAvK5b0tqI8Yl4qS9Z5n6o7p8q.jpg", "1P5zU5n58OdrLCLexv1UbWSBSCy.jpg", "A young man in Miami grows through childhood, adolescence, and adulthood while searching for identity.", []],
  ["12-years", "12 Years a Slave", 2013, ["Drama", "History"], 8.1, "United States", "movie", "kN4SWgUQs0x3PiO9gzN1oGqN5.jpg", "sKKF7h9KqF8pOa1QzbHwJbq.jpg", "A free Black man is kidnapped and sold into slavery in the antebellum South.", []],
  ["free-solo", "Free Solo", 2018, ["Documentary", "Adventure"], 8.1, "United States", "movie", "v4QfY9j5cOhoqy619O4O5UjKt0R.jpg", "8BTsBYMETykhK0L5U22qCHyn2YS.jpg", "Climber Alex Honnold prepares to scale El Capitan without ropes.", []],
  ["march-penguins", "March of the Penguins", 2005, ["Documentary", "Family"], 7.5, "France", "movie", "8f9dnOtpFqWzO6c2TC5js7WZxP.jpg", "n2vA8w05FAb7OWHeHYohfDrGxFq.jpg", "Emperor penguins cross Antarctic ice to breed, hatch, and raise their young.", []],
  ["neighbor", "Won't You Be My Neighbor?", 2018, ["Documentary"], 8.3, "United States", "movie", "pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", "askg3SMvhqHQ8YK4xlkrkyC4AJw.jpg", "A portrait of Fred Rogers and the children's program that asked viewers to feel welcome.", []],
  ["sound-of-music", "The Sound of Music", 1965, ["Drama", "Family", "Romance"], 8.1, "United States", "movie", "5K7cOhoqy619O4O5UjKt2rSgevr.jpg", "wXsQvli6zWqjaipu4ekbbU7KvLd.jpg", "A novice governess brings music to a widowed naval officer's household in Austria.", []],
  ["home-alone", "Home Alone", 1990, ["Comedy", "Family"], 7.7, "United States", "movie", "9w8uVOZQBX2oVtcVb9mXEdqXNi.jpg", "3Rfvhy1Nl61P2gWLYtYqrGHtaEy.jpg", "A boy accidentally left at home defends his house from two burglars at Christmas.", ["popular"]],
  ["paddington-2", "Paddington 2", 2017, ["Adventure", "Comedy", "Family"], 7.8, "United Kingdom", "movie", "iiZZdoQBEYBv6id8su7ImLNOFNy.jpg", "7d6EY00g1c39SGZfXtynufM4uNc.jpg", "Paddington is framed for theft and must clear his name while keeping his optimism.", []],
  ["the-notebook", "The Notebook", 2004, ["Drama", "Romance"], 7.8, "United States", "movie", "rNzQyW4b8aMzlKqAIlkJFXA3.jpg", "qJeUAbsYiE0WftMx3qMhF8sS0Jm.jpg", "An elderly man reads a love story that may restore the memories of the woman he visits.", []],
  ["pride-prejudice", "Pride & Prejudice", 2005, ["Drama", "Romance"], 7.8, "United Kingdom", "movie", "s5H1uQna7CyMBuFwaJxez8p5G1.jpg", "bjDIp0b5TQRx5M0R02eAlkMmMPk.jpg", "Elizabeth Bennet and Mr. Darcy clash, then reconsider, amid family pressure and class.", ["popular"]],
  ["before-sunrise", "Before Sunrise", 1995, ["Drama", "Romance"], 8.1, "United States", "movie", "6yoghtxdzkvyA0eqk0qWv0Bhv3.jpg", "suaEOtk1i3sbtTYMjuCWThR5bP.jpg", "Two strangers spend one night walking Vienna and talking as if time might never run out.", ["popular"]],
  ["arrival", "Arrival", 2016, ["Drama", "Mystery", "Sci-Fi"], 7.9, "United States", "movie", "n2vA8w05FAb7OWHeHYohfDrGxFq.jpg", "xJHokMbljvjADYdit5fK5VQsXE.jpg", "A linguist is recruited to communicate with visitors whose language reshapes how time is felt.", ["trending"]],
  ["blade-runner-2049", "Blade Runner 2049", 2017, ["Drama", "Sci-Fi", "Thriller"], 8.0, "United States", "movie", "gajva2L0gZDaR24sd4Z2i8G5.jpg", "s3TBrXY1TsL1tlxHDvZ48wbDO9.jpg", "A replicant officer uncovers a secret that could destabilize what remains of society.", ["trending"]],
  ["alien", "Alien", 1979, ["Horror", "Sci-Fi"], 8.5, "United States", "movie", "vfrQk5IPloGg1v9Rzbh2Eg3VGy.jpg", "AmR3Qz0yuI0r7lI1fLbIzzvm.jpg", "The crew of a commercial starship answers a distress call and brings something lethal aboard.", ["popular"]],
  ["dunkirk", "Dunkirk", 2017, ["Action", "Drama", "War"], 7.8, "United Kingdom", "movie", "ebSnODDg9kuRnEhPxweY6vbAvqg.jpg", "tB2q6jGbY3o0pG3gZmc4PjB9.jpg", "Soldiers, pilots, and civilians converge during the evacuation of Allied troops from France.", []],
  ["1917", "1917", 2019, ["Action", "Drama", "War"], 8.2, "United Kingdom", "movie", "iZf0KyrE25z1sage4SYFLCCrH9.jpg", "7RyHsO4yDXtBv1zUU3mTpHeQ0dP.jpg", "Two British soldiers must cross active battlefields to deliver a message that could save hundreds.", ["trending"]],
  ["full-metal-jacket", "Full Metal Jacket", 1987, ["Drama", "War"], 8.3, "United Kingdom", "movie", "kMTcwmuFMPgjTiOkPbNqk5M.jpg", "rWnydU6p2xabVhU5GAwy63jRJq.jpg", "Marine recruits endure brutal training, then face the chaos of the Vietnam War.", []],
  ["the-departed", "The Departed", 2006, ["Crime", "Drama", "Thriller"], 8.5, "United States", "movie", "nT97ifVT2J1yN0nu3Npxzzu6.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "An undercover cop and a mole in the police close in on each other inside a Boston crime syndicate.", ["popular"]],
  ["heat", "Heat", 1995, ["Action", "Crime", "Drama"], 8.3, "United States", "movie", "umSVjVdbVwtx5ypzPFyPm4wdUM.jpg", "hND7-BFmT1eSQTtN8gbg6pXzHKm.jpg", "A detective and a professional thief recognize themselves in each other as a heist nears.", ["popular"]],
  ["oceans-eleven", "Ocean's Eleven", 2001, ["Crime", "Thriller"], 7.7, "United States", "movie", "v5HZc8Xw4TgrqWUFQYR3l0Laa0.jpg", "8Y43POKjjKDGI9MH89NW0NAzzp8.jpg", "A recently released convict gathers specialists to rob three Las Vegas casinos at once.", []],
  ["the-prestige", "The Prestige", 2006, ["Drama", "Mystery", "Sci-Fi"], 8.5, "United Kingdom", "movie", "5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg", "zNNjP8bJQy8pOa1QzbHwJbqz.jpg", "Rival magicians in London escalate a feud that blurs illusion, science, and obsession.", ["popular"]],
  ["shutter-island", "Shutter Island", 2010, ["Drama", "Mystery", "Thriller"], 8.2, "United States", "movie", "kve20t8dN8O27TZPHlAfNyyjSZ.jpg", "8Xt1x5vSBjcZ4.jpg", "U.S. marshals investigate a disappearance at a fortress-like hospital for the criminally insane.", ["popular"]],
  ["black-panther", "Black Panther", 2018, ["Action", "Adventure", "Sci-Fi"], 7.3, "United States", "movie", "uxzzxijgPIY7slzFvMomPxCFhTM.jpg", "6q0cM5zXVu6t9cP2VSbZWYjP3.jpg", "T'Challa returns to Wakanda to become king and faces a challenger who would weaponize the nation.", ["trending"]],
  ["wonder-woman", "Wonder Woman", 2017, ["Action", "Adventure", "Fantasy"], 7.3, "United States", "movie", "gfJGlDaHuWMGFWVnUBXf8KtqQk.jpg", "7TF4p86Z2vW6y5c0iP3qXgYjN.jpg", "An Amazon warrior leaves her island during World War I and confronts a war that tests her ideals.", []],
  ["top-gun-maverick", "Top Gun: Maverick", 2022, ["Action", "Drama"], 8.2, "United States", "movie", "62HCnUTziyWcpDaBO2i1DX17ljH.jpg", "odJ4hx6g6vQR1wugj5kx9j0qB0.jpg", "A veteran pilot trains a new generation for a mission that forces him to face the past.", ["recent", "trending"]],
  ["eeaao", "Everything Everywhere All at Once", 2022, ["Action", "Adventure", "Comedy", "Sci-Fi"], 7.8, "United States", "movie", "w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", "fIwiFha3WPu5nHkBeMqPHnAdXy.jpg", "A laundromat owner is pulled across universes and asked to save existence while filing taxes.", ["recent", "trending"]],
  ["oppenheimer", "Oppenheimer", 2023, ["Drama", "History"], 8.3, "United States", "movie", "8G443CdP0XTgO1i4lskNNb4u0l.jpg", "rqbCbjB19azG1K9i8sGMmLXw.jpg", "J. Robert Oppenheimer leads the Manhattan Project and later faces the political cost of the bomb.", ["recent", "trending"]],
  ["barbie", "Barbie", 2023, ["Adventure", "Comedy", "Fantasy"], 6.9, "United States", "movie", "iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "Stereotypical Barbie leaves Barbieland for the real world after an existential crisis.", ["recent"]],
  ["the-batman", "The Batman", 2022, ["Action", "Crime", "Mystery"], 7.8, "United States", "movie", "74xTEgs9n4B0bfwb2YXeVK9aVO.jpg", "b6bf8VfqnyZramMTseH7wqXooqS.jpg", "Year-two Batman investigates corruption in Gotham while a killer taunts the city's elite.", ["recent"]],
  ["encanto", "Encanto", 2021, ["Animation", "Comedy", "Family", "Fantasy"], 7.2, "United States", "movie", "4SsR0JuyXJZVloF3K1qM2g3.jpg", "askg3SMvhqHQ8YK4xlkrkyC4AJw.jpg", "In a magical Colombian family, one daughter without a gift tries to save their miracle.", ["recent"]],
  ["soul", "Soul", 2020, ["Animation", "Comedy", "Drama", "Family"], 8.0, "United States", "movie", "hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg", "3Rfvhy1Nl61P2gWLYtYqrGHtaEy.jpg", "A jazz pianist has an out-of-body experience and meets a soul who has not yet found its spark.", []],
  ["inside-out", "Inside Out", 2015, ["Animation", "Adventure", "Comedy", "Family"], 8.1, "United States", "movie", "2H1TmgdfNtsZwzA7XLd1Ef6sUs.jpg", "wXsQvli6zWqjaipu4ekbbU7KvLd.jpg", "Personified emotions inside a girl's mind struggle when her family moves to a new city.", ["popular"]],
  ["oldboy", "Oldboy", 2003, ["Action", "Drama", "Mystery", "Thriller"], 8.4, "South Korea", "movie", "pWDtjs568ZfOTMHKzPUbinoIU4.jpg", "TU9NTiuw1kOYFZjYjW4GwONLzZ.jpg", "A man imprisoned for fifteen years without explanation is released and given days to find his captor.", ["popular"]],
  ["train-to-busan", "Train to Busan", 2016, ["Action", "Horror", "Thriller"], 7.6, "South Korea", "movie", "3H9NA1nWNqK2AlXqYkfC7uwhCg.jpg", "1p5zU5n58OdrLCLexv1UbWSBSCy.jpg", "Passengers on a high-speed train fight to survive when a rapidly spreading outbreak begins.", ["trending"]],
  ["the-handmaiden", "The Handmaiden", 2016, ["Drama", "Romance", "Thriller"], 8.1, "South Korea", "movie", "dNw2pJ0GvJlFBovL8f0hJ20q.jpg", "b6bf8VfqnyZramMTseH7wqXooqS.jpg", "A pickpocket is hired as a maid in a plot to con an heiress, and loyalties begin to shift.", ["popular"]],
  ["memories-of-murder", "Memories of Murder", 2003, ["Crime", "Drama", "Mystery", "Thriller"], 8.1, "South Korea", "movie", "lY3vGzGQsC1282x7qJQk5h2n3.jpg", "sih4lkh4v5vYsePVuwRQO0Z2.jpg", "Rural detectives hunt South Korea's first recorded serial killer as evidence and methods fail them.", ["popular"]],
  ["decision-to-leave", "Decision to Leave", 2022, ["Crime", "Drama", "Mystery", "Romance"], 7.2, "South Korea", "movie", "3bhkrj58Vtu7enYsRolD1S6VkY.jpg", "jYEW5xZkJk2OVlKVwW6VdD5q2o.jpg", "A detective investigating a mountain death becomes entangled with the dead man's widow.", ["recent"]],
  ["burning", "Burning", 2018, ["Drama", "Mystery", "Thriller"], 7.5, "South Korea", "movie", "qJ2tW6WMUDux911r6m7haRef0WH.jpg", "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", "A young man reconnects with a childhood neighbor and grows suspicious of her wealthy new companion.", []],
  ["i-saw-the-devil", "I Saw the Devil", 2010, ["Action", "Thriller", "Horror"], 7.8, "South Korea", "movie", "oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", "s3TBrXY1TsL1tlxHDvZ48wbDO9.jpg", "A secret agent hunts the man who murdered his fiancée, sliding into a cycle of revenge.", []],
  ["the-wailing", "The Wailing", 2016, ["Horror", "Mystery", "Thriller"], 7.4, "South Korea", "movie", "d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", "suaEOtk1i3sbtTYMjuCWThR5bP.jpg", "A policeman in a rural village investigates a string of violent deaths tied to rumors of a stranger.", []],
  ["the-host", "The Host", 2006, ["Action", "Drama", "Horror", "Sci-Fi"], 7.1, "South Korea", "movie", "arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", "7c9UVTcA25W1QxAQqei1z5kAsy.jpg", "A riverside family tries to rescue a daughter taken by a creature born from chemical dumping.", []],
  ["man-from-nowhere", "The Man from Nowhere", 2010, ["Action", "Crime", "Thriller"], 7.7, "South Korea", "movie", "f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", "l4QHerTSbMI7qgvasqxPXpj2R2M.jpg", "A quiet pawnshop owner with a hidden past hunts traffickers who abduct the child next door.", []],
  ["taxi-driver-2017", "A Taxi Driver", 2017, ["Action", "Drama", "History"], 7.6, "South Korea", "movie", "gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", "xJHokMbljvjADYdit5fK5VQsXE.jpg", "A Seoul cab driver drives a foreign journalist toward Gwangju during the 1980 uprising.", []],
  ["spirited-away", "Spirited Away", 2001, ["Animation", "Adventure", "Family", "Fantasy"], 8.6, "Japan", "movie", "39wmItIWsg5sZMyRUHLkWBcvLus.jpg", "m4TUa2ciESluNbPjd51NJ55BQqs.jpg", "A girl whose parents are transformed must work in a spirit bathhouse to find her way home.", ["trending", "popular"]],
  ["totoro", "My Neighbor Totoro", 1988, ["Animation", "Family", "Fantasy"], 8.1, "Japan", "movie", "rtGDOfGzt8gQauM4hN1x5sN7.jpg", "h3uqFk7sZR33JnTw8Qqy4N7kX8.jpg", "Two sisters in the countryside befriend forest spirits while their mother recovers in a hospital.", ["popular"]],
  ["mononoke", "Princess Mononoke", 1997, ["Animation", "Adventure", "Fantasy"], 8.4, "Japan", "movie", "jHWmRcZElsTwbfX2YVUhPumYyT.jpg", "6VmFqApQf8ofB3Fi6v7vUscVu0.jpg", "A cursed prince is drawn into a war between forest gods and an iron-mining settlement.", ["popular"]],
  ["akira", "Akira", 1988, ["Animation", "Action", "Sci-Fi"], 8.0, "Japan", "movie", "5KlRFKKSbyCiyYpEjJ0c7F3qV.jpg", "8BTsBYMETykhK0L5U22qCHyn2YS.jpg", "In neo-Tokyo, a biker gang member's childhood friend develops terrifying psychic power.", ["popular"]],
  ["grave-fireflies", "Grave of the Fireflies", 1988, ["Animation", "Drama", "War"], 8.5, "Japan", "movie", "q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", "kXfqcdQKsTv4Hc7DhS1Jq7WJq.jpg", "A brother and sister struggle to survive in Japan during the final months of World War II.", []],
  ["howls-castle", "Howl's Moving Castle", 2004, ["Animation", "Adventure", "Fantasy", "Romance"], 8.2, "Japan", "movie", "TkTPEBgXqBhrBY4Xj5rZQSg.jpg", "hZkgoQYus5vegHoak1T0qwRsW.jpg", "A young woman cursed with old age seeks help from a wizard who lives in a walking castle.", ["popular"]],
  ["your-name", "Your Name", 2016, ["Animation", "Drama", "Romance", "Fantasy"], 8.4, "Japan", "movie", "q719jXXEzOoYaps6babgKnON0xa.jpg", "6uIsdW0JxQ7yQQjfEZ7h2lTmPyc.jpg", "Two teenagers mysteriously swap bodies and try to meet before a disaster rewrites their town.", ["trending"]],
  ["weathering-with-you", "Weathering with You", 2019, ["Animation", "Drama", "Fantasy", "Romance"], 7.5, "Japan", "movie", "qgrk7r1f8qh4qf0r5p6s7t8u9v.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "A runaway in Tokyo meets a girl who can temporarily stop the rain.", []],
  ["ghost-in-the-shell", "Ghost in the Shell", 1995, ["Animation", "Action", "Crime", "Sci-Fi"], 7.9, "Japan", "movie", "9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", "6VmFqApQf8ofB3Fi6v7vUscVu0.jpg", "A cyborg officer hunts a mysterious hacker in a future where identity can be rewritten.", ["popular"]],
  ["seven-samurai", "Seven Samurai", 1954, ["Action", "Drama"], 8.6, "Japan", "movie", "8OKmBV5BUFx7anZ7TqNKvGrs5.jpg", "2u7zbn8EudG6kLlBzCYviW4Di.jpg", "Villagers hire masterless samurai to defend their harvest from bandits.", ["popular"]],
  ["rashomon", "Rashomon", 1950, ["Crime", "Drama", "Mystery"], 8.2, "Japan", "movie", "6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg", "4iJfYYoQzZcONB9h6y0W1T1MkJA.jpg", "A crime in a grove is told several times, and each account contradicts the last.", []],
  ["shoplifters", "Shoplifters", 2018, ["Crime", "Drama"], 7.9, "Japan", "movie", "or06FN3Dka5tukK1e9sl16pB3iy.jpg", "7RyHsO4yDXtBv1zUU3mTpHeQ0dP.jpg", "A makeshift family surviving on petty theft takes in a neglected child.", []],
  ["ringu", "Ringu", 1998, ["Horror", "Mystery"], 7.2, "Japan", "movie", "iiZZdoQBEYBv6id8su7ImLNOFNy.jpg", "7d6EY00g1c39SGZfXtynufM4uNc.jpg", "A reporter investigates a cursed videotape that kills viewers after seven days.", []],
  ["ong-bak", "Ong-Bak: The Thai Warrior", 2003, ["Action", "Adventure", "Crime"], 7.1, "Thailand", "movie", "hA2ple9q4qnwxp3hKVNhroipsji.jpg", "tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg", "A villager skilled in Muay Thai travels to Bangkok to recover a stolen Buddha head.", ["trending"]],
  ["the-protector", "The Protector", 2005, ["Action", "Crime", "Drama"], 7.0, "Thailand", "movie", "tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg", "1p5zU5n58OdrLCLexv1UbWSBSCy.jpg", "A young man searches the city for his stolen elephant and confronts a criminal network.", []],
  ["shutter-thai", "Shutter", 2004, ["Horror", "Mystery", "Thriller"], 7.0, "Thailand", "movie", "7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", "TU9NTiuw1kOYFZjYjW4GwONLzZ.jpg", "A photographer notices a ghostly figure in his images after a hit-and-run.", ["popular"]],
  ["uncle-boonmee", "Uncle Boonmee Who Can Recall His Past Lives", 2010, ["Drama", "Fantasy"], 6.7, "Thailand", "movie", "uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", "qJeUAbsYiE0WftMx3qMhF8sS0Jm.jpg", "A dying man is visited by spirits and memories as he reflects on earlier lives.", []],
  ["bad-genius", "Bad Genius", 2017, ["Crime", "Drama", "Thriller"], 7.9, "Thailand", "movie", "7fn624j5lj3xTme2SgiLCeuedmO.jpg", "6uIsdW0JxQ7yQQjfEZ7h2lTmPyc.jpg", "Top students turn exam cheating into an international scheme with rising stakes.", ["trending"]],
  ["pee-mak", "Pee Mak", 2013, ["Comedy", "Horror", "Romance"], 7.5, "Thailand", "movie", "udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "A soldier returns to his pregnant wife while friends insist she has been dead for months.", ["popular"]],
  ["hunger-2023", "Hunger", 2023, ["Drama", "Thriller"], 7.0, "Thailand", "movie", "d5NXSklXo0qyIYkgV94XAgMIckC.jpg", "jYEW5xZkJk2OVlKVwW6VdD5q2o.jpg", "A street-food cook enters an elite kitchen where ambition is plated as cruelty.", ["recent"]],
  ["the-medium", "The Medium", 2021, ["Horror", "Mystery"], 6.6, "Thailand", "movie", "ty8TGRcvJ8pKuz3s9SC-kO5ODfd.jpg", "hND7-BFmT1eSQTtN8gbg6pXzHKm.jpg", "A documentary crew follows a shamanic family as a relative appears possessed.", ["recent"]],
  ["millions-grandma", "How to Make Millions Before Grandma Dies", 2024, ["Drama", "Family"], 7.9, "Thailand", "movie", "9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", "6VmFqApQf8ofB3Fi6v7vUscVu0.jpg", "A grandson becomes caregiver to his grandmother, hoping inheritance might follow kindness.", ["recent", "trending"]],
  ["tears-black-tiger", "Tears of the Black Tiger", 2000, ["Action", "Romance", "Western"], 6.5, "Thailand", "movie", "oU7Oq2kFAAlGqbU3PlaV6ECaKOC.jpg", "8BTsBYMETykhK0L5U22qCHyn2YS.jpg", "A bandit and a wealthy woman try to hold onto a childhood romance in a stylized Thai western.", []],
  ["amelie", "Amélie", 2001, ["Comedy", "Romance"], 8.3, "France", "movie", "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", "s3TBrXY1TsL1tlxHDvZ48wbDO9.jpg", "A shy waitress in Paris secretly improves the lives of people around her, then risks her own happiness.", ["popular"]],
  ["cinema-paradiso", "Cinema Paradiso", 1988, ["Drama", "Romance"], 8.5, "Italy", "movie", "8OKmBV5BUFx7anZ7TqNKvGrs5.jpg", "2u7zbn8EudG6kLlBzCYviW4Di.jpg", "A filmmaker remembers the projectionist who taught him to love movies in a small Sicilian town.", ["popular"]],
  ["life-is-beautiful", "Life Is Beautiful", 1997, ["Comedy", "Drama", "Romance", "War"], 8.6, "Italy", "movie", "6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", "x2RS3uTcsJJ9IfjNdwTPTAuNiLG.jpg", "A father uses humor and imagination to protect his son after they are sent to a concentration camp.", []],
  ["city-of-god", "City of God", 2002, ["Crime", "Drama"], 8.6, "Brazil", "movie", "k7eYdG2vm6W1xXgCu0oTYxI2.jpg", "sw7MordWTyWXMb2dtQkkHEHUF.jpg", "Two boys growing up in a Rio de Janeiro favela take very different paths as crime rises.", ["popular"]],
  ["roma", "Roma", 2018, ["Drama"], 7.7, "Mexico", "movie", "6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg", "4iJfYYoQzZcONB9h6y0W1T1MkJA.jpg", "A domestic worker in 1970s Mexico City cares for a middle-class family as her own life unravels.", []],
  ["crouching-tiger", "Crouching Tiger, Hidden Dragon", 2000, ["Action", "Adventure", "Drama", "Fantasy"], 7.9, "Taiwan", "movie", "or06FN3Dka5tukK1e9sl16pB3iy.jpg", "7RyHsO4yDXtBv1zUU3mTpHeQ0dP.jpg", "Warriors pursue a stolen sword and a young aristocrat hiding extraordinary skill.", ["popular"]],
  ["in-the-mood", "In the Mood for Love", 2000, ["Drama", "Romance"], 8.1, "Hong Kong", "movie", "iZf0KyrE25z1sage4SYFLCCrH9.jpg", "tB2q6jGbY3o0pG3gZmc4PjB9.jpg", "Neighbors in 1960s Hong Kong form a close bond after suspecting their spouses of an affair.", ["popular"]],
  ["infernal-affairs", "Infernal Affairs", 2002, ["Action", "Crime", "Drama", "Thriller"], 8.0, "Hong Kong", "movie", "nT97ifVT2N2DjdDfZX4hzMPBqY2.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "A police mole in a triad and an undercover cop close in on each other's identities.", []],
  ["3-idiots", "3 Idiots", 2009, ["Comedy", "Drama"], 8.4, "India", "movie", "uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", "3Rfvhy1Nl61P2gWLYtYqrGHtaEy.jpg", "College friends remember a classmate who challenged a pressure-cooker engineering school.", ["popular"]],
  ["rrr", "RRR", 2022, ["Action", "Adventure", "Drama"], 7.8, "India", "movie", "w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", "fIwiFha3WPu5nHkBeMqPHnAdXy.jpg", "Two revolutionaries in 1920s India form a friendship while pursuing very different missions.", ["recent", "trending"]],
  ["intouchables", "The Intouchables", 2011, ["Comedy", "Drama"], 8.5, "France", "movie", "1P5zU5n58OdrLCLexv1UbWSBSCy.jpg", "1p5zU5n58OdrLCLexv1UbWSBSCy.jpg", "A wealthy quadriplegic hires an unlikely caregiver, and the two change each other's lives.", ["popular"]],
  ["portrait-lady", "Portrait of a Lady on Fire", 2019, ["Drama", "Romance"], 8.1, "France", "movie", "2H1TmgdfNtsZwzA7XLd1Ef6sUs.jpg", "askg3SMvhqHQ8YK4xlkrkyC4AJw.jpg", "A painter is hired to secretly portrait a young woman who is to be married against her will.", ["popular"]],
  ["let-the-right-one-in", "Let the Right One In", 2008, ["Drama", "Fantasy", "Horror", "Romance"], 7.8, "Sweden", "movie", "4ucLGcXQVSVovDqt6eKdABuCbbZ.jpg", "xBKG2QTkW3LDKf7R1HFyoHUtq5W.jpg", "A bullied boy in a snowy suburb befriends a child who is not what she appears to be.", []],
  ["lives-of-others", "The Lives of Others", 2006, ["Drama", "Thriller"], 8.4, "Germany", "movie", "ebSnODDg9kuRnEhPxweY6vbAvqg.jpg", "tB2q6jGbY3o0pG3gZmc4PjB9.jpg", "An East German Stasi agent assigned to surveil a playwright begins to doubt the system.", []],
  ["run-lola-run", "Run Lola Run", 1998, ["Action", "Crime", "Thriller"], 7.6, "Germany", "movie", "jX9T2N2DjdDfZX4hzMPBqY2FaOY.jpg", "sih4lkh4v5vYsePVuwRQO0Z2.jpg", "Lola has twenty minutes to gather money and save her boyfriend, and time keeps restarting.", []],
  ["hero-2002", "Hero", 2002, ["Action", "Adventure", "Drama"], 7.9, "China", "movie", "ceG9VTwVIAviqkLtbAvs7NtqYSQ.jpg", "c7xJZ4bJBm5oCegH9LQN6C0xS.jpg", "A nameless warrior recounts how he defeated three assassins in the Qin king's court.", []],
  ["chungking-express", "Chungking Express", 1994, ["Comedy", "Drama", "Romance"], 8.0, "Hong Kong", "movie", "z8onk3l4swCd4xcfyqYNmRU3cNr.jpg", "8Y43POKjjKDGI9MH89NW0NAzzp8.jpg", "Two lovesick policemen in Hong Kong drift through chance encounters and lingering heartbreak.", []],
  ["the-piano", "The Piano", 1993, ["Drama", "Romance"], 7.5, "New Zealand", "movie", "sKCr78MXSLixwmZ8DyJLrpMsd15.jpg", "wXsQvli6zWqjaipu4ekbbU7KvLd.jpg", "A mute woman and her daughter travel to New Zealand, where her piano becomes a battleground.", []],
  ["the-hunt", "The Hunt", 2012, ["Drama"], 8.3, "Denmark", "movie", "eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg", "n2vA8w05FAb7OWHeHYohfDrGxFq.jpg", "A kindergarten teacher in a small town is accused of something he did not do.", []],
  ["minari", "Minari", 2020, ["Drama"], 7.4, "United States", "movie", "vpbaStTj8fxFuv5yVv0SFM3x1c.jpg", "h3uqFk7sZR33JnTw8Qqy4N7kX8.jpg", "A Korean American family starts a farm in 1980s Arkansas while chasing a fragile American dream.", []],
  ["slumdog", "Slumdog Millionaire", 2008, ["Drama", "Romance"], 8.0, "United Kingdom", "movie", "gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", "askg3SMvhqHQ8YK4xlkrkyC4AJw.jpg", "A young man from Mumbai's slums is accused of cheating on a game show whose questions match his life.", []],
  ["panther", "Black Swan", 2010, ["Drama", "Thriller"], 8.0, "United States", "movie", "eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", "n6bUcrqQ5McRt3lhvdhyrbfqwjK.jpg", "A dedicated ballet dancer chases perfection in Swan Lake as the line between role and self collapses.", []],
  ["mad-max-2", "The Terminator", 1984, ["Action", "Sci-Fi"], 8.1, "United States", "movie", "qvktm0KOXdX6E3DVbSJ1wRPTKq.jpg", "fq3wyOs1RHyz2yfzsb4Hrtv6xwt.jpg", "A cyborg assassin is sent from the future to kill the woman whose unborn son will lead a resistance.", ["popular"]],
  ["alien-2", "Aliens", 1986, ["Action", "Horror", "Sci-Fi"], 8.4, "United States", "movie", "r1x5JGpyqZU8OYL1XkNOisdeoH.jpg", "AmR3Qz0yuI0r7lI1fLbIzzvm.jpg", "Ripley returns to LV-426 with colonial marines and finds the colony overrun.", ["popular"]],
  ["neon-horizon", "Neon Horizon", 2024, ["Sci-Fi"], 9.1, "CineVerse", "movie", "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80", "A night courier intercepts a forbidden broadcast that could rewrite a walled megacity. Fictional CineVerse original.", ["originals"]],
  ["crimson-vow", "Crimson Vow", 2023, ["Romance"], 8.4, "CineVerse", "movie", "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80", "", "Two archivists fall in love while restoring letters that were never meant to be read. Fictional CineVerse original.", ["originals"]],
  ["shadow-circuit", "Shadow Circuit", 2025, ["Action"], 8.7, "CineVerse", "movie", "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600&q=80", "", "An undercover driver must finish one last route through a city that has turned against her. Fictional CineVerse original.", ["originals"]],
  ["midnight-carnival", "Midnight Carnival", 2022, ["Horror"], 7.9, "CineVerse", "movie", "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80", "", "A traveling fair appears only after midnight, and every ticket has a hidden cost. Fictional CineVerse original.", ["originals"]],
  ["the-last-laugh", "The Last Laugh", 2024, ["Comedy"], 8.2, "CineVerse", "movie", "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80", "", "A washed-up joke writer stages one chaotic show to win back a stolen punchline. Fictional CineVerse original.", ["originals"]],
  ["starfall-protocol", "Starfall Protocol", 2021, ["Sci-Fi"], 8.8, "CineVerse", "movie", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80", "", "A research crew races to decode a dying satellite before its last orbit ends. Fictional CineVerse original.", ["originals"]],
  ["velvet-letters", "Velvet Letters", 2025, ["Romance"], 8.0, "CineVerse", "movie", "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80", "", "A bookstore owner and a night pianist trade unsigned notes across one winter. Fictional CineVerse original.", ["originals"]],
  ["iron-district", "Iron District", 2023, ["Action"], 8.5, "CineVerse", "movie", "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80", "", "A dockworker uncovers a smuggling ring hidden inside a city of steel cranes. Fictional CineVerse original.", ["originals"]],
  ["whisper-house", "Whisper House", 2024, ["Horror"], 8.1, "CineVerse", "movie", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80", "", "A restorer hears the walls of an empty mansion repeating her own memories. Fictional CineVerse original.", ["originals"]],
  ["double-take", "Double Take", 2022, ["Comedy"], 7.6, "CineVerse", "movie", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80", "", "Twin stand-up comics accidentally swap lives for a week of sold-out shows. Fictional CineVerse original.", ["originals"]],
  ["echoes-of-mars", "Echoes of Mars", 2023, ["Sci-Fi"], 8.6, "CineVerse", "movie", "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80", "", "A mapping team on Mars finds a signal that answers in a human voice. Fictional CineVerse original.", ["originals"]],
  ["golden-hour", "Golden Hour", 2021, ["Romance"], 7.8, "CineVerse", "movie", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80", "", "Two travel photographers keep missing each other until one shared sunset. Fictional CineVerse original.", ["originals"]],
  ["night-raid", "Night Raid", 2024, ["Action"], 8.3, "CineVerse", "movie", "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80", "", "A quiet security chief has one night to stop a heist already in motion. Fictional CineVerse original.", ["originals"]],
  ["gilded-mask", "The Gilded Mask", 2025, ["Horror"], 8.0, "CineVerse", "movie", "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=600&q=80", "", "A theater troupe wears antique masks that refuse to come off after opening night. Fictional CineVerse original.", ["originals"]],
  ["breaking-bad", "Breaking Bad", 2008, ["Crime", "Drama", "Thriller"], 9.5, "United States", "series", "ggFHVNu6YYI5L9pYq1j5cOhoqy.jpg", "tsRy63Mu5cuEet9hW3Rd8q.jpg", "A chemistry teacher turns to manufacturing methamphetamine after a cancer diagnosis.", ["trending"]],
  ["stranger-things", "Stranger Things", 2016, ["Drama", "Fantasy", "Horror", "Sci-Fi"], 8.7, "United States", "series", "49WJfeN0moxb9IPfGn8AIqMGskD.jpg", "56v2KjBlU4XaOv9rVYEQypROD7P.jpg", "Kids in a small town uncover secret experiments, missing friends, and a world underneath their own.", ["trending"]],
  ["squid-game", "Squid Game", 2021, ["Action", "Drama", "Mystery", "Thriller"], 8.0, "South Korea", "series", "dDlEmu3EZ0Pgg93K2SVNLCjCBq.jpg", "uQPCgxJ0K5CXefv8hUdwPz5.jpg", "Broke contestants compete in deadly children's games for a life-changing cash prize.", ["recent", "trending"]],
  ["dark", "Dark", 2017, ["Crime", "Drama", "Mystery", "Sci-Fi"], 8.7, "Germany", "series", "apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg", "5lAMMMW1S8Dt3cODpzKtZkk5Fx8.jpg", "A child's disappearance exposes a time-travel conspiracy linking four families in a German town.", ["popular"]],
  ["the-crown", "The Crown", 2016, ["Drama", "History"], 8.6, "United Kingdom", "series", "1M876KjAFgSdpsZ4MwHDbF27NY.jpg", "rqbCbjB19azG1K9i8sGMmLXw.jpg", "A dramatized portrait of Queen Elizabeth II and the political pressures around the monarchy.", []],
  ["attack-on-titan", "Attack on Titan", 2013, ["Action", "Adventure", "Animation", "Fantasy"], 9.0, "Japan", "series", "hTP1DtLGFamjfu8WqjamtMxt72.jpg", "m4TUa2ciESluNbPjd51NJ55BQqs.jpg", "Humanity lives behind walls, hunted by giant Titans, until a determined cadet joins the fight.", ["trending"]],
  ["last-of-us", "The Last of Us", 2023, ["Action", "Adventure", "Drama", "Horror"], 8.7, "United States", "series", "uKvVjHNqB7mUvIbcqjNAevSFik.jpg", "odJ4hx6g6vQR1wugj5kx9j0qB0.jpg", "A smuggler escorts a teenager across a ruined America after a fungal outbreak.", ["recent", "trending"]],
  ["shogun-2024", "Shōgun", 2024, ["Adventure", "Drama", "History"], 8.6, "United States", "series", "7O4iVfOMQfaCYx8JHBEzsmt80b.jpg", "jYEW5xZkJk2OVlKVwW6VdD5q2o.jpg", "An English sailor becomes a pawn in a power struggle among Japanese lords in 1600.", ["recent"]],
  ["the-bear", "The Bear", 2022, ["Comedy", "Drama"], 8.6, "United States", "series", "sHFlbKS3WLqMnp9t2XqFy7uN2.jpg", "fIwiFha3WPu5nHkBeMqPHnAdXy.jpg", "A young chef returns to Chicago to run his family's sandwich shop and tries to rebuild it.", ["recent"]],
  ["money-heist", "Money Heist", 2017, ["Action", "Crime", "Mystery"], 8.2, "Spain", "series", "reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", "TU9NTiuw1kOYFZjYjW4GwONLzZ.jpg", "A criminal mastermind gathers specialists to occupy the Royal Mint of Spain.", ["popular"]],
  ["queens-gambit", "The Queen's Gambit", 2020, ["Drama"], 8.5, "United States", "series", "zU0htwkhNvBQdVSIKB9s6wwAjWD.jpg", "qJeUAbsYiE0WftMx3qMhF8sS0Jm.jpg", "An orphaned chess prodigy rises through the competitive circuit while battling addiction.", ["popular"]],
  ["chernobyl", "Chernobyl", 2019, ["Drama", "History", "Thriller"], 9.3, "United Kingdom", "series", "hlLXricv2drdSY1obwHNay2Qw.jpg", "7RyHsO4yDXtBv1zUU3mTpHeQ0dP.jpg", "Officials, scientists, and workers confront the 1986 nuclear disaster and the lies around it.", []],
  ["wednesday", "Wednesday", 2022, ["Comedy", "Crime", "Fantasy", "Mystery"], 8.1, "United States", "series", "9PFonBhy4cQy7JI2hH1HClb3k.jpg", "56v2KjBlU4XaOv9rVYEQypROD7P.jpg", "Wednesday Addams investigates a monstrous mystery at Nevermore Academy.", ["recent"]],
  ["ted-lasso", "Ted Lasso", 2020, ["Comedy", "Drama"], 8.8, "United States", "series", "5d3WjK2sOkg7pQOckPIR8sH2No.jpg", "3Rfvhy1Nl61P2gWLYtYqrGHtaEy.jpg", "An American football coach is hired to manage a struggling English soccer club.", []],
  ["kingdom", "Kingdom", 2019, ["Horror", "Action", "Drama", "Thriller"], 8.3, "South Korea", "series", "pWDtjs568ZfOTMHKzPUbinoIU4.jpg", "1p5zU5n58OdrLCLexv1UbWSBSCy.jpg", "In Joseon-era Korea, a crown prince investigates a plague that turns the hungry into monsters.", []],
  ["crash-landing", "Crash Landing on You", 2019, ["Comedy", "Drama", "Romance"], 8.7, "South Korea", "series", "3H9NA1nWNqK2AlXqYkfC7uwhCg.jpg", "TU9NTiuw1kOYFZjYjW4GwONLzZ.jpg", "A South Korean heiress paraglides into North Korea and is hidden by an army captain.", ["popular"]],
  ["the-witcher", "The Witcher", 2019, ["Action", "Adventure", "Fantasy"], 8.0, "United States", "series", "7vjaCdMw15GEbZbkSUzplI.jpg", "tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg", "A mutated monster hunter, a princess, and a sorceress are bound by destiny across a war-torn continent.", []],
  ["arcane", "Arcane", 2021, ["Action", "Adventure", "Animation", "Sci-Fi"], 9.0, "France", "series", "fqldf2t8ztc9aiwn3s0oc55u.jpg", "7d6EY00g1c39SGZfXtynufM4uNc.jpg", "In the divided cities of Piltover and Zaun, two sisters are pulled to opposite sides of an uprising.", ["recent", "trending"]]
];

function mediaUrl(path, base) {
  if (!path) {
    return "";
  }
  return path.startsWith("http") ? path : base + path;
}

function deriveRows(item) {
  const rows = new Set(item.rows || []);
  if (item.country === "South Korea" && item.type === "movie") {
    rows.add("korean");
  }
  if (item.country === "Thailand") {
    rows.add("thai");
  }
  if (item.genres.includes("Animation")) {
    rows.add("animation");
  }
  if (item.genres.includes("Action") || item.genres.includes("Adventure")) {
    rows.add("action");
  }
  if (item.genres.includes("Romance")) {
    rows.add("romance");
  }
  if (item.genres.includes("Horror")) {
    rows.add("horror");
  }
  if (item.genres.includes("Sci-Fi")) {
    rows.add("scifi");
  }
  if (item.year >= 2021 && item.country !== "CineVerse") {
    rows.add("recent");
  }
  if (item.country === "CineVerse") {
    rows.add("originals");
  }
  return Array.from(rows);
}

const movies = (function buildCatalog() {
  const seenPosters = new Set();
  return CATALOG.map((row) => {
    const [id, title, year, genres, score, country, type, poster, backdrop, synopsis, extraRows] = row;
    let posterUrl = mediaUrl(poster, POSTER);
    if (seenPosters.has(posterUrl)) {
      posterUrl = "https://picsum.photos/seed/" + encodeURIComponent(id) + "/400/600";
    } else {
      seenPosters.add(posterUrl);
    }
    const item = {
      id,
      title,
      year,
      genres,
      genre: genres[0],
      score,
      country,
      type,
      poster: posterUrl,
      backdrop: mediaUrl(backdrop, BACKDROP),
      synopsis,
      rows: extraRows || [],
      alt: "Poster artwork for " + title + " (" + year + ")",
      original: country === "CineVerse"
    };
    item.rows = deriveRows(item);
    return item;
  });
})();

const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const navLinks = document.querySelectorAll("[data-nav]");
const searchInput = document.querySelector("#movie-search");
const movieGrid = document.querySelector("#movie-grid");
const resultsStatus = document.querySelector("#results-status");
const catalogTitle = document.querySelector("#catalog-title");
const catalogKicker = document.querySelector("#catalog-kicker");
const catalogCopy = document.querySelector("#catalog-copy");
const catalog = document.querySelector("#catalog");
const homeRows = document.querySelector("#home-rows");
const hero = document.querySelector(".hero");
const header = document.querySelector("#site-header");
const genreFilters = document.querySelector("#genre-filters");
const modal = document.querySelector("#movie-modal");
const modalTitle = document.querySelector("#modal-title");
const modalMeta = document.querySelector("#modal-meta");
const modalSynopsis = document.querySelector("#modal-synopsis");
const modalPoster = document.querySelector("#modal-poster");
const modalFavorite = document.querySelector("#modal-favorite");
const modalKicker = document.querySelector("#modal-kicker");
const heroImage = document.querySelector("#hero-image");
const heroTitle = document.querySelector("#hero-title");
const heroMeta = document.querySelector("#hero-meta");
const heroSynopsis = document.querySelector("#hero-synopsis");
const heroInfo = document.querySelector("#hero-info");

let activeGenre = "All";
let currentView = "home";
let activeMovieId = null;
let lastFocus = null;

function getFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : favorites.concat(id);
  saveFavorites(next);
  render();
  if (activeMovieId === id) {
    updateModalFavoriteButton();
  }
}

function handleImageError(image) {
  image.onerror = null;
  image.src = FALLBACK_POSTER;
}

function closeMobileNav() {
  primaryNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("menu-open");
}

function scoreLabel(score) {
  return `CineVerse score ${score}`;
}

function metaLine(movie) {
  return `${movie.genres.join(" · ")} · ${movie.year} · ${scoreLabel(movie.score)}`;
}

function bindPosterFallback(root) {
  root.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => handleImageError(image));
  });
}

function getVisibleMovies() {
  const query = searchInput.value.trim().toLowerCase();
  const favorites = getFavorites();

  return movies.filter((movie) => {
    if (query && !movie.title.toLowerCase().includes(query)) {
      return false;
    }
    if (activeGenre !== "All" && !movie.genres.includes(activeGenre)) {
      return false;
    }
    if (currentView === "movies") {
      return movie.type === "movie";
    }
    if (currentView === "series") {
      return movie.type === "series";
    }
    if (currentView === "list") {
      return favorites.includes(movie.id);
    }
    return true;
  });
}

function renderGenreFilters() {
  genreFilters.innerHTML = GENRE_ORDER.map((genre) => {
    const active = genre === activeGenre ? " is-active" : "";
    return `<button class="chip${active}" type="button" data-genre="${genre}">${genre}</button>`;
  }).join("");
}

function cardMarkup(movie, compact) {
  const saved = isFavorite(movie.id);
  if (compact) {
    return `
      <button class="tile" type="button" data-open-movie="${movie.id}" aria-label="${movie.title} details">
        <div class="tile-poster">
          <img src="${movie.poster}" alt="${movie.alt}" width="400" height="600" />
        </div>
        <div class="tile-info">
          <h3>${movie.title}</h3>
          <p>${movie.year} · ${movie.genres[0]} · ★ ${movie.score}</p>
        </div>
        <p class="tile-caption">${movie.title}</p>
      </button>
    `;
  }

  return `
    <article class="movie-card">
      <div class="poster-wrap">
        <img src="${movie.poster}" alt="${movie.alt}" width="400" height="600" />
        <span class="rating-badge" title="CineVerse editorial score">★ ${movie.score}</span>
      </div>
      <div class="card-body">
        <h3>${movie.title}</h3>
        <p class="card-meta">${movie.genres.slice(0, 2).join(" / ")} · ${movie.year}</p>
        <div class="card-actions">
          <button class="btn btn-ghost" type="button" data-open-movie="${movie.id}">Details</button>
          <button class="btn ${saved ? "btn-muted" : "btn-red"}" type="button" data-toggle-favorite="${movie.id}">
            ${saved ? "Remove" : "My List"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderRows() {
  homeRows.innerHTML = ROW_DEFS.map((row) => {
    const items = movies.filter((movie) => movie.rows.includes(row.id));
    if (!items.length) {
      return "";
    }
    return `
      <section class="row" aria-labelledby="row-${row.id}">
        <div class="row-header">
          <h2 id="row-${row.id}">${row.title}</h2>
          <div class="row-controls">
            <button class="row-btn" type="button" data-scroll-row="${row.id}" data-dir="-1" aria-label="Scroll ${row.title} left">‹</button>
            <button class="row-btn" type="button" data-scroll-row="${row.id}" data-dir="1" aria-label="Scroll ${row.title} right">›</button>
          </div>
        </div>
        <div class="row-scroller" id="scroller-${row.id}">
          ${items.map((movie) => cardMarkup(movie, true)).join("")}
        </div>
      </section>
    `;
  }).join("");
  bindPosterFallback(homeRows);
}

function renderGrid() {
  const visible = getVisibleMovies();
  const query = searchInput.value.trim();

  if (visible.length === 0) {
    const emptyMessage =
      currentView === "list" && getFavorites().length === 0 && !query
        ? "Your list is empty. Open a title and choose Add to My List."
        : "No titles match this search and genre filter. Try another title or choose All.";
    movieGrid.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
    resultsStatus.textContent = "Showing 0 titles.";
    return;
  }

  resultsStatus.textContent = `Showing ${visible.length} title${visible.length === 1 ? "" : "s"}${
    query ? ` for “${query}”` : ""
  }.`;
  movieGrid.innerHTML = visible.map((movie) => cardMarkup(movie, false)).join("");
  bindPosterFallback(movieGrid);
}

function renderHero() {
  const featured = movies.find((movie) => movie.id === FEATURED_ID) || movies[0];
  heroImage.src = featured.backdrop || featured.poster;
  heroImage.alt = `Backdrop artwork for ${featured.title}`;
  heroTitle.textContent = featured.title;
  heroMeta.textContent = metaLine(featured);
  heroSynopsis.textContent = featured.synopsis;
  heroInfo.dataset.openMovie = featured.id;
}

function setView(view) {
  currentView = view;
  const querying = Boolean(searchInput.value.trim());
  const showHome = view === "home" && !querying;

  hero.hidden = !showHome;
  homeRows.hidden = !showHome;
  catalog.hidden = showHome;

  navLinks.forEach((link) => {
    const active = link.dataset.nav === view;
    link.classList.toggle("is-active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (view === "list") {
    catalogKicker.textContent = "Saved titles";
    catalogTitle.textContent = "My List";
    catalogCopy.textContent = "Titles you save stay in this browser through localStorage. Ratings remain CineVerse editorial scores.";
  } else if (view === "series") {
    catalogKicker.textContent = "Watch next";
    catalogTitle.textContent = "TV & Series";
    catalogCopy.textContent = "A selection of well-known series. Ratings are CineVerse editorial scores, not official averages.";
  } else if (view === "movies") {
    catalogKicker.textContent = "Full catalog";
    catalogTitle.textContent = "Movies";
    catalogCopy.textContent = "Browse films from Hollywood, Korea, Japan, Thailand, and beyond. Ratings are CineVerse editorial scores.";
  } else {
    catalogKicker.textContent = "Search results";
    catalogTitle.textContent = querying ? "Search" : "Featured Collection";
    catalogCopy.textContent = "Search across the full CineVerse catalog. Ratings are editorial scores for browsing only.";
  }

  render();
  closeMobileNav();

  if (!showHome) {
    catalog.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function render() {
  renderGenreFilters();
  if (currentView === "home" && !searchInput.value.trim()) {
    renderRows();
  } else {
    renderGrid();
  }
}

function openModal(id) {
  const movie = movies.find((item) => item.id === id);
  if (!movie) {
    return;
  }

  activeMovieId = id;
  lastFocus = document.activeElement;
  modalKicker.textContent = movie.original ? "CineVerse original" : movie.type === "series" ? "Series" : "Film";
  modalTitle.textContent = movie.title;
  modalMeta.textContent = `${metaLine(movie)} · ${movie.country}`;
  modalSynopsis.textContent = movie.synopsis;
  modalPoster.src = movie.poster;
  modalPoster.alt = movie.alt;
  modalPoster.onerror = () => handleImageError(modalPoster);
  updateModalFavoriteButton();
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function updateModalFavoriteButton() {
  const saved = isFavorite(activeMovieId);
  modalFavorite.textContent = saved ? "Remove from My List" : "Add to My List";
  modalFavorite.classList.toggle("btn-muted", saved);
  modalFavorite.classList.toggle("btn-red", !saved);
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  activeMovieId = null;
  if (lastFocus && typeof lastFocus.focus === "function") {
    lastFocus.focus();
  }
}

function handleHash() {
  const raw = (window.location.hash || "#home").replace("#", "");
  const aliases = {
    home: "home",
    movies: "movies",
    genres: "movies",
    series: "series",
    tv: "series",
    list: "list",
    favorites: "list"
  };
  setView(aliases[raw] || "home");
}

navToggle.addEventListener("click", () => {
  const open = !primaryNav.classList.contains("is-open");
  primaryNav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
});

searchInput.addEventListener("input", () => {
  if (currentView === "home") {
    setView("home");
    return;
  }
  renderGrid();
  renderGenreFilters();
});

genreFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-genre]");
  if (!button) {
    return;
  }
  activeGenre = button.dataset.genre;
  if (currentView === "home" && !searchInput.value.trim()) {
    window.location.hash = "movies";
    return;
  }
  render();
});

document.addEventListener("click", (event) => {
  const scrollerBtn = event.target.closest("[data-scroll-row]");
  if (scrollerBtn) {
    const scroller = document.querySelector(`#scroller-${scrollerBtn.dataset.scrollRow}`);
    if (scroller) {
      scroller.scrollBy({
        left: Number(scrollerBtn.dataset.dir) * Math.max(scroller.clientWidth * 0.85, 280),
        behavior: "smooth"
      });
    }
    return;
  }

  const openTrigger = event.target.closest("[data-open-movie]");
  if (openTrigger) {
    openModal(openTrigger.dataset.openMovie);
    return;
  }

  const favoriteTrigger = event.target.closest("[data-toggle-favorite]");
  if (favoriteTrigger) {
    toggleFavorite(favoriteTrigger.dataset.toggleFavorite);
    return;
  }

  if (event.target.closest("[data-close-modal]")) {
    closeModal();
  }
});

modalFavorite.addEventListener("click", () => {
  if (activeMovieId) {
    toggleFavorite(activeMovieId);
  }
});

heroInfo.addEventListener("click", () => {
  openModal(heroInfo.dataset.openMovie);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
  if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
    closeMobileNav();
  }
  if (event.key === "Tab" && !modal.hidden) {
    const focusable = modal.querySelectorAll("button, [href], input");
    if (!focusable.length) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

window.addEventListener("hashchange", handleHash);
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
});

heroImage.addEventListener("error", () => handleImageError(heroImage));

renderHero();
handleHash();
