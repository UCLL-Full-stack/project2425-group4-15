import { Review } from './review';
import { Series as SeriesPrisma, Review as ReviewPrisma, User as UserPrisma } from '@prisma/client';

export class Series {
    private id?: number;
    private title: string;
    private genre: string[];
    private releaseDate: Date;
    private cast: string[];
    private director: string;
    private seasons: number;
    private coverPic: string;
    private description: string;
    private reviews: Review[];

    constructor(series: {
        id?: number;
        title: string;
        genre: string[];
        releaseDate: Date;
        cast: string[];
        director: string;
        seasons: number;
        coverPic: string;
        description: string;
        reviews: Review[];
    }) {
        this.validate(series);

        this.id = series.id;
        this.title = series.title;
        this.genre = series.genre;
        this.releaseDate = series.releaseDate;
        this.cast = series.cast;
        this.director = series.director;
        this.seasons = series.seasons;
        this.coverPic = series.coverPic;
        this.description = series.description;
        this.reviews = series.reviews || [];
    }

    validate(series: {
        id?: number;
        title: string;
        genre: string[];
        releaseDate: Date;
        cast: string[];
        director: string;
        seasons: number;
        coverPic: string;
        description: string;
        reviews: Review[];
    }) {
        if (!series.title?.trim()) {
            throw new Error('Series title is required.');
        }
        if (series.genre.length < 1) {
            throw new Error('Atleast one genre is required.');
        }
        if (!series.releaseDate) {
            throw new Error('Release date is required.');
        }
        if (series.cast.length < 1) {
            throw new Error('Atleast one actor is required.');
        }
        if (!series.director?.trim()) {
            throw new Error('Director is required.');
        }
        if (series.seasons < 1) {
            throw new Error('Atlease one season is required.');
        }
        if (!series.coverPic?.trim()) {
            throw new Error('Cover picture is required.');
        }
        if (!series.description?.trim()) {
            throw new Error('Description is required.');
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

    getSeasons(): number {
        return this.seasons;
    }

    getCoverPic(): string {
        return this.coverPic;
    }

    getDescription(): string {
        return this.description;
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
            this.coverPic === series.getCoverPic() &&
            this.description === series.getDescription() &&
            this.reviews.every((review, i) => review.equals(series.getReviews()[i]))
        );
    }

    static from({
        id,
        title,
        genre,
        releaseDate,
        cast,
        director,
        seasons,
        coverPic,
        description,
        reviews,
    }: SeriesPrisma & { reviews: (ReviewPrisma & { user: UserPrisma })[] }) {
        return new Series({
            id,
            title,
            genre,
            releaseDate,
            cast,
            director,
            seasons,
            coverPic,
            description,
            reviews: reviews.map((review) => Review.from(review)),
        });
    }
}
