"use strict";

const router = require("express").Router();

// Students route

router.use("/users", require("./users"));
router.use("/events", require("./events"));
router.use("/trips", require("./trips"));
// Campuses route

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
