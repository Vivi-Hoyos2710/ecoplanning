import csv
import datetime

from rest_framework.permissions import IsAdminUser
from .models import OVMSData
from .serializers import OVMSSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from django_filters.rest_framework import (
    DjangoFilterBackend,
)
from django.http import HttpResponse


class OVMSView(ModelViewSet):
    serializer_class = OVMSSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    permission_classes = (IsAdminUser,)
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

    @action(detail=False)
    def export_ovms_data_list(self, request):
        response = HttpResponse(content_type="text/csv")
        filename = "all_ovms_data_"
        queryset = self.filter_queryset(self.get_queryset())

        field_names = [
            "id",
            "timestamp",
            "operative_state",
            "latitude",
            "longitude",
            "elevation",
            "slope",
            "speed",
            "odometer",
            "batt_temp",
            "ext_temp",
            "power_kw",
            "capacity",
            "vehicle_id",
            "soc",
            "soh",
            "voltage",
            "current",
            "throttle",
            "regen_brake",
            "consumption",
            "range_est",
            "range_ideal",
            "range_full",
            "drivetime",
            "charge_time",
            "footbrake",
            "engine_temp",
            "is_charging",
            "tpms",
            "coulomb",
            "energy",
            "rpm",
            "charger_type",
            "coulomb_rec",
            "drivemode",
            "energy_rec",
            "mass",
            "mec_power",
            "mean_acc",
            "friction_force",
            "net_force",
            "run",
            "mean_speed",
            "freeram",
            "net_signal",
            "tasks",
            "elevation2",
            "charge_current",
            "angle_x",
            "angle_y",
            "AcX",
            "AcY",
            "AcZ",
            "humidity",
            "kwh_km",
            "assist_level",
            "pressure",
            "user_name",
            "user_id",
            "acceleration",
        ]

        writer = csv.DictWriter(response, field_names)

        writer.writerow(
            {
                "id": "Id",
                "timestamp": "Timestamp",
                "operative_state": "Operative State",
                "latitude": "Latitude",
                "longitude": "Longitude",
                "elevation": "Elevation",
                "slope": "Slope",
                "speed": "Speed",
                "odometer": "Odometer",
                "batt_temp": "Battery Temperature",
                "ext_temp": "External Temperature",
                "power_kw": "Power (kW)",
                "capacity": "Capacity",
                "vehicle_id": "Vehicle Id",
                "soc": "State of Charge (SoC)",
                "soh": "State of Health (SoH)",
                "voltage": "Voltage",
                "current": "Current",
                "throttle": "Throttle",
                "regen_brake": "Regenerative Brake",
                "consumption": "Consumption",
                "range_est": "Range (Estimated)",
                "range_ideal": "Range (Ideal)",
                "range_full": "Range (Full)",
                "drivetime": "Drive Time",
                "charge_time": "Charge Time",
                "footbrake": "Foot Brake",
                "engine_temp": "Engine Temperature",
                "is_charging": "Is Charging",
                "tpms": "Tire Pressure Monitoring System (TPMS)",
                "coulomb": "Coulomb",
                "energy": "Energy",
                "rpm": "RPM",
                "charger_type": "Charger Type",
                "coulomb_rec": "Coulomb Received",
                "drivemode": "Drive Mode",
                "energy_rec": "Energy Received",
                "mass": "Mass",
                "mec_power": "Mechanical Power",
                "mean_acc": "Mean Acceleration",
                "friction_force": "Friction Force",
                "net_force": "Net Force",
                "run": "Run",
                "mean_speed": "Mean Speed",
                "freeram": "Free RAM",
                "net_signal": "Net Signal",
                "tasks": "Tasks",
                "elevation2": "Elevation 2",
                "charge_current": "Charge Current",
                "angle_x": "Angle X",
                "angle_y": "Angle Y",
                "AcX": "Acceleration X",
                "AcY": "Acceleration Y",
                "AcZ": "Acceleration Z",
                "humidity": "Humidity",
                "kwh_km": "kWh per km",
                "assist_level": "Assist Level",
                "pressure": "Pressure",
                "user_name": "User Name",
                "user_id": "User Id",
                "acceleration": "Acceleration",
            }
        )

        for ovms_data in queryset.all():
            writer.writerow(
                {
                    "id": ovms_data.id,
                    "timestamp": ovms_data.timestamp,
                    "operative_state": ovms_data.operative_state,
                    "latitude": ovms_data.latitude,
                    "longitude": ovms_data.longitude,
                    "elevation": ovms_data.elevation,
                    "slope": ovms_data.slope,
                    "speed": ovms_data.speed,
                    "odometer": ovms_data.odometer,
                    "batt_temp": ovms_data.batt_temp,
                    "ext_temp": ovms_data.ext_temp,
                    "power_kw": ovms_data.power_kw,
                    "capacity": ovms_data.capacity,
                    "vehicle_id": ovms_data.vehicle_id,
                    "soc": ovms_data.soc,
                    "soh": ovms_data.soh,
                    "voltage": ovms_data.voltage,
                    "current": ovms_data.current,
                    "throttle": ovms_data.throttle,
                    "regen_brake": ovms_data.regen_brake,
                    "consumption": ovms_data.consumption,
                    "range_est": ovms_data.range_est,
                    "range_ideal": ovms_data.range_ideal,
                    "range_full": ovms_data.range_full,
                    "drivetime": ovms_data.drivetime,
                    "charge_time": ovms_data.charge_time,
                    "footbrake": ovms_data.footbrake,
                    "engine_temp": ovms_data.engine_temp,
                    "is_charging": ovms_data.is_charging,
                    "tpms": ovms_data.tpms,
                    "coulomb": ovms_data.coulomb,
                    "energy": ovms_data.energy,
                    "rpm": ovms_data.rpm,
                    "charger_type": ovms_data.charger_type,
                    "coulomb_rec": ovms_data.coulomb_rec,
                    "drivemode": ovms_data.drivemode,
                    "energy_rec": ovms_data.energy_rec,
                    "mass": ovms_data.mass,
                    "mec_power": ovms_data.mec_power,
                    "mean_acc": ovms_data.mean_acc,
                    "friction_force": ovms_data.friction_force,
                    "net_force": ovms_data.net_force,
                    "run": ovms_data.run,
                    "mean_speed": ovms_data.mean_speed,
                    "freeram": ovms_data.freeram,
                    "net_signal": ovms_data.net_signal,
                    "tasks": ovms_data.tasks,
                    "elevation2": ovms_data.elevation2,
                    "charge_current": ovms_data.charge_current,
                    "angle_x": ovms_data.angle_x,
                    "angle_y": ovms_data.angle_y,
                    "AcX": ovms_data.AcX,
                    "AcY": ovms_data.AcY,
                    "AcZ": ovms_data.AcZ,
                    "humidity": ovms_data.humidity,
                    "kwh_km": ovms_data.kwh_km,
                    "assist_level": ovms_data.assist_level,
                    "pressure": ovms_data.pressure,
                    "user_name": ovms_data.user_name,
                    "user_id": ovms_data.user_id,
                    "acceleration": ovms_data.acceleration,
                }
            )

        content_disposition = "".join(
            [
                'attachment; filename="',
                filename,
                datetime.datetime.now().date().isoformat(),
                '.csv"',
            ]
        )

        response["Content-Disposition"] = content_disposition
        response["Access-Control-Expose-Headers"] = "Content-Disposition"

        return response
