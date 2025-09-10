# SQL Queries Learning Notes (Stored Procedures)

## Concepts Introduced

### Stored Procedures

-   A stored procedure is a set of SQL statements saved and stored in
    the database.\
-   They allow reusability and modularization of SQL code.\
-   Can accept parameters (input values) to make the procedure flexible.

### DELIMITER

-   By default, SQL statements end with a semicolon (`;`).\
-   To define a procedure, we temporarily change the delimiter (e.g.,
    `$$`) so that semicolons inside the procedure don't end it
    prematurely.\
-   After creating the procedure, we reset the delimiter back to `;`.

------------------------------------------------------------------------

## Queries & Explanations

``` sql
USE `Parks_and_Recreation`;
DROP procedure IF EXISTS `new_procedure`;
```

👉 Switches to the `Parks_and_Recreation` database and removes any
existing procedure named `new_procedure` if it exists.

------------------------------------------------------------------------

``` sql
DELIMITER $$
create procedure large_salaryies2()
BEGIN 
  select * from employee_salary where salary >= 50000;
  select * from employee_salary where salary >= 10000;
END $$
DELIMITER ;
```

👉 Defines a stored procedure named `large_salaryies2`.\
- It runs two queries: one selecting employees with salary ≥ 50,000 and
another with salary ≥ 10,000.

------------------------------------------------------------------------

``` sql
call large_salaryies2();
```

👉 Executes the stored procedure `large_salaryies2`.

------------------------------------------------------------------------

``` sql
DELIMITER $$
create procedure large_salaries3(base_salary INT)
BEGIN 
  select * from employee_salary where salary >= base_salary;
END $$
DELIMITER ;
```

👉 Defines a stored procedure `large_salaries3` that accepts an integer
parameter (`base_salary`).\
- The query selects employees whose salary is greater than or equal to
the provided value.

------------------------------------------------------------------------

``` sql
call large_salaries3(75000);
```

👉 Executes `large_salaries3`, passing `75000` as the parameter,
returning employees with salary ≥ 75,000.
