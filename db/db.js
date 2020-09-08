const pg = require("pg");
const Sequelize = require("sequelize");

const db = new Sequelize(`postgres://localhost:5432/onmyway`, {
  logging: false,
});

module.exports = db;
