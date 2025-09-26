let query = `
# Write your MySQL query statement below
with filtered as (
    select 
        employee_id,
        count(*) as meeting_heavy_weeks
    from (
        select 
            *,
            yearweek(meeting_date, 1) as week,
            sum(duration_hours) as weekely_meetings
        from meetings
        group by employee_id, week
        having weekely_meetings >= 20
    ) as tagged
    group by employee_id
    having meeting_heavy_weeks >= 2
)
select 
    filtered.employee_id, 
    employee_name, 
    department,
    meeting_heavy_weeks
from filtered
left join employees
on filtered.employee_id = employees.employee_id
order by meeting_heavy_weeks desc, employee_name;
`;

// how to get week from a date using yearweek