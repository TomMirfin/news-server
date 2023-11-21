const express = require("express");

const { getAllTopics } = require("./controller/topics.controller");
const {
  handleCustomErrors,
  handleNotFoundError,
  handleServerErrors,
} = require("./errors");
const { getArticlesById } = require("./controller/article.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticlesById);
app.all("*", handleNotFoundError);

app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
