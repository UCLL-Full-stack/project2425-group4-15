import React, { useState } from "react";
import { useRouter } from "next/router";
import { Movie } from "src/services/moviesService"; // Import Movie interface

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  isFavorite: boolean;
  toggleFavorite: (id: number, isFavorite: boolean) => void; // Toggle function with favorite state
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterUrl,
  releaseDate,
  isFavorite,
  toggleFavorite,
}) => {
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API calls

  const handleFavoriteToggle = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      const response = await fetch(
        `http://localhost:3000/favorites/movies/${id}`,
        {
          method: isFavorite ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(
          isFavorite ? "Failed to remove from favorites." : "Failed to add to favorites."
        );
      }
  
      toggleFavorite(id, !isFavorite);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message); // Now TypeScript knows `error` is an `Error` object
      } else {
        console.error("An unknown error occurred.");
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer">
      <div className="relative">
        {/* Poster Image */}
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="rounded-lg mb-4 w-full"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle} // Handle the favorite toggle click
          className={`absolute bottom-2 right-2 text-3xl p-2 rounded-full ${
            isFavorite ? "text-red-500" : "text-gray-500"
          }`}
          style={{ fontSize: "2rem" }}
          disabled={loading} // Disable button during the request
        >
          {isFavorite ? "❤️" : "🤍"} {/* Heart icon */}
        </button>
      </div>

      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-300">{releaseDate}</p>
    </div>
  );
};

export default MovieCard;
