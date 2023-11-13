import googlemaps

gmaps = googlemaps.Client(key="AIzaSyB5y9DN79VNjQawwWCX_l9d0ESARSFIzOI")

my_dist = gmaps.distance_matrix("6.19695,-75.5602", "6.20218,-75.5573")["rows"][0][
    "elements"
][0]

print(my_dist["distance"]["value"])
print(my_dist["duration"]["value"])
