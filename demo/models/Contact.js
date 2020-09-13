const Sequelize = require("sequelize");
const db = require("../ddb");

const Contact = db.define("contact", {
  contactId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Contact;
