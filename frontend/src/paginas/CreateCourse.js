import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import "../css/CreateCourse.css";
import { FaPlusCircle } from "react-icons/fa";

const CreateCourse = () => {
    const [course] = useState({
        title: "",
        description: "",
        category: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nuevo curso creado:", course);
    };

    return (
        <div className="app-container">
            <Header />

            <div className="profile-container">
                <h2 className="profile-title">Crear Nuevo Curso</h2>

                <div className="course-form-container">
                    <form onSubmit={handleSubmit} className="course-form">
                        <div className="form-group">
                            <label>Nombre del Curso</label>
                            <input
                                type="text"
                                name="title"
                                value={course.title}
                                onChange={handleChange}
                                placeholder="Ingrese el nombre del curso"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                name="description"
                                value={course.description}
                                onChange={handleChange}
                                placeholder="Escriba una breve descripción"
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Categoría</label>
                            <select name="category" value={course.category} onChange={handleChange} required>
                                <option value="">Seleccione una categoría</option>
                                <option value="Programación">Programación</option>
                                <option value="Matemáticas">Matemáticas</option>
                                <option value="Ciencias">Ciencias</option>
                                <option value="Idiomas">Idiomas</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Imagen del Curso</label>
                            <input type="file" name="image" onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn-create">
                            <FaPlusCircle /> Crear Curso
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CreateCourse;
