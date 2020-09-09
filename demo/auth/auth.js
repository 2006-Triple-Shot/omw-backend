"use strict";
const auth = require("express").Router();
// const { User } = require("../../db/models/index");
const { demoUser } = require("../models/demoUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { omwApiToken } = require("../../token");
module.exports = auth;

/* LOGIN ************************** */
auth.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await demoUser.findOne({ where: { email: email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        const token = jwt.sign(user.email, omwApiToken);
        return res.json(token);
      } else {
        console.log("Incorrect password for user:", req.body.email);
        res.status(401).send("Wrong username and/or password");
      }
    } else {
      // req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

/* CREATE NEW USER ************************** */
auth.post("/signup", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      email,
      password,
      zip,
      latitude,
      longitude,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await demoUser.create({
      firstName: firstName,
      lastName: lastName,
      latitude: latitude,
      longitude: longitude,
      mobile: mobile,
      password: hashedPassword,
      zip: zip,
      email: email,
    });

    const { id } = newUser;
    const newUserDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      id: id,
    };
    res.json(newUserDetails);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

/* LOGOUT ************************** */
auth.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

/* GET ME IF LOGGED IN ************************** */
auth.get("/me", (req, res) => {
  res.json(req.user);
});

auth.use((req, res, next) => {
  const err = new Error("AUTH route not found!");
  err.status = 404;
  next(err);
});

module.exports = auth;
