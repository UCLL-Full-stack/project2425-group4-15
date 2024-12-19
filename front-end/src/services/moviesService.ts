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
  
  export const getMovies = async (): Promise<Movie[]> => {
    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Unable to retrieve movies. Please try again later.");
    }
  };
  
  export const getMovieById = async (id: number): Promise<Movie> => {
    try {
      const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movie with ID ${id}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Unable to retrieve movie details. Please try again later.");
    }
  };
  