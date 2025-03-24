import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/StudentCourses.css";
import { FaStar, FaChevronRight } from "react-icons/fa";
import genericCourse from "../assets/c-course.jpg";
import userPlaceholder from "../assets/default-user.jpg";

const StudentCourses = () => {
    const [student, setStudent] = useState({});
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchData = async () => {
            try {
                // 1. Perfil del estudiante
                const resProfile = await fetch("http://127.0.0.1:8000/api/get-user-profile/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const studentData = await resProfile.json();
                setStudent(studentData);

                // 2. Cursos inscritos
                const resCourses = await fetch("http://127.0.0.1:8000/api/get-enrolled-courses/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const enrolledCourses = await resCourses.json();
                setCourses(enrolledCourses);

                // 3. Todos los cursos
                const resAllCourses = await fetch("http://127.0.0.1:8000/api/get-all-courses/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const allCoursesData = await resAllCourses.json();
                setAllCourses(allCoursesData);

                // 4. Docentes con al menos un curso
                const resTeachers = await fetch("http://127.0.0.1:8000/api/get-teachers-with-courses/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const teachersData = await resTeachers.json();
                setTeachers(teachersData.slice(0, 3)); // Solo los primeros 3

            } catch (error) {
                console.error("Error al cargar datos del estudiante:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="app-container">
            <Header />

            <div className="profile-section">
                <div className="profile-info">
                    <img src={require("../assets/c-course.jpg")} alt="Profile" className="profile-image" />
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

            <div className="courses-section">
                <h2>Mis cursos</h2>
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <img src={course.image || genericCourse} alt={course.title} className="course-image" />
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
                            <img src={teacher.image || userPlaceholder} className="teacher-image" />
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
                            <img src={course.image || genericCourse} alt={course.title} className="course-image" />
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
