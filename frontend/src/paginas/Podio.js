import React from "react";
import "../css/Podio.css";
import Header from "../components/Header";
import Footer from "../components/footer";
import { MdArrowBack } from "react-icons/md"
import "@fontsource/poppins";

const Podio = () => {
    const top3 = [
        { nombre: "AndyLow", lugar: 2, color: "orange", imagen: "/images/andy.jpg" },
        { nombre: "JeliFlores", lugar: 1, color: "gold", imagen: "/images/jeli.jpg" },
        { nombre: "Cat68", lugar: 3, color: "gray", imagen: "/images/cat.jpg" },
    ];

    const posiciones = [
        { nombre: "DinosPPP", lugar: 4, imagen: "/images/p4.jpg" },
        { nombre: "MattyDBZ", lugar: 5, imagen: "/images/p5.jpg" },
        { nombre: "Yunus", lugar: 6, imagen: "/images/p6.jpg" },
        { nombre: "Xavier16", lugar: 7, imagen: "/images/p7.jpg" },
        { nombre: "UIGOGO", lugar: 8, imagen: "/images/p8.jpg" },
        { nombre: "Randz13F", lugar: 9, imagen: "/images/p9.jpg" },
        { nombre: "VanPAt", lugar: 10, imagen: "/images/p10.jpg" },
    ];

    return (
        <div className="podio-page">
            <Header />

            <div className="podio-container">
                <h2 className="titulo-podio">¡Podio!</h2>

                <div className="podio-top3">
                    {/* Segundo lugar */}
                    <div className="podio-celda celda-2">
                        <img src="/../assets/c-course.jpg" alt="AndyLow" className="avatar" />
                        <p className="nombre-top">AndyLow</p>
                        <div className="trofeo trofeo-orange">2º</div>
                    </div>

                    {/* Primer lugar */}
                    <div className="podio-celda celda-1">
                        <img src="/public/" alt="JeliFlores" className="avatar" />
                        <div className="cinta-oro">JeliFlores</div>
                        <div className="trofeo trofeo-gold">1º</div>
                    </div>

                    {/* Tercer lugar */}
                    <div className="podio-celda celda-3">
                        <img src="/images/cat.jpg" alt="Cat68" className="avatar" />
                        <p className="nombre-top">Cat68</p>
                        <div className="trofeo trofeo-gray">3º</div>
                    </div>
                </div>

                <div className="tabla-posiciones">
                    <div className="volver">
                        <MdArrowBack className="icono-volver" />
                        Atrás
                    </div>
                    <div className="usuario-lugar">
                        <img src="/images/p6.jpg" alt="Tu lugar" className="avatar" />
                        <p><strong>6° lugar</strong></p>
                    </div>
                    <div className="lista-posiciones">
                        <h3>Posiciones</h3>
                        {posiciones.map((u) => (
                            <div className="fila-posicion" key={u.nombre}>
                                <img src={u.imagen} alt={u.nombre} className="mini-avatar" />
                                <span>{u.nombre}</span>
                                <span className="puesto">{u.lugar}°</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Podio;
