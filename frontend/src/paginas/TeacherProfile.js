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

const TeacherProfile = () => {
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
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");
    const [editFields, setEditFields] = useState({});

    const enableEdit = (fieldName) => {
        setEditFields({ ...editFields, [fieldName]: true });
    };

    const handleCancel = () => {
        setEditFields({}); // Deshabilita todos los campos
    };

    const handleNavigation = () => {
        navigate('/mis-cursos');
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
                        fotoPerfil: data.fotoPerfil || userImagePlaceholder,
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
    }, [] );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
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
            return;
        }
    };

    return (
        <>
            <Header />

            <div className="app-container">
                <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
                <InformationModal message={InformationMessage} onClose={() => setInformationMessage("")} />

                <div className="profile-container">
                    <h2 className="profile-title">Mi perfil</h2>

                    <div className="profile-content">
                        {/* Sección izquierda: Imagen y opciones */}
                        <div className="profile-sidebar">
                            <div className="top-section">
                                <div className="profile-picture">
                                    <img src={userImagePlaceholder} alt="Perfil" />
                                    <div className="edit-icon"><FaEdit /></div>
                                </div>
                                <h3>Todos mis cursos</h3>
                                <span
                                    role="img"
                                    aria-label="Cursos"
                                    className="course-icon"
                                    onClick={handleNavigation}
                                >
                🎓
              </span>
                            </div>

                            <div className="bottom-section">
                                <button className="delete-profile">
                                    <FaTrash /> Eliminar mi perfil
                                </button>
                            </div>
                        </div>

                        {/* Sección derecha: Datos personales */}
                        <div className="profile-form">
                            <h3 className="profile-section-title">Datos personales</h3>

                            {[
                                { label: "Nombre", name: "name" },
                                { label: "Apellido paterno", name: "lastName" },
                                { label: "Apellido materno", name: "middleName" },
                                { label: "Correo institucional", name: "institutionalEmail", type: "email", disabled: true },
                                { label: "Contraseña", name: "password", type: "password" },
                                { label: "Confirmar contraseña", name: "confirmPassword", type: "password" },
                                { label: "Correo alternativo", name: "alternateEmail", type: "email" },
                                { label: "Número de celular", name: "phone", type: "tel" },
                            ].map((field, index) => (
                                <div className="form-group" key={index}>
                                    <label>{field.label}</label>
                                    <div className="input-group">
                                        <input
                                            type={field.type || "text"}
                                            name={field.name}
                                            value={profile[field.name]}
                                            onChange={handleChange}
                                            placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                            disabled={field.disabled || !editFields[field.name]}
                                        />
                                        <button
                                            type="button"
                                            className="edit-btn"
                                            onClick={() => enableEdit(field.name)}
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Descripción */}
                            <div className="form-group">
                                <label>Descripción del perfil</label>
                                <div className="input-group">
                <textarea
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    placeholder="Escribe sobre ti..."
                    disabled={!editFields.description}
                />
                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() => enableEdit("description")}
                                    >
                                        ✏️
                                    </button>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="profile-buttons">
                                <button className="btn-save" onClick={handleSave}>Actualizar</button>
                                <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );



};

export default TeacherProfile;
