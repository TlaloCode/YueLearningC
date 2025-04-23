import React, { useState } from "react";
import "../css/AgregarVideo.css";
import { FaUpload } from "react-icons/fa";

const AgregarVideo = ({ onClose }) => {
    const [videoTitle, setVideoTitle] = useState("");
    const [videoFile, setVideoFile] = useState(null);

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Video agregado:", { videoTitle, videoFile });
        onClose(); // Cierra el modal después de agregar
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
                                padding: "10px 10px 10px 40px",
                                borderRadius: "20px",
                                border: "1px solid #ccc",
                                outline: "none",
                                fontFamily: "Roboto, sans-serif",
                            }}
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn btn-success">Agregar</button>
                        <button type="button" className="btn btn-danger" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarVideo;
