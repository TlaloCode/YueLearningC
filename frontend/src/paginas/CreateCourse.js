import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/CreateCourse.css";
import { FaPlus, FaImage, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
    const navigate = useNavigate();
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



    return (
        <div className="app-container">
            <Header />

            <div className="course-container">
                <div className="course-header">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </button>
                    <h2 className="course-title">Título del curso</h2>
                </div>

                <div className="course-content">
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

                        <label htmlFor="imageUpload" className="image-upload-label">
                            {course.image ? (
                                <img src={URL.createObjectURL(course.image)} alt="Vista previa" className="preview-image" />
                            ) : (
                                <FaImage className="upload-icon" />
                            )}
                        </label>
                        <input type="file" id="imageUpload" name="image" onChange={handleChange} hidden />

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
                                <FaPlus />
                            </button>
                        </div>
                        <div className="action-container">
                            <span>Agregar recurso de apoyo</span>
                            <button type="button" className="btn-circle">
                                <FaPlus />
                            </button>
                        </div>
                        <button type="submit" className="btn-create">
                            Crear
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CreateCourse;
