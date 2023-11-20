const express = require("express");
const listEndpoints = require("express-list-endpoints");

const { getAllTopics } = require("./controller/topics.controller");
const { handleCustomError, handleServerErrors } = require("./errors");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", (req, res) => {
  // console.log(listEndpoints(app));
  res.status(200).send(listEndpoints(app));
});

app.use(handleCustomError);
app.use(handleServerErrors);

app.all("/*", getAllTopics);

module.exports = app;
