const express = require('express');
const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send();
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = loginRoute;