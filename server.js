const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);
const authorize = require("./auth/authorize");
const io = require("socket.io").listen(server);
const PORT = process.env.PORT || 5000;

module.exports = app;

// if (process.env.NODE_ENV !== "production") require("./token");

/* MIDDLEWARES ****************** */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* AUTHENTICATION MIDDLEWARE ****************** */
app.use("/auth", require("./api/index"));
app.use("*", authorize);

/* ROUTES ****************** */
app.use("/api", require("./api/routes/api")); // include our routes!

let guestSocket = null;
let hostSocket = null;
let count = 0;
let room = ["room 237"];
const obj = { id: "", room: "" };
io.on("connection", socket => {
  count++;
  console.log("-----Backend connected----", socket.id);

  socket.join(room, () => {
    const rooms = Object.keys(socket.rooms);
    const val = Object.values(socket.rooms);
    console.log(rooms); // [ <socket.id>, 'room 237']
    console.log(val); // [ <socket.id>, 'room 237']
  });

  socket.on("joinEvent", guestLocation => {
    guestSocket = socket;
    if (guestSocket !== null) {
      io.to("room 237").emit("start");

      console.log("SOCKET -ID :", socket.id);
      console.log("*****************");
    }
  });

  socket.on("guestRequest", routeToHost => {
    hostSocket = socket;
    console.log("Host wants a guest at ");
    if (guestSocket !== null) {
      io.to("room 237").emit("guestRequest", routeToHost);
      // guestSocket.emit("guestRequest", routeToHost);
      console.log("=======================");
    }
  });

  socket.on("guestAccepts", guestLocation => {
    console.log("<<<<<<<<<<DRiver Accepted Backend>>>>>>>", guestLocation);
    if (hostSocket !== null) {
      hostSocket.emit("guestAccepts", guestLocation, socket.id);
    }
  });

  socket.on("liveTracking", guestLocation => {
    console.log("<<<<<<<<<<BACKGROUND DRIVER TRACKING >>>>>>>", guestLocation);
    if (hostSocket !== null) {
      hostSocket.emit("liveTracking", guestLocation, socket.id);
    }
  });

  socket.on("stopSharing", function (room) {
    try {
      console.log("[socket]", "leave room :", room);
      socket.leave(room);
      socket.to(room).emit("user left", socket.id);
    } catch (e) {
      console.log("[error]", "leave room :", e);
      socket.emit("error", "couldnt perform requested action");
    }
  });
});

server.listen(PORT, () => {
  console.log("server started and listening on port " + PORT);
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
