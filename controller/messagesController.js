import Message from "../models/Message.js";
import bcrypt from "bcrypt"
const addMessage = async (req, res, next) => {
  try{
    const {from, to , message} = req.body;
    const data = await Message.create({
      message: {text: message},
      users:[from, to],
      sender:from
    });
    if(data){
      return res.json({message:"msg added successfully"})
    }
    return res.josn({message:"msg failed to add"})
  }catch(err){
    console.log(err.message);
    res.json(err.message)
  }
}

const getAllMessages = async (req, res, next) => {
  try {
    const {from, to} = req.body
    const messages = await Message.find({
      users: {
        $all: [from, to],
      }
    })
    .sort({ updatedAt: 1 })
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        date:msg.createdAdd
      }
    })
    res.json(projectMessages)
  } catch (err) {
    res.status(400).send(err.message)
    console.log(err.message);
  }
}

export {addMessage, getAllMessages}