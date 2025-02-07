import React from "react";
import "@fontsource/roboto";
import cursoImagen from "../Img/curso.JPG"

const CoursePreview = () => {
    // Simulación de datos (se sustituirá por datos de la base de datos en el futuro)
    const courses = [
        {
            id: 1,
            image: cursoImagen,
            title: "Apuntadores",
            author: "Juárez Flores Jenifer Elizabeth",
        },
        {
            id: 2,
            image: cursoImagen,
            title: "Funciones Recursivas",
            author: "Gómez Molina Ulises",
        },
        {
            id: 3,
            image: cursoImagen,
            title: "Paso por Valor y Paso por Referencia",
            author: "Peralta Romero Aide Yunuen",
        },
    ];

    return (
        <section style={{ padding: "30px 20px" }}>
            <h2 style={{ fontFamily: "Roboto, sans-serif", fontSize: "1.8rem", textAlign: "center" }}>
                ¡Comienza con un curso!
            </h2>
            <p style={{ fontFamily: "Roboto, sans-serif", textAlign: "center", color: "gray" }}>
                Inicia sesión para poder ver más
            </p>
            <div className="d-flex justify-content-center" style={{ gap: "20px", marginTop: "20px" }}>
                {courses.map((course) => (
                    <div
                        key={course.id}
                        style={{
                            width: "300px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <img
                            src={course.image}
                            alt={course.title}
                            style={{
                                width: "100%",
                                height: "120px",
                                objectFit: "cover",
                            }}
                        />
                        <div style={{ padding: "20px" }}>
                            <h4 style={{ fontSize: "1.2rem", margin: "0 0 5px 0" }}>{course.title}</h4>
                            <p style={{ fontSize: "0.9rem", color: "gray", margin: 0 }}>{course.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoursePreview;
