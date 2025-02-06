import logo from './logo.svg';
import './App.css';
import React from "react";
import Header from "./components/Header";
import Main from "./components/MainContent";
import Inicio from "./components/Inicio";
import "@fontsource/roboto"; // Fuente global para toda la app

function App() {
  return (
    <div>
        <Header/>
        <main>
           <Main/>
        </main>
        <Inicio/>
    </div>
)
    ;
}

export default App;