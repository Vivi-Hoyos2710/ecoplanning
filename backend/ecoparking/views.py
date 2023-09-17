from .models import AppModel, Car, Station, Brand
from .serializers import (
    AppModelSerializer,
    BrandSerializer,
    CarSerializer,
    StationSerializer,
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import (
    DjangoFilterBackend,
)


class BrandView(ModelViewSet):
    serializer_class = BrandSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "name": ["exact"],
    }
    ordering_fields = filterset_fields

    def get_queryset(self):
        return Brand.objects.all()


class AppModelView(ModelViewSet):
    serializer_class = AppModelSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "name": ["exact"],
        "brand": ["exact"],
    }
    ordering_fields = filterset_fields

    def get_queryset(self):
        return AppModel.objects.all()


class CarView(ModelViewSet):
    serializer_class = CarSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "user": ["exact"],
        "brand": ["exact"],
        "brand__name": ["exact"],
        "license_plate": ["exact"],
        "model": ["exact"],
        "model__name": ["exact"],
    }
    ordering_fields = filterset_fields

    def get_queryset(self):
        return Car.objects.all()


class StationView(ModelViewSet):
    serializer_class = StationSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "name": ["exact"],
        "coordinate": ["exact"],
    }
    ordering_fields = filterset_fields

    def get_queryset(self):
        return Station.objects.all()
