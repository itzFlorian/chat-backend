import express from "express";
import {
  postOne,
  postLogin,
} from "../controller/userController.js";
import { validateRequest, userValidator, loginValidator } from "../middleware/validator.js";
// set userRouter
const userRouter = express.Router();

// set routes in root
userRouter
  .route("/register")
    .post(userValidator, validateRequest, postOne);
userRouter
  .route("/login")
    .post(loginValidator,validateRequest, postLogin)


// set routes on param
// userRouter.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

export default userRouter;
