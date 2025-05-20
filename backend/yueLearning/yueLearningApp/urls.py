from django.urls import path
from . import views
from .views import registrar_usuario , login_usuario, verificar_correo, create_course
from .views import get_user_profile, update_user_profile, upload_profile_photo, get_teacher_courses
from .views import get_enrolled_courses, get_all_courses, get_teachers_with_courses, get_course_details, inscribir_curso
from .views import get_course_videos, get_profile_photo, get_teacher_photo, subir_video, get_video_detail
from .views import subir_recurso, get_course_resource, delete_video, delete_recurso, calificar_respuestas
from .views import obtener_preguntas_por_curso, get_diagnostico, get_podio, eliminar_cuenta, recuperar_contrasena
from .views import calificar_curso, buscar_cursos, get_problemas_por_curso

urlpatterns = [
    path("", views.index, name="index"),
    #path('register-student/', registrar_estudiante, name='registrar_estudiante'),
    #path('register-teacher/', registrar_docente, name='registrar_docente'),
    path('register-user/', registrar_usuario, name='registrar_usuario'),
    path('login/', login_usuario, name='login_usuario'),
    path("recuperar-contrasena/", recuperar_contrasena),
    path('verify-email/', verificar_correo, name='verificar_correo'),
    path("buscar-cursos/", buscar_cursos),
    path('update-user-profile/', update_user_profile, name='update_user_profile'),
    path('get-user-profile/', get_user_profile, name='get_user_profile'),
    path('upload-profile-photo/', upload_profile_photo, name='upload_profile_photo'),
    path('profile-photo/', get_profile_photo, name='get_profile_photo'),
    path('get-teacher-courses/', get_teacher_courses, name='get_teacher_courses'),
    path('create-course/', create_course, name='create_course'),
    path('get-enrolled-courses/', get_enrolled_courses, name='get_enrolled_courses'),
    path('get-all-courses/', get_all_courses, name='get_all_courses'),
    path('get-teachers-with-courses/', get_teachers_with_courses, name='get_teachers_with_courses'),
    path('get-course-details/<int:course_id>/', get_course_details, name='get_course_details'),
    path('inscribir-curso/', inscribir_curso, name='inscribir_curso'),
    path('get-videos/<int:course_id>/', get_course_videos, name='get_course_videos'),
    path('teacher-photo/<str:file_id>/', get_teacher_photo, name='get_teacher_photo'),
    path('subir-video/<int:id_curso>/', subir_video, name='subir_video'),
    path('delete-video/<int:id_video>/', delete_video, name='delete_video'),
    path('get-video-detail/<int:id_video>/', get_video_detail, name='get_video_detail'),
    path('subir-recurso/<int:id_curso>/', subir_recurso, name='subir_recurso'),
    path('delete-recurso/<int:id_recurso>/', delete_recurso, name='delete_recurso'),
    path("problemas/<int:id_curso>/", get_problemas_por_curso),
    path('get-course-resource/<int:course_id>/', get_course_resource, name='get_course_resource'),
    path('cuestionarios/<int:courseId>/', obtener_preguntas_por_curso, name='obtener_preguntas_por_curso'),
    path('respuestas/', calificar_respuestas, name='calificar_respuestas'),
    path('diagnostico/', get_diagnostico, name='get_diagnostico'),
    path('podio/', get_podio, name='get_podio'),
    path("calificar-curso/", calificar_curso),
    path("eliminar-cuenta/", eliminar_cuenta),



]