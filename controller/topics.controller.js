const { selectTopics } = require("../model/topics-model");

exports.getAllTopics = (req, res, next) => {
  console.log(req.path);
  const path = req.path;
  console.log(path);
  if (path.includes("/api/topics")) {
    selectTopics().then((articles) => {
      res.status(200).send(articles);
    });
  } else {
    res.status(404).send({ msg: "Not Found" });
  }
};
