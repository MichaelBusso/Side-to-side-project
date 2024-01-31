const { pool } = require('./pool');

const getCommentById = async (commentId) => {
  const [rows] = await pool.query(
    'SELECT * FROM comments WHERE id = ?',
    [commentId]
  );
  return rows[0];
};

module.exports = {
  getCommentsByPostId: async (postId) => {
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE postId = ?',
      [postId]
    );
    return rows;
  },

  addComment: async (postId, name, email, body) => {
    const [rows] = await pool.query(
      'INSERT INTO comments (postId, name, email, body) VALUES (?, ?, ?, ?)',
      [postId, name, email, body]
    );
    return rows.affectedRows ? getCommentById(rows.insertId) : null;
  },

  deleteComment: async (commentId) => {
    const [rows] = await pool.query(
      'DELETE FROM comments WHERE id = ?',
      [commentId]
    );
    return rows.affectedRows ? rows : null;
  }
}