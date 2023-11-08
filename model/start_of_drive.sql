WITH SampleData AS (
    SELECT id, drivetime, latitude, longitude, elevation, capacity, vehicle_id
    FROM operation
    ORDER BY id
)

SELECT s1.id, s1.drivetime, s1.latitude, s1.longitude, s1.elevation, s1.capacity
FROM SampleData s1
JOIN SampleData s2 ON s1.id = s2.id + 1
WHERE s1.drivetime = 0 AND s2.drivetime <> 0;
