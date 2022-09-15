const {Router} = require('express');
const bodyParser = require('body-parser');
const {controllerHandler: c} = require('../util/controllerHandler.js');
const votesController = require('../controllers/votesController.js');

const votesRouter = Router();
const {json} = bodyParser;
votesRouter.use(json());

// Tag

/**
 * @swagger
 * tags:
 *  name: Votes
 *  description: Votes Routes
 */

// Components

/**
 * @swagger
 * components:
 *  schemas:
 *    Vote:
 *      type: object
 *      properties:
 *        voteId:
 *          type: integer
 *          description: Auto-generated id of vote
 *        userId:
 *          type: integer
 *          description: Id of the user who voted
 *        commentId:
 *          type: integer
 *          description: Id of comment that was voted on
 */

// Endpoints

/**
 * @swagger
 * /votes:
 *  get:
 *    summary: Get all votes
 *    tags: [Votes]
 *    responses:
 *      200:
 *        description: All votes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Vote'
 */

votesRouter.get('/', c(votesController.getVotes));

/**
 * @swagger
 * /votes/users/{userId}/comments/{commentId}:
 *  delete:
 *    summary: Delete a vote by user id and comment id
 *    tags: [Votes]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: Numeric ID of the user
 *        schema:
 *          type: integer
 *      - in: path
 *        name: commentId
 *        required: true
 *        description: Numeric ID of the comment
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: Successfully deleted vote
 */

votesRouter.delete(
    '/users/:userId/comments/:commentId',
    c(votesController.deleteVote),
);

/**
 * @swagger
 * /votes/users/{userId}/comments/{commentId}:
 *  put:
 *    summary: Put a vote by user id and comment id
 *    tags: [Votes]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: Numeric ID of the user
 *        schema:
 *          type: integer
 *      - in: path
 *        name: commentId
 *        required: true
 *        description: Numeric ID of the comment
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: Successfully put vote
 */

votesRouter.put(
    '/users/:userId/comments/:commentId',
    c(votesController.putVote),
);

module.exports = votesRouter;
