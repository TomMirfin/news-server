const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = "../connection.js";

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
