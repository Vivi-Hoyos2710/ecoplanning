import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import AppModelFactory, BrandFactory
from ecoparking.models import AppModel
from ecoparking.views import AppModelView


@pytest.mark.django_db(databases=["default"])
class TestAppModelView:
    def test_get_app_model_list_success(self, request_factory):
        view = AppModelView.as_view({"get": "list"})

        app_models = AppModelFactory.create_batch(3)
        url = reverse("app-model-list")
        request = request_factory.get(url)

        response = view(request)
        assert response.status_code == 200
        for res, app_model in zip(response.data, list(app_models)):
            assert res["id"] == app_model.id
            assert res["name"] == app_model.name
            assert res["brand"] == app_model.brand.id
            assert res["range"] == app_model.range

    def test_create_app_model_success(
        self, request_factory, admin_user, app_model_request
    ):
        view = AppModelView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, app_model_request)
        force_authenticate(request, user=admin_user)

        response = view(request)

        assert response.status_code == 201
        assert response.data["name"] == app_model_request["name"]
        assert response.data["brand"] == app_model_request["brand"]
        assert response.data["range"] == app_model_request["range"]

    def test_create_app_model_failure(
        self, request_factory, admin_user, app_model_request
    ):
        brand = BrandFactory()
        app_model_request["brand"] = brand.id
        AppModelFactory(name="app_model", brand=brand)
        view = AppModelView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, app_model_request)
        force_authenticate(request, user=admin_user)

        response = view(request)

        assert response.status_code == 400
        assert (
            response.data["non_field_errors"][0]
            == "The fields brand, name must make a unique set."
        )

    def test_create_app_model_failure_2(self, request_factory, user, app_model_request):
        brand = BrandFactory()
        app_model_request["brand"] = brand.id
        view = AppModelView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, app_model_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )

    def test_edit_app_model_success(
        self, request_factory, admin_user, app_model_request
    ):
        brand = BrandFactory()
        app_model = AppModelFactory(brand=brand, name="another_name")
        app_model_request["brand"] = brand.id
        view = AppModelView.as_view({"put": "update"})

        url = reverse("app-model-detail", args=[app_model.id])
        request = request_factory.put(url, app_model_request)
        force_authenticate(request, user=admin_user)

        response = view(request, pk=app_model.id)

        assert response.status_code == 200
        assert response.data["name"] == app_model_request["name"]
        assert response.data["brand"] == app_model_request["brand"]
        assert response.data["range"] == app_model_request["range"]

    def test_delete_app_model_success(self, request_factory, admin_user):
        app_model = AppModelFactory()  # Create a sample AppModel instance
        view = AppModelView.as_view({"delete": "destroy"})

        # Use the destroy method for the delete operation
        url = reverse("app-model-detail", args=[app_model.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=admin_user)

        response = view(request, pk=app_model.id)

        assert response.status_code == 204
        assert not AppModel.objects.filter(pk=app_model.id).exists()

    def test_edit_app_model_failure(self, request_factory, user, app_model_request):
        brand = BrandFactory()
        app_model = AppModelFactory(brand=brand, name="another_name")
        app_model_request["brand"] = brand.id
        view = AppModelView.as_view({"put": "update"})

        url = reverse("app-model-detail", args=[app_model.id])
        request = request_factory.put(url, app_model_request)
        force_authenticate(request, user=user)

        response = view(request, pk=app_model.id)

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )

    def test_delete_app_model_failure(self, request_factory, user):
        app_model = AppModelFactory()  # Create a sample AppModel instance
        view = AppModelView.as_view({"delete": "destroy"})

        # Use the destroy method for the delete operation
        url = reverse("app-model-detail", args=[app_model.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=user)

        response = view(request, pk=app_model.id)

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )
