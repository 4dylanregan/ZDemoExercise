import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./views/Admin";
import Home from "./views/Home";
import IssuePage from "./views/IssuePage";
import NotFound from "./views/errorPages/NotFound";

import Login from "./views/auth/Login";
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userFunction = (user) => {
    
    if (user === "Admin") {
      setIsAuthenticated(true)
      setIsAdmin(true)
    } else if (user === "End User") {
      setIsAuthenticated(true)
      setIsAdmin(false)
    } else {
      setIsAuthenticated(false)
      setIsAdmin(false)
    }
  }



  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation auth={isAuthenticated} admin={isAdmin} userFunction={userFunction}/>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login userFunction={userFunction}/>} />
        <Route path="/admin" element={<PrivateRoute admin={isAdmin} Component={Admin} />} />
        <Route path="/admin/:id" element={<PrivateRoute admin={isAdmin} Component={IssuePage} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  )
}

export default App
