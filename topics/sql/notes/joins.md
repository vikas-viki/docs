# SQL Queries Learning Notes (Joins)

## Concepts Introduced

### INNER JOIN

-   Combines rows from two tables where there is a match on the join
    condition.\
-   Only rows with matching values in both tables are returned.\
-   `JOIN` defaults to `INNER JOIN` if not specified.

### OUTER JOIN

-   Includes rows even when there is no match in one of the tables.\
-   **LEFT JOIN**: Takes all rows from the left table and matching rows
    from the right.\
-   **RIGHT JOIN**: Takes all rows from the right table and matching
    rows from the left.

### SELF JOIN

-   A table joins with itself.\
-   Useful for comparing rows within the same table.\
-   Requires table aliases to differentiate the two "copies" of the same
    table.

### Joining Multiple Tables

-   Multiple `JOIN` clauses can be chained.\
-   Each join condition must specify how one table connects to another.

------------------------------------------------------------------------

## Queries & Explanations

``` sql
# inner join (mention what is inner join too) default is innerjoin
select * from employee_demographics
inner join employee_salary
on employee_demographics.employee_id = employee_salary.employee_id;
```

👉 Returns rows where `employee_id` exists in both
`employee_demographics` and `employee_salary`. Non-matching rows are
excluded.

------------------------------------------------------------------------

``` sql
select * from employee_demographics as dem
inner join employee_salary as sal
on dem.employee_id = sal.employee_id;
```

👉 Same as above, but using table aliases (`dem` and `sal`) for shorter
references.

------------------------------------------------------------------------

``` sql
select dem.employee_id, age, occupation from employee_demographics as dem
inner join employee_salary as sal
on dem.employee_id = sal.employee_id;
```

👉 Joins both tables but selects only `employee_id`, `age`, and
`occupation`.

------------------------------------------------------------------------

``` sql
# outer join (outer left or outer right)
# left join (take everything from left and take only matching from right)
# right join (take everything from right and take only matching from left)
select * from employee_demographics as dem
left join employee_salary as sal
on dem.employee_id = sal.employee_id;
```

👉 Retrieves all rows from `employee_demographics` and only matching
rows from `employee_salary`. Non-matching rows will have `NULL` values
for salary fields.

------------------------------------------------------------------------

``` sql
# self join
select emp1.employee_id, emp1.first_name as fn1, emp2.employee_id, emp2.first_name as fn2
from employee_salary as emp1
join employee_salary as emp2
on emp1.employee_id + 1 = emp2.employee_id;
```

👉 Joins the `employee_salary` table with itself. Each row in `emp1` is
matched with the row in `emp2` whose `employee_id` is one greater.

------------------------------------------------------------------------

``` sql
# joining multiple tables
select dem.employee_id, sal.first_name, pd.department_name 
from employee_demographics as dem
inner join employee_salary as sal
  on dem.employee_id = sal.employee_id 
inner join parks_departments as pd
  on sal.dept_id = pd.department_id;
```

👉 Combines three tables:\
- Matches `employee_demographics` with `employee_salary` on
`employee_id`.\
- Then matches `employee_salary` with `parks_departments` on department
IDs.\
- Result shows employee ID, first name, and department name.
