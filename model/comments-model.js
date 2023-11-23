const db = require("../db/connection.js");

exports.postComment = ({ username, body }, article_id) => {
  const articleNumber = parseInt(article_id);

  return db
    .query(
      `INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3) RETURNING *`,
      [username, body, articleNumber]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};