# Generated by Django 5.0.6 on 2024-09-11 00:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0018_fecha_final_fecha_inicio'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='fecha',
            unique_together={('inicio', 'final', 'fecha', 'hora')},
        ),
    ]
