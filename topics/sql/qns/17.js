let query = `
with filtered as (
    select 
        distinct user_id, date(created_at) as created_at, url
    from event
),
with numbered as (
    select 
        *,
        row_number() over(partition by user_id, url order by created_at) rn
    from filtered
),
with grouped as (
    select
        user_id, 
        url,
        count(*) as streak
    from (
        select 
            *,
            date_sub(created_at, interval rn days) as grp
        from numbered
    ) t
    group by user_id, url, grp
    
)
select 
    round(count(distinct user_id) / (select count(distinct user_id) from events), 2) as percent_of_users
from grouped
where streak >= 7;
`

// this show how you can solve streak based problems
// when you subtract the day (row_number) from a date, if all the date is streak wise maintained, 
// it will eventually be the same date. hence you count them.