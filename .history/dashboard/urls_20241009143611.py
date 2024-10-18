from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('dashboard/', views.dashboard, name="dashboard"),
    path('signout/', views.signout, name="signout"),
    path('configuracion/<int:id>/', views.configuracion, name="configuracion"),
    path('calendario/', views.calendario, name="calendario"),
    path('politicas-de-privacidad/', views.politicas_de_privacidad, name="politicas-de-privacidad"),
    path('terminos-y-condiciones/', views.terminos_y_condiciones, name="terminos-y-condiciones"),
]