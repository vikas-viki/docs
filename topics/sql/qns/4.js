let query = `
with first_order as (
    select 
        *,
        row_number() over(partition by customer_id order by order_date) as rn
    from delivery
)
select 
    round(
        100.0 * sum(case when order_date=customer_pref_delivery_date then 1 else 0 end) / count(*), <--
        2
    ) as immediate_percentage 
from first_order
where rn = 1;
`
// this tells how sum() works on each rows one by one and can be used like this