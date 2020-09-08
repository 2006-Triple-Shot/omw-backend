const users = require("express").Router();
const { User, Event } = require("../../db/models/index");
const db = require("../../db/db");

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
users.use("/id", (req, res) => {
  users.get("/id/:userId", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });
});

/* GET SINGLE USER ************************** */
users.get("/:param", async (req, res, next) => {
  console.log(req.params.param);
  try {
    let id;
    let user;
    const param = req.params.param;
    if (typeof param === "number") {
      try {
        const userPk = await User.findByPk(param);
        res.json(userPk);
      } catch (err) {
        next(err);
      }
    } else {
      try {
        const userByName = await User.findOne({
          where: {
            firstName: param,
          },
        });
        if (userByName) {
          user = userByName;
          id = user.dataValues.id;
          res.status(200).json({ userId: id });
        } else {
          const userByEmail = await User.findOne({
            where: {
              email: param,
            },
          });
          if (userByEmail) {
            user = userByEmail;
            id = user.dataValues.id;
            res.status(200).json({ userId: id });
          }
        }
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
});

/* GET CONTACTS ************************** */
// users.get("/id/:userId/contacts", async (req, res, next) => {
//   try {
//     const user = await User.findAll({
//       include: {
//         model: User,
//         through: "contacts",
//         as: "contact",
//         where: {
//           contactId: req.params.userId,
//         },
//       },
//     });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

/* CREATE USER ************************** */
users.post("/", async (req, res, next) => {
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
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = users;
