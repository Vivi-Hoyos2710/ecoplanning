import pytest

from ecoparking.factories import AppModelFactory, BrandFactory
from user.factories import UserFactory


@pytest.fixture()
def brand_request():
    return {"id": 2, "name": "brand"}


@pytest.fixture()
def app_model_request():
    brand = BrandFactory()
    return {"id": 2, "name": "app_model", "brand": brand.id, "range": 0}


@pytest.fixture()
def car_request():
    user = UserFactory()
    model = AppModelFactory()
    return {
        "id": 2,
        "license_plate": "LIC123",
        "user": user.id,
        "brand": model.brand.id,
        "model": model.id,
    }


@pytest.fixture()
def station_request():
    return {
        "id": 2,
        "name": "station",
        "longitude": "3.14",
        "latitude": "3.14",
        "address": "address",
    }
