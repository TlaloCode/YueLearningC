import React from "react";
import Login from "./paginas/login"
import Home from "./paginas/home"
import Help from "./paginas/Help";
import RegisterStudent from"./paginas/registerStudent"
import RegisterTeacher from "./paginas/registerTeacher"
import ForgotPassword from "./paginas/forgotPassword"
import TermsAndConditions from "./paginas/TermsAndConditions";
import PrivacyPolicy from "./paginas/PrivacyPolicy";
import TeacherProfile from "./paginas/TeacherProfile";
import StudentProfile from "./paginas/StudentProfile";



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
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/help" element={<Help />} />
              <Route path="/perfil-docente" element={<TeacherProfile />} />
              <Route path="/perfil-estudiante" element={<StudentProfile />} />


          </Routes>
      </div>
      </Router>
  );
};

export default App;
