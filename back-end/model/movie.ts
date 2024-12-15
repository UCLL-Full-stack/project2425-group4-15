import { Review } from './review';
import { Movie as MoviePrisma, Review as ReviewPrisma, User as UserPrisma } from '@prisma/client';

export class Movie {
    private id?: number;
    private title: string;
    private genre: string[];
    private releaseDate: Date;
    private cast: string[];
    private director: string;
    private reviews: Review[];

    constructor(movie: {
        id?: number;
        title: string;
        genre: string[];
        releaseDate: Date;
        cast: string[];
        director: string;
        reviews: Review[];
    }) {
        this.validate(movie);

        this.id = movie.id;
        this.title = movie.title;
        this.genre = movie.genre;
        this.releaseDate = movie.releaseDate;
        this.cast = movie.cast;
        this.director = movie.director;
        this.reviews = movie.reviews || [];
    }

    validate(movie: {
        id?: number;
        title: string;
        genre: string[];
        releaseDate: Date;
        cast: string[];
        director: string;
        reviews: Review[];
    }) {
        if (!movie.title?.trim()) {
            throw new Error('Movie title is required.');
        }
        if (movie.genre.length < 1) {
            throw new Error('Atleast one genre is required.');
        }
        if (!movie.releaseDate) {
            throw new Error('Release date is required.');
        }
        if (movie.cast.length < 1) {
            throw new Error('Atleast one actor is required.');
        }
        if (!movie.director?.trim()) {
            throw new Error('Director is required.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getGenre(): string[] {
        return this.genre;
    }

    getReleaseDate(): Date {
        return this.releaseDate;
    }

    getCast(): string[] {
        return this.cast;
    }

    getDirector(): string {
        return this.director;
    }

    addReview(review: Review): void {
        this.reviews.push(review);
    }

    getReviews(): Review[] {
        return this.reviews;
    }

    equals(movie: Movie): boolean {
        return (
            this.id === movie.getId() &&
            this.title === movie.getTitle() &&
            this.genre.length === movie.getGenre.length &&
            this.genre.every((g, i) => g === movie.getGenre()[i]) &&
            this.releaseDate.getTime() === movie.releaseDate.getTime() &&
            this.cast.length === movie.cast.length &&
            this.cast.every((c, i) => c === movie.getCast()[i]) &&
            this.reviews.every((review, i) => review.equals(movie.getReviews()[i]))
        );
    }

    static from({
        id,
        title,
        genre,
        releaseDate,
        cast,
        director,
        reviews,
    }: MoviePrisma & { reviews: (ReviewPrisma & { user: UserPrisma })[] }) {
        return new Movie({
            id,
            title,
            genre,
            releaseDate,
            cast,
            director,
            reviews: reviews.map((review) => Review.from(review)),
        });
    }
}
