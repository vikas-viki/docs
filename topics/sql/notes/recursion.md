## How recusion works in sql

ex: 
```sql
with recursive numbers as (
    select 1 as n
    union all
    select n+1 from numbers where n < 10
)
select * from numbers;
```

in the syntax we must specify `recursive` keyword
the where condition in the second query specifies, when the recursion must stop (recursion stops when there's no query retuned in the second query, you'll get to know more, down below)

the way it works it this.

1. initially the first query is ran and appened to the result(number). the ssecond query is not ran yet, it runs from second iteration.
2. the second iteration only the second query runs and it runs only on the results produced in the previous iteration not the whole `numbers` table in this case and the results of it is appended to numbers.
3. on the third iteraction, only second query runs, that too only on the results produced in second iteration not whole `numbers` then the result is appended.
4. same goes on until the second query returns `0 rows`, then it stops.

the output of the above query is numbers from 1 to 10, why 10 will come when condition is `n < 10` you ask ? cause n is 9 when the output (n+1) is 10 so 10 too comes.

ex: 2 (to get the hierarchy of employees under aasha)

```sql
with hierarchy_data as (
    select 
        e.id, e.name, e.manager_id, e.designation, 1 as lvl
    from emp_details
    union
    select 
        h.id, h.name, h.manager_id, h.designation, h.lvl + 1 as lvl
    from hierarchy_data h
    join emp_details e
    on h.id = e.manager_id
)
select * from hierarchy_data;
```