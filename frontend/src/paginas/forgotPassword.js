import React, {useState} from "react";
import Header from "../components/HeaderLogin";
import Footer from "../components/footer";
import escom from "../Img/ESCOM.jpeg";
import InformationModal from "../components/InformationModal";
import ErrorModal from "../components/ErrorModal";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const RecoverPassword = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInformationMessage("");
        setErrorMessage("");

        try {
            const response = await fetch(`${API_URL}/recuperar-contrasena/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo }),
            });

            const data = await response.json();

            if (response.ok) {
                setInformationMessage(data.message || "Correo enviado con éxito.");
                setCorreo("");
                navigate('/login');
            } else {
                setErrorMessage(data.error || "No se pudo enviar el correo.");
            }
        } catch (err) {
            setErrorMessage("Error de conexión. Intenta más tarde.");
            console.error(err);
        }
    };

    return (
        <div>
            <Header />
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal message={InformationMessage} onClose={() => setInformationMessage("")} />
            <div
                style={{
                    backgroundImage: `url(${escom})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
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
                        Recuperar contraseña
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "15px", position: "relative" }}>
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
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
                            Enviar enlace de recuperación
                        </button>
                    </form>
                    <div
                        style={{
                            marginTop: "15px",
                            fontSize: "0.9rem",
                            color: "#555",
                        }}
                    >
                        <a href="/login" style={{ color: "#003366" }}>
                            Volver al inicio de sesión
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RecoverPassword;
