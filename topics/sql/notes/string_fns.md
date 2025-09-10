# SQL Practice Notes

## Concept Notes: String Functions

-   **LENGTH():** Returns the number of characters in a string.\
-   **UPPER()/LOWER():** Converts text to uppercase or lowercase.\
-   **TRIM()/LTRIM()/RTRIM():** Removes spaces (all, left side, or right
    side).\
-   **SUBSTRING():** Extracts part of a string starting at a given
    position.\
-   **LEFT()/RIGHT():** Returns characters from the left or right side.\
-   **REPLACE():** Substitutes part of a string with another.\
-   **LOCATE():** Finds the position of a substring inside another
    string.\
-   **CONCAT():** Joins strings together.

------------------------------------------------------------------------

## Queries & Explanations

``` sql
SELECT length('skyfall');
```

➡ Returns the length of the string `'skyfall'` (7).

``` sql
SELECT first_name, length(first_name) 
FROM employee_demographics
ORDER BY 2;
```

➡ Shows each employee's first name with its length, sorted by the length
column.

``` sql
SELECT UPPER('sky');
SELECT LOWER('SKY');
```

➡ Converts strings to uppercase and lowercase.

``` sql
SELECT first_name, upper(first_name) 
FROM employee_demographics;
```

➡ Displays first names in both original and uppercase forms.

------------------------------------------------------------------------

### Trimming

``` sql
SELECT rtrim('   sky scraper   ');
```

➡ Removes spaces on the right side of the string.

------------------------------------------------------------------------

### Substring, Left, Right

``` sql
SELECT first_name, left(first_name, 4) 
FROM employee_demographics;
```

➡ Returns the first 4 characters of each `first_name`.

``` sql
SELECT first_name, right(first_name, 4) 
FROM employee_demographics;
```

➡ Returns the last 4 characters of each `first_name`.

``` sql
SELECT first_name, substring(first_name, 3, 2)  # including 3, till 2
FROM employee_demographics;
```

➡ Extracts 2 characters starting from position 3 in `first_name`.

``` sql
SELECT first_name, substring(birth_date, 6, 2) as birth_month 
FROM employee_demographics;
```

➡ Extracts the month part from `birth_date`.

------------------------------------------------------------------------

### Replace

``` sql
SELECT first_name, replace(first_name, 'a', 'z') 
FROM employee_demographics;
```

➡ Replaces all occurrences of `a` with `z` in `first_name`.

------------------------------------------------------------------------

### Locate

``` sql
SELECT locate('x', 'Alexander');
```

➡ Finds the position of `'x'` in the word `'Alexander'` (2).

------------------------------------------------------------------------

### Concatenation

``` sql
SELECT first_name, last_name, CONCAT(first_name, ' ', last_name) as full_name 
FROM employee_demographics;
```

➡ Combines `first_name` and `last_name` into a single `full_name`.
