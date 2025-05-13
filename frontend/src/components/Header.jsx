import React, {useState, useEffect} from "react";
import "@fontsource/roboto";
import logo from "../Img/logo.JPG"
import defaultLogo from "../Img/default-profile.png"
import menuHamburguesa from "../assets/menuHamburguesa.png"; // Asegúrate que esté en esa ruta
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Header = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null); // Estado para almacenar datos del usuario
    const [menuLateralAbierto, setMenuLateralAbierto] = useState(false);
    const [menuPerfilAbierto, setMenuPerfilAbierto] = useState(false);

    const menuBtnStyle = {
        width: "100%",
        padding: "12px 15px",
        border: "none",
        background: "none",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "1rem",
        borderBottom: "1px solid #ddd"
    };

    const handleNavigation = () => {
        const token = localStorage.getItem("token");
        if (usuario.rol === "estudiante") {
            navigate('/perfil-estudiante');
        } else if (usuario.rol === "docente") {
            navigate('/perfil-docente');
        }
    };

    const handleLogout = () => {
        // Eliminar los datos de sesión del localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("correo");
        localStorage.removeItem("rol");
        localStorage.removeItem("fotoPerfil");
        sessionStorage.removeItem("cachedProfileImage");

        // Redirigir a la página de inicio de sesión
        navigate('/login');
    };


    const homeNavigation = () => {
        navigate('../home');
    };

    const LoginNavigation = () => {
        navigate('../login');
    };

    useEffect(() => {
        // Obtener datos del usuario desde localStorage
        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");

        const cachedImage = sessionStorage.getItem("cachedProfileImage");

        if (cachedImage) {
            setUsuario({ rol, fotoPerfil: cachedImage });
            return;
        }

        // Si no está en caché, descargarla
        const fetchProfileImage = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/profile-photo/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        const base64data = reader.result;
                        sessionStorage.setItem("cachedProfileImage", base64data);
                        setUsuario({ rol, fotoPerfil: base64data });
                    };

                    reader.readAsDataURL(blob);
                }
                else{
                    if(token)
                    {
                        setUsuario({
                            rol,
                            fotoPerfil:defaultLogo, // Usa la foto de perfil si existe, de lo contrario, usa la predeterminada
                        });
                    }
                }
            } catch (error) {
                console.error("Error al descargar imagen de perfil:", error);
            }
        };

        if (token) {
            fetchProfileImage();
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
                {/* 🔻 MENÚ HAMBURGUESA */}
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => {
                            setMenuLateralAbierto(!menuLateralAbierto);
                            setMenuPerfilAbierto(false); // Cierra el otro menú
                        }}
                        style={{
                            background: "transparent",
                            border: "none",
                            marginRight: "15px",
                            padding: 0
                        }}
                    >
                        <img
                            src={menuHamburguesa}
                            alt="Menú"
                            style={{ width: 35, height: 35, cursor: "pointer" }}
                        />
                    </button>

                    {/* 🔽 Menú lateral */}
                    {menuLateralAbierto  && (
                        <div style={{
                            position: "absolute",
                            top: "50px",
                            left: 0,
                            background: "#fff",
                            color: "#000",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                            zIndex: 1001,
                            width: "180px",
                            fontWeight: "500"
                        }}>
                            <button
                                style={menuBtnStyle}
                                onClick={() => navigate("/diagnostico")}
                            >
                                Evaluación diagnóstica
                            </button>
                            <button
                                style={menuBtnStyle}
                                onClick={() => navigate("/mis-cursos-estudiante")}
                            >
                                Mis cursos
                            </button>
                            <button
                                style={menuBtnStyle}
                                onClick={() => navigate("/podio")}
                            >
                                Podio
                            </button>
                        </div>
                    )}
                </div>
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
                            onClick={() => {
                                setMenuPerfilAbierto(!menuPerfilAbierto);
                                setMenuLateralAbierto(false); // Cierra el otro menú
                            }}
                            style={{
                                background: "transparent",
                                border: "none",
                            }}
                        >
                            <img
                                src={usuario.fotoPerfil || defaultLogo}
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
                        {menuPerfilAbierto  && (
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
                                    Cerrar sesión
                                </button>
            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={LoginNavigation} // Redirige a login
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
