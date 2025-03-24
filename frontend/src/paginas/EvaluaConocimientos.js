import React from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/EvaluaConocimientos.css";
import { FaArrowLeft } from "react-icons/fa";

const EvaluaConocimientos = () => {
    return (
        <div className="evalua-container">
            <Header />

            <div className="evalua-wrapper">
                <div className="sidebar-menu">
                    <button>Lista de videos</button>
                    <button className="active">Quiz</button>
                    <button>Practicar</button>
                    <button>Recursos</button>
                    <button className="rate-course">📌 Calificar curso</button>
                </div>

                <div className="quiz-section">
                    <div className="back-button">
                        <FaArrowLeft /> <span>Atrás</span>
                    </div>

                    <h1>Evalúa tus conocimientos</h1>
                    <p>01 - Introducción a la arquitectura de Von Newman</p>

                    <div className="quiz-card">
                        <h3>Formulario video 01</h3>

                        <div className="question">
                            <p><strong>1. ¿Qué es un apuntador en programación?</strong></p>
                            <label><input type="radio" name="q1" /> Una variable que almacena datos.</label>
                            <label><input type="radio" name="q1" /> Una variable que almacena la dirección de memoria de otro dato.</label>
                            <label><input type="radio" name="q1" /> Una función que organiza los datos en memoria.</label>
                            <label><input type="radio" name="q1" /> Un tipo de bucle que controla el flujo del programa.</label>
                        </div>

                        <div className="question">
                            <p><strong>2. ¿Cuál de las siguientes declaraciones define correctamente un apuntador en C?</strong></p>
                            <label><input type="radio" name="q2" /> int ptr*;</label>
                            <label><input type="radio" name="q2" /> int ptr();</label>
                            <label><input type="radio" name="q2" /> int &ptr;</label>
                            <label><input type="radio" name="q2" /> int *ptr;</label>
                        </div>

                        <div className="question">
                            <p><strong>3. ¿Qué significa int *ptr = NULL; en C?</strong></p>
                            <label><input type="radio" name="q3" /> ptr es un apuntador que apunta al valor 0.</label>
                            <label><input type="radio" name="q3" /> ptr es un apuntador que no apunta a ninguna dirección válida.</label>
                            <label><input type="radio" name="q3" /> ptr es una variable entera inicializada en 0.</label>
                            <label><input type="radio" name="q3" /> ptr es un tipo de función.</label>
                        </div>

                        <button className="submit-btn">Enviar</button>
                    </div>

                    <div className="quiz-navigation">
                        <button className="nav-btn">01</button>
                        <button className="nav-btn">02</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EvaluaConocimientos;
