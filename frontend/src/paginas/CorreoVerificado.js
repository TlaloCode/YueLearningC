import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CorreoVerificado.css";
import correoImg from "../assets/correo-verificado.png";


const CorreoVerificado = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 10000); // redirige después de 5 segundos

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="verificacion-wrapper">
            <div className="verificacion-content">
                <div className="verificacion-texto">
                    <h1>¡Bien! Tu cuenta ha sido verificada en YUE-LearningC</h1>
                    <p>
                        Gracias a esto, hemos confirmado que eres tú quien se ha registrado
                        en nuestra plataforma y no un alien, un villano o cualquier criatura
                        terrestre.
                    </p>
                    <a href="/login" className="btn-listo">
                        Listo
                    </a>
                </div>
                <div className="verificacion-imagen">
                    <img src={correoImg} alt="Correo verificado" />
                </div>
            </div>
        </div>
    );
};

export default CorreoVerificado;
