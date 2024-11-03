import { Review } from './review';

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
        this.id = movie.id;
        this.title = movie.title;
        this.genre = movie.genre;
        this.releaseDate = movie.releaseDate;
        this.cast = movie.cast;
        this.director = movie.director;
        this.reviews = movie.reviews || [];
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
}
