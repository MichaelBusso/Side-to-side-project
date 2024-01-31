const Joi = require('joi');

const userIdSchema = Joi.number().integer().positive().required();
const titleSchema = Joi.string().min(1).max(255).required();
const completedSchema = Joi.number().min(0).max(1).required();
const todoIdSchema = Joi.number().integer().positive().required();
const toSearchSchema = Joi.string().min(1).max(255).required();

const getTodosValidation = Joi.object({
  userId: userIdSchema,
});

const getTodosBySearchValidation = Joi.object({
  userId: userIdSchema,
  toSearch: toSearchSchema,
});

const addTodoValidation = Joi.object({
  userId: userIdSchema,
  title: titleSchema,
  completed: completedSchema,
});

const toggleCompletedValidation = Joi.object({
  todoId: todoIdSchema,
  completed: completedSchema,
});

const editTitleValidation = Joi.object({
  todoId: todoIdSchema,
  title: titleSchema,
});

const deleteTodoValidation = Joi.object({
  todoId: todoIdSchema,
});

module.exports = {
  getTodosValidation,
  getTodosBySearchValidation,
  addTodoValidation,
  toggleCompletedValidation,
  editTitleValidation,
  deleteTodoValidation,
};
