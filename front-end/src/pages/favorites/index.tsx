import React, { useEffect, useState } from "react";
import { getFavoriteMovies, Movie } from "src/services/moviesService"; // Zorg ervoor dat deze functie is geïmporteerd
import MovieCard from "src/components/MovieCard"; // Zorg ervoor dat je MovieCard component goed werkt
import { useRouter } from "next/router";

const FavoritesPage: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Haal de favoriete films op
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavoriteMovies(); // Fetch the favorite movies
        setFavoriteMovies(response); // Zet de favoriete films in de staat
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError("Error loading favorite movies: " + err.message); // Safely access the error message
        } else {
          setError("Unknown error occurred while fetching favorite movies.");
        }
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Loading favorite movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Favorite Movies</h1>
      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.coverPic}
              releaseDate={movie.releaseDate}
              isFavorite={true} // Alle films op deze pagina zijn favorieten
              toggleFavorite={() => {}} // Deze functie is niet nodig voor de favorites-pagina
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
