import {Router} from 'express';
import bodyParser from 'body-parser';
import voteDAO from '../dao/voteDAO.js';

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
 *        vote_id:
 *          type: integer
 *          description: Auto-generated id of vote
 *        user_id:
 *          type: integer
 *          description: Id of the user who voted
 *        comment_id:
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

votesRouter.get('/', async (req, res) => {
  try {
    res.json(await voteDAO.getVotes());
  } catch (error) {
    res.status(500).send(error);
  }
});

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

votesRouter.delete('/users/:userId/comments/:commentId', async (req, res) => {
  try {
    const {userId, commentId} = req.params;
    await voteDAO.deleteVote(userId, commentId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

votesRouter.put('/users/:userId/comments/:commentId', async (req, res) => {
  try {
    const {userId, commentId} = req.params;
    await voteDAO.putVote(userId, commentId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default votesRouter;
