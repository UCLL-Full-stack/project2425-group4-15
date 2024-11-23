import React from "react";

interface Review {
  id: number;
  username: string;
  comment: string;
  rating: number;
}

interface MovieDetailsProps {
  title: string;
  description: string;
  releaseDate: string;
  genres: string[];
  posterUrl: string;
  reviews: Review[];
  onBack: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  title,
  description,
  releaseDate,
  genres,
  posterUrl,
  reviews,
  onBack,
}) => {
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="rounded-lg"
          style={{ width: "474px", height: "711px", objectFit: "cover" }} // Fixed size 474x711
        />
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="text-gray-300">{description}</p>
          <p className="text-gray-400 mt-2">
            <strong>Release Date:</strong> {releaseDate}
          </p>
          <p className="text-gray-400 mt-2">
            <strong>Genres:</strong> {genres.join(", ")}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-white">Reviews</h3>
        {reviews.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <p className="text-white">
                  <strong>{review.username}</strong>: {review.comment}
                </p>
                <p className="text-gray-400">Rating: {review.rating}/5</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
