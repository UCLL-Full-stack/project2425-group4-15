import { User } from './user';
import { Review as ReviewPrisma, User as UserPrisma } from '@prisma/client';

export class Review {
    private id?: number;
    private content: string;
    private rating: number;
    private userId: number;
    private movieId?: number;
    private seriesId?: number;
    private reviewDate: Date;

    constructor(review: {
        id?: number;
        content: string;
        rating: number;
        userId: number;
        movieId?: number;
        seriesId?: number;
        reviewDate: Date;
    }) {
        this.validate(review);

        this.id = review.id;
        this.content = review.content;
        this.rating = review.rating;
        this.userId = review.userId;
        this.movieId = review.movieId;
        this.seriesId = review.seriesId;
        this.reviewDate = review.reviewDate;
    }

    validate(review: { rating: number }) {
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

    getUserId(): number {
        return this.userId;
    }

    getMovieId(): number | undefined {
        return this.movieId;
    }

    getSeriesId(): number | undefined {
        return this.seriesId;
    }

    getReviewDate(): Date {
        return this.reviewDate;
    }

    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.content === review.getContent() &&
            this.rating === review.getRating() &&
            this.userId === review.getUserId() &&
            this.reviewDate.getTime() === review.getReviewDate().getTime()
        );
    }

    static from({
        id,
        content,
        rating,
        userId,
        movieId,
        seriesId,
        reviewDate,
    }: ReviewPrisma): Review {
        return new Review({
            id,
            content,
            rating,
            userId,
            movieId: movieId ?? undefined,
            seriesId: seriesId ?? undefined,
            reviewDate,
        });
    }
}
