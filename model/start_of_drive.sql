WITH SampleData AS (
    SELECT id, drivetime, latitude, longitude, elevation, soc, vehicle_id, ext_temp
    FROM operation
    ORDER BY id
)

SELECT s2.id, s2.drivetime, s2.latitude, s2.longitude, s2.elevation, s2.soc. s2.vehicle_id, s2.ext_temp
FROM SampleData s1
JOIN SampleData s2 ON s1.id = s2.id + 1
WHERE s1.drivetime = 0 AND s2.drivetime <> 0;
