import { User as UserPrisma } from '@prisma/client';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;

    constructor(user: { id?: number; username: string; email: string; password: string }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }
    validate(user: { id?: number; username: string; email: string; password: string }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required.');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required.');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        );
    }

    static from({ id, username, email, password }: UserPrisma) {
        return new User({
            id,
            username,
            email,
            password,
        });
    }
}
