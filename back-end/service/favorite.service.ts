// src/services/favorites.service.ts
import database from '../util/database';
import favoriteDb from '../repository/favorite.db';
import { Favorite } from '../model/favorite';

const addMovieToFavorites = async (userId: number, movieId: number): Promise<Favorite> => {
    const movieExists = await database.movie.findFirst({ where: { id: movieId } });
    if (!movieExists) {
        throw new Error('Movie does not exist.');
    }

    const alreadyFavorited = await database.favorite.findFirst({
        where: { userId, movieId },
    });

    if (alreadyFavorited) {
        throw new Error('Movie already favorited.');
    }

    return favoriteDb.addMovieToFavorites(userId, movieId);
};

const addSeriesToFavorites = async (userId: number, seriesId: number): Promise<Favorite> => {
    const seriesExists = await database.series.findFirst({ where: { id: seriesId } });
    if (!seriesExists) {
        throw new Error('Series does not exist.');
    }

    const alreadyFavorited = await database.favorite.findFirst({
        where: { userId, seriesId },
    });

    if (alreadyFavorited) {
        throw new Error('Series already favorited.');
    }

    return favoriteDb.addSeriesToFavorites(userId, seriesId);
};

const removeMovieFromFavorites = async (userId: number, movieId: number): Promise<void> => {
    const fav = await database.favorite.findFirst({ where: { userId, movieId } });
    if (!fav) {
        throw new Error('Favorite not found.');
    }

    await favoriteDb.removeMovieFromFavorites(userId, movieId);
};

const removeSeriesFromFavorites = async (userId: number, seriesId: number): Promise<void> => {
    const fav = await database.favorite.findFirst({ where: { userId, seriesId } });
    if (!fav) {
        throw new Error('Favorite not found.');
    }

    await favoriteDb.removeSeriesFromFavorites(userId, seriesId);
};

const getUserFavorites = async (userId: number): Promise<Favorite[]> => {
    return favoriteDb.getUserFavorites(userId);
};

export default {
    addMovieToFavorites,
    addSeriesToFavorites,
    removeMovieFromFavorites,
    removeSeriesFromFavorites,
    getUserFavorites,
};
