import React from "react";
import logo from "../Img/logo.JPG"
import defaultLogo from "../Img/default-profile.png"
import "@fontsource/poppins"; // Importa Roboto

const Header = () => (
    <header className="navbar navbar-expand-lg" style={{ backgroundColor: "#003366",
        color: "#fff",
        padding: "10px 20px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold"}}>
        <img src={logo} alt="Logo" style={{ width: 50, height: 50, borderRadius: "50%"}} />
        <h1 className="mx-3">YUE-Learning C</h1>
        <div className="ms-auto">
            <input
                type="text"
                placeholder="Ingresa el nombre del curso o del docente"
                className="form-control d-inline-block"
                style={{
                    width: "400px", // Aumenta el tamaño de la barra
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "600",
                }}
            />
            <span className="ms-3">
        <img
            src={defaultLogo}
            alt="Perfil"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      </span>
        </div>
    </header>
);

export default Header;
