import React, { useState } from 'react';
import letsVote from "../../public/letsvote.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);

    try {
        const response = await axios.post("http://localhost:8000/api/user/login", data);
        // console.log("data==> ", response.data);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);

        alert("Login successful!");    
        navigate("/votingpage")

    } catch (error) {
        alert(error?.response?.data?.message);
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
            Login
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Email</label>
              <input
                type="email"
                name='email'
                value={data.email}
                onChange={handleChange}
                required
                className="border border-gray-500 bg-transparent px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 ml-1">Password</label>
              <input
                type="password"
                name='password'
                value={data.password}
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
              Login
            </button>

            <div className=' flex gap-3'>
              <span>Don't have an account </span>
              <Link to={"/register"} className='text-orange-600'>rigister now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
