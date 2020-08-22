import express from "express";
import http from "http";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
app.use(cors());

const server = new http.Server(app);
const io: SocketIO.Server = require("socket.io")(server);

app.get("/", (req, res) => {
  res.send("OK");
});

io.on("connection", (socket: SocketIO.Socket) => {
  socket.on("create_room", () => {
    const classroom_id = nanoid(6);
    socket.join(classroom_id);
    console.log(classroom_id);
    socket.emit("create_room_success", classroom_id);
  });

  socket.on("join_room", (roomID: string) => {
    socket.join(roomID);
    console.log("joined");
    console.log(io.sockets.adapter.rooms[roomID].length);
    socket.emit("join_room_success");
  });

  socket.on("student_reaction", (reaction: string) => {
    console.log("Got reaction", reaction);
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Started the server");
});
