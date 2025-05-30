import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto"
import Header from "../components/HeaderLogin";
import Footer from "../components/footer"
import escom from "../Img/ESCOM.jpeg";
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";

const RegisterStudent = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    // Definimos el estado para los datos del formulario
    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        password: "",
        confirm_password: "",
        termsAccepted: false,
    });

    const [errorMessage, setErrorMessage] = useState("");  // Estado para el mensaje de error
    const [InformationMessage, setInformationMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/register-user/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rol: "estudiante",
                    nickname: formData.nickname,
                    correoelectronico: formData.email,
                    contrasena: formData.password,
                    confirm_password: formData.confirm_password,
                    estatuscorreo: "No verificado",

                }),
            });

            const data = await response.json();


            if (response.ok) {
                setInformationMessage(data.message);
                setFormData({  // Reiniciar el formulario después del registro
                    nickname: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    termsAccepted: false,
                });
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
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal message={InformationMessage} onClose={() => {
                setInformationMessage("");
                if (InformationMessage === "Usuario registrado con éxito. Verifica tu correo.") {
                    navigate(`/login`);
                }else {
                    navigate(`/home`);
                }
            }} />
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
                        Registro de estudiante
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Campo Nickname */}
                        <div style={{marginBottom: "15px", textAlign: "left"}}>
                            <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Nombre de usuario</label>
                            <div style={{position: "relative"}}>
                                <input
                                    type="text"
                                    name="nickname"
                                    placeholder="ejem: Ju4n P3rez"
                                    value={formData.nickname}
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

                        {/* Campo Email */}
                        <div style={{marginBottom: "15px", textAlign: "left"}}>
                            <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Correo Electrónico
                                Institucional</label>
                            <div style={{position: "relative"}}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ejem: alumno@ipn.mx"
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
                            <div style={{position: "relative"}}>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
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
                <i className="fa fa-lock"></i>
              </span>
                            </div>
                        </div>

                        {/* Campo Confirmar Contraseña */}
                        <div style={{marginBottom: "15px", textAlign: "left"}}>
                            <label style={{fontSize: "0.9rem", fontWeight: "bold"}}>Confirmar contraseña</label>
                            <div style={{position: "relative"}}>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
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
                <i className="fa fa-lock"></i>
              </span>
                            </div>
                        </div>

                        {/* Checkbox de términos */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "15px",
                            }}
                        >
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                style={{marginRight: "10px"}}
                            />
                            <span style={{fontSize: "0.9rem"}}>
              Aceptar{" "}
                                <a href="/terms-and-conditions" style={{color: "#003366"}}>
                Términos y condiciones
              </a>
            </span>
                        </div>

                        {/* Botón de registro */}
                        <button
                            type="submit"
                            disabled={!formData.termsAccepted}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "20px",
                                border: "none",
                                backgroundColor: formData.termsAccepted ? "#003366" : "#aaa",
                                color: "white",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "1rem",
                                cursor: formData.termsAccepted ? "pointer" : "not-allowed",
                            }}
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default RegisterStudent;
