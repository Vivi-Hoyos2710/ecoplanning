from rest_framework.serializers import ModelSerializer
from .models import Car, Station


class CarSerializer(ModelSerializer):
    class Meta:
        model = Car
        fields = [
            "user",
            "brand",
            "brand__name",
            "model",
        ]


class StationSerializer(ModelSerializer):
    class Meta:
        model = Station
        fields = [
            "name",
            "coordinate__longitud",
            "coordinate__latitud",
        ]
