const { selectAllArticles } = require("../model/article-model");

exports.getAllArticles = (req, res, next) => {
  console.log("in controller");
  selectAllArticles()
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};
