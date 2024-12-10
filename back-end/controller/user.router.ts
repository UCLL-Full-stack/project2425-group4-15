/**
 * @swagger
 * components:
 *   schemas:
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User email.
 *         password:
 *           type: string
 *           description: User password.
 *
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user.
 *         token:
 *           type: string
 *           description: JWT token.
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID of the user.
 *         username:
 *           type: string
 *           description: Username of the user.
 *         email:
 *           type: string
 *           description: Email address of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user.
 *         email:
 *           type: string
 *           description: Email address of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();
//* Get all users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Een lijst van users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Fout bij het ophalen van user
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user account
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Successfully created a new user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user and return a JWT token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Successfully logged in and returned a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       400:
 *         description: Bad Request - Invalid username or password.
 *       500:
 *         description: Internal server error.
 */

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = req.body;
        const response = await userService.loginUser(userInput);

        res.status(200).json({
            message: 'login succesfull',
            ...response,
        });
    } catch (error) {
        next(error);
    }
});

export default userRouter;
