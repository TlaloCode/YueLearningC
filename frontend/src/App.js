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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
      <Router>
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/registerStudent" element={<RegisterStudent/>}/>
              <Route path="/registerTeacher" element={<RegisterTeacher/>}/>
              <Route path="/correoVerificado" element={<CorreoVerificado/>}/>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/help" element={<Help />} />
              <Route path="/perfil-docente" element={<TeacherProfile />} />
              <Route path="/perfil-estudiante" element={<StudentProfile />} />
              <Route path="/mis-cursos" element={<TeacherCourses />} />
              <Route path="/crear-curso" element={<CreateCourse />} />
              <Route path="/mis-cursos-estudiante" element={<StudentCourses />} />
              <Route path="/curso-detalle" element={<TeacherCourseDetail />} />
              <Route path="/teacher-course-detail/:courseId" element={<TeacherCourseDetail />} />
              <Route path="/inscribir-curso/:courseId" element={<InscribirCurso />} />
              <Route path="/inscribir-curso" element={<InscribirCurso />} /> {/* Ruta para la inscripción al curso */}
              <Route path="/lista-videos" element={<ListaVideos />} /> {/* Ruta para la inscripción al curso */}
              <Route path="/lista-videos/:courseId" element={<ListaVideos />} />
              <Route path="/evalua-conocimientos" element={<EvaluaConocimientos />} /> {/* Ruta para la inscripción al curso */}
              <Route path="/evalua-conocimientos/:courseId" element={<EvaluaConocimientos />} />
              <Route path="/recursos-apoyo" element={<RecursosApoyo />} /> {/* Ruta para la inscripción al curso */}
              <Route path="/recursos-apoyo/:courseId" element={<RecursosApoyo />} />
              <Route path="/calificar-curso" element={<CalificarCurso/>} /> {/* Ruta para la inscripción al curso */}
              <Route path="/calificar-curso/:courseId" element={<CalificarCurso/>} /> {/* Ruta para la inscripción al curso */}
              <Route path="/diagnostico" element={<Diagnostico/>} /> {/* Ruta para la inscripción al curso */}
              <Route path="/compilador" element={<Compilador/>} /> {/* Ruta para la inscripción al curso */}
              <Route path="/compilador/:courseId" element={<Compilador/>} />
              <Route path="/podio" element={<Podio/>} /> {/* Ruta para la inscripción al curso */}
              <Route path="/vista-video" element={<VistaVideo/>} />
              <Route path="/vista-video/:courseId/:idVideo" element={<VistaVideo/>} />
          </Routes>
      </div>
      </Router>
  );
};

export default App;
