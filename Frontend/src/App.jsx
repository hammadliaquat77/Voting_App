import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import PersionalInfo from './pages/PersionalInfo'
import VotingPage from './pages/VotingPage'
import MyVote from './pages/MyVote'
import AdminDashboard from './pages/Dashboard'

import { Navigate } from "react-router-dom";

// toast Alert
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function App() {


  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personalinfo" element={<PersionalInfo />} />
        <Route path="/votingpage" element={<VotingPage />} />
        <Route path="/vote" element={<MyVote />} />
        <Route
          path="/dashboard"
          element={
            role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/votingpage" replace />
            )
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}       // 3 sec baad close ho jaye
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />

    </>
  )
}

export default App
