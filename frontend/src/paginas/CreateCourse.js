import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/CreateCourse.css";
import { FaPlus, FaImage, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal"
import InformationModal from "../components/InformationModal";

const CreateCourse = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [InformationMessage, setInformationMessage] = useState("");

    const [course, setCourse] = useState({
        title: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            setCourse((prev) => ({
                ...prev,
                [name]: e.target.files[0],
            }));
        } else {
            setCourse((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token || token.trim() === "") {
            alert("No tienes un token de autenticación.");
            return;
        }

        const formData = new FormData();
        formData.append("nombrecurso", course.title);
        formData.append("descripcioncurso", course.description);

        if (course.image) {
            formData.append("imagen", course.image); // 'imagen' debe coincidir con el campo en el backend
        }

        try {
            const response = await fetch(`${API_URL}/create-course/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                alert("Curso creado con éxito.");
                navigate("/mis-cursos");
            } else {
                alert(data.error || "Error al crear el curso.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error de red.");
        }
    };
    return (
        <div>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
            <InformationModal message={InformationMessage} onClose={() => setInformationMessage("")} />
        <div className="app-container">
            <Header />

            <div className="course-container">
                <div className="course-header">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        <FaArrowLeft/>
                    </button>
                    <h2 className="course-title">Crear un nuevo curso</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="course-content" style={{display: "flex",textAlign: "center", justifyContent: "center"}}>
                        <div className="left-side">
                            <input
                                type="text"
                                name="title"
                                value={course.title}
                                onChange={handleChange}
                                placeholder="Título del curso"
                                className="input-title"
                                required
                            />

                            <label htmlFor="imageUpload" className="image-upload-label" >
                                {course.image ? (
                                    <img src={URL.createObjectURL(course.image)} alt="Vista previa"
                                         className="preview-image"/>
                                ) : (
                                    <FaImage className="upload-icon"/>
                                )}
                            </label>
                            <input type="file" id="imageUpload" name="image" onChange={handleChange} hidden/>

                            <textarea
                                name="description"
                                value={course.description}
                                onChange={handleChange}
                                placeholder="Descripción del curso, el profesor podrá agregar caracteres especiales o links"
                                className="input-description"
                                required
                            ></textarea>
                        </div>

                        <div className="right-side">
                            <div className="action-container">
                                <span>Agregar video</span>
                                <button type="button" className="btn-circle">
                                    <FaPlus/>
                                </button>
                            </div>
                            <div className="action-container">
                                <span>Agregar recurso de apoyo</span>
                                <button type="button" className="btn-circle">
                                    <FaPlus/>
                                </button>
                            </div>
                            <button type="submit" className="btn-create">
                                Crear
                            </button>
                        </div>
            </div>
                </form>
        </div>

    <Footer />
        </div>
        </div>
    );
};

export default CreateCourse;
