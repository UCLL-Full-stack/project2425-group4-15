import React from "react";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterUrl,
  releaseDate,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer">
      <Link href={`/movie/${id}`} passHref>
        <div className="relative">
          {/* Poster Image */}
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="rounded-lg mb-4 w-full"
          />

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to the movie page when clicking the heart
              toggleFavorite(id); // Toggle the favorite status
            }}
            className={`absolute bottom-2 right-2 text-3xl p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
            style={{ fontSize: '2rem' }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </Link>

      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-300">{releaseDate}</p>
    </div>
  );
};

export default MovieCard;
