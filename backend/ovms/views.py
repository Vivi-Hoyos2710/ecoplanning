from .models import OVMSData
from .serializers import OVMSSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import (
    DjangoFilterBackend,
)


class OVMSView(ModelViewSet):
    serializer_class = OVMSSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact", "lte", "gte"],
        "timestamp": ["exact", "lte", "gte"],
        "operative_state": ["exact", "lte", "gte"],
        "latitude": ["exact", "lte", "gte"],
        "longitude": ["exact", "lte", "gte"],
        "elevation": ["exact", "lte", "gte"],
        "slope": ["exact", "lte", "gte"],
        "speed": ["exact", "lte", "gte"],
        "odometer": ["exact", "lte", "gte"],
        "batt_temp": ["exact", "lte", "gte"],
        "ext_temp": ["exact", "lte", "gte"],
        "power_kw": ["exact", "lte", "gte"],
        "capacity": ["exact", "lte", "gte"],
        "vehicle_id": ["exact", "lte", "gte"],
        "soc": ["exact", "lte", "gte"],
        "soh": ["exact", "lte", "gte"],
        "voltage": ["exact", "lte", "gte"],
        "current": ["exact", "lte", "gte"],
        "throttle": ["exact", "lte", "gte"],
        "regen_brake": ["exact", "lte", "gte"],
        "consumption": ["exact", "lte", "gte"],
        "range_est": ["exact", "lte", "gte"],
        "range_ideal": ["exact", "lte", "gte"],
        "range_full": ["exact", "lte", "gte"],
        "drivetime": ["exact", "lte", "gte"],
        "charge_time": ["exact", "lte", "gte"],
        "footbrake": ["exact", "lte", "gte"],
        "engine_temp": ["exact", "lte", "gte"],
        "is_charging": ["exact", "lte", "gte"],
        "tpms": ["exact", "lte", "gte"],
        "coulomb": ["exact", "lte", "gte"],
        "energy": ["exact", "lte", "gte"],
        "rpm": ["exact", "lte", "gte"],
        "charger_type": ["exact", "lte", "gte"],
        "coulomb_rec": ["exact", "lte", "gte"],
        "drivemode": ["exact", "lte", "gte"],
        "energy_rec": ["exact", "lte", "gte"],
        "mass": ["exact", "lte", "gte"],
        "mec_power": ["exact", "lte", "gte"],
        "mean_acc": ["exact", "lte", "gte"],
        "friction_force": ["exact", "lte", "gte"],
        "net_force": ["exact", "lte", "gte"],
        "run": ["exact", "lte", "gte"],
        "mean_speed": ["exact", "lte", "gte"],
        "freeram": ["exact", "lte", "gte"],
        "net_signal": ["exact", "lte", "gte"],
        "tasks": ["exact", "lte", "gte"],
        "elevation2": ["exact", "lte", "gte"],
        "charge_current": ["exact", "lte", "gte"],
        "angle_x": ["exact", "lte", "gte"],
        "angle_y": ["exact", "lte", "gte"],
        "AcX": ["exact", "lte", "gte"],
        "AcY": ["exact", "lte", "gte"],
        "AcZ": ["exact", "lte", "gte"],
        "humidity": ["exact", "lte", "gte"],
        "kwh_km": ["exact", "lte", "gte"],
        "assist_level": ["exact", "lte", "gte"],
        "pressure": ["exact", "lte", "gte"],
        "user_name": ["exact", "lte", "gte"],
        "user_id": ["exact", "lte", "gte"],
        "acceleration": ["exact", "lte", "gte"],
    }
    ordering_fields = filterset_fields

    def get_queryset(self):
        return OVMSData.objects.all()
