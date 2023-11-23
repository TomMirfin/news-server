const db = require("../db/connection.js");
const { articleData } = require("../db/data/test-data/index.js");

exports.selectAllArticles = () => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.author) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.author,  articles.title,  articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ORDER BY created_at DESC;"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      } else {
        return rows;
      }
    });
};

exports.patchArticle = (article_id, newVote) => {
  console.log(article_id, "<--- AID");
  const newVotes = Number(newVote.incVotes);
  return db
    .query(
      "UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;",
      [article_id, newVotes]
    )
    .then((rows) => {
      console.log(rows.rows[0]);
      return rows[0];
    });
};
