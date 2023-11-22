const db = require("../db/connection.js");

const fs = require("fs/promises");

exports.selectTopics = (req, res) => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};
