import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/StudentCourses.css";
import { FaStar, FaChevronRight,FaGraduationCap, FaBrain, FaTrophy } from "react-icons/fa";

const StudentCourses = () => {
    const [courses] = useState([
        { id: 1, title: "Apuntadores", image: require("../assets/c-course.jpg"), author: "YUE Learning C" },
        { id: 2, title: "Fundamentos de programación en C", image: require("../assets/c-course.jpg"), author: "Yaquín Flores" },
        { id: 3, title: "Material de apoyo sobre apuntadores", image: require("../assets/c-course.jpg"), author: "Felipe Figueroa" },
    ]);

    const [allCourses] = useState([
        { id: 1, title: "Arquitectura de Von Neumann", image: require("../assets/c-course.jpg"), author: "Juárez Flores" },
        { id: 2, title: "Arquitectura de Von Neumann", image: require("../assets/c-course.jpg"), author: "Yaquín Flores" },
        { id: 3, title: "Arquitectura de Von Neumann", image: require("../assets/c-course.jpg"), author: "Felipe Figueroa" },
    ]);

    const [teachers] = useState([
        { id: 1, name: "Gabriela de Jesús López Ruiz", image: require("../assets/c-course.jpg") },
        { id: 2, name: "Juárez Flores Jenifer Elizabeth", image: require("../assets/c-course.jpg") },
        { id: 3, name: "Gómez Molina Ulises", image: require("../assets/c-course.jpg") },
    ]);

    return (
        <div className="app-container">
            <Header />
            <div className="profile-section">
                <div className="profile-info">
                    <img src={require("../assets/c-course.jpg")} alt="Profile" className="profile-image" />
                    <div className="profile-details">
                        <h2 className="profile-name">Yunus</h2>
                        <a href="mailto:apertaltar1700@alumno.ipn.mx" className="profile-email">apertaltar1700@alumno.ipn.mx</a>
                        <div className="profile-rating">
                            <span>Mi calificación</span>
                            <div className="stars">
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star gray" />
                                <FaStar className="star gray" />
                            </div>
                            <span>Ver Podio</span>
                            <strong>3.0</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar">
                <div className="sidebar-item">
                    <button className="sidebar-button">
                        <FaGraduationCap />
                        <span>Cursos</span>
                    </button>
                </div>
                <div className="sidebar-item">
                    <button className="sidebar-button">
                        <FaTrophy />
                        <span>Mi nivel</span>
                    </button>
                </div>
                <div className="sidebar-item">
                    <button className="sidebar-button">
                        <FaBrain />
                        <span>Practicar</span>
                    </button>
                </div>
            </div>

            <div className="courses-section">
                <h2>Mis cursos</h2>
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <img src={course.image} alt={course.title} className="course-image" />
                            <h3>{course.title}</h3>
                            <span className="course-author">Creado por {course.author}</span>
                        </div>
                    ))}
                    <button className="btn-arrow">
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div className="teachers-section">
                <h2>Docentes y autores</h2>
                <div className="teachers-grid">
                    {teachers.map((teacher) => (
                        <div key={teacher.id} className="teacher-card">
                            <img src={teacher.image} alt={teacher.name} className="teacher-image" />
                            <h4>{teacher.name}</h4>
                        </div>
                    ))}
                </div>
            </div>

            <div className="all-courses-section">
                <h2>Todos los cursos</h2>
                <div className="courses-grid">
                    {allCourses.map((course) => (
                        <div key={course.id} className="course-card">
                            <img src={course.image} alt={course.title} className="course-image" />
                            <h3>{course.title}</h3>
                            <span className="course-author">Creado por {course.author}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default StudentCourses;
