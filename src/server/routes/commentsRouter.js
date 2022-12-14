const {Router} = require('express');
const bodyParser = require('body-parser');
const {body} = require('express-validator');
const commentsController = require('../controllers/commentsController.js');
const {controllerHandler: c} = require('../util/controllerHandler.js');
const {convertUndefinedToNull} = require('../util/sanitizers.js');

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
 *        commentId:
 *          type: integer
 *          description: Auto-generated id of comment
 *        commentText:
 *          type: string
 *          description: Text of the comment
 *        elapsedTime:
 *          type: string
 *          description: Elapsed time since comment was created
 *        voteCount:
 *          type: integer
 *          description: Number of votes comment received
 *        parentCommentId:
 *          type: integer
 *          description: Id of parent comment
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
 *        parentCommentId:
 *          type: integer
 *          description: Id of parent comment
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
    body('parentCommentId').customSanitizer(convertUndefinedToNull),
    c(commentsController.postComment),
);

module.exports = commentsRouter;
