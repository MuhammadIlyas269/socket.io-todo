require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const socketConnection = require("./src/socket");

const http = require("http");

const { Server } = require("socket.io"); // bind http server to socket.io

function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // socket.io connection
  socketConnection(io);

  connectDB().then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  });
}

startServer();
