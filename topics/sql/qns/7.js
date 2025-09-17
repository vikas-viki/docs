let query = `
with feb_ratings as (
    select *
    from movierating
    where created_at >= '2020-02-01'
      and created_at < '2020-03-01'
)
, top_movie as (
    select m.title as results
    from feb_ratings fr
    join movies m on m.movie_id = fr.movie_id
    group by m.movie_id, m.title
    order by avg(fr.rating) desc, m.title
    limit 1
)
, top_user as (
    select u.name as results
    from movierating mr
    join users u on u.user_id = mr.user_id
    group by u.user_id, u.name
    order by count(mr.rating) desc, u.name
    limit 1
)
select * from top_movie
union all
select * from top_user;
`;

// this shows the usage of union all