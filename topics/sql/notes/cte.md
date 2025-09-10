# SQL Notes

## Concept: Common Table Expressions (CTEs)

A **CTE (Common Table Expression)** is like a temporary result set that
exists only for the duration of a single SQL statement.\
It makes queries easier to read and reuse compared to nested
subqueries.\
CTEs are defined using the `WITH` keyword and can be referenced
immediately after their definition.

------------------------------------------------------------------------

### Query 1: Aggregate Salary Data by Gender

``` sql
with CTE_Example as (
    select gender, avg(salary) avg_sal, max(salary) max_sal, min(salary) min_sal, count(salary) count_sal
    from employee_demographics dem
    join employee_salary sal
        on dem.employee_id = sal.employee_id
    group by gender
)
select * from CTE_Example;
```

**Explanation:**\
This CTE computes **average, max, min, and count of salaries** grouped
by gender, and then selects the results.

------------------------------------------------------------------------

### Query 2: Same CTE with Column Aliases in Definition

``` sql
with CTE_Example (gender, avg_sal, max_sal, min_sal, count_sal) as (
    select gender, avg(salary), max(salary), min(salary), count(salary)
    from employee_demographics dem
    join employee_salary sal
        on dem.employee_id = sal.employee_id
    group by gender
)
select * from CTE_Example;
```

**Explanation:**\
This does the same as Query 1, but instead of aliasing inside `SELECT`,
column aliases are defined directly in the CTE declaration.

------------------------------------------------------------------------

### Query 3: Joining Multiple CTEs

``` sql
with CTE_Example as (
    select employee_id, gender, birth_date
    from employee_demographics
    where birth_date > '1985-01-01'
),
CTE_Example2 as (
    select employee_id, salary
    from employee_salary
    where salary > 50000
)
select * from CTE_Example 
join CTE_Example2
    on CTE_Example.employee_id = CTE_Example2.employee_id;
```

**Explanation:**\
- `CTE_Example` filters employees born after 1985.\
- `CTE_Example2` filters employees with salaries above 50,000.\
- The final query joins both CTEs on `employee_id` to show employees
meeting both conditions.

------------------------------------------------------------------------

💡 **Quick Tip:** CTEs are often easier to read and maintain than nested
subqueries, but they must be used immediately after being defined.
