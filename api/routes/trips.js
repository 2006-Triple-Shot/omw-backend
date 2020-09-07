const trips = require("express").Router();
// const { db, User, Event } = require("../../db/index");

/* TEST GET TRIPS ************************** */
trips.get("/testget", async (req, res, next) => {
  try {
    res.send("TEST GET trip router");
  } catch (err) {
    next(err);
  }
});

// /* GET USER TRIPS ************************** */
// trips.get("/:userId", async (req, res, next) => {
//   try {
//     const trip = Event
//       .findAll
//       //   {
//       //   include: {
//       //     attributes: [location, date, time, title, description, status],
//       //     // include: {
//       //     //   model: User,
//       //     //   where: {
//       //     //     userId: req.params.userId,
//       //     //     include: [latitude, longitude],
//       //     //   },
//       //     // },
//       //   },
//       // }
//       ();
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = trips;
