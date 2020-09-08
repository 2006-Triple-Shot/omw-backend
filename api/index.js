const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const PORT = 5000;
module.exports = app;

/* MIDDLEWARES ****************** */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* AUTHENTICATION ****************** */

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my best friend is Cody",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES ****************** */

app.use("/api", require("./routes/api")); // include our routes!
app.use("/auth", require("./auth"));

app.use((req, res, next) => {
  console.log("SESSION: ");
  next();
});

/* ERROR HANDLING ****************** */

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
