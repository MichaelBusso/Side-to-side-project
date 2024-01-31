const { pool } = require('./pool');

module.exports = {
  getUser: async (userName, password) => {
    const [rows] = await pool.query(
      'SELECT users.id, name, username, email, phone, website FROM users JOIN passwords ON users.id = passwords.userId WHERE users.username = ? AND passwords.password = ?',
      [userName, password]
    );
    return rows.length > 0 ? rows : null;
  }
}