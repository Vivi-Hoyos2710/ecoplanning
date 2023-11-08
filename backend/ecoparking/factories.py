from factory.django import DjangoModelFactory
from factory import Sequence, SubFactory
from user.factories import UserFactory
from .models import AppModel, Brand, Car, Coordinate, Station


class BrandFactory(DjangoModelFactory):
    class Meta:
        model = Brand

    name = Sequence(lambda x: f"name_{x}")


class AppModelFactory(DjangoModelFactory):
    class Meta:
        model = AppModel

    name = Sequence(lambda x: f"name_{x}")
    range = Sequence(lambda x: x)
    brand = SubFactory(BrandFactory)


class CarFactory(DjangoModelFactory):
    class Meta:
        model = Car

    user = SubFactory(UserFactory)
    model = SubFactory(AppModelFactory)
    brand = SubFactory(BrandFactory)
    license_plate = Sequence(lambda x: f"LIC12{x}")


class CoordinateFactory(DjangoModelFactory):
    class Meta:
        model = Coordinate

    longitude = Sequence(lambda x: float(x))
    latitude = Sequence(lambda x: float(x))


class StationFactory(DjangoModelFactory):
    class Meta:
        model = Station

    name = Sequence(lambda x: f"name_{x}")
    coordinate = SubFactory(CoordinateFactory)
