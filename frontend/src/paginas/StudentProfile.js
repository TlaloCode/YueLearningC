import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/StudentProfile.css";
import "@fontsource/roboto"
import userPlaceholder from "../assets/default-user.jpg";
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";
import Footer from "../components/footer";
import Header from "../components/Header";

const StudentProfile = () => {
    const navigate = useNavigate();
    const [editFields, setEditFields] = useState({});
    const [profile, setProfile] = useState({
        username: localStorage.getItem("nombre"),
        institutionalEmail: localStorage.getItem("correo"),
        password: "",
        fotoPerfil: userPlaceholder
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");

    const handleRedirect = () => {
        navigate('/mis-cursos-estudiante');
    };

    const enableEdit = (fieldName) => {
        setEditFields({ ...editFields, [fieldName]: true });
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        const refresh_token = localStorage.getItem("refresh_token");

        if (!token || token.trim() === "") {
            alert("No tienes un token de autenticación. Inicia sesión.");
            return;
        }

        console.log("Token:", token);
        console.log("refresh token:", refresh_token);

        const fetchProfileData = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/get-user-profile/", {
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
                        fotoPerfil: data.fotoPerfil || userPlaceholder,
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

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const token = localStorage.getItem("token"); // Obtener el token

        if (!selectedFile) {
            alert("Selecciona una imagen primero.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/upload-profile-photo/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}` // Agregar token de autenticación
                },
                body: formData
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                setProfile(prevProfile => ({ ...prevProfile, fotoPerfil: data.fotoPerfil }));
                alert("Imagen subida correctamente");
            } else {
                alert(data.error || "Error al subir la imagen");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert("Error en la carga de imagen");
        }
    };


    const handleSave = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("http://127.0.0.1:8000/api/update-user-profile/", {
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
            return;
        }
    };

    return (
        <div>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal message={InformationMessage} onClose={() => setInformationMessage("")} />
            <div className="app-container"> {/* Contenedor principal para ajustar el layout */}
                <Header/>
                <div className="profile-container">
                    <h2 className="profile-title">Mi Perfil</h2>
                    <div className="profile-content">
                        <div className="profile-left">
                            <div className="profile-image">
                                <img src={userPlaceholder} alt="Foto de perfil"/>
                                <button className="edit-photo">📷</button>
                            </div>
                            <button className="delete-profile">🗑️ Eliminar mi perfil</button>
                            <div className="profile-courses" onClick={handleRedirect}>
                                <h3>Mis cursos</h3>
                                <span>🎓</span>
                            </div>
                        </div>
                        <div className="profile-right">
                            <h3>Datos Personales</h3>
                            <div className="input-group"
                                 style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     alignItems: "center",
                                     marginBottom: "15px",
                                     width: "100%",
                                 }}>
                                <label>Nombre de usuario (nickname)</label>
                                <input type="text" name="username"
                                       placeholder="Tu nombre de usuario" value={profile.username}
                                       onChange={handleChange}
                                       disabled={!editFields["username"]}
                                style={{
                                    width: "80%",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}/>
                                <button type="button" className="edit-btn"
                                        onClick={() => enableEdit("username")}
                                >✏️</button>
                            </div>
                            <div className="input-group"
                                 style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     alignItems: "center",
                                     marginBottom: "15px",
                                     width: "100%",
                                 }}>
                                <label>Correo institucional</label>
                                <input type="email" name="institutionalEmail"
                                       placeholder="Tu correo institucional" value={profile.institutionalEmail}
                                       onChange={handleChange} disabled
                                       style={{
                                           width: "80%",
                                           borderRadius: "10px",
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
                                <label>Contraseña</label>
                                <input type="password" name="password"
                                       placeholder="**********" value={profile.password} onChange={handleChange}
                                       disabled={!editFields["password"]}
                                       style={{
                                           width: "80%",
                                           borderRadius: "10px",
                                           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                       }}/>
                                <button className="edit-btn" onClick={() => enableEdit("password")}
                                >✏️</button>
                            </div>
                            <div className="profile-buttons">
                                <button className="btn-save" onClick={handleSave}>Actualizar</button>
                                <button className="btn-cancel">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
            );
            };

            export default StudentProfile;
