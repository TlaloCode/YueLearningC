import React from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/InscribirCurso.css";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const InscribirCurso = () => {
    return (
        <div className="course-detail-container">
            <Header />

            <div className="course-content">
                <div className="back-button">
                    <FaArrowLeft /> <span>Atrás</span>
                </div>

                <div className="title-rating">
                    <div>
                        <h1 className="course-title">Arquitectura de Von Newman</h1>
                        <p className="course-author">Juarez Flores Jenifer Elizabeth</p>
                    </div>

                    <div className="course-rating right">
                        <div className="stars">
                            <FaStar className="star" />
                            <FaStar className="star" />
                            <FaStar className="star" />
                            <FaStar className="star" />
                            <FaStar className="star gray" />
                        </div>
                        <span className="rating-value">4.0</span>
                    </div>
                </div>


                <img
                    src={require("../assets/c-course.jpg")}
                    alt="Código ejemplo"
                    className="course-image"
                />

                <p className="course-description">
                    Descripción
                </p>

                <button className="btn-inscribirse">
                    Inscribir <FaArrowRight />
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default InscribirCurso;
