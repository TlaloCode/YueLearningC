import React from "react";
import "@fontsource/roboto";

const MissionVision = () => {
    return (
        <section
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0",
                padding: "0",
            }}
        >
            {/* Columna Izquierda (Azul) */}
            <div
                style={{
                    flex: "1",
                    minWidth: "300px",
                    padding: "40px 100px",
                    backgroundColor: "#003366",
                    color: "white",
                    fontFamily: "Roboto, sans-serif",
                }}
            >
                <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>Misión</h2>
                <p style={{ fontSize: "1rem", lineHeight: "1.6", textAlign: "justify" }}>
                    Proporcionar a los estudiantes de la Escuela Superior de Cómputo (ESCOM) una herramienta
                    educativa confiable y académicamente respaldada, enfocada en la enseñanza del lenguaje de
                    programación C...
                </p>
                <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>
                    Visión
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: "1.6", textAlign: "justify" }}>
                    Ser reconocidos como la plataforma educativa más confiable y efectiva para el aprendizaje
                    de programación en C dentro de la comunidad académica...
                </p>
            </div>

            {/* Columna Derecha (Blanca) */}
            <div
                style={{
                    flex: "1",
                    minWidth: "300px",
                    padding: "30px 70px",
                    backgroundColor: "white",
                    fontFamily: "Roboto, sans-serif",
                }}
            >
                <h2 style={{fontSize: "3rem", fontWeight: "bold", marginBottom: "10px", color: "#003366"}}>
                    Valores
                </h2>
                <ul style={{paddingLeft: "20px", color: "gray"}}>
                    <li>
                        <strong>Confiabilidad:</strong> Ofrecemos contenido preciso y fundamentado por docentes
                        de la ESCOM.
                    </li>
                    <li>
                        <strong>Accesibilidad:</strong> Diseñamos una plataforma intuitiva y fácil de usar...
                    </li>
                    <li>
                        <strong>Identidad:</strong> Reforzamos el orgullo por pertenecer a la comunidad ESCOM...
                    </li>
                </ul>
                <h2 style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    marginTop: "20px",
                    marginBottom: "10px",
                    color: "#003366"
                }}>
                    Equipo
                </h2>
                <p style={{fontSize: "1rem", lineHeight: "1.6", color: "gray", textAlign: "justify"}}>
                    <strong>Docentes especializados:</strong> Profesores de la ESCOM desarrollan contenido
                    relevante y de calidad.
                </p>
                <p style={{fontSize: "1rem", lineHeight: "1.6", color: "gray", textAlign: "justify"}}>
                    <strong>Desarrolladores comprometidos:</strong> Diseñamos y mantenemos una plataforma moderna y
                    eficiente.
                </p>
                <p style={{fontSize: "1rem", lineHeight: "1.6", color: "gray", textAlign: "justify"}}>
                    <strong>Colaboradores estudiantiles:</strong> Estudiantes aportan ideas innovadoras y retroalimentación.
                </p>
            </div>
        </section>
    );
};

export default MissionVision;
