const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");

const Event = db.define("events", {
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  time: {
    type: Sequelize.TIME,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM("Active", "Inactive", "Finished"),
    defaultValue: "Inactive",
  },
});

module.exports = Event;
