let query = `
with s2 as (
    select 
        product_id, 
        year as first_year, 
        quantity, 
        price,
        rank() over(partition by product_id order by year asc) as rn
    from sales
)

select 
    product_id, 
    first_year, 
    quantity, 
    price 
from s2
where rn = 1;
`;

// this teaches, how you can get the minimum (first year) of each product and relative price and quantity of it.
// leetcode 1070