import reviewDB from '../repository/review.db';
import userDB from '../repository/user.db';
import { Review } from '../model/review';
import { ReviewInput } from '../types';
import { User } from '../model/user';

const createReview = async ({
    content,
    rating,
    userId,
    movieId,
    seriesId,
}: ReviewInput): Promise<Review> => {
    if (!movieId && !seriesId) {
        throw new Error('A review must be linked to a movie or a series.');
    }

    const user = await userDB.getUserById(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} does not exist.`);
    }

    const review = new Review({
        content,
        rating,
        userId,
        movieId: movieId ?? undefined,
        seriesId: seriesId ?? undefined,

        reviewDate: new Date(),
    });
    return await reviewDB.createReview(review);
};

const deleteReview = async (id: number, userId: number): Promise<void> => {
    // Retrieve the review to check its ownership
    const review = await reviewDB.getReviewById(id);

    if (!review) {
        throw new Error(`Review with ID ${id} does not exist.`);
    }

    // If validation passes, delete the review
    await reviewDB.deleteReview(id);
};

export default {
    createReview,
    deleteReview,
};
