import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const ErrorAcceso = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f8f9fa",
                fontFamily: "Roboto, sans-serif",
                textAlign: "center",
                padding: "30px",
            }}
        >
            <FaLock size={80} color="#dc3545" />
            <h1 style={{ fontSize: "2.5rem", marginTop: "20px", color: "#333" }}>
                Acceso denegado
            </h1>
            <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginTop: "10px", color: "#666" }}>
                No tienes los permisos necesarios para acceder a esta sección de la aplicación.
                Verifica tu tipo de usuario o inicia sesión con otra cuenta.
            </p>

            <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: "#007bff",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                >
                    Ir al inicio
                </button>
            </div>
        </div>
    );
};

export default ErrorAcceso;
