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
