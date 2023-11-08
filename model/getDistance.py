routes = []

with open("routes.csv", "r") as file:
    for line in file:
        route = line.split(",")
        routes.append(route)

outputs = []

for route in routes:
    distance = 0
    no_traffic_duration = 0
    output = [distance, no_traffic_duration]
    output.extend(route)
    outputs.append(output)

with open("routes_with_distance_and_duration.csv", "w") as file:
    for output in outputs:
        file.write(",".join(list(map(str, output))))
