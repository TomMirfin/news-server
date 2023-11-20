exports.handleCustomError = (req, res, err) => {
  if (err) {
    res.status(404).send({ msg: "Not Found" });
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};
