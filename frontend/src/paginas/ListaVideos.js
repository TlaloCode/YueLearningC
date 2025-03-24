import React from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/ListaVideos.css";
import { FaStar, FaArrowLeft } from "react-icons/fa";

const ListaVideos = () => {
    const videos = [
        {
            id: 1,
            title: "01- Introducción a la Arquitectura de Von Newman",
            description: "Aquí va la descripción del video, si se desea agregar un enlace o instrucciones.",
            image: require("../assets/logo.jpg"),
        },
        {
            id: 2,
            title: "02- Introducción a los apuntadores",
            description: "En este video, exploraremos uno de los temas fundamentales de la programación en C: los apuntadores. Aprenderás qué es un apuntador.....",
            image: require("../assets/logo.jpg"),
        },
        {
            id: 3,
            title: "01- Introducción a la Arquitectura de Von Newman",
            description: "Aquí va la descripción del video, si se desea agregar un enlace o instrucciones.",
            image: require("../assets/logo.jpg"),
        },
        {
            id: 4,
            title: "01- Introducción a la Arquitectura de Von Newman",
            description: "Aquí va la descripción del video, si se desea agregar un enlace o instrucciones.",
            image: require("../assets/logo.jpg"),
        },
    ];

    return (
        <div className="lista-videos-container">
            <Header />

            <div className="content-wrapper">
                <div className="sidebar-menu">
                    <button>Lista de videos</button>
                    <button>Quiz</button>
                    <button>Practicar</button>
                    <button>Recursos externos</button>
                </div>

                <div className="video-section">
                    <div className="video-header">
                        <div className="back-button">
                            <FaArrowLeft /> <span>Atrás</span>
                        </div>

                        <div className="video-title-rating">
                            <div>
                                <h1>Apuntadores</h1>
                                <p>Juarez Flores Jenifer Elizabeth</p>
                            </div>
                            <div className="stars-rating">
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star gray" />
                                <span className="rating">4.0</span>
                            </div>
                        </div>
                    </div>

                    <div className="video-list">
                        {videos.map((video) => (
                            <div key={video.id} className="video-card">
                                <img src={video.image} alt={video.title} />
                                <div className="video-info">
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ListaVideos;
