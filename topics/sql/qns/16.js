let query = `
select customer_id 
from customer_transactions 
group by customer_id
having sum( transaction_type ='purchase') >2 
and
datediff(max(transaction_date),min(transaction_date))>29
and
sum(transaction_type ='refund')/count(*)<0.2
order by 1
`;

// having can see the grouped data by `group by` and you can run aggregate functions on that as well.