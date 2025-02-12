import React from "react";
import "@fontsource/roboto";
import logo from "../Img/logo.JPG"
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);  // Referencia al menú
    const navigate = useNavigate();
    const handleNavigation = (role) => {
        if (role === "student") {
            navigate("/RegisterStudent");
        } else if (role === "teacher") {
            navigate("/RegisterTeacher");
        }
        setShowMenu(false);  // Oculta el menú después de seleccionar
    };

    const homeNavigation = () => {
        navigate('../home');
    };

    // Cierra el menú si se hace clic fuera de él
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
                backgroundColor: "#003366", // Azul del header
                color: "#fff",
                padding: "10px 20px",
                fontFamily: "Roboto, sans-serif",
            }}
        >
            <div className="d-flex align-items-center">
                <button
                    onClick={homeNavigation} // Redirige a login
                    style={{
                        background: "transparent",
                        border: "none",
                    }}
                >
                    <img src={logo} alt="Logo" style={{width: 50, height: 50, borderRadius: "50%"}}/>
                </button>
                <h1 className="mx-3 mb-0"
                    style={{fontSize: "2rem", fontFamily: "Roboto, sans-serif", fontWeight: "bold"}}>
                    YUE-Learning C
                </h1>
            </div>
            <div className="ms-auto d-flex align-items-center">
                <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "5%",
                    border: "none",
                    width: "200px",
                    marginRight: "15px"
                }}>
                    Registrarse
                </button>
                {showMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",  // Justo debajo del botón
                            width: "200px",
                            backgroundColor: "#FFF",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 10
                        }}>
                        <button
                            onClick={() => handleNavigation("student")}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                textAlign: "left"
                            }}>
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
                            }}>
                            Registrarse como Docente
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;