import database from '../util/database';
import { Movie } from '../model/movie';

const getAllMovies = async (): Promise<Movie[]> => {
    const movies = await database.movie.findMany({
        include: {
            reviews: {
                include: { user: true }, // Include reviews and their users
            },
        },
    });
    return movies.map((movie) => Movie.from(movie));
};

const getMovieById = async (id: number): Promise<Movie | null> => {
    const movie = await database.movie.findUnique({
        where: { id },
        include: {
            reviews: {
                include: { user: true },
            },
        },
    });
    return movie ? Movie.from(movie) : null;
};

const getMovieByTitle = async ({ title }: { title: string }): Promise<Movie | null> => {
    const movie = await database.movie.findFirst({
        where: { title },
        include: {
            reviews: {
                include: { user: true },
            },
        },
    });
    return movie ? Movie.from(movie) : null;
};

const createMovie = async (movie: Movie): Promise<Movie> => {
    const moviePrisma = await database.movie.create({
        data: {
            title: movie.getTitle(),
            genre: movie.getGenre(),
            releaseDate: movie.getReleaseDate(),
            cast: movie.getCast(),
            director: movie.getDirector(),
            reviews: {
                connect: movie.getReviews().map((review) => ({ id: review.getId() })),
            },
        },
        include: {
            reviews: {
                include: { user: true },
            },
        },
    });
    return Movie.from(moviePrisma);
};

const deleteMovie = async (id: number): Promise<void> => {
    await database.movie.delete({
        where: { id },
    });
};

export default {
    getAllMovies,
    getMovieById,
    getMovieByTitle,
    deleteMovie,
    createMovie,
};
