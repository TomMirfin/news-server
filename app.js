const express = require("express");

const {
  getAllTopics,
  getAllEndPoints,
} = require("./controller/topics.controller");
const { handleServerErrors, handleNotFoundError } = require("./errors");
const { getAllArticles } = require("./controller/articles.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getAllEndPoints);

app.get("/api/articles", getAllArticles);

app.use(handleNotFoundError);
app.use(handleServerErrors);

app.all("/*");

module.exports = app;
