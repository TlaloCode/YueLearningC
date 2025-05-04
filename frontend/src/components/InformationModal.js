import React from "react";

const InformationModal = ({ message, onClose }) => {
    if (!message) return null; // No mostrar nada si no hay mensaje

    return (
        <>
            {/* Fondo oscuro que bloquea la interacción con la página */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",  // Transparencia para el efecto de desenfoque
                    zIndex: 999,  // Se asegura de estar sobre todo
                }}
                onClick={onClose}  // Cierra el modal si se hace clic fuera del cuadro
            ></div>

            {/* Contenedor del modal */}
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#f8dc7e",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    width: "300px",
                    zIndex: 1000,  // Se asegura de estar encima del fondo oscuro
                }}
            >
                <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                    {message}
                </p>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </>
    );
};

export default InformationModal;
