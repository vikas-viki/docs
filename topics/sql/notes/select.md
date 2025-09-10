# SQL Practice Notes

## Concept Notes

-   \*\*SELECT \*:\*\* Retrieves all columns from a table.\
-   **Schema/Table Reference:** You can specify a schema (like
    `Parks_and_Recreation`) before the table name to query from a
    specific database.\
-   **Column Selection:** Instead of `*`, you can select only the
    columns you need.\
-   **Aliasing:** You can rename columns or calculations using `AS` or
    directly after the expression.\
-   **DISTINCT:** Used to return only unique values (removes
    duplicates).\
-   **ORDER BY + LIMIT:** Sorts results and limits how many rows are
    returned.\
-   **GROUP BY + HAVING:** Groups rows by a column(s) and applies
    conditions on aggregate results.

------------------------------------------------------------------------

## Queries & Explanations

``` sql
SELECT * FROM employee_demographics;
```

➡ Retrieves all columns and rows from the table `employee_demographics`.

``` sql
SELECT * FROM Parks_and_Recreation.employee_demographics;
```

➡ Retrieves everything from the table `employee_demographics` located in
the schema/database `Parks_and_Recreation`.

``` sql
SELECT 
first_name,
last_name 
FROM employee_demographics;
```

➡ Returns only the `first_name` and `last_name` columns.

------------------------------------------------------------------------

### Arithmetic in SQL

``` sql
SELECT * FROM employee_demographics;

SELECT 
first_name, 
last_name,
age,
age * 10 as avs
FROM employee_demographics;
```

➡ Adds a calculated column multiplying age by 10 and names it `avs`.\
(*SQL follows PEMDAS order for arithmetic.*)

------------------------------------------------------------------------

### DISTINCT

``` sql
SELECT DISTINCT
gender
FROM employee_demographics;
```

➡ Returns unique values of `gender`.

``` sql
SELECT DISTINCT
age, gender
FROM employee_demographics;
```

➡ Returns unique combinations of `age` and `gender`.

------------------------------------------------------------------------

### ORDER BY & LIMIT

``` sql
SELECT * 
FROM employee_demographics 
ORDER BY age DESC 
LIMIT 3;
```

➡ Retrieves the top 3 oldest employees.

``` sql
SELECT * 
FROM employee_demographics 
ORDER BY age DESC 
LIMIT 2, 1;
```

➡ Skips the first 2 results, then returns 1 row (pagination style).

------------------------------------------------------------------------

### Aliasing with Aggregates

``` sql
SELECT gender, AVG(age) avg_age
FROM employee_demographics 
GROUP BY gender
HAVING avg_age > 40;
```

➡ Groups rows by gender, calculates average age per group, and filters
groups with average age above 40.


```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

# to retrieve all tables in db
```