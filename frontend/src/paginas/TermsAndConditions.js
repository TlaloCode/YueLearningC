import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import HeaderLogout from "../components/HeaderLogin";
import Footer from "../components/footer";
import {IoArrowBack} from "react-icons/io5";

const TermsAndConditions = () => {
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
                marginTop: "80px" // Espacio para que no se oculte el contenido
            }}>
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
                    <IoArrowBack size={20} style={{marginRight: "5px"}}/>
                    Atrás
                </button>
                <h2>Términos y condiciones</h2>
                <p>
                    Bienvenido/a a YUE-Learning C, una aplicación web creada para fomentar la enseñanza del lenguaje de
                    programación C. Al utilizar nuestra página web, aceptas cumplir con los términos y condiciones aquí
                    descritos.
                </p>
                <h3>Registro y Uso de la aplicación web</h3>
                <p>
                    Para registrarse en la aplicación web, debe de proporcionar información real, como su correo
                    electrónico institucional y nombre de usuario.<br/>
                    Al registrarse, acepta que eres parte de la comunidad de la ESCOM o tiene interés académico en el
                    contenido ofrecido.<br/>
                    El usuario solo puede crear una cuenta por correo electrónico.<br/>
                    Es obligatorio aceptar estos términos al momento de registrarse.
                </p>
                <h3>Uso del contenido</h3>
                <p>
                    El contenido proporcionado (videos, cuestionarios, ejercicios prácticos, y más) es para uso
                    exclusivo en la enseñanza de programación.<br/>
                    Está prohibido copiar, distribuir o comercializar los materiales sin autorización.
                </p>
                <h3>Responsabilidades del usuario</h3>
                <p>
                    Debe mantener tu información de acceso segura y no compartirla con terceros.<br/>
                    No debe de realizar acciones que comprometan la integridad de la aplicación web, como intentar
                    acceder a áreas restringidas.<br/>
                    Debe hacer el registro evitando el uso de palabras antisonantes o vulgares.
                </p>
                <h3>Limitación de responsabilidad</h3>
                <p>
                    YUE-Learning C no se hace responsable de resultados académicos o laborales específicos ni del mal
                    uso de la misma aplicación web.
                </p>
                <h3>Cambios en los términos</h3>
                <p>
                    YUE-Learning C se reserva el derecho de actualizar los términos y condiciones establecidos en
                    cualquier momento por motivos legales u organizacionales. Se notificarán los cambios a través de la
                    aplicación web.<br/>
                    Si presentas dudas sobre estos términos, favor de contactarnos por redes sociales o por el correo
                    electrónico oficial: yuelearning2025a011@gmail.com.
                </p>
            </div>
            <Footer/>
        </div>
    );
};

export default TermsAndConditions;
