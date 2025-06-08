import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaEye, FaEyeSlash, FaLock} from "react-icons/fa";
import Header from "../components/HeaderLogin";
import Footer from "../components/footer";
import escom from "../Img/ESCOM.jpeg";
import tiburon1 from "../Img/Tiburón1.png"
import tiburon2 from "../Img/Tiburón2.png"
import aletas from "../Img/Aletas.png"
import aletas2 from "../Img/Aletas2.png"
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";

const Login = () => {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({ correoelectronico: "", contrasena: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_URL}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                correoelectronico: formData.correoelectronico,
                contrasena: formData.contrasena,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.error || "Error al iniciar sesión");
            return;
        }
        setInformationMessage(data.message);
        // Guardar el token y tipo de usuario en el localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("refresh",data.refresh_token);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("correo", data.correo);
        localStorage.setItem("id", data.id);
        navigate("/home"); // Redirigir a la página principal
        localStorage.setItem("token", data.token);
        localStorage.setItem("refresh",data.refresh_token);
        localStorage.setItem("rol",data.rol);
    };
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    return (
        <div>
            <style>
                {`
      input[type="password"]::-ms-reveal,
      input[type="password"]::-ms-clear,
      input[type="password"]::-webkit-credentials-auto-fill-button,
      input[type="password"]::-webkit-input-decoration-container,
      input[type="password"]::-webkit-inner-spin-button,
      input[type="password"]::-webkit-clear-button {
        display: none !important;
      }

      input[type="password"]::-webkit-textfield-decoration-container {
        display: none !important;
      }
    `}
            </style>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")}/>
            <InformationModal message={InformationMessage} onClose={() => setInformationMessage("")}/>
            <Header/>
            <div
                style={{
                    backgroundImage: `url(${escom})`, // Imagen de fondo
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "150vh",
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
                    <h2 style={{fontFamily: "Roboto, sans-serif", marginBottom: "20px"}}>
                        Iniciar sesión
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{marginBottom: "15px", position: "relative"}}>
                            <input
                                type="email"
                                name="correoelectronico"
                                placeholder="Correo electrónico"
                                onChange={handleChange}
                                required
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
                        <div style={{marginBottom: "15px", position: "relative"}}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                name="contrasena"
                                onFocus={() => setIsPasswordFocused(true)} // Cambia a Tiburón2
                                onBlur={() => setIsPasswordFocused(false)} // Cambia a Tiburón1
                                onChange={handleChange}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px 40px 10px 40px", // Aumento padding para íconos
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
                            <FaLock/>
                        </span>
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    color: "#aaa",
                                    cursor: "pointer"
                                }}
                            >
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
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
                    <span
                        onClick={() => navigate("/forgot-password")}
                        style={{color: "#003366", cursor: "pointer", textDecoration: "underline"}}
                    >
                      Recuperar contraseña
                    </span>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
};
export default Login;
