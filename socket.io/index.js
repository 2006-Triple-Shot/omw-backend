// const express = require("express");
// const app = express();
// const io = require("socket.io").listen(server);

// let taxiSocket = null;

// io.on("connection", (socket) => {
//   console.log("server connection");
//   socket.on("taxiRequest", (routeResponse) => {
//     console.log("looking for a taxi");
//     if (taxiSocket !== null) {
//       console.log("taxiSocket is a valid socket");
//       taxiSocket.emit("taxiRequest", routeResponse);
//     }
//   });

//   socket.on("lookingForPassenger", () => {
//     console.log("Someone is looking for a passenger");
//     taxiSocket = socket;
//   });
// });

// module.exports = io;
