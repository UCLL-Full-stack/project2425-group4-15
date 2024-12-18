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

export { UserInput, AuthenticationResponse, MovieInput, SeriesInput };
