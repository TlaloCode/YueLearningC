import React from "react";
import "@fontsource/roboto";

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
                <img src="logo.png" alt="Logo" style={{ width: 50, height: 50 }} />
                <h1 className="mx-3 mb-0" style={{ fontSize: "1.5rem" }}>
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
                        src="default-profile.png"
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
