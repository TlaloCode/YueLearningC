import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/CalificarCurso.css";
import { FaStar, FaArrowLeft } from "react-icons/fa";

const CalificarCurso = () => {
    const [rating, setRating] = useState(3);

    const handleRate = (value) => {
        setRating(value);
        // Aquí podrías enviar la calificación al servidor si deseas
    };

    return (
        <div className="calificar-container">
            <Header />

            <div className="calificar-content">
                <div className="back-button">
                    <FaArrowLeft /> <span>Atrás</span>
                </div>

                <h1 className="title">Califica el curso <span role="img">🖱️</span></h1>
                <p className="description">
                    Calificar el curso ayuda a los creadores a valorar su contenido y esforzarse en mejorar cada aspecto del mismo
                </p>

                <div className="course-rating-card">
                    <div className="left-info">
                        <h2>Arquitectura de Von Newman</h2>
                        <p className="author">Juarez Flores Jenifer Elizabeth</p>

                        <div className="stars-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`star ${star <= rating ? '' : 'gray'}`}
                                    onClick={() => handleRate(star)}
                                />
                            ))}
                            <span className="score">{rating}.0</span>
                        </div>

                        <button className="btn-calificar">Calificar</button>
                    </div>

                    <div className="right-info">
                        <img
                            src={require("../assets/logo.jpg")}
                            alt="imagen curso"
                            className="course-img"
                        />
                        <p className="img-desc">
                            Aquí va la descripción del video, si se desea agregar un enlace o instrucciones.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CalificarCurso;
