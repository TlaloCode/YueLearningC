import React from "react";
import Header from "../components/Header"
import Footer from "../components/footer"
import Inicio from "../components/Pagina_Inicio/Inicio";
import CoursePreview from "../components/Pagina_Inicio/CoursePreview";
import AboutUs from "../components/Pagina_Inicio/AboutUs";
import MissionVision from "../components/Pagina_Inicio/misionvision";

const Home = () => {
    return (
        <div>
            <Header/>
            <Inicio />
            <CoursePreview/>
            <AboutUs/>
            <MissionVision/>
            <Footer/>
        </div>
    );
};

export default Home;
