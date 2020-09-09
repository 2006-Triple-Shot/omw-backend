const users = require("express").Router();
const { demoUser } = require("../../models/demoModIndex");
const ddb = require("../../ddb");
// const { User, Event } = require("../../db/models/index");
// const db = require("../../db/db");

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
    const allUsers = await demoUser.findAll();
    const details = allUsers.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: user.imageUrl,
      };
    });
    res.json(details);
  } catch (err) {
    next(err);
  }
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
        const userPk = await demoUser.findByPk(param);
        res.json(userPk);
      } catch (err) {
        next(err);
      }
    } else {
      try {
        const userByName = await demoUser.findOne({
          where: {
            firstName: param,
          },
        });
        if (userByName) {
          user = userByName;
          id = user.dataValues.id;
          res.status(200).json({ userId: id });
        } else {
          const userByEmail = await demoUser.findOne({
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
    const newUser = await demoUser.create({
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
