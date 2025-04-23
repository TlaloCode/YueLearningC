import React from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/RecursosApoyo.css";
import SideBarMenu from "../components/SiderBarMenu";
import { FaArrowLeft } from "react-icons/fa";

const RecursosApoyo = () => {
    const recursos = [
        { id: 1, nombre: "01- Introducción a la Arquitectura de Von Newman", tipo: "pdf" },
        { id: 2, nombre: "02- Estructura de un sistema de Von Newman", tipo: "word" },
        { id: 3, nombre: "02- Estructura de un sistema de Von Newman", tipo: "word" },
        { id: 4, nombre: "01- Introducción a la Arquitectura de Von Newman", tipo: "pdf" },
        { id: 5, nombre: "02- Estructura de un sistema de Von Newman", tipo: "pdf" },
        { id: 6, nombre: "02- Estructura de un sistema de Von Newman", tipo: "pdf" },
        { id: 7, nombre: "01- Introducción a la Arquitectura de Von Newman", tipo: "pdf" },
        { id: 8, nombre: "02- Estructura de un sistema de Von Newman", tipo: "pdf" },
    ];

    return (
        <div className="recursos-container">
            <Header />

            <div className="recursos-wrapper">
                <SideBarMenu/>

                <div className="recursos-content">
                    <div className="back-button">
                        <FaArrowLeft /> <span>Atrás</span>
                    </div>

                    <h1>Recursos de apoyo</h1>

                    <ul className="recursos-list">
                        {recursos.map((recurso) => (
                            <li key={recurso.id} className="recurso-item">
                                <img
                                    src={
                                        recurso.tipo === "pdf"
                                            ? require("../assets/logo.jpg")
                                            : require("../assets/logo.jpg")
                                    }
                                    alt={recurso.tipo}
                                    className="recurso-icon"
                                />
                                <span>{recurso.nombre}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RecursosApoyo;
