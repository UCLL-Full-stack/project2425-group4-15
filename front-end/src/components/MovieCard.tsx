import React from 'react';
import Link from 'next/link';

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
    const formattedDate = new Date(releaseDate).toISOString().split('T')[0];

    return (
        <div className="relative p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer">
            {/* Favorite Button moved to top-right */}
            <button
                onClick={(e) => {
                    e.preventDefault(); // Prevent navigation on click
                    toggleFavorite(id);
                }}
                className={`absolute top-2 right-2 text-3xl p-2 rounded-full ${
                    isFavorite ? 'text-red-500' : 'text-gray-500'
                }`}
                style={{ fontSize: '2rem' }}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <Link href={`/movie/${id}`} passHref>
                <div>
                    {/* Poster Image */}
                    <img
                        src={posterUrl}
                        alt={`${title} poster`}
                        className="rounded-lg mb-4 w-full"
                    />
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm text-gray-300">{formattedDate}</p>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
