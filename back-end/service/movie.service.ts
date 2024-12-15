import movieDB from '../repository/movie.db';
import { Movie } from '../model/movie';
import { MovieInput } from '../types';

const getAllMovies = async (): Promise<Movie[]> => {
    return await movieDB.getAllMovies();
};

const getMovieById = async (id: number): Promise<Movie> => {
    const movie = await movieDB.getMovieById(id);
    if (!movie) {
        throw new Error('Movie is is required.');
    }
    return movie;
};

const createMovie = async ({
    title,
    genre,
    releaseDate,
    cast,
    director,
}: MovieInput): Promise<Movie> => {
    const existingMovie = await movieDB.getMovieByTitle({ title });
    if (existingMovie) {
        throw new Error(`Movie already exists with this title: ${title}.`);
    }

    const movie = new Movie({ title, genre, releaseDate, cast, director, reviews: [] });
    return await movieDB.createMovie(movie);
};

const deleteMovie = async (id: number): Promise<void> => {
    if (!id) {
        throw new Error('Movie ID is required for deletion.');
    }
    return await movieDB.deleteMovie(id);
};

export default {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
};
