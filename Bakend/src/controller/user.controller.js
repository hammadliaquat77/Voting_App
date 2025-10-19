import {User} from "../models/user.model.js";
import generateToken from "../utils/generatedToken.js";



const Signup = async (req, res) => {
    try {
        const { name, age, phone, address, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await User.create({
            name,
            age,
            phone,
            address,
            email,
            password
        });

        newUser.save();

        const paylod = {
            _id: newUser._id,
        };

        const token = await generateToken(newUser);

        res.status(201).json({
            newUser,
            token,
            message: "User created successfully",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password, user.password);

        const payload = {
            _id: user._id,
        };

        const token = await generateToken(user);

        if (isMatch) {
            return res.status(200).json({
                user,
                token,
                message: "User logged in successfully",
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const logout = async (req, res) => {
    try {
        const token = await req.header("authorization").replace("Bearer ", "");
        res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Profile = async (req, res) => {
    try {
        // const userData = await User.findById(req.user);
        const user = await User.findById(req.user);
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updatePassword = async (req, res) => {
  try {
    // const userId = req.user; // This should be set by auth middleware
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hashing handled automatically in pre-save hook
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export {
    Signup,
    login,
    logout,
    Profile,
    updatePassword,
    getAllUsers
}