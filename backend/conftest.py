import pytest
from user.fixtures import *  # noqa
from ecoparking.fixtures import *  # noqa
from rest_framework.test import APIClient, APIRequestFactory


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


@pytest.fixture()
def client():
    return APIClient()
