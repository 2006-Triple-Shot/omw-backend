"use strict";
const auth = require("express").Router();
const { User } = require("../../db/models/index");

module.exports = auth;

/* LOGIN ************************** */
auth.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
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
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      latitude: latitude,
      longitude: longitude,
      mobile: mobile,
      password: password,
      zip: zip,
      email: email,
    });

    req.login(newUser, (err) => (err ? next(err) : res.json(newUser)));
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
