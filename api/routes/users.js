const users = require("express").Router();
const models = require("../../db/models");
const db = require("../../db/db");
const { User, Event } = models;

/* TEST GET USERS ************************** */
users.get("/testget", async (req, res, next) => {
  try {
    res.send("TEST GET user router");
  } catch (err) {
    next(err);
  }
});

/* GET ALL USERS ************************** */
users.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

/* GET SINGLE USER ************************** */
users.get("/id/:userId/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
users.get("/:param", async (req, res, next) => {
  console.log(req.params.param);
  try {
    let id;
    let user;
    const param = req.params.param;
    const userByName = await User.findOne({
      where: {
        firstName: param,
      },
    });
    if (userByName) {
      user = userByName;
      id = user.dataValues.id;
    } else {
      const userByEmail = await User.findOne({
        where: {
          email: param,
        },
      });
      if (userByEmail) {
        user = userByEmail;
        id = user.dataValues.id;
      }
    }
    console.log(user, id);
    res.status(200).json({ userId: id });
  } catch (err) {
    next(err);
  }
});
/* GET CONTACTS ************************** */
users.get("/:userId/contacts", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

/* POST USER ************************** */
users.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = users;
