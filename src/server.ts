import "dotenv/config";
import mongoose from "mongoose";
import processEnv from "./util/validateEnv";
import app from "./app";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/Message";

const port = processEnv.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://real-time-chat-000-client.onrender.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // // Everyone will receive the message
  // socket.on("send_message", (data) => {
  //   socket.broadcast.emit("receive_message", data);
  // });

  // Only users from the same room will receive the message
  socket.on("send_message", async (data) => {
    console.log(data);

    const newMessage = new Message({
      sender: data.sender,
      content: data.message,
    });
    await newMessage.save();

    socket.to(data.room).emit("receive_message", data);
  });
});

mongoose
  .connect(processEnv.MONGODB_CONNECTION)
  .then(() => {
    console.log("Mongoose connected");

    server.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch(console.error);
