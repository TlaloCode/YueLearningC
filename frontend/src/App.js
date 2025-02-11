import React from "react";
import Login from "./paginas/login"
import Home from "./paginas/home"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <Router>
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
          </Routes>
      </div>
      </Router>
  );
};

export default App;
