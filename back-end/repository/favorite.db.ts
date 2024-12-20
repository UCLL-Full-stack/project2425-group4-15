// src/repositories/favorites.repository.ts
import database from '../util/database';
import { Favorite } from '../model/favorite';

const addMovieToFavorites = async (userId: number, movieId: number): Promise<Favorite> => {
    try {
        const favoritePrisma = await database.favorite.create({
            data: { userId, movieId },
            include: { user: true, movie: true, series: true },
        });
        return Favorite.from({
            ...favoritePrisma,
            movie: favoritePrisma.movie ?? undefined,
            series: favoritePrisma.series ?? undefined,
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const addSeriesToFavorites = async (userId: number, seriesId: number): Promise<Favorite> => {
    try {
        const favoritePrisma = await database.favorite.create({
            data: { userId, seriesId },
            include: { user: true, movie: true, series: true },
        });
        return Favorite.from({
            ...favoritePrisma,
            movie: favoritePrisma.movie ?? undefined,
            series: favoritePrisma.series ?? undefined,
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const removeMovieFromFavorites = async (userId: number, movieId: number): Promise<void> => {
    try {
        await database.favorite.deleteMany({
            where: { userId, movieId },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const removeSeriesFromFavorites = async (userId: number, seriesId: number): Promise<void> => {
    try {
        await database.favorite.deleteMany({
            where: { userId, seriesId },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getUserFavorites = async (userId: number): Promise<Favorite[]> => {
    try {
        const favoritesPrisma = await database.favorite.findMany({
            where: { userId },
            include: { user: true, movie: true, series: true },
        });
        return favoritesPrisma.map((fav) =>
            Favorite.from({
                ...fav,
                movie: fav.movie ?? undefined,
                series: fav.series ?? undefined,
            })
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default {
    addMovieToFavorites,
    addSeriesToFavorites,
    removeMovieFromFavorites,
    removeSeriesFromFavorites,
    getUserFavorites,
};
