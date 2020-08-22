import express from "express";
import http from "http";
import cors from "cors";
import { nanoid } from "nanoid";
import Datastore from "nedb";

const db = new Datastore({ filename: "rooms.bin", autoload: true });

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
    const roomAdminID = socket.id;
    socket.join(classroom_id);
    db.insert({ roomID: classroom_id, admin: roomAdminID }, (err, doc) => {
      if (err) {
        socket.emit("create_room_success", "none");
        console.log(err);
      } else {
        socket.emit("create_room_success", classroom_id);
      }
    });
  });

  socket.on("join_room", (roomID: string) => {
    socket.join(roomID);
    socket.emit("join_room_success");
    db.findOne({ roomID: roomID }, (err, doc) => {
      const roomAdmin = doc.admin;
      console.log(socket.adapter.rooms[roomID]);
      io.to(roomAdmin).emit("student_list", socket.adapter.rooms[roomID]);
    });
  });

  socket.on("student_reaction", ({ reaction, room }) => {
    db.findOne({ roomID: room }, (err, doc) => {
      const roomAdmin = doc.admin;
      io.to(roomAdmin).emit("student_reaction_incoming", {
        reaction,
        sender: socket.id,
      });
    });
  });

  socket.on("get_room_count", (roomID: string) => {
    socket.emit("room_count", socket.adapter.rooms[roomID].length);
  });

  socket.on("exit_room", (roomID: string) => {
    db.findOne({ roomID: roomID }, (err, doc) => {
      const roomAdmin = doc.admin;
      console.log(socket.adapter.rooms[roomID]);
      socket.leave(roomID, () => {
        io.to(roomAdmin).emit("student_list", socket.adapter.rooms[roomID]);
      });
    });
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Started the server");
});
