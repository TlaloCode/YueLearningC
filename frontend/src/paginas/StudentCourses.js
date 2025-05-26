import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/StudentCourses.css";
import { FaStar, FaChevronRight} from "react-icons/fa";
import genericCourse from "../assets/c-course.jpg";
import userPlaceholder from "../assets/default-user.jpg";


const StudentCourses = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const fotoPerfil = sessionStorage.getItem("cachedProfileImage");
    const teacherImage = "";

    const handleCourseClick = (courseId) => {
        const yaInscrito = courses.some((curso) => curso.id === courseId);

        if (yaInscrito) {
            navigate(`/lista-videos/${courseId}`);
        } else {
            navigate(`/inscribir-curso/${courseId}`);
        }
    };

    const handleCourseSignedClick = (courseId) => {
        navigate(`/lista-videos/${courseId}`);  // Redirige a la ruta con el ID del curso
    };



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;


        const fetchData = async () => {
            try {
                // 1. Perfil del estudiante
                const resProfile = await fetch(`${API_URL}/get-user-profile/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const studentData = await resProfile.json();
                setStudent(studentData);

                // 2. Cursos inscritos
                const resCourses = await fetch(`${API_URL}/get-enrolled-courses/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const enrolledCourses = await resCourses.json();
                setCourses(enrolledCourses);

                // 3. Todos los cursos
                const resAllCourses = await fetch(`${API_URL}/get-all-courses/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const allCoursesData = await resAllCourses.json();
                setAllCourses(allCoursesData);

                // 4. Docentes con al menos un curso
                const resTeachers = await fetch(`${API_URL}/get-teachers-with-courses/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const teachersData = await resTeachers.json();

                setTeachers(teachersData.slice(0, 3)); // Solo los primeros 3
                console.log(teachersData);

            } catch (error) {
                console.error("Error al cargar datos del estudiante:", error);
            }
        };

        fetchData();
    }, [API_URL]);

    const getTeacherPhotoURL = (fileId) =>
        fileId ? `http://127.0.0.1:8000/api/teacher-photo/${fileId}/` : teacherImage;

    const construirURLDrive = (idImagen) => {
        if (!idImagen) return genericCourse;
        return `https://drive.google.com/thumbnail?id=${idImagen}&sz=w500`;
    };

    return (
        <div className="app-container">
            <Header />
            <div className="profile-section">
                <div className="profile-info">
                    <img src={fotoPerfil || userPlaceholder} alt="Foto de perfil" className="profile-image"/>
                    <div className="profile-details">
                        <h2 className="profile-name">{student.nickname}</h2>
                        <a href={`mailto:${student.correoelectronico}`} className="profile-email">
                            {student.correoelectronico}
                        </a>
                        <div className="profile-rating">
                            <span>Mi calificación</span>
                            <div className="stars">
                                <FaStar className="star"/>
                                <FaStar className="star"/>
                                <FaStar className="star"/>
                                <FaStar className="star gray"/>
                                <FaStar className="star gray"/>
                            </div>
                            <span>Ver Podio</span>
                            <strong>3.0</strong>
                        </div>
                    </div>
                </div>
            </div>
            {/*
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
*/}
            <div className="courses-section">
                <h2>Mis cursos</h2>
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card" onClick={() => handleCourseSignedClick(course.id)}>
                            <img src={construirURLDrive(course.image)} alt={course.title} className="course-image" />
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
                            <img
                                src={getTeacherPhotoURL(teacher.image)}
                                alt={`Foto de ${teacher.name}`}
                                className="teacher-image"
                            />
                            <h4>{teacher.name}</h4>
                        </div>
                    ))}
                </div>
            </div>

            <div className="all-courses-section">
                <h2>Todos los cursos</h2>
                <div className="courses-grid">
                    {allCourses.map((course) => (
                        <div key={course.id} className="course-card" onClick={() => handleCourseClick(course.id)}>
                            <img src={construirURLDrive(course.image)} alt={course.title} className="course-image"/>
                            <h3>{course.title}</h3>
                            <span className="course-author">Creado por {course.author}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default StudentCourses;
