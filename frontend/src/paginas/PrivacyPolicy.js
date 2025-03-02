import React from "react";
import Header from "../components/HeaderLogin";
import Footer from "../components/footer";

const PrivacyPolicy = () => {
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
                marginTop: "80px" // Espacio para que el contenido no quede oculto bajo el Header
            }}>
                <h2>Política de Privacidad</h2>
                <p>Última actualización: 2024</p>
                <p>
                    En YUE-Learning C respetamos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
                </p>
                <h3>Recolección de Datos</h3>
                <p>
                    Los datos que recopilamos incluyen: nickname (estudiante), nombre completo (docente), correo electrónico y contraseña encriptada.<br />
                    También recolectamos datos de uso, como cursos inscritos y progreso en actividades.
                </p>
                <h3>Uso de Datos</h3>
                <p>
                    Los datos recopilados se utilizan para:<br />
                    - Gestionar tu cuenta y progreso académico.<br />
                    - Ofrecerte acceso a contenido.<br />
                    - Enviar notificaciones relevantes sobre tus cursos.
                </p>
                <h3>Compartición de Información</h3>
                <p>
                    No compartimos tu información personal con terceros, excepto cuando sea requerido por ley.
                </p>
                <h3>Derechos del Usuario</h3>
                <p>
                    Puedes solicitar acceso, corrección o eliminación de tus datos directamente en la aplicación web en “Perfil”.
                </p>
                <h3>Cambios en la Política</h3>
                <p>
                    Esta política puede actualizarse. Para más información, contáctanos en facebook como YUE-Learning C.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
