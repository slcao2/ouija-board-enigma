import {Router} from 'express';
import bodyParser from 'body-parser';
import {body, validationResult} from 'express-validator';
import userDAO from '../dao/userDAO.js';
import {convertUndefinedToNull} from '../util/sanitizers.js';

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

usersRouter.get('/', async (req, res) => {
  try {
    res.json(await userDAO.getUsers());
  } catch (error) {
    res.status(500).send(error);
  }
});

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

usersRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const user = await userDAO.getUser(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send(`User ${id} does not exist.`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

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
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
        const reqBody = req.body;
        console.debug(reqBody);
        await userDAO.createUser(reqBody);
        res.sendStatus(201);
      } catch (error) {
        res.status(500).send(error);
      }
    },
);

export default usersRouter;
