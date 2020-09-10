const db = require("../db");
const User = require("./User");
const Event = require("./Event");

User.hasMany(Event, { foreignKey: "hostId" }); // event should have user has host
Event.belongsToMany(User, { through: "trips", as: "guest" });
User.belongsToMany(Event, { through: "trips", as: "event" });

User.belongsToMany(User, { through: "contacts", as: "contact" });

module.exports = {
  User,
  Event,
};
