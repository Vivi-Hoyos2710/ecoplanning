from joblib import load


class RegressionModel:
    def __init__(self) -> None:
        self.regressor = load(
            "./mlmodel/model_components/multiple_linear_regression.joblib"
        )
        self.X_scaler = load("./mlmodel/model_components/X_scaler.joblib")
        self.y_scaler = load("./mlmodel/model_components/y_scaler.joblib")

    def run_regression(
        self, car_discharge_estimation, time_of_trip, diff_elevation, tempeture
    ):
        X = [[car_discharge_estimation, time_of_trip, diff_elevation, tempeture]]
        discharge_prediction = self.y_scaler.inverse_transform(
            [self.regressor.predict(self.X_scaler.transform(X))]
        )[0]
        return discharge_prediction
