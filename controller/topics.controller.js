const { selectTopics } = require("../model/topics-model");

exports.getAllTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch(next);
};

exports.getAllEndPoints = (req, res, next) => {
  listEndpoints()
    .then((endPoints) => {
      const parsedEndpoint = JSON.parse(endPoints);

      res.status(200).send({ API: parsedEndpoint });
    })
    .catch(next);
};
