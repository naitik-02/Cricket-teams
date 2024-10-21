import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Home";


const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
       
        <Navbar />

        <div>
          
          <Routes>
            <Route path="/" element={<Homepage />} />
          
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
