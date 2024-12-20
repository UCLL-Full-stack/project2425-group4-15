import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMovieById, Movie } from "src/services/moviesService"; // Import the service and Movie interface
import MovieDetails from "src/components/MovieDetails"; // Assuming MovieDetails is the correct component
import { submitReview } from "src/services/reviewService"; // Import the review service for submitting reviews

const MoviePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the movie ID from the URL query

  const [movie, setMovie] = useState<Movie | null>(null); // Use the Movie interface
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | undefined>(undefined); // Use string | undefined for review errors

  // Fetch movie details on component mount or when the id changes
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

  // Review submission handler
  const handleSubmitReview = async (reviewData: { content: string; rating: number; userId: number; movieId: number }) => {
    try {
      // Set seriesId to 0, as the API expects a number, not null or undefined
      const dataToSubmit = { ...reviewData, seriesId: 0 }; // Set seriesId to 0 for movie reviews
      await submitReview(dataToSubmit); // Submit review using the service
      setReviewError(undefined); // Clear error on success
    } catch (err) {
      setReviewError("Error submitting review.");
    }
  };
  

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error || !movie) return <p>Error: {error || "Movie not found"}</p>; // Display error or not found message

  return (
    <MovieDetails
      {...movie} // Pass the movie details, including reviews, to the MovieDetails component
      onBack={() => router.push("/")} // Navigate back to home or previous page
      onSubmitReview={handleSubmitReview} // Pass the review submission handler
      reviewError={reviewError} // Pass any review submission errors to display in the UI
    />
  );
};

export default MoviePage;