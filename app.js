const express = require("express");

const {
  getAllTopics,
  getAllEndPoints,
} = require("./controller/topics.controller");

const {
  getAllArticles,
  getArticlesById,
} = require("./controller/articles.controller");

const {
  handleCustomErrors,
  handleNotFoundError,
  handleServerErrors,
  handleSqlError,
} = require("./errors");
const { postCommentByID } = require("./controller/comments.controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getAllEndPoints);

app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticlesById);

app.post("/api/articles/:article_id/comments", postCommentByID);

app.all("*", handleNotFoundError);
app.use(handleSqlError);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
