// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const VotingPage = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [voteCount, setVoteCount] = useState(0);


//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return
//     }
//     // console.log("token==>", token);

//     fetchCandidate();
//     totalVoteCount();

//   }, [])


//   const fetchCandidate = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/candidate/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("Response from backend:", response.data);

//       const sortedData = [...response.data.candidate].sort(
//         (a, b) => b.voteCount - a.voteCount
//       );

//       console.log("Sorted in frontend:", sortedData);
//       setCandidates(sortedData);
//     } catch (error) {
//       console.error("Error fetching candidates:", error.message);
//     }
//   };




//   const userVote = async (id) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/candidate/vote/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       await fetchCandidate(); // fresh data reload karo

//       totalVoteCount();

//       alert(response.data.message);
//     } catch (error) {
//       alert(error.response.data.message || "Vote failed.");
//     }
//   };


//   const totalVoteCount = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/candidate/vote/count",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("Vote Count Response:", response.data);
//       setVoteCount(response.data.result.voteCount || 0);
//     } catch (error) {
//       console.error("Error fetching total votes:", error);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-[#001124] text-white px-6 py-10">

//       {/* Navbar */}
//       <Navbar />

//       {/* Page Title */}
//       <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400">
//         Cast Your Vote
//       </h1>

//       {/* Candidates Grid */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl  mx-auto ">
//         {candidates && candidates.length > 0 ? (

//           candidates.map((candidate) => (
//             <div
//               key={candidate._id}
//               className="bg-[#011a3a] p-6 rounded-2xl shadow-lg hover:shadow-blue-800 transition duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
//             >
//               <img
//                 src={candidate.image}
//                 alt={candidate.name}
//                 className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
//               />
//               <h2 className="text-xl font-semibold">{candidate.name}</h2>
//               <p className="text-blue-300 mb-3">{candidate.party}</p>

//               <div className="bg-blue-950 py-2 px-4 rounded-lg mb-4">
//                 <p className="text-sm text-blue-300">Total Votes</p>
//                 <p className="font-bold text-lg text-blue-400">{candidate.voteCount}</p>
//               </div>

//               <button
//                 className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer font-semibold py-2 rounded-lg transition duration-300"
//                 onClick={() => userVote(candidate._id)}
//               >
//                 Vote
//               </button>
//             </div>
//           ))) : (
//           // <p className="flex justify-center items-center">No Candidates...</p>
//           <div className="flex flex-col justify-center items-center text-center">
//             <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" />
//             <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
//             <p className="text-zinc-600 dark:text-zinc-400">
//               No Candidates yet
//             </p>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default VotingPage;






import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VotingPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [voteCount, setVoteCount] = useState(0);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchCandidate();
    totalVoteCount();
  }, []);

  const fetchCandidate = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/candidate/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedData = [...response.data.candidate].sort(
        (a, b) => b.voteCount - a.voteCount
      );

      setCandidates(sortedData);
    } catch (error) {
      console.error("Error fetching candidates:", error.message);
    }
  };

  const userVote = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/candidate/vote/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchCandidate();
      totalVoteCount();

      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || "Vote failed.");
    }
  };

  const totalVoteCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/candidate/vote/count",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVoteCount(response.data.result.voteCount || 0);
    } catch (error) {
      console.error("Error fetching total votes:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#001124] text-white px-6 py-10 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400">
        Cast Your Vote
      </h1>

      {/* Candidates Grid */}
      <div className="flex justify-center flex-grow">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center max-w-7xl w-full">
          {candidates && candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="bg-[#011a3a] p-6 rounded-2xl shadow-lg hover:shadow-blue-800 transition duration-300 hover:-translate-y-1 flex flex-col items-center text-center w-72"
              >
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
                />
                <h2 className="text-xl font-semibold">{candidate.name}</h2>
                <p className="text-blue-300 mb-3">{candidate.party}</p>

                <div className="bg-blue-950 py-2 px-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-300">Total Votes</p>
                  <p className="font-bold text-lg text-blue-400">
                    {candidate.voteCount}
                  </p>
                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer font-semibold py-2 rounded-lg transition duration-300"
                  onClick={() => userVote(candidate._id)}
                >
                  Vote
                </button>
              </div>
            ))
          ) : (
            // Centered Loader
            <div className="flex flex-col justify-center items-center h-[60vh] text-center col-span-full">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mb-4" />
              <h2 className="text-white text-lg font-semibold">Loading...</h2>
              <p className="text-blue-300">No Candidates yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
