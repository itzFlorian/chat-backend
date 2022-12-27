import express from "express";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/userController.js";
// set userRouter
const userRouter = express.Router();
// set routes in root
userRouter.route("/").get(getAll).post(postOne);
// set routes on param
userRouter.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

export default userRouter;
