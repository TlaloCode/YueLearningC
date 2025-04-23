// src/components/ContentWrapper.js
import React from "react";
import { NavLink } from "react-router-dom";
import "../css/SideBarMenu.css";

const SideBarMenu = () => {
    return (
        <div className="sidebar-menu">
            <NavLink to="/lista-videos" className={({ isActive }) => isActive ? "active" : ""}>Lista de videos</NavLink>
            <NavLink to="/evalua-conocimientos" className={({ isActive }) => isActive ? "active" : ""}>Quiz</NavLink>
            <NavLink to="/compilador" className={({ isActive }) => isActive ? "active" : ""}>Practicar</NavLink>
            <NavLink to="/recursos-apoyo" className={({ isActive }) => isActive ? "active" : ""}>Recursos</NavLink>
        </div>
    );
};

export default SideBarMenu;
