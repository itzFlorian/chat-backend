import express from "express";
import { validateRequest, loginValidator } from "../middleware/validator.js";
import { postLogin } from "../controller/userController.js";

const loginRouter = express.Router();

loginRouter
.route("/")
  .post(loginValidator, validateRequest, postLogin)

export default loginRouter