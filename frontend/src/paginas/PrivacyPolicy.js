import React from "react";
import Header from "../components/Header";
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
                <h2>Política de privacidad</h2>
                <p>Última actualización: Mayo de 2024</p>
                <p>
                    En YUE-Learning C se respeta tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
                </p>
                <h3>Recolección de datos</h3>
                <p>
                    Los datos que recopilamos incluyen: Nombre de usuario (para estudiante), nombre completo (para docente), correo electrónico y contraseña encriptada.<br />
                    También recolectamos datos de uso, como cursos inscritos y progreso en actividades.
                </p>
                <h3>Uso de datos</h3>
                <p>
                    Los datos recopilados se utilizan para:<br />
                    - Gestionar tu cuenta y progreso académico.<br />
                    - Ofrecerte acceso a contenido.<br />
                </p>
                <h3>Distribución de información</h3>
                <p>
                    YUE-Learning C no comparte tu información personal con terceros, excepto cuando sea requerido por ley.
                </p>
                <h3>Derechos del usuario</h3>
                <p>
                    El usuario puede solicitar acceso, corrección o eliminación de tus datos directamente en la aplicación web en la sección “Perfil”.
                </p>
                <h3>Cambios en la política</h3>
                <p>
                    Esta política puede actualizarse. Para más información, favor de contactar al correo electrónico oficial: yuelearning2025a011@gmail.com o en redes sociales.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
