from rest_framework.serializers import ModelSerializer, CharField, FloatField
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
    coordinate__longitude = FloatField(
        source="coordinate.longitude", read_only=True, required=False
    )
    coordinate__latitude = FloatField(
        source="coordinate.latitude", read_only=True, required=False
    )

    class Meta:
        model = Station
        fields = [
            "id",
            "name",
            "address",
            "coordinate",
            "coordinate__longitude",
            "coordinate__latitude",
        ]
        
     def create(self, validated_data):
        print(validated_data, flush=True)
        coordinate = Coordinate.objects.get_or_create(
            [
                validated_data["coordinate__latitude"],
                validated_data["coordinate__longitude"],
            ]
        )
        validated_data["coordinate"] = coordinate.id
        return super.create(validated_data)

    def update(self, station, validated_data):
        coordinate = Coordinate.objects.get_or_create(
            [
                validated_data["coordinate__latitude"],
                validated_data["coordinate__longitude"],
            ]
        )
        validated_data["coordinate"] = coordinate.id
        return super.update(validated_data)



class BrandModelSerializer(ModelSerializer):
    models = AppModelSerializer(many=True, read_only=True, source="appmodel_set")

    class Meta:
        model = Brand
        fields = ("id", "name", "models")