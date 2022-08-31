import {Router} from 'express';
import bodyParser from 'body-parser';
import {body} from 'express-validator';
import commentsController from '../controllers/commentsController.js';
import {controllerHandler as c} from '../util/controllerHandler.js';

const commentsRouter = Router();
const {json} = bodyParser;
commentsRouter.use(json());

// Tags

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: Comments Routes
 */

// Components

/**
 * @swagger
 * components:
 *  schemas:
 *    MappedUser:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Name of user
 *        picture:
 *          type: string
 *          description: Picture of user
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      properties:
 *        comment_id:
 *          type: integer
 *          description: Auto-generated id of comment
 *        user_id:
 *          type: integer
 *          description: Id of user who created the comment
 *        comment_text:
 *          type: string
 *          description: Text of the comment
 *        created_timestamp:
 *          type: string
 *          format: date-time
 *          description: Timestamp when comment was created
 *        voteCount:
 *          type: integer
 *          description: Number of votes comment received
 *        user:
 *          $ref: '#/components/schemas/MappedUser'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PostBodyComment:
 *      type: object
 *      required:
 *        - userId
 *        - commentText
 *      properties:
 *        userId:
 *          type: integer
 *          description: Id of user who created the comment
 *        commentText:
 *          type: string
 *          description: Text of the comment
 */

// Endpoints

/**
 * @swagger
 * /comments:
 *  get:
 *    summary: Get all comments
 *    tags: [Comments]
 *    responses:
 *      200:
 *        description: All comments
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Comment'
 */

commentsRouter.get('/', c(commentsController.getComments));

/**
 * @swagger
 * /comments:
 *  post:
 *    summary: Post a comment
 *    tags: [Comments]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostBodyComment'
 *    responses:
 *      201:
 *        description: Created comment
 */

commentsRouter.post('/',
    body('userId').exists().isInt(),
    body('commentText').exists().isString(),
    c(commentsController.postComment),
);

export default commentsRouter;
