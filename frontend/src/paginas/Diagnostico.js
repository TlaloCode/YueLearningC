import React from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/Diagnostico.css";
import { FaArrowLeft } from "react-icons/fa";

const Diagnostico = () => {
    return (
        <div className="diagnostico-container">
            <Header />

            <div className="diagnostico-content">
                <div className="back-button">
                    <FaArrowLeft /> <span>Atrás</span>
                </div>

                <h1 className="main-title">Veamos como vienes</h1>
                <p className="subtitle">
                    Evalúa los conocimientos con los que llegas, en el transcurso podrás comparar cuánto has avanzado.
                    No te preocupes si no sales muy bien, vamos paso a paso, pero sé constante.
                </p>

                <div className="diagnostico-card">
                    <h3>Diagnóstico</h3>

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
            </div>

            <Footer />
        </div>
    );
};

export default Diagnostico;
