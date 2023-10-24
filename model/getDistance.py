# importing googlemaps module
import googlemaps

# Requires API key
gmaps = googlemaps.Client()

# Requires cities name
matrix = gmaps.distance_matrix((6.19695, -75.5602), (6.20218, -75.5573))

print(matrix)
