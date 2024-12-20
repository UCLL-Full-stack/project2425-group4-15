import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites, addMovieToFavorites } from "@services/favorites";

const movies = [
  { id: 1, title: "Movie 1", posterUrl: "/path/to/movie1.jpg", releaseDate: "2024-01-01" },
  { id: 2, title: "Movie 2", posterUrl: "/path/to/movie2.jpg", releaseDate: "2024-02-01" },
];

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const fetchedFavorites = await getFavorites(token);
        setFavorites(fetchedFavorites);
      } catch (error) {
        setError("Error fetching favorites");
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const handleAddToFavorites = async (movieId: number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      await addMovieToFavorites(movieId, token);
      setFavorites((prev) => [...prev, { movie: { id: movieId } }]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const favoriteMovieIds = favorites.map((item) => item.movie?.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Mijn Favorieten</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded-md bg-gray-800">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto rounded-md" />
            <h3 className="mt-2 text-white">{movie.title}</h3>
            <p className="text-gray-400">{movie.releaseDate}</p>

            {/* Favorite Button */}
            <button
              onClick={() => handleAddToFavorites(movie.id)}
              className={`mt-2 px-4 py-2 rounded ${
                favoriteMovieIds.includes(movie.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {favoriteMovieIds.includes(movie.id) ? "❤️ Favoriet" : "♡ Voeg toe"}
            </button>
          </div>
        ))}
      </div>

      {/* Back to the homepage */}
      <Link href="/" passHref>
        <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
          Terug naar Home
        </button>
      </Link>
    </div>
  );
};

export default FavoritesPage;
