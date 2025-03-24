from rest_framework import serializers
from .models import Usuario, Estudiantes, Docente

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'correoelectronico', 'contrasena', 'estatuscorreo']
        extra_kwargs = {
            'contrasena': {'write_only': True},  # No exponer contraseñas
            'estatuscorreo': {'read_only': True},  # Solo lectura
        }

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            correoelectronico=validated_data['correoelectronico'],
            password=validated_data['contrasena']
        )
        return user

class EstudianteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Estudiantes
        fields = ['usuario', 'nickname', 'nivelconocimiento']

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario = Usuario.objects.create_user(**usuario_data)
        estudiante = Estudiantes.objects.create(usuario=usuario, **validated_data)
        return estudiante

class DocenteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Docente
        fields = ['usuario', 'nombre', 'apellidopaterno', 'apellidomaterno', 'correoalternativo', 'numerocelular', 'descripcionperfil']

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario = Usuario.objects.create_user(**usuario_data)
        docente = Docente.objects.create(usuario=usuario, **validated_data)
        return docente
