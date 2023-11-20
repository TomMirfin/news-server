exports.handleCustomError = (req, res, err) => {
  console.log(err.code, "<--- err code");
  if (err) {
    res.status(404).send({ msg: "Not Found" });
  }
  console.log(err, "<-- err");
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};
exports.handleServerError;
