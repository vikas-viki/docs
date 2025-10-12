# SQL Queries Learning Notes

## Concepts Introduced

### GROUP BY

-   Used to group rows that have the same values in specified columns
    into summary rows.\
-   Often combined with aggregate functions like `AVG()`, `MAX()`,
    `MIN()`, `COUNT()`.\
-   Any column in the `SELECT` clause must either be in the `GROUP BY`
    clause or be an aggregate function.

### ORDER BY

-   Used to sort the result-set by one or more columns.\
-   Can specify ascending (`ASC`, default) or descending (`DESC`).\
-   Columns can be referenced by name or by their position number in the
    `SELECT` list (1-based index).

------------------------------------------------------------------------

## Queries & Explanations

``` sql
select * from employee_demographics;
```

👉 Retrieves all columns and rows from the `employee_demographics`
table.

------------------------------------------------------------------------

``` sql
# anything in select must match(stay) in grouping or it must be a aggregate function
select 
gender, AVG(age) as avg_age
from employee_demographics
group by gender;
```

👉 Groups employees by `gender` and calculates the average age for each
gender.

------------------------------------------------------------------------

``` sql
# grouping only works in similar row values
select 
occupation, salary
from employee_salary
group by occupation, salary;
```

👉 Groups data by `occupation` and `salary`. Only unique combinations of
occupation and salary will remain.

------------------------------------------------------------------------

``` sql
select 
gender, AVG(age) as avg_age, MAX(age) as max_age, MIN(age) as min_age, COUNT(age) # count gets the grouped columns
from employee_demographics
group by gender;
```

👉 Groups employees by `gender`, then shows:\
- Average age\
- Maximum age\
- Minimum age\
- Count of employees per gender

------------------------------------------------------------------------

``` sql
# orderby
select * from employee_demographics order by gender DESC, age DESC; # you can order multiple columns
```

👉 Retrieves all rows, sorted first by `gender` (descending) and then by
`age` (descending).

------------------------------------------------------------------------

``` sql
select * from employee_demographics order by 5, 4; # based on column no's (1 based index)
```

👉 Retrieves all rows and sorts them by the 5th column, then the 4th
column, in ascending order by default.


**If you want to concat all the strings of a particular column after groping, you'd use group_concat, like below**

```sql
select 
    sell_date,
    count(distinct product) as num_sold,
    group_concat(distinct product order by product separator ',') as products
from activities 
group by sell_date
order by sell_date;
```