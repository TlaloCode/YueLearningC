import { Link } from "react-router-dom";
import React from "react";
import "@fontsource/roboto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
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
                {/* <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FontAwesomeIcon icon={faWhatsapp} style={{ color: "white" }} /> 5527166934
                </p>*/}
                <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FontAwesomeIcon icon={faFacebook} style={{ color: "white" }} />
                    <a
                        href="https://www.facebook.com/profile.php?id=61561107116721"
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
                    to="/help"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Ayuda
                </Link>
                <p style={{ marginTop: "10px" }}>2024-2025 YUE-Learning C.</p>
            </div>
        </footer>
    );
};


export default Footer;
