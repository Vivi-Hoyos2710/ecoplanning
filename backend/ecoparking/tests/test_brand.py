import pytest
from rest_framework.reverse import reverse
from rest_framework.test import force_authenticate
from ecoparking.factories import BrandFactory
from ecoparking.models import Brand
from ecoparking.views import BrandView


@pytest.mark.django_db(databases=["default"])
class TestBrandView:
    def test_get_brand_list_success(self, request_factory):
        view = BrandView.as_view({"get": "list"})

        brands = BrandFactory.create_batch(3)
        url = reverse("brand-list")
        request = request_factory.get(url)

        response = view(request)
        assert response.status_code == 200
        for res, brand in zip(response.data, list(brands)):
            assert res["id"] == brand.id
            assert res["name"] == brand.name

    def test_create_brand_success(self, request_factory, admin_user, brand_request):
        view = BrandView.as_view({"post": "create"})

        url = reverse("brand-list")
        request = request_factory.post(url, brand_request)
        force_authenticate(request, user=admin_user)

        response = view(request)

        assert response.status_code == 201
        assert response.data["name"] == brand_request["name"]

    def test_create_brand_failure(self, request_factory, admin_user, brand_request):
        BrandFactory(name="brand")
        view = BrandView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, brand_request)
        force_authenticate(request, user=admin_user)

        response = view(request)

        assert response.status_code == 400
        assert response.data["name"][0] == "brand with this name already exists."

    def test_create_brand_failure_2(self, request_factory, user, brand_request):
        BrandFactory(name="brand")
        view = BrandView.as_view({"post": "create"})

        url = reverse("app-model-list")
        request = request_factory.post(url, brand_request)
        force_authenticate(request, user=user)

        response = view(request)

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )

    def test_edit_brand_success(self, request_factory, admin_user, brand_request):
        brand = BrandFactory()
        view = BrandView.as_view({"put": "update"})

        # Update the brand using the same brand_request data
        url = reverse("brand-detail", args=[brand.id])
        request = request_factory.put(url, brand_request)
        force_authenticate(request, user=admin_user)

        response = view(
            request, pk=brand.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 200
        assert response.data["name"] == brand_request["name"]

    def test_delete_brand_success(self, request_factory, admin_user):
        brand = BrandFactory()  # Create a sample Brand instance
        view = BrandView.as_view({"delete": "destroy"})

        # Delete the brand
        url = reverse("brand-detail", args=[brand.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=admin_user)

        response = view(
            request, pk=brand.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 204
        assert not Brand.objects.filter(pk=brand.id).exists()

    def test_edit_brand_failure(self, request_factory, user, brand_request):
        brand = BrandFactory()
        view = BrandView.as_view({"put": "update"})

        # Update the brand using the same brand_request data
        url = reverse("brand-detail", args=[brand.id])
        request = request_factory.put(url, brand_request)
        force_authenticate(request, user=user)

        response = view(
            request, pk=brand.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )

    def test_delete_brand_failure(self, request_factory, user):
        brand = BrandFactory()  # Create a sample Brand instance
        view = BrandView.as_view({"delete": "destroy"})

        # Delete the brand
        url = reverse("brand-detail", args=[brand.id])
        request = request_factory.delete(url)
        force_authenticate(request, user=user)

        response = view(
            request, pk=brand.id
        )  # Pass the object ID as a keyword argument

        assert response.status_code == 403
        assert (
            response.data["detail"]
            == "You do not have permission to perform this action."
        )
