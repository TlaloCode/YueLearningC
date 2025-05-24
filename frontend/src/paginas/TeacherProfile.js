import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/TeacherProfile.css";
import "@fontsource/roboto"
import userImagePlaceholder from "../assets/default-user.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../components/Header"; // Importa el header
import Footer from "../components/footer"; // Importa el footer
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";
import ConfirmationModal from "../components/ConfirmationModal";

const TeacherProfile = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        lastName: "",
        middleName: "",
        institutionalEmail: "",
        password: "",
        confirmPassword: "",
        alternateEmail: "",
        phone: "",
        description: "",
        fotoPerfil: "",
    });

    const [setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");
    const [editFields, setEditFields] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [setPendingDelete] = useState(false);

    const enableEdit = (fieldName) => {
        setEditFields({ ...editFields, [fieldName]: true });
    };

    const handleCancel = () => {
        setEditFields({}); // Deshabilita todos los campos
    };

    const handleNavigation = () => {
        navigate('/mis-cursos');
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

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (!file) return;

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const respuesta = await fetch(`${API_URL}/upload-profile-photo/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                setProfile((prev) => ({
                    ...prev,
                    fotoPerfil: data.fotoPerfil
                }));

                sessionStorage.setItem("cachedProfileImage", data.fotoPerfil);
                alert("Imagen actualizada correctamente");
                const fetchProfileImage = async () => {
                    const response = await fetch(`${API_URL}/profile-photo/`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const blob = await response.blob();
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            const base64data = reader.result;
                            setProfile(prev => ({
                                ...prev,
                                fotoPerfil: base64data
                            }));
                            sessionStorage.setItem("cachedProfileImage", base64data);
                        };

                        reader.readAsDataURL(blob);
                    }
                };

                await fetchProfileImage();
            } else {
                alert(data.error || "Error al subir la imagen");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert("Error en la carga de imagen");
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");

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
                    setProfile({
                        name: data.nombre,
                        password: data.contrasena,
                        confirmPassword: data.contrasena,
                        institutionalEmail: data.correoelectronico,
                        lastName: data.apellidopaterno,
                        middleName: data.apellidomaterno,
                        alternateEmail: data.correoalternativo,
                        phone: data.numerocelular,
                        description: data.descripcionperfil,
                        fotoPerfil: sessionStorage.getItem("cachedProfileImage") || userImagePlaceholder,
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
            const cachedImage = sessionStorage.getItem("cachedProfileImage");
            if (cachedImage) {
                console.log("Usando imagen desde cache");
                setProfile(prev => ({
                    ...prev,
                    fotoPerfil: cachedImage
                }));
                return;
            }

            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${API_URL}/profile-photo/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        const base64data = reader.result;
                        setProfile(prev => ({
                            ...prev,
                            fotoPerfil: base64data
                        }));
                        sessionStorage.setItem("cachedProfileImage", base64data);
                    };

                    reader.readAsDataURL(blob);
                } else {
                    console.error("No se pudo obtener la imagen de perfil");
                }
            } catch (error) {
                console.error("Error al obtener imagen:", error);
            }
        };


        fetchProfileData();
        fetchProfileImage();
    }, [] );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
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
                nombre: profile.name,
                password: profile.password,
                confirmPassword: profile.confirmPassword,
                apellidopaterno: profile.lastName,
                apellidomaterno: profile.middleName,
                correoalternativo: profile.alternateEmail,
                numerocelular: profile.phone,
                descripcionperfil: profile.description,
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
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal message={InformationMessage} onClose={() => setInformationMessage("")} />
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
            <div className="app-container" style={{backgroundColor: "rgba(0,51,102,0.3)"}}>
            <Header /> {/* Header fijo */}

            <div className="profile-container">
                <h2 className="profile-title">Mi Perfil</h2>

                <div className="profile-content">
                    {/* Sección izquierda: Imagen y opciones */}
                    <div className="profile-sidebar">
                        <div className="profile-picture">
                            <img
                                src={profile.fotoPerfil || userImagePlaceholder}
                                alt="Foto de perfil"
                                className="clickable-profile-image"
                                onClick={() => document.getElementById("teacherFileInput").click()}
                            />
                            <input
                                type="file"
                                id="teacherFileInput"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{display: "none"}}
                            />
                            <div className="edit-icon"><FaEdit /></div>
                        </div>
                        <h3>Todos mis cursos</h3>
                        <span role="img" aria-label="Cursos" className="course-icon" onClick={handleNavigation}>🎓</span>
                    </div>

                    {/* Sección derecha: Datos personales */}
                    <div className="profile-form">
                        <h3 className="profile-section-title" style={{fontFamily: "Roboto, sans-serif",}}>Datos Personales</h3>
                        {/* Campos de formulario */}
                        {[
                            {label: "Nombre", name: "name"},
                            {label: "Apellido paterno", name: "lastName"},
                            {label: "Apellido materno", name: "middleName"},
                            {label: "Correo electrónico institucional", name: "institutionalEmail", type: "email", disabled: true},
                            {label: "Contraseña", name: "password", type: "password"},
                            {label: "Confirmar contraseña", name: "confirmPassword", type: "password"},
                            {label: "Correo alternativo", name: "alternateEmail", type: "email"},
                            {label: "Número de celular", name: "phone", type: "tel"},
                        ].map((field, index) => (
                            <div className="form-group" key={index}>
                                <label>{field.label}</label>
                                <div className="input-group"
                                     style={{
                                         display: "flex",
                                         flexDirection: "row",
                                         alignItems: "center",
                                         marginBottom: "15px",
                                         width: "100%",
                                     }}>
                                    <input
                                        type={field.type || "text"}
                                        name={field.name}
                                        value={profile[field.name]}
                                        onChange={handleChange}
                                        placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                        disabled={field.name === "institutionalEmail" || !editFields[field.name]}
                                        style={{
                                            width: "70%",
                                            borderRadius: "20px",
                                            border: "1px solid #ccc",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            fontFamily: "Roboto, sans-serif",
                                        }}
                                    />
                                    <button type="button" className="edit-btn"
                                            onClick={() => enableEdit(field.name)}>✏️
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Descripción */}
                        <div className="form-group">
                            <label>Descripción del perfil</label>
                            <textarea
                                name="description"
                                value={profile.description}
                                onChange={handleChange}
                                placeholder="Escribe sobre ti..."
                                disabled={!editFields.description}
                            />
                            <button type="button" className="edit-btn" onClick={() => enableEdit("description")}>✏️
                            </button>
                        </div>

                        {/* Botones de acción */}
                        <div className="profile-buttons">
                            <button className="btn-save" onClick={handleSave}
                            style={
                                {
                                    backgroundColor: "#0077DD",
                            }
                            }>Actualizar</button>
                            <button className="btn-cancel" onClick={handleCancel}
                            style={
                                {
                                    backgroundColor: "#6c6c6c",
                                }
                            }>Cancelar</button>
                        </div>
                        <button className="delete-profile"
                                onClick={() => {
                                    setConfirmationMessage("¿Estás seguro de que deseas eliminar tu cuenta?");
                                    setPendingDelete(true);
                                }}
                                style={{
                                    marginTop: "80px",
                                }}><FaTrash/> Eliminar perfil</button>
                    </div>
                </div>
            </div>

            <Footer/> {/* Footer fijo */}
        </div>
        </div>
    );
};

export default TeacherProfile;
