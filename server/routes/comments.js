const express = require('express');
const commentsRoute = express.Router();
const { getCommentsByPostId, addComment, deleteComment } = require('../db/comments');
const { getCommentsValidation, addCommentValidation, deleteCommentValidation } = require('../validations/comments');

const requireUser = (req, res, next) => {
  if (!req.user || req.user[0].id != req.params.userId) {
    return res.status(401).send();
  }
  next();
};

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).send('Internal Server Error');
};

commentsRoute.get('/:userId/:postId', requireUser, async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const { error } = getCommentsValidation.validate({ userId, postId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getCommentsByPostId(postId);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

commentsRoute.post('/:userId', requireUser, async (req, res) => {
  const { userId, postId, name, email, body } = req.body;
  try {
    const { error } = addCommentValidation.validate({ userId, postId, name, email, body });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await addComment(postId, name, email, body);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(201).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

commentsRoute.delete('/:userId', requireUser, async (req, res) => {
  const { userId, commentId } = req.query;
  try {
    const { error } = deleteCommentValidation.validate({ userId, commentId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await deleteComment(commentId);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(204).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = commentsRoute;
