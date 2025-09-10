# SQL Practice Notes

## Concept Notes: UNION

-   **UNION:** Combines results from multiple SELECT queries into one
    result set.\
-   **UNION vs UNION ALL:** `UNION` removes duplicates by default, while
    `UNION ALL` keeps all rows (including duplicates).\
-   **Column Requirement:** Each query in a UNION must return the same
    number of columns with compatible datatypes.\
-   **Labels/Constants in UNION:** You can add constants or `NULL` to
    align the structure of different queries.

------------------------------------------------------------------------

## Queries & Explanations

``` sql
SELECT first_name, last_name
FROM employee_demographics
UNION ALL
SELECT first_name, last_name
FROM employee_salary;
```

➡ Combines first and last names from two tables. Uses `UNION ALL` so
duplicates are **not removed**.

``` sql
-- Note: UNION requires each SELECT to return the same number of columns
SELECT first_name, last_name, age, NULL as salary, 'old man' as label
FROM employee_demographics
WHERE age > 40 AND gender = 'Male'
UNION 
SELECT first_name, last_name, age, NULL as salary, 'old lady' as label
FROM employee_demographics
WHERE age > 40 AND gender = 'Female'
UNION
SELECT first_name, last_name, NULL as age, salary, 'highly paid' as label
FROM employee_salary
WHERE salary > 70000
ORDER BY first_name, last_name;
```

➡ Combines three sets of rows:\
- Men over 40 labeled as "old man".\
- Women over 40 labeled as "old lady".\
- Employees with salary above 70,000 labeled as "highly paid".\
The columns are aligned using `NULL` and string labels for consistency.

``` sql
SELECT * FROM employee_salary;
```

➡ Displays the full `employee_salary` table for reference.
