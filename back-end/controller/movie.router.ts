import express, { NextFunction, Request, Response } from 'express';
import movieService from '../service/movie.service';
import { MovieInput } from '../types';

const movieRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         title:
 *           type: string
 *           description: Title of the movie.
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Genres of the movie.
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           description: Release date of the movie.
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *           description: List of actors in the movie.
 *         director:
 *           type: string
 *           description: Director of the movie.
 *         coverPic:
 *           type: string
 *           description: URL of the movie's cover picture.
 *         description:
 *           type: string
 *           description: Description of the movie.
 *
 *     MovieInput:
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
 *         coverPic:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Server error
 */
movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get detailed information about a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to fetch details for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Server error.
 */
movieRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const movie = await movieService.getMovieById(id);

        if (!movie) {
            res.status(404).json({ message: `Movie with ID ${id} not found.` });
            return;
        }

        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: The created movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid input
 *       402:
 *         description: Movie already exists
 *       500:
 *         description: Server error
 */
movieRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movieInput = <MovieInput>req.body;
        const newMovie = await movieService.createMovie(movieInput);
        res.status(200).json(newMovie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the movie to delete
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
movieRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await movieService.deleteMovie(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});
export default movieRouter;
