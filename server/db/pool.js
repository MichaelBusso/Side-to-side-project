const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.SQL_PASSWORD,
  database: 'project_database',
});

module.exports = {
  pool
};