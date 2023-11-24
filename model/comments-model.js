const db = require("../db/connection.js");

exports.postComment = ({ username, body }, article_id) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3) RETURNING *`,
      [username, body, +article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

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
        return Promise.reject({ status: "404", msg: "comment does not exist" });
      } else {
        return rows;
      }
    });
};
