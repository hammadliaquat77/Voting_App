import React, { useState } from 'react';
import letsVote from "../../public/letsvote.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  })

  const handleChange = (e)=> {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

   const handleSubmit = async (e)=> {
    e.preventDefault();
    console.log("formData", formData);

    try {
       const response = await axios.post("http://localhost:8000/api/user/signup", formData);
       console.log("Response from backend:", response.data);
       
         localStorage.setItem("token", response.data.token);
         localStorage.setItem("role", response.data.newUser.role);
         toast.success("Registration successful!");

         navigate("/votingpage");

    } catch (error) {
        toast.error(error.response.data.message || "Registration failed.");
    }
   }

  return (
    <div className="min-h-screen w-full bg-[#001124] text-white flex items-center justify-center px-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full max-w-6xl mx-auto gap-10 py-10">
        
        {/* Left Image Section */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src={letsVote}
            alt="Let's Vote"
            className="w-[70%] sm:w-[60%] md:w-[80%] lg:w-[100%] object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 bg-[#011a3a] p-6 sm:p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-center md:text-left">
            Registration Form
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Name</label>
              <input
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-500 bg-transparent px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Age</label>
              <input
                type="text"
                name='age'
                value={formData.age}
                onChange={handleChange}
                required
                className="border border-gray-500 bg-transparent px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Email</label>
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-500 bg-transparent px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Mobile Number</label>
              <input
                type="text"
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-gray-500 bg-transparent px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Address</label>
              <textarea
                className="border border-gray-500 bg-transparent px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="3"
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Password</label>
              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-gray-500 bg-transparent px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition duration-200 mt-2 px-6 py-2 rounded-lg text-lg font-medium"
            >
              Register
            </button>

            <div className=' flex gap-3'>
              <span>Do you have an account </span>
              <Link  to={"/login"} className='text-orange-600'>login now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
