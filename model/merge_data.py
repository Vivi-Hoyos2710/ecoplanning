import os

routes = {}
with open("routes_with_distance_and_duration.csv", "r") as file:
    for line in file:
        route = line.split(",")
        coords = (float(route[2]), float(route[3]), float(route[4]), float(route[5]))
        routes[coords] = (route[0], route[1])

ttl_outputs = []

for filename in os.listdir("car_data"):
    outputs = []
    lines = []
    vehicle_id = filename[0:5]
    with open(f"car_data/{filename}", "r") as file:
        for line in file:
            segments = line.split(",")
            lines.append(segments)

    for i in range(0, len(lines) - 1, 2):
        line1 = lines[i]
        line2 = lines[i + 1]
        coords = (float(line1[2]), float(line1[3]), float(line2[2]), float(line2[3]))
        dist, dur = routes[coords]
        diff_elevation = float(line2[4]) - float(line1[4])
        diff_battery = float(line2[5]) - float(line2[5])
        temp = float(line2[7]) + float(line1[7]) / 2
        traffic = int(line2[1]) - int(dur)
        if traffic < 0:
            continue
        output = (dist, dur, traffic, diff_battery, diff_elevation, temp)
        outputs.append(output)
        ttl_outputs.append(output)

    with open(f"final_car_data/{vehicle_id}data.csv", "w") as file:
        file.write(
            ",".join(
                [
                    "Distance",
                    "Duration",
                    "Traffic",
                    "Diff Batery",
                    "Diff Elevation",
                    "Mean Tempeture",
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
                "Distance",
                "Duration",
                "Traffic",
                "Diff Batery",
                "Diff Elevation",
                "Mean Tempeture",
            ]
        )
    )
    file.write("\n")
    for d in ttl_outputs:
        file.write(",".join(list(map(str, d))))
        file.write("\n")
