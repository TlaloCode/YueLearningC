import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/TeacherCourses.css";
import { FaPlus, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import genericCourse from "../assets/c-course.jpg";
import defaultLogo from "../Img/default-profile.png";

const TeacherCourses = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        lastName: "",
        middleName: "",
        institutionalEmail: "",
        description: "",
        fotoPerfil: "",
    });


    const handleCourseClick = (courseId) => {
        navigate(`/teacher-course-detail/${courseId}`);
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || token.trim() === "") {
            alert("No tienes un token de autenticación. Inicia sesión.");
            return;
        }

        const fetchProfileAndCourses = async () => {
            try {
                // 1. Obtener datos del perfil
                const profileRes = await fetch(`${API_URL}/get-user-profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (profileRes.ok) {
                    const data = await profileRes.json();
                    const cachedImage = sessionStorage.getItem("cachedProfileImage");
                    setProfile({
                        name: data.nombre,
                        lastName: data.apellidopaterno,
                        middleName: data.apellidomaterno,
                        institutionalEmail: data.correoelectronico,
                        description: data.descripcionperfil,
                        fotoPerfil: cachedImage || "",
                    });
                }

                // 2. Obtener cursos del docente
                const coursesRes = await fetch(`${API_URL}/get-teacher-courses/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (coursesRes.ok) {
                    const data = await coursesRes.json(); // Asegúrate de que el backend devuelve un array de cursos
                    setCourses(data);
                }

            } catch (error) {
                console.error("Error al cargar los datos del docente o cursos", error);
            }
        };

        fetchProfileAndCourses();
    }, []);


    const [courses, setCourses] = useState([]);

    const handleCreateCourse = () => {
        navigate("/crear-curso");
    };

    const construirURLDrive = (idImagen) => {
        if (!idImagen) return genericCourse;
        return `https://drive.google.com/thumbnail?id=${idImagen}&sz=w500`;
    };

    return (
        <div className="app-container">
            <Header />

            <div className="profile-section">
                <div className="profile-info">
                    <img src={profile.fotoPerfil || defaultLogo} alt="Profile" className="profile-image" />
                    <div className="profile-details">
                        <h2 className="profile-name">
                            {profile.name} {profile.lastName} {profile.middleName}
                        </h2>
                        <a href={`mailto:${profile.institutionalEmail}`} className="profile-email">
                            {profile.institutionalEmail}
                        </a>
                        <p className="profile-description">
                            {profile.description}
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
                                <div key={course.id} className="course-card"  onClick={() => handleCourseClick(course.id)}>
                                    <img src={construirURLDrive(course.image)} alt={course.title}
                                         className="course-image"/>
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
