import movieDB from '../repository/movie.db';
import { Movie } from '../model/movie';
import { MovieInput } from '../types';

const getAllMovies = async (): Promise<Movie[]> => {
    return await movieDB.getAllMovies();
};

const getMovieById = async (id: number): Promise<Movie | null> => {
    const movie = await movieDB.getMovieById(id);
    if (!movie) {
        throw new Error(`Movie with ID ${id} not found.`);
    }
    return movie;
};

const createMovie = async ({
    title,
    genre,
    releaseDate,
    cast,
    director,
    coverPic,
    description,
}: MovieInput): Promise<Movie> => {
    const existingMovie = await movieDB.getMovieByTitle({ title });
    if (existingMovie) {
        throw new Error(`Movie already exists with this title: ${title}.`);
    }

    const movie = new Movie({
        title,
        genre,
        releaseDate: new Date(releaseDate),
        cast,
        director,
        coverPic,
        description,
        reviews: [],
    });
    return await movieDB.createMovie(movie);
};

const deleteMovie = async (id: number): Promise<void> => {
    if (!id) {
        throw new Error('Movie ID is required for deletion.');
    }
    return await movieDB.deleteMovie(id);
};

export default {
    getMovieById,
    getAllMovies,
    createMovie,
    deleteMovie,
};
