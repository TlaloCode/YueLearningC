import React from "react";
import Header from "./components/Header";
import MainContent from "./components/Pagina_Inicio/MainContent";
import Inicio from "./components/Pagina_Inicio/Inicio";
import CoursePreview from "./components/Pagina_Inicio/CoursePreview"
import AboutUs from "./components/Pagina_Inicio/AboutUs"
import MissionVision from "./components/Pagina_Inicio/misionvision"
import Footer from "./components/footer"
import Login from "./paginas/login"
import Home from "./paginas/home"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <Router>
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
          </Routes>
      </div>
      </Router>
  );
};

export default App;
