import {validationResult} from 'express-validator';
import commentsService from '../services/commentsService.js';

const getComments = async (req, res) => {
  res.json(await commentsService.getComments());
};

const postComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const reqBody = req.body;
  console.debug(reqBody);
  await commentsService.postComment(reqBody);
  res.sendStatus(201);
};

export default {
  getComments,
  postComment,
};
