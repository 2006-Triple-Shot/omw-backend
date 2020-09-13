const Sequelize = require("sequelize");
const ddb = require("../ddb");


const demoEvent = ddb.define("event", {
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date()
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

});



module.exports = demoEvent;
