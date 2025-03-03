import React, { useState } from "react";
import "../css/TeacherProfile.css";
import userImagePlaceholder from "../assets/default-user.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
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
        <div className="profile-container">
            <header className="profile-header">
                <h2 className="profile-title">YUE-Learning C</h2>
                <div className="profile-avatar">
                    <img src={userImagePlaceholder} alt="Usuario" />
                </div>
            </header>

            <div className="profile-content">
                <div className="profile-sidebar">
                    <div className="profile-picture">
                        <img src={userImagePlaceholder} alt="Perfil" />
                        <div className="edit-icon"><FaEdit /></div>
                    </div>
                    <button className="delete-profile"><FaTrash /> Eliminar mi perfil</button>
                    <h3>Todos mis cursos</h3>
                    <span role="img" aria-label="Cursos">🎓</span>
                </div>

                <div className="profile-form">
                    <h2>Mi Perfil</h2>

                    {/** Campos de formulario */}
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
                                <FaEdit className="edit-icon" />
                            </div>
                        </div>
                    ))}

                    <div className="form-group">
                        <label>Descripción del perfil</label>
                        <textarea
                            name="description"
                            value={profile.description}
                            onChange={handleChange}
                            placeholder="Escribe sobre ti..."
                        />
                    </div>

                    <div className="profile-buttons">
                        <button className="update-btn">Actualizar</button>
                        <button className="cancel-btn">Cancelar</button>
                    </div>
                </div>
            </div>

            <footer className="profile-footer">
                <a href="/ayuda">Ayuda</a>
                <span>© 2024 YUE, Inc.</span>
            </footer>
        </div>
    );
};

export default TeacherProfile;
