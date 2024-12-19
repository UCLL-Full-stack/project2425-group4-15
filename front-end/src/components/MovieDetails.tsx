import React from 'react';

export interface Movie {
  id: number;
  title: string;
  genre: string[];
  releaseDate: string;
  cast: string[];
  director: string;
  coverPic: string;
  description: string;
}

interface MovieDetailsProps extends Movie {
  onBack: () => void; // Add the onBack prop
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ 
  id, 
  title, 
  genre, 
  releaseDate, 
  cast, 
  director, 
  coverPic, 
  description, 
  onBack 
}) => {
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={coverPic}
          alt={title}
          className="w-64 h-auto rounded-lg shadow-md"
        />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
          <h2 className="text-xl text-gray-600">{director}</h2>
          <div className="mt-2">
            <strong>Genre:</strong> {genre.join(', ')}
          </div>
          <div className="mt-2">
            <strong>Release Date:</strong> {new Date(releaseDate).toLocaleDateString()}
          </div>
          <p className="mt-4 text-gray-700">{description}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Cast</h3>
        <ul className="mt-4 list-disc pl-5 text-gray-700">
          {cast.map((actor, index) => (
            <li key={index}>{actor}</li>
          ))}
        </ul>
      </div>

      <button 
        onClick={onBack} 
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Back
      </button>
    </div>
  );
};

export default MovieDetails;
