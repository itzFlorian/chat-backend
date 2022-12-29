const checkUser = (req, res, next) =>{
  try{
    if (req.body.id === req.token.id){
      next()
    }
    res.status(401).json({message:"User not authorized!", status:false})
  }catch(err){
    res.json({message:err.message, status:false})
  }
}
  
export default checkUser;