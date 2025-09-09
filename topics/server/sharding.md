# 🧩 Sharding in Databases

## What is Sharding?
Sharding is **horizontal partitioning** of data across multiple servers (shards).  
Instead of storing everything on a single machine, the data is split into smaller chunks and distributed.  
It improves scalability, performance, and storage capacity.

---

## Example

Suppose you have a **users collection** with millions of records.  
You shard by `userId`:

- **Shard 1** → userId: 1–1,000,000  
- **Shard 2** → userId: 1,000,001–2,000,000  
- **Shard 3** → userId: 2,000,001–3,000,000  

A query for `userId: 1,500,000` goes only to **Shard 2**,  
instead of scanning the entire dataset → **faster queries** ✅

---

## 🔑 10 Common Interview Questions on Sharding

1. **What is sharding?**  
Splitting data across multiple servers (horizontal partitioning).  

2. **Why do we need sharding?**  
To handle large datasets and high traffic by scaling horizontally.  

3. **What is a shard key?**  
A field used to decide how data is distributed across shards.  

4. **Difference between sharding and replication?**  
Sharding = splits data, Replication = copies data for redundancy.  

5. **What happens if you choose a bad shard key?**  
Uneven data distribution → hotspots and performance issues.  

6. **Does sharding apply only to MongoDB?**  
No, it’s a general concept used in SQL and NoSQL databases.  

7. **How does MongoDB handle sharding?**  
Using Shards, Config Servers, and Mongos (query router).  

8. **What’s the main advantage of sharding?**  
Scales storage and query throughput by adding more machines.  

9. **Can you change a shard key later?**  
No (in MongoDB, not easily). It must be chosen carefully upfront.  

10. **What is a balanced cluster?**  
When data is evenly distributed across all shards.  

---

## ✅ Summary
- Sharding = split data across servers.  
- Useful for large-scale applications.  
- Requires careful shard key selection.  
