import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/usersRoute.js";
import messagesRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";
const PORT = process.env.PORT || 4000;
const URI = process.env.URI || "mongodb://localhost:27017/chat-app";

// initialize express
const app = express();

// set middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// set routes
app.use("/users", userRouter);
app.use("/messages", messagesRouter);
app.use(express.static("dist"));

// set mongoose
mongoose.connect(URI, {
  useNewUrlParser : true,
  useUnifiedTopology:true,})
  .then(() => {
    console.log("DB-Connected successfully");
  })
  .catch((err)=> console.log(err.message))

// set express on PORT
const server = app.listen(PORT, () => {
  console.log("Server listen on PORT: " + PORT);
});


// SOCKETS
const io = new Server(server, {
  cors:{
    origin:"https://chat-frontend-umber.vercel.app",
    origin:"http://http://localhost:5173",
    credentials:true
  }
})


global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("user online");
  global.chatSocket = socket
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (data) => {
    console.log("user send msg");
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message)
    }
  })
}) 
