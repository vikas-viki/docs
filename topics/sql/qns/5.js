let query = `
# Write your MySQL query statement below
select 
    DATE_FORMAT(trans_date, '%Y-%m') month,
    country,
    count(*) trans_count,
    SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) approved_count,
    SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) approved_total_amount,
    sum(amount) trans_total_amount
from transactions
group by month, country;
`;

// this show how you can get certain part of date using date_format()

/**
 * 📅 Year

%Y → 4-digit year (2025)

%y → 2-digit year (25)

📅 Month

%m → month number, 2-digit (01–12)

%c → month number, no leading zero (1–12)

%M → full month name (September)

%b → abbreviated month name (Sep)

📅 Day

%d → day of month, 2-digit (01–31)

%e → day of month, no leading zero (1–31)

%D → day of month with suffix (1st, 2nd, 15th)

⏰ Week / Weekday

%W → full weekday name (Monday)

%a → abbreviated weekday name (Mon)

%w → weekday number (0=Sunday … 6=Saturday)

%U → week number, Sunday first day (00–53)

%u → week number, Monday first day (00–53)

⏱️ Time

%H → hour (00–23)

%h or %I → hour (01–12)

%i → minutes (00–59)

%s → seconds (00–59)

%p → AM/PM
 */