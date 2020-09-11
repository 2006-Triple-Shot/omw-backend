const Sequelize = require("sequelize");
const db = require("../ddb");
const crypto = require("crypto");

const demoUser = db.define("users", {
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
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
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
    defaultValue: true,
  },
});


module.exports = demoUser;

/**
 * instanceMethods
 */
demoUser.prototype.correctPassword = function (candidatePwd) {
  return (
    demoUser.encryptPassword(candidatePwd, this.salt()) === this.password()
  );
};

/**
 * classMethods
 */
demoUser.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

demoUser.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = demoUser.generateSalt();
    user.password = demoUser.encryptPassword(user.password(), user.salt());
  }
};

demoUser.beforeCreate(setSaltAndPassword);
demoUser.beforeUpdate(setSaltAndPassword);
demoUser.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});
