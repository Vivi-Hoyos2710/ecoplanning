from django.db import models


class OVMSData(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField()
    operative_state = models.CharField(max_length=20)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    elevation = models.FloatField(null=True, blank=True)
    slope = models.FloatField(null=True, blank=True)
    speed = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    odometer = models.PositiveIntegerField(null=True, blank=True)
    batt_temp = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    ext_temp = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    power_kw = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    capacity = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    vehicle_id = models.CharField(max_length=255, null=True, blank=True)
    soc = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    soh = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    voltage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    current = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    throttle = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    regen_brake = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    consumption = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    range_est = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    range_ideal = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    range_full = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    drivetime = models.PositiveIntegerField(null=True, blank=True)
    charge_time = models.PositiveIntegerField(null=True, blank=True)
    footbrake = models.BooleanField(null=True, blank=True)
    engine_temp = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    is_charging = models.BooleanField(null=True, blank=True)
    tpms = models.CharField(max_length=10, null=True, blank=True)
    coulomb = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    energy = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    rpm = models.PositiveIntegerField(null=True, blank=True)
    charger_type = models.CharField(max_length=20, null=True, blank=True)
    coulomb_rec = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    drivemode = models.CharField(max_length=20, null=True, blank=True)
    energy_rec = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    mass = models.IntegerField()
    mec_power = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    mean_acc = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    friction_force = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    net_force = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    run = models.PositiveIntegerField(null=True, blank=True)
    mean_speed = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    freeram = models.PositiveIntegerField(null=True, blank=True)
    net_signal = models.PositiveIntegerField(null=True, blank=True)
    tasks = models.PositiveIntegerField(null=True, blank=True)
    elevation2 = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    charge_current = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    angle_x = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    angle_y = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    AcX = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    AcY = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    AcZ = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    humidity = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    kwh_km = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    assist_level = models.PositiveIntegerField(null=True, blank=True)
    pressure = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    user_name = models.CharField(max_length=50, null=True, blank=True)
    user_id = models.PositiveIntegerField(null=True, blank=True)
    acceleration = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )

    class Meta:
        db_table = "operation"
        ordering = ["-timestamp"]

    def __str__(self):
        return f"OVMS Data for {self.vehicle_id} at {self.timestamp}"
