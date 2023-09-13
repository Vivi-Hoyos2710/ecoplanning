from rest_framework import routers
from .views import BrandView, CarView, StationView

router = routers.DefaultRouter()
router.register("brand", BrandView, "brand")
router.register("car", CarView, "car")
router.register("station", StationView, "station")
urlpatterns = router.urls
