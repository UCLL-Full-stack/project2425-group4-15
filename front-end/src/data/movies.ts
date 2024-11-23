export const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.",
    releaseDate: "1994-09-22",    
    genres: ["Drama"],
    posterUrl: "/posters/shawshank.jpg",  // Corrected path
    reviews: [
      { id: 1, username: "John", comment: "Incredible!", rating: 5 },
      { id: 2, username: "Alice", comment: "A true masterpiece.", rating: 5 },
    ],
  },
  {
    id: 2,
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: "1972-03-24",
    genres: ["Crime", "Drama"],
    posterUrl: "/posters/godfather.jpg",  // Corrected path
    reviews: [{ id: 1, username: "Michael", comment: "Legendary film!", rating: 5 }],
  },
  {
    id: 3,
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2008-07-18",
    genres: ["Action", "Crime", "Drama"],
    posterUrl: "/posters/darkknight.jpg",  // Corrected path
    reviews: [{ id: 1, username: "Bruce", comment: "Amazing action!", rating: 4.5 }],
  },
  {
    id: 4,
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an extraordinary point of view, his childhood friend, and his true love.",
    releaseDate: "1994-07-06",
    genres: ["Drama", "Romance"],
    posterUrl: "/posters/forrestgump.jpg",
    reviews: [
      { id: 1, username: "Tom", comment: "A heartwarming story.", rating: 5 },
      { id: 2, username: "Sarah", comment: "Truly inspiring!", rating: 5 },
    ],
  },
  {
    id: 5,
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: "1994-10-14",
    genres: ["Crime", "Drama"],
    posterUrl: "/posters/pulpfiction.jpg",
    reviews: [
      { id: 1, username: "Frank", comment: "Masterpiece!", rating: 5 },
      { id: 2, username: "Elaine", comment: "Timeless classic!", rating: 4.5 },
    ],
  },
  {
    id: 6,
    title: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseDate: "1999-03-31",
    genres: ["Action", "Sci-Fi"],
    posterUrl: "/posters/matrix.jpg",
    reviews: [
      { id: 1, username: "Neo", comment: "Revolutionary film!", rating: 5 },
      { id: 2, username: "Morpheus", comment: "Mind-bending!", rating: 5 },
    ],
  },
  {
    id: 7,
    title: "Inception",
    description:
      "A thief who enters the minds of others through their dreams is given the inverse task of planting an idea into the mind of a CEO.",
    releaseDate: "2010-07-16",
    genres: ["Action", "Sci-Fi", "Thriller"],
    posterUrl: "/posters/inception.jpg",
    reviews: [
      { id: 1, username: "Leo", comment: "Incredibly creative!", rating: 5 },
      { id: 2, username: "Jessica", comment: "Mind-blowing concept!", rating: 5 },
    ],
  },
  {
    id: 8,
    title: "The Lord of the Rings: The Return of the King",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's forces in a final battle for the fate of Middle-earth.",
    releaseDate: "2003-12-17",
    genres: ["Adventure", "Fantasy"],
    posterUrl: "/posters/lotr_returnoftheking.jpg",
    reviews: [
      { id: 1, username: "Aragorn", comment: "Epic conclusion!", rating: 5 },
      { id: 2, username: "Legolas", comment: "A fitting end!", rating: 5 },
    ],
  },
  {
    id: 9,
    title: "Fight Club",
    description:
      "An insomniac office worker and a soap salesman form an underground fight club that evolves into something much, much more.",
    releaseDate: "1999-10-15",
    genres: ["Drama"],
    posterUrl: "/posters/fightclub.jpg",
    reviews: [
      { id: 1, username: "Tyler", comment: "So intense!", rating: 5 },
      { id: 2, username: "Marla", comment: "A dark masterpiece.", rating: 4.5 },
    ],
  },
  {
    id: 10,
    title: "The Social Network",
    description:
      "The story of the founding of Facebook and the legal battles that followed its creation.",
    releaseDate: "2010-10-01",
    genres: ["Drama", "Biography"],
    posterUrl: "/posters/socialnetwork.jpg",
    reviews: [
      { id: 1, username: "Mark", comment: "Incredible story!", rating: 4.5 },
      { id: 2, username: "Sean", comment: "Well done!", rating: 5 },
    ],
  },
  {
    id: 11,
    title: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    releaseDate: "2000-05-05",
    genres: ["Action", "Adventure", "Drama"],
    posterUrl: "/posters/gladiator.jpg",
    reviews: [
      { id: 1, username: "Maximus", comment: "A timeless classic!", rating: 5 },
      { id: 2, username: "Commodus", comment: "A thrilling ride!", rating: 4.5 },
    ],
  },
  {
    id: 12,
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2014-11-07",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    posterUrl: "/posters/interstellar.jpg",
    reviews: [
      { id: 1, username: "Cooper", comment: "Incredible visual effects!", rating: 5 },
      { id: 2, username: "Dr. Brand", comment: "An emotional journey!", rating: 4.5 },
    ],
  },
];
