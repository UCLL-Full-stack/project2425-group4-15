// src/model/favorite.ts
import { User, Movie, Series } from '@prisma/client';

export class Favorite {
    private id: number;
    private userId: number;
    private movieId?: number;
    private seriesId?: number;
    private user?: User;
    private movie?: Movie;
    private series?: Series;

    constructor(
        id: number,
        userId: number,
        movieId?: number,
        seriesId?: number,
        user?: User,
        movie?: Movie,
        series?: Series
    ) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.seriesId = seriesId;
        this.user = user;
        this.movie = movie;
        this.series = series;
    }

    // A static factory method that takes the Prisma result and returns a Favorite instance
    static from(prismaFavorite: {
        id: number;
        userId: number;
        movieId?: number | null;
        seriesId?: number | null;
        user?: User;
        movie?: Movie;
        series?: Series;
    }): Favorite {
        return new Favorite(
            prismaFavorite.id,
            prismaFavorite.userId,
            prismaFavorite.movieId ?? undefined,
            prismaFavorite.seriesId ?? undefined,
            prismaFavorite.user,
            prismaFavorite.movie,
            prismaFavorite.series
        );
    }

    // Getters for encapsulation
    getId(): number {
        return this.id;
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

    getUser(): User | undefined {
        return this.user;
    }

    getMovie(): Movie | undefined {
        return this.movie;
    }

    getSeries(): Series | undefined {
        return this.series;
    }
}
