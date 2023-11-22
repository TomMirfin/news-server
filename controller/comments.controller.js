const { selectComments } = require("../model/comments-model");

exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;

  selectComments(article_id)
    .then((comments) => {
      console.log(comments);
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};
