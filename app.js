const express = require("express");
const fs = require("fs");
const {
  getAllTopics,
  getAllEndPoints,
} = require("./controller/topics.controller");
const { handleServerErrors, handleNotFoundError } = require("./errors");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get(`/api`, getAllEndPoints);

app.use(handleNotFoundError);
app.use(handleServerErrors);

app.all("/*");

module.exports = app;
