let query = `
select 
    request_at as Day,
    round(
        sum(case when t.status in ('cancelled_by_driver', 'cancelled_by_client') then 1 else 0 end) / count(*)
        ,2
    ) as \`Cancellation Rate\`
from 
    trips t
join users c
on c.users_id = t.client_id and c.banned = 'No'
join users d
on d.users_id = t.driver_id and d.banned = 'No'
where request_at between  "2013-10-01" and "2013-10-03"
group by request_at;
`;

// show how you can filter two columns of the same table
// relative to another table using multi combined joins.ip-match