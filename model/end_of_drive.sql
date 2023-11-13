WITH SampleData AS (
    SELECT id, drivetime, latitude, longitude, elevation, soc, vehicle_id, ext_temp
    FROM operation
    ORDER BY id
)

SELECT s1.id, s1.drivetime, s1.latitude, s1.longitude, s1.elevation, s1.soc, s1.vehicle_id, s1.ext_temp
FROM SampleData s1
JOIN SampleData s2 ON s1.id = s2.id + 1
WHERE s1.drivetime <> 0 AND s2.drivetime = 0;
