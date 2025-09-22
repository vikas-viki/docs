let query = `
WITH tagged AS (
    SELECT 
        a.product_id,
        quantity,
        price,
        product_name,
        category,
        quantity * price AS revenue,
        CASE
            WHEN MONTH(sale_date) IN (12,1,2) THEN 'Winter'
            WHEN MONTH(sale_date) IN (3,4,5) THEN 'Spring'
            WHEN MONTH(sale_date) IN (6,7,8) THEN 'Summer'
            ELSE 'Fall'
        END AS season
    FROM sales a
    INNER JOIN products b 
        ON a.product_id = b.product_id
),
sorted AS (
    SELECT 
        season, 
        category,
        SUM(quantity) AS total_quantity,
        SUM(revenue) AS total_revenue,
        ROW_NUMBER() OVER(
            PARTITION BY season 
            ORDER BY SUM(quantity) DESC, SUM(revenue) DESC
        ) AS rn
    FROM tagged
    GROUP BY season, category
)
SELECT 
    season, 
    category,
    total_quantity,
    total_revenue
FROM sorted
WHERE rn = 1;
`;

// using multiple with statements.