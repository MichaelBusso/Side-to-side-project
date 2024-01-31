const express = require('express');
const postsRoute = express.Router();
const { getAllPosts, getPostByTitleSearch, getPostByBodySearch, addPost, editPost, deletePost } = require('../db/posts');
const { getPostsValidation, getPostByTitleSearchValidation, getPostByBodySearchValidation, addPostValidation, editPostValidation, deletePostValidation } = require('../validations/posts');

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

postsRoute.get('/:userId', requireUser, async (req, res) => {
  const { userId } = req.params;
  try {
    const { error } = getPostsValidation.validate({ userId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getAllPosts();
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

postsRoute.get('/:userId/search/title', requireUser, async (req, res) => {
  const { userId } = req.params;
  const { toSearch } = req.query;
  try {
    const { error } = getPostByTitleSearchValidation.validate({ userId, toSearch });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getPostByTitleSearch(toSearch);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

postsRoute.get('/:userId/search/body', requireUser, async (req, res) => {
  const { userId } = req.params;
  const { toSearch } = req.query;
  try {
    const { error } = getPostByBodySearchValidation.validate({ userId, toSearch });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getPostByBodySearch(toSearch);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

postsRoute.post('/:userId', requireUser, async (req, res) => {
  const { userId, title, body } = req.body;
  try {
    const { error } = addPostValidation.validate({ userId, title, body });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await addPost(userId, title, body);
    if (!result) {
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

postsRoute.put('/:userId/edit-post', requireUser, async (req, res) => {
  const { userId, postId, title, body } = req.body;
  try {
    const { error } = editPostValidation.validate({ userId, postId, title, body });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await editPost(userId, postId, title, body);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

postsRoute.delete('/:userId', requireUser, async (req, res) => {
  const { userId, postId } = req.query;
  try {
    const { error } = deletePostValidation.validate({ userId, postId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await deletePost(userId, postId);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(204).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = postsRoute;
