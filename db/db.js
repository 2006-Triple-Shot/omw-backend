const chalk = require("chalk");
const Sequelize = require("sequelize");

const db = new Sequelize(`postgres://localhost:5432/onmyway`, {
  logging: false,
});

module.exports = db;
