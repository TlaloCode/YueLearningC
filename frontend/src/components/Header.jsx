import React from "react";

const Header = () => (
    <header className="navbar navbar-expand-lg bg-light px-3">
        <img src="img/logo.jpg" alt="Logo" style={{ width: 50, height: 50 }} />
        <h1 className="mx-3">YUE-Learning C</h1>
        <div className="ms-auto">
            <input
                type="text"
                placeholder="Ingresa el nombre del curso o del docente"
                className="form-control d-inline-block"
                style={{ width: "300px" }}
            />
            <span className="ms-3">
        <img
            src="default-profile.png"
            alt="Perfil"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      </span>
        </div>
    </header>
);

export default Header;
