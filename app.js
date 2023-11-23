const express = require("express");

const {
  getAllArticles,
  getArticlesById,
} = require("./controller/articles.controller");

const {
  getAllTopics,
  getAllEndPoints,
} = require("./controller/topics.controller");

const {
  handleCustomErrors,
  handleNotFoundError,
  handleServerErrors,
  handleSqlerror,
} = require("./errors");
const {
  getAllCommentsFromID,
  deleteCommentById,
} = require("./controller/comments.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndPoints);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles/:article_id/comments", getAllCommentsFromID);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("*", handleNotFoundError);

app.use(handleCustomErrors);
app.use(handleSqlerror);
app.use(handleServerErrors);

module.exports = app;
