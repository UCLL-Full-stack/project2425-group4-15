import { User } from './user';

export class Review {
    private id?: number;
    private content: string;
    private rating: number;
    private user: User;
    private reviewDate: Date;

    constructor(review: {
        id?: number;
        content: string;
        rating: number;
        user: User;
        reviewDate: Date;
    }) {
        this.validate(review);

        this.id = review.id;
        this.content = review.content;
        this.rating = review.rating;
        this.user = review.user;
        this.reviewDate = review.reviewDate;
    }

    validate(review: {
        id?: number;
        content: string;
        rating: number;
        user: User;
        reviewDate: Date;
    }) {
        if (review.rating < 0 || review.rating > 10) {
            throw new Error('Rating must be between 0-10.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getContent(): string {
        return this.content;
    }

    getRating(): number {
        return this.rating;
    }

    getUser(): User {
        return this.user;
    }

    getReviewDate(): Date {
        return this.reviewDate;
    }

    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.content === review.getContent() &&
            this.rating === review.getRating() &&
            this.user.getId() === review.getUser().getId() &&
            this.reviewDate.getTime() === review.getReviewDate().getTime()
        );
    }
}
