let query = `
select person_name from  (
    select 
        person_name,
        sum(weight) over(order by turn) as total_weight
    from queue
    order by turn
) as running_sum
where total_weight <= 1000
order by total_weight desc 
limit 1;
`;

// to create a running sum, we use sum with orver and order by