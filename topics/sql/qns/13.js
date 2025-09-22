let query = `
# Write your MySQL query statement below
with ranked as (
    select 
        a.employee_id,
        review_id, 
        review_date,
        rating,
        name,
        row_number() over(partition by a.employee_id order by b.review_date desc) rn,
        count(*) over(partition by a.employee_id) review_count
    from employees a
    inner join performance_reviews b
    on a.employee_id = b.employee_id
    order by employee_id, review_date desc
),
tagged as (
    select 
        *,
        max(case when rn = 1 then rating end) as review3,
        max(case when rn = 2 then rating end) as review2,
        max(case when rn = 3 then rating end) as review1
    from ranked 
    where review_count >= 3 and rn <= 3
    group by employee_id
    having review1 < review2 and review2 < review3
)
select 
    employee_id, 
    name, 
    review3-review1 as improvement_score
from tagged 
order by improvement_score desc, name; 
`

// using max, case with group by to map each row belongs to a certain type/value.