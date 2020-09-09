"use strict";
const auth = require("express").Router();
const { User } = require("../../db/models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../../publicsecret");
// const omwApiToken = require("../../token");

module.exports = auth;

/* LOGIN ************************** */
auth.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong email and/or password");
    } else if (user) {
      const passwordCorrect = user.correctPassword(password);
      if (passwordCorrect) {
        const token = jwt.sign(user.email, secret.publicSecret, {
          expiresIn: "1d",
        });
        return res.json({ token: token });
      } else {
        console.log("Incorrect password for user:", req.body.email);
        res.status(401).send("incorrect password");
      }
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
