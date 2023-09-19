from factory.django import DjangoModelFactory
from factory import Sequence

from .models import User


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    email = Sequence(lambda x: f"user_{x}@example.com")
    first_name = Sequence(lambda x: f"first_name_{x}")
    last_name = Sequence(lambda x: f"last_name_{x}")
