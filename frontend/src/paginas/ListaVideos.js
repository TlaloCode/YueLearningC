import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/ListaVideos.css";
import { useParams } from "react-router-dom";
import placeholder from "../assets/c-course.jpg";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import SideBarMenu from "../components/SiderBarMenu";

const ListaVideos = () => {
    const { courseId } = useParams();  // Obtener el courseId de la URL
    const [videos, setVideos] = useState([]);
    const [courseName, setCourseName] = useState(""); // ✅ Nombre del curso
    const [courseAuthor, setCourseAuthor] = useState(""); // ✅ Nombre del curso
    const navigate = useNavigate();


    useEffect(() => {
        const fetchVideos = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`http://127.0.0.1:8000/api/get-videos/${courseId}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setVideos(data);
            } else {
                console.error("Error al obtener los videos");
            }
        };

        const fetchCourseName = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:8000/api/get-course-details/${courseId}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCourseName(data.title);
                setCourseAuthor(data.author);
            } else {
                console.error("Error al obtener el nombre del curso");
            }
        };

        fetchVideos();
        fetchCourseName();
    }, [courseId]);

    return (
        <div className="lista-videos-container">
            <Header />

            <div className="content-wrapper">
                <SideBarMenu/>
                <div className="video-section">
                    <div className="back-button" style={{marginBottom: "20px", marginLeft: "10px"}}
                         onClick={() => navigate(-1)}>
                        <FaArrowLeft/> <span>Atrás</span>
                    </div>
                    <div className="video-header">
                        <br/>

                        <div className="video-title-rating">
                            <div>
                                <h1>{courseName || "Curso"}</h1>
                                <p>{courseAuthor || "Sin autor"}</p>
                            </div>
                            <div className="stars-rating">
                                <FaStar className="star"/>
                                <FaStar className="star"/>
                                <FaStar className="star"/>
                                <FaStar className="star"/>
                                <FaStar className="star gray"/>
                                <span className="rating">4.0</span>
                            </div>
                        </div>
                    </div>

                    <div className="video-list">
                        {videos.length > 0 ? (
                            videos.map((video) => (
                                <div key={video.id} className="video-card"
                                     onClick={() => navigate(`/vista-video/${courseId}/${video.id}`)}
                                     style={{ cursor: "pointer" }}>
                                    <img src={video.image || placeholder} alt={video.title}/>
                                    <div className="video-info">
                                        <h3>{video.title}</h3>
                                        <p>{video.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-videos-msg">Este curso aún no tiene videos.</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ListaVideos;
