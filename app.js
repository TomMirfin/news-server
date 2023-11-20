const express = require("express");

const { getAllTopics } = require("./controller/topics.controller");
const { handleNotFoundError, handleServerErrors } = require("./errors");

const app = express();

app.get("/api/topics", getAllTopics);

app.use(handleNotFoundError);
app.use(handleServerErrors);

app.all("/*");

module.exports = app;
