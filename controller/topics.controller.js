const { selectTopics } = require("../model/topics-model");
const fs = require("fs/promises");

exports.getAllTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch(next);
};
