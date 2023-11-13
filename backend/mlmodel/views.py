from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import RegressionModel


@api_view(["POST"])
def discharge_prediction(request):
    if request.method == "POST":
        car_discharge_estimation = float(request.data.get("car_discharge_estimation"))
        time_of_trip = float(request.data.get("time_of_trip"))
        diff_elevation = float(request.data.get("diff_elevation"))
        temperature = float(request.data.get("temperature"))

        regression_model = RegressionModel()
        prediction = regression_model.run_regression(
            car_discharge_estimation, time_of_trip, diff_elevation, temperature
        )

        return Response({"discharge_prediction": prediction})
    else:
        return Response(status=405)
