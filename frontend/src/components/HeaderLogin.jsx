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
                backgroundColor: "rgb(0, 51, 102)", // Azul del header
                color: "#fff",
                padding: "10px 20px",
                fontFamily: "Roboto, sans-serif",
                position:"fixed",
                width: "100%",
                zIndex: 1000,
                top: 0,
                left: 0,
                display: "flex"
            }}
        >
            <div className="d-flex align-items-center">
                <button
                    onClick={homeNavigation} // Redirige a la página principal
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
            <div className="ms-auto d-flex align-items-center" ref={menuRef}>
                <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                    backgroundColor: "#FFFFFF",
                    width: "200px",
                    borderRadius: "5px",
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
                            backgroundColor: "#c6c3c3",
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
