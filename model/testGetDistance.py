import googlemaps

gmaps = googlemaps.Client(key="")

my_dist = gmaps.distance_matrix("6.19695,-75.5602", "6.20218,-75.5573", mode="Drive")[
    "rows"
][0]["elements"][0]

print(my_dist["distance"]["value"])
print(my_dist["duration"]["value"])
