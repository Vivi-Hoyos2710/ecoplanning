from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = ["nombre", "apellido"]

    def __str__(self):
        return self.nombre + " " + self.apellido
