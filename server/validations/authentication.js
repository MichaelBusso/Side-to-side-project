const { getUser } = require("../db/login");

module.exports = {
  authentication: async (req, res, next) => {
    try {
      const [userName, password] = req.headers.auth.split(":");
      const user = await getUser(userName, password);
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send();
    }
  }
}