# Write a query to find the top 3 regions with the highest sales.
select region, sum(amount) as total_sales from sales group by region order by total_sales desc limit 3;

# Find the total sales per region and order them descending.
select region, sum(amount) sum_sales from sales group by region order by sum_sales desc;

# Find the region with maximum revenue in a given year.
select region, sum(amount) as total_sales 
from sales 
where extract(year from sale_date) = 2024
group by region 
order by total_sales desc 
limit 1;

# Calculate cumulative sales per region (window functions).
select region, sale_date, amount, 
sum(amount) over(partition by region order by sale_date) as cumulative_sales from sales;

