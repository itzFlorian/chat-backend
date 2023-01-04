import Message from "../models/Message.js";

const addMessage = async (req, res, next) => {
  try{
    const {from, to , message} = req.body;
    const data = await Message.create({
      message: {text: message},
      users:[from, to],
      sender:from
    })
    if(data){
      return res.json({message:"msg added successfully"})
    }
    return res.josn({message:"msg failed to add"})
  }catch(err){
    res.json(err.message)
  }
}

const getAllMessages = (req, res, next) => {

}

export {addMessage, getAllMessages}