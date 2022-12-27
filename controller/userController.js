import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const getAll = async (req, res) => {
  try {
    res.status(200).send(await User.find());
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
export const getOne = async (req, res) => {
  try {
    res.status(200).send(await User.findById(req.params.id));
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
export const postOne = async (req, res) => {
  try {
    const {username, password, email} = req.body
    const usernameCheck = await User.findOne({username})
    if(usernameCheck){
      return res.json({message:"Username already in use", status:false})
    }
    const emailCheck = await User.findOne({email}) 
    if(emailCheck){
      return res.json({message:"email is already in use", status:false})
    }
    const hashedPw = await bcrypt.hash(password, 10)
    req.body.password = hashedPw
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
export const updateOne = async (req, res) => {
  try {
    res.status(201).send(await User.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
export const deleteOne = async (req, res) => {
  try {
    res.status(200).send(await User.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
