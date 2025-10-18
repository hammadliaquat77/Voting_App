// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// const MyVote = ({ votedCandidate }) => {

//   const token = localStorage.getItem("token");
//   const [myVote, setMyVote] = useState([]);

//   useEffect(() => {
//     userVote();
//   }, []);

//   const userVote = async (id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/candidate/myvote`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMyVote(response.data.candidate);
//       // alert(response.data.message);
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#001124] text-white px-6 py-10 flex flex-col items-center">

//       {/* Navbar */}
//       <Navbar />

//       {/* Title */}
//       <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8">
//         🗳️ Your Vote Summary
//       </h1>

//       {myVote && (
//         <div
//           key={myVote._id}
//           className="bg-[#011a3a] w-[220px] sm:w-[400px] md:w-[500px] p-6 rounded-2xl shadow-lg hover:shadow-blue-800 transition duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
//         >
//           <img
//             src={myVote.image}
//             alt={myVote.name}
//             className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
//           />
//           <h2 className="text-xl font-semibold">{myVote.name}</h2>
//           <p className="text-blue-300 mb-3">{myVote.party}</p>

//           <div className="bg-blue-950 py-2 px-4 rounded-lg mb-4">
//             <p className="text-sm text-blue-300">Total Votes</p>
//             <p className="font-bold text-lg text-blue-400">{myVote.voteCount}</p>
//           </div>
//         </div>
//       ) : (
//         <p className="text-lg text-blue-400">You have not voted yet.</p>
//       )}
//     </div>
//   );
// };

// export default MyVote;


import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const MyVote = () => {
  const token = localStorage.getItem("token");
  const [myVote, setMyVote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyVote();
  }, []);

  const fetchMyVote = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/candidate/myvote",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyVote(response.data.candidate || null);
    } catch (error) {
      console.error(error);
      setMyVote(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000c1f] via-[#001736] to-[#000a18] text-white px-6 py-10 flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-10 text-center">
         Your Vote Summary
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-blue-400 animate-pulse text-lg">Loading...</div>
      ) : myVote ? (
        <div
          key={myVote._id}
          className="bg-white/10 backdrop-blur-lg border border-white/20 
                     w-[90%] sm:w-[400px] md:w-[500px] p-8 rounded-3xl 
                     shadow-2xl hover:shadow-blue-800 transition duration-300 
                     hover:-translate-y-1 flex flex-col items-center text-center"
        >
          <img
            src={myVote.image}
            alt={myVote.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-5 shadow-lg object-cover"
          />
          <h2 className="text-2xl font-bold text-blue-300">{myVote.name}</h2>
          <p className="text-blue-400 text-lg mb-5">{myVote.party}</p>

          <div className="bg-blue-950/60 py-3 px-6 rounded-xl mb-4 w-fit">
            <p className="text-sm text-blue-300">Total Votes</p>
            <p className="font-bold text-2xl text-blue-400">
              {myVote.voteCount}
            </p>
          </div>

          <p className="text-green-400 font-semibold text-sm bg-green-900/30 px-4 py-1 rounded-full">
            You successfully voted for {myVote.name}
          </p>
        </div>
      ) : (
        <p className="text-lg text-blue-400 mt-8">
          You haven’t voted yet. Go to the <span className="text-blue-500 font-semibold">Elections</span> page to vote.
        </p>
      )}
    </div>
  );
};

export default MyVote;
