import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/Compilador.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SideBarMenu from "../components/SiderBarMenu";
import Editor from "@monaco-editor/react";

const Compilador = () => {
    const navigate = useNavigate();
    const [entrada, setEntrada] = useState("");
    const [codigo, setCodigo] = useState(`#include <stdio.h>


int main() {
    printf("Hola mundo desde C!");
    return 0;
}`);
    const [salida, setSalida] = useState("Presiona 'Ejecutar' para ver el resultado...");

    const ejecutarCodigo = async () => {
        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: "c",
                    version: "10.2.0",
                    files: [{ content: codigo }],
                    stdin: entrada
                })

            });

            const result = await response.json();
            if (result.run) {
                setSalida(result.run.output || "Sin salida");
            } else {
                setSalida("Error al ejecutar.");
            }
        } catch (error) {
            console.error("Error al ejecutar:", error);
            setSalida("Error de conexión.");
        }
    };

    return (
        <div className="compilador-container">
            <Header/>
            <div className="compilador-wrapper">
                <div className="sidebar-fija"><SideBarMenu/></div>
                <div className="compilador-content">
                    <div className="back-button" onClick={() => navigate(-1)}>
                        <FaArrowLeft/> <span>Atrás</span>
                    </div>

                    <h1 className="title">Practica lo que sabes</h1>

                    <p className="descripcion">
                        1.- Escribe un programa en C que realice las siguientes operaciones usando apuntadores:
                    </p>

                    <ul className="lista-instrucciones">
                        <li> Crea un arreglo dinámico de enteros de tamaño n, donde n es ingresado por el usuario.</li>
                        <li> Llena el arreglo con valores consecutivos que comiencen desde 1.</li>
                        <li> Recorre el arreglo usando un apuntador e imprime cada elemento.</li>
                        <li> Encuentra el valor máximo en el arreglo utilizando únicamente apuntadores.</li>
                        <li> Libera la memoria asignada dinámicamente.</li>
                    </ul>

                    <div className="editor-section">
                        <div className="codigo">
                            <Editor
                                height="100%"
                                defaultLanguage="c"
                                value={codigo}
                                onChange={(value) => setCodigo(value)}
                                theme="vs-dark"
                                options={{
                                    fontSize: 16,
                                    minimap: {enabled: false}
                                }}
                            />
                        </div>
                        <div className="salida">
                            <pre>{salida}</pre>
                        </div>
                    </div>
                    <div className="entrada-section">
                        <label htmlFor="entrada">Entrada (stdin):</label>
                        <textarea
                            id="entrada"
                            rows="4"
                            className="entrada"
                            value={entrada}
                            onChange={(e) => setEntrada(e.target.value)}
                            placeholder="Aquí puedes escribir lo que scanf leería, por ejemplo: 5 8"
                        />
                    </div>
                    <button className="btn-ejecutar" onClick={ejecutarCodigo}>
                        Ejecutar
                    </button>

                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Compilador;
