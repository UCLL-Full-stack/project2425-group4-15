import React, { useState } from "react";
import { movies } from "src/data/movies";
import MovieCard from "src/components/MovieCard";

const HomePage: React.FC = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input change for search
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
        placeholder="Search for movies or series..."
        className="p-3 w-full border border-gray-300 rounded-md mb-6"
      />

      {/* Grid of movie cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
            />
          ))
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
