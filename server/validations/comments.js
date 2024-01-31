const Joi = require('joi');

const userIdSchema = Joi.number().integer().positive().required();
const postIdSchema = Joi.number().integer().positive().required();
const nameSchema = Joi.string().min(1).max(255).required();
const emailSchema = Joi.string().email().required();
const bodySchema = Joi.string().min(1).max(1000).required();
const commentIdSchema = Joi.number().integer().positive().required();

const getCommentsValidation = Joi.object({
  userId: userIdSchema,
  postId: postIdSchema,
});

const addCommentValidation = Joi.object({
  userId: userIdSchema,
  postId: postIdSchema,
  name: nameSchema,
  email: emailSchema,
  body: bodySchema,
});

const deleteCommentValidation = Joi.object({
  userId: userIdSchema,
  commentId: commentIdSchema,
});

module.exports = {
  getCommentsValidation,
  addCommentValidation,
  deleteCommentValidation,
};
