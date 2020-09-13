const events = require("express").Router();
const models = require("../../models/demoModIndex");
const { demoUser, demoEvent, Trip } = models;

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
    const allEvents = await demoEvent.findAll(); // Include hosted and attending/invited to as guest through TRIPS
    res.json(allEvents); // SEE LIST OF GUESTS
  } catch (err) {
    next(err);
  }
});

/* GET SINGLE EVENTS ************************** */
events.get("/:eventId", async (req, res, next) => {
  try {
    const event = await demoEvent.findOne({
      where: {
        id: req.params.eventId,
      },
      include: {
        model: demoUser,
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
    const newEvent = await demoEvent.create({
        title: title,
        date: date,
        latitude: latitude,
        longitude: longitude,
        description: description,
      });
    const addFriends = await Promise.all(
      friends.map(async guest => {
        const guestToAdd = await demoUser.findByPk(guest.id);
        const add = await newEvent.addGuest(guestToAdd);
        console.log(add);
      })
    );

    const updatedEvent = await demoEvent.findOne({
      where: {
        title: title,
      },
      attributes: ["id", "title", "date", "time", "description", "latitude", "longitude"],
      include: [
        {
          model: demoUser,
          as: "guest",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "latitude",
            "longitude",
          ],
          through: { attributes: [] }, //  <== Here
          required: true,
        },
      ],
    });
    res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
});

module.exports = events;
