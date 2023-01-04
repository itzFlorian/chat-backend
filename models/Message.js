import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
  {
  message: {
    text:{
      type:String
    },
  },
    users: Array,
    sender: {
      type:mongoose.Schema.Types.ObjectId, 
      ref:"User"
    },
  },
  {
    timestamps:true
  }
);

export default mongoose.model("Message", messageSchema);
