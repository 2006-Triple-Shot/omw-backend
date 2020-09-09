const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);
const authorize = require("./auth/authorize");
const io = require("socket.io").listen(server);
const PORT = process.env.PORT || 8080;

module.exports = app;

if (process.env.NODE_ENV !== "production") require("./token");

/* MIDDLEWARES ****************** */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* AUTHENTICATION MIDDLEWARE ****************** */
// app.use("/web", require("../public/router"));
app.use("/auth", require("./auth/auth"));
app.use("*", authorize);

/* ROUTES ****************** */
app.use("/api", require("./api/demoapi")); // include our routes!

/* SOCKETS ****************** */
let guestSocket = null;
let hostSocket = null;
let count = 0;
const obj = { id: "", room: "" };
io.on("connection", (socket) => {
  count++;
  console.log("-----Backend connected----", count);
  socket.join(["room 237"], () => {
    const rooms = Object.keys(socket.rooms);
    const val = Object.values(socket.rooms);
    console.log(rooms); // [ <socket.id>, 'room 237']
    console.log(val); // [ <socket.id>, 'room 237']
  });

  socket.on("joinEvent", (guestLocation, count) => {
    guestSocket = socket;
    if (guestSocket !== null) {
      io.to("room 237").emit("start");
      console.log("Guest wants a host at", guestLocation);
      console.log(guestSocket);
      console.log("*****************");
    }
  });

  socket.on("guestRequest", (routeToHost) => {
    hostSocket = socket;
    console.log("Host wants a guest at ");
    if (guestSocket !== null) {
      io.to("room 237").emit("guestRequest", routeToHost);
      // guestSocket.emit("guestRequest", routeToHost);
      console.log("=======================");
    }
  });

  socket.on("guestAccepts", (guestLocation, count) => {
    console.log("<<<<<<<<<<DRiver Accepted Backend>>>>>>>", guestLocation);
    if (hostSocket !== null) {
      hostSocket.emit("guestAccepts", guestLocation, count);
    }
  });

  socket.on("liveTracking", (guestLocation, count) => {
    console.log("<<<<<<<<<<BACKGROUND DRIVER TRACKING >>>>>>>", guestLocation);
    if (hostSocket !== null) {
      hostSocket.emit("liveTracking", guestLocation, count);
    }
  });
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

server.listen(PORT, () => {
  console.log("demo server listening on port " + PORT);
});
