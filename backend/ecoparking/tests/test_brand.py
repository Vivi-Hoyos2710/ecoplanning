import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import BrandFactory
from ecoparking.views import BrandView


@pytest.mark.django_db(databases=["default"])
class TestBrandView:
    def test_get_brand_list_success(self, request_factory, user):
        view = BrandView.as_view({"get": "list"})

        brands = BrandFactory.create_batch(3)
        url = reverse("brand-list")
        request = request_factory.get(url)
        force_authenticate(request, user=user)

        response = view(request)
        assert response.status_code == 200
        for res, brand in zip(response.data, list(brands)):
            assert res["id"] == brand.id
            assert res["name"] == brand.name

    def test_create_brand_success(self, request_factory, user, brand_request):
        view = BrandView.as_view({"post": "create"})

        url = reverse("brand-list")
        request = request_factory.post(url, brand_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 201
        assert response.data["name"] == brand_request["name"]

    def test_create_brand_failure(self, request_factory, user, brand_request):
        BrandFactory(name="brand")
        view = BrandView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, brand_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 400
        assert response.data["name"][0] == "brand with this name already exists."
