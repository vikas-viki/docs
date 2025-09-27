# 📅 Common MySQL Date & Time Functions

## 1. `CURDATE()` / `CURRENT_DATE()`
Returns the current date (no time).
```sql
SELECT CURDATE(); -- 2025-09-27
```

## 2. `NOW()`
Returns the current date and time.
```sql
SELECT NOW(); -- 2025-09-27 14:25:32
```

## 3. `DATE()`
Extracts the date part from a datetime/timestamp.
```sql
SELECT DATE('2025-09-27 14:25:32'); -- 2025-09-27
```

## 4. `YEAR()` / `MONTH()` / `DAY()`
Extracts parts of the date.
```sql
SELECT YEAR(NOW()), MONTH(NOW()), DAY(NOW());
```

## 5. `DAYNAME()` / `MONTHNAME()`
Get weekday or month name.
```sql
SELECT DAYNAME(CURDATE()); -- Saturday
SELECT MONTHNAME(CURDATE()); -- September
```

## 6. `DATE_FORMAT(date, format)`
Custom formatting of dates.
```sql
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s');
```
---

## Year
- **%Y** → Year, numeric, 4 digits  
  `2025`  
- **%y** → Year, numeric, 2 digits  
  `25`

---

## Month
- **%M** → Month name (January..December)  
  `September`  
- **%m** → Month, numeric, zero-padded (01..12)  
  `09`  
- **%c** → Month, numeric (1..12)  
  `9`  
- **%b** → Abbreviated month name (Jan..Dec)  
  `Sep`

---

## Day
- **%d** → Day of the month, zero-padded (01..31)  
  `27`  
- **%e** → Day of the month (1..31)  
  `27`  
- **%D** → Day of the month with suffix (1st, 2nd, 3rd, ...)  
  `27th`  

---

## Week / Day of Week
- **%W** → Weekday name (Sunday..Saturday)  
  `Saturday`  
- **%a** → Abbreviated weekday name (Sun..Sat)  
  `Sat`  
- **%w** → Day of week (0=Sunday..6=Saturday)  
  `6`  
- **%U** → Week (00..53), Sunday as first day of week  
  `39`  
- **%u** → Week (00..53), Monday as first day of week  
  `39`  
- **%V** → Week (01..53), ISO week number, Sunday as first day  
- **%v** → Week (01..53), ISO week number, Monday as first day  


## 7. `DATEDIFF(date1, date2)`
Difference in days between two dates.
```sql
SELECT DATEDIFF('2025-09-30', '2025-09-27'); -- 3
```

## 8. `TIMESTAMPDIFF(unit, date1, date2)`
Flexible difference (seconds, minutes, hours, days, months, years).
```sql
SELECT TIMESTAMPDIFF(DAY, '2025-09-01', '2025-09-27'); -- 26
SELECT TIMESTAMPDIFF(MONTH, '2024-09-27', '2025-09-27'); -- 12
```

## 9. `ADDDATE()` / `DATE_ADD()`
Add interval to a date.
```sql
SELECT DATE_ADD(CURDATE(), INTERVAL 7 DAY); -- 2025-10-04
```

## 10. `SUBDATE()` / `DATE_SUB()`
Subtract interval from a date.
```sql
SELECT DATE_SUB(CURDATE(), INTERVAL 1 MONTH);
```

## 11. `LAST_DAY(date)`
Returns the last day of the month.
```sql
SELECT LAST_DAY('2025-09-15'); -- 2025-09-30
```

## 12. `WEEK()` / `WEEKDAY()` / `QUARTER()`
Breakdowns useful for reports.
```sql
SELECT WEEK(NOW()), WEEKDAY(NOW()), QUARTER(NOW());
```

## 6. EXTRACT()

Extracts specific parts of a date (flexible alternative to YEAR(), MONTH(), etc.).
```sql
SELECT EXTRACT(YEAR FROM NOW()), EXTRACT(MONTH FROM NOW()), EXTRACT(DAY FROM NOW());
```

# 🔑 In Interview Context
- **Cart Abandonment**: Group by `DATE(order_date)` or `WEEK(order_date)`.  
- **Regional Sales**: Aggregate with `MONTH(order_date)` or `YEAR(order_date)`.  
- **Ratios over time**: Use `DATEDIFF` or `TIMESTAMPDIFF` to calculate durations between cart addition and order.  
- **Quarterly reports**: Use `QUARTER(order_date)` with `YEAR(order_date)`.
