import React from "react";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterUrl, releaseDate }) => {
  return (
    <Link href={`/movie/${id}`} className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer">
      <img
        src={posterUrl}
        alt={`${title} poster`}
        className="rounded-lg mb-4 w-full"
      />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-300">{releaseDate}</p>
    </Link>
  );
};

export default MovieCard;
