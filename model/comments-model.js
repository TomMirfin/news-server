const db = require("../db/connection.js");

exports.selectComments = (article_id) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      return rows;
    });
};
exports.deleteComments = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      comment_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        Promise.reject({ status: "404", msg: "bad request" });
      } else {
        return rows;
      }
    });
};
