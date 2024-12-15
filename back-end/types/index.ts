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
};

export { UserInput, AuthenticationResponse, MovieInput };
