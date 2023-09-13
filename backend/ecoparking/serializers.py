from rest_framework.serializers import ModelSerializer, CharField, FloatField
from .models import Brand, Car, Station


class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name"]


class CarSerializer(ModelSerializer):
    brand__name = CharField(source="brand.name", read_only=True, required=False)

    class Meta:
        model = Car
        fields = [
            "id",
            "user",
            "brand",
            "brand__name",
            "model",
        ]


class StationSerializer(ModelSerializer):
    coordinate__longitud = FloatField(
        source="coordinate.longitud", read_only=True, required=False
    )
    coordinate__latitud = FloatField(
        source="coordinate.latitud", read_only=True, required=False
    )

    class Meta:
        model = Station
        fields = [
            "id",
            "name",
            "coordinate",
            "coordinate__longitud",
            "coordinate__latitud",
        ]
