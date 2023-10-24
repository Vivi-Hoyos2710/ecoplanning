import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import AppModelFactory, BrandFactory
from ecoparking.views import AppModelView


@pytest.mark.django_db(databases=["default"])
class TestAppModelView:
    def test_get_app_model_list_success(self, request_factory, user):
        view = AppModelView.as_view({"get": "list"})

        app_models = AppModelFactory.create_batch(3)
        url = reverse("app-model-list")
        request = request_factory.get(url)
        force_authenticate(request, user=user)

        response = view(request)
        assert response.status_code == 200
        for res, app_model in zip(response.data, list(app_models)):
            assert res["id"] == app_model.id
            assert res["name"] == app_model.name
            assert res["brand"] == app_model.brand.id

    def test_create_app_model_success(self, request_factory, user, app_model_request):
        view = AppModelView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, app_model_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 201
        assert response.data["name"] == app_model_request["name"]
        assert response.data["brand"] == app_model_request["brand"]

    def test_create_app_model_failure(self, request_factory, user, app_model_request):
        brand = BrandFactory()
        app_model_request["brand"] = brand.id
        AppModelFactory(name="app_model", brand=brand)
        view = AppModelView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, app_model_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 400
        assert (
            response.data["non_field_errors"][0]
            == "The fields brand, name must make a unique set."
        )
