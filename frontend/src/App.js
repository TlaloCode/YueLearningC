import React from "react";
import Login from "./paginas/login"
import Home from "./paginas/home"
import RegisterStudent from"./paginas/registerStudent"
import RegisterTeacher from "./paginas/registerTeacher"
import ForgotPassword from "./paginas/forgotPassword"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <Router>
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/registerStudent" element={<RegisterStudent/>}/>
              <Route path="/registerTeacher" element={<RegisterTeacher/>}/>
              <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
      </div>
      </Router>
  );
};

export default App;
