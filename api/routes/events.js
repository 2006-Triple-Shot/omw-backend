const events = require("express").Router();
const models = require("../../db/models");
const { User, Event } = models;

/* TEST GET events ************************** */
events.get("/testget", async (req, res, next) => {
  try {
    res.send("TEST GET event router");
  } catch (err) {
    next(err);
  }
});

/* GET ALL EVENTS ************************** */
events.get("/", async (req, res, next) => {
  try {
    const allEvents = await Event.findAll();
    res.json(allEvents);
  } catch (err) {
    next(err);
  }
});

/* GET HOST'S EVENTS ************************** */
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
    const { latitude, longitude, date, title, description } = req.body;
    const newEvent = await Event.create({
      title: title,
      date: date,
      latitude: latitude,
      longitude: longitude,
      description: description,
    });
    res.json(newEvent);
  } catch (err) {
    next(err);
  }
});

module.exports = events;
