import React from "react";
import "@fontsource/roboto";
import logo from "../Img/logo.JPG";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleNavigation = (role) => {
        if (role === "student") navigate("/RegisterStudent");
        else if (role === "teacher") navigate("/RegisterTeacher");
        setShowMenu(false);
    };

    const homeNavigation = () => {
        navigate("../home");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "rgb(0, 51, 102)",
                color: "#fff",
                padding: "6px 12px",
                fontFamily: "Roboto, sans-serif",
                position: "fixed",
                width: "100%",
                zIndex: 1000,
                top: 0,
                left: 0,
                display: "flex"
            }}
        >
            <div className="d-flex align-items-center">
                <button
                    onClick={homeNavigation}
                    style={{ background: "transparent", border: "none" }}
                >
                    <img src={logo} alt="Logo" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                </button>
                <h1 className="mx-2 mb-0" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    YUE-Learning C
                </h1>
            </div>

            <div className="ms-auto d-flex align-items-center" ref={menuRef}>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                        backgroundColor: "#FFFFFF",
                        width: "180px",
                        fontSize: "0.9rem",
                        padding: "6px 10px",
                        borderRadius: "5px",
                        marginRight: "10px",
                        fontWeight: "500",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Registrarse
                </button>

                {showMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            width: "180px",
                            backgroundColor: "#c6c3c3",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 10
                        }}
                    >
                        <button
                            onClick={() => handleNavigation("student")}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                textAlign: "left"
                            }}
                        >
                            Registrarse como Estudiante
                        </button>
                        <button
                            onClick={() => handleNavigation("teacher")}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                textAlign: "left"
                            }}
                        >
                            Registrarse como Docente
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
