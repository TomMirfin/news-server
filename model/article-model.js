const db = require("../db/connection.js");
const { articleData } = require("../db/data/test-data/index.js");

exports.selectAllArticles = (query) => {
  let queryString = "SELECT * FROM articles ";
  const queryVariables = [];
  if (query) {
    queryString += "WHERE topic = $1";
    queryVariables.push(query);
  } else if (!query) {
    queryString =
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.author) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ORDER BY articles.created_at DESC;";
  }
  if (!queryVariables.length) {
    return db.query(queryString).then(({ rows }) => {
      return rows;
    });
  } else if (queryVariables) {
    return db.query(queryString, queryVariables).then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      } else {
        return rows;
      }
    });
  }
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
