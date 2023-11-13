SELECT
    vehicle_id,
    MAX(range_est) AS max_range_est,
    MAX(soc) AS max_soc
FROM
    operation
WHERE
    soc <= 100
GROUP BY
    vehicle_id;
