import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   age: {
      type: Number,
      required: true
   },
   party: {
      type: String,
      required: true,
      unique: true
   },
   image: {
        type: String,
      //   required: true,
        unique: true
   },
   vote: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        votedAt: {
            type: Date,
            default: Date.now()
        }
    }
   ],
   voteCount: {
      type: Number,
      default: 0
   }    
})

export const Candidate = mongoose.model("Candidate", candidateSchema);