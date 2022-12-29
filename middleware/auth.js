import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token= req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, process.env.JWT_KEY)
    req.token = verify
    next()
  } catch (err) {
    res.status(400).json({message:err.message, status:false})
  }
};

export default auth;