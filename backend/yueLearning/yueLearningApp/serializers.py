from rest_framework import serializers
from .models import Estudiantes, Docente

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes
        fields = ['nickname', 'correoelectronico', 'contrasena', 'estatuscorreo']
        extra_kwargs = {'estatusCorreo': {'read_only': True}}  # No permitir que el usuario modifique el estado del correo

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = ['nombre', 'apellidopaterno', 'apellidomaterno', 'correoelectronico','contrasena','estatusCorreo']
        extra_kwargs = {'estatusCorreo': {'read_only': True}}  # No permitir que el usuario modifique el estado del correo
