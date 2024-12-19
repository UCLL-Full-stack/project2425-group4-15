import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMovieById, Movie } from "src/services/moviesService"; // Import the service and Movie interface
import MovieDetails from "src/components/MovieDetails"; // Assuming MovieDetails is the correct component

const MoviePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the movie ID from the URL query

  const [movie, setMovie] = useState<Movie | null>(null); // Use the Movie interface
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const data = await getMovieById(parseInt(id as string)); // Fetch movie data by ID
          setMovie(data); // Set the fetched movie data
          setLoading(false); // Stop loading
        } catch (err) {
          setError("Error loading movie.");
          setLoading(false); // Stop loading in case of error
        }
      };
      fetchMovie(); // Fetch the movie when ID is available
    }
  }, [id]); // Re-run effect when the ID changes

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error || !movie) return <p>Error: {error || "Movie not found"}</p>; // Display error or not found message

  return <MovieDetails {...movie} onBack={() => router.push("/")} />; // Pass the movie details to the MovieDetails component
};

export default MoviePage;
