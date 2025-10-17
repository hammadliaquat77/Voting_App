import { Candidate } from "../models/candidate.model.js";
import { User } from "../models/user.model.js";


const createCandidate = async (req, res) => {
    try {

        const { name, age, party } = req.body;

        const existingCandidate = await Candidate.findOne({ party });

        if (existingCandidate) {
            return res.status(400).json({ error: "Candidate already exists" });
        }

        const candidate = await Candidate.create({
            name,
            age,
            party
        });

        res.status(200).json({ candidate, message: "Candidate created successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCandidate = async (req, res) => {
    try {

        const { id } = req.params;
        const candidate = await Candidate.findByIdAndDelete(id);
        res.status(200).json({ candidate, message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCandidate = async (req, res) => {
    try {

        const { id } = req.params;
        const candidate = await Candidate.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ candidate, message: "Candidate updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllCandidate = async (req, res) => {

    try {
        const candidate = await Candidate.find();
        res.status(200).json({ candidate });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// User vote

const userVote = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.userVoted) {
            return res.status(400).json({ error: "User has already voted" });
        }
            
        if (user.role == "admin") {
            return res.status(400).json({ error: "Admins cannot vote" });
        }

        candidate.vote.push({ user: user._id, });
        candidate.voteCount ++;
        await candidate.save();

        user.userVoted = true;
        await user.save();
        
        res.status(200).json({ message: "User voted successfully" });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



const voteCount = async (req, res)=> {
    try {
        const candidate = await Candidate.find().sort({ voteCount: "desc"});

        const result = candidate.map((c) => ({
            name: c.name,
            age: c.age,
            party: c.party,
            voteCount: c.voteCount
        }));

        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}


export {
    createCandidate,
    deleteCandidate,
    updateCandidate,
    getAllCandidate,
    userVote,
    voteCount
}