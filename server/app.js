const express = require("express");
const cors = require('cors');
const { authentication } = require('./validations/authentication');

const loginRoute = require('./routes/login');
const todosRoute = require('./routes/todos');
const postsRoute = require('./routes/posts');
const commentsRoute = require('./routes/comments');

const app = express();
app.use(express.json());
app.use(cors());
app.use(authentication);

app.use('/login', loginRoute);
app.use('/todos', todosRoute);
app.use('/posts', postsRoute);
app.use('/posts/comments', commentsRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});