import pytest
from rest_framework.reverse import reverse

from mlmodel.models import RegressionModel


@pytest.mark.django_db(databases=["default"])
class TestDischargePrediction:
    def test_discharge_prediction(self, user, client):
        url = reverse("discharge_prediction")
        client.force_authenticate(user=user)
        prediction_data = {
            "car_discharge_estimation": -62.838862559241704,
            "time_of_trip": 3813,
            "diff_elevation": 432.17999999999984,
            "temperature": 27.75,
        }

        response = client.post(url, data=prediction_data, format="json")
        assert "discharge_prediction" in response.data
        regresion_model = RegressionModel()
        assert response.data["discharge_prediction"] == regresion_model.run_regression(
            prediction_data["car_discharge_estimation"],
            prediction_data["time_of_trip"],
            prediction_data["diff_elevation"],
            prediction_data["temperature"],
        )
