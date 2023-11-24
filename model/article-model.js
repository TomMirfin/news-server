const db = require("../db/connection.js");

exports.selectAllArticles = (query) => {
  const newQuery = query.topic;

  const queryType = Object.keys(query);

  if (newQuery === "mitch" && queryType.includes("topic")) {
    return db
      .query("SELECT * FROM articles WHERE topic = $1 ", [newQuery])
      .then((topic) => {
        return topic;
      });
  } else if (newQuery === "cats" && queryType.includes("topic")) {
    return db
      .query("SELECT * FROM articles WHERE topic = $1 ", [newQuery])
      .then((topic) => {
        return topic;
      });
  } else if (!newQuery) {
    return db
      .query(
        "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.author) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.author,  articles.title,  articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ORDER BY created_at DESC;"
      )
      .then(({ rows }) => {
        return rows;
      });
  } else {
    return Promise.reject({ status: 400, msg: "not found" });
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
