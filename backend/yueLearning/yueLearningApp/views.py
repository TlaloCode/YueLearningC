from django.shortcuts import render

import hashlib
import re
import uuid
from datetime import timedelta
from django.core.mail import send_mail
from django.utils.timezone import now
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Estudiantes, Docente, EmailVerificationToken
from .serializers import EstudianteSerializer, DocenteSerializer
from django.contrib.auth.hashers import check_password



def index(request):
    return HttpResponse("<h1>Hola mundo, estas en la vista principal</h1>")

def validar_contrasena(password):
    """
    Verifica que la contraseña cumpla con los requisitos de seguridad:
    - Mínimo 8 caracteres
    - Al menos una letra mayúscula
    - Al menos una letra minúscula
    - Al menos un número
    - Al menos un carácter especial (!@#$%^&*...)
    """
    if len(password) < 8:
        return "La contraseña debe tener al menos 8 caracteres."
    if not re.search(r"[A-Z]", password):
        return "La contraseña debe incluir al menos una letra mayúscula."
    if not re.search(r"[a-z]", password):
        return "La contraseña debe incluir al menos una letra minúscula."
    if not re.search(r"\d", password):
        return "La contraseña debe incluir al menos un número."
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return "La contraseña debe incluir al menos un carácter especial."
    return None  # Si pasa todas las validaciones, retorna None

@api_view(['POST'])
def registrar_estudiante(request):
    data = request.data
    print(data)
    # Validar que ningún campo esté vacío
    campos_obligatorios = ["nickname", "correoelectronico", "contrasena", "confirm_password"]
    for campo in campos_obligatorios:
        if not data.get(campo):
            return Response({"error":"Ningun campo debe estar vacío. Favor de llenar todos los campos" }, status=status.HTTP_400_BAD_REQUEST)

    # Validar el nickname (máximo 8 caracteres y sin palabras ofensivas)
    nickname = data.get("nickname")
    if len(nickname) > 8:
        return Response({"error": "El nombre de usuario debe tener máximo 8 caracteres y no se permiten palabras ofensivas."}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar que el nickname no esté en uso
    if Estudiantes.objects.filter(nickname=nickname).exists():
        return Response({"error": "El nombre de usuario ya está en uso. Intenta iniciar sesión o usa otro nickname."}, status=status.HTTP_400_BAD_REQUEST)

    #Verificar que el correo electrónico no haya sido registrado previamente
    if Estudiantes.objects.filter(correoelectronico=data.get('correo')).exists():
        return Response({"error": "El correo electrónico ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)


    if data.get('contrasena') != data.get('confirm_password'):
         return Response({"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST)

    error_contrasena = validar_contrasena(data.get('contrasena'))
    if error_contrasena:
        return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)


    # Encriptar la contraseña antes de guardarla
    #data['contrasena'] = hashlib.sha256(data['contrasena'].encode()).hexdigest()

    serializer = EstudianteSerializer(data=data)
    if serializer.is_valid():
        estudiante = serializer.save()
        estudiante.refresh_from_db()

        # Obtener el ID del estudiante correctamente
        usuario_id = estudiante.id_usuario
        print(f'El id es: {usuario_id}')
        if not usuario_id:
            return Response({"error": "No se pudo obtener el ID del usuario."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        token = uuid.uuid4()
        EmailVerificationToken.objects.create(
            usuario_id=usuario_id,
            token=token,
            fecha_expiracion=now() + timedelta(hours=24)
        )
        verification_link = f"http://127.0.0.1:8000/api/verify-email/?token={token}"

        #Enviar el correo de verificación
        send_mail(
            subject="Verifica tu correo electrónico",
            message=f"Hola {data.get("nickname")},\n\nPor favor, haz clic en el siguiente enlace para verificar tu correo electrónico:\n\n{verification_link}\n\nEste enlace expirará en 24 horas.",
            from_email="yuelearning2025a011@gmail.com",
            recipient_list=[data.get("correoelectronico")],
            fail_silently=False,
        )

        return Response({"message": "Estudiante registrado con éxito. Veficia tu correo"}, status=status.HTTP_201_CREATED)


    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#REGISTRO DE DOCENTE
@api_view(['POST'])
def registrar_docente(request):
    data = request.data
    print(data)
    # Validar que ningún campo esté vacío
    campos_obligatorios = ['nombre', 'apellidopaterno', 'apellidomaterno', 'correoelectronico','contrasena','confirmPassword']
    for campo in campos_obligatorios:
        if not data.get(campo):
            return Response({"error":"Ningun campo debe estar vacío. Favor de llenar todos los campos" }, status=status.HTTP_400_BAD_REQUEST)

    if date.get('contrasena') != data.get('confirmPassword'):
         return Response({"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST)

    error_contrasena = validar_contrasena(data.get('contrasena'))
    if error_contrasena:
        return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)

    #Verificar que el correo electrónico no haya sido registrado previamente
    if Docente.objects.filter(correoelectronico=data.get('correoelectronico')).exists():
        return Response({"error": "El correo electrónico ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)

    # Encriptar la contraseña antes de guardarla
    #data['password'] = hashlib.sha256(data['password'].encode()).hexdigest()
    serializer = DocenteSerializer(data=data)

    if serializer.is_valid():
        docente = serializer.save()
        docente.refresh_from_db()

        # Obtener el ID del estudiante correctamente
        usuario_id = docente.id_usuario
        print(f'El id es: {usuario_id}')
        if not usuario_id:
            return Response({"error": "No se pudo obtener el ID del usuario."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        token = uuid.uuid4()
        EmailVerificationToken.objects.create(
            usuario_id=usuario_id,
            token=token,
            fecha_expiracion=now() + timedelta(hours=24)
        )
        verification_link = f"http://127.0.0.1:8000/api/verify-email/?token={token}"

        #Enviar el correo de verificación
        send_mail(
            subject="Verifica tu correo electrónico",
            message=f"Hola {data.get("nombre")},\n\nPor favor, haz clic en el siguiente enlace para verificar tu correo electrónico:\n\n{verification_link}\n\nEste enlace expirará en 24 horas.",
            from_email="yuelearning2025a011@gmail.com",
            recipient_list=[data.get("correoelectronico")],
            fail_silently=False,
        )
        return Response({"message": "Docente registrado con éxito"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_usuario(request):
    data = request.data
    print(data)
    correo = data.get("correoelectronico")
    password = data.get("contrasena")

    # 1️⃣ Buscar el usuario en la tabla de Estudiantes
    usuario = Estudiantes.objects.filter(correoelectronico=correo).first()
    tipo_usuario = "estudiante"
    print("Es un estudiante")
    # 2️⃣ Si no es estudiante, buscar en la tabla de Docentes
    if not usuario:
        usuario = Docente.objects.filter(correoelectronico=correo).first()
        tipo_usuario = "docente"

    # 3️⃣ Si el usuario no existe en ninguna tabla, devolver error
    if not usuario:
        return Response({"error": "Correo o contraseña incorrectos."}, status=status.HTTP_400_BAD_REQUEST)

    # 4️⃣ Verificar si el correo está verificado
    if usuario.estatuscorreo != "Verificado":
        return Response({"error": "Debes verificar tu correo antes de iniciar sesión."}, status=status.HTTP_403_FORBIDDEN)

    # 5️⃣ Validar la contraseña
    print(password)
    print(usuario.contrasena)
    #if not check_password(password, usuario.contrasena):
    #    return Response({"error": "Correo o contraseña incorrectos."}, status=status.HTTP_400_BAD_REQUEST)
    if password != usuario.contrasena:
        return Response({"error": "Correo o contraseña incorrectos."}, status=status.HTTP_400_BAD_REQUEST)

    # 6️⃣ Generar el token JWT
    refresh = RefreshToken.for_user(usuario)
    refresh["user_id"] = usuario.id_usuario  # Usamos el identificador correcto
    print(f'El token es: {refresh}')
    return Response({
        "message": "Inicio de sesión exitoso.",
        "token": str(refresh.access_token),
        "tipo_usuario": tipo_usuario,
        "nickname": usuario.nickname,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def verificar_correo(request):
    token = request.GET.get('token')
    # Verificar si el token existe
    try:
        token_obj = EmailVerificationToken.objects.get(token=token)
    except EmailVerificationToken.DoesNotExist:
        return Response({"error": "Token inválido o ya utilizado."}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar si el token ha expirado
    if now() > token_obj.fecha_expiracion:
        return Response({"error": "El enlace de verificación ha expirado."}, status=status.HTTP_400_BAD_REQUEST)

    # Actualizar el estado del usuario a "Verificado"
    Estudiantes.objects.filter(id_usuario=token_obj.usuario_id).update(estatuscorreo="Verificado")

    # Eliminar el token después de usarlo
    token_obj.delete()

    return Response({"message": "Correo verificado con éxito. Ya puedes iniciar sesión."}, status=status.HTTP_200_OK)