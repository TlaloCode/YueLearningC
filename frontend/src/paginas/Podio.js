import React, { useEffect, useState } from "react";
import "../css/Podio.css";
import Header from "../components/Header";
import Footer from "../components/footer";
import { FaArrowLeft, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userPlaceholder from "../assets/default-user.jpg";

const Podio = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [miLugar, setMiLugar] = useState(null);

    useEffect(() => {
        const fetchPodio = async () => {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id");

            try {
                const response = await fetch("http://127.0.0.1:8000/api/podio/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data.top || []);
                    setMiLugar(data.mi_posicion || null);
                } else {
                    alert("Error al cargar el podio.");
                }
            } catch (error) {
                console.error("Error al obtener datos del podio:", error);
            }
        };

        fetchPodio();
    }, []);

    const top3 = usuarios.slice(0, 3);
    const posicionesRestantes = usuarios.slice(3, 10);

    return (
        <div className="podio-container">
            <Header/>
            <div className="podio-header" onClick={() => navigate(-1)}>
                <FaArrowLeft className="back-icon" />
                <span>Atrás</span>
            </div>

            <div className="podio-top3">
                <h2>¡Podio!</h2>
                <div className="podium-visual">
                    {top3.map((user, index) => (
                        <div key={index} className={`podium podium-${user.lugar || index + 1}`}>
                            <img src={user.imagen || userPlaceholder} alt={user.nombre} className="podium-img" />
                            <span className="username">{user.nombre}</span>
                            <div className="trofeo">
                                <FaTrophy /> <span>{index + 1}º</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="podio-resto">
                {miLugar && (
                    <div className="mi-lugar">
                        <img src={miLugar.imagen || userPlaceholder} alt="Tú" />
                        <p><strong>{miLugar.lugar}º lugar</strong></p>
                        <span>{miLugar.nombre}</span>
                    </div>
                )}

                <div className="tabla-posiciones">
                <h3>Posiciones</h3>
                    {posicionesRestantes.map((p, i) => (
                        <div className="fila" key={i}>
                            <img src={p.imagen || userPlaceholder} alt={p.nombre} />
                            <span>{p.nombre}</span>
                            <span className="lugar">{i + 4}º</span>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Podio;
