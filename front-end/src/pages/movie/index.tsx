import React, { useState, useEffect } from "react";
import { getMovies, Movie } from "src/services/moviesService"; // Make sure to import Movie interface
import MovieCard from "src/components/MovieCard";
import Link from "next/link"; // You may use this for navigating, but it's not being used here

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Use the Movie interface for type safety
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data); // Assuming data is of type Movie[]
        setLoading(false);
      } catch (err) {
        setError("Error loading movies.");
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Toggle favorite movie
  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favoriteId) => favoriteId !== id)
        : [...prevFavorites, id]
    );
  };

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Zoek naar films of series..."
        className="p-3 w-full border border-gray-300 rounded-md mb-6"
      />

      {loading ? (
        <p className="text-gray-500">Films worden geladen...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.coverPic} // Aangepast voor API veld
                releaseDate={movie.releaseDate}
                isFavorite={favorites.includes(movie.id)}
                toggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p className="text-gray-500">Geen resultaten gevonden</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
