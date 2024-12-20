// services/favorites.ts

export const getFavorites = async (token: string) => {
    try {
      const response = await fetch("https://your-api-url.com/favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the authorization token
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  // services/favorites.ts

export const addMovieToFavorites = async (movieId: number, token: string) => {
    try {
      const response = await fetch(`https://your-api-url.com/favorites/movies/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to add movie to favorites");
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  