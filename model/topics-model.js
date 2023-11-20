const db = require("../db/connection.js");

exports.selectTopics = (req, res) => {
  console.log("in model");
  return db.query("SELECT * FROM topics").then((res) => {
    return res.rows;
  });
};
