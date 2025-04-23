import React, { useState } from 'react';

const AgregarRecurso = ({ onClose }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (archivo) {
            console.log('Recurso Subido:', archivo);
            console.log('Título:', titulo);
            console.log('Descripción:', descripcion);
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

                    <div className="button-group">
                        <button className="btn btn-success" type="submit">Agregar</button>
                        <button className="btn btn-danger" type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarRecurso;
