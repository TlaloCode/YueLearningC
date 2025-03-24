import React from "react";
import "@fontsource/roboto";
import escom from "../../Img/ESCOM.jpeg"

const MainContent = () => {
    return (
        <div
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "600px",
                position: "relative",
            }}
        >
            <img src={escom} alt="ESCOM" style={{width:'100%',height:'100%'}}/>
            <div
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "40%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 51, 102, 0.8)", // Fondo azul semitransparente
                    color: "white",
                    padding: "20px 30px",
                    borderRadius: "10px",
                    textAlign: "left",
                    fontFamily: "Roboto, sans-serif",
                }}
            >

                <h2 style={{margin: 10}}>
                    “Transforma el desafío en oportunidad con nuestra aplicación web”
                </h2>
            </div>
        </div>
    );
};

export default MainContent;
