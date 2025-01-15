import React from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Manage from './pages/Manage';


export const backendURL=import.meta.env.VITE_BACKEND_URL


const App = () => {
  return (
    <div>
      <Router>
       <Navbar/>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Sidebar/>} />
          <Route path="/manage" element={<Manage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App