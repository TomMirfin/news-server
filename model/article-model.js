const db = require("../db/connection.js");

exports.selectAllArticles = () => {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.author) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.author,  articles.title,  articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ORDER BY created_at DESC;"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticlesById = (article_id, query) => {
  if (query === "comment_count") {
    return db
      .query(
        "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, articles.body, COUNT(comments.author) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url;",
        [article_id]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 400, msg: "bad request" });
        } else {
          return rows;
        }
      });
  } else if (query && query !== "comment_count") {
    return Promise.reject({ status: 400, msg: "bad request" });
  } else {
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "not found" });
        } else {
          return rows;
        }
      });
  }
};

exports.patchArticle = (article_id, newVote) => {
  const newVotes = newVote.incVotes;
  if (typeof newVotes === "number") {
    return db
      .query(
        "UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;",
        [article_id, newVotes]
      )
      .then(({ rows }) => {
        if (!rows.length) {
          return Promise.reject({ status: 404, msg: "not found" });
        } else {
          return rows[0];
        }
      });
  } else {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
};
