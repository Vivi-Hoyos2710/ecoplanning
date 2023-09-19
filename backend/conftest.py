import pytest
from user.fixtures import *  # noqa
from rest_framework.test import APIRequestFactory


@pytest.fixture()
def request_factory():
    return APIRequestFactory()
