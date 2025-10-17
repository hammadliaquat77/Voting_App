import React from "react";
import letsVote from "../../public/letsvote.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col md:flex-row">
      {/* Navbar*/}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md text-white z-50">
        <div className="flex justify-between items-center max-w-7xl w-[100%] md:w-[80%] mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600 font-serif">VoteApp</h1>
          <ul className="flex gap-4 sm:gap-6 font-serif text-sm sm:text-base">
            <li className="px-3 py-1 cursor-pointer hover:text-blue-500 hidden md:block">About</li>
            <li className="px-3 py-1 cursor-pointer hover:text-blue-500 hidden md:block">Contact</li>
            <li className="bg-blue-700 hover:bg-blue-800 px-4 py-1 cursor-pointer rounded-md">
              Login
            </li>
          </ul>
        </div>
      </nav>

      {/* Left Side (Image) */}
      <div className="flex justify-center items-center w-full md:w-1/2 h-[50vh] md:h-screen mt-20 md:mt-0">
        <img
          src={letsVote}
          alt="Let's Vote"
          className="h-[200px] sm:h-[300px] md:h-[400px] object-contain"
        />
      </div>

      {/* Right Side (Text Content) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 text-center px-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl mb-3 font-light">
          Be a part of Decision
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-blue-600 font-bold font-serif">
          Vote Today
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link to={"/register"}>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-xl text-base sm:text-lg cursor-pointer">
            Register
          </button>
          </Link>
          <Link to={"/votingpage"}></Link>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-xl text-base sm:text-lg cursor-pointer">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
