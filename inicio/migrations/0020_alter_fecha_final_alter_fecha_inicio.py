# Generated by Django 5.0.6 on 2024-09-18 00:18

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0019_alter_fecha_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fecha',
            name='final',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='fecha',
            name='inicio',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
    ]
