from django.urls import path
from . import views
from .views import registrar_usuario , login_usuario, verificar_correo, create_course
from .views import get_user_profile, update_user_profile, upload_profile_photo, get_teacher_courses
from .views import get_enrolled_courses, get_all_courses, get_teachers_with_courses, get_course_details, inscribir_curso

urlpatterns = [
    path("", views.index, name="index"),
    #path('register-student/', registrar_estudiante, name='registrar_estudiante'),
    #path('register-teacher/', registrar_docente, name='registrar_docente'),
    path('register-user/', registrar_usuario, name='registrar_usuario'),
    path('login/', login_usuario, name='login_usuario'),
    path('verify-email/', verificar_correo, name='verificar_correo'),
    path('update-user-profile/', update_user_profile, name='update_user_profile'),
    path('get-user-profile/', get_user_profile, name='get_user_profile'),
    path('upload-profile-photo/', upload_profile_photo, name='upload_profile_photo'),
    path('get-teacher-courses/', get_teacher_courses, name='get_teacher_courses'),
    path('create-course/', create_course, name='create_course'),
    path('get-enrolled-courses/', get_enrolled_courses, name='get_enrolled_courses'),
    path('get-all-courses/', get_all_courses, name='get_all_courses'),
    path('get-teachers-with-courses/', get_teachers_with_courses, name='get_teachers_with_courses'),
    path('get-course-details/<int:course_id>/', get_course_details, name='get_course_details'),
    path('inscribir-curso/', inscribir_curso, name='inscribir_curso'),

]