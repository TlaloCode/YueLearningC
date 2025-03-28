import hashlib
import re
import uuid
from datetime import timedelta
from rest_framework import status
from django.shortcuts import render
from django.core.mail import send_mail
from django.utils.timezone import now
from django.http import HttpResponse
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Usuario, Estudiantes, Docente, EmailVerificationToken, Curso, Inscripciones
from .serializers import UsuarioSerializer, EstudianteSerializer, DocenteSerializer
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive


refresh = None

def index(request):
    return HttpResponse("<h1>Hola mundo, estas en la vista principal</h1>")

def validar_contrasena(password):
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
    return None

@api_view(['POST'])
def registrar_usuario(request):
    data = request.data
    rol = data.get("rol")  # Puede ser 'estudiante' o 'docente'

    if rol not in ["estudiante", "docente"]:
        return Response({"error": "Rol no válido."}, status=status.HTTP_400_BAD_REQUEST)

    error_contrasena = validar_contrasena(data.get('contrasena'))
    if error_contrasena:
        return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)

    if not data.get("contrasena") == data.get("confirm_password"):
        return Response({"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST)

    if Usuario.objects.filter(correoelectronico=data.get('correoelectronico')).exists():
        return Response({"error": "El correo electrónico ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)

    usuario = Usuario.objects.create_user(
        correoelectronico=data.get("correoelectronico"),
        password=data.get("contrasena")
    )

    if rol == "estudiante":
        Estudiantes.objects.create(usuario=usuario, nickname=data.get("nickname"),contrasena=data.get("contrasena"))
    else:
        Docente.objects.create(
            usuario=usuario,
            nombre=data.get("nombre"),
            apellidopaterno=data.get("apellidopaterno"),
            apellidomaterno=data.get("apellidomaterno"),
            correoalternativo=data.get("correoalternativo"),
            numerocelular=data.get("numerocelular"),
            descripcionperfil=data.get("descripcionperfil"),
            contrasena=data.get("contrasena")
        )

    token = uuid.uuid4()
    EmailVerificationToken.objects.create(usuario_id=usuario, token=token, fecha_expiracion=now() + timedelta(hours=24))
    verification_link = f"http://127.0.0.1:8000/api/verify-email/?token={token}"
    send_mail(
        subject="Verifica tu correo electrónico",
        message=f"Hola, verifica tu correo aquí: {verification_link}",
        from_email="yuelearning2025a011@gmail.com",
        recipient_list=[data.get("correoelectronico")],
        fail_silently=False,
    )

    return Response({"message": "Usuario registrado con éxito. Verifica tu correo."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_usuario(request):
    data = request.data
    correo = data.get("correoelectronico")
    password = data.get("contrasena")
    print(data)
    usuario = Usuario.objects.filter(correoelectronico=correo).first()
    print(usuario)
    if not usuario:
        return Response({"error": "Correo o contraseña incorrectos."}, status=status.HTTP_400_BAD_REQUEST)

    if usuario.estatuscorreo != "Verificado":
        return Response({"error": "Debes verificar tu correo antes de iniciar sesión."}, status=status.HTTP_403_FORBIDDEN)

    if not usuario.check_password(password):
        return Response({"error": "Correo o contraseña incorrectos."}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(usuario)

    # Determinar el rol del usuario
    rol = "estudiante" if Estudiantes.objects.filter(usuario=usuario).exists() else "docente" if Docente.objects.filter(usuario=usuario).exists() else "usuario"
    print(rol)
    return Response({
        "message": "Inicio de sesión exitoso.",
        "token": str(refresh.access_token),
        "refresh_token": str(refresh),
        "id": usuario.id,
        "correo": usuario.correoelectronico,
        "rol": rol,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def verificar_correo(request):
    token = request.GET.get('token')
    try:
        token_obj = EmailVerificationToken.objects.get(token=token)
    except EmailVerificationToken.DoesNotExist:
        return Response({"error": "Token inválido o ya utilizado."}, status=status.HTTP_400_BAD_REQUEST)

    if now() > token_obj.fecha_expiracion:
        return Response({"error": "El enlace de verificación ha expirado."}, status=status.HTTP_400_BAD_REQUEST)

    usuario = token_obj.usuario_id
    usuario.estatuscorreo = "Verificado"
    usuario.save()
    token_obj.delete()
    return Response({"message": "Correo verificado con éxito. Ya puedes iniciar sesión."}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    usuario = request.user
    try:
        estudiante = Estudiantes.objects.get(usuario=usuario)
        return Response({
            "nickname": estudiante.nickname,
            "correoelectronico": usuario.correoelectronico,
            "fotoPerfil": usuario.fotoperfil if usuario.fotoperfil else "",
            "contrasena": estudiante.contrasena,  # Devuelve la contraseña sin encriptar
        }, status=status.HTTP_200_OK)
    except Estudiantes.DoesNotExist:
        try:
            docente = Docente.objects.get(usuario=usuario)
            return Response({
                "nombre": docente.nombre,
                "correoelectronico": usuario.correoelectronico,
                "apellidopaterno": docente.apellidopaterno,
                "apellidomaterno": docente.apellidomaterno,
                "correoalternativo": docente.correoalternativo,
                "numerocelular": docente.numerocelular,
                "descripcionperfil": docente.descripcionperfil,
                "fotoPerfil": usuario.fotoperfil if usuario.fotoperfil else "",
                "contrasena": docente.contrasena,  # Devuelve la contraseña sin encriptar
            }, status=status.HTTP_200_OK)
        except Docente.DoesNotExist:
            return Response({"error": "Perfil no encontrado."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    usuario = request.user
    data = request.data

    try:
        estudiante = Estudiantes.objects.get(usuario=usuario)
        estudiante.nickname = data.get("nickname", estudiante.nickname)
        error_contrasena = validar_contrasena(data.get('contrasena'))
        if error_contrasena:
            return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)
        else:
            estudiante.contrasena = data.get("contrasena", estudiante.contrasena)
            estudiante.save()
            usuario.set_password(estudiante.contrasena)  # Encriptar en Usuario
            usuario.save()
            return Response({"message": "Perfil de estudiante actualizado correctamente."}, status=status.HTTP_200_OK)
    except Estudiantes.DoesNotExist:
        try:
            docente = Docente.objects.get(usuario=usuario)
            docente.nombre = data.get("nombre", docente.nombre)
            print(data.get('password'))
            error_contrasena = validar_contrasena(data.get('password'))
            if error_contrasena:
                return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)
            elif not data.get('password') == data.get('confirmPassword'):
                return Response({"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                docente.contrasena = data.get("password", docente.contrasena)
                docente.apellidopaterno = data.get("apellidopaterno", docente.apellidopaterno)
                docente.apellidomaterno = data.get("apellidomaterno", docente.apellidomaterno)
                docente.correoalternativo = data.get("correoalternativo", docente.correoalternativo)
                docente.numerocelular = data.get("numerocelular", docente.numerocelular)
                docente.descripcionperfil = data.get("descripcionperfil", docente.descripcionperfil)
                docente.save()
                return Response({"message": "Perfil de docente actualizado correctamente."}, status=status.HTTP_200_OK)
        except Docente.DoesNotExist:
            return Response({"error": "Perfil no encontrado."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_profile_photo(request):
    usuario = request.user
    file = request.FILES.get("file")

    if not file:
        return Response({"error": "No se seleccionó ninguna imagen."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        gauth = GoogleAuth()
        gauth.LocalWebserverAuth()
        drive = GoogleDrive(gauth)

        uploaded_file = drive.CreateFile({'title': file.name})
        uploaded_file.SetContentFile(file.temporary_file_path())
        uploaded_file.Upload()

        file_url = f"https://drive.google.com/uc?id={uploaded_file['id']}"
        usuario.fotoperfil = file_url
        usuario.save()

        return Response({"fotoPerfil": file_url}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_teacher_courses(request):
    docente = request.user

    # Filtrar cursos por el docente autenticado
    cursos = Curso.objects.filter(id_docente=docente)

    # Serializar manualmente la información que necesitas
    cursos_data = []
    for curso in cursos:
        cursos_data.append({
            "id": curso.id_curso,
            "title": curso.nombrecurso,
            "description": curso.descripcioncurso,
            "image": curso.imagen_url
        })

    return Response(cursos_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_course(request):
    docente = request.user
    nombrecurso = request.POST.get("nombrecurso")
    descripcioncurso = request.POST.get("descripcioncurso")
    imagen = request.FILES.get("imagen")

    if not nombrecurso or not descripcioncurso:
        return Response({"error": "Faltan campos obligatorios"}, status=400)

    curso = Curso(
        id_docente=docente,
        nombrecurso=nombrecurso,
        descripcioncurso=descripcioncurso,
    )

    if imagen:
        # Aquí deberías guardar la imagen en algún lugar y asignar su URL real
        curso.imagen_url = "http://tu-servidor.com/uploads/" + imagen.name  # Simulado

    curso.save()

    return Response({"message": "Curso creado exitosamente", "id": curso.id_curso})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_enrolled_courses(request):
    estudiante = request.user

    # Buscar inscripciones del usuario
    inscripciones = Inscripciones.objects.filter(id_usuario=estudiante).select_related('id_curso', 'id_curso__id_docente')

    cursos_data = []
    for inscripcion in inscripciones:
        curso = inscripcion.id_curso
        docente_info = "Desconocido"

        # Verificar si existe un docente para el curso
        if curso.id_docente:
            try:
                # Acceder a la tabla Docente
                docente = Docente.objects.get(usuario=curso.id_docente)
                docente_info = f"{docente.nombre} {docente.apellidopaterno}"
            except Docente.DoesNotExist:
                pass  # Si no se encuentra el docente, dejamos "Desconocido"

        if curso:
            cursos_data.append({
                "id": curso.id_curso,
                "title": curso.nombrecurso,
                "description": curso.descripcioncurso,
                "image": curso.imagen_url,
                "author": docente_info  # Ahora mostramos la información del docente correctamente
            })

    return Response(cursos_data)



@api_view(['GET'])
def get_all_courses(request):
    cursos = Curso.objects.select_related('id_docente').all()
    data = []

    for curso in cursos:
        docente_info = "Desconocido"
        try:
            docente = Docente.objects.get(usuario=curso.id_docente)
            docente_info = f"{docente.nombre} {docente.apellidopaterno}"
        except Docente.DoesNotExist:
            pass

        data.append({
            "id": curso.id_curso,
            "title": curso.nombrecurso,
            "description": curso.descripcioncurso,
            "image": curso.imagen_url,
            "author": docente_info
        })

    return Response(data)

@api_view(['GET'])
def get_course_details(request, course_id):
    try:
        curso = Curso.objects.get(id_curso=course_id)
        docente_info = "Desconocido"
        if curso.id_docente:
            try:
                docente = Docente.objects.get(usuario=curso.id_docente)
                docente_info = f"{docente.nombre} {docente.apellidopaterno}"
            except Docente.DoesNotExist:
                pass

        course_data = {
            "id": curso.id_curso,
            "title": curso.nombrecurso,
            "description": curso.descripcioncurso,
            "image": curso.imagen_url,
            "author": docente_info,
            "rating": curso.calificacion or 0
        }

        return Response(course_data)
    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado"}, status=404)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def inscribir_curso(request):
    estudiante = request.user
    curso_id = request.data.get("curso_id")

    try:
        curso = Curso.objects.get(id_curso=curso_id)
    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado"}, status=404)

    # Verificar si ya está inscrito
    if Inscripciones.objects.filter(id_usuario=estudiante, id_curso=curso).exists():
        return Response({"error": "Ya estás inscrito en este curso"}, status=400)

    # Crear inscripción
    Inscripciones.objects.create(id_usuario=estudiante, id_curso=curso)
    return Response({"message": "Inscripción exitosa"})



@api_view(['GET'])
def get_teachers_with_courses(request):
    docentes_con_cursos = Curso.objects.exclude(id_docente=None).values_list('id_docente', flat=True).distinct()
    docentes = Docente.objects.filter(usuario_id__in=docentes_con_cursos)

    data = []
    for docente in docentes:
        data.append({
            "id": docente.usuario.id,
            "name": f"{docente.nombre} {docente.apellidopaterno} {docente.apellidomaterno}",
            "image": docente.usuario.fotoperfil or "https://via.placeholder.com/150"
        })

    return Response(data)

