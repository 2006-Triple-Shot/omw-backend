const events = require("express").Router();
const models = require("../../db/models/index");
const { db, User, Event } = models;

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
    const allEvents = await Event.findAll({
      include: {
        model: User,
      },
    });
    res.json(allEvents);
  } catch (err) {
    next(err);
  }
});

/* GET SINGLE EVENT ************************** */
events.get("/:eventId", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.eventId, {
      include: {
        model: User,
        where: {
          eventId: req.params.eventId,
        },
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
    const newEvent = await Event.create(req.body);
    res.json(newEvent);
  } catch (err) {
    next(err);
  }
});

module.exports = events;
