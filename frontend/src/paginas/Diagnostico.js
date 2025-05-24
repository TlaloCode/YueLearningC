import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/Diagnostico.css";
import { FaArrowLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Diagnostico = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [titulo, setTitulo] = useState("Diagnóstico");
    const [respuestasEvaluadas, setRespuestasEvaluadas] = useState([]);
    const [evaluado, setEvaluado] = useState(false);

    useEffect(() => {
        const fetchDiagnostico = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch(`${API_URL}/diagnostico/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setTitulo(data.titulo || "Diagnóstico");
                    setPreguntas(data.preguntas);
                } else {
                    const error = await res.json();
                    alert("Error al obtener el diagnóstico: " + (error.error || "desconocido"));
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                alert("No se pudo conectar con el servidor.");
            }
        };

        fetchDiagnostico();
    }, [API_URL]);

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
                    respuestas: respuestas
                })
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Tu calificación diagnóstica es: ${result.calificacion}`);
                setRespuestasEvaluadas(result.detalle);
                setEvaluado(true);
            } else {
                const errorData = await response.json();
                alert("Error al calificar: " + (errorData.error || "desconocido"));
            }
        } catch (error) {
            console.error("Error al calificar:", error);
            alert("No se pudo enviar tu diagnóstico.");
        }
    };

    return (
        <div className="diagnostico-container">
            <Header />

            <div className="diagnostico-content">
                <div className="back-button"  onClick={() => navigate(-1)}>
                    <FaArrowLeft /> <span>Atrás</span>
                </div>

                <h1 className="main-title">Veamos como vienes</h1>
                <p className="subtitle">
                    Evalúa los conocimientos con los que llegas, en el transcurso podrás comparar cuánto has avanzado.
                    No te preocupes si no sales muy bien, vamos paso a paso, pero sé constante.
                </p>

                <div className="diagnostico-card">
                    <h3>{titulo}</h3>
                    {preguntas.map((pregunta, index) => (
                        <div className="question" key={pregunta.id_pregunta}>
                            <p><strong>{index + 1}. {pregunta.textopregunta}</strong></p>

                            {Array.isArray(pregunta.opciones) && pregunta.opciones.map((opcion) => {
                                const evaluacion = respuestasEvaluadas.find(r => r.id_pregunta === pregunta.id_pregunta);
                                const esSeleccionada = respuestas[pregunta.id_pregunta] === opcion.id_opciones;
                                const esCorrecta = evaluacion && opcion.id_opciones === evaluacion.id_correcta;
                                const esIncorrecta = evaluacion && esSeleccionada && !esCorrecta;

                                let clase = "";
                                if (evaluado) {
                                    if (esCorrecta) clase = "opcion-correcta";
                                    else if (esIncorrecta) clase = "opcion-incorrecta";
                                }

                                return (
                                    <label key={opcion.id_opciones} className={clase}>
                                        <input
                                            type="radio"
                                            name={`q${pregunta.id_pregunta}`}
                                            checked={esSeleccionada}
                                            disabled={evaluado}
                                            onChange={() => handleChange(pregunta.id_pregunta, opcion.id_opciones)}
                                        />
                                        {opcion.textoopcion}
                                    </label>
                                );
                            })}
                        </div>
                    ))}

                    <button className="submit-btn" onClick={handleSubmit}>Enviar</button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Diagnostico;
