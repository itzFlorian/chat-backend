import express from "express";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/userController.js";
import { validateRequest, userValidator } from "../middleware/validator.js";
// set userRouter
const userRouter = express.Router();

// set routes in root
userRouter
  .route("/")
    .get(getAll)
    .post(userValidator, validateRequest, postOne);
// set routes on param
userRouter.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

export default userRouter;
