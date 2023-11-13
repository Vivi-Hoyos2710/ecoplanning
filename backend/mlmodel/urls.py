from django.urls import path
from .views import discharge_prediction


urlpatterns = [
    path("discharge_prediction/", discharge_prediction, name="discharge_prediction"),
]
