import React, { useState, useEffect } from "react";
import "@fontsource/roboto";
import logo from "../Img/logo.JPG";
import defaultLogo from "../Img/default-profile.png";
import PantallaCarga from "../components/PantallaCarga";
import menuHamburguesa from "../assets/menuHamburguesa.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [menuLateralAbierto, setMenuLateralAbierto] = useState(false);
    const [menuPerfilAbierto, setMenuPerfilAbierto] = useState(false);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);

    const menuBtnStyle = {
        width: "100%",
        padding: "10px 12px",
        border: "none",
        background: "none",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "0.9rem",
        borderBottom: "1px solid #ddd"
    };

    const handleNavigation = () => {
        if (usuario.rol === "estudiante") navigate('/perfil-estudiante');
        else if (usuario.rol === "docente") navigate('/perfil-docente');
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.removeItem("cachedProfileImage");
        navigate('/login');
    };

    const homeNavigation = () => navigate('../home');
    const LoginNavigation = () => navigate('../login');

    useEffect(() => {
        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");
        const cachedImage = sessionStorage.getItem("cachedProfileImage");

        if (cachedImage) {
            setUsuario({ rol, fotoPerfil: cachedImage });
            setLoading(false);
            return;
        }

        const fetchProfileImage = async () => {
            try {
                const response = await fetch(`${API_URL}/profile-photo/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64data = reader.result;
                        sessionStorage.setItem("cachedProfileImage", base64data);
                        setUsuario({ rol, fotoPerfil: base64data });
                        setLoading(false);
                    };
                    reader.readAsDataURL(blob);
                } else {
                    if (token) {
                        setUsuario({ rol, fotoPerfil: defaultLogo });
                        setLoading(false);
                    }
                }
            } catch (error) {
                setLoading(false);
                console.error("Error al descargar imagen de perfil:", error);
            }
        };

        if (token) fetchProfileImage();
    }, [API_URL]);

    const handleMisCursos = () => {
        if (usuario?.rol === "estudiante") navigate("/mis-cursos-estudiante");
        else if (usuario?.rol === "docente") navigate("/mis-cursos");
    };

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setBusqueda(query);
        if (query.trim() === "") return setResultados([]);

        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");
        if (!token || rol !== "estudiante") return setResultados([]);

        try {
            const res = await fetch(`${API_URL}/buscar-cursos/?q=${encodeURIComponent(query)}`);
            if (res.ok) {
                const data = await res.json();
                setResultados(data);
            } else setResultados([]);
        } catch (err) {
            console.error("Error al buscar cursos:", err);
            setResultados([]);
        }
    };

    const handleCursoClick = (id) => {
        navigate(`/inscribir-curso/${id}`);
        setResultados([]);
        setBusqueda("");
    };

    return (
        <header
            className="navbar navbar-expand-lg"
            style={{
                position: "fixed",
                width: "100%",
                zIndex: 1000,
                top: 0,
                left: 0,
                backgroundColor: "#003366",
                color: "#fff",
                padding: "6px 12px",
                fontFamily: "Roboto, sans-serif",
            }}
        >
            <div className="d-flex align-items-center">
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => {
                            setMenuLateralAbierto(!menuLateralAbierto);
                            setMenuPerfilAbierto(false);
                        }}
                        style={{
                            background: "transparent",
                            border: "none",
                            marginRight: "12px",
                            padding: 0
                        }}
                    >
                        <img
                            src={menuHamburguesa}
                            alt="Menú"
                            style={{ width: 28, height: 28, cursor: "pointer" }}
                        />
                    </button>
                    {menuLateralAbierto && (
                        <div style={{
                            position: "absolute",
                            top: "40px",
                            left: 0,
                            background: "#fff",
                            color: "#000",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                            zIndex: 1001,
                            width: "170px",
                            fontWeight: "500"
                        }}>
                            <button style={menuBtnStyle} onClick={() => navigate("/diagnostico")}>Evaluación diagnóstica</button>
                            <button style={menuBtnStyle} onClick={handleMisCursos}>Mis cursos</button>
                            <button style={menuBtnStyle} onClick={() => navigate("/podio")}>Podio</button>
                        </div>
                    )}
                </div>

                <button onClick={homeNavigation} style={{ background: "transparent", border: "none" }}>
                    <img src={logo} alt="Logo" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                </button>
                <h1 className="mx-2 mb-0" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>YUE-Learning C</h1>
            </div>

            <div className="ms-auto d-flex align-items-center">
                <input
                    type="text"
                    placeholder="Buscar curso o docente"
                    value={busqueda}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{
                        width: "300px",
                        fontSize: "0.9rem",
                        marginRight: "12px",
                        fontWeight: "500",
                    }}
                />

                {resultados.length > 0 && (
                    <div style={{
                        position: "absolute",
                        top: "50px",
                        right: "210px",
                        width: "300px",
                        backgroundColor: "#fff",
                        color: "black",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        zIndex: 1002,
                        maxHeight: "250px",
                        overflowY: "auto",
                    }}>
                        {resultados.map((curso) => (
                            <div
                                key={curso.id}
                                onClick={() => handleCursoClick(curso.id)}
                                style={{
                                    padding: "10px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee"
                                }}
                            >
                                <strong>{curso.nombrecurso}</strong><br />
                                <small>{curso.nombre_docente}</small>
                            </div>
                        ))}
                    </div>
                )}

                {usuario ? (
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => {
                                setMenuPerfilAbierto(!menuPerfilAbierto);
                                setMenuLateralAbierto(false);
                            }}
                            style={{ background: "transparent", border: "none" }}
                        >
                            <img
                                src={usuario.fotoPerfil || defaultLogo}
                                alt="Perfil"
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                            />
                        </button>

                        {menuPerfilAbierto && (
                            <div style={{
                                position: "absolute",
                                right: 0,
                                top: "40px",
                                background: "#fff",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                width: "150px",
                                zIndex: 1001,
                                textAlign: "center"
                            }}>
                                <p style={{ margin: "10px 0", fontWeight: "bold" }}>{usuario.nickname}</p>
                                <button onClick={handleNavigation} style={menuBtnStyle}>Perfil</button>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        background: "#ff4d4d",
                                        color: "white",
                                        padding: "10px",
                                        cursor: "pointer",
                                        borderBottomLeftRadius: "10px",  // 👈 redondear esquina inferior izquierda
                                        borderBottomRightRadius: "10px"
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={LoginNavigation} style={{ background: "transparent", border: "none" }}>
                        <img
                            src={defaultLogo}
                            alt="Perfil"
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                        />
                    </button>
                )}
            </div>

            {loading && localStorage.getItem("token") && (
                <PantallaCarga mensaje="Cargando perfil..." />
            )}
        </header>
    );
};

export default Header;
