import React, { useState } from 'react';
import {useParams} from "react-router-dom";

const AgregarRecurso = ({ onClose }) => {
    const { courseId } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!archivo) {
            alert("Por favor selecciona un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("archivo", archivo);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/subir-recurso/${courseId}/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Recurso agregado correctamente");
                onClose();  // Cerrar modal
            } else {
                alert("❌ Error al subir recurso: " + (data.error || "desconocido"));
            }
        } catch (error) {
            console.error("Error al subir recurso:", error);
            alert("❌ Error en la conexión");
        }
    };

    return (
        <div className="modal-overlay">
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
                                style={{ display: 'none' }}
                                id="recurso-file"
                            />
                            <label htmlFor="recurso-file" className="upload-icon">
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
                        >Agregar</button>
                        <button className="btn btn-danger" type="button" onClick={onClose}
                                style={
                                    {
                                        backgroundColor: "#6c6c6c",
                                        border: "2px solid #6c6c6c",
                                    }
                                }>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarRecurso;
