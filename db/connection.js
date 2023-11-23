const { Pool } = require("pg");

const db = new Pool();
const ENV = process.env.NODE_ENV || "development";
const config = {};
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

module.exports = db;
