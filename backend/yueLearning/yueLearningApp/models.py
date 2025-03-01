import uuid
from django.db import models

class Calificaciones(models.Model):
    id_calificacion = models.AutoField(db_column='ID_Calificacion', primary_key=True)  # Field name made lowercase.
    id_usuario = models.ForeignKey('Estudiantes', models.DO_NOTHING, db_column='ID_Usuario', blank=True, null=True)  # Field name made lowercase.
    id_curso = models.ForeignKey('Curso', models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)  # Field name made lowercase.
    calificacion = models.DecimalField(db_column='Calificacion', max_digits=2, decimal_places=1, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'calificaciones'


class Cuestionarios(models.Model):
    id_cuestionario = models.AutoField(db_column='ID_Cuestionario', primary_key=True)  # Field name made lowercase.
    id_curso = models.ForeignKey('Curso', models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)  # Field name made lowercase.
    titulocuestionario = models.CharField(db_column='TituloCuestionario', max_length=100, blank=True, null=True)  # Field name made lowercase.
    descripcion = models.TextField(db_column='Descripcion', blank=True, null=True)  # Field name made lowercase.
    esdiagnostico = models.IntegerField(db_column='EsDiagnostico', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cuestionarios'


class Curso(models.Model):
    id_curso = models.AutoField(db_column='ID_Curso', primary_key=True)  # Field name made lowercase.
    id_docente = models.ForeignKey('Docente', models.DO_NOTHING, db_column='ID_Docente', blank=True, null=True)  # Field name made lowercase.
    nombrecurso = models.CharField(db_column='NombreCurso', max_length=100, blank=True, null=True)  # Field name made lowercase.
    descripcioncurso = models.TextField(db_column='DescripcionCurso', blank=True, null=True)  # Field name made lowercase.
    calificacion = models.DecimalField(db_column='Calificacion', max_digits=2, decimal_places=1, blank=True, null=True)  # Field name made lowercase.
    listavideos = models.JSONField(db_column='ListaVideos', blank=True, null=True)  # Field name made lowercase.
    listarecursos = models.JSONField(db_column='ListaRecursos', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'curso'


class Docente(models.Model):
    id_usuario = models.AutoField(db_column='ID_Usuario', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50, blank=True, null=True)  # Field name made lowercase.
    apellidopaterno = models.CharField(db_column='ApellidoPaterno', max_length=50, blank=True, null=True)  # Field name made lowercase.
    apellidomaterno = models.CharField(db_column='ApellidoMaterno', max_length=50, blank=True, null=True)  # Field name made lowercase.
    correoalternativo = models.CharField(db_column='CorreoAlternativo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    numerocelular = models.CharField(db_column='NumeroCelular', max_length=15, blank=True, null=True)  # Field name made lowercase.
    descripcionperfil = models.TextField(db_column='DescripcionPerfil', blank=True, null=True)  # Field name made lowercase.
    fotoperfil = models.CharField(db_column='FotoPerfil', max_length=100, blank=True, null=True)  # Field name made lowercase.
    correoelectronico = models.CharField(db_column='CorreoElectronico', max_length=100, blank=True, null=True)  # Field name made lowercase.
    contrasena = models.CharField(db_column='Contrasena', max_length=80, blank=True, null=True)  # Field name made lowercase.
    estatuscorreo = models.CharField(db_column='EstatusCorreo', max_length=15, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'docente'


class Estudiantes(models.Model):
    id_usuario = models.AutoField(db_column='ID_Usuario', primary_key=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=50, blank=True, null=True)  # Field name made lowercase.
    nivelconocimiento = models.CharField(db_column='NivelConocimiento', max_length=12, blank=True, null=True)  # Field name made lowercase.
    fotoperfil = models.CharField(db_column='FotoPerfil', max_length=100, blank=True, null=True)  # Field name made lowercase.
    correoelectronico = models.CharField(db_column='CorreoElectronico', max_length=100, blank=True, null=True)  # Field name made lowercase.
    contrasena = models.CharField(db_column='Contrasena', max_length=50, blank=True, null=True)  # Field name made lowercase.
    estatuscorreo = models.CharField(db_column='EstatusCorreo', max_length=15, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'estudiantes'


class Inscripciones(models.Model):
    id_inscripcion = models.AutoField(db_column='ID_Inscripcion', primary_key=True)  # Field name made lowercase.
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)  # Field name made lowercase.
    id_estudiante = models.ForeignKey(Estudiantes, models.DO_NOTHING, db_column='ID_Estudiante', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inscripciones'


class Opciones(models.Model):
    id_opciones = models.AutoField(db_column='ID_Opciones', primary_key=True)  # Field name made lowercase.
    id_pregunta = models.ForeignKey('Preguntas', models.DO_NOTHING, db_column='ID_Pregunta', blank=True, null=True)  # Field name made lowercase.
    escorrecta = models.IntegerField(db_column='EsCorrecta', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'opciones'


class Preguntas(models.Model):
    id_pregunta = models.AutoField(db_column='ID_Pregunta', primary_key=True)  # Field name made lowercase.
    id_cuestionario = models.ForeignKey(Cuestionarios, models.DO_NOTHING, db_column='ID_Cuestionario', blank=True, null=True)  # Field name made lowercase.
    textopregunta = models.TextField(db_column='TextoPregunta', blank=True, null=True)  # Field name made lowercase.
    textoopcion = models.TextField(db_column='TextoOpcion', blank=True, null=True)  # Field name made lowercase.
    imagenpregunta = models.CharField(db_column='ImagenPregunta', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'preguntas'


class Problemas(models.Model):
    id_problemas = models.AutoField(db_column='ID_Problemas', primary_key=True)  # Field name made lowercase.
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)  # Field name made lowercase.
    tituloproblema = models.CharField(db_column='TituloProblema', max_length=100, blank=True, null=True)  # Field name made lowercase.
    descripcion = models.TextField(db_column='Descripcion', blank=True, null=True)  # Field name made lowercase.
    solucion = models.TextField(db_column='Solucion', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'problemas'


class Recursosapoyo(models.Model):
    id_recurso = models.AutoField(db_column='ID_Recurso', primary_key=True)  # Field name made lowercase.
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)  # Field name made lowercase.
    titulorecurso = models.CharField(db_column='TituloRecurso', max_length=100, blank=True, null=True)  # Field name made lowercase.
    urlrecurso = models.CharField(db_column='URLRecurso', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'recursosapoyo'


class Video(models.Model):
    id_video = models.AutoField(db_column='ID_Video', primary_key=True)  # Field name made lowercase.
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)  # Field name made lowercase.
    titulovideo = models.CharField(db_column='TituloVideo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    descripcion = models.TextField(db_column='Descripcion', blank=True, null=True)  # Field name made lowercase.
    video = models.CharField(db_column='Video', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'video'

class EmailVerificationToken(models.Model):
    estudiante = models.OneToOneField(Estudiantes, on_delete=models.CASCADE, related_name="verification_token")
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token para {self.estudiante.nickname}"