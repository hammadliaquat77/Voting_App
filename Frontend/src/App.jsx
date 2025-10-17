import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import PersionalInfo from './pages/PersionalInfo'
import VotingPage from './pages/VotingPage'
import MyVote from './pages/MyVote'

function App() {

  return (
    <>
    {/* <h1 className='text-6xl'>Voting</h1> */}

    <Routes>
      <Route path="/" element={<Header/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/personalinfo" element={<PersionalInfo/>} />
      <Route path="/votingpage" element={<VotingPage/>} />
      <Route path="/vote" element={<MyVote/>} />
    </Routes>
    </>
  )
}

export default App
