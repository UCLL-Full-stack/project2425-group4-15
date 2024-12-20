// src/services/reviewService.ts

export interface ReviewData {
    content: string;
    rating: number;
    userId: number;
    movieId: number;
    seriesId?: number | null; // Allow seriesId to be either number, null, or undefined
  }
  
  export const submitReview = async (reviewData: ReviewData): Promise<any> => {
    const apiUrl = 'http://localhost:3000/reviews'; // Your API URL for reviews
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit review: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };
  