import React from "react";
import "@fontsource/roboto";
import logo from "../Img/logo.JPG"
import defaultLogo from "../Img/default-profile.png"

const Header = () => {
    return (
        <header
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#003366", // Azul del header
                color: "#fff",
                padding: "10px 20px",
                fontFamily: "Roboto, sans-serif",
            }}
        >
            <div className="d-flex align-items-center">
                <img src={logo} alt="Logo" style={{ width: 50, height: 50,borderRadius: "50%" }} />
                <h1 className="mx-3 mb-0" style={{ fontSize: "2rem", fontFamily: "Roboto, sans-serif", fontWeight: "bold" }}>
                    YUE-Learning C
                </h1>
            </div>
            <div className="ms-auto d-flex align-items-center">
                <input
                    type="text"
                    placeholder="Ingresa el nombre del curso o del docente"
                    className="form-control"
                    style={{
                        width: "400px",
                        marginRight: "15px",
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "600",
                    }}
                />
                <button
                    onClick={() => window.location.href = "/login"} // Redirige a login
                    style={{
                        background: "transparent",
                        border: "none",
                    }}
                >
                    <img
                        src={defaultLogo}
                        alt="Perfil"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
