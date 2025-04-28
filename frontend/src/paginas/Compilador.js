import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/Compilador.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Compilador = () => {
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState(`#include <stdio.h>\n\nint main() {\n    printf("Hello World!");\n    return 0;\n}`);
    const [salida, setSalida] = useState("Hello World!");

    const ejecutarCodigo = () => {
        // Aquí deberías hacer una llamada a una API como Piston o JDoodle
        // Por ahora simulamos salida estática:
        setSalida("Hello World!"); // Luego podrías usar axios/fetch para conectarlo con un backend
    };

    return (
        <div className="compilador-container">
            <Header />

            <div className="compilador-content">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> <span>Atrás</span>
                </div>

                <h1 className="title">Practica lo que sabes</h1>

                <p className="descripcion">
                    1.- Escribe un programa en C que realice las siguientes operaciones usando apuntadores:
                </p>

                <ul className="lista-instrucciones">
                    <li> Crea un arreglo dinámico de enteros de tamaño n, donde n es ingresado por el usuario. </li>
                    <li> Llena el arreglo con valores consecutivos que comiencen desde 1. </li>
                    <li> Recorre el arreglo usando un apuntador e imprime cada elemento. </li>
                    <li> Encuentra el valor máximo en el arreglo utilizando únicamente apuntadores. </li>
                    <li> Libera la memoria asignada dinámicamente. </li>
                </ul>

                <div className="editor-section">
                    <textarea
                        className="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />

                    <div className="salida">
                        <pre>{salida}</pre>
                    </div>
                </div>

                <button className="btn-ejecutar" onClick={ejecutarCodigo}>
                    Ejecutar
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default Compilador;
