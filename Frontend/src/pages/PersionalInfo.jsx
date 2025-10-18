import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const PersonalInfo = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return
    }

    profile();

  }, [])

  const profile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/profile",
        { headers: { Authorization: `Bearer ${token}` } });
      console.log("response.data===>", response.data.user);

      setUserProfile(response.data.user);

    } catch (error) {
      console.error("Error fetching candidates:", error.message);
    }
  }


  return (
    <div className="min-h-screen bg-[#001124] text-white px-4 sm:px-6 md:px-16 py-10 flex flex-col items-center">

{/* Navbar */}
<Navbar/>
     
      {/* Profile Container */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 w-full max-w-5xl bg-[#011a3a] p-6 md:p-10 rounded-2xl shadow-lg">

        {/* Left Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
            alt="Profile Avatar"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-blue-600 mb-4"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold mb-4">
            Change profile picture
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <Pencil size={18} />
            <span className="font-medium">Edit Profile</span>
          </div>
        </div>

        {/* Right Section */}

        {userProfile && (
          <div className="md:w-2/3 flex flex-col gap-4 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-blue-400">Name:</p>
                <p className="font-semibold">{userProfile.name}</p>
              </div>
              <div>
                <p className="text-blue-400">Mobile Number:</p>
                <p className="font-semibold">{userProfile.phone}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-blue-400">Age:</p>
                <p className="font-semibold">{userProfile.age}</p>
              </div>
              <div>
                <p className="text-blue-400">Email:</p>
                <p className="font-semibold">{userProfile.email}</p>
              </div>
            </div>

            <div>
              <p className="text-blue-400">Address:</p>
              <p className="font-semibold">{userProfile.address}</p>
            </div>

            <div>
              <p className="text-blue-400">Your Vote</p>
              <p className="font-semibold">{userProfile.userVoted ? "Voted" : "Not Voted"}</p>
            </div>

            
          </div>
        )}


        {/* <div className="md:w-2/3 flex flex-col gap-4 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <p className="text-blue-400">Name:</p>
              <p className="font-semibold">John Doe</p>
            </div>
            <div>
              <p className="text-blue-400">Mobile Number:</p>
              <p className="font-semibold">+91 9191505010</p>
            </div>
          </div>

          <div>
            <p className="text-blue-400">Father's/Mother's Name:</p>
            <p className="font-semibold">Papa John Doe</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <p className="text-blue-400">Age:</p>
              <p className="font-semibold">19</p>
            </div>
            <div>
              <p className="text-blue-400">Email:</p>
              <p className="font-semibold">john.doe@gmail.com</p>
            </div>
          </div>

          <div>
            <p className="text-blue-400">Aadhar Number:</p>
            <p className="font-semibold">6100 4080 9126 0909</p>
          </div>

          <div>
            <p className="text-blue-400">Address:</p>
            <p className="font-semibold">
              XYZ, Street No. 92, Gurgaon, Uttar Pradesh, 100021
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <p className="text-blue-400">Eligible:</p>
              <p className="font-semibold">True</p>
            </div>
            <div>
              <p className="text-blue-400">Verified:</p>
              <p className="font-semibold">True</p>
            </div>
          </div>
          
        </div> */}

      </div>
    </div>
  );
};

export default PersonalInfo;
