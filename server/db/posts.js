const { pool } = require('./pool');

const getPostByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT * FROM posts WHERE id = ?',
    [postId]
  );
  return rows[0];
};

module.exports = {
  getAllPosts: async () => {
    const [rows] = await pool.query('SELECT * FROM posts');
    return rows;
  },

  getPostByTitleSearch: async (toSearch) => {
    const [rows] = await pool.query(
      'SELECT * FROM posts WHERE title LIKE ?',
      [`%${toSearch}%`]
    );
    return rows;
  },

  getPostByBodySearch: async (toSearch) => {
    const [rows] = await pool.query(
      'SELECT * FROM posts WHERE body LIKE ?',
      [`%${toSearch}%`]
    );
    return rows;
  },

  addPost: async (userId, title, body) => {
    const [rows] = await pool.query(
      'INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)',
      [userId, title, body]
    );
    return rows.affectedRows ? getPostByPostId(rows.insertId) : null;
  },

  editPost: async (userId, postId, title, body) => {
    const [rows] = await pool.query(
      'UPDATE posts SET title = ?, body = ? WHERE id = ? AND userId = ?',
      [title, body, postId, userId]
    );
    return rows.affectedRows ? getPostByPostId(postId) : null;
  },

  deletePost: async (userId, postId) => {
    const [rows] = await pool.query(
      'DELETE FROM posts WHERE id = ? AND userId = ?',
      [postId, userId]
    );
    return rows.affectedRows ? rows : null;
  },
}