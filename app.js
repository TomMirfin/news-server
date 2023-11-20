const express = require("express");
const { getAllTopics } = require("./controller/topics.controller");
const { handleCustomErrors } = require("./errors");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api/nvnewbs", getAllTopics);

module.exports = app;
