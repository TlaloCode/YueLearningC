import React from "react";
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children, rolesPermitidos }) => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
        return <Navigate to="/error-acceso" replace />;
    }

    return children;
};

export default RutaPrivada;
