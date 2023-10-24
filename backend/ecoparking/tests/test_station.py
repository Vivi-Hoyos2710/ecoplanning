import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import CoordinateFactory, StationFactory
from ecoparking.views import StationView


@pytest.mark.django_db(databases=["default"])
class TestStationView:
    def test_get_station_list_success(self, request_factory, user):
        view = StationView.as_view({"get": "list"})

        stations = StationFactory.create_batch(3)
        url = reverse("station-list")
        request = request_factory.get(url)
        force_authenticate(request, user=user)

        response = view(request)
        assert response.status_code == 200
        for res, station in zip(response.data, list(stations)):
            assert res["id"] == station.id
            assert res["name"] == station.name
            assert res["coordinate"] == station.coordinate.id

    def test_create_station_success(self, request_factory, user, station_request):
        view = StationView.as_view({"post": "create"})

        url = reverse("station-list")
        request = request_factory.post(url, station_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 201
        assert response.data["name"] == station_request["name"]
        assert response.data["coordinate__longitude"] == float(
            station_request["longitude"]
        )
        assert response.data["coordinate__latitude"] == float(
            station_request["latitude"]
        )

    def test_create_station_failure(self, request_factory, user, station_request):
        coordinate = CoordinateFactory(longitude=3.14, latitude=3.14)
        StationFactory(name="station", coordinate=coordinate)
        view = StationView.as_view({"post": "create"})

        url = reverse("station-list")
        request = request_factory.post(url, station_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 400
        assert response.data["name"] == "This station already exist"
