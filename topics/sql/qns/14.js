let query = `
WITH first_positive AS (
    SELECT patient_id, MIN(test_date) AS first_pos_date
    FROM covid_tests
    WHERE result = 'Positive'
    GROUP BY patient_id
),
first_negative AS (
    SELECT c.patient_id, MIN(c.test_date) AS first_neg_date
    FROM covid_tests c
    JOIN first_positive p
      ON c.patient_id = p.patient_id
     AND c.test_date > p.first_pos_date
    WHERE c.result = 'Negative'
    GROUP BY c.patient_id
)
SELECT 
    p.patient_id,
    p.patient_name,
    p.age,
    DATEDIFF(n.first_neg_date, f.first_pos_date) AS recovery_time
FROM first_positive f
JOIN first_negative n
    ON f.patient_id = n.patient_id
JOIN patients p
    ON p.patient_id = f.patient_id
ORDER BY recovery_time ASC, p.patient_name ASC;
`;

// shows how to use date diff in mysql to get the days diff