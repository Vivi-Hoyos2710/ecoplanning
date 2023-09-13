from rest_framework import routers
from user.views import UserView

router = routers.DefaultRouter()
router.register("user", UserView, "user")
urlpatterns = router.urls
