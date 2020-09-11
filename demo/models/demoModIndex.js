const ddb = require("../ddb");
const demoUser = require("./demoUser");
const demoEvent = require("./demoEvent");
const userEvents = require("./userEvents");
/* ASSOCIATIONS ************* */
// demoUser.hasMany(demoEvent, { foreignKey: "hostId" }); // demoEvent should have demoUser as host

demoUser.hasMany(demoEvent, { foreignKey: "hostId" }); // demoEvent should have demoUser as host
demoEvent.belongsToMany(demoUser, { through: "trips", as: "guest" });
demoUser.belongsToMany(demoEvent, { through: "trips", as: "event" });

demoUser.belongsToMany(demoUser, { through: "contacts", as: "contact" });
// demoUser.belongsToMany(demoEvent, {
//   as: "Guests",
//   through: { model: userEvents, unique: false },
//   foreignKey: "host_id",
// });
// demoEvent.belongsToMany(demoUser, {
//   as: "Hosts",
//   through: { model: userEvents, unique: false },
//   foreignKey: "guest_id",
// });


module.exports = {
  demoUser,
  demoEvent,
  userEvents
};
