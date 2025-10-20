
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [refresh, setRefresh] = useState(false);
//   const [activeTab, setActiveTab] = useState("users");
//   const [users, setUsers] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [newCandidate, setNewCandidate] = useState({ name: "", age: "", party: "" });
//   const [editingCandidate, setEditingCandidate] = useState(null);

//   // ✅ Fetch all users and candidates
//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//       return;
//     }
//     fetchUsers();
//     fetchCandidates();
//   }, [refresh]);

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/user/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(res.data.users);
      
//       setUsers(res.data.users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Fetch candidates
//   const fetchCandidates = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/candidate/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCandidates(res.data.candidate);
//     } catch (error) {
//       console.error("Error fetching candidates:", error);
//     }
//   };

//   //  Add Candidate
//   const addCandidate = async () => {
//     if (!newCandidate.name || !newCandidate.age || !newCandidate.party)
//       return alert("Please fill all fields!");

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/candidate/create",
//         newCandidate,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(res.data.message);
//       setNewCandidate({ name: "", age: "", party: "" });
//       setRefresh(!refresh);
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to add candidate");
//     }
//   };

//   //  Delete Candidate
//   const deleteCandidate = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8000/api/candidate/delete/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(res.data.message);
//       setRefresh(!refresh);
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to delete candidate");
//     }
//   };

//   //  Open Edit Modal
//   const startEditing = (candidate) => {
//     setEditingCandidate({ ...candidate });
//   };

//   //  Save Edited Candidate
//   const saveEdit = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:8000/api/candidate/update/${editingCandidate._id}`,
//         {
//           name: editingCandidate.name,
//           age: editingCandidate.age,
//           party: editingCandidate.party,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(res.data.message);
//       setEditingCandidate(null);
//       setRefresh(!refresh);
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to update candidate");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#000B1E] text-white flex flex-col items-center p-6">
//       <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8">
//         🧑‍💼 Admin Dashboard
//       </h1>

//       {/* Tabs */}
//       <div className="flex space-x-6 mb-8">
//         <button
//           className={`px-5 py-2 rounded-xl ${
//             activeTab === "users" ? "bg-blue-600" : "bg-blue-900"
//           }`}
//           onClick={() => setActiveTab("users")}
//         >
//           Users
//         </button>
//         <button
//           className={`px-5 py-2 rounded-xl ${
//             activeTab === "candidates" ? "bg-blue-600" : "bg-blue-900"
//           }`}
//           onClick={() => setActiveTab("candidates")}
//         >
//           Candidates
//         </button>
//       </div>

//       {/* USERS SECTION */}
//       {activeTab === "users" && (
//         <div className="bg-[#011a3a] w-full max-w-3xl p-6 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4 text-blue-400">All Users</h2>
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-blue-700">
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Email</th>
//                 <th className="p-2">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-blue-900 transition duration-200">
//                   <td className="p-2">{user.name}</td>
//                   <td className="p-2">{user.email}</td>
//                   <td className="p-2 capitalize">{user.role}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* CANDIDATES SECTION */}
//       {activeTab === "candidates" && (
//         <div className="bg-[#011a3a] w-full max-w-3xl p-6 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-6 text-blue-400 text-center">
//             Manage Candidates
//           </h2>

//           {/* Add Candidate Form */}
//           <div className="mb-6 grid sm:grid-cols-3 gap-3">
//             <input
//               type="text"
//               placeholder="Name"
//               value={newCandidate.name}
//               onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
//               className="px-3 py-2 rounded-lg bg-blue-950 text-white focus:outline-none"
//             />
//             <input
//               type="number"
//               placeholder="Age"
//               value={newCandidate.age}
//               onChange={(e) => setNewCandidate({ ...newCandidate, age: e.target.value })}
//               className="px-3 py-2 rounded-lg bg-blue-950 text-white focus:outline-none"
//             />
//             <input
//               type="text"
//               placeholder="Party"
//               value={newCandidate.party}
//               onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
//               className="px-3 py-2 rounded-lg bg-blue-950 text-white focus:outline-none"
//             />
//           </div>
//           <button
//             onClick={addCandidate}
//             className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
//           >
//             ➕ Add Candidate
//           </button>

//           {/* Candidate List */}
//           <div className="overflow-x-auto mt-8">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-blue-700">
//                   <th className="p-2">Name</th>
//                   <th className="p-2">Age</th>
//                   <th className="p-2">Party</th>
//                   <th className="p-2">Votes</th>
//                   <th className="p-2 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((c) => (
//                   <tr key={c._id} className="hover:bg-blue-900 transition duration-200">
//                     <td className="p-2">{c.name}</td>
//                     <td className="p-2">{c.age}</td>
//                     <td className="p-2">{c.party}</td>
//                     <td className="p-2">{c.voteCount || 0}</td>
//                     <td className="p-2 flex gap-3 justify-center">
//                       <button
//                         onClick={() => startEditing(c)}
//                         className="bg-yellow-400 px-3 py-1 rounded-lg text-black font-semibold"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => deleteCandidate(c._id)}
//                         className="bg-red-600 px-3 py-1 rounded-lg font-semibold"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* EDIT MODAL */}
//           {editingCandidate && (
//             <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//               <div className="bg-[#001a3a] p-6 rounded-2xl w-[90%] max-w-md shadow-lg">
//                 <h3 className="text-xl font-bold mb-4 text-blue-400 text-center">
//                   ✏️ Edit Candidate
//                 </h3>
//                 <div className="flex flex-col gap-3">
//                   <input
//                     type="text"
//                     value={editingCandidate.name}
//                     onChange={(e) =>
//                       setEditingCandidate({ ...editingCandidate, name: e.target.value })
//                     }
//                     className="w-full px-3 py-2 rounded-lg bg-blue-950 text-white"
//                   />
//                   <input
//                     type="number"
//                     value={editingCandidate.age}
//                     onChange={(e) =>
//                       setEditingCandidate({ ...editingCandidate, age: e.target.value })
//                     }
//                     className="w-full px-3 py-2 rounded-lg bg-blue-950 text-white"
//                   />
//                   <input
//                     type="text"
//                     value={editingCandidate.party}
//                     onChange={(e) =>
//                       setEditingCandidate({ ...editingCandidate, party: e.target.value })
//                     }
//                     className="w-full px-3 py-2 rounded-lg bg-blue-950 text-white"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-3 mt-5">
//                   <button
//                     onClick={() => setEditingCandidate(null)}
//                     className="bg-gray-600 px-4 py-2 rounded-lg"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={saveEdit}
//                     className="bg-blue-600 px-4 py-2 rounded-lg"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;







import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({ name: "", age: "", party: "" });
  const [editingCandidate, setEditingCandidate] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUsers();
    fetchCandidates();
  }, [refresh]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/candidate/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(res.data.candidate);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const addCandidate = async () => {
    if (!newCandidate.name || !newCandidate.age || !newCandidate.party)
      return alert("Please fill all fields!");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/candidate/create",
        newCandidate,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setNewCandidate({ name: "", age: "", party: "" });
      setRefresh(!refresh);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add candidate");
    }
  };

  const deleteCandidate = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/candidate/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setRefresh(!refresh);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete candidate");
    }
  };

  const startEditing = (candidate) => {
    setEditingCandidate({ ...candidate });
  };

  const saveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/candidate/update/${editingCandidate._id}`,
        {
          name: editingCandidate.name,
          age: editingCandidate.age,
          party: editingCandidate.party,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setEditingCandidate(null);
      setRefresh(!refresh);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update candidate");
    }
  };

  return (
    <div className="min-h-screen bg-[#000B1E] text-white flex flex-col items-center p-3 sm:p-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-6 text-center">
        🧑‍💼 Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-6 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
            activeTab === "users" ? "bg-blue-600" : "bg-blue-900"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
            activeTab === "candidates" ? "bg-blue-600" : "bg-blue-900"
          }`}
          onClick={() => setActiveTab("candidates")}
        >
          Candidates
        </button>
      </div>

      {/* USERS SECTION */}
      {activeTab === "users" && (
        <div className="bg-[#011a3a] w-full max-w-3xl p-4 sm:p-6 rounded-2xl shadow-lg overflow-x-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-400 text-center">
            All Users
          </h2>
          <table className="w-full text-sm sm:text-base text-left border-collapse">
            <thead>
              <tr className="border-b border-blue-700 text-blue-300">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-blue-900 transition duration-200">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2 break-words">{user.email}</td>
                  <td className="p-2 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CANDIDATES SECTION */}
      {activeTab === "candidates" && (
        <div className="bg-[#011a3a] w-full max-w-3xl p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-400 text-center">
            Manage Candidates
          </h2>

          {/* Add Candidate Form */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
              className="px-3 py-2 rounded-lg bg-blue-950 text-white focus:outline-none"
            />
            <input
              type="number"
              placeholder="Age"
              value={newCandidate.age}
              onChange={(e) => setNewCandidate({ ...newCandidate, age: e.target.value })}
              className="px-3 py-2 rounded-lg bg-blue-950 text-white focus:outline-none"
            />
            <input
              type="text"
              placeholder="Party"
              value={newCandidate.party}
              onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
              className="px-3 py-2 rounded-lg bg-blue-950 text-white focus:outline-none"
            />
          </div>

          <button
            onClick={addCandidate}
            className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
          >
            ➕ Add Candidate
          </button>

          {/* Candidate List */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm sm:text-base text-left border-collapse">
              <thead>
                <tr className="border-b border-blue-700 text-blue-300">
                  <th className="p-2">Name</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Party</th>
                  <th className="p-2">Votes</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr key={c._id} className="hover:bg-blue-900 transition duration-200">
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.age}</td>
                    <td className="p-2">{c.party}</td>
                    <td className="p-2">{c.voteCount || 0}</td>
                    <td className="p-2 flex flex-wrap sm:flex-nowrap gap-2 justify-center">
                      <button
                        onClick={() => startEditing(c)}
                        className="bg-yellow-400 px-3 py-1 rounded-lg text-black font-semibold text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCandidate(c._id)}
                        className="bg-red-600 px-3 py-1 rounded-lg font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EDIT MODAL */}
          {editingCandidate && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3">
              <div className="bg-[#001a3a] p-6 rounded-2xl w-full max-w-md shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-400 text-center">
                  ✏️ Edit Candidate
                </h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={editingCandidate.name}
                    onChange={(e) =>
                      setEditingCandidate({ ...editingCandidate, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-blue-950 text-white"
                  />
                  <input
                    type="number"
                    value={editingCandidate.age}
                    onChange={(e) =>
                      setEditingCandidate({ ...editingCandidate, age: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-blue-950 text-white"
                  />
                  <input
                    type="text"
                    value={editingCandidate.party}
                    onChange={(e) =>
                      setEditingCandidate({ ...editingCandidate, party: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-blue-950 text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => setEditingCandidate(null)}
                    className="bg-gray-600 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


