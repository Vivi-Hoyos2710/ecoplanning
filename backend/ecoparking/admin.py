from django.contrib import admin
from .models import AppModel, Car, Brand, Station, Coordinate

admin.site.register(Car)
admin.site.register(Brand)
admin.site.register(Station)
admin.site.register(Coordinate)
admin.site.register(AppModel)
