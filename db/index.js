const db = require("./db");
const User = require("./models/User");
const Event = require("./models/Event");

User.hasMany(Event);
Event.belongsToMany(User, { through: "Trips", as: "event" });
Event.hasMany(User, { as: "guest" });
Event.hasOne(User, { as: "host" });

User.belongsToMany(User, { through: "Contacts", as: "contact" });

const models = {
  db: db,
  User: User,
  Event: Event,
};
module.exports = models;
