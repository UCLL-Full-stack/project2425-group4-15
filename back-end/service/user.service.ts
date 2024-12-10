import userDB from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt, { hash } from 'bcrypt';
import generateJwtToken from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return await userDB.getAllUsers();
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User> => {
    const user = await userDB.getUserByEmail({ email });
    if (!user) {
        throw new Error(`User with email: ${email} does not exist.`);
    }
    return user;
};

const createUser = async ({ username, email, password }: UserInput): Promise<User> => {
    //check if user already exists
    const existingUser = await userDB.getUserByEmail({ email });
    if (existingUser) {
        throw new Error(`User already exists with this email: ${email}.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    return await userDB.createUser(user);
};

const loginUser = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    // check user exists with mail
    const user = await userDB.getUserByEmail({ email });
    if (!user) {
        throw new Error('Email or password is incorrect.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Email or password is incorrect.');
    }
    const token = generateJwtToken({ email });

    return {
        username: user.username,
        token: token,
    };
};

export default {
    getAllUsers,
    getUserByEmail,
    createUser,
    loginUser,
};
