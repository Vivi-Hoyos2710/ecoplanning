from .permissions import ViewEveryOneCreateModifyAdmin, CarPermission
from .models import AppModel, Car, Station, Brand, Report
from .serializers import (
    AppModelSerializer,
    BrandSerializer,
    CarSerializer,
    StationSerializer,
    BrandModelSerializer,
    ReportStationSerializer
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import (
    DjangoFilterBackend,
)
from rest_framework import permissions


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
    permission_classes = (ViewEveryOneCreateModifyAdmin,)

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
        "range": ["exact"],
    }
    ordering_fields = filterset_fields
    permission_classes = (ViewEveryOneCreateModifyAdmin,)

    def get_queryset(self):
        return AppModel.objects.all()


class CarView(ModelViewSet):
    serializer_class = CarSerializer
    filter_backends = [
        DjangoFilterBackend,
    ]
    filterset_fields = {
        "id": ["exact"],
        "user": ["exact"],
        "brand": ["exact"],
        "brand__name": ["exact"],
        "license_plate": ["exact"],
        "model": ["exact"],
        "model__name": ["exact"],
        "user__is_superuser": ["exact"],
    }
    ordering_fields = filterset_fields
    permission_classes = (CarPermission,)

    def get_queryset(self):
        return Car.objects.all()


class StationView(ModelViewSet):
    serializer_class = StationSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
        SearchFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "name": ["exact"],
        "coordinate": ["exact"],
        "address": ["exact"],
    }
    search_fields = ['name','address']

    ordering_fields = filterset_fields
    permission_classes = (ViewEveryOneCreateModifyAdmin,)

    def get_queryset(self):
        return Station.objects.all()


class BrandModel(ModelViewSet):
    serializer_class = BrandModelSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "name": ["exact"],
    }
    ordering_fields = filterset_fields
    permission_classes = (ViewEveryOneCreateModifyAdmin,)

    def get_queryset(self):
        queryset = Brand.objects.prefetch_related("appmodel_set").all()
        return queryset
    


class ReportView(ModelViewSet):
    serializer_class = ReportStationSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "station": ["exact"],
    }
    ordering_fields = filterset_fields

    def get_queryset(self):
        return Report.objects.all()