import { Review } from './review';

export class Series {
    private id?: number;
    private title: string;
    private genre: string[];
    private releaseDate: Date;
    private cast: string[];
    private director: string;
    private seasons: number;
    private reviews: Review[];

    constructor(series: {
        id?: number;
        title: string;
        genre: string[];
        releaseDate: Date;
        cast: string[];
        director: string;
        seasons: number;
        reviews: Review[];
    }) {
        this.id = series.id;
        this.title = series.title;
        this.genre = series.genre;
        this.releaseDate = series.releaseDate;
        this.cast = series.cast;
        this.director = series.director;
        this.seasons = series.seasons;
        this.reviews = series.reviews || [];
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

    getSeasons(): number {
        return this.seasons;
    }

    addReview(review: Review): void {
        this.reviews.push(review);
    }

    getReviews(): Review[] {
        return this.reviews;
    }

    equals(series: Series): boolean {
        return (
            this.id === series.getId() &&
            this.title === series.getTitle() &&
            this.genre.length === series.getGenre.length &&
            this.genre.every((g, i) => g === series.getGenre()[i]) &&
            this.releaseDate.getTime() === series.releaseDate.getTime() &&
            this.cast.length === series.cast.length &&
            this.cast.every((c, i) => c === series.getCast()[i]) &&
            this.seasons === series.getSeasons() &&
            this.reviews.every((review, i) => review.equals(series.getReviews()[i]))
        );
    }
}
