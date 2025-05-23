import React, { useState } from "react";
import "../css/AgregarVideo.css";
import { FaUpload } from "react-icons/fa";
import {useParams} from "react-router-dom";
import PantallaCarga from "../components/PantallaCarga";

const AgregarVideo = ({ onClose }) => {
    const { courseId } = useParams();
    const [videoTitle, setVideoTitle] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [videoDescription, setVideoDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);  // Mostrar pantalla de carga

        const formData = new FormData();
        formData.append("titulo", videoTitle);
        formData.append("descripcion", videoDescription);
        formData.append("video", videoFile);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/subir-video/${courseId}/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            setIsLoading(false);  // Ocultar carga

            if (response.ok) {
                alert("✅ Video agregado correctamente");
                onClose();
            } else {
                alert("❌ Error al subir video: " + (data.error || "desconocido"));
            }
        } catch (error) {
            alert("❌ Error en la conexión");
            setIsLoading(false);
        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">Agregar Video</h2>
                <form onSubmit={handleSubmit} className="video-form">
                    <div className="input-group">
                        <label className="video-label">Título del video</label>
                        <input
                            type="text"
                            className="video-input"
                            placeholder="Ingrese el título del video"
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                            required
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

                    <div className="upload-container">
                        <label htmlFor="video-upload" className="upload-area">
                            <FaUpload className="upload-icon" />
                            <input
                                type="file"
                                id="video-upload"
                                accept="video/*"
                                onChange={handleFileChange}
                                hidden
                            />
                        </label>
                    </div>

                    <div className="input-group">
                        <textarea
                            className="video-description"
                            placeholder="Descripción del video, el profesor podrá agregar caracteres especiales o links"
                            style={{
                                width: "100%",
                                height: "100%",
                                padding: "10px 10px 10px 40px",
                                borderRadius: "20px",
                                border: "1px solid #ccc",
                                outline: "none",
                                fontFamily: "Roboto, sans-serif",
                            }}
                            value={videoDescription}
                            onChange={(e) => setVideoDescription(e.target.value)}
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn btn-success"
                                onChange={handleSubmit}
                                style={
                                    {
                                        backgroundColor: "#0077DD",
                                        border: "2px solid #0077DD",
                                    }
                                }
                        >Agregar</button>
                        <button type="button" className="btn btn-danger" onClick={onClose}
                                style={
                                    {
                                        backgroundColor: "#6c6c6c",
                                        border: "2px solid #6c6c6c",
                                    }
                                }>Cancelar</button>
                    </div>
                </form>
            </div>
            {isLoading && <PantallaCarga mensaje="Subiendo video. Esto puede tardar unos minutos..." />}


        </div>
    );
};

export default AgregarVideo;
