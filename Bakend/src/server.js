import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import bodyParser from "body-parser";
import connectDB from "./config/dbConnect.js";
import userRouter from "./routes/auth.route.js";
import CandidateRouter  from "./routes/candidate.route.js";



const app = express();
dotenv.config();

const PORT = process.env.PORT
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/candidate", CandidateRouter);




app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})
