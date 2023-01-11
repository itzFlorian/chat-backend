import Message from "../models/Message.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr("fsdfrewsgdfsg")

const addMessage = async (req, res, next) => {
  try{
    const {from, to, message} = req.body;
    //ENCRYPTION
    const encryptedMsg = cryptr.encrypt(message)
    const data = await Message.create({
      message: {text: encryptedMsg},
      users:[from, to],
      sender:from
    });
    if(data){
      return res.json({message:"msg added successfully"})
    }
    return res.json({message:"msg failed to add"})
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
    .sort({ updatedAt: "desc" })
    .limit(10)

    // DECRYPTION
    messages.reverse()
    messages.forEach(msg => {
      const decrypted = cryptr.decrypt(msg.message.text)
      msg.message.text = decrypted       
    })
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