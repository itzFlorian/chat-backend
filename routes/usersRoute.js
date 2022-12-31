import express from "express";
import {
  postOne,
  postLogin,
  patchAvatar,
  getOne,
  findOneByName,
  addFriendById,
  getAllFriends
} from "../controller/userController.js";
import { validateRequest, userValidator, loginValidator } from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import checkUser from "../middleware/checkUser.js";
// set userRouter
const userRouter = express.Router();

// set routes in root
userRouter  
  .route("/:id")
  .get(getOne)

userRouter
.route("/register")
.post(userValidator, validateRequest, postOne);

userRouter
.route("/login")
.post(loginValidator, validateRequest, postLogin)

userRouter
.route("/setAvatar")
.patch(auth, patchAvatar)
userRouter

  .route("/search/:name")
    .get(auth, findOneByName)

userRouter
  .route("/check/:id")
    .get(auth, getOne)

userRouter
  .route("/addFriend/:id")
    .patch(addFriendById)

userRouter  
  .route("/friends/:id")
    .get(getAllFriends)

// set routes on param
// userRouter.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

export default userRouter;
