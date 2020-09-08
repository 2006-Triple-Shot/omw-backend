const db = require("../db");
const User = require("./User");
const Event = require("./Event");

User.hasMany(Event, { foreignKey: "userId" });
Event.hasMany(User, { as: "guest", foreignKey: "guestId" });
Event.hasOne(User, { as: "host", foreignKey: "hostId" });

Event.belongsToMany(User, { through: "Trips", as: "event" });
User.belongsToMany(User, { through: "Contacts", as: "contact" });

User.sync({ force: true });
Event.sync({ force: true });

const models = {
  db: db,
  User: User,
  Event: Event,
};
module.exports = models;
