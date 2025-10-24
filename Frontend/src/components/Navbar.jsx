import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // 👈 get role from localStorage

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        { headers: { authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Logout failed.");
    }
  };

  // For active tab highlight
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-wrap justify-center md:justify-end items-center w-full gap-3 sm:gap-6 md:gap-8 mb-10 text-base sm:text-lg font-medium">
      
      {/* Elections */}
      <Link to="/votingpage">
        <button
          className={`pb-1 transition ${
            isActive("/votingpage")
              ? "border-b-2 border-blue-600"
              : "hover:text-blue-400"
          }`}
        >
          Elections
        </button>
      </Link>

      {/* Personal Info */}
      <Link to="/personalinfo">
        <button
          className={`pb-1 transition ${
            isActive("/personalinfo")
              ? "border-b-2 border-blue-600"
              : "hover:text-blue-400"
          }`}
        >
          Personal Info
        </button>
      </Link>

      {/* Conditional Button: Vote for users, Dashboard for admin */}
      {role === "admin" ? (
        <Link to="/dashboard">
          <button
            className={`pb-1 transition ${
              isActive("/admindashboard")
                ? "border-b-2 border-blue-600 text-blue-400"
                : "hover:text-blue-400"
            } bg-green-600 hover:bg-green-700 px-5 py-1 rounded-lg text-white text-sm sm:text-base`}
          >
            Dashboard
          </button>
        </Link>
      ) : (
        <Link to="/vote">
          <button
            className={`pb-1 transition ${
              isActive("/vote")
                ? "border-b-2 border-blue-600 text-blue-400"
                : "hover:text-blue-400"
            } bg-blue-600 hover:bg-blue-700 px-5 py-1 rounded-lg text-white text-sm sm:text-base`}
          >
            Your Vote
          </button>
        </Link>
      )}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-orange-400 cursor-pointer hover:bg-orange-700 transition px-5 py-1 rounded-lg text-white text-sm sm:text-base"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

