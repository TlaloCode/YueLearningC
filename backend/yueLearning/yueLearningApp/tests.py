from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Usuario, Estudiantes  # ajusta la app
from .models import Usuario, Estudiantes, EmailVerificationToken
from rest_framework import status
from .models import Video  # Ajusta a tu app de Video
from rest_framework_simplejwt.tokens import RefreshToken
from unittest.mock import patch


class LoginUsuarioTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('login_usuario')

        # Crear un usuario verificado
        self.usuario = Usuario.objects.create_user(
            correoelectronico='test@alumno.ipn.mx',
            password='Contrasena123'
        )
        self.usuario.estatuscorreo = "Verificado"
        self.usuario.save()

        # Asociarlo a Estudiantes
        Estudiantes.objects.create(usuario=self.usuario)

    def test_login_exitoso(self):
        response = self.client.post(self.url, {
            'correoelectronico': 'test@alumno.ipn.mx',
            'contrasena': 'Contrasena123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['rol'], 'estudiante')

    def test_login_usuario_no_existente(self):
        response = self.client.post(self.url, {
            'correoelectronico': 'noexiste@alumno.ipn.mx',
            'contrasena': 'Contrasena123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Correo o contraseña incorrectos.')

    def test_login_contrasena_incorrecta(self):
        response = self.client.post(self.url, {
            'correoelectronico': 'test@alumno.ipn.mx',
            'contrasena': 'Incorrecta'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Correo o contraseña incorrectos.')

    def test_login_sin_verificar(self):
        usuario_no_verificado = Usuario.objects.create_user(
            correoelectronico='nuevo@alumno.ipn.mx',
            password='Otra1234'
        )
        # No marcamos como verificado
        response = self.client.post(self.url, {
            'correoelectronico': 'nuevo@alumno.ipn.mx',
            'contrasena': 'Otra1234'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['error'], 'Debes verificar tu correo antes de iniciar sesión.')

  #-------------------- REGISTRO DE USUARIO-------------------------#
class RegistroUsuarioTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('registrar_usuario')  # Asegúrate que esta URL esté nombrada así en urls.py

    def test_registro_exitoso_estudiante(self):
        data = {
            "rol": "estudiante",
            "correoelectronico": "nuevo@alumno.ipn.mx",
            "contrasena": "Password.123",
            "confirm_password": "Password.123",
            "nickname": "AlumnoTest"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Usuario.objects.count(), 1)
        self.assertEqual(Estudiantes.objects.count(), 1)
        self.assertEqual(EmailVerificationToken.objects.count(), 1)
        self.assertIn("message", response.data)

    def test_contrasenas_no_coinciden(self):
        data = {
            "rol": "estudiante",
            "correoelectronico": "error@alumno.ipn.mx",
            "contrasena": "Password.123",
            "confirm_password": "Otra.Password",
            "nickname": "AlumnoError"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Las contraseñas no coinciden")

    def test_contrasena_invalida(self):
        data = {
            "rol": "estudiante",
            "correoelectronico": "error2@alumno.ipn.mx",
            "contrasena": "123",  # Asumimos que tu función validar_contrasena lo detecta
            "confirm_password": "123",
            "nickname": "AlumnoError2"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("contraseña", response.data['error'].lower())  # Texto flexible

    def test_rol_no_valido(self):
        data = {
            "rol": "invalido",
            "correoelectronico": "invalido@alumno.ipn.mx",
            "contrasena": "Password.123",
            "confirm_password": "Password.123",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Rol no válido.")

    def test_correo_ya_registrado(self):
        Usuario.objects.create_user(correoelectronico="repetido@alumno.ipn.mx", password="Algo1234")

        data = {
            "rol": "estudiante",
            "correoelectronico": "repetido@alumno.ipn.mx",
            "contrasena": "Password123",
            "confirm_password": "Password123",
            "nickname": "AlumnoRepetido"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "El correo electrónico ya está registrado.")

#------------------BORRAR CUENTA ---------------------------------------#
class DeleteVideoTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Crear usuario autenticado
        self.usuario = Usuario.objects.create_user(
            correoelectronico='docente@correo.com',
            password='Contrasena123'
        )
        self.usuario.estatuscorreo = "Verificado"
        self.usuario.save()

        # Generar token JWT y autenticar
        refresh = RefreshToken.for_user(self.usuario)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        # Crear un video simulado con ID de Google Drive falso
        self.video = Video.objects.create(
            id_curso=1,  # Ajusta según tu modelo
            titulo='Video de prueba',
            video='fake-google-drive-id'
        )
        self.url = reverse('delete-video', kwargs={'id_video': self.video.id_video})

    @patch('yueLearningApp.views.build')  # Simula el servicio de Google Drive
    def test_eliminar_video_exitoso(self, mock_build):
        mock_service = mock_build.return_value
        mock_service.files.return_value.delete.return_value.execute.return_value = None

        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], "Video eliminado correctamente.")
        self.assertFalse(Video.objects.filter(id_video=self.video.id_video).exists())

    def test_video_no_encontrado(self):
        url_inexistente = reverse('delete-video', kwargs={'id_video': 9999})
        response = self.client.delete(url_inexistente)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data['error'], "Video no encontrado.")