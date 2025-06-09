import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/StudentProfile.css";
import "@fontsource/roboto"
import userPlaceholder from "../assets/default-user.jpg";
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import PantallaCarga from "../components/PantallaCarga";
import Footer from "../components/footer";
import Header from "../components/Header";

const StudentProfile = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [editFields, setEditFields] = useState({});
    const [profile, setProfile] = useState({
        username: localStorage.getItem("nombre"),
        institutionalEmail: localStorage.getItem("correo"),
        password: "",
        fotoPerfil: "",
        preview: null
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [setPendingDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRedirect = () => {
        navigate('/mis-cursos-estudiante');
    };

    const enableEdit = (fieldName) => {
        setEditFields({ ...editFields, [fieldName]: true });
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (selectedFile) {
            console.log("Archivo seleccionado:", selectedFile.name);
        }

        if (!token || token.trim() === "") {
            alert("No tienes un token de autenticación. Inicia sesión.");
            return;
        }


        const fetchProfileData = async () => {
            const response = await fetch(`${API_URL}/get-user-profile/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });


            try {
                if (response.ok) {

                    const data = await response.json();
                    console.log("Datos recibidos:", data);

                    setProfile({
                        username: data.nickname,
                        password: data.contrasena,
                        institutionalEmail: data.correoelectronico,
                        fotoPerfil: sessionStorage.getItem("cachedProfileImage"),
                    });
                } else {
                    console.error("Error en la respuesta:", response.status, response.statusText);
                    alert("Error al cargar el perfil. Intenta nuevamente.");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("Error de conexión. Intenta nuevamente.");
            }
        };

        const fetchProfileImage = async () => {
            const token = localStorage.getItem("token");

            const cachedImage = sessionStorage.getItem("cachedProfileImage");
            if (cachedImage) {
                console.log("Usando imagen cacheada desde sessionStorage");

                setProfile(prev => ({
                    ...prev,
                    fotoPerfil: cachedImage
                }));
                return;
            }

            try {
                const response = await fetch(`${API_URL}/profile-photo/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    console.error("Error al obtener imagen:", response.status);
                    return;
                }

                const blob = await response.blob();
                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64data = reader.result;
                    console.log("Imagen en base64:", base64data);

                    setProfile(prev => ({
                        ...prev,
                        fotoPerfil: base64data
                    }));

                    sessionStorage.setItem("cachedProfileImage", base64data);
                };

                reader.readAsDataURL(blob); // CONVIERTE A BASE64

            } catch (error) {
                console.error("Error general al cargar imagen:", error);
            }
        };
        fetchProfileData();
        fetchProfileImage();
    }, [API_URL,selectedFile]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setProfile(prev => ({ ...prev, preview: previewURL }));

            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("file", file);

            try {
                setIsLoading(true);
                const respuesta = await fetch(`${API_URL}/upload-profile-photo/`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                });

                const data = await respuesta.json();

                if (respuesta.ok) {
                    setProfile(prev => ({
                        ...prev,
                        fotoPerfil: data.fotoPerfil,
                        preview: null
                    }));

                    sessionStorage.setItem("cachedProfileImage", data.fotoPerfil);
                    setIsLoading(false);
                    setInformationMessage("Imagen subida correctamente");
                } else {
                    setIsLoading(false);
                    setErrorMessage(data.error || "Error al subir la imagen");
                }
            } catch (error) {
                setIsLoading(false);
                setErrorMessage("Error al subir la imagen:");
            }
        }

    };

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/eliminar-cuenta/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Cuenta eliminada correctamente.");
                localStorage.clear();
                sessionStorage.clear();
                navigate("/login");
            } else {
                setErrorMessage(data.error || "Ocurrió un error al eliminar la cuenta.");
            }
        } catch (error) {
            console.error("Error al eliminar cuenta:", error);
            setErrorMessage("Error de conexión al intentar eliminar la cuenta.");
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/update-user-profile/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nickname: profile.username,
                contrasena: profile.password
            })
        });
        const data = await response.json();
        try {
            if(response.ok)
            {
                setInformationMessage(data.message);
            }else {
                setErrorMessage(data.error || "Ocurrió un error");
            }
        } catch (error) {
            setErrorMessage(data.error || "Ocurrió un error");
        }
    };

    return (
        <div>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")}/>
            <InformationModal
                message={InformationMessage}
                onClose={() => {
                    setInformationMessage("");
                    sessionStorage.removeItem("cachedProfileImage");
                    window.location.reload(); // Siempre recarga al cerrar
                }}
            />
            <ConfirmationModal
                message={confirmationMessage}
                onClose={() => {
                    setConfirmationMessage("");
                    setPendingDelete(false);
                }}
                onConfirm={() => {
                    setConfirmationMessage("");
                    handleDeleteAccount(); // función que eliminará la cuenta
                }}
            />
            {/* Contenedor principal para ajustar el layout */}
            <Header/>
            <div className="app-container" style={{backgroundColor: "rgba(0,51,102,0.3)"}}>
                <div className="profile-container">
                    <h2 className="profile-title">Mi perfil</h2>
                    <div className="profile-content">
                        <div className="profile-left">
                            <div className="profile-image">
                                <img src={sessionStorage.getItem("cachedProfileImage") || userPlaceholder}
                                     alt="Foto de perfil"
                                     className="clickable-profile-image"
                                     onClick={() => document.getElementById("fileInput").click()}
                                />
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{display: "none"}}
                                />

                            </div>
                            <div className="profile-courses" onClick={handleRedirect}>
                                <h3>Mis cursos</h3>
                                <span>🎓</span>
                            </div>
                        </div>
                        <div className="profile-right" style={{fontFamily: "Roboto, sans-serif"}}>
                            <h3>Datos personales</h3>
                            <br/>
                            <div className="input-group"
                                 style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     alignItems: "center",
                                     marginBottom: "15px",
                                     width: "100%",
                                     fontFamily: "Roboto, sans-serif"
                                 }}>
                                <label style={{width: '100%'}}>Nombre de usuario</label>
                                <br/>
                                <input type="text" name="username"
                                       placeholder="Tu nombre de usuario" value={profile.username}
                                       onChange={handleChange}
                                       disabled={!editFields["username"]}
                                       style={{
                                           width: "80%",
                                           borderRadius: "20px",
                                           border: "1px solid #ccc",
                                           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                       }}/>
                                <button type="button" className="edit-btn"
                                        onClick={() => enableEdit("username")}
                                >✏️
                                </button>
                            </div>
                            <div className="input-group"
                                 style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     alignItems: "center",
                                     marginBottom: "15px",
                                     width: "90%",
                                 }}>
                                <label style={{width: '100%'}}>Correo electrónico institucional</label>
                                <input type="email" name="institutionalEmail"
                                       placeholder="Tu correo electrónico institucional"
                                       value={profile.institutionalEmail}
                                       onChange={handleChange} disabled
                                       style={{
                                           width: "80%",
                                           borderRadius: "20px",
                                           border: "1px solid #ccc",
                                           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                       }}/>
                            </div>
                            <div className="input-group"
                                 style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     alignItems: "center",
                                     marginBottom: "15px",
                                     width: "100%",
                                 }}>
                                <label style={{width: '100%'}}>Contraseña</label>
                                <input type="password" name="password"
                                       placeholder="**********" value={profile.password} onChange={handleChange}
                                       disabled={!editFields["password"]}
                                       style={{
                                           width: "80%",
                                           borderRadius: "20px",
                                           border: "1px solid #ccc",
                                           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                       }}/>
                                <button className="edit-btn" onClick={() => enableEdit("password")}
                                >✏️
                                </button>
                            </div>
                            <div className="profile-buttons" style={{fontFamily: "Roboto, sans-serif"}}>
                                <button className="btn-save" onClick={handleSave}>Actualizar</button>
                                <button className="btn-cancel">Cancelar</button>
                            </div>
                            <button className="delete-profile"
                                    onClick={() => {
                                        setConfirmationMessage("¿Estás seguro de que deseas eliminar tu cuenta?");
                                        setPendingDelete(true);
                                    }}
                                    style={{
                                        marginTop: "80px",
                                    }}>🗑️ Eliminar perfil
                            </button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            {isLoading && <PantallaCarga mensaje="Subiendo imagen..." />}

        </div>
    );
};

export default StudentProfile;
