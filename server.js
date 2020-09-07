const app = require("./api/index");
const models = require("./db/index");
const { db, User, Event } = models;
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io").listen(server);
const PORT = process.env.PORT || 5000;

let taxiSocket = null;

io.on("connection", (socket) => {
  console.log("server connection");
  socket.on("taxiRequest", (routeResponse) => {
    console.log("looking for a taxi");
    if (taxiSocket !== null) {
      console.log("taxiSocket is a valid socket");
      taxiSocket.emit("taxiRequest", routeResponse);
    }
  });

  socket.on("lookingForPassenger", () => {
    console.log("Someone is looking for a passenger");
    taxiSocket = socket;
  });
});

server.listen(PORT, async () => {
  console.log("server running on port", PORT);
});
