import database from '../util/database';
import { Review } from '../model/review';

const getReviewById = async (id: number) => {
    return await database.review.findUnique({
        where: { id },
    });
};

const createReview = async ({
    content,
    rating,
    userId,
    movieId,
    seriesId,
}: {
    content: string;
    rating: number;
    userId: number;
    movieId?: number;
    seriesId?: number;
}): Promise<Review> => {
    const reviewPrisma = await database.review.create({
        data: {
            content,
            rating,
            userId,
            movieId,
            seriesId,
        },
        include: {
            user: true,
        },
    });
    return Review.from(reviewPrisma);
};

const deleteReview = async (id: number, userId: number): Promise<void> => {
    await database.review.deleteMany({
        where: {
            id,
            userId, // Only allow deleting own reviews
        },
    });
};

export default {
    getReviewById,
    createReview,
    deleteReview,
};
