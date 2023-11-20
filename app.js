const express = require("express");
const listEndpoints = require("express-list-endpoints");
const fs = require("fs/promises");

const {
  getAllTopics,
  getAllEndPoints,
} = require("./controller/topics.controller");
const { handleCustomError, handleServerErrors } = require("./errors");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api/", getAllEndPoints);

const endPoints = listEndpoints(app);
const description = { description: "this endpoint updates" };
const fileContentArray = [];
const newFileContent = {
  fileContentArray: fileContentArray,
};

endPoints.map((endpointsPath) => fileContentArray.push(endpointsPath));

const path = "./allEndPoints.json";
fs.writeFile(path, JSON.stringify(newFileContent), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("file written successfully");
  }
});

app.use(handleCustomError);
app.use(handleServerErrors);

app.all("/*", getAllTopics);

module.exports = app;
