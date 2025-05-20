// src/components/ContentWrapper.js
import React from "react";
import { NavLink } from "react-router-dom";
import "../css/SideBarMenu.css";
import {useParams} from "react-router-dom";

const SideBarMenu = () => {
    const { courseId } = useParams();
    return (
        <div className="sidebar-menu">
            <NavLink to={`/lista-videos/${courseId}`} className={({isActive}) => isActive ? "active" : ""}>
                Lista de videos
            </NavLink>
            <NavLink to={`/evalua-conocimientos/${courseId}`} className={({isActive}) => isActive ? "active" : ""}>
                Cuestionarios
            </NavLink>
            <NavLink to={`/compilador/${courseId}`} className={({isActive}) => isActive ? "active" : ""}>
                Practicar
            </NavLink>
            <NavLink to={`/recursos-apoyo/${courseId}`} className={({isActive}) => isActive ? "active" : ""}>
                Recursos
            </NavLink>
            <NavLink to={`/calificar-curso/${courseId}`} className={({isActive}) => isActive ? "active" : ""}>
                Califica este curso
            </NavLink>
        </div>
    );
};

export default SideBarMenu;
