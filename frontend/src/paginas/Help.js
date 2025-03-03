import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderLogin";
import Footer from "../components/footer";
import { IoArrowBack } from "react-icons/io5";


const Help = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <Header />
            <div style={{
                flex: 1,
                padding: "40px",
                maxWidth: "80%",
                margin: "auto",
                textAlign: "justify",
                overflowY: "auto",
                marginTop: "80px"
            }}>
                {/* Botón de regreso */}
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        background: "none",
                        border: "none",
                        color: "#1E3A8A",
                        fontSize: "18px",
                        cursor: "pointer",
                        marginBottom: "20px"
                    }}
                >
                    <IoArrowBack size={20} style={{ marginRight: "5px" }} />
                    Atrás
                </button>

                <h2><em>Ayuda</em></h2>

                <h3>Preguntas Frecuentes (FAQ)</h3>

                <h4>¿Cómo me registro en la aplicación?</h4>
                <p>
                    Dirígete a la pantalla de registro, llena los campos requeridos
                    (nickname (estudiante), nombre completo (docente), correo
                    electrónico institucional, contraseña) y acepta los términos y condiciones.
                </p>

                <h4>¿Cómo puedo recuperar mi contraseña?</h4>
                <p>
                    Ve a "Recuperar contraseña" que se encuentra en la página "Iniciar Sesión",
                    ingresa tu correo y recibirás tu contraseña al correo electrónico que registraste.
                </p>

                <h4>¿Cómo accedo a los cursos disponibles?</h4>
                <p>
                    Una vez registrado, ve al catálogo de cursos, selecciona uno o haz clic en "Inscribirse".
                </p>

                <h4>¿Cómo uso el editor de código?</h4>
                <p>
                    Una vez registrado, selecciona el módulo correspondiente y abre el editor
                    integrado para escribir y ejecutar tu código en C.
                </p>

                <h3>Guías Rápidas</h3>

                <h4>Inscripción en un curso:</h4>
                <ul>
                    <li>Ve al "Catálogo de cursos".</li>
                    <li>Haz clic en un curso y revisa la descripción.</li>
                    <li>Selecciona "Inscribirme" para acceder al contenido.</li>
                </ul>

                <h4>Realización de cuestionarios:</h4>
                <ul>
                    <li>Dentro de tu curso, ve a la sección de cuestionarios.</li>
                    <li>Responde las preguntas y envía tu evaluación.</li>
                    <li>Revisa tu retroalimentación al finalizar.</li>
                </ul>

                <h4>Contacto para Soporte</h4>
                <p>
                    Si necesitas ayuda adicional, contáctanos en Facebook como <a href="https://facebook.com/YUE-LearningC" target="_blank" rel="noopener noreferrer">YUE-Learning C</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Help;
