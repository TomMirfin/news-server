exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};
exports.handleSqlerror = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else next(err);
};
exports.handleNotFoundError = (req, res) => {
  res.status(404).send({ msg: "bad request" });
};

exports.handleSqlError = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "No username found" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "bad request" });
  } else next(err);
};

exports.handleNotFoundError = (req, res) => {
  res.status(404).send({ msg: "not found" });
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
