import React, { useState } from "react";
import "../css/StudentProfile.css";
import userPlaceholder from "../assets/default-user.jpg";
import Header from "../components/Header";
import Footer from "../components/footer";

const StudentProfile = () => {
    const [profile] = useState({
        username: "hhhh",
        institutionalEmail: "hhhh",
        password: "hhhhh"
    });

    return (
        <div className="app-container"> {/* Contenedor principal para ajustar el layout */}
            <Header />
            <div className="profile-container">
                <h2 className="profile-title">Mi Perfil</h2>
                <div className="profile-content">
                    <div className="profile-left">
                        <div className="profile-image">
                            <img src={userPlaceholder} alt="Foto de perfil" />
                            <button className="edit-photo">📷</button>
                        </div>
                        <button className="delete-profile">🗑️ Eliminar mi perfil</button>
                        <div className="profile-courses">
                            <h3>Mis cursos</h3>
                            <span>🎓</span>
                        </div>
                    </div>
                    <div className="profile-right">
                        <h3>Datos Personales</h3>
                        <div className="input-group">
                            <label>Nombre de usuario (nickname)</label>
                            <input type="text" placeholder="Tu nombre de usuario" value={profile.username} readOnly />
                            <button className="edit-btn">✏️</button>
                        </div>
                        <div className="input-group">
                            <label>Correo institucional</label>
                            <input type="email" placeholder="Tu correo institucional" value={profile.institutionalEmail} readOnly />
                            <button className="edit-btn">✏️</button>
                        </div>
                        <div className="input-group">
                            <label>Contraseña</label>
                            <input type="password" placeholder="**********" value={profile.password} readOnly />
                            <button className="edit-btn">✏️</button>
                        </div>
                        <div className="profile-buttons">
                            <button className="btn-save">Actualizar</button>
                            <button className="btn-cancel">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentProfile;
