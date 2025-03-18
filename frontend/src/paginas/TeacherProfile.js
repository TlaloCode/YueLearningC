import React, { useState } from "react";
import "../css/TeacherProfile.css";
import userImagePlaceholder from "../assets/default-user.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../components/Header"; // Importa el header
import Footer from "../components/footer"; // Importa el footer

const TeacherProfile = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <div className="app-container">
            <Header /> {/* Header fijo */}

            <div className="profile-container">
                <h2 className="profile-title">Mi Perfil</h2>

                <div className="profile-content">
                    {/* Sección izquierda: Imagen y opciones */}
                    <div className="profile-sidebar">
                        <div className="profile-picture">
                            <img src={userImagePlaceholder} alt="Perfil" />
                            <div className="edit-icon"><FaEdit /></div>
                        </div>
                        <button className="delete-profile"><FaTrash /> Eliminar mi perfil</button>
                        <h3>Todos mis cursos</h3>
                        <span role="img" aria-label="Cursos" className="course-icon">🎓</span>
                    </div>

                    {/* Sección derecha: Datos personales */}
                    <div className="profile-form">
                        <h3 className="profile-section-title">Datos Personales</h3>

                        {/* Campos de formulario */}
                        {[
                            { label: "Nombre", name: "name" },
                            { label: "Apellido Paterno", name: "lastName" },
                            { label: "Apellido Materno", name: "middleName" },
                            { label: "Correo Institucional", name: "institutionalEmail", type: "email" },
                            { label: "Contraseña", name: "password", type: "password" },
                            { label: "Confirmar Contraseña", name: "confirmPassword", type: "password" },
                            { label: "Correo Alternativo", name: "alternateEmail", type: "email" },
                            { label: "Número de Celular", name: "phone", type: "tel" },
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
                                    />
                                    <button className="edit-btn">✏️</button>                                </div>
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
                            />
                            <button className="edit-btn">✏️</button>
                        </div>

                        {/* Botones de acción */}
                        <div className="profile-buttons">
                            <button className="btn-save">Actualizar</button>
                            <button className="btn-cancel">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer /> {/* Footer fijo */}
        </div>
    );
};

export default TeacherProfile;
