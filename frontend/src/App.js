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
import InscribirCurso from "./paginas/InscribirCurso"; // Asegúrate de que la ruta sea correcta
import ListaVideos from "./paginas/ListaVideos"; // Asegúrate de que la ruta sea correcta
import EvaluaConocimientos from "./paginas/EvaluaConocimientos";
import RecursosApoyo from "./paginas/RecursosApoyo";

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
              <Route path="/inscribir-curso" element={<InscribirCurso />} /> {/* Ruta para la inscripción al curso */}
              <Route path="/lista-videos" element={<ListaVideos />} /> {/* Ruta para la inscripción al curso */}
              <Route path="/evalua-conocimientos" element={<EvaluaConocimientos />} /> {/* Ruta para la inscripción al curso */}
              <Route path="/recursos-apoyo" element={<RecursosApoyo />} /> {/* Ruta para la inscripción al curso */}



          </Routes>
      </div>
      </Router>
  );
};

export default App;
