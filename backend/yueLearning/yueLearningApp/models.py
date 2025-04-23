from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from datetime import timedelta
from django.utils.timezone import now
import uuid

# Manager for Usuario model
class UsuarioManager(BaseUserManager):
    def create_user(self, correoelectronico, password=None, **extra_fields):
        if not correoelectronico:
            raise ValueError("El usuario debe tener un correo electrónico")
        user = self.model(correoelectronico=correoelectronico, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correoelectronico, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        return self.create_user(correoelectronico, password, **extra_fields)

# Main authentication model
class Usuario(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    correoelectronico = models.EmailField(unique=True)
    fotoperfil = models.CharField(max_length=100, blank=True, null=True)
    estatuscorreo = models.CharField(max_length=15, blank=True, null=True, default="No verificado")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Avoid conflict with Django's auth.User groups and permissions
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="usuario_set",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="usuario_permission_set",
        blank=True
    )

    objects = UsuarioManager()

    USERNAME_FIELD = 'correoelectronico'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'usuario'


# Estudiantes model referencing Usuario
class Estudiantes(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)  
    nickname = models.CharField(max_length=50, unique=True)
    nivelconocimiento = models.CharField(max_length=12, blank=True, null=True)
    contrasena = models.CharField(max_length=255, blank=True, null=True)  # Almacena la contraseña en texto plano

    class Meta:
        db_table = 'estudiantes'

# Docente model referencing Usuario
class Docente(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)  
    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellidopaterno = models.CharField(max_length=50, blank=True, null=True)
    apellidomaterno = models.CharField(max_length=50, blank=True, null=True)
    correoalternativo = models.CharField(max_length=100, blank=True, null=True)
    numerocelular = models.CharField(max_length=15, blank=True, null=True)
    descripcionperfil = models.TextField(blank=True, null=True)
    contrasena = models.CharField(max_length=255, blank=True, null=True)  # Almacena la contraseña en texto plano

    class Meta:
        db_table = 'docente'

# Foreign keys updated to reference Usuario instead of Estudiantes or Docente
class Calificaciones(models.Model):
    id_calificacion = models.AutoField(db_column='ID_Calificacion', primary_key=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='ID_Usuario', blank=True, null=True)  
    id_curso = models.ForeignKey('Curso', models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)
    calificacion = models.DecimalField(db_column='Calificacion', max_digits=2, decimal_places=1, blank=True, null=True)

    class Meta:
        db_table = 'calificaciones'

class Curso(models.Model):
    id_curso = models.AutoField(db_column='ID_Curso', primary_key=True)
    id_docente = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='ID_Usuario', blank=True, null=True)  
    nombrecurso = models.CharField(db_column='NombreCurso', max_length=100, blank=True, null=True)
    descripcioncurso = models.TextField(db_column='DescripcionCurso', blank=True, null=True)
    calificacion = models.DecimalField(db_column='Calificacion', max_digits=2, decimal_places=1, blank=True, null=True)
    listavideos = models.JSONField(db_column='ListaVideos', blank=True, null=True)
    listarecursos = models.JSONField(db_column='ListaRecursos', blank=True, null=True)
    imagen_url = models.URLField(db_column='ImagenURL', max_length=500, blank=True, null=True)

    class Meta:
        db_table = 'curso'

class Inscripciones(models.Model):
    id_inscripcion = models.AutoField(db_column='ID_Inscripcion', primary_key=True)
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='ID_Curso', blank=True, null=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='ID_Usuario', blank=True, null=True)  

    class Meta:
        db_table = 'inscripciones'

# Email Verification Token (kept unchanged)
def default_expiration():
    return now() + timedelta(hours=24)





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
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='ID_Usuario')
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    fecha_expiracion = models.DateTimeField(default=default_expiration)

    class Meta:
        db_table = 'email_verification_tokens'
