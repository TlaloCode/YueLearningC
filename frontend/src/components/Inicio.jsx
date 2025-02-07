import React from "react";
import "@fontsource/roboto";
import coding from "../Img/coding.jpg"

const Inicio = () => {
    return (
        <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
            {/* Imagen de fondo */}
            <img
                src={coding}
                alt="Coding"
                style={{
                    width: "100%",
                    height: "200%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            />
            {/* Botón superpuesto */}
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
                    onClick={() => (window.location.href = "/login")} // Redirige a login
                    style={{
                        backgroundColor: "#003366", // Azul oscuro
                        borderColor: "#003366",
                        color: "white",
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "3rem", // Tamaño de la fuente más grande
                        padding: "25px 50px", // Más espacio interno
                        borderRadius: "20px", // Bordes redondeados
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Sombra para destacar
                        cursor: "pointer",
                    }}
                >
                    Empezar
                    <span
                        style={{
                            display: "block",
                            fontSize: "0.9rem", // Tamaño del subtítulo
                            marginTop: "5px",
                            fontWeight: "400",
                        }}
                    >
            Iniciar sesión
          </span>
                </button>
            </div>
        </div>
    );
};

export default Inicio;
