import React, { useState } from 'react';
import "../css/AgregarRecurso.css";
import {useParams} from "react-router-dom";
import PantallaCarga from "../components/PantallaCarga";
import InformationModal from "../components/InformationModal";
import ErrorModal from "../components/ErrorModal";

const AgregarRecurso = ({ onClose, modoLocal = false, onSave, courseIdProp }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { courseId: courseIdURL } = useParams();
    const courseId = courseIdProp || courseIdURL;
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);  // Mostrar pantalla de carga

        if (!archivo) {
            alert("Por favor selecciona un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("archivo", archivo);

        const token = localStorage.getItem("token");
        if (modoLocal) {
            alert("Recurso subido temporalmente");
            onSave({
                titulo,
                descripcion,
                archivo
            });
            setIsLoading(false);
            onClose();
            return;
        }

        try {
            const response = await fetch(`${API_URL}/subir-recurso/${courseId}/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            setIsLoading(false);  // Ocultar carga

            if (response.ok) {
                setInfoMessage("Recurso agregado correctamente");
                onClose();  // Cerrar modal
                await fetch(`${API_URL}/notificar-estudiantes/${courseId}/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mensaje: `Se ha subido un nuevo recurso: "${titulo}". ¡Ve a revisarlo!`
                    })
                });

            } else {
                setErrorMessage("Error al subir recurso: " + (data.error || "desconocido"));
            }
        } catch (error) {
            setErrorMessage("Error al subir recurso");
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <PantallaCarga mensaje="Subiendo recurso. Esto puede tardar unos minutos..."/>}
        <div className="modal-overlay"
             style={{
                 position: "fixed",
                 top: 0,
                 left: 0,
                 width: "100vw",
                 height: "100vh",
                 backgroundColor: "rgba(0, 0, 0, 0.5)",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 zIndex: 9998,
             }}>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal
                message={infoMessage}
                onClose={() => {
                    setInfoMessage("");
                    window.location.reload();
                }}
            />
            <div className="modal-container">
                <h2 className="modal-title">Agregar Recurso</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="video-label" htmlFor="titulo">Título del Recurso</label>
                        <input
                            type="text"
                            id="titulo"
                            className="video-input"
                            placeholder="Ingrese el título del recurso"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 10px 10px 40px",
                                fontSize: "18px",
                                borderRadius: "20px",
                                border: "1px solid #ccc",
                                outline: "none",
                                fontFamily: "Roboto, sans-serif",
                            }}
                        />
                    </div>

                    <div className="input-group">

                        <textarea
                            id="descripcion"
                            className="video-description"
                            placeholder="Descripción del recurso"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 10px 10px 40px",
                                fontSize: "18px",
                                borderRadius: "20px",
                                border: "1px solid #ccc",
                                outline: "none",
                                fontFamily: "Roboto, sans-serif",
                            }}
                        />
                    </div>
                    <br/>
                    <div className="upload-container">
                        <div className="upload-area">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{display: 'none'}}
                                id="recurso-file"
                            />
                            <label htmlFor="recurso-file" className="upload-resource-icon">
                                📁 Subir archivo
                            </label>
                        </div>
                    </div>
                    <br/>
                    <div className="button-group">
                        <button className="btn btn-success" type="submit"
                                onChange={handleSubmit}
                                style={
                                    {
                                        backgroundColor: "#0077DD",
                                        border: "2px solid #0077DD",
                                    }
                                }
                        >Agregar
                        </button>
                        <button className="btn btn-danger" type="button" onClick={onClose}
                                style={
                                    {
                                        backgroundColor: "#6c6c6c",
                                        border: "2px solid #6c6c6c",
                                    }
                                }>Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default AgregarRecurso;
