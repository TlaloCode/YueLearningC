import React, { useState } from "react";
import "../css/StudentProfile.css";
import userPlaceholder from "../assets/default-user.jpg";

const StudentProfile = () => {
    const [profile] = useState({
        username: "",
        institutionalEmail: "",
        password: ""
    });

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Mi Perfil</h2>
            </div>
            <div className="profile-content">
                <div className="profile-image">
                    <img src={userPlaceholder} alt="Foto de perfil" />
                    <button className="edit-photo">📷</button>
                </div>
                <div className="profile-info">
                    <h3>Datos Personales</h3>
                    <input type="text" placeholder="Nombre de usuario (nickname)" value={profile.username} />
                    <input type="email" placeholder="Correo Institucional" value={profile.institutionalEmail} />
                    <input type="password" placeholder="Contraseña" value={profile.password} />
                    <div className="profile-buttons">
                        <button className="btn-save">Actualizar</button>
                        <button className="btn-cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
