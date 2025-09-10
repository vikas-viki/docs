# SQL Practice Notes

## Concept Notes: Filtering Data

-   **WHERE:** Filters rows before grouping/aggregation. Works with
    conditions (`=`, `!=`, `<`, `>`, `<=`, `>=`).\
-   **Logical Operators:** Combine conditions with `AND`, `OR`, `NOT`.\
-   **LIKE:** Used for pattern matching. `%` matches any sequence of
    characters, `_` matches a single character.\
-   **HAVING:** Filters grouped results after aggregation (used with
    `GROUP BY`).

------------------------------------------------------------------------

## Queries & Explanations

``` sql
SELECT * 
FROM employee_salary 
WHERE first_name = 'Leslie';
```

➡ Retrieves rows where the first name is exactly 'Leslie'.\
(*You can also use `!=` to exclude a name.*)

``` sql
SELECT * 
FROM employee_salary 
WHERE salary >= 50000;
```

➡ Returns employees with salary greater than or equal to 50,000.

``` sql
SELECT * 
FROM employee_demographics 
WHERE birth_date > '1985-01-01';
```

➡ Returns employees born after January 1, 1985.

------------------------------------------------------------------------

### Logical Operators

``` sql
SELECT * 
FROM employee_demographics 
WHERE birth_date > '1985-01-01' OR NOT gender = 'Male';
```

➡ Returns employees either born after 1985 OR not male.

``` sql
SELECT * 
FROM employee_demographics 
WHERE (first_name = 'Leslie' AND age = 44) OR (age > 55);
```

➡ Finds employees named Leslie aged 44, or anyone older than 55.

------------------------------------------------------------------------

### LIKE Operator

``` sql
SELECT * 
FROM employee_demographics 
WHERE first_name LIKE '%a%';
```

➡ Finds names containing the letter 'a' anywhere.

``` sql
SELECT * 
FROM employee_demographics 
WHERE first_name LIKE 'a__%';
```

➡ Finds names starting with 'a' followed by at least 2 characters.

``` sql
SELECT * 
FROM employee_demographics 
WHERE birth_date LIKE '1985%';
```

➡ Finds employees born in 1985 (matches any date starting with 1985).

------------------------------------------------------------------------

### HAVING vs WHERE

``` sql
SELECT 
    gender, AVG(age) 
FROM employee_demographics
WHERE avg(age) > 40
GROUP BY gender;
```

➡ ❌ Invalid: `WHERE` cannot use aggregate functions because grouping
hasn't happened yet.

``` sql
SELECT 
    gender, AVG(age) 
FROM employee_demographics
GROUP BY gender
HAVING avg(age) > 40;
```

➡ ✅ Correct: `HAVING` applies conditions after grouping.

``` sql
SELECT occupation, avg(salary) 
FROM employee_salary
WHERE occupation LIKE '%manager%'
GROUP BY occupation
HAVING avg(salary) > 75000;
```

➡ Filters only occupations containing "manager" and keeps only those
groups with average salary above 75,000.
