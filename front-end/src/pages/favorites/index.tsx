import React, { useEffect, useState } from "react";
import { movies } from "src/data/movies";
import Link from "next/link";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Fetch favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("favorites") || "[]") 
      : [];
    setFavorites(storedFavorites);
  }, []);

  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Mijn Favorieten</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <div key={movie.id} className="border p-4 rounded-md bg-gray-800">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto rounded-md" />
              <h3 className="mt-2 text-white">{movie.title}</h3>
              <p className="text-gray-400">{movie.releaseDate}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Geen favorieten gevonden. Voeg wat films toe vanuit de homepagina!</p>
        )}
      </div>

      {/* Back to the homepage */}
      <Link href="/" passHref>
        <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
          Terug naar Home
        </button>
      </Link>
    </div>
  );
};

export default FavoritesPage;
