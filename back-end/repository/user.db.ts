import { User } from '../model/user';
import database from '../util/database';

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await database.user.findMany();
        return users.map((user) => User.from(user));
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

const createUser = async ({ username, email, password }: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: { username, email, password },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
};
