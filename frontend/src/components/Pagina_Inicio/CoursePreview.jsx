import React, { useEffect, useState } from "react";
import "@fontsource/roboto";
import { useNavigate } from "react-router-dom";
import cursoImagen from "../../Img/curso.JPG";

const CoursePreview = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const ids = [3, 4, 12];

        Promise.all(
            ids.map(id =>
                fetch(`${API_URL}/get-course-detail/${id}/`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(() => null)
            )
        ).then(data => {
            const validCourses = data.filter(c => c !== null);
            setCourses(validCourses);
        });
    }, [API_URL]);

    const construirURLDrive = (idImagen) => {
        if (!idImagen) return cursoImagen;
        return `https://drive.google.com/thumbnail?id=${idImagen}&sz=w500`;
    };

    return (
        <section style={{ padding: "30px 20px" }}>
            <h2 style={{ fontFamily: "Roboto, sans-serif", fontSize: "1.8rem", textAlign: "center" }}>
                ¡Comienza con un curso!
            </h2>
            <p style={{ fontFamily: "Roboto, sans-serif", textAlign: "center", color: "gray" }}>
                Inicia sesión para poder ver más
            </p>
            <div className="d-flex justify-content-center" style={{ gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
                {courses.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => {
                            if (token && rol === "estudiante") {
                                navigate(`/inscribir-curso/${course.id}`);
                            } else {
                                navigate('/login');
                            }
                        }}
                        style={{
                            width: "300px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        <img src={construirURLDrive(course.image)} alt={course.title} className="course-image"
                             style={{
                                 width: "100%",
                                 height: "120px",
                                 objectFit: "cover",
                             }}/>
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
