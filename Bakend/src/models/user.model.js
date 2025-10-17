import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    userVoted: {
        type: Boolean,
        required: true,
        default: false
    },

}, {timestamps: true});


// pre save hook convert password to hash
userSchema.pre("save", async function(next){
    
    if (!this.isModified("password")) return next(); 

    this.password = await bcrypt.hashSync(this.password, 10);
    next()
})


// compare password
userSchema.methods.comparePassword = async function(password){

    if (!password || !this.password) {
        throw new Error("Password is required");
    }

     return await bcrypt.compare(String(password), this.password);
}

export const User = mongoose.model("User", userSchema);
