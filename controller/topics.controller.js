const { selectTopics } = require("../model/topics-model");

exports.getAllTopics = (req, res, next) => {
  console.log(req.path);
  const path = req.path;
  console.log(path);
  if (path.includes("/api/topics")) {
    selectTopics().then((topics) => {
      res.status(200).send(topics);
    });
  } else {
    res.status(404).send({ msg: "Not Found" });
  }
};
