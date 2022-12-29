import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  username: {
    type: String,
    min:3,
    required: true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    min:7
  },
  isAvatarImgSet:{
    type:Boolean,
    default:false
  },
  avatarImg:{
    type:"String",
    default:""
  },
  friends:[
    {  
      type: mongoose.Types.ObjectId, 
      ref: "User"  
    }
    ]
});

export default mongoose.model("User", userSchema, "users");
