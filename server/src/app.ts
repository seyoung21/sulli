import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

const server = new http.Server(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.send("OK");
});

io.on("connection", () => {
  console.log(`New connection at ${new Date().toLocaleTimeString()}`);
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Started the server");
});
