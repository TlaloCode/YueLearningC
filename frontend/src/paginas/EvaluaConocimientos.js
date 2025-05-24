import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/EvaluaConocimientos.css";
import SideBarMenu from "../components/SiderBarMenu";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EvaluaConocimientos = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [tituloCuestionario, setTituloCuestionario] = useState("");

    useEffect(() =>{

        const fetchPreguntas = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${API_URL}/cuestionarios/${courseId}/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.length > 0) {
                        setPreguntas(data[0].preguntas);
                        setTituloCuestionario(data[0].titulo || "Cuestionario");
                    } else {
                        setPreguntas([]);
                        setTituloCuestionario("No se encontraron cuestionarios.");
                    }
                } else {
                    const errorData = await response.json();
                    alert("Error al cargar preguntas: " + (errorData.error || "desconocido"));
                }
            } catch (error) {
                console.error("Error al obtener preguntas:", error);
                alert("Ocurrió un error de conexión.");
            }
        };

        fetchPreguntas();
    }, [courseId,API_URL]);

    const handleChange = (id_pregunta, id_opcion) => {
        setRespuestas({ ...respuestas, [id_pregunta]: id_opcion });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/respuestas/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curso: courseId,
                    respuestas: respuestas
                })
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Tu calificación es: ${result.calificacion}`);
            } else {
                const errorData = await response.json();
                alert("Error al enviar respuestas: " + (errorData.error || "desconocido"));
            }
        } catch (error) {
            console.error("Error al calificar:", error);
            alert("Ocurrió un error de conexión al enviar respuestas.");
        }
    };

    return (
        <div className="evalua-container">
            <Header />

            <div className="evalua-wrapper">
                <SideBarMenu/>

                <div className="quiz-section">
                    <div className="back-button" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> <span>Atrás</span>
                    </div>

                    <h1>Evalúa tus conocimientos</h1>
                    <p>{tituloCuestionario}</p>

                    <div className="quiz-card">
                        {preguntas.length > 0 ? (
                            preguntas.map((pregunta, index) => (
                                <div className="question" key={pregunta.id_pregunta}>
                                    <p><strong>{index + 1}. {pregunta.textopregunta}</strong></p>
                                    {pregunta.opciones.map((opcion) => (
                                        <label key={opcion.id_opciones}>
                                            <input
                                                type="radio"
                                                name={`q${pregunta.id_pregunta}`}
                                                checked={respuestas[pregunta.id_pregunta] === opcion.id_opciones}
                                                onChange={() => handleChange(pregunta.id_pregunta, opcion.id_opciones)}
                                            />
                                            {opcion.textoopcion}
                                        </label>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No hay preguntas disponibles para este curso.</p>
                        )}

                        <button className="submit-btn" onClick={handleSubmit}>Enviar</button>
                    </div>

                    <div className="quiz-navigation">
                        <button className="nav-btn">01</button>
                        <button className="nav-btn">02</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EvaluaConocimientos;
