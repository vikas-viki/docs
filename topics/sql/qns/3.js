let query = `
WITH tagged AS (
    SELECT product_id, new_price, change_date
    FROM (
        SELECT 
            product_id,
            new_price,
            change_date,
            ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY change_date DESC) AS rn
        FROM products
        WHERE change_date <= '2019-08-16'
    ) t
    WHERE rn = 1
)
SELECT 
    p.product_id,
    COALESCE(t.new_price, 10) AS price
FROM (SELECT DISTINCT product_id FROM products) p
LEFT JOIN tagged t ON p.product_id = t.product_id;
`;

// this tells, how you can use coalesce(takes list of values and returns first non null value) can be used.