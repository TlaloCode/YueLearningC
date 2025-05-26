import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/InscribirCurso.css";
import genericCourse from "../assets/c-course.jpg"
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";

const InscribirCurso = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");
    const navigate = useNavigate();


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
            } else {
                console.error("Error al obtener el curso:", response.status, response.statusText);
            }
        };


        fetchCourseDetails();
    }, [courseId,API_URL]);

    const handleInscribir = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/inscribir-curso/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ curso_id: course.id }),
        });

        if (response.ok) {
            setInformationMessage("Inscripción exitosa");

        } else {
           setInformationMessage("Error al inscribirse");
        }
    };

    const construirURLDrive = (idImagen) => {
        if (!idImagen) return genericCourse;
        return `https://drive.google.com/thumbnail?id=${idImagen}&sz=w500`;
    };

    if (!course) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal
                message={InformationMessage}
                onClose={() => {
                    setInformationMessage("");
                    if (InformationMessage === "Inscripción exitosa") {
                        navigate(`/lista-videos/${courseId}`);
                    } else {
                        navigate("/mis-cursos-estudiante");
                    }
                }}
            />
            <div className="course-detail-container">
            <Header />

            <div className="course-content">
                <div className="back-button">
                    <FaArrowLeft /> <span>Atrás</span>
                </div>

                <div className="title-rating">
                    <div>
                        <h1 className="course-title">{course.title}</h1>
                        <p className="course-author">{course.author}</p>
                    </div>

                    <div className="course-rating right">
                        <div className="stars">
                            <FaStar className="star" />
                            <FaStar className="star" />
                            <FaStar className="star" />
                            <FaStar className="star" />
                            <FaStar className="star gray" />
                        </div>
                        <span className="rating-value">4.0</span>
                    </div>
                </div>


                <img
                    src={construirURLDrive(course.image)}
                    alt="Código ejemplo"
                    className="course-image"
                />

                <p className="course-description">
                    {course.description}
                </p>

                <button className="btn-inscribirse" onClick={handleInscribir}>
                    Inscribir <FaArrowRight />
                </button>
            </div>

            <Footer />
        </div>
        </div>
    );
};

export default InscribirCurso;
