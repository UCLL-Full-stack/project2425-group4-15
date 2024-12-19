import express, { NextFunction, Request, Response } from 'express';
import seriesService from '../service/series.service';
import { SeriesInput } from '../types';

const seriesRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Series:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         title:
 *           type: string
 *           description: Title of the series.
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Genres of the series.
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           description: Release date of the series.
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *           description: List of actors in the series.
 *         director:
 *           type: string
 *           description: Director of the series.
 *         seasons:
 *           type: integer
 *           description: Number of seasons.
 *         coverPic:
 *           type: string
 *           description: URL of the series' cover picture.
 *         description:
 *           type: string
 *           description: Description of the series.
 *
 *     SeriesInput:
 *       type: object
 *       properties:
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
 *           type: integer
 *         coverPic:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /series:
 *   get:
 *     summary: Get all series
 *     tags: [Series]
 *     responses:
 *       200:
 *         description: A list of series
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Series'
 *       500:
 *         description: Server error
 */
seriesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const series = await seriesService.getAllSeries();
        res.status(200).json(series);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /series/{id}:
 *   get:
 *     summary: Get detailed information about a series by ID
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to fetch details for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the series.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       404:
 *         description: Series not found.
 *       500:
 *         description: Server error.
 */
seriesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const movie = await seriesService.getSeriesById(id);

        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /series:
 *   post:
 *     summary: Create a new series
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeriesInput'
 *     responses:
 *       200:
 *         description: The created series
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       400:
 *         description: Invalid input
 *       402:
 *         description: Series already exists
 *       500:
 *         description: Server error
 */
seriesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const seriesInput = <SeriesInput>req.body;
        const newSeries = await seriesService.createSeries(seriesInput);
        res.status(200).json(newSeries);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /series/{id}:
 *   delete:
 *     summary: Delete a series by ID
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the series to delete
 *     responses:
 *       200:
 *         description: Series deleted successfully
 *       400:
 *         description: Series not found
 *       500:
 *         description: Server error
 */
seriesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await seriesService.deleteSeries(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default seriesRouter;
