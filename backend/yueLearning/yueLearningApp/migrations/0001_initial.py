# Generated by Django 5.1.5 on 2025-03-18 01:16

import django.db.models.deletion
import uuid
import yueLearningApp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id_curso', models.AutoField(db_column='ID_Curso', primary_key=True, serialize=False)),
                ('nombrecurso', models.CharField(blank=True, db_column='NombreCurso', max_length=100, null=True)),
                ('descripcioncurso', models.TextField(blank=True, db_column='DescripcionCurso', null=True)),
                ('calificacion', models.DecimalField(blank=True, db_column='Calificacion', decimal_places=1, max_digits=2, null=True)),
                ('listavideos', models.JSONField(blank=True, db_column='ListaVideos', null=True)),
                ('listarecursos', models.JSONField(blank=True, db_column='ListaRecursos', null=True)),
            ],
            options={
                'db_table': 'curso',
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('correoelectronico', models.EmailField(max_length=254, unique=True)),
                ('contrasena', models.CharField(max_length=255)),
                ('fotoperfil', models.CharField(blank=True, max_length=100, null=True)),
                ('estatuscorreo', models.CharField(blank=True, default='No verificado', max_length=15, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, related_name='usuario_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='usuario_permission_set', to='auth.permission')),
            ],
            options={
                'db_table': 'usuario',
            },
        ),
        migrations.CreateModel(
            name='Inscripciones',
            fields=[
                ('id_inscripcion', models.AutoField(db_column='ID_Inscripcion', primary_key=True, serialize=False)),
                ('id_curso', models.ForeignKey(blank=True, db_column='ID_Curso', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.curso')),
                ('id_usuario', models.ForeignKey(blank=True, db_column='ID_Usuario', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.usuario')),
            ],
            options={
                'db_table': 'inscripciones',
            },
        ),
        migrations.CreateModel(
            name='Estudiantes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(max_length=50, unique=True)),
                ('nivelconocimiento', models.CharField(blank=True, max_length=12, null=True)),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='yueLearningApp.usuario')),
            ],
            options={
                'db_table': 'estudiantes',
            },
        ),
        migrations.CreateModel(
            name='EmailVerificationToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('fecha_expiracion', models.DateTimeField(default=yueLearningApp.models.default_expiration)),
                ('usuario_id', models.ForeignKey(db_column='ID_Usuario', on_delete=django.db.models.deletion.CASCADE, to='yueLearningApp.usuario')),
            ],
            options={
                'db_table': 'email_verification_tokens',
            },
        ),
        migrations.CreateModel(
            name='Docente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=50, null=True)),
                ('apellidopaterno', models.CharField(blank=True, max_length=50, null=True)),
                ('apellidomaterno', models.CharField(blank=True, max_length=50, null=True)),
                ('correoalternativo', models.CharField(blank=True, max_length=100, null=True)),
                ('numerocelular', models.CharField(blank=True, max_length=15, null=True)),
                ('descripcionperfil', models.TextField(blank=True, null=True)),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='yueLearningApp.usuario')),
            ],
            options={
                'db_table': 'docente',
            },
        ),
        migrations.AddField(
            model_name='curso',
            name='id_docente',
            field=models.ForeignKey(blank=True, db_column='ID_Usuario', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.usuario'),
        ),
        migrations.CreateModel(
            name='Calificaciones',
            fields=[
                ('id_calificacion', models.AutoField(db_column='ID_Calificacion', primary_key=True, serialize=False)),
                ('calificacion', models.DecimalField(blank=True, db_column='Calificacion', decimal_places=1, max_digits=2, null=True)),
                ('id_curso', models.ForeignKey(blank=True, db_column='ID_Curso', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.curso')),
                ('id_usuario', models.ForeignKey(blank=True, db_column='ID_Usuario', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.usuario')),
            ],
            options={
                'db_table': 'calificaciones',
            },
        ),
    ]
