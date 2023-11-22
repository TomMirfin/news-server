const db = require("../db/connection.js");

exports.selectComments = (article_id) => {
  console.log(article_id, "<-- AID");

  return db
    .query(
      "SELECT * FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1;",
      [article_id]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};
