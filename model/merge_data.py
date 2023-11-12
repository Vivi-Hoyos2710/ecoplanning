import os

routes = {}
with open("routes_with_distance_and_duration.csv", "r") as file:
    for line in file:
        route = line.split(",")
        coords = (float(route[2]), float(route[3]), float(route[4]), float(route[5]))
        routes[coords] = (route[0], route[1])

ttl_outputs = []

range_est = {
    "EGZ112": 307,
    "FRV020": 198.629,
    "FVQ731": 185.545,
    "FXR906": 84,
    "GFK695": 211,
    "GHW284": 295,
    "GVQ446": 364,
    "GVQ514": 348,
}


for filename in os.listdir("car_data"):
    outputs = []
    lines = []
    vehicle_id = filename[0:6]

    with open(f"car_data/{filename}", "r") as file:
        for line in file:
            segments = line.split(",")
            lines.append(segments)

    for i in range(0, len(lines) - 1, 2):
        line1 = lines[i]
        line2 = lines[i + 1]
        coords = (float(line1[2]), float(line1[3]), float(line2[2]), float(line2[3]))
        if coords not in routes:
            continue
        dist, dur = routes[coords]
        car_discharge = -float(dist) / range_est[vehicle_id]
        time = int(line2[1]) - int(line1[1])
        diff_elevation = float(line2[4]) - float(line1[4])
        diff_battery = float(line2[5]) - float(line1[5])
        temp = float(line2[7]) + float(line1[7]) / 2
        output = (car_discharge, time, diff_elevation, temp, diff_battery)
        outputs.append(output)
        ttl_outputs.append(output)

    with open(f"final_car_data/{filename}", "w") as file:
        file.write(
            ",".join(
                [
                    "Car Discharge Estimation",
                    "Time of Trip",
                    "Diff Elevation",
                    "Mean Tempeture",
                    "Diff Batery",
                ]
            )
        )
        file.write("\n")
        for d in outputs:
            file.write(",".join(list(map(str, d))))
            file.write("\n")

with open("final_data.csv", "w") as file:
    file.write(
        ",".join(
            [
                "Car Discharge Estimation",
                "Time of Trip",
                "Diff Elevation",
                "Mean Tempeture",
                "Diff Batery",
            ]
        )
    )
    file.write("\n")
    for d in ttl_outputs:
        file.write(",".join(list(map(str, d))))
        file.write("\n")
