# Find users who have abandoned carts (items in cart but no order).
select user_id from cart_items 
where user_id not in (select user_id from orders)
group by user_id;

# Get the total value of each user’s cart.
select user_id, sum(quantity * price) from cart_items 
inner join products 
on products.product_id = cart_items.product_id
group by user_id;

# Find the most added product to carts in the last month.
select product_id, sum(quantity) as total_quantity from cart_items 
where (extract(month from added_at) = 02) and (extract(year from added_at) = 2024)
group by product_id order by total_quantity desc;

# List users with carts containing more than 3 unique products.
select user_id, count(distinct product_id) as product_count from cart_items
group by user_id 
having product_count > 3;

# Identify items frequently bought together (self-join on orders).
select a.product_id as product1, 
       b.product_id as product2, 
       count(*) as times_bought_together
from order_items a
join order_items b 
  on a.order_id = b.order_id         
 and a.product_id < b.product_id     
group by a.product_id, b.product_id
order by times_bought_together desc;
