from rest_framework import routers
from .views import AppModelView, BrandView, CarView, StationView, BrandModel

router = routers.DefaultRouter()
router.register("brand", BrandView, "brand")
router.register("app-model", AppModelView, "app-model")
router.register("car", CarView, "car")
router.register("station", StationView, "station")
router.register("brand-model", BrandModel, "brand-model")
urlpatterns = router.urls
