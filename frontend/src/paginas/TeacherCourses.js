import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/TeacherCourses.css";
import { FaPlus, FaChevronRight } from "react-icons/fa";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import genericCourse from "../assets/c-course.jpg";
import defaultLogo from "../Img/default-profile.png";
import ErrorModal from "../components/ErrorModal";
import InformationModal from "../components/InformationModal";

const TeacherCourses = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

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

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setEditTitle(course.title);
        setSelectedImage(null);
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        const formData = new FormData();
        formData.append("nombrecurso", editTitle);
        if (selectedImage) {
            formData.append("imagen", selectedImage);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/editar-curso/${selectedCourse.id}/`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                setInfoMessage("✅ Curso editado con éxito");
                setShowEditModal(false);
                window.location.reload();
            } else {
                const errorData = await response.json();
                setErrorMessage("❌ Error al editar curso: " + (errorData.error || ""));
            }
        } catch (error) {
            setErrorMessage("❌ Error al enviar datos");
        }
    };

    const handleDeleteClick = async (courseId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/eliminar-curso/${courseId}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                setInfoMessage("✅ Curso eliminado");
                setCourses(courses.filter(c => c.id !== courseId));
            } else {
                const data = await res.json();
                setErrorMessage("❌ " + (data.error || "No se pudo eliminar"));
            }
        } catch (e) {
            setErrorMessage("❌ Error al eliminar curso");
        }
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
    }, [API_URL]);


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
            <InformationModal
                message={infoMessage}
                onClose={() => {
                    setInfoMessage("");
                    window.location.reload();
                }}
            />

            <ErrorModal
                message={errorMessage}
                onClose={() => setErrorMessage("")}
            />

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
                                <div key={course.id} className="course-card">
                                    <img src={construirURLDrive(course.image)} alt={course.title}
                                         className="course-image" onClick={() => handleCourseClick(course.id)}/>
                                    <h3 onClick={() => handleCourseClick(course.id)}>{course.title}</h3>
                                    <div className="course-actions">
                                        <FaEdit onClick={() => handleEditClick(course)} className="icon edit"/>
                                        <FaTrash onClick={() => handleDeleteClick(course.id)} className="icon delete"/>
                                    </div>
                                </div>

                            ))}
                            <button className="btn-arrow">
                                <FaChevronRight/>
                            </button>
                        </div>
                    ) : (
                        <p>No tienes cursos creados aún.</p>
                    )}
                </div>
            </div>
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h3>Editar curso</h3>
                        <div>
                            <label htmlFor="titulo">Título del curso</label>
                            <input
                                id="titulo"
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Ej. Programación en C"
                            />

                            <label htmlFor="imagen" style={{marginTop: "15px"}}>Imagen del curso</label>
                            <input
                                id="imagen"
                                type="file"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />
                        </div>

                        <div className="modal-actions">
                            <button onClick={() => setShowEditModal(false)}>Cancelar</button>
                            <button onClick={handleSaveEdit}>Guardar</button>
                        </div>
                    </div>
                </div>
            )}


            <Footer/>
        </div>
    );
};

export default TeacherCourses;
