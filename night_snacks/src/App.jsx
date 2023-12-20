
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import { useState } from 'react'
import UserPortal from "./pages/UserPortal";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PublicRoute from "./components/utils/PublicRoute";
import { Reset } from 'styled-reset'

import FourOFour from "./pages/FourOFour"
import Home from "./pages/Home"
import Index from "./pages/Index"
import Show from "./pages/Show"
import New from "./pages/New"
import Edit from "./pages/Edit"
import NavBar from "./components/NavBar"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { LoginWrapper } from './styles/loginElements';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <LoginWrapper>
      <>


        <Reset />
        <div className='app'>
          <Router>
            <div className="nav">
              <NavBar />
            </div>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/snacks" element={<Index />} />
                <Route path="/snacks/new" element={<New />} />
                <Route path="/snacks/:resource_id" element={<Show />} />
                <Route path="/snacks/:resource_id/edit" element={<Edit />} />


                {/* PUBLIC ROUTE FOR LOGIN */}
                <Route path="/login" element={<Login />} />

                {/* PUBLIC ROUTE SIGNUP */}
                <Route path="/signup" element={<SignUp />} />


                {/* ROUTE FOR "/" WITH REDIRECT TO LOGIN ROUTE */}

                {/* ROUTE TO USER PROFILE ROUTE WITH WILDCARD MATCHER */}
                <Route path="/users/:user_id" element={<UserPortal />} />


                <Route path="*" element={<FourOFour />} />
              </Routes>
            </main>
          </Router>
        </div>
      </>
    </LoginWrapper>
  )
}

export default App
