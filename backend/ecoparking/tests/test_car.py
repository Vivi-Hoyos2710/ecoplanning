import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import CarFactory
from ecoparking.views import CarView


@pytest.mark.django_db(databases=["default"])
class TestCarView:
    def test_get_car_list_success(self, request_factory, user):
        view = CarView.as_view({"get": "list"})

        cars = CarFactory.create_batch(3)
        url = reverse("car-list")
        request = request_factory.get(url)
        force_authenticate(request, user=user)

        response = view(request)
        assert response.status_code == 200
        for res, car in zip(response.data, list(cars)):
            assert res["id"] == car.id
            assert res["license_plate"] == car.license_plate
            assert res["brand__name"] == car.brand.name
            assert res["model__name"] == car.model.name

    def test_create_car_success(self, request_factory, user, car_request):
        view = CarView.as_view({"post": "create"})

        url = reverse("car-list")
        request = request_factory.post(url, car_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 201
        assert response.data["license_plate"] == car_request["license_plate"]
        assert response.data["brand"] == car_request["brand"]
        assert response.data["model"] == car_request["model"]
        assert response.data["user"] == car_request["user"]
