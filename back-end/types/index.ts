type UserInput = {
    username: string;
    email: string;
    password: string;
};

type AuthenticationResponse = {
    username: string;
    token: string;
};

type MovieInput = {
    title: string;
    genre: string[];
    releaseDate: Date;
    cast: string[];
    director: string;
    coverPic: string;
    description: string;
};

type SeriesInput = {
    title: string;
    genre: string[];
    releaseDate: Date;
    cast: string[];
    director: string;
    seasons: number;
    coverPic: string;
    description: string;
};

type ReviewInput = {
    content: string;
    rating: number;
    userId: number;
    movieId?: number; // Optional because a review can be for a movie OR a series
    seriesId?: number; // Optional because a review can be for a series OR a movie
};

export { UserInput, AuthenticationResponse, MovieInput, SeriesInput, ReviewInput };
