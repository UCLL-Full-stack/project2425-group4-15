export class User {
    private static users: User[] = [];
    private id?: number;
    private username: string;
    private email: string;
    private password: string;

    constructor(user: { id?: number; username: string; email: string; password: string }) {
        this.validatie(user);

        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;

        User.users.push(this);
    }
    validatie(user: { id?: number; username: string; email: string; password: string }) {
        // field validaton:
        if (!user.username?.trim()) {
            throw new Error('Username is required.');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required.');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required.');
        }
        //pw lenght
        if (user.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        // uniqueness validation
        // Uniqueness validation
        if (User.users.some((existingUser) => existingUser.username === user.username)) {
            throw new Error('Username must be unique.');
        }
        if (User.users.some((existingUser) => existingUser.email === user.email)) {
            throw new Error('Email must be unique.');
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
}
