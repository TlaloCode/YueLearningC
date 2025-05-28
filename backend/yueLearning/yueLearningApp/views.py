import hashlib
import re
import io
import os
import uuid
import tempfile
import requests
import httplib2
import json
from decouple import config
from django.http import JsonResponse
from math import ceil
from io import BytesIO
from django.db.models import Q
from django.conf import settings
from django.db.models import Avg
from datetime import timedelta
from rest_framework import status
from django.shortcuts import render
from django.core.mail import send_mail
from django.utils.timezone import now
from django.core.files.storage import default_storage
from django.http import HttpResponse
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Usuario, Estudiantes, Docente, EmailVerificationToken, Curso, Inscripciones, Video, RecursoApoyo, Calificaciones, Problema,CalificacionCurso
from .models import Cuestionario, Pregunta, Opcion
from .serializers import UsuarioSerializer, EstudianteSerializer, DocenteSerializer
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from googleapiclient.http import MediaFileUpload
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .drive_service import upload_file_to_drive, build_service


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
    print(data)
    rol = data.get("rol")  # Puede ser 'estudiante' o 'docente'

    if rol not in ["estudiante", "docente"]:
        return Response({"error": "Rol no válido."}, status=status.HTTP_400_BAD_REQUEST)

    error_contrasena = validar_contrasena(data.get('contrasena'))
    if error_contrasena:
        return Response({"error": error_contrasena}, status=status.HTTP_400_BAD_REQUEST)

    if not data.get("contrasena") == data.get("confirm_password") :
        print("Hola")
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
    verification_link = f"https://yuelearningc-production.up.railway.app/api/verify-email/?token={token}"
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
    if not usuario:
        return Response({"error": "Correo o contraseña incorrectos."},
        status=status.HTTP_400_BAD_REQUEST)

    if usuario.estatuscorreo != "Verificado":
        return Response({"error": "Debes verificar tu correo antes de iniciar sesión."},
        status=status.HTTP_403_FORBIDDEN)

    if not usuario.check_password(password):
        return Response({"error": "Correo o contraseña incorrectos."},
        status=status.HTTP_400_BAD_REQUEST)
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

@api_view(['POST'])
def recuperar_contrasena(request):
    correo = request.data.get("correo")

    if not correo:
        return Response({"error": "Debes proporcionar un correo electrónico."}, status=400)

    try:
        # 1. Buscar el usuario por correo
        usuario = Usuario.objects.get(correoelectronico=correo)
        usuario_id = usuario.id

        # 2. Verificar si es estudiante
        if Estudiantes.objects.filter(usuario_id=usuario_id).exists():
            estudiante = Estudiantes.objects.get(usuario_id=usuario_id)
            contrasena = estudiante.contrasena

        # 3. Verificar si es docente
        elif Docente.objects.filter(usuario_id=usuario_id).exists():
            docente = Docente.objects.get(usuario_id=usuario_id)
            contrasena = docente.contrasena

        else:
            return Response({"error": "No se encontró el perfil del usuario."}, status=404)

        # 4. Enviar la contraseña por correo
        send_mail(
            subject="Recuperación de contraseña - YueLearningC",
            message=f"Tu contraseña actual es: {contrasena}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[correo],
            fail_silently=False,
        )

        return Response({"message": "La contraseña ha sido enviada a tu correo."}, status=200)

    except Usuario.DoesNotExist:
        return Response({"error": "El correo ingresado no está registrado en la plataforma."}, status=404)

    except Exception as e:
        return Response({"error": f"Error al enviar el correo: {str(e)}"}, status=500)

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
def buscar_cursos(request):
    query = request.GET.get("q", "").strip()

    if not query:
        return Response([])  # Si no hay búsqueda, devuelve vacío

    cursos = Curso.objects.filter(
        Q(nombrecurso__icontains=query) |
        Q(id_docente__docente__nombre__icontains=query)  # Si el campo en Docente se llama 'nombre'
    ).select_related("id_docente")[:10]  # Limita a 10 resultados

    resultado = [
        {
            "id": curso.id_curso,
            "nombrecurso": curso.nombrecurso,
            "nombre_docente": curso.id_docente.docente.nombre
        }
        for curso in cursos
    ]

    return Response(resultado)

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
    elif not file.content_type.startswith("image/"):
        return Response({"error": "Solo se permiten archivos de imagen."}, status=status.HTTP_400_BAD_REQUEST)
    elif file.size > 1 * 1024 * 1024:  # 1 MB en bytes
        return Response({"error": "La imagen es muy grande."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Subir directamente el archivo
        file_id = upload_file_to_drive(file, file.name)
        usuario.fotoperfil = file_id
        usuario.save()

        return Response({"fotoPerfil": file_id}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"❌ Error al subir imagen: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_photo(request):
    try:
        usuario = request.user
        file_id = usuario.fotoperfil


        if not file_id or "drive.google.com" in file_id or "data:image" in file_id:
            return Response({"error": "No se encontró imagen válida."}, status=404)

        # Obtener la imagen directamente desde Google Drive
        drive_url = f"https://drive.google.com/uc?export=download&id={file_id}"
        response = requests.get(drive_url)


        if response.status_code == 200:
            return HttpResponse(response.content, content_type="image/jpeg")
        else:
            return Response({"error": "No se pudo obtener la imagen desde Drive."}, status=500)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

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
        if not imagen.content_type.startswith("image/"):
            return Response({"error": "Solo se permiten archivos de imagen."}, status=400)

        try:
            file_stream = io.BytesIO(imagen.read())
            file_id = upload_file_to_drive(file_stream, imagen.name)
            curso.imagen_url = file_id
        except Exception as e:
            return Response({"error": f"No se pudo subir la imagen: {str(e)}"}, status=500)

    curso.save()

    return Response({"message": "Curso creado exitosamente", "id": curso.id_curso}, status=200)

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
        videos = Video.objects.filter(id_curso=course_id).values('id_video', 'titulovideo', 'video')
        recursos = RecursoApoyo.objects.filter(id_curso=course_id).values('id_recurso', 'titulorecurso', 'urlrecurso')

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
            "rating": curso.calificacion or 0,
            "videos": list(videos),
            "recursos": list(recursos)
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calificar_curso(request):
    id_curso = request.data.get("id_curso")
    calificacion = request.data.get("calificacion")

    if not id_curso or not calificacion:
        return Response({"error": "Datos incompletos."}, status=400)

    try:
        estudiante = Estudiantes.objects.get(usuario=request.user)
        curso = Curso.objects.get(id_curso=id_curso)

        calificacion = int(calificacion)
        if calificacion < 1 or calificacion > 5:
            return Response({"error": "La calificación debe estar entre 1 y 5 estrellas."}, status=400)

        # Crear o actualizar calificación del estudiante
        CalificacionCurso.objects.update_or_create(
            id_curso=curso,
            id_usuario=estudiante,
            defaults={"calificacion": calificacion}
        )

        # Calcular nuevo promedio y redondear a entero más cercano
        promedio = CalificacionCurso.objects.filter(id_curso=curso).aggregate(avg=Avg("calificacion"))["avg"]
        curso.calificacion = round(promedio)  # ← Solo se guarda el promedio redondeado
        curso.save()

        return Response({"message": "Calificación registrada correctamente."}, status=200)

    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado."}, status=404)
    except Estudiantes.DoesNotExist:
        return Response({"error": "Usuario no es estudiante."}, status=403)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_course_videos(request, course_id):
    try:
        curso = Curso.objects.get(id_curso=course_id)
        # Obtener los videos asociados a este curso
        videos = Video.objects.filter(id_curso=curso).all()

        # Serializar los datos de los videos
        videos_data = []
        for video in videos:
            videos_data.append({
                "id": video.id_video,
                "title": video.titulovideo,
                "description": video.descripcion,
                "video": video.video,  # Aquí va la URL o el enlace del video
            })

        return Response(videos_data)

    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_course_resource(request, course_id):
    try:
        curso = Curso.objects.get(id_curso=course_id)
        # Obtener los videos asociados a este curso
        recursos = RecursoApoyo.objects.filter(id_curso=curso).all()

        # Serializar los datos de los videos
        resources_data = []
        for recurso in recursos:
            resources_data.append({
                "id": recurso.id_recurso,
                "title": recurso.titulorecurso,
                "recurso": recurso.urlrecurso,  # Aquí va la URL o el enlace del video
            })

        return Response(resources_data)

    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado"}, status=404)


@api_view(['GET'])
def get_teacher_photo(request, file_id):
    try:
        print(file_id)
        drive_url = f"https://drive.google.com/uc?export=download&id={file_id}"
        response = requests.get(drive_url)

        if response.status_code == 200:
            return HttpResponse(response.content, content_type="image/jpeg")
        else:
            return Response({"error": "No se pudo descargar la imagen"}, status=500)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def subir_video(request, id_curso):
    titulo = request.data.get("titulo")
    descripcion = request.data.get("descripcion")
    archivo = request.FILES.get("video")

    if not archivo:
        return Response({"error": "No se seleccionó ningún archivo."}, status=400)
    if archivo.size > 524288000:  # 500MB
        return Response({"error": "El archivo es demasiado grande."}, status=400)

    try:
        # Convertir archivo de Django a stream
        file_stream = io.BytesIO(archivo.read())

        # Configurar credenciales
        service = build_service()  # Usa tu función que construye el servicio con las credenciales

        file_metadata = {
            'name': archivo.name,
        }

        media = MediaIoBaseUpload(
            file_stream,
            mimetype=archivo.content_type,
            chunksize=256 * 1024,  # 256 KB
            resumable=True
        )

        request_drive = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        )

        response = None
        while response is None:
            status, response = request_drive.next_chunk()

        file_id = response.get("id")
        # Hacer público el video en Drive
        service.permissions().create(
            fileId=file_id,
            body={
                "role": "reader",
                "type": "anyone"
            },
            fields="id"
        ).execute()

        # Guardar en base de datos
        curso = Curso.objects.get(id_curso=id_curso)
        Video.objects.create(
            id_curso=curso,
            titulovideo=titulo,
            descripcion=descripcion,
            video=file_id
        )

        return Response({"message": "Video subido y registrado correctamente", "file_id": file_id})

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_video(request, id_video):
    try:
        video = Video.objects.get(id_video=id_video)

        # Primero eliminar de Google Drive (opcional)
        try:
            credentials = service_account.Credentials.from_service_account_file(
                'credentials/service_account.json',
                scopes=['https://www.googleapis.com/auth/drive']
            )
            service = build('drive', 'v3', credentials=credentials)

            # Aquí 'video.video' es el file_id
            service.files().delete(fileId=video.video).execute()
        except Exception as drive_error:
            print(f"⚠️ No se pudo eliminar el archivo de Drive: {drive_error}")

        # Ahora eliminar de la base de datos
        video.delete()

        return Response({"message": "Video eliminado correctamente."}, status=200)

    except Video.DoesNotExist:
        return Response({"error": "Video no encontrado."}, status=404)
    except Exception as e:
        print("❌ Error al eliminar video:", str(e))
        return Response({"error": str(e)}, status=500)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editar_video(request, id_video):
    try:
        video = Video.objects.get(id_video=id_video)
        if video.id_curso.id_docente != request.user:
            return Response({"error": "No tienes permiso para editar este video."}, status=403)

        titulo = request.data.get("titulo")
        descripcion = request.data.get("descripcion")
        nuevo_video = request.FILES.get("video")

        if titulo:
            video.titulovideo = titulo
        if descripcion:
            video.descripcion = descripcion

        if nuevo_video:
            from .drive_service import upload_file_to_drive
            file_id = upload_file_to_drive(nuevo_video, nuevo_video.name)

            # Opcional: eliminar el anterior de Drive si deseas
            video.video = file_id

        video.save()
        return Response({"message": "Video actualizado correctamente."})
    except Video.DoesNotExist:
        return Response({"error": "Video no encontrado."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def get_video_detail(request, id_video):
    try:
        video = Video.objects.get(id_video=id_video)
        return Response({
            "id": video.id_video,
            "titulo": video.titulovideo,
            "descripcion": video.descripcion,
            "file_id": video.video
        })
    except Video.DoesNotExist:
        return Response({"error": "Video no encontrado"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def subir_recurso(request, id_curso):
    try:
        titulo = request.data.get('titulo')
        descripcion = request.data.get('descripcion')
        archivo = request.FILES.get('archivo')

        if not archivo:
            return Response({"error": "No se seleccionó ningún archivo."}, status=400)
        if archivo.size > 524288000:  # Límite de 500MB
            return Response({"error": "El archivo es demasiado grande."}, status=400)

        # Subir el archivo a Google Drive (automáticamente detecta tipo MIME)
        file_id = upload_file_to_drive(archivo, archivo.name)

        # Guardar en base de datos
        curso = Curso.objects.get(id_curso=id_curso)
        RecursoApoyo.objects.create(
            id_curso=curso,
            titulorecurso=titulo,
            urlrecurso=file_id
        )

        return Response({"message": "Recurso subido y registrado correctamente.", "file_id": file_id})

    except Exception as e:
        print("Error en subir_recurso:", e)
        return Response({"error": str(e)}, status=500)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_recurso(request, id_recurso):
    try:
        recurso = RecursoApoyo.objects.get(id_recurso=id_recurso)

        # Eliminar archivo de Google Drive
        try:
            credentials = service_account.Credentials.from_service_account_file(
                'credentials/service_account.json',
                scopes=['https://www.googleapis.com/auth/drive']
            )
            service = build('drive', 'v3', credentials=credentials)

            service.files().delete(fileId=recurso.urlrecurso).execute()
        except Exception as drive_error:
            print(f"⚠️ No se pudo eliminar el archivo de Drive: {drive_error}")

        # Ahora eliminar de la base de datos
        recurso.delete()

        return Response({"message": "Recurso eliminado correctamente."}, status=200)

    except RecursoApoyo.DoesNotExist:
        return Response({"error": "Recurso no encontrado."}, status=404)
    except Exception as e:
        print("❌ Error al eliminar recurso:", str(e))
        return Response({"error": str(e)}, status=500)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editar_recurso(request, id_recurso):
    try:
        recurso = RecursoApoyo.objects.get(id_recurso=id_recurso)
        if recurso.id_curso.id_docente != request.user:
            return Response({"error": "No tienes permiso para editar este recurso."}, status=403)

        titulo = request.data.get("titulo")
        descripcion = request.data.get("descripcion")
        nuevo_archivo = request.FILES.get("archivo")

        if titulo:
            recurso.titulorecurso = titulo
        if descripcion:
            recurso.descripcion = descripcion

        if nuevo_archivo:
            from .drive_service import upload_file_to_drive
            file_id = upload_file_to_drive(nuevo_archivo, nuevo_archivo.name)
            recurso.recurso = file_id

        recurso.save()
        return Response({"message": "Recurso actualizado correctamente."})
    except RecursoApoyo.DoesNotExist:
        return Response({"error": "Recurso no encontrado."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def inscritos_por_curso(request, id_curso):
    inscritos = (
        Inscripciones.objects
        .filter(id_curso=id_curso)
        .select_related('id_usuario')
    )
    data = []
    for insc in inscritos:
        try:
            estudiante = Estudiantes.objects.get(usuario=insc.id_usuario)
            data.append({"nickname": estudiante.nickname})
        except Estudiantes.DoesNotExist:
            continue
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def notificar_actualizacion(request, id_curso):
    mensaje_docente = request.data.get("mensaje")

    if not mensaje_docente:
        return Response({"error": "Debes proporcionar un mensaje."}, status=400)

    try:
        curso = Curso.objects.get(id_curso=id_curso)

        if curso.id_docente != request.user:
            return Response({"error": "No tienes permiso para notificar este curso."}, status=403)

        inscripciones = Inscripciones.objects.filter(id_curso=curso).select_related("id_usuario")
        correos = [i.id_usuario.correoelectronico for i in inscripciones if i.id_usuario.correoelectronico]

        if not correos:
            return Response({"message": "No hay estudiantes inscritos en este curso."})

        asunto = f"📘 Actualización en el curso: {curso.nombrecurso}"
        mensaje = (
            f"Hola estudiante,\n\n"
            f"Hay una nueva actualización en el curso \"{curso.nombrecurso}\".\n\n"
            f"Mensaje del docente:\n{mensaje_docente}\n\n"
            f"Por favor, revisa la plataforma para más detalles.\n\n"
            f"Atentamente,\nYUE-Learning C"
        )

        send_mail(
            subject=asunto,
            message=mensaje,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=correos,
            fail_silently=False,
        )

        return Response({"message": "Notificación enviada por correo a los estudiantes inscritos."})

    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado."}, status=404)

@api_view(['GET'])
def obtener_preguntas_por_curso(request, courseId):
    #Obtener las preguntas que estas relacionadas al curso
    cuestionarios = Cuestionario.objects.filter(id_curso=courseId)

    data = []
    #Buscar entre las preguntas las asociadas al cuestionario
    for cuestionario in cuestionarios:
        preguntas = Pregunta.objects.filter(id_cuestionario=cuestionario)
        preguntas_data = []
        #Construir la respuesta con las preguntas y sus opciones
        for pregunta in preguntas:
            opciones = Opcion.objects.filter(id_pregunta=pregunta)
            preguntas_data.append({
                "id_pregunta": pregunta.id_pregunta,
                "textopregunta": pregunta.textopregunta,
                "opciones": [
                    {
                        "id_opciones": opcion.id_opciones,
                        "textoopcion": opcion.textoopcion  # Asume que agregaste este campo
                    }
                    for opcion in opciones
                ]
            })

        data.append({
            "id_cuestionario": cuestionario.id_cuestionario,
            "titulo": cuestionario.titulocuestionario,
            "preguntas": preguntas_data
        })

    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_diagnostico(request):
    try:
        cuestionario = Cuestionario.objects.get(es_diagnostico=True)
    except Cuestionario.DoesNotExist:
        return Response({"error": "No se encontró el cuestionario diagnóstico."}, status=404)

    preguntas = Pregunta.objects.filter(id_cuestionario=cuestionario)
    preguntas_data = []

    for pregunta in preguntas:
        opciones = Opcion.objects.filter(id_pregunta=pregunta)
        preguntas_data.append({
            "id_pregunta": pregunta.id_pregunta,
            "textopregunta": pregunta.textopregunta,
            "opciones": [
                {
                    "id_opciones": opcion.id_opciones,
                    "textoopcion": opcion.textoopcion  # Este campo debe existir
                }
                for opcion in opciones
            ]
        })

    return Response({
        "id_cuestionario": cuestionario.id_cuestionario,
        "titulo": cuestionario.titulocuestionario,
        "preguntas": preguntas_data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calificar_respuestas(request):
    #Obtener las preguntas contestadas junto con su respuesta
    respuestas = request.data.get("respuestas", {})  # { ID_Pregunta: ID_OpcionSeleccionada }
    curso_id = request.data.get("curso", None)
    usuario = request.user
    correctas = 0
    total = 0
    #Verificar en la base de datos cuales preguntas son correctas y contarlas para la puntuación
    for id_pregunta, id_opcion in respuestas.items():
        try:
            opcion = Opcion.objects.get(id_opciones=id_opcion, id_pregunta=id_pregunta)
            if opcion.es_correcta:
                correctas += 1
            total += 1
        except Opcion.DoesNotExist:
            continue
    #Excepcion por si se envió el cuestionario sin resolver
    if total == 0:
        return Response({"error": "No se enviaron respuestas válidas."}, status=400)
    calificacion = round((correctas / total) * 10, 1)

    # 🔁 Si es diagnóstico
    if curso_id is None:
        # Diagnóstico: asignar nivel al estudiante
        try:
            estudiante = Estudiantes.objects.get(usuario=usuario)
        except Estudiantes.DoesNotExist:
            return Response({"error": "Usuario no registrado como estudiante."}, status=404)

        if calificacion >= 8:
            nivel = "Avanzado"
        elif calificacion >= 6:
            nivel = "Intermedio"
        else:
            nivel = "Básico"

        estudiante.nivelconocimiento = nivel
        estudiante.save()

        Calificaciones.objects.update_or_create(
            id_usuario=usuario,
            id_curso=None,
            defaults={"calificacion": calificacion}
        )
    else:
        try:
            curso = Curso.objects.get(id_curso=curso_id)
        except Curso.DoesNotExist:
            return Response({"error": "Curso no encontrado."}, status=404)

        Calificaciones.objects.update_or_create(
            id_usuario=usuario,
            id_curso=curso,
            defaults={"calificacion": calificacion}
        )

    detalle_respuestas = []
    for id_pregunta, id_opcion in respuestas.items():
        try:
            correcta = Opcion.objects.get(id_pregunta=id_pregunta, es_correcta=True)
            detalle_respuestas.append({
                "id_pregunta": int(id_pregunta),
                "id_seleccionada": int(id_opcion),
                "id_correcta": correcta.id_opciones
            })
        except:
            continue

    return Response({
        "calificacion": calificacion,
        "detalle": detalle_respuestas
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_problemas_por_curso(request, id_curso):
    problemas = Problema.objects.filter(id_curso=id_curso).order_by('id_problema')

    data = [
        {
            "id_problema": p.id_problema,
            "tituloproblema": p.tituloproblema,
            "descripcion": p.descripcion,
            "solucion": p.solucion,
        }
        for p in problemas
    ]

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_podio(request):
    usuario_actual_id = request.user.id

    # Obtener promedios de usuarios que tienen calificación
    promedios_dict = {
        item['id_usuario']: item['promedio']
        for item in Calificaciones.objects
        .values('id_usuario')
        .annotate(promedio=Avg('calificacion'))
    }

    estudiantes = Estudiantes.objects.select_related('usuario').all()
    lista_podio = []

    for estudiante in estudiantes:
        promedio = promedios_dict.get(estudiante.usuario.id, 0.0)

        lista_podio.append({
            "id_usuario": estudiante.usuario.id,
            "nombre": estudiante.nickname,
            "imagen": estudiante.usuario.fotoperfil or "",
            "promedio": round(promedio, 2),
        })

    # Ordenar descendente por promedio
    lista_podio.sort(key=lambda x: x["promedio"], reverse=True)

    # Agregar posición
    for i, estudiante in enumerate(lista_podio, start=1):
        estudiante["lugar"] = i

    # Buscar posición del usuario actual
    mi_posicion = next((item for item in lista_podio if item["id_usuario"] == usuario_actual_id), None)

    return Response({
        "top": lista_podio[:10],
        "mi_posicion": mi_posicion
    })

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editar_curso(request, id):
    try:
        curso = Curso.objects.get(id_curso=id, id_docente=request.user)
    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado o no autorizado."}, status=404)

    nombre = request.data.get("nombrecurso", curso.nombrecurso)
    imagen = request.FILES.get("imagen", None)

    curso.nombrecurso = nombre

    if imagen:
        try:
            file_id = upload_file_to_drive(imagen, imagen.name)
            curso.imagen_url = file_id
        except Exception as e:
            return Response({"error": f"No se pudo subir la imagen: {str(e)}"}, status=500)

    curso.save()
    return Response({"message": "Curso actualizado con éxito."})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_curso(request, id):
    try:
        curso = Curso.objects.get(id_curso=id, id_docente=request.user)
    except Curso.DoesNotExist:
        return Response({"error": "Curso no encontrado o no autorizado."}, status=404)

    # Elimina videos y recursos del curso
    Video.objects.filter(id_curso=curso).delete()
    RecursoApoyo.objects.filter(id_curso=curso).delete()
    Inscripciones.objects.filter(id_curso=curso).delete()
    Calificaciones.objects.filter(id_curso=curso).delete()

    curso.delete()
    return Response({"message": "Curso eliminado correctamente."})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_cuenta(request):
    usuario = request.user

    try:
        # Si es estudiante
        if Estudiantes.objects.filter(usuario=usuario).exists():
            Estudiantes.objects.filter(usuario=usuario).delete()
            Inscripciones.objects.filter(id_usuario=usuario).delete()
            Calificaciones.objects.filter(id_usuario=usuario).delete()
            EmailVerificationToken.objects.filter(usuario_id=usuario).delete()
            usuario.delete()
            return Response({"message": "Cuenta de estudiante eliminada correctamente."}, status=200)

        # Si es docente
        elif Docente.objects.filter(usuario=usuario).exists():
            cursos = Curso.objects.filter(id_docente=usuario)

            for curso in cursos:
                Video.objects.filter(id_curso=curso).delete()
                RecursoApoyo.objects.filter(id_curso=curso).delete()
                Inscripciones.objects.filter(id_curso=curso).delete()

            cursos.delete()
            Docente.objects.filter(usuario=usuario).delete()
            EmailVerificationToken.objects.filter(usuario_id=usuario).delete()
            usuario.delete()
            return Response({"message": "Cuenta de docente eliminada correctamente."}, status=200)

        return Response({"error": "Usuario no encontrado."}, status=404)

    except Exception as e:
        return Response({"error": str(e)}, status=500)