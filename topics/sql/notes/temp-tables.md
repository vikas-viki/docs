# SQL Practice Notes

## Concept Notes: Temporary Tables

-   **Temporary Table:** A table that exists only during the current
    database session. It disappears automatically when the session
    ends.\
-   **CREATE TEMPORARY TABLE:** Used to define a temporary table with
    columns and datatypes.\
-   **INSERT INTO:** Adds rows into the temporary table.\
-   **Temporary Table from SELECT:** You can create a temporary table
    directly from a query's result set.

------------------------------------------------------------------------

## Queries & Explanations

``` sql
CREATE TEMPORARY TABLE temp_table
(
    first_name varchar(50),
    last_name varchar(50),
    favorit_movie varchar(100)
);
```

➡ Creates a temporary table named `temp_table` with three columns.

``` sql
INSERT INTO temp_table VALUES('vikas', 'kotary', 'at 18');
```

➡ Inserts one row into the temporary table.

``` sql
SELECT * FROM temp_table;
```

➡ Retrieves all rows from the temporary table.

``` sql
SELECT * FROM employee_salary;
```

➡ Shows all rows from the permanent `employee_salary` table (for
comparison).

``` sql
CREATE TEMPORARY TABLE salary_over_50k 
SELECT * 
FROM employee_salary 
WHERE salary >= 50000;
```

➡ Creates a temporary table `salary_over_50k` with only employees
earning 50,000 or more.

``` sql
SELECT * FROM salary_over_50k;
```

➡ Displays rows from the new temporary table.
