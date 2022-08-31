import {Router} from 'express';
import bodyParser from 'body-parser';
import {body, validationResult} from 'express-validator';
import commentDAO from '../dao/commentDAO.js';

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

commentsRouter.get('/', async (req, res) => {
  try {
    res.json(await commentDAO.getComment());
  } catch (error) {
    res.status(500).send(error);
  }
});

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
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
        const reqBody = req.body;
        console.debug(reqBody);
        await commentDAO.postComment(reqBody);
        res.sendStatus(201);
      } catch (error) {
        res.status(500).send(error);
      }
    },
);

export default commentsRouter;
