import pytest
from rest_framework.reverse import reverse
from rest_framework.test import APIClient


@pytest.mark.django_db(databases=["default"])
class TestDischargePrediction:
    def test_discharge_prediction(self, user):
        url = reverse("discharge_prediction")
        client = APIClient()
        prediction_data = {
            "car_discharge_estimation": -62.838862559241704,
            "time_of_trip": 3813,
            "diff_elevation": 432.17999999999984,
            "temperature": 27.75,
        }

        response = client.post(url, data=prediction_data, format="json")
        assert "discharge_prediction" in response.data
        assert response.data["discharge_prediction"] == -14.560240833976628
