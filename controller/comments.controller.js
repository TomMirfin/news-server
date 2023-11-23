const { postComment } = require("../model/comments-model");

exports.postCommentByID = (req, res, next) => {
  const newComment = req.body;

  const { article_id } = req.params;

  postComment(newComment, article_id)
    .then((comment) => {
      res.status(201).send(comment);
    })

    .catch(next);

    

};
const { selectArticlesById } = require("../model/article-model");
const { selectComments } = require("../model/comments-model");

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
