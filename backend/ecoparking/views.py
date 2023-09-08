from .serializers import CarSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import (
    DjangoFilterBackend,
    OrderingFilter,
)


class CarView(ModelViewSet):
    serializer_class = CarSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]


class StationView(ModelViewSet):
    serializer_class = CarSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
