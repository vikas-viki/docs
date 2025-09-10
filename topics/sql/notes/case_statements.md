# SQL Notes

## Concept: CASE Statement

The `CASE` statement in SQL works like an `if-else` structure in
programming.\
It checks conditions one by one and returns a value when the first
condition is true.\
If no conditions are true, it returns the value from the `ELSE` clause
(if given).

------------------------------------------------------------------------

### Query 1: Categorizing Employees by Age

``` sql
select first_name, last_name, age,
case
    when age < 30 then 'Young'
    when age between 30 and 50 then 'Old'
    when age > 50 then 'Too old'
end as age_bracket
from employee_demographics;
```

**Explanation:**\
This query selects employee names and ages, then uses a `CASE` statement
to classify them as **Young**, **Old**, or **Too old** based on age
ranges.

------------------------------------------------------------------------

### Query 2: Salary Increase and Bonus

``` sql
select CONCAT(first_name, ' ',last_name) as name, salary,
case
    when salary < 50000 then salary * 1.05
    when salary > 50000 then salary * 1.07
    else 0
end as new_salary,
case 
    when dept_id = 6 then salary * 0.10
    else 0
end as bonus
from employee_salary;
```

**Explanation:**\
- Calculates a **new salary**:\
- +5% if salary \< 50,000\
- +7% if salary \> 50,000\
- Calculates a **bonus**:\
- 10% of salary if employee is in department 6

------------------------------------------------------------------------

### Query 3: Viewing Departments

``` sql
select * 
from parks_departments;
```

**Explanation:**\
This simply retrieves all columns and rows from the `parks_departments`
table.
