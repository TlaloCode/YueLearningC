import React, { useState } from "react";
import Header from "../components/HeaderLogin";
import Footer from "../components/footer"
import escom from "../Img/ESCOM.jpeg";
import tiburon1 from "../Img/Tiburón1.png"
import tiburon2 from "../Img/Tiburón2.png"
import aletas from "../Img/Aletas.png"
import aletas2 from "../Img/Aletas2.png"

const Login = () => {
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    return (
        <div>
            <Header/>
        <div
            style={{
                backgroundImage: `url(${escom})`, // Imagen de fondo
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Logo con espacio para animación */}
            <div
                className="relative flex justify-center items-center mb-6"
                style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {/* Aqui se es dónde irá el ícono del tiburón */}
                <img
                    src={isPasswordFocused ? tiburon2 : tiburon1}
                    alt="Tiburón"
                    style={{
                        width: "100%",
                        height: "120%",
                        borderRadius: "50%", // La imagen se redondea
                        objectFit: "cover", // Asegura que la imagen se ajuste al contenedor
                    }}
                />
                {isPasswordFocused && (
                    <img
                        src={aletas}
                        alt="Aleta de Tiburón"
                        className="position-absolute"
                        style={{
                            width: "7rem",
                            left: "-15%",
                            top: "7%",
                            objectFit: "cover", // Asegura que la imagen se ajuste al contenedor
                        }}
                    />
                )}
                {isPasswordFocused && (
                    <img
                        src={aletas2}
                        alt="Aleta de Tiburón"
                        className="position-absolute"
                        style={{
                            width: "7rem",
                            left: "58%",
                            top: "7%",
                            objectFit: "cover", // Asegura que la imagen se ajuste al contenedor
                        }}
                    />
                )}
            </div>

            {/* Formulario de inicio de sesión */}
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "30px 40px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                    textAlign: "center",
                }}
            >
                <h2 style={{ fontFamily: "Roboto, sans-serif", marginBottom: "20px" }}>
                    Iniciar Sesión
                </h2>
                <form>
                    <div style={{ marginBottom: "15px", position: "relative" }}>
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            style={{
                                width: "100%",
                                padding: "10px 10px 10px 40px",
                                borderRadius: "20px",
                                border: "1px solid #ccc",
                                outline: "none",
                                fontFamily: "Roboto, sans-serif",
                            }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "10px",
                                transform: "translateY(-50%)",
                                color: "#aaa",
                            }}
                        >
              <i className="fa fa-user"></i>
            </span>
                    </div>
                    <div style={{ marginBottom: "15px", position: "relative" }}>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            onFocus={() => setIsPasswordFocused(true)} // Cambia a Tiburón2
                            onBlur={() => setIsPasswordFocused(false)} // Cambia a Tiburón1
                            style={{
                                width: "100%",
                                padding: "10px 10px 10px 40px",
                                borderRadius: "20px",
                                border: "1px solid #ccc",
                                outline: "none",
                                fontFamily: "Roboto, sans-serif",
                            }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "10px",
                                transform: "translateY(-50%)",
                                color: "#aaa",
                            }}
                        >
              <i className="fa fa-lock"></i>
            </span>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "20px",
                            border: "none",
                            backgroundColor: "#003366",
                            color: "white",
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }}
                    >
                        Iniciar sesión
                    </button>
                </form>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                        fontSize: "0.9rem",
                        color: "#555",
                    }}
                >
                    <label>
                        <input type="checkbox" style={{ marginRight: "5px" }} />
                        Recordarme
                    </label>
                    <a href="/forgot-password" style={{ color: "#003366" }}>
                        Recuperar contraseña
                    </a>
                </div>
            </div>
        </div>
            <Footer/>
        </div>

    );
};
export default Login;
