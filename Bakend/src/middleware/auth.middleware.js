// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// const authMiddleWare = async (req, res, next) => {
     
//     try {
//          const token = await req.headers.authorization.replace("Bearer ", "");
//          const decoded = await jwt.verify(token, process.env.JWT_SECRET);

//          const user = await User.findById(decoded._id).select("-password");
//          if(user){
//             req.user = user;
//             next();
//          }
//     } catch (error) {
//         res.status(500).json({ message: "Invalid or expired token" });
//     }
// }


// export default authMiddleWare




import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // req.user = user._id;
    req.user = user._id; 

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
