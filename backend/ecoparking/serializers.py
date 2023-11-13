from rest_framework.serializers import (
    ModelSerializer,
    CharField,
    FloatField,
    PrimaryKeyRelatedField,
    ValidationError,
)
from .models import AppModel, Brand, Car, Station, Coordinate


class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = [
            "id",
            "name",
        ]


class AppModelSerializer(ModelSerializer):
    class Meta:
        model = AppModel
        fields = ["id", "name", "brand", "range"]


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
    coordinate = PrimaryKeyRelatedField(read_only=True)
    coordinate__longitude = FloatField(
        source="coordinate.longitude", read_only=True, required=False
    )
    coordinate__latitude = FloatField(
        source="coordinate.latitude", read_only=True, required=False
    )
    longitude = FloatField(write_only=True)
    latitude = FloatField(write_only=True)

    class Meta:
        model = Station
        fields = [
            "id",
            "name",
            "address",
            "longitude",
            "latitude",
            "coordinate",
            "coordinate__longitude",
            "coordinate__latitude",
        ]

    def create(self, validated_data):
        coordinate, created = Coordinate.objects.get_or_create(
            longitude=validated_data["longitude"],
            latitude=validated_data["latitude"],
        )
        if not created:
            station_exist = Station.objects.filter(
                coordinate=coordinate, name=validated_data["name"]
            ).first()
            if station_exist is not None:
                raise ValidationError({"name": "This station already exists"})
        validated_data.pop("longitude")
        validated_data.pop("latitude")
        validated_data["coordinate"] = coordinate
        station = super().create(validated_data)
        return station

    def update(self, instance, validated_data):
        coordinate, created = Coordinate.objects.get_or_create(
            longitude=validated_data["longitude"],
            latitude=validated_data["latitude"],
        )
        if not created:
            station_exist = Station.objects.filter(
                coordinate=coordinate, name=validated_data["name"]
            ).first()
            if station_exist is not None:
                raise ValidationError({"name": "This station already exists"})
        validated_data.pop("longitude")
        validated_data.pop("latitude")
        validated_data["coordinate"] = coordinate
        station = super().update(instance, validated_data)
        return station


class BrandModelSerializer(ModelSerializer):
    models = AppModelSerializer(many=True, read_only=True, source="appmodel_set")

    class Meta:
        model = Brand
        fields = ("id", "name", "models")
