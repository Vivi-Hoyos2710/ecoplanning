import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from .factories import UserFactory
from .views import UserView
from djoser.views import UserViewSet as DjoserUserViewSet


@pytest.mark.django_db(databases=["default"])
class TestUserViewset:
    def test_list_success(self, admin_user, request_factory):
        """Test listing multiple users"""

        view = UserView.as_view({"get": "list"})

        users = UserFactory.create_batch(3)
        url = reverse("user-list")
        request = request_factory.get(url)
        force_authenticate(request, user=admin_user)

        response = view(request)
        assert response.status_code == 200
        for res, test_user in zip(response.data, [admin_user] + list(users)):
            assert res["id"] == test_user.id
            assert res["email"] == test_user.email
            assert res["first_name"] == test_user.first_name
            assert res["last_name"] == test_user.last_name

    def test_create_success(self, user, request_factory, user_request):
        """Test listing multiple users"""

        view = DjoserUserViewSet.as_view({"post": "create"})

        url = reverse("user-list")
        request = request_factory.post(url, data=user_request[0], format="json")
        force_authenticate(request, user=user)

        response = view(request)
        assert response.status_code == 201
        assert response.data["email"] == user_request[0]["email"]
        assert response.data["is_superuser"] is False

    def test_validate_success(self, request_factory, user_request, client):
        """Test listing multiple users"""

        url = "/user/validation/"
        response = client.post(url, user_request[0], format="json")

        assert response.status_code == 200
        assert response.data["message"] == "Data is valid"

    def test_validate_failure_1(self, request_factory, user_request, client):
        """Test listing multiple users"""

        user_request[0]["password"] = "Toshor1"
        url = "/user/validation/"
        response = client.post(url, user_request[0], format="json")

        assert response.status_code == 400
        assert (
            response.data["password"][0]
            == "This password is too short. It must contain at least 8 characters."
        )

    def test_validate_failure_2(self, request_factory, user_request, client):
        """Test listing multiple users"""

        user = UserFactory()
        user_request[0]["email"] = user.email
        url = "/user/validation/"
        response = client.post(url, user_request[0], format="json")

        assert response.status_code == 400
        assert response.data["email"][0] == "This field must be unique."
