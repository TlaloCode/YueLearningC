from django.urls import path
from . import views
from .views import registrar_estudiante, registrar_docente

urlpatterns = [
    path("", views.index, name="index"),
    path('register-student/', registrar_estudiante, name='registrar_estudiante'),
    path('register-teacher/', registrar_docente, name='registrar_docente'),
]