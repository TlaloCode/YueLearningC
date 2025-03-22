import React, { useState, useEffect } from "react";
import "../css/StudentProfile.css";
import userPlaceholder from "../assets/default-user.jpg";
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        username: localStorage.getItem("nombre"),
        institutionalEmail: localStorage.getItem("correo"),
        password: "",
        fotoPerfil: userPlaceholder
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");

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
        <div className="profile-container">
            <div className="profile-header">
                <h2>Mi Perfil</h2>
            </div>
            <div className="profile-content">
                <div className="profile-image" style={{ width: '500px' }}>
                    <img src={profile.fotoPerfil} alt="Foto de perfil"/>
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                    <button className="edit-photo" onClick={handleUpload}>📷 Subir</button>
                </div>
                <div className="profile-info">
                    <h3>Datos Personales</h3>
                    <label>Nombre de usuario (nickname)</label>
                    <input type="text" name="username" placeholder="Nombre de usuario (nickname)"
                           value={profile.username} onChange={handleChange}/>
                    <label>Correo institucional</label>
                    <input type="email" name="institutionalEmail" placeholder="Correo Institucional"
                           value={profile.institutionalEmail} onChange={handleChange} disabled/>
                    <label>Contraseña</label>
                    <input type="text" name="password" placeholder="**********"
                           value={profile.password} onChange={handleChange}/>
                    <div className="profile-buttons">
                        <button className="btn-save" onClick={handleSave}>Actualizar</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </div>
    );
};

export default StudentProfile;
