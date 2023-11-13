import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import CoordinateFactory, StationFactory
from ecoparking.models import Station
from ecoparking.views import StationView


@pytest.mark.django_db(databases=["default"])
class TestStationView:
    def test_get_station_list_success(self, request_factory):
        view = StationView.as_view({"get": "list"})

        stations = StationFactory.create_batch(3)
        url = reverse("station-list")
        request = request_factory.get(url)

        response = view(request)
        assert response.status_code == 200
        for res, station in zip(response.data, list(stations)):
            assert res["id"] == station.id
            assert res["name"] == station.name
            assert res["coordinate"] == station.coordinate.id

    def test_create_station_success(self, request_factory, admin_user, station_request):
        view = StationView.as_view({"post": "create"})

        url = reverse("station-list")
        request = request_factory.post(url, station_request)
        force_authenticate(request, user=admin_user)

        response = view(request)

        assert response.status_code == 201
        assert response.data["name"] == station_request["name"]
        assert response.data["coordinate__longitude"] == float(
            station_request["longitude"]
        )
        assert response.data["coordinate__latitude"] == float(
            station_request["latitude"]
        )

    def test_create_station_failure(self, request_factory, admin_user, station_request):
        coordinate = CoordinateFactory(longitude=3.14, latitude=3.14)
        StationFactory(name="station", coordinate=coordinate)
        view = StationView.as_view({"post": "create"})

        url = reverse("station-list")
        request = request_factory.post(url, station_request)
        force_authenticate(request, user=admin_user)

        response = view(request)

        assert response.status_code == 400
        assert response.data["name"] == "This station already exists"

    def test_create_station_failure_2(self, request_factory, user, station_request):
        coordinate = CoordinateFactory(longitude=3.14, latitude=3.14)
        StationFactory(name="station", coordinate=coordinate)
        view = StationView.as_view({"post": "create"})

        url = reverse("station-list")
        request = request_factory.post(url, station_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )

    def test_edit_station_success(self, request_factory, admin_user, station_request):
        station = StationFactory()
        view = StationView.as_view({"put": "update"})

        # Update the station using the same station_request data
        url = reverse("station-detail", args=[station.id])
        request = request_factory.put(url, station_request)
        force_authenticate(request, user=admin_user)

        response = view(
            request, pk=station.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 200
        assert response.data["name"] == station_request["name"]
        assert response.data["coordinate__longitude"] == float(
            station_request["longitude"]
        )
        assert response.data["coordinate__latitude"] == float(
            station_request["latitude"]
        )

    def test_edit_station_failure(self, request_factory, user, station_request):
        station = StationFactory()
        view = StationView.as_view({"put": "update"})

        # Update the station using the same station_request data
        url = reverse("station-detail", args=[station.id])
        request = request_factory.put(url, station_request)
        force_authenticate(request, user=user)

        response = view(
            request, pk=station.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )

    def test_delete_station_success(self, request_factory, admin_user):
        station = StationFactory()  # Create a sample Station instance
        view = StationView.as_view({"delete": "destroy"})

        # Delete the station
        url = reverse("station-detail", args=[station.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=admin_user)

        response = view(
            request, pk=station.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 204
        assert not Station.objects.filter(pk=station.id).exists()

    def test_delete_station_failure(self, request_factory, user):
        station = StationFactory()  # Create a sample Station instance
        view = StationView.as_view({"delete": "destroy"})

        # Delete the station
        url = reverse("station-detail", args=[station.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=user)

        response = view(
            request, pk=station.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )
