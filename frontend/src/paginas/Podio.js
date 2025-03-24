import React from "react";
import "../css/Podio.css";
import { FaArrowLeft, FaTrophy } from "react-icons/fa";

const Podio = () => {
    const top3 = [
        { usuario: "AndyLow", imagen: require("../assets/logo.jpg"), lugar: 2 },
        { usuario: "JeliFlores", imagen: require("../assets/logo.jpg"), lugar: 1 },
        { usuario: "Cat68", imagen: require("../assets/logo.jpg"), lugar: 3 },
    ];

    const posiciones = [
        { usuario: "DinosPPP", imagen: require("../assets/logo.jpg") },
        { usuario: "MattyDBZ", imagen: require("../assets/logo.jpg") },
        { usuario: "Yunus", imagen: require("../assets/logo.jpg") },
        { usuario: "Xavier16", imagen: require("../assets/logo.jpg") },
        { usuario: "UIGOGO", imagen: require("../assets/logo.jpg") },
        { usuario: "Randz13F", imagen: require("../assets/logo.jpg") },
        { usuario: "VanPAt", imagen: require("../assets/logo.jpg") },
    ];

    return (
        <div className="podio-container">
            <div className="podio-header">
                <FaArrowLeft className="back-icon" />
                <span>Atrás</span>
            </div>

            <div className="podio-top3">
                <h2>¡Podio!</h2>
                <div className="podium-visual">
                    {top3.map((user, index) => (
                        <div key={index} className={`podium podium-${user.lugar}`}>
                            <img src={user.imagen} alt={user.usuario} className="podium-img" />
                            <span className="username">{user.usuario}</span>
                            <div className="trofeo">
                                <FaTrophy /> <span>{user.lugar}º</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="podio-resto">
                <div className="mi-lugar">
                    <img src={require("../assets/logo.jpg")} alt="Tú" />
                    <p><strong>6º lugar</strong></p>
                </div>

                <div className="tabla-posiciones">
                    <h3>Posiciones</h3>
                    {posiciones.map((p, i) => (
                        <div className="fila" key={i}>
                            <img src={p.imagen} alt={p.usuario} />
                            <span>{p.usuario}</span>
                            <span className="lugar">{i + 4}º</span>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer-podio">
                <span>Ayuda</span>
                <span>© 2024 YUE, Inc.</span>
            </footer>
        </div>
    );
};

export default Podio;
