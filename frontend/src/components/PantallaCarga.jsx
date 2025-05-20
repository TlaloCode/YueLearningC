import React from "react";
import "../css/PantallaCarga.css";
import sharkE from "../Img/Imagen1.png";

const PantallaCarga = ({ mensaje = "Cargando..." }) => {
    return (
        <div className="pantalla-carga-overlay">
            <img src={sharkE} alt="Cargando" className="pantalla-carga-icono" />
            <p className="pantalla-carga-texto">{mensaje}</p>
        </div>
    );
};

export default PantallaCarga;
