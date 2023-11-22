const db = require("../db/connection.js");

exports.selectComments = (article_id) => {
  return db
    .query(
      "SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, articles.article_id FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1;",
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "no comments found" });
      }

      if (!rows[0].comment_id) {
        return Promise.reject({ status: 404, msg: "no comments found" });
      } else {
        return rows;
      }
    });
};
