const ddb = require("../ddb");
const demoUser = require("./demoUser");
const demoEvent = require("./demoEvent");
const Contact = require("./Contact");

/* ASSOCIATIONS ************* */
// demoUser.hasMany(demoEvent, { foreignKey: "hostId" }); // demoEvent should have demoUser as host

demoUser.hasMany(demoEvent, { foreignKey: "hostId" }); // demoEvent should have demoUser as host
demoEvent.belongsToMany(demoUser, { through: "trips", as: "guest" });
demoUser.belongsToMany(demoEvent, { through: "trips", as: "event" });


demoUser.belongsToMany(demoUser, { through: "contacts", as: "contact" });




module.exports = {
  demoUser,
  demoEvent,
  Contact
};
