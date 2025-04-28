import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/RecursosApoyo.css";
import SideBarMenu from "../components/SiderBarMenu";
import { FaArrowLeft } from "react-icons/fa";
import {useParams} from "react-router-dom";

const RecursosApoyo = () => {
    const { courseId } = useParams(); // id del curso desde la URL
    const [recursos, setRecursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecursos = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token, usuario no autenticado");
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/get-course-resource/${courseId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setRecursos(data);
                } else {
                    console.error("Error al obtener recursos:", data.error);
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
            }
        };

        if (courseId) {  // Solo intenta si idCurso es válido
            fetchRecursos();
        }
    }, [courseId]);


    return (
        <div className="recursos-container">
            <Header />

            <div className="recursos-wrapper">
                <SideBarMenu/>

                <div className="recursos-content">
                    <div className="back-button"  onClick={() => navigate(-1)}>
                        <FaArrowLeft/> <span>Atrás</span>
                    </div>

                    <h1>Recursos de apoyo</h1>

                    <ul className="recursos-list">
                        {recursos.length > 0 ? (
                            recursos.map((recurso) => (
                                <li key={recurso.id} className="recurso-item">
                                    <a
                                        href={`https://drive.google.com/file/d/${recurso.recurso}/preview`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{color: 'inherit', textDecoration: 'none'}}
                                    >
                                        <img
                                            src={require("../assets/pdf.png")}
                                            alt="PDF"
                                            className="recurso-icon"
                                            style={{marginRight: "20px"}}
                                        />
                                        <span>{recurso.title}</span>
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p className="no-recursos-msg">Este curso aún no tiene recursos de apoyo.</p>
                        )}
                    </ul>

                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default RecursosApoyo;
