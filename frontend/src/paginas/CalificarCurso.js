import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import genericCourse from "../assets/c-course.jpg";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/CalificarCurso.css";
import { FaStar, FaArrowLeft } from "react-icons/fa";

const CalificarCurso = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(3);
    const [curso, setCurso] = useState(null);

    const handleRate = (value) => {
        setRating(value);
        // Aquí podrías enviar la calificación al servidor si deseas
    };


    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchCurso = async () => {
            try {
                const res = await fetch(`${API_URL}/get-course-details/${courseId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    setCurso(data);
                } else {
                    alert("No se pudo obtener la información del curso.");
                }
            } catch (error) {
                console.error("Error al cargar el curso:", error);
            }
        };

        fetchCurso();
    }, [courseId,API_URL]);

    const getImagenCurso = (idImagen) => {
        if (!idImagen) return genericCourse;
        return `https://lh3.googleusercontent.com/d/${idImagen}=w500`;
    };

    const handleEnviarCalificacion = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${API_URL}/calificar-curso/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_curso: courseId,
                    calificacion: rating
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Gracias por tu calificación.");
                navigate(-1);
            } else {
                alert(data.error || "❌ No se pudo enviar la calificación.");
            }
        } catch (error) {
            console.error("Error al calificar:", error);
            alert("Error de red.");
        }
    };



    return (
        <div className="calificar-container">
            <Header />

            <div className="calificar-content">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft/> <span>Atrás</span>
                </div>

                <h1 className="title">Califica el curso <span role="img">🖱️</span></h1>
                <p className="description">
                    Calificar el curso ayuda a los creadores a valorar su contenido y esforzarse en mejorar cada aspecto del mismo
                </p>
                {curso ? (
                <div className="course-rating-card">
                    <div className="left-info">
                        <h2>{curso.title}</h2>
                        <p className="author">{curso.author}</p>

                        <div className="stars-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`star ${star <= rating ? '' : 'gray'}`}
                                    onClick={() => handleRate(star)}
                                />
                            ))}
                            <span className="score">{rating}.0</span>
                        </div>

                        <button className="btn-calificar" onClick={handleEnviarCalificacion}>Calificar</button>
                    </div>

                    <div className="right-info">
                        <img
                            key={curso.image}  // Esto fuerza un remount si cambia el ID
                            src={getImagenCurso(curso.image)}
                            alt="imagen curso"
                            className="course-img"
                        />
                        <p className="img-desc">{curso.description}</p>
                    </div>
                </div>
                ) : (
                    <p>Cargando curso...</p>
                )}
            </div>

            <Footer/>
        </div>
    );
};

export default CalificarCurso;
