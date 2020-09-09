const Sequelize = require("sequelize");
const ddb = require("../ddb");

const demoUser = ddb.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  mobile: {
    type: Sequelize.STRING,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "/On-My-Way/backend/db/models/person-marker.png",
  },
  zip: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  isHost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isSharing: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = demoUser;
