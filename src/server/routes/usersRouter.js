const {Router} = require('express');
const bodyParser = require('body-parser');
const {body} = require('express-validator');
const {convertUndefinedToNull} = require('../util/sanitizers.js');
const usersController = require('../controllers/usersController.js');
const {controllerHandler: c} = require('../util/controllerHandler.js');

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
 *        userId:
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
 *      200:
 *        description: Created user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */

usersRouter.post('/',
    body('name').exists().isString(),
    body('picture').customSanitizer(convertUndefinedToNull),
    c(usersController.createUser),
);

module.exports = usersRouter;
