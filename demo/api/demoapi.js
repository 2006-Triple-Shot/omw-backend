"use strict";

const router = require("express").Router();

router.use("/users", require("./routes/demousers"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
