from rest_framework.serializers import ModelSerializer, CharField, FloatField
from .models import AppModel, Brand, Car, Station


class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name"]


class AppModelSerializer(ModelSerializer):
    class Meta:
        model = AppModel
        fields = ["id", "name", "brand"]


class CarSerializer(ModelSerializer):
    brand__name = CharField(source="brand.name", read_only=True, required=False)
    model__name = CharField(source="model.name", read_only=True, required=False)

    class Meta:
        model = Car
        fields = [
            "id",
            "user",
            "brand",
            "brand__name",
            "license_plate",
            "model",
            "model__name",
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
