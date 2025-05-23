# Generated by Django 5.1.5 on 2025-05-02 06:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yueLearningApp', '0005_recursoapoyo_video'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cuestionario',
            fields=[
                ('id_cuestionario', models.AutoField(db_column='ID_Cuestionario', primary_key=True, serialize=False)),
                ('titulocuestionario', models.CharField(blank=True, db_column='TituloCuestionario', max_length=100, null=True)),
                ('descripcion', models.TextField(blank=True, db_column='Descripcion', null=True)),
                ('es_diagnostico', models.BooleanField(db_column='EsDiagnostico', default=False)),
                ('id_curso', models.ForeignKey(blank=True, db_column='ID_Curso', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.curso')),
            ],
            options={
                'db_table': 'cuestionarios',
            },
        ),
        migrations.CreateModel(
            name='Pregunta',
            fields=[
                ('id_pregunta', models.AutoField(db_column='ID_Pregunta', primary_key=True, serialize=False)),
                ('textopregunta', models.TextField(blank=True, db_column='TextoPregunta', null=True)),
                ('imagenpregunta', models.CharField(blank=True, db_column='ImagenPregunta', max_length=255, null=True)),
                ('id_cuestionario', models.ForeignKey(blank=True, db_column='ID_Cuestionario', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.cuestionario')),
            ],
            options={
                'db_table': 'preguntas',
            },
        ),
        migrations.CreateModel(
            name='Opcion',
            fields=[
                ('id_opciones', models.AutoField(db_column='ID_Opciones', primary_key=True, serialize=False)),
                ('textoopcion', models.TextField(blank=True, db_column='TextoOpcion', null=True)),
                ('es_correcta', models.BooleanField(db_column='EsCorrecta', default=False)),
                ('id_pregunta', models.ForeignKey(blank=True, db_column='ID_Pregunta', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='yueLearningApp.pregunta')),
            ],
        ),
    ]
