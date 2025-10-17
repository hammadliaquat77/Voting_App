import jwt from "jsonwebtoken";

const generateToken = async (user)=> {
   try {
     const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
     return token

   } catch (error) {
    console.log(error.message);
   }
} 

export default generateToken
