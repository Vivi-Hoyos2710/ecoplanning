import googlemaps

routes = []

with open("routes.csv", "r") as file:
    for line in file:
        route = line.split(",")
        routes.append(route)

outputs = []

gmaps = googlemaps.Client(key="AIzaSyB5y9DN79VNjQawwWCX_l9d0ESARSFIzOI")

with open("routes_with_distance_and_duration.csv", "w") as file:
    for route in routes:
        try:
            my_dist = gmaps.distance_matrix(
                f"{route[0]},{route[1]}", f"{route[2]},{route[3]}"
            )["rows"][0]["elements"][0]
            distance = my_dist["distance"]["value"]
            no_traffic_duration = my_dist["duration"]["value"]
            output = [distance, no_traffic_duration]
            output.extend(route)
            file.write(",".join(list(map(str, output))))
        except Exception:
            print(route)
            pass
