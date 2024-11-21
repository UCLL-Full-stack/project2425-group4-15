import React from "react";
import { useRouter } from "next/router";
import { movies } from "../../data/movies";
import MovieDetails from "../../components/MovieDetails";

const MoviePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const movie = movies.find((movie) => movie.id === parseInt(id as string));

  if (!movie) {
    return (
      <div className="p-6">
        <p className="text-white">Movie not found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          Back to List
        </button>
      </div>
    );
  }

  return <MovieDetails {...movie} onBack={() => router.push("/")} />;
};

export default MoviePage;
