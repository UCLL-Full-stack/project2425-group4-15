import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMovieById } from "src/services/moviesService";
import MovieDetails from "src/components/MovieDetails";

const MoviePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const data = await getMovieById(parseInt(id as string));
          setMovie(data);
          setLoading(false);
        } catch (err) {
          setError("Error loading movie.");
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !movie) return <p>Error: {error || "Movie not found"}</p>;

  return <MovieDetails {...movie} onBack={() => router.push("/")} />;
};

export default MoviePage;
