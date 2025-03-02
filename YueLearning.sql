CREATE DATABASE IF NOT EXISTS YUELearningC;
USE YUELearningC;

CREATE TABLE Docente (
                         ID_Usuario INT PRIMARY KEY AUTO_INCREMENT,
                         Nombre VARCHAR(50),
                         ApellidoPaterno VARCHAR(50),
                         ApellidoMaterno VARCHAR(50),
                         CorreoAlternativo VARCHAR(100),
                         NumeroCelular VARCHAR(15),
                         DescripcionPerfil TEXT,
                         FotoPerfil VARCHAR(100),
                         CorreoElectronico VARCHAR(100),
                         Contrasena VARCHAR(80),
                         EstatusCorreo VARCHAR(15)
);

CREATE TABLE Estudiantes (
                             ID_Usuario INT PRIMARY KEY AUTO_INCREMENT,
                             Nickname VARCHAR(50),
                             NivelConocimiento ENUM('Principiante', 'Intermedio', 'Avanzado'),
                             FotoPerfil VARCHAR(100),
                             CorreoElectronico VARCHAR(100),
                             Contrasena VARCHAR(50),
                             EstatusCorreo VARCHAR(15)
);

CREATE TABLE Curso (
                       ID_Curso INT PRIMARY KEY AUTO_INCREMENT,
                       ID_Docente INT,
                       NombreCurso VARCHAR(100),
                       DescripcionCurso TEXT,
                       Calificacion DECIMAL(2,1),
                       ListaVideos JSON,
                       ListaRecursos JSON,
                       FOREIGN KEY (ID_Docente) REFERENCES Docente(ID_Usuario)
);

CREATE TABLE Inscripciones (
                               ID_Inscripcion INT PRIMARY KEY AUTO_INCREMENT,
                               ID_Curso INT,
                               ID_Estudiante INT,
                               FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso),
                               FOREIGN KEY (ID_Estudiante) REFERENCES Estudiantes(ID_Usuario)
);

CREATE TABLE Video (
                       ID_Video INT PRIMARY KEY AUTO_INCREMENT,
                       ID_Curso INT,
                       TituloVideo VARCHAR(100),
                       Descripcion TEXT,
                       Video VARCHAR(255),
                       FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
);

CREATE TABLE RecursosApoyo (
                               ID_Recurso INT PRIMARY KEY AUTO_INCREMENT,
                               ID_Curso INT,
                               TituloRecurso VARCHAR(100),
                               URLRecurso VARCHAR(255),
                               FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
);

CREATE TABLE Problemas (
                           ID_Problemas INT PRIMARY KEY AUTO_INCREMENT,
                           ID_Curso INT,
                           TituloProblema VARCHAR(100),
                           Descripcion TEXT,
                           Solucion TEXT,
                           FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
);

CREATE TABLE Cuestionarios (
                               ID_Cuestionario INT PRIMARY KEY AUTO_INCREMENT,
                               ID_Curso INT,
                               TituloCuestionario VARCHAR(100),
                               Descripcion TEXT,
                               EsDiagnostico BOOLEAN,
                               FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
);

CREATE TABLE Preguntas (
                           ID_Pregunta INT PRIMARY KEY AUTO_INCREMENT,
                           ID_Cuestionario INT,
                           TextoPregunta TEXT,
                           TextoOpcion TEXT,
                           ImagenPregunta VARCHAR(255),
                           FOREIGN KEY (ID_Cuestionario) REFERENCES Cuestionarios(ID_Cuestionario)
);

CREATE TABLE Opciones (
                          ID_Opciones INT PRIMARY KEY AUTO_INCREMENT,
                          ID_Pregunta INT,
                          EsCorrecta BOOLEAN,
                          FOREIGN KEY (ID_Pregunta) REFERENCES Preguntas(ID_Pregunta)
);

CREATE TABLE Calificaciones (
                                ID_Calificacion INT PRIMARY KEY AUTO_INCREMENT,
                                ID_Usuario INT,
                                ID_Curso INT,
                                Calificacion DECIMAL(2,1),
                                FOREIGN KEY (ID_Usuario) REFERENCES Estudiantes(ID_Usuario),
                                FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
);
