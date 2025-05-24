import React, { useEffect, useState } from "react";
import "../css/VistaVideo.css";
import Header from "../components/Header";
import Footer from "../components/footer";
import SideBarMenu from "../components/SiderBarMenu";
import { MdArrowBack } from "react-icons/md"; // Importa el ícono
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const VideoDetalle = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { idVideo } = useParams();
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                console.log(idVideo);
                const response = await fetch(`${API_URL}/get-video-detail/${idVideo}/`);
                const data = await response.json();
                if (response.ok) {
                    setVideoData(data);
                } else {
                    console.error("Error al obtener video:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener video:", error);
            }
        };

        fetchVideoData();
    }, [idVideo,API_URL]);

    if (!videoData) {
        return <p>Cargando video...</p>;  // ⬅️ Mientras no hay datos, muestra loading
    }

    const videoUrl = `https://drive.google.com/file/d/${videoData.file_id}/preview`;



    return (
        <div className="video-page">
            <Header />

            <div className="video-container">
                <SideBarMenu/>
                <div className="video-header">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <MdArrowBack className="icon-back" />
                        Atrás
                    </button>

                </div>
                <h2 className="video-title">{videoData.titulo || "Sin título"}</h2>

                <div className="video-preview">
                    <iframe
                        src={videoUrl}
                        width="100%"
                        style={{maxWidth: "900px", height: "500px"}}
                        allow="autoplay"
                        allowFullScreen
                        title="Video player"
                    ></iframe>
                </div>

                <div className="video-info">
                    <h3>DESCRIPCIÓN</h3>
                    <p>
                        {videoData.descripcion || "Sin descripción"}
                    </p>
                    <p>
                        Link de libro digital recomendado: <br />
                        <a href="https://www.cimat.mx/~ciram/cpa/pointersC.pdf" target="_blank" rel="noopener noreferrer">
                            https://www.cimat.mx/~ciram/cpa/pointersC.pdf
                        </a>
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default VideoDetalle;