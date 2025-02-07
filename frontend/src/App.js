import React from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Inicio from "./components/Inicio";
import CoursePreview from "./components/CoursePreview"
import AboutUs from "./components/AboutUs"
import MissionVision from "./components/misionvision"
import Footer from "./components/footer"

const App = () => {
  return (
      <div>
        <Header/>
        <MainContent/>
        <Inicio />
          <CoursePreview/>
          <AboutUs/>
          <MissionVision/>
          <Footer/>
      </div>
  );
};

export default App;
