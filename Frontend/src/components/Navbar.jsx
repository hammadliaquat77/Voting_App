// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'


// const Navbar = () => {

//   const navigate = useNavigate()
//   const token = localStorage.getItem("token");

//   const [active, setActive] = useState(false)

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/user/logout",
//         {},
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert(response.data.message);
//       localStorage.removeItem("token");
//       navigate("/login");
//     } catch (error) {
//       alert(error.response?.data?.message || "Logout failed.");
//     }
//   };


//   return (
//     <div>
//       <nav className="flex flex-wrap justify-center md:justify-end items-center w-full gap-3 sm:gap-6 md:gap-8 mb-10 text-base sm:text-lg font-medium">
//         <Link to={"/personalinfo"}>
//           <button className="border-b-2 border-blue-600 pb-1 hover:text-blue-400 transition">
//             Personal Info
//           </button>
//         </Link>

//         <Link to={"/votingpage"}>
//           <button className="hover:text-blue-400 transition">Elections</button>
//         </Link>

//         <button className="hover:text-blue-400 transition">Contact</button>
//         <Link to={"/vote"}>
//           <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-1 rounded-lg text-white text-sm sm:text-base">
//             Vote
//           </button>
//         </Link>

//         <button
//           onClick={handleLogout}
//           className="bg-orange-400 cursor-pointer hover:bg-orange-700 transition px-5 py-1 rounded-lg text-white text-sm sm:text-base">
//           Logout
//         </button>
//       </nav>
//     </div>
//   )
// }

// export default Navbar



import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); //  current page ka path milta hai
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Logout failed.");
    }
  };

  // 👇 helper function active underline ke liye
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <nav className="flex flex-wrap justify-center md:justify-end items-center w-full gap-3 sm:gap-6 md:gap-8 mb-10 text-base sm:text-lg font-medium">


        <Link to="/votingpage">
          <button
            className={`pb-1 transition ${isActive("/votingpage")
                ? "border-b-2 border-blue-600"
                : "hover:text-blue-400"
              }`}
          >
            Elections
          </button>
        </Link>



        <Link to="/personalinfo">
          <button
            className={`pb-1 transition ${isActive("/personalinfo")
                ? "border-b-2 border-blue-600"
                : "hover:text-blue-400"
              }`}
          >
            Personal Info
          </button>
        </Link>

        <Link to="/vote">
          <button
            className={`pb-1 transition ${isActive("/vote")
                ? "border-b-2 border-blue-600 text-blue-400"
                : "hover:text-blue-400"
              } bg-blue-600 hover:bg-blue-700 px-5 py-1 rounded-lg text-white text-sm sm:text-base`}
          >
            Vote
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-orange-400 cursor-pointer hover:bg-orange-700 transition px-5 py-1 rounded-lg text-white text-sm sm:text-base"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
