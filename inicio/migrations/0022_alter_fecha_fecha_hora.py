# Generated by Django 5.0.6 on 2024-09-18 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0021_fecha_fecha_hora_alter_fecha_final_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fecha',
            name='fecha_hora',
            field=models.DateTimeField(editable=False),
        ),
    ]
