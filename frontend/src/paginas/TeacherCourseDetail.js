import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/TeacherCourseDetail.css";
import AgregarVideo from "../paginas/AgregarVideo";
import AgregarRecurso from "../paginas/AgregarRecurso";
import {FaStar, FaChevronRight, FaChevronLeft, FaPlusCircle, FaTrash } from "react-icons/fa";



const TeacherCourseDetail = () => {
    const [videos] = useState([
        { id: 1, title: "01 - Introducción a la Arquitectura de Von Neumann", image: require("../assets/c-course.jpg") },
        { id: 2, title: "02 - Estructura de un sistema de Von Neumann", image: require("../assets/c-course.jpg") },
        { id: 3, title: "02 - Estructura de un sistema de Von Neumann", image: require("../assets/c-course.jpg") },
    ]);

    const [resources] = useState([
        { id: 1, title: "01 - Introducción a la Arquitectura de Von Neumann", file: require("../assets/c-course.jpg") },
        { id: 2, title: "02 - Estructura de un sistema de Von Neumann", file: require("../assets/c-course.jpg") },
        { id: 3, title: "02 - Estructura de un sistema de Von Neumann", file: require("../assets/c-course.jpg") },
    ]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [showRecursoModal, setShowRecursoModal] = useState(false);

    const handleOpenRecursoModal = () => setShowRecursoModal(true);
    const handleCloseRecursoModal = () => setShowRecursoModal(false);


    return (
        <div className="app-container">
            <Header />

            <div className="profile-section">
                <div className="profile-info">
                    <img src={require("../assets/c-course.jpg")} alt="Profile" className="profile-image" />
                    <div className="profile-details">
                        <h2 className="profile-name">López Ruiz Gabriela de Jesús</h2>
                        <a href="mailto:usuario@ipn.mx" className="profile-email">usuario@ipn.mx</a>
                        <p className="profile-bio">Soy una profesora con el propósito de motivar a mis estudiantes...</p>
                    </div>
                </div>
            </div>

            <div className="course-info">
                <h2 className="course-title">Arquitectura de Von Neumann</h2>
                <div className="course-rating">
                    <FaStar className="star" />
                    <FaStar className="star" />
                    <FaStar className="star" />
                    <FaStar className="star" />
                    <FaStar className="star gray" />
                    <strong>4.0</strong>
                </div>
            </div>

            <div className="course-content">
                <div className="course-section">
                    <div className="section-header">
                        <button className="back-button">
                            <FaChevronLeft />
                        </button>
                        <h3>Lista de videos</h3>
                        <button className="add-button" onClick={handleOpenModal}>
                            Agregar <FaPlusCircle />
                        </button>
                        {showModal && <AgregarVideo onClose={handleCloseModal} />}
                    </div>
                    <div className="videos-grid">
                        {videos.map((video) => (
                            <div key={video.id} className="video-card">
                                <img src={video.image} alt={video.title} className="video-image" />
                                <p className="video-title">{video.title}</p>
                            </div>
                        ))}
                        <button className="btn-arrow">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                <div className="course-section">
                    <div className="section-header">
                        <h3>Recursos de apoyo</h3>
                        <button className="add-button" onClick={handleOpenRecursoModal}>
                            Agregar <FaPlusCircle />
                        </button>
                        {showRecursoModal && <AgregarRecurso onClose={handleCloseRecursoModal} />}
                    </div>
                    <div className="resources-list">
                        {resources.map((resource) => (
                            <div key={resource.id} className="resource-item">
                                <img src={resource.file} alt="PDF" className="pdf-icon" />
                                <p className="resource-title">{resource.title}</p>
                                <FaTrash className="delete-icon" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TeacherCourseDetail;
