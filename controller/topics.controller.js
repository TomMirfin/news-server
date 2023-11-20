const { selectTopics } = require("../model/topics-model");

const listEndpoints = require("express-list-endpoints");
const app = require("../app");

exports.getAllTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch(next);
};

exports.getAllEndPoints = (req, res, next) => {
  listEndpoints(app).then((endPoints) => {
    console.log(endPoints);
    res.status(200).send(endPoints);
  });
};
