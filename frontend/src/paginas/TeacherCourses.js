import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/TeacherCourses.css";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
    const navigate = useNavigate();
    const [courses] = useState([
        { id: 1, title: "Arquitectura de Von Neumann", image: "../assets/course1.png" },
        { id: 2, title: "Introducción a C", image: "../assets/course2.png" },
    ]);

    const handleCreateCourse = () => {
        navigate("/crear-curso"); // Redirige a la vista de creación de curso
    };

    return (
        <div className="app-container">
            <Header />

            <div className="profile-container">
                <h2 className="profile-title">Mis Cursos</h2>

                <div className="courses-container">
                    {courses.length > 0 ? (
                        <div className="courses-grid">
                            {courses.map((course) => (
                                <div key={course.id} className="course-card">
                                    <img src={course.image} alt={course.title} className="course-image" />
                                    <h3>{course.title}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tienes cursos creados aún.</p>
                    )}

                    <button className="btn-create" onClick={handleCreateCourse}>
                        <FaPlusCircle /> Nuevo Curso
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TeacherCourses;
