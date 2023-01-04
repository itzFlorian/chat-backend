import express from "express";
import { validateRequest, userValidator, loginValidator } from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import { addMessage, getAllMessages } from "../controller/messagesController.js";
const messagesRouter = express.Router();

messagesRouter
  .route("/addmsg")
    .post(addMessage)
messagesRouter
  .route("/getmsg")
    .post(getAllMessages)
export default messagesRouter