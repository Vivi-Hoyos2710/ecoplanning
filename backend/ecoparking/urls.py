from rest_framework import routers
from .views import CarView, StationView

router = routers.DefaultRouter()
router.register("car", CarView, "car")
router.register("station", StationView, "station")
urlpatterns = router.urls
