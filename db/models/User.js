const Sequelize = require("sequelize");
const db = require("../db");
const Event = require("./Event");

const User = db.define("users", {
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
    // using no encryption for now for testing purposes
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
  },
  // salt: {
  //   type: Sequelize.STRING,
  //   // Making `.salt` act like a function hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue("salt");
  //   },
  // },
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

module.exports = User;

/**
 * instanceMethods
 */
// User.prototype.correctPassword = function (candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password();
// };

/**
 * classMethods
 */
// User.generateSalt = function () {
//   return crypto.randomBytes(16).toString("base64");
// };

// User.encryptPassword = function (plainText, salt) {
//   return crypto
//     .createHash("RSA-SHA256")
//     .update(plainText)
//     .update(salt)
//     .digest("hex");
// };

/**
 * hooks
 */
// const setSaltAndPassword = (user) => {
//   if (user.changed("password")) {
//     user.salt = User.generateSalt();
//     user.password = User.encryptPassword(user.password(), user.salt());
//   }
// };

// User.beforeCreate(setSaltAndPassword);
// User.beforeUpdate(setSaltAndPassword);
// User.beforeBulkCreate((users) => {
//   users.forEach(setSaltAndPassword);
// });
