from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Estudiantes
from .serializers import EstudianteSerializer, DocenteSerializer
import hashlib
import re

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
    # Validar que ningún campo esté vacío
    campos_obligatorios = ["nickname", "email", "password", "confirm_password"]
    for campo in campos_obligatorios:
        if not data.get(campo):
            return Response({"error":"Ningun campo debe estar vacío. Favor de llenar todos los campos" }, status=status.HTTP_400_BAD_REQUEST)

    if data.get('password') != data.get('confirm_password'):
         return Response({"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST)

    error_contrasena = validar_contrasena(data.get('password'))
    if error_contrasena:
        return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)

    #Verificar que el correo electrónico no haya sido registrado previamente
    if Estudiantes.objects.filter(correoelectronico=data.get('correo')).exists():
        return Response({"error": "El correo electrónico ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)

    # Validar el nickname (máximo 8 caracteres y sin palabras ofensivas)
    nickname = data.get("nickname")
    if len(nickname) > 8:
        return Response({"error": "El nickname debe tener máximo 8 caracteres y no se permiten palabras ofensivas."}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar que el nickname no esté en uso
    if Estudiantes.objects.filter(nickname=nickname).exists():
        return Response({"error": "El Nickname ya está en uso. Intenta iniciar sesión o usa otro nickname."}, status=status.HTTP_400_BAD_REQUEST)

    # Encriptar la contraseña antes de guardarla
    data['password'] = hashlib.sha256(data['password'].encode()).hexdigest()
    serializer = EstudianteSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Estudiante registrado con éxito"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#REGISTRO DE DOCENTE
@api_view(['POST'])
def registrar_docente(request):
    data = request.data
    print(data)
    # Validar que ningún campo esté vacío
    campos_obligatorios = ['firstName', 'lastName', 'middleName', 'email','password','confirmPassword']
    for campo in campos_obligatorios:
        if not data.get(campo):
            return Response({"error":"Ningun campo debe estar vacío. Favor de llenar todos los campos" }, status=status.HTTP_400_BAD_REQUEST)

    if data.get('password') != data.get('confirm_password'):
         return Response({"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST)

    error_contrasena = validar_contrasena(data.get('password'))
    if error_contrasena:
        return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)

    #Verificar que el correo electrónico no haya sido registrado previamente
    if Estudiantes.objects.filter(correoelectronico=data.get('correo')).exists():
        return Response({"error": "El correo electrónico ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)

    # Encriptar la contraseña antes de guardarla
    data['password'] = hashlib.sha256(data['password'].encode()).hexdigest()
    serializer = DocenteSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Docente registrado con éxito"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
