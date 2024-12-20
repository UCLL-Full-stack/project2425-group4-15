// src/controllers/favorites.controller.ts
import express, { Request, Response, NextFunction } from 'express';
import favoriteService from '../service/favorite.service';
const favoritesRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the favorite entry.
 *         userId:
 *           type: number
 *           description: ID of the user who favorited the movie/series.
 *         movieId:
 *           type: number
 *           nullable: true
 *           description: ID of the movie if this is a movie favorite.
 *         seriesId:
 *           type: number
 *           nullable: true
 *           description: ID of the series if this is a series favorite.
 *         user:
 *           type: object
 *           description: The user who favorited.
 *           properties:
 *             id:
 *               type: number
 *             username:
 *               type: string
 *             email:
 *               type: string
 *         movie:
 *           $ref: '#/components/schemas/Movie'
 *         series:
 *           $ref: '#/components/schemas/Series'
 *
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *         releaseDate:
 *           type: string
 *           format: date-time
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *         director:
 *           type: string
 *         coverPic:
 *           type: string
 *         description:
 *           type: string
 *
 *     Series:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *         releaseDate:
 *           type: string
 *           format: date-time
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *         director:
 *           type: string
 *         seasons:
 *           type: number
 *         coverPic:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Endpoints for managing user favorites
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorites for the logged-in user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       401:
 *         description: Unauthorized (no valid token provided)
 *       500:
 *         description: Internal server error.
 */
favoritesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Assume userId is available (e.g. set by auth middleware)
        const userId = (req as any).userId as number;
        const favorites = await favoriteService.getUserFavorites(userId);
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /favorites/movies/{movieId}:
 *   post:
 *     summary: Add a movie to the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Bad Request (e.g., movie does not exist or already favorited)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
favoritesRouter.post(
    '/movies/:movieId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = 1;
            const movieId = parseInt(req.params.movieId, 10);
            const favorite = await favoriteService.addMovieToFavorites(userId, movieId);
            res.status(200).json(favorite);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /favorites/movies/{movieId}:
 *   delete:
 *     summary: Remove a movie from the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Movie removed from favorites
 *       400:
 *         description: Bad Request (e.g., favorite not found)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
favoritesRouter.delete(
    '/movies/:movieId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).userId as number;
            const movieId = parseInt(req.params.movieId, 10);
            await favoriteService.removeMovieFromFavorites(userId, movieId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /favorites/series/{seriesId}:
 *   post:
 *     summary: Add a series to the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: seriesId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Series added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Bad Request (e.g., series does not exist or already favorited)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
favoritesRouter.post(
    '/series/:seriesId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).userId as number;
            const seriesId = parseInt(req.params.seriesId, 10);
            const favorite = await favoriteService.addSeriesToFavorites(userId, seriesId);
            res.status(200).json(favorite);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /favorites/series/{seriesId}:
 *   delete:
 *     summary: Remove a series from the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: seriesId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Series removed from favorites
 *       400:
 *         description: Bad Request (e.g., favorite not found)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error.
 */
favoritesRouter.delete(
    '/series/:seriesId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).userId as number;
            const seriesId = parseInt(req.params.seriesId, 10);
            await favoriteService.removeSeriesFromFavorites(userId, seriesId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);

export default favoritesRouter;
