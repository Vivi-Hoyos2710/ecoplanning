import os

routes = {}
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
        if coords not in routes:
            routes[coords] = 1
        else:
            routes[coords] += 1

print(len(routes))
with open("routes.csv", "w") as file:
    for coords, a in routes.items():
        file.write(",".join(list(map(str, coords))))
        file.write("\n")
