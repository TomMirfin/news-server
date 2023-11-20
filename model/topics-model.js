const db = require("../db/connection.js");
const listEndpoints = require("express-list-endpoints");
const app = require("../app.js");

exports.selectTopics = (req, res) => {
  return db.query("SELECT * FROM topics").then((res) => {
    return res.rows;
  });
};
exports.listEndpoints = (req, res) => {
  console.log("in model");
  console.log(listEndpoints(app));
  return listEndpoints(app);
};
