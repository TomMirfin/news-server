const { selectArticlesById } = require("../model/article-model");
const { selectComments, deleteComments } = require("../model/comments-model");

exports.getAllCommentsFromID = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [selectComments(article_id), selectArticlesById(article_id)];

  return Promise.all(promises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      res.status(200).send({ comments });
    })
    .catch(next);
};
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComments(comment_id)
    .then((comments) => {
      res.status(204).send({ comments });
    })
    .catch(next);
};
