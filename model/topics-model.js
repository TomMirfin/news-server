const db = require("../db/connection.js");

const fs = require("fs/promises");

exports.selectTopics = (req, res) => {
  return db.query("SELECT * FROM topics").then((res) => {
    return res.rows;
  });
};
exports.listEndpoints = () => {
  return fs.readFile("endpoints.json", "utf-8").then((result) => {
    return result;
  });
};
