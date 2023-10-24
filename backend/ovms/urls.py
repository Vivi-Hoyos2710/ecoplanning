from rest_framework import routers
from .views import OVMSView

router = routers.DefaultRouter()
router.register("ovms", OVMSView, "ovms")
urlpatterns = router.urls
