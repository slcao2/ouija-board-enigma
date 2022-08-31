import {Router} from 'express';
import bodyParser from 'body-parser';
import {body} from 'express-validator';
import {convertUndefinedToNull} from '../util/sanitizers.js';
import usersController from '../controllers/usersController.js';
import {controllerHandler as c} from '../util/controllerHandler.js';

const usersRouter = Router();
const {json} = bodyParser;
usersRouter.use(json());

// Tag

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users Routes
 */

// Components

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        user_id:
 *          type: integer
 *          description: Auto-generated id of user
 *        name:
 *          type: string
 *          description: Name of user
 *        picture:
 *          type: string
 *          description: Url of user profile picture
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PostBodyUser:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: Name of user
 *        picture:
 *          type: string
 *          description: Url of user profile picture
 */

// Endpoints

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: All users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

usersRouter.get('/', c(usersController.getUsers));

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Get a user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: User by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: No user exists by that id
 *        content:
 *          text/html:
 *            schema:
 *              type: string
 */

usersRouter.get('/:id', c(usersController.getUser));

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostBodyUser'
 *    responses:
 *      201:
 *        description: Created user
 */

usersRouter.post('/',
    body('name').exists().isString(),
    body('picture').customSanitizer(convertUndefinedToNull),
    c(usersController.createUser),
);

export default usersRouter;
