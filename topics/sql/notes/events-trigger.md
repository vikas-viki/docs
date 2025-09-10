# SQL Notes

## Concept: Triggers

A **trigger** in SQL is a block of code that automatically executes in
response to certain database events (like `INSERT`, `UPDATE`, or
`DELETE`).\
They are useful for enforcing rules, auditing, or automatically updating
related tables.\
Triggers can run **before** or **after** the triggering event.

------------------------------------------------------------------------

### Query 1: Trigger for Employee Insert

``` sql
delimiter $$
create trigger employee_insert
    after insert on employee_salary
    for each row 
begin 
    insert into employee_demographics (employee_id, first_name, last_name) 
    values(NEW.employee_id, new.first_name, new.last_name);
end $$
delimiter ;
```

**Explanation:**\
This trigger runs **after an insert** on the `employee_salary` table.\
It automatically inserts the new employee's ID, first name, and last
name into the `employee_demographics` table.\
`NEW` refers to the values being inserted.

------------------------------------------------------------------------

### Query 2: Insert New Employee (Trigger in Action)

``` sql
insert into employee_salary(employee_id, first_name, last_name, occupation, salary, dept_id)
value(13, 'vikas', 'kotary', 'software dev', 1000000, 23);
```

**Explanation:**\
When this row is inserted into `employee_salary`, the **trigger
automatically inserts** the corresponding row into
`employee_demographics`.

------------------------------------------------------------------------

## Concept: Events

An **event** in SQL is a task that is scheduled to run automatically at
a specific time or interval.\
Unlike triggers (which react to changes), events run **based on a
schedule**.\
They must be enabled in the database to function.

------------------------------------------------------------------------

### Query 3: Scheduled Event to Delete Retirees

``` sql
delimiter $$
create event delete_retirees
on schedule every 30 second 
do 
begin 
    delete from employee_demographics where age >= 60;
end $$
delimiter ;
```

**Explanation:**\
This event automatically runs every 30 seconds.\
It deletes employees from `employee_demographics` whose age is **60 or
older**.

------------------------------------------------------------------------

### Query 4: Checking Event Status

``` sql
show variables like 'event%';
```

**Explanation:**\
This checks if the event scheduler is enabled.\
- `event_scheduler = ON` → Events are active.\
- `event_scheduler = OFF` → Events won't run until enabled.

------------------------------------------------------------------------

💡 **Quick Tip:**\
- Use **triggers** for *reactive* actions (when data changes).\
- Use **events** for *scheduled* actions (time-based automation).
