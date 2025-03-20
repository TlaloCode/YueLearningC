from django.contrib.auth.backends import BaseBackend
from .models import Estudiantes, Docente

class CustomAuthBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        try:
            usuario = Estudiantes.objects.get(correoelectronico=email)
        except Estudiantes.DoesNotExist:
            try:
                usuario = Docente.objects.get(correoelectronico=email)
            except Docente.DoesNotExist:
                return None

        # Verificar contraseña (asumiendo que está encriptada con SHA-256)
        import hashlib
        if usuario.contrasena == hashlib.sha256(password.encode()).hexdigest():
            return usuario
        return None

    def get_user(self, user_id):
        try:
            return Estudiantes.objects.get(id_usuario=user_id)
        except Estudiantes.DoesNotExist:
            try:
                return Docente.objects.get(id_docente=user_id)
            except Docente.DoesNotExist:
                return None
