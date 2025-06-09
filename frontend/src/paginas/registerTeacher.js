import React, { useState } from "react";
import "@fontsource/roboto";
import Header from "../components/HeaderLogin";
import Footer from "../components/footer";
import escom from "../Img/ESCOM.jpeg";
import ErrorModal from "../components/ErrorModal";
import InformationModal from "../components/InformationModal";
import {useNavigate} from "react-router-dom";
import {FaEye, FaEyeSlash, FaLock} from "react-icons/fa";


const RegisterTeacher = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        password: "",
        confirm_password: "",
        termsAccepted: false,
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");

    const validatePassword = (value) => {
        const requisitosCumplidos =
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value);

        if (!requisitosCumplidos) {
            return "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial.";
        }
        return "";
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "password") {
            const error = validatePassword(value);
            setPasswordError(error);
            if (formData.confirm_password && value !== formData.confirm_password) {
                setPasswordMatchError("Ambas contraseñas deben ser iguales");
            } else {
                setPasswordMatchError("");
            }
        }

        if (name === "confirm_password") {
            if (formData.password && formData.password !== value) {
                setPasswordMatchError("Ambas contraseñas deben ser iguales");
            } else {
                setPasswordMatchError("");
            }
        }

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordError || passwordMatchError) {
            setErrorMessage("Corrige los errores en el formulario antes de enviar.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register-user/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rol: "docente",
                    nombre: formData.firstName,
                    apellidopaterno: formData.lastName,
                    apellidomaterno: formData.middleName,
                    correoelectronico: formData.email,
                    contrasena: formData.password,
                    confirm_password: formData.confirm_password,
                    estatuscorreo: "No verificado",
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setInformationMessage("Docente registrado con éxito. Revisa tu correo de verificación");
                setFormData({
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    termsAccepted: false,
                });
                navigate("/login");
            } else {
                setErrorMessage(data.error || "Ocurrió un error en el registro");
            }
        } catch (error) {
            setErrorMessage("Hubo un problema con el registro.");
            console.error(error);
        }
    };

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
                    backgroundImage: `url(${escom}`, // Imagen de fondo
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "150vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* Contenedor del formulario */}
                <div
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        padding: "30px 40px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        width: "450px",
                        textAlign: "center",
                    }}
                >
                    <h2 style={{fontFamily: "Roboto, sans-serif", marginBottom: "20px", fontWeight: "bold"}}>
                        Registro de docente
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Campo Nombre */}
                        <div style={{marginBottom: "15px", textAlign: "left"}}>
                            <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Nombre(s)</label>
                            <div style={{position: "relative"}}>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
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
                        </div>

                        {/* Apellido Paterno y Apellido Materno en una sola línea */}
                        <div style={{display: "flex", gap: "10px", marginBottom: "15px", textAlign: "left"}}>
                            <div style={{flex: 1}}>
                                <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Apellido paterno</label>
                                <div style={{position: "relative"}}>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
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
                            </div>
                            <div style={{flex: 1}}>
                                <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Apellido materno</label>
                                <div style={{position: "relative"}}>
                                    <input
                                        type="text"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleChange}
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
                            </div>
                        </div>

                        {/* Campo Email */}
                        <div style={{marginBottom: "15px", textAlign: "left"}}>
                            <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Correo Electrónico
                                </label>
                            <div style={{position: "relative"}}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ejem: ejemplo@ipn.mx"
                                    value={formData.email}
                                    onChange={handleChange}
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
                <i className="fa fa-envelope"></i>
              </span>
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div style={{marginBottom: "15px", textAlign: "left"}}>
                            <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Contraseña</label>
                            <div style={{position: "relative", width: "100%"}}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Contraseña"
                                    style={{
                                        width: "100%",
                                        padding: "10px 40px 10px 40px",
                                        borderRadius: "20px",
                                        border: "1px solid #ccc",
                                        outline: "none",
                                        fontFamily: "Roboto, sans-serif",
                                    }}
                                />

                                {/* Ícono de candado a la izquierda */}
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

                                {/* Ícono para mostrar u ocultar contraseña a la derecha */}
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "#aaa",
                                    }}
                                >
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                              </span>
                            </div>
                        </div>

                        {/* Campo Confirmar Contraseña */}
                        <div style={{marginBottom: "15px", textAlign: "left"}}>
                            <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Confirmar contraseña</label>
                            <div style={{position: "relative", width: "100%"}}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    placeholder="Confirmar contraseña"
                                    style={{
                                        width: "100%",
                                        padding: "10px 40px 10px 40px",
                                        borderRadius: "20px",
                                        border: "1px solid #ccc",
                                        outline: "none",
                                        fontFamily: "Roboto, sans-serif",
                                    }}
                                />

                                {/* Candado */}
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

                                {/* Ojito */}
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "#aaa",
                                    }}
                                >
                            {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                          </span>
                            </div>
                        </div>

                        {/* Checkbox de términos */}
                        <div style={{marginBottom: "15px"}}>
                            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted}
                                   onChange={handleChange}/>
                            <span style={{fontSize: "0.9rem", marginLeft: "10px"}}>
              Aceptar <a href="/terms-and-conditions" style={{color: "#003366"}}>Términos y condiciones</a>
            </span>
                        </div>

                        {/* Botón de registro */}
                        <button type="submit" disabled={!formData.termsAccepted} style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: formData.termsAccepted ? "#003366" : "#aaa",
                            color: "white",
                            fontSize: "1rem",
                            borderRadius: "20px"
                        }}>
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default RegisterTeacher;
