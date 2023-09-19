import pytest

from .factories import UserFactory


@pytest.fixture()
def user():
    return UserFactory()


@pytest.fixture()
def user_request():
    return (
        {
            "id": 2,
            "email": "test@email.com",
            "first_name": "test",
            "last_name": "user",
            "password": "TestPassword",
        },
    )
