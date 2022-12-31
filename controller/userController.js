import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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
    await User.create(req.body)
    delete req.body.password
    res.status(201).json({status:true, username, email})  
  } catch (err) {
    res.status(404).send({ message: err.message, status:false });
  }
};

export const postLogin = async (req, res, next) => {
  try{
    const {password, username} = req.body;
    const user = await User.findOne({username})
    const isPasswordvalid = await bcrypt.compare(password, user.password )
    if(!isPasswordvalid || !user){
      res.status(401).json({message:"incorrect username or password",status:false})
    }
    const token = jwt.sign({username, id:user._id}, process.env.JWT_KEY)
    delete user.password
    return res.json({status:true, token, id:user._id})
  }catch(err){
    res.status(404).json({message:err.message,status:false})
  }

}

export const patchAvatar = async (req, res, next) => {
  try{
    const {img, id} = req.body
    const user = await User.findByIdAndUpdate(id, {
      isAvatarImgSet:true,
      avatarImg:img      
    },{new:true} )
    res.json({message:"Userimage updated", status:true, user}) 
  }catch(err){
    res.status(400).json({message:err.message, status:false})
  }
}

export const getOne = async (req, res) => {
  try {
    res.status(200).send(await User.findById(req.params.id));
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

export const findOneByName = async (req,res,next) => {
  try {
    const name = req.params.name
    const existedUser = await User.findOne({username:name})
    console.log(existedUser);
    if(existedUser !== null){
      res.status(200).json({status:true, existedUser})
    }else{
      res.status(401).json({status:false, message:"No User found."})
    }
  } catch (err) {
    res.status(404).send({ message: err });itzRAF
  }
}

export const addFriendById = async (req, res, next) => {
  try {
    const friendId = req.params.id
    const myID = req.body.id
    const me = await User.findById(myID).populate("friends")

    const found = me && me.friends.find(friend => friend._id.toString() === friendId.toString())
    if(!found){
      await User.findByIdAndUpdate(myID, {$push:{friends:friendId}}, {new:true})
      return res.status(201).json({message:"Friend added!", status:true })
    }
    return res.status(401).json({message:"youre already friends", status:false})
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
}

export const getAllFriends = async (req,res,next) => {
  try {
    const myId = req.params.id 
    const me = await User.findById(myId).populate("friends")
    const friends = me.friends
    res.status(200).json({status:true, friends, me})
  } catch (err) {
    res.status(400).json({message:err.message})
  }
}







export const getAll = async (req, res) => {
  try {
    res.status(200).send(await User.find());
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
