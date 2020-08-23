import express from "express";
import http from "http";
import cors from "cors";
import { nanoid } from "nanoid";
import Datastore from "nedb";

const db = new Datastore({ filename: "rooms.bin", autoload: true });

const app = express();
app.use(cors());

const server = new http.Server(app);
const io: SocketIO.Server = require("socket.io")(server, {
  path: "/api/socket.io",
});

app.get("/api", (req, res) => {
  res.send("OK");
});

io.on("connection", (socket: SocketIO.Socket) => {
  socket.on("create_room", (roomName) => {
    const roomID = nanoid(6);
    const roomAdminID = socket.id;
    socket.join(roomID);
    console.log(
      `Added admin user: ${roomAdminID} with socket: ${socket.id} and started room ${roomID}`
    );
    db.insert({ roomID, admin: roomAdminID, roomName }, (err, doc) => {
      if (err) {
        socket.emit("create_room_success", "none");
        console.log(err);
      } else {
        socket.emit("create_room_success", roomID);
        console.log(`Emitted join success id to admin user ${socket.id}`);
      }
    });
  });

  socket.on("join_room", (roomID: string) => {
    socket.join(roomID);
    console.log(`Added user: ${socket.id} to room: ${roomID}`);
    socket.emit("join_room_success");
    db.findOne({ roomID: roomID }, (err, doc) => {
      const roomAdmin = doc.admin;
      io.to(roomAdmin).emit("student_list", socket.adapter.rooms[roomID]);
      console.log(`Emitted student list to admin: ${roomAdmin}`);
    });
  });

  socket.on("student_reaction", ({ reaction, room }) => {
    console.log(
      `Received reaction: ${reaction} from student: ${socket.id} in room: ${room}`
    );
    db.findOne({ roomID: room }, (err, doc) => {
      const roomAdmin = doc.admin;
      io.to(roomAdmin).emit("student_reaction_incoming", {
        reaction,
        sender: socket.id,
      });
      console.log(
        `Emitted reaction: ${reaction} to admin: ${roomAdmin} in room: ${room}`
      );
    });
  });

  socket.on("get_room_count", (roomID: string) => {
    socket.emit("room_count", socket.adapter.rooms[roomID].length);
  });

  socket.on("get_room_name", (roomID: string) => {
    db.findOne({ roomID: roomID }, (err, doc) => {
      const roomName = doc.roomName;
      socket.emit("room_name", roomName);
    });
  });

  socket.on("exit_room", (roomID: string) => {
    console.log(`User: ${socket.id} is leaving the room: ${roomID}`);
    db.findOne({ roomID: roomID }, (err, doc) => {
      const roomAdmin = doc.admin;
      socket.leave(roomID, () => {
        io.to(roomAdmin).emit("student_list", socket.adapter.rooms[roomID]);
        console.log(`Sent updated student list to room admin: ${roomAdmin}`);
      });
    });
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Started the server");
});
