const { postComment } = require("../model/comments-model");

exports.postCommentByID = (req, res, next) => {
  console.log("in controller");
  const newComment = req.body;

  const { article_id } = req.params;

  postComment(newComment, article_id)
    .then((comment) => {
      console.log(comment, "<--- comment in controller");
      res.status(201).send(comment);
    })
    .catch((err) => {
      console.log(err.code);
      next(err);
    });
};
