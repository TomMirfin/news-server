const db = require("../db/connection.js");

exports.selectComments = (article_id) => {
  console.log(article_id, "<-- AID");

  return db
    .query(
      "SELECT comments.*, articles.article_id, FROM comments LEFT JOIN articles ON articles.article_id = comments.article_id WHERE articles.article_id = $1;"[
        article_id
      ]
    )
    .then(({ rows }) => {
      console.log(rows, "<---- rows in comments-model");
      return rows;
    });
};
