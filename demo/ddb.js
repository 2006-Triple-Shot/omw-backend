const pg = require("pg");
const Sequelize = require("sequelize");

const ddb = new Sequelize(`postgres://localhost:5432/onmyway-demo`, {
  logging: false,
});

module.exports = ddb;
