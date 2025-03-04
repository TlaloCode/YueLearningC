import React, {useState, useEffect} from "react";
import "@fontsource/roboto";
import logo from "../Img/logo.JPG"
import defaultLogo from "../Img/default-profile.png"
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Header = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null); // Estado para almacenar datos del usuario
    const [menuAbierto, setMenuAbierto] = useState(false); // Estado para el menú desplegable


    const handleNavigation = () => {
        if (usuario.tipo_usuario === "estudiante") {
            navigate('/perfil-estudiante');
        } else if (usuario.tipo_usuario === "docente") {
            navigate('/perfil-docente');
        }
    };

    const handleLogout = () => {
        // Eliminar los datos de sesión del localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        localStorage.removeItem("tipo_usuario");
        localStorage.removeItem("fotoPerfil");

        // Redirigir a la página de inicio de sesión
        navigate('/login');
    };


    const homeNavigation = () => {
        navigate('../home');
    };

    useEffect(() => {
        // Obtener datos del usuario desde localStorage
        const token = localStorage.getItem("token");
        const nickname = localStorage.getItem("nickname");
        const tipo_usuario = localStorage.getItem("tipo_usuario");
        const fotoPerfil = localStorage.getItem("fotoPerfil"); // Foto de perfil

        if (token) {
            setUsuario({
                nickname,
                tipo_usuario,
                fotoPerfil: fotoPerfil || defaultLogo, // Usa la foto de perfil si existe, de lo contrario, usa la predeterminada
            });
        }
    }, []);

    return (
        <header
            className="navbar navbar-expand-lg"
            style={{
                position: "fixed",
                width: "100%",
                zIndex: 1000,
                top: 0,
                left: 0,
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
                {usuario ? (
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setMenuAbierto(!menuAbierto)}
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
                        {/* Menú desplegable */}
                        {menuAbierto && (
                            <div style={{
                                position: "absolute",
                                right: 0,
                                top: "50px",
                                background: "#fff",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                width: "150px",
                                zIndex: 1001,
                                textAlign: "center"
                            }}>
                                <p style={{ margin: "10px 0", fontWeight: "bold" }}>{usuario.nickname}</p>
                                <button
                                    onClick={handleNavigation}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        border: "none",
                                        background: "none",
                                        padding: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Perfil
                                </button>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        border: "none",
                                        background: "#ff4d4d",
                                        color: "white",
                                        padding: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cerrar Sesión
                                </button>
            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={homeNavigation} // Redirige a login
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
                )}
            </div>
        </header>
    );
};

export default Header;
