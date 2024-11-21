import React from "react";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";

const HomePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterUrl={movie.posterUrl}
          releaseDate={movie.releaseDate}
        />
      ))}
    </div>
  );
};

export default HomePage;
