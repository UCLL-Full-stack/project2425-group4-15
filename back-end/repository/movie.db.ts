import database from '../util/database';
import { Movie } from '../model/movie';

const getAllMovies = async (): Promise<Movie[]> => {
    try {
        const movies = await database.movie.findMany({
            include: {
                reviews: {
                    include: { user: true }, // Include reviews and their users
                },
            },
        });
        return movies.map((movie) => Movie.from(movie));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getMovieByTitle = async ({ title }: { title: string }): Promise<Movie | null> => {
    try {
        const movie = await database.movie.findFirst({
            where: { title },
            include: {
                reviews: {
                    include: { user: true },
                },
            },
        });
        return movie ? Movie.from(movie) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const createMovie = async (movie: Movie): Promise<Movie> => {
    try {
        const moviePrisma = await database.movie.create({
            data: {
                title: movie.getTitle(),
                genre: movie.getGenre(),
                releaseDate: movie.getReleaseDate(),
                cast: movie.getCast(),
                director: movie.getDirector(),
                coverPic: movie.getCoverPic() || '',
                description: movie.getDescription(),
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
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const deleteMovie = async (id: number): Promise<void> => {
    try {
        await database.movie.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default {
    getAllMovies,
    getMovieByTitle,
    deleteMovie,
    createMovie,
};
