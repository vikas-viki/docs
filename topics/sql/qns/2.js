let query = `
select 
    distinct user_id as buyer_id, join_date,
    count(order_id) over(partition by user_id) as orders_in_2019
from users
left join (
    select * from orders
    where extract(year from order_date) = 2019
) as o
on users.user_id = o.buyer_id;
`;

// this teaches, when there's a certain condition for the second table, just filter the second table first and then do joins.
// be careful about using group by.