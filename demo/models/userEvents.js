const ddb = require("../ddb");
const Sequelize = require("sequelize");

const userEvents = ddb.define("userEvents", {
  trip: {
    type: Sequelize.STRING,

  }
})
