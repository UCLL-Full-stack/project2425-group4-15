type UserInput = {
    username: string;
    email: string;
    password: string;
};

type AuthenticationResponse = {
    username: string;
    token: string;
};

export { UserInput, AuthenticationResponse };
