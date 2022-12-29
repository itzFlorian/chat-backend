import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/usersRoute.js";


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


// set mongoose
mongoose.connect(URI, {
  useNewUrlParser : true,
  useUnifiedTopology:true,})
  .then(() => {
    console.log("DB-Connected successfully");
  })
  .catch((err)=> console.log(err.message))

// set express on PORT
app.listen(PORT, () => {
  console.log("Server listen on PORT: " + PORT);
});
