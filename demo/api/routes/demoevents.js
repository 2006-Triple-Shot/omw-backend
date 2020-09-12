const events = require("express").Router();
const models = require("../../models/demoModIndex");
const { demoUser, demoEvent } = models;

// /* TEST GET events ************************** */
// events.get("/testget", async (req, res, next) => {
//   try {
//     res.send("TEST GET event router");
//   } catch (err) {
//     next(err);
//   }
// });

// /* GET ALL * MY HOSTED ? GUESTED ?? * EVENTS ************************** */
events.get("/", async (req, res, next) => {
  try {
    const allEvents = await Event.findAll(); // Include hosted and attending/invited to as guest through TRIPS
    res.json(allEvents); // SEE LIST OF GUESTS
  } catch (err) {
    next(err);
  }
});

/* GET SINGLE EVENTS ************************** */
events.get("/:eventId", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.eventId, {
      where: {
        id: req.params.eventId,
      },
      include: {
        model: User,
        as: "guest",
      },
    });
    res.json(event);
  } catch (err) {
    next(err);
  }
});

/* POST EVENT ************************** */
events.post("/", async (req, res, next) => {
  try {
    const { latitude, longitude, date, title, description, friends } = req.body; // append User through hostId
    const newEvent = await Event.create({
      // INCLUDE IDS of guests, create TRIPS instances
      title: title,
      date: date,
      latitude: latitude,
      longitude: longitude,
      description: description,
    });
    const addFriends = await Promise.all(friends.map(async guest => {
      const guestToAdd = await demoUser.findByPk(guest.id);
      const add = await demoEvent.addGuest(guestToAdd);
    }))
    const updatedEvent = await demoEvent.findOne({
      where: {
        title: title
      },
      include: demoUser,
      through: "trips",
      as: "guest"
    })
    res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
});

module.exports = events;
