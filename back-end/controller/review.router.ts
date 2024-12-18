import express, { Request, Response, NextFunction } from 'express';
import reviewService from '../service/review.service';
import { ReviewInput } from '../types';

const reviewRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique ID of the review
 *         content:
 *           type: string
 *           description: Review content
 *         rating:
 *           type: number
 *           format: float
 *           description: Rating given to the movie/series (0-10)
 *         reviewDate:
 *           type: string
 *           format: date-time
 *           description: Date when the review was created
 *         userId:
 *           type: number
 *           description: ID of the user who wrote the review
 *         movieId:
 *           type: number
 *           nullable: true
 *           description: ID of the movie being reviewed (null if series)
 *         seriesId:
 *           type: number
 *           nullable: true
 *           description: ID of the series being reviewed (null if movie)
 *     ReviewInput:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: Review content
 *         rating:
 *           type: number
 *           format: float
 *           description: Rating for the movie/series (0-10)
 *         userId:
 *           type: number
 *           description: ID of the user writing the review
 *         movieId:
 *           type: number
 *           nullable: true
 *           description: ID of the movie being reviewed
 *         seriesId:
 *           type: number
 *           nullable: true
 *           description: ID of the series being reviewed
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
reviewRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewInput = <ReviewInput>req.body;
        const review = await reviewService.createReview(reviewInput);
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 description: ID of the user who wrote the review
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       403:
 *         description: Unauthorized to delete this review
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
reviewRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const { userId } = req.body;
        await reviewService.deleteReview(id, userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default reviewRouter;
