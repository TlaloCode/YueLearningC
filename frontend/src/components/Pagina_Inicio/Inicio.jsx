import React, { useEffect, useState } from "react";
import "@fontsource/roboto";
import { useNavigate } from "react-router-dom";

import coding1 from "../../Img/coding.jpg";
import ESCOM from "../../Img/ESCOM.jpeg";
import coding3 from "../../Img/coding3.jpg";

const images = [coding1, ESCOM, coding3];

const Inicio = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxHeight: "600px",
                minHeight: "300px",
                overflow: "hidden",
                backgroundColor: "#92C5FC",
                textAlign: "center",
            }}
        >
            {/* Imagen de fondo visible */}
            <div style={{ width: "100%", height: "100%" }}>
                <img
                    src={images[currentImage]}
                    alt="Carrusel"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "600px",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                        margin: "0 auto",
                        transition: "opacity 1s ease-in-out",
                    }}
                />
            </div>

            {/* Botón centrado superpuesto */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                }}
            >
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        if (!token) {
                            navigate(`/login`);
                        }
                    }}
                    style={{
                        backgroundColor: "#003366",
                        borderColor: "#003366",
                        color: "white",
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "2rem",        // 👈 más pequeño
                        padding: "15px 30px",    // 👈 más compacto
                        borderRadius: "20px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                    }}
                >
                    Empezar
                    <span
                        style={{
                            display: "block",
                            fontSize: "0.8rem",   // 👈 subtítulo más discreto
                            marginTop: "5px",
                            fontWeight: "300",
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
