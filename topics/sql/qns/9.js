let query = `
SELECT b.category, IF(accounts_count IS NOT NULL, accounts_count, 0) AS accounts_count
FROM (
    SELECT (
        CASE
        WHEN income < 20000 THEN 'Low Salary'
        WHEN income > 50000 THEN 'High Salary'
        ELSE 'Average Salary'
        END
    ) AS category, COUNT(account_id) AS accounts_count
    FROM Accounts
    GROUP BY category
) AS a
RIGHT JOIN (
    SELECT 'Low Salary' AS category
    UNION
    SELECT 'Average Salary' AS category
    UNION
    SELECT 'High Salary' AS category
) AS b
    ON a.category = b.category;
`

// use of union with select