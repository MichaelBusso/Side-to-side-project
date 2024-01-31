const { pool } = require('./pool');

const getTodoByTodoId = async (todoId) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE id = ?',
      [todoId]
    );
    return rows[0];
  }

module.exports = {
  getAllTodosByUserId: async (userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE userId = ?',
      [userId]
    );
    return rows;
  },

  getTodosByCompleted: async (userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE userId = ? AND completed = 1',
      [userId]
    );
    return rows;
  },

  getTodosByNotCompleted: async (userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE userId = ? AND completed = 0',
      [userId]
    );
    return rows;
  },

  getTodosBySearch: async (userId, toSearch) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE userId = ? AND title LIKE ?',
      [userId, `%${toSearch}%`]
    );
    return rows;
  },

  addTodo: async (userId, title, completed = 0) => {
    const [rows] = await pool.query(
      'INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)',
      [userId, title, completed]
    );
    return rows.affectedRows ? getTodoByTodoId(rows.insertId) : null;
  },

  editTodoCompleted: async (todoId, completed) => {
    const [rows] = await pool.query(
      'UPDATE todos SET completed = ? WHERE id = ?',
      [completed, todoId]
    );
    return rows.affectedRows ? getTodoByTodoId(todoId) : null;
  },

  editTodoTitle: async (todoId, title) => {
    const [rows] = await pool.query(
      'UPDATE todos SET title = ? WHERE id = ?',
      [title, todoId]
    );
    return rows.affectedRows ? getTodoByTodoId(todoId) : null;
  },

  deleteTodo: async (todoId) => {
    const [rows] = await pool.query(
      'DELETE FROM todos WHERE id = ?',
      [todoId]
    );
    return rows.affectedRows ? rows : null;
  }
}