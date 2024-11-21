export const movies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.",
      releaseDate: "1994-09-22",
      genres: ["Drama"],
      posterUrl: "/posters/shawshank.jpg", // Gebruik public/ directory
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
      posterUrl: "/posters/godfather.jpg",
      reviews: [{ id: 1, username: "Michael", comment: "Legendary film!", rating: 5 }],
    },
    {
      id: 3,
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      releaseDate: "2008-07-18",
      genres: ["Action", "Crime", "Drama"],
      posterUrl: "/posters/darkknight.jpg",
      reviews: [{ id: 1, username: "Bruce", comment: "Amazing action!", rating: 4.5 }],
    },
  ];
  