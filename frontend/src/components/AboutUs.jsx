import React from "react";
import "@fontsource/roboto";
import creadores from "../Img/creadores.png"

const AboutUs = () => {
    return (
        <section
            style={{
                padding: "30px 20px",
                backgroundColor: "#afa6a6",
                fontFamily: "Roboto, sans-serif",
            }}
        >
            <h2 style={{ fontSize: "3rem", marginBottom: "20px", textAlign: "right", marginRight: "400px", fontWeight: 600 }}>
                ¿Quiénes somos?
            </h2>
            <div
                className="d-flex flex-column flex-lg-row align-items-center justify-content-center"
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    gap: "20px",
                }}
            >
                {/* Imagen */}
                <div style={{ flex: "1", textAlign: "center" }}>
                    <img
                        src={creadores}
                        alt="Creadores de la plataforma"
                        style={{
                            width: "100%",
                            maxWidth: "400px",
                            borderRadius: "10px",
                        }}
                    />
                </div>

                {/* Información */}
                <div style={{ flex: "1" }}>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5", textAlign: "justify" }}>
                        <strong>YUE-Learning C</strong> es una página web educativa diseñada para fungir como
                        herramienta de apoyo para la enseñanza de programación en lenguaje C. Dirigido a
                        estudiantes de la <strong>Escuela Superior de Cómputo (ESCOM)</strong>, este proyecto
                        busca transformar el aprendizaje en una experiencia accesible y práctica.
                    </p>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5", textAlign: "justify" }}>
                        Nuestro objetivo es proporcionar una plataforma donde estudiantes puedan acceder a
                        materiales de calidad, aprender a su propio ritmo y mejorar sus habilidades en
                        programación mediante cursos interactivos y actividades prácticas.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
