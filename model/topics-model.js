const db = require("../db/connection.js");

exports.selectTopics = (req, res) => {
  return db.query("SELECT * FROM topics").then((res) => {
    return res.rows;
  });
};
