import React from "react";
import "@fontsource/roboto";

const Inicio = () => {
    return (
        <div
            style={{
                backgroundImage: "url(coding-image.jpg)", // Imagen de estudiantes trabajando
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}
            >
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => window.location.href = "/login"} // Redirige a login
                    style={{
                        backgroundColor: "#003366", // Azul oscuro
                        borderColor: "#003366",
                        fontFamily: "Roboto, sans-serif",
                    }}
                >
                    Empezar
                </button>
            </div>
        </div>
    );
};

export default Inicio;
