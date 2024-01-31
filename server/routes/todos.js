const express = require("express");
const todosRoute = express.Router();
const { getAllTodosByUserId, getTodosByCompleted, getTodosByNotCompleted, getTodosBySearch, addTodo, editTodoCompleted, editTodoTitle, deleteTodo } = require('../db/todos');
const { getTodosValidation, getTodosBySearchValidation, addTodoValidation, toggleCompletedValidation, editTitleValidation, deleteTodoValidation } = require('../validations/todos');

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

todosRoute.get('/:userId', requireUser, async (req, res) => {
  const { userId } = req.params;
  try {
    const { error } = getTodosValidation.validate({ userId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getAllTodosByUserId(userId);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

todosRoute.get('/:userId/completed', requireUser, async (req, res) => {
  const { userId } = req.params;
  try {
    const { error } = getTodosValidation.validate({ userId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getTodosByCompleted(userId);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

todosRoute.get('/:userId/not-completed', requireUser, async (req, res) => {
  const { userId } = req.params;
  try {
    const { error } = getTodosValidation.validate({ userId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getTodosByNotCompleted(userId);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

todosRoute.get('/:userId/search/:toSearch', requireUser, async (req, res) => {
  const { userId, toSearch } = req.params;
  try {
    const { error } = getTodosBySearchValidation.validate({ userId, toSearch });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await getTodosBySearch(userId, toSearch);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

todosRoute.post('/:userId', requireUser, async (req, res) => {
  const { userId, title, completed } = req.body;
  try {
    const { error } = addTodoValidation.validate({ userId, title, completed });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await addTodo(userId, title, completed);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(201).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

todosRoute.put('/:userId/toggle-completed', requireUser, async (req, res) => {
  const { todoId, completed } = req.body;
  try {
    const { error } = toggleCompletedValidation.validate({ todoId, completed });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await editTodoCompleted(todoId, !completed);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

todosRoute.put('/:userId/edit-title', requireUser, async (req, res) => {
  const { todoId, title } = req.body;
  try {
    const { error } = editTitleValidation.validate({ todoId, title });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await editTodoTitle(todoId, title);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

todosRoute.delete('/:userId/:todoId', requireUser, async (req, res) => {
  const { todoId } = req.params;
  try {
    const { error } = deleteTodoValidation.validate({ todoId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await deleteTodo(todoId);
    if (!result) {
      return res.status(404).send('Not Found');
    }
    res.status(204).json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = todosRoute;