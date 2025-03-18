import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/TeacherCourses.css";
import { FaPlus, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
    const navigate = useNavigate();
    const [courses] = useState([
        { id: 1, title: "Arquitectura de Von Neumann", image: require("../assets/c-course.jpg") },
        { id: 2, title: "Arquitectura de Von Neumann", image: require("../assets/c-course.jpg") },
        { id: 3, title: "Arquitectura de Von Neumann", image: require("../assets/c-course.jpg") },
    ]);


    const handleCreateCourse = () => {
        navigate("/crear-curso");
    };

    return (
        <div className="app-container">
            <Header />

            <div className="profile-section">
                <div className="profile-info">
                    <img src={require("../assets/default-user.jpg")} alt="Profile" className="profile-image" />
                    <div className="profile-details">
                        <h2 className="profile-name">López Ruiz Gabriela de Jesús</h2>
                        <a href="mailto:usuario@ipn.mx" className="profile-email">usuario@ipn.mx</a>
                        <p className="profile-description">
                            Soy una profesora con el propósito de motivar a mis estudiantes...
                        </p>
                    </div>
                </div>
            </div>

            <div className="courses-section">
                <div className="courses-header">
                    <h2>Todos mis cursos</h2>
                    <button className="btn-new-course" onClick={handleCreateCourse}>
                        <span>Nuevo curso</span>
                        <FaPlus />
                    </button>
                </div>

                <div className="courses-container">
                    {courses.length > 0 ? (
                        <div className="courses-grid">
                            {courses.map((course) => (
                                <div key={course.id} className="course-card">
                                    <img src={course.image} alt={course.title} className="course-image" />
                                    <h3>{course.title}</h3>
                                </div>
                            ))}
                            <button className="btn-arrow">
                                <FaChevronRight />
                            </button>
                        </div>
                    ) : (
                        <p>No tienes cursos creados aún.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TeacherCourses;
