import os

routes = {}
with open("routes_with_distance_and_duration.csv", "r") as file:
    for line in file:
        route = line.split(",")
        coords = (line[2], line[3], line[4], line[5])
        routes[route] = (line[0], line[1])

outputs = []

for filename in os.listdir("car_data"):
    lines = []
    with open(f"car_data/{filename}", "r") as file:
        for line in file:
            segments = line.split(",")
            lines.append(segments)

    for i in range(0, len(lines) - 1, 2):
        line1 = lines[i]
        line2 = lines[i + 1]
        coords = (line1[2], line1[3], line2[2], line2[3])
        dist_dur = routes[coords]
        diff_elevation = float(line2[4]) - float(line1[4])
        diff_battery = float(line2[5]) - float(line2[5])
        output = [dist_dur, diff_elevation, diff_battery]
