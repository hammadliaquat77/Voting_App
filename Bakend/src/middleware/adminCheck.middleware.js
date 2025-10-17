import { User } from "../models/user.model.js";


const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default checkAdmin