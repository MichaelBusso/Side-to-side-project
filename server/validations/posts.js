const Joi = require('joi');

const userIdSchema = Joi.number().integer().positive().required();
const titleSchema = Joi.string().min(1).max(255).required();
const bodySchema = Joi.string().min(1).max(1000).required();
const postIdSchema = Joi.number().integer().positive().required();

const getPostsValidation = Joi.object({
  userId: userIdSchema,
});

const getPostByTitleSearchValidation = Joi.object({
  userId: userIdSchema,
  toSearch: Joi.string().min(1).max(255).required(),
});

const getPostByBodySearchValidation = Joi.object({
  userId: userIdSchema,
  toSearch: Joi.string().min(1).max(1000).required(),
});

const addPostValidation = Joi.object({
  userId: userIdSchema,
  title: titleSchema,
  body: bodySchema,
});

const editPostValidation = Joi.object({
  userId: userIdSchema,
  postId: postIdSchema,
  title: titleSchema,
  body: bodySchema,
});

const deletePostValidation = Joi.object({
  userId: userIdSchema,
  postId: postIdSchema,
});

module.exports = {
  getPostsValidation,
  getPostByTitleSearchValidation,
  getPostByBodySearchValidation,
  addPostValidation,
  editPostValidation,
  deletePostValidation,
};
