import React from "react";
import Header from "../components/HeaderLogin";
import Footer from "../components/footer";

const TermsAndConditions = () => {
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
                marginTop: "80px" // Espacio para que no se oculte el contenido
            }}>
                <h2>Términos y Condiciones</h2>
                <p>
                    Bienvenido/a a YUE-Learning C, una aplicación web creada para apoyar la enseñanza del lenguaje de programación C. Al utilizar nuestra página web, aceptas cumplir con los términos y condiciones aquí descritos.
                </p>
                <h3>Registro y Uso de la Aplicación Web</h3>
                <p>
                    Para registrarte en la aplicación web, debes proporcionar información real, como tu correo electrónico institucional y nombre de usuario.<br />
                    Al registrarte, aceptas que eres parte de la comunidad de la ESCOM o tienes interés académico en el contenido ofrecido.<br />
                    Solo puedes crear una cuenta por correo electrónico.<br />
                    Es obligatorio aceptar estos términos al momento de registrarse.
                </p>
                <h3>Uso del Contenido</h3>
                <p>
                    El contenido proporcionado (videos, cuestionarios, ejercicios prácticos, y más) es para uso exclusivo en la enseñanza de programación.<br />
                    Está prohibido copiar, distribuir o comercializar los materiales sin autorización.
                </p>
                <h3>Responsabilidades del Usuario</h3>
                <p>
                    Debes mantener tu información de acceso segura y no compartirla con terceros.<br />
                    No debes realizar acciones que comprometan la integridad del sistema, como intentar acceder a áreas restringidas.<br />
                    Debes hacer el registro con respeto (no usar palabras obsenas).
                </p>
                <h3>Limitación de Responsabilidad</h3>
                <p>
                    YUE-Learning C no se hace responsable de resultados académicos o laborales específicos ni del mal uso de la misma aplicación web.
                </p>
                <h3>Cambios en los Términos</h3>
                <p>
                    Nos reservamos el derecho de actualizar estos términos en cualquier momento. Notificaremos los cambios a través de la aplicación web.<br />
                    Si tienes dudas sobre estos términos, contáctanos en facebook como YUE-Learning C.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
