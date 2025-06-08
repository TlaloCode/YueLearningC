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
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";


const TeacherCourseDetail = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [fotoPerfil, setfotoPerfil] = useState(null);
    const [showConfirmationModalVideo, setShowConfirmationModalVideo] = useState(false);
    const [showConfirmationModalResource, setShowConfirmationModalResource] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [resourceToDelete, setResourceToDelete] = useState(null);
    const [inscritos, setInscritos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [infoMessage, setInfoMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



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

    const handleEdit = (item, isVideo = true) => {
        setIsEditing(true);
        setEditItem({ ...item, isVideo });
        setEditTitle(isVideo ? item.titulovideo : item.titulorecurso);
        setEditDescription(item.descripcion);
        setSelectedFile(null); // en blanco por si no desea cambiar archivo
    };


    const confirmDeleteVideo = async () => {
        if (!videoToDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/delete-video/${videoToDelete.id_video}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                setInfoMessage("Video eliminado correctamente");

                // Opcional: recargar videos después de eliminar
                setVideos(videos.filter(v => v.id_video !== videoToDelete.id_video));
            } else {
                const data = await response.json();
                setErrorMessage("Error al eliminar el video"|| data);
            }
        } catch (error) {
            setErrorMessage("Error de conexion al eliminar");
        }

        setShowConfirmationModalVideo(false);
        setVideoToDelete(null);
    };

    const confirmDeleteRecurso = async () => {
        if (!resourceToDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/delete-recurso/${resourceToDelete.id_recurso}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                setInfoMessage("✅ Recurso eliminado correctamente");

                // Actualizar recursos localmente
                setResources(resources.filter(r => r.id_recurso !== resourceToDelete.id_recurso));
            } else {
                const data = await response.json();
                setErrorMessage("Error al eliminar recurso" || data);
            }
        } catch (err) {
            setErrorMessage("Error de conexión al eliminar");
        }


        setShowConfirmationModalResource(false);
        setResourceToDelete(null);
    }

    const confirmEdit = async () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("titulo", editTitle);
        formData.append("descripcion", editDescription);
        if (selectedFile) {
            formData.append(editItem.isVideo ? "video" : "archivo", selectedFile);
        }

        const endpoint = editItem.isVideo
            ? `${API_URL}/editar-video/${editItem.id_video}/`
            : `${API_URL}/editar-recurso/${editItem.id_recurso}/`;

        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setInfoMessage("✅ Contenido actualizado correctamente");
            } else {
                const error = await response.json();
                setErrorMessage("❌ Error al actualizar: " + (error?.error || "desconocido"));
            }

        } catch (err) {
            setErrorMessage("❌ Error de conexión al actualizar");
        }



        setIsEditing(false);
        setEditItem(null);
    };




    useEffect(() => {
        const fetchCourseDetails = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/get-course-details/${courseId}/`, {
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

        const fetchInscritos = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${API_URL}/inscritos-curso/${courseId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setInscritos(data);
                } else {
                    console.error("Error al obtener inscritos.");
                }
            } catch (err) {
                console.error("Error:", err);
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

            const response = await fetch(`${API_URL}/get-user-profile/`, {
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
        fetchInscritos();
    }, [courseId,API_URL]);

    if (!course) {
        return <div>Cargando...</div>;
    }

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
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`star ${i < (course.calificacion || 5) ? "" : "gray"}`}
                        />
                    ))}
                    <strong>{course.calificacion || 5}.0</strong>
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
                        {showModal && (
                            <AgregarVideo
                                onClose={handleCloseModal}
                                modoLocal={false} // 👈 se enviará directamente al backend
                                courseIdProp={courseId} // 👈 usa el ID desde la URL
                            />
                        )}
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
                                        <FaEdit title="Editar" className="edit-icon-react"
                                                onClick={() => handleEdit(video, true)} />
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
                        {showRecursoModal && (
                            <AgregarRecurso
                                onClose={handleCloseRecursoModal}
                                modoLocal={false}
                                courseIdProp={courseId}
                            />
                        )}
                    </div>
                    <div className="resources-list">
                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <div key={resource.id_recurso} className="resource-item">
                                    <a href={resource.title} target="_blank" rel="noopener noreferrer">
                                        <img src={pdf} alt="PDF" className="pdf-icon"/>
                                    </a>
                                    <p className="resource-title">{resource.titulorecurso}</p>
                                    <FaEdit className="edit-icon-react" title="EditarRes"
                                            onClick={() => handleEdit(resource, false)} />
                                    <FaTrash className="delete-icon"
                                             onClick={() => handleDeleteRecursoClick(resource)}/>
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">Aún no hay recursos de apoyo disponibles.</p>
                        )}
                    </div>
                </div>
                <div className="course-section">
                    <h3>Estudiantes inscritos</h3>
                    {inscritos.length > 0 ? (
                        <ul className="student-list">
                            {inscritos.map((est, idx) => (
                                <li key={idx}>{est.nickname}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-message">Aún no hay estudiantes inscritos en este curso.</p>
                    )}
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

            {isEditing && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
                    <div  className="modal-container" style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '400px', fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
                        <h3 className="modal-title" style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>Editar {editItem?.isVideo ? "video" : "recurso"}</h3>
                        <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label>Título</label>
                            <input className="video-input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            <label>Descripción</label>
                            <input  className="video-input" type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                            <label>{editItem?.isVideo ? "Actualizar imagen del video" : "Actualizar archivo del recurso (opcional)"}</label>
                            <input className="video-input" type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        </div>
                        <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                            <button className="btn btn-danger" onClick={() => setIsEditing(false)} style={{ padding: '8px 16px' }}>Cancelar</button>
                            <button className="btn btn-success" onClick={confirmEdit} style={{ padding: '8px 16px', background: '#007bff', color: 'white' }}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default TeacherCourseDetail;
