import React, { useState } from "react";
import { postReview } from "src/services/reviewService"; // Service om reviews naar de backend te sturen

interface Review {
  id: number;
  username: string;
  comment: string;
  rating: number;
}

interface MovieDetailsProps {
  id: number; // Film ID toegevoegd voor backend-integratie
  title: string;
  description: string;
  releaseDate: string;
  genres: string[];
  posterUrl: string;
  reviews: Review[];
  onBack: () => void;
  onAddReview: (newReview: Review) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  id,
  title,
  description,
  releaseDate,
  genres,
  posterUrl,
  reviews,
  onBack,
  onAddReview,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Maak de review aan via de service
      await postReview(comment, rating, 1, id); // Vervang 1 door een daadwerkelijke userId
  
      const newReview = {
        id: reviews.length + 1, // Tijdelijke ID
        username: "Anonymous", // Dit kun je dynamisch maken met user data
        comment,
        rating,
      };
  
      onAddReview(newReview); // Voeg toe aan de lokale lijst
      setRating(0); // Reset rating
      setComment(""); // Reset comment
    } catch (error) {
      alert("Failed to submit your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

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
          style={{ width: "474px", height: "711px", objectFit: "cover" }}
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

      {/* Add Review Form */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-white">Add Your Review</h3>
        <div className="mt-4">
          <label className="text-gray-400">Rating</label>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-400">Your Comment</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
            placeholder="Write your review here..."
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
