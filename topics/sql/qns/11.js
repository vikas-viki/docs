let query = `
with tagged as (
    select 
        productinfo.product_id,  
        category,
        user_id, 
        quantity    
    from productpurchases
    left join productinfo
    on productpurchases.product_id=productinfo.product_id
)
select
    a.product_id product1_id, 
    b.product_id product2_id,
    a.category product1_category,
    b.category product2_category,
    count(*) customer_count
from tagged a
inner join tagged b
on a.user_id = b.user_id and a.product_id < b.product_Id
group by 
    least(a.product_id, b.product_id),
    greatest(a.product_id, b.product_id)
having count(distinct a.user_id) >= 3
order by customer_count desc, product1_id, product2_id;
`;

// shows how < can be used instead of != while joining to avoid, duplication of pairs based on order.
// like treating (X,Y) and (Y,X) as two different rows in case of !=