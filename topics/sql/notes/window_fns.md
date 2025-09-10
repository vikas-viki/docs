# SQL Practice Notes

## Concept Notes: Window Functions

-   **Window Functions:** Perform calculations across a set of rows
    related to the current row without collapsing the result into
    groups.\
-   **OVER():** Turns an aggregate into a window function by keeping
    rows while adding the aggregate.\
-   **PARTITION BY:** Splits rows into groups for window functions.\
-   **ORDER BY inside OVER():** Defines the order in which window
    functions are applied.

------------------------------------------------------------------------

## 1. OVER()

``` sql
SELECT 
  first_name, 
  last_name, 
  salary,
  AVG(salary) OVER() AS avg_salary
FROM employee_salary;
```

➡ Shows each employee's salary and the average salary of all employees.

------------------------------------------------------------------------

## 2. PARTITION BY

``` sql
SELECT 
  first_name,
  last_name,
  dept_id,
  salary,
  AVG(salary) OVER(PARTITION BY dept_id) AS avg_salary_by_dept
FROM employee_salary;
```

➡ Each employee sees the average salary of their own department.

------------------------------------------------------------------------

## 3. ROW_NUMBER()

``` sql
SELECT 
  first_name,
  last_name,
  dept_id,
  salary,
  ROW_NUMBER() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS row_num
FROM employee_salary;
```

➡ Numbers employees within each department by salary (highest = 1).

------------------------------------------------------------------------

## 4. RANK()

``` sql
SELECT 
  first_name,
  last_name,
  dept_id,
  salary,
  RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept
FROM employee_salary;
```

➡ Assigns ranks by salary within each department; ties share a rank and
skip numbers.

------------------------------------------------------------------------

## 5. DENSE_RANK()

``` sql
SELECT 
  first_name,
  last_name,
  dept_id,
  salary,
  DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS dense_rank_in_dept
FROM employee_salary;
```

➡ Similar to RANK but does not skip numbers when ties occur.

------------------------------------------------------------------------

## 6. NTILE()

``` sql
SELECT 
  first_name,
  last_name,
  salary,
  NTILE(4) OVER(ORDER BY salary DESC) AS salary_quartile
FROM employee_salary;
```

➡ Splits employees into 4 groups (quartiles) based on salary.

------------------------------------------------------------------------

## 7. LEAD()

``` sql
SELECT 
  first_name,
  last_name,
  salary,
  LEAD(salary) OVER(ORDER BY salary DESC) AS next_salary
FROM employee_salary;
```

➡ Shows the next row's salary (looks forward).

------------------------------------------------------------------------

## 8. LAG()

``` sql
SELECT 
  first_name,
  last_name,
  salary,
  LAG(salary) OVER(ORDER BY salary DESC) AS previous_salary
FROM employee_salary;
```

➡ Shows the previous row's salary (looks backward).

------------------------------------------------------------------------

## 9. FIRST_VALUE() & LAST_VALUE()

``` sql
SELECT 
  first_name,
  last_name,
  dept_id,
  salary,
  FIRST_VALUE(salary) OVER(PARTITION BY dept_id ORDER BY salary DESC) AS highest_salary,
  LAST_VALUE(salary) OVER(PARTITION BY dept_id ORDER BY salary DESC 
                          ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_salary
FROM employee_salary;
```

➡ Shows the top and bottom salary within each department.

------------------------------------------------------------------------

## 10. CUME_DIST()

``` sql
SELECT 
  first_name,
  last_name,
  salary,
  CUME_DIST() OVER(ORDER BY salary) AS salary_percentile
FROM employee_salary;
```

➡ Returns a relative standing (0--1) showing where the salary falls
compared to others.

------------------------------------------------------------------------

## ✅ Quick Reference

  Function          Purpose
  ----------------- ----------------------------------------------
  `ROW_NUMBER()`    Unique row numbering
  `RANK()`          Rank with ties, skips numbers
  `DENSE_RANK()`    Rank with ties, no skips
  `NTILE(n)`        Split rows into n groups
  `LEAD()`          Value from next row
  `LAG()`           Value from previous row
  `FIRST_VALUE()`   First value in partition
  `LAST_VALUE()`    Last value in partition (needs frame clause)
  `CUME_DIST()`     Cumulative distribution (percentile)

------------------------------------------------------------------------

🔑 Use **GROUP BY** when you only need grouped results.\
🔑 Use **OVER()** when you want aggregates *plus* the original rows.\
🔑 Add **PARTITION BY** inside OVER() to scope the aggregate to
subgroups.
