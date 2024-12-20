import React, { useState } from "react";

// Update the Review interface to include seriesId as optional
export interface Review {
  id: number;
  content: string;
  rating: number; // Rating out of 10
  userId: number;
  movieId: number;
  seriesId?: number | null; // seriesId is optional and can be null
  reviewDate: string;
}

export interface Movie {
  id: number;
  title: string;
  genre: string[];
  releaseDate: string;
  cast: string[];
  director: string;
  coverPic: string;
  description: string;
  reviews?: Review[]; // Updated to reflect your API response
}

interface MovieDetailsProps extends Movie {
  onBack: () => void; // Add the onBack prop
  onSubmitReview: (reviewData: { content: string; rating: number; userId: number; movieId: number; seriesId?: number | null }) => void; // Adjusted to accept seriesId
  reviewError?: string; // Optional error message for reviews
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
  reviews, 
  onBack,
  onSubmitReview,
  reviewError
}) => {
  // State for the review form
  const [newReview, setNewReview] = useState({ content: '', rating: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (!newReview.content || newReview.rating <= 0 || newReview.rating > 10) {
      alert('Please provide valid review content and a rating between 1 and 10.');
      return;
    }

    setIsSubmitting(true);

    // Pass the review data, including seriesId as null for movie reviews
    onSubmitReview({
      content: newReview.content,
      rating: newReview.rating,
      userId: 1, // Replace with the actual user ID
      movieId: id,
      seriesId: null // Set seriesId as null for movie reviews
    });

    setIsSubmitting(false);
    setNewReview({ content: '', rating: 0 });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Movie Header */}
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

      {/* Cast Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Cast</h3>
        <ul className="mt-4 list-disc pl-5 text-gray-700">
          {cast.map((actor, index) => (
            <li key={index}>{actor}</li>
          ))}
        </ul>
      </div>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Reviews</h3>
          <ul className="mt-4 space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-500 font-bold">{`${review.rating} / 10`}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.content}</p>
                <div className="text-sm text-gray-500">
                  Reviewed on {new Date(review.reviewDate).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Review Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Add Your Review</h3>
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            rows={4}
            placeholder="Write your review..."
            value={newReview.content}
            onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
          />
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Rating (1-10)"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          />
          <button
            onClick={handleSubmitReview}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          {reviewError && <p className="text-red-500 mt-2">{reviewError}</p>}
        </div>
      </div>

      <div className="mt-8">
        <button onClick={onBack} className="text-blue-500 hover:text-blue-700">
          Back to movies
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
