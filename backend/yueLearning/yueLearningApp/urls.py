from django.urls import path
from . import views
from .views import registrar_estudiante, registrar_docente, login_usuario, verificar_correo

urlpatterns = [
    path("", views.index, name="index"),
    path('register-student/', registrar_estudiante, name='registrar_estudiante'),
    path('register-teacher/', registrar_docente, name='registrar_docente'),
    path('login/', login_usuario, name='login_usuario'),
    path('verify-email/', verificar_correo, name='verificar_correo'),
]