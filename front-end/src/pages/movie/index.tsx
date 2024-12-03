import React, { useState } from "react";
import { movies } from "src/data/movies";
import MovieCard from "src/components/MovieCard";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]); // State to store favorites

  // Toggle movie in favorites list
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

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6">
      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Zoek naar films of series..."
        className="p-3 w-full border border-gray-300 rounded-md mb-6"
      />

      {/* Movie cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              isFavorite={favorites.includes(movie.id)}
              toggleFavorite={toggleFavorite} // Pass toggle function to MovieCard
            />
          ))
        ) : (
          <p className="text-gray-500">Geen resultaten gevonden</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
