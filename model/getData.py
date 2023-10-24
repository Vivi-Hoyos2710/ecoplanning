data = {}
with open("start_of_drive.csv", "r") as file:
    f = True
    for line in file:
        if f:
            f = False
            continue
        ls = list(line.split())
        ls[0] = int(ls[0])
        ls[1] = int(ls[1])
        vehicle_id = ls[6]
        if vehicle_id not in data:
            data[vehicle_id] = [ls]
        else:
            data[vehicle_id].append(ls)
with open("end_of_drive.csv", "r") as file:
    f = True
    for line in file:
        if f:
            f = False
            continue
        ls = list(line.split())
        ls[0] = int(ls[0])
        ls[1] = int(ls[1])
        vehicle_id = ls[6]
        if vehicle_id not in data:
            data[vehicle_id] = [ls]
        else:
            data[vehicle_id].append(ls)
for vehicle_id, cur_data in data.items():
    cur_data.sort()
    final_data = [cur_data[0]]
    for i in range(1, len(cur_data) - 1):
        if cur_data[i][1] > cur_data[i + 1][1]:
            final_data.append(cur_data[i])
            final_data.append(cur_data[i + 1])
    filtered_data = final_data
    final_data = []
    for i in range(0, len(filtered_data) - 1, 2):
        coords1 = (float(filtered_data[i][2]), float(filtered_data[i][2]))
        coords2 = (float(filtered_data[i + 1][2]), float(filtered_data[i + 1][2]))
        diff = abs(coords1[0] - coords2[0]) + abs(coords1[1] - coords2[1])
        if filtered_data[i][5] == "NULL" or diff < 0.0001:
            continue
        if filtered_data[i + 1][1] - filtered_data[i][1] > 30:
            final_data.append(filtered_data[i])
            final_data.append(filtered_data[i + 1])

    if len(final_data) == 0:
        continue
    with open(f"car_data/{vehicle_id}data.csv", "w") as file:
        for d in final_data:
            file.write(",".join(list(map(str, d))))
            file.write("\n")
