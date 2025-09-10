# SQL Practice Notes

## Concept Notes: Subqueries

-   **Subquery (Nested Query):** A query inside another query. Often
    used in WHERE, SELECT, or FROM clauses.\
-   **IN with Subquery:** Lets you filter results where a column matches
    values returned by another query.\
-   **Scalar Subquery:** A subquery that returns a single value, often
    used in the SELECT clause.\
-   **Subquery in FROM (Derived Table):** Treats the subquery results as
    a temporary table for further querying.

------------------------------------------------------------------------

## Queries & Explanations

``` sql
SELECT * 
FROM employee_demographics
WHERE employee_id IN (
    SELECT employee_id 
    FROM employee_salary 
    WHERE dept_id = 1
);
```

➡ Returns all employees whose `employee_id` exists in the salary table
for department 1.

``` sql
SELECT first_name, salary, 
       (SELECT avg(salary) FROM employee_salary) as avg_salary 
FROM employee_salary;
```

➡ Displays each employee's salary alongside the overall average salary
(scalar subquery).

``` sql
SELECT gender, avg(age), max(age), min(age), count(age)
FROM employee_demographics 
GROUP BY gender;
```

➡ Groups employees by gender, showing average, max, min, and count of
ages.

``` sql
SELECT gender, avg(max_age) 
FROM (
    SELECT gender, avg(age), max(age) as max_age, min(age), count(age)
    FROM employee_demographics 
    GROUP BY gender
) as agg_table 
GROUP BY gender;
```

➡ Uses a subquery as a derived table (`agg_table`) and then performs an
aggregation on its results.
