import React from "react";
import Login from "./paginas/login"
import Home from "./paginas/home"
import Help from "./paginas/Help";
import RegisterStudent from"./paginas/registerStudent"
import RegisterTeacher from "./paginas/registerTeacher"
import ForgotPassword from "./paginas/forgotPassword"
import TermsAndConditions from "./paginas/TermsAndConditions";
import PrivacyPolicy from "./paginas/PrivacyPolicy";
import TeacherProfile from "./paginas/TeacherProfile";
import StudentProfile from "./paginas/StudentProfile";
import TeacherCourses from "./paginas/TeacherCourses";
import CreateCourse from "./paginas/CreateCourse";
import AgregarVideo from "./paginas/AgregarVideo";
import AgregarRecurso from "./paginas/AgregarRecurso";
import StudentCourses from "./paginas/StudentCourses";
import TeacherCourseDetail from "./paginas/TeacherCourseDetail";
import InscribirCurso from "./paginas/InscribirCurso";
import ListaVideos from "./paginas/ListaVideos";
import EvaluaConocimientos from "./paginas/EvaluaConocimientos";
import RecursosApoyo from "./paginas/RecursosApoyo";
import CalificarCurso from "./paginas/CalificarCurso";
import Diagnostico from "./paginas/Diagnostico";
import Compilador from "./paginas/Compilador";
import Podio from "./paginas/Podio";
import VistaVideo from "./paginas/VistaVideo";
import CorreoVerificado from "./paginas/CorreoVerificado";
import RutaPrivada from "./components/RutaPrivada";
import ErrorAcceso from "./paginas/ErrorAcceso";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
      <Router>
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/error-acceso" element={<ErrorAcceso/>}/>
              <Route path="/home" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/registerStudent" element={<RegisterStudent/>}/>
              <Route path="/registerTeacher" element={<RegisterTeacher/>}/>
              <Route path="/correoVerificado" element={<CorreoVerificado/>}/>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/help" element={<Help />} />
              <Route
                  path="/perfil-docente"
                  element={
                      <RutaPrivada rolesPermitidos={["docente"]}>
                          <TeacherProfile />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/perfil-estudiante"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <StudentProfile />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/mis-cursos"
                  element={
                      <RutaPrivada rolesPermitidos={["docente"]}>
                          <TeacherCourses />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/crear-curso"
                  element={
                      <RutaPrivada rolesPermitidos={["docente"]}>
                          <CreateCourse />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/agregar-video/:courseId"
                  element={
                      <RutaPrivada rolesPermitidos={["docente"]}>
                          <AgregarVideo />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/agregar-recurso/:courseId"
                  element={
                      <RutaPrivada rolesPermitidos={["docente"]}>
                          <AgregarRecurso />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/mis-cursos-estudiante"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <StudentCourses />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/curso-detalle"
                  element={
                      <RutaPrivada rolesPermitidos={["docente"]}>
                          <TeacherCourseDetail />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/teacher-course-detail/:courseId"
                  element={
                      <RutaPrivada rolesPermitidos={["docente"]}>
                          <TeacherCourseDetail />
                      </RutaPrivada>
                  }
              />
              <Route path="/inscribir-curso/:courseId" element={<InscribirCurso />} />
              <Route path="/inscribir-curso" element={<InscribirCurso />} /> {/* Ruta para la inscripción al curso */}
              <Route
                  path="/lista-videos"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <ListaVideos />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/lista-videos/:courseId"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <ListaVideos />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/evalua-conocimientos"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <EvaluaConocimientos />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/evalua-conocimientos/:courseId"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <EvaluaConocimientos />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/recursos-apoyo"
                  element={
                      <RutaPrivada>
                          <RecursosApoyo />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/recursos-apoyo/:courseId"
                  element={
                      <RutaPrivada>
                          <RecursosApoyo />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/calificar-curso"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <CalificarCurso />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/calificar-curso/:courseId"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <CalificarCurso />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/diagnostico"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <Diagnostico />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/compilador"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <Compilador />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/compilador/:courseId"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <Compilador />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/podio"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <Podio />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/vista-video"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <VistaVideo />
                      </RutaPrivada>
                  }
              />
              <Route
                  path="/vista-video/:courseId/:idVideo"
                  element={
                      <RutaPrivada rolesPermitidos={["estudiante"]}>
                          <VistaVideo />
                      </RutaPrivada>
                  }
              />
          </Routes>
      </div>
      </Router>
  );
};

export default App;
