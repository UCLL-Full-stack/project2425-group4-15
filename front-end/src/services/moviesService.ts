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

export const getFavoriteMovies = async (): Promise<Movie[]> => {
  try {
    // Zorg ervoor dat je het token op de juiste manier krijgt, bijvoorbeeld vanuit localStorage of cookies
    const token = localStorage.getItem("authToken");

    // Controleer of er een token aanwezig is, anders kan de gebruiker niet worden geauthenticeerd
    if (!token) {
      throw new Error("Unauthorized: No valid token found.");
    }

    const response = await fetch("http://localhost:3000/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Voeg het token toe voor authenticatie
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please log in.");
      }
      throw new Error("Failed to fetch favorite movies.");
    }

    const favoritesData = await response.json();
    // Map over the response to extract only the movie data from each favorite
    return favoritesData.map((favorite: any) => favorite.movie); // Assuming the movie data is under the `movie` property
  } catch (error) {
    console.error(error);
    throw new Error("Unable to retrieve favorite movies. Please try again later.");
  }
};

  