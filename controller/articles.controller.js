const { selectAllArticles, patchArticle } = require("../model/article-model");
const { selectArticlesById } = require("../model/article-model");

exports.getAllArticles = (req, res, next) => {
  selectAllArticles()
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

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const newVote = req.body;

  patchArticle(article_id, newVote)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};
