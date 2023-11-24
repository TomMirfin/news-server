const { selectAllArticles } = require("../model/article-model");
const { selectArticlesById } = require("../model/article-model");

exports.getAllArticles = (req, res, next) => {
  const { topic } = req.query;

  selectAllArticles(topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticlesById(article_id)
    .then((articles) => {
      res.status(200).send(articles);
    })

    .catch(next);
};
