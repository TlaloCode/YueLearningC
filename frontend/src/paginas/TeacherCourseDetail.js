import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import ConfirmationModal from "../components/ConfirmationModal"
import "../css/TeacherCourseDetail.css";
import userImagePlaceholder from "../assets/default-user.jpg";
import courseImage from "../assets/c-course.jpg";
import pdf from "../assets/pdf.png";
import AgregarVideo from "../paginas/AgregarVideo";
import AgregarRecurso from "../paginas/AgregarRecurso";
import {FaStar,FaEdit, FaChevronLeft, FaPlusCircle, FaTrash } from "react-icons/fa";


const TeacherCourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [fotoPerfil, setfotoPerfil] = useState(null);
    const [showConfirmationModalVideo, setShowConfirmationModalVideo] = useState(false);
    const [showConfirmationModalResource, setShowConfirmationModalResource] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [resourceToDelete, setResourceToDelete] = useState(null);


    const [videos, setVideos] = useState([]);
    const [resources, setResources] = useState([]);


    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [showRecursoModal, setShowRecursoModal] = useState(false);

    const handleOpenRecursoModal = () => setShowRecursoModal(true);
    const handleCloseRecursoModal = () => setShowRecursoModal(false);

    const handleDeleteClick = (video) => {
        setVideoToDelete(video);
        setShowConfirmationModalVideo(true);
    };

    const handleDeleteRecursoClick = (recurso) => {
        setResourceToDelete(recurso);
        setShowConfirmationModalResource(true);
    };

    const confirmDeleteVideo = async () => {
        if (!videoToDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://127.0.0.1:8000/api/delete-video/${videoToDelete.id_video}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("Video eliminado exitosamente");

                // Opcional: recargar videos después de eliminar
                setVideos(videos.filter(v => v.id_video !== videoToDelete.id_video));
            } else {
                const data = await response.json();
                alert("Error al eliminar el video: " + (data.error || "desconocido"));
            }
        } catch (error) {
            console.error("Error al eliminar video:", error);
            alert("Error de conexión al eliminar");
        }

        setShowConfirmationModalVideo(false);
        setVideoToDelete(null);
    };

    const confirmDeleteRecurso = async () => {
        if (!resourceToDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://127.0.0.1:8000/api/delete-recurso/${resourceToDelete.id_recurso}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("Recurso eliminado exitosamente");

                // Actualizar recursos localmente
                setResources(resources.filter(r => r.id_recurso !== resourceToDelete.id_recurso));
            } else {
                const data = await response.json();
                alert("Error al eliminar recurso: " + (data.error || "desconocido"));
            }
        } catch (error) {
            console.error("Error al eliminar recurso:", error);
            alert("Error de conexión al eliminar recurso");
        }

        setShowConfirmationModalResource(false);
        setResourceToDelete(null);
    };



    useEffect(() => {
        const fetchCourseDetails = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`http://127.0.0.1:8000/api/get-course-details/${courseId}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCourse(data);
                setVideos(data.videos || []);
                setResources(data.recursos || []);
            } else {
                console.error("Error al obtener el curso");
            }
        };

        const fetchTeacherDetails = async () => {
            const token = localStorage.getItem("token");
            const cachedImage = sessionStorage.getItem("cachedProfileImage");
            if (!token) return;

            if (cachedImage) {
                console.log("Usando imagen desde cache");
                setfotoPerfil(cachedImage);
            }

            const response = await fetch("http://127.0.0.1:8000/api/get-user-profile/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok)
            {
                const data = await response.json();
                setTeacher(data);
            }else {
                console.error("Error al obtener el docente");
            }
        };
        fetchTeacherDetails()
        fetchCourseDetails();
    }, [courseId]);

    if (!course) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="app-container">
            <Header />

            <div className="profile-section">
                <div className="profile-info">
                    <img src={fotoPerfil || userImagePlaceholder} alt="Profile" className="profile-image" />
                    <div className="profile-details">
                        <h2 className="profile-name">{teacher.nombre || "Sin autor"}</h2>
                        <a href="mailto:usuario@ipn.mx" className="profile-email">{teacher.correoelectronico || "Sin correo"}</a>
                        <p className="profile-bio">{teacher.descripcionperfil || "Descripcion"}</p>
                    </div>
                </div>
            </div>

            <div className="course-info">
                <h2 className="course-title">{course.title}</h2>
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
                            <FaChevronLeft/>
                        </button>
                        <h3>Lista de videos</h3>
                        <button className="add-button" onClick={handleOpenModal}>
                            Agregar <FaPlusCircle/>
                        </button>
                        {showModal && <AgregarVideo onClose={handleCloseModal}/>}
                    </div>
                    <div className="videos-grid">
                        {videos.length > 0 ? (
                            videos.map((video) => (
                                <div key={video.id_video} className="video-card">
                                    <img
                                        src={courseImage}
                                        alt="Miniatura de video"
                                        className="video-thumbnail"
                                    />
                                    <p className="video-title">{video.titulovideo}</p>
                                    <div className="video-actions">
                                        <FaEdit title="Editar" className="edit-icon-react" />
                                        <FaTrash className="delete-icon" title="Eliminar"
                                                 onClick={() => handleDeleteClick(video)}/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">No hay videos disponibles para este curso.</p>
                        )}
                    </div>
                </div>

                <div className="course-section">
                    <div className="section-header">
                        <h3>Recursos de apoyo</h3>
                        <button className="add-button" onClick={handleOpenRecursoModal}>
                            Agregar <FaPlusCircle/>
                        </button>
                        {showRecursoModal && <AgregarRecurso onClose={handleCloseRecursoModal}/>}
                    </div>
                    <div className="resources-list">
                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <div key={resource.id_recurso} className="resource-item">
                                    <a href={resource.title} target="_blank" rel="noopener noreferrer">
                                        <img src={pdf} alt="PDF" className="pdf-icon"/>
                                    </a>
                                    <p className="resource-title">{resource.titulorecurso}</p>
                                    <FaEdit className="edit-icon-react" />
                                    <FaTrash className="delete-icon" onClick={() => handleDeleteRecursoClick(resource)}/>
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">Aún no hay recursos de apoyo disponibles.</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
            {showConfirmationModalVideo && (
                <ConfirmationModal
                    message="El elemento se eliminará permanentemente ¿Estás seguro de que quieres eliminarlo?"
                    onClose={() => setShowConfirmationModalVideo(false)}
                    onConfirm={confirmDeleteVideo}
                />
            )}

            {showConfirmationModalResource && (
                <ConfirmationModal
                    message="El elemento se eliminará permanentemente ¿Estás seguro de que quieres eliminarlo?"
                    onClose={() => setShowConfirmationModalResource(false)}
                    onConfirm={confirmDeleteRecurso}
                />
            )}

        </div>
    );
};

export default TeacherCourseDetail;
