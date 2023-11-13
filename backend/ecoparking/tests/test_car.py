import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import AppModelFactory, BrandFactory, CarFactory
from ecoparking.models import Car
from ecoparking.views import CarView


@pytest.mark.django_db(databases=["default"])
class TestCarView:
    def test_get_car_list_success(self, request_factory, user):
        view = CarView.as_view({"get": "list"})

        cars = CarFactory.create_batch(3, user=user)
        url = reverse("car-list")
        request = request_factory.get(url, {"user": user.id})
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

    def test_create_car_failure(self, request_factory, user, car_request):
        app_model = AppModelFactory()
        brand = BrandFactory()
        CarFactory(
            user=user,
            brand=brand,
            model=app_model,
            license_plate=car_request["license_plate"],
        )
        car_request["brand"] = brand.id
        car_request["app_model"] = brand.id
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

    def test_edit_car_success(self, request_factory, user, car_request):
        car = CarFactory(user=user)
        view = CarView.as_view({"put": "update"})

        # Update the car using the same car_request data
        url = reverse("car-detail", args=[car.id])
        request = request_factory.put(url, car_request)
        force_authenticate(request, user=user)

        response = view(request, pk=car.id)  # Pass the object ID as a keyword argument

        assert response.status_code == 200
        assert response.data["license_plate"] == car_request["license_plate"]
        assert response.data["brand"] == car_request["brand"]
        assert response.data["model"] == car_request["model"]
        assert response.data["user"] == car_request["user"]

    def test_delete_car_success(self, request_factory, user):
        car = CarFactory(user=user)
        view = CarView.as_view({"delete": "destroy"})

        # Delete the car
        url = reverse("car-detail", args=[car.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=user)

        response = view(request, pk=car.id)

        assert response.status_code == 204
        assert not Car.objects.filter(pk=car.id).exists()

    def test_edit_car_failure(self, request_factory, user, car_request):
        car = CarFactory()
        view = CarView.as_view({"put": "update"})

        # Update the car using the same car_request data
        url = reverse("car-detail", args=[car.id])
        request = request_factory.put(url, car_request)
        force_authenticate(request, user=user)

        response = view(request, pk=car.id)  # Pass the object ID as a keyword argument

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )

    def test_delete_car_failure(self, request_factory, user):
        car = CarFactory()
        view = CarView.as_view({"delete": "destroy"})

        # Delete the car
        url = reverse("car-detail", args=[car.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=user)

        response = view(request, pk=car.id)

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )
