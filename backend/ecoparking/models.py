from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)


class AppModel(models.Model):
    brand = models.ForeignKey("Brand", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    range = models.IntegerField()

    class Meta:
        unique_together = ["brand", "name"]


class Car(models.Model):
    brand = models.ForeignKey("Brand", on_delete=models.CASCADE)
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    license_plate = models.CharField(max_length=255)
    model = models.ForeignKey("AppModel", on_delete=models.CASCADE)


class Coordinate(models.Model):
    class Meta:
        unique_together = ["latitude", "longitude"]

    latitude = models.FloatField(
        validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)]
    )
    longitude = models.FloatField(
        validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)]
    )


class Station(models.Model):
    class Meta:
        unique_together = ["name", "coordinate"]

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    coordinate = models.ForeignKey("Coordinate", on_delete=models.CASCADE)


class Report(models.Model):
    station = models.ForeignKey("Station", on_delete=models.CASCADE)
    description = models.CharField(max_length=300)
