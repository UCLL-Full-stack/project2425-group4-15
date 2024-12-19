
export const postReview = async (
    content: string,
    rating: number,
    userId: number,
    movieId?: number,
    seriesId?: number
  ): Promise<void> => {
    try {
      const body = {
        content,
        rating,
        userId,
        movieId: movieId || null, // Alleen movieId als deze bestaat
        seriesId: seriesId || null, // Alleen seriesId als deze bestaat
      };
  
      const response = await fetch(`http://localhost:3000/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (response.status === 201) {
        console.log("Review created successfully");
      } else {
        throw new Error(`Failed to submit review: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to submit your review at this time.");
    }
  };
  