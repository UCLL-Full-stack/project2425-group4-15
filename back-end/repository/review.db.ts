import database from '../util/database';
import { Review } from '../model/review';

const getReviewById = async (id: number) => {
    return await database.review.findUnique({
        where: { id },
        include: {
            user: {
                select: { username: true }, // Only include the username
            },
        },
    });
};

const createReview = async (review: Review): Promise<Review> => {
    // Add debugging logs
    console.log('=== DEBUG INFO ===');
    console.log('Review data:', {
        content: review.getContent(),
        rating: review.getRating(),
        userId: review.getUserId(),
        movieId: review.getMovieId(),
        seriesId: review.getSeriesId(),
        reviewDate: review.getReviewDate(),
    });

    // Check what movies and series exist in the database
    const allMovies = await database.movie.findMany({
        select: { id: true, title: true },
    });
    const allSeries = await database.series.findMany({
        select: { id: true, title: true },
    });

    console.log('Available Movies:', allMovies);
    console.log('Available Series:', allSeries);

    // Check if user exists
    const user = await database.user.findUnique({
        where: { id: review.getUserId() },
        select: { id: true, username: true },
    });
    console.log('User found:', user);
    console.log('=== END DEBUG INFO ===');

    // Now try to create the review
    try {
        const reviewPrisma = await database.review.create({
            data: {
                content: review.getContent(),
                rating: review.getRating(),
                userId: review.getUserId(),
                movieId: review.getMovieId() ?? null,
                seriesId: review.getSeriesId() ?? null,
                reviewDate: review.getReviewDate(),
            },
            include: {
                user: {
                    select: { username: true },
                },
            },
        });

        return Review.from(reviewPrisma);
    } catch (error) {
        console.error('Error details:', error);
        throw error;
    }
};

const deleteReview = async (id: number): Promise<void> => {
    await database.review.deleteMany({
        where: {
            id,
        },
    });
};

export default {
    getReviewById,
    createReview,
    deleteReview,
};
