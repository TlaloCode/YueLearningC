# Generated by Django 5.1.5 on 2025-03-18 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yueLearningApp', '0002_remove_usuario_contrasena'),
    ]

    operations = [
        migrations.AddField(
            model_name='docente',
            name='contrasena',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='estudiantes',
            name='contrasena',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
