import React, { useState } from "react";
import "@fontsource/roboto"
import Header from "../components/HeaderLogin";
import Footer from "../components/footer"
import escom from "../Img/ESCOM.jpeg";
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";
import {useNavigate} from "react-router-dom";


const RegisterTeacher = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
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
                setFormData({  // Reiniciar el formulario después del registro
                    nombre: "",
                    apellidopaterno: "",
                    apellidomaterno: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    termsAccepted: false,
                });
                navigate("/login");
            } else {
                setErrorMessage(data.error || "Ocurrió un error en el registro");  // Muestra el mensaje de error
            }
        } catch (error) {
            setErrorMessage("Hubo un problema con el registro.");
            console.error(error);
        }
    };


    return (
        <div>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal message={InformationMessage} onClose={() => setInformationMessage("")} />
            <Header />
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
                <h2 style={{ fontFamily: "Roboto, sans-serif", marginBottom: "20px", fontWeight: "bold" }}>
                    Registro de docente
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Campo Nombre */}
                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                        <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Nombre(s)</label>
                        <div style={{ position: "relative" }}>
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
                    <div style={{ display: "flex", gap: "10px", marginBottom: "15px", textAlign: "left" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Apellido paterno</label>
                            <div style={{ position: "relative" }}>
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
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Apellido materno</label>
                            <div style={{ position: "relative" }}>
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
                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                        <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Correo Electrónico Institucional</label>
                        <div style={{ position: "relative" }}>
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
                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                        <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Contraseña</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type="password"
                                name="password"
                                placeholder="ejem:Martha.123"
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
                    <div style={{ marginBottom: "15px", textAlign: "left" }}>
                        <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Confirmar contraseña</label>
                        <div style={{ position: "relative" }}>
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
                        </div>
                    </div>

                    {/* Checkbox de términos */}
                    <div style={{ marginBottom: "15px" }}>
                        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                        <span style={{ fontSize: "0.9rem", marginLeft: "10px" }}>
              Aceptar <a href="/terms-and-conditions" style={{ color: "#003366" }}>Términos y condiciones</a>
            </span>
                    </div>

                    {/* Botón de registro */}
                    <button type="submit" disabled={!formData.termsAccepted} style={{ width: "100%", padding: "10px", backgroundColor: formData.termsAccepted ? "#003366" : "#aaa", color: "white", fontSize: "1rem", borderRadius: "20px" }}>
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default RegisterTeacher;
