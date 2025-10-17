import React, { useState } from "react";
import { Link } from "react-router-dom";

const VotingPage = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "John Doe",
      party: "People’s Party",
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      votes: 0,
    },
    {
      id: 2,
      name: "Sarah Khan",
      party: "Unity Alliance",
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
      votes: 0,
    },
    {
      id: 3,
      name: "Ali Raza",
      party: "National Front",
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
      votes: 0,
    },
    {
      id: 4,
      name: "Ayesha Malik",
      party: "Green Movement",
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140049.png",
      votes: 0,
    },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Show confirmation modal
  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  // Confirm vote and increase vote count
  const confirmVote = () => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === selectedCandidate.id
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );
    alert(`✅ You have successfully voted for ${selectedCandidate.name}`);
    setShowModal(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="min-h-screen bg-[#001124] text-white px-6 py-10">
      
        <nav className="flex flex-wrap justify-center md:justify-end items-center w-full gap-3 sm:gap-6 md:gap-8 mb-10 text-base sm:text-lg font-medium">
        <Link to={"/personalinfo"}>
        {/* <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-1 rounded-lg text-white text-sm sm:text-base">Home</button> */}

        <button className="border-b-2 border-blue-600 pb-1 hover:text-blue-400 transition">
          Personal Info
        </button>
        </Link>

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
      
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400">
        🗳️ Cast Your Vote
      </h1>

      {/* Candidates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-[#011a3a] p-6 rounded-2xl shadow-lg hover:shadow-blue-800 transition duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
            />
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-blue-300 mb-3">{candidate.party}</p>

            <div className="bg-blue-950 py-2 px-4 rounded-lg mb-4">
              <p className="text-sm text-blue-300">Current Votes</p>
              <p className="font-bold text-lg text-blue-400">{candidate.votes}</p>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              onClick={() => handleVoteClick(candidate)}
            >
              Vote
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#011a3a] p-8 rounded-2xl text-center w-[90%] max-w-md shadow-lg border border-blue-600">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Confirm Your Vote
            </h2>
            <p className="mb-6 text-gray-300">
              Are you sure you want to vote for{" "}
              <span className="font-semibold text-blue-400">
                {selectedCandidate?.name}
              </span>
              ?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmVote}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;
