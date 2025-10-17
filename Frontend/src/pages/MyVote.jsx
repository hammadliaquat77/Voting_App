import React from "react";
import { Link } from "react-router-dom";

const MyVote = ({ votedCandidate }) => {
  return (
    <div className="min-h-screen bg-[#001124] text-white px-6 py-10 flex flex-col items-center">
     
       <nav className="flex flex-wrap justify-center md:justify-end items-center w-full gap-3 sm:gap-6 md:gap-8 mb-10 text-base sm:text-lg font-medium">
        <button className="border-b-2 border-blue-600 pb-1 hover:text-blue-400 transition">
          Personal Info
        </button>

        <Link to={"/votingpage"}>
        <button className="hover:text-blue-400 transition">Elections</button>
        </Link>

        <button className="hover:text-blue-400 transition">Contact</button>
        <Link to={"/vote"}>
        <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-1 rounded-lg text-white text-sm sm:text-base">
          Vote
        </button>
        </Link>
      </nav>
     
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8">
        🗳️ Your Vote Summary
      </h1>

      {votedCandidate ? (
        <div className="bg-[#011a3a] rounded-2xl shadow-lg border border-blue-700 p-8 w-[90%] max-w-md flex flex-col items-center text-center">
          <img
            src={votedCandidate.image}
            alt={votedCandidate.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{votedCandidate.name}</h2>
          <p className="text-blue-300 mb-4">{votedCandidate.party}</p>
          <div className="bg-blue-950 py-2 px-6 rounded-lg mb-4">
            <p className="text-sm text-blue-300">Total Votes (Live)</p>
            <p className="font-bold text-lg text-blue-400">
              {votedCandidate.votes}
            </p>
          </div>
          <p className="text-green-400 font-semibold">
            ✅ You have successfully voted for {votedCandidate.name}
          </p>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-xl text-gray-300">
            ⚠️ You haven’t voted yet.
          </h2>
          <p className="text-blue-400 mt-2">
            Go back to the Voting Page to cast your vote.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyVote;
