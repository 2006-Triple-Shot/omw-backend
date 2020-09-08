const users = require("express").Router();
const models = require("../../db/index");
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
users.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(
      req.params.userId
      //   ,{
      //   include: {
      //     model: Event,
      //     where: {
      //       guestId: req.params.userId,
      //     },
      //   },
      // }
    );
    res.json(user);
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
