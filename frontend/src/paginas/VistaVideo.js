import React from "react";
import "../css/VistaVideo.css";
import Header from "../components/Header"; // Ya lo tienes
import Footer from "../components/footer"; // Opcional
import imagenVideo from "../assets/c-course.jpg"; // Asegúrate de que la imagen exista
import { MdArrowBack } from "react-icons/md"; // Importa el ícono
import { useNavigate } from "react-router-dom";

const VideoDetalle = () => {
    const navigate = useNavigate();
    return (
        <div className="video-page">
            <Header />

            <div className="video-container">
                <div className="video-header">
                    <button className="volver-btn" onClick={() => navigate(-1)}>
                        <MdArrowBack className="icon-back" />
                        Atrás
                    </button>

                </div>
                <h2 className="video-title">02–Introducción a los apuntadores</h2>

                <div className="video-preview">
                    <img src={imagenVideo} alt="Preview del video" />
                </div>

                <div className="video-info">
                    <h3>DESCRIPCIÓN</h3>
                    <p>
                        En este video, exploraremos uno de los temas fundamentales de la
                        programación en C: los apuntadores. Aprenderás qué es un apuntador,
                        cómo funcionan en la memoria y por qué son esenciales para el manejo
                        eficiente de datos en C.
                    </p>
                    <p>
                        Link de libro digital recomendado: <br />
                        <a href="https://www.cimat.mx/~ciram/cpa/pointersC.pdf" target="_blank" rel="noopener noreferrer">
                            https://www.cimat.mx/~ciram/cpa/pointersC.pdf
                        </a>
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default VideoDetalle;
