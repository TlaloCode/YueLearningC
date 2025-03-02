import { Link } from "react-router-dom";
import React from "react";
import "@fontsource/roboto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "@fontsource/roboto";



const Footer = () => {
    return (
        <footer
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 40px",
                backgroundColor: "#292828",
                color: "white",
                fontFamily: "Roboto, sans-serif",
            }}
        >
            {/* Izquierda: Contacto */}
            <div>
                <p style={{ marginBottom: "10px" }}>
                    <strong>Contáctanos:</strong>
                </p>
                <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FontAwesomeIcon icon={faWhatsapp} style={{ color: "white" }} /> 5527166934
                </p>
                <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FontAwesomeIcon icon={faFacebook} style={{ color: "white" }} />
                    <a
                        href="https://www.facebook.com/YUE-LearningC"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        YUE-Learning C
                    </a>
                </p>
            </div>

            {/* Derecha: Texto de copyright */}
            <div style={{ textAlign: "right" }}>
                <Link
                    to="/privacy-policy"
                    style={{ color: "white", marginRight: "10px", textDecoration: "none" }}
                >
                    Política de privacidad
                </Link>
                <Link
                    to="/terms-and-conditions"
                    style={{ color: "white", marginRight: "10px", textDecoration: "none" }}
                >
                    Términos y condiciones
                </Link>
                <Link
                    href="/help"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Ayuda
                </Link>
                <p style={{ marginTop: "10px" }}>&copy; 2024 YUE, Inc.</p>
            </div>
        </footer>
    );
};


export default Footer;
