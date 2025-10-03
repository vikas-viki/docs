# SQL Notes

## ACID Properties

**A - Atomicity**  
A transaction in an SQL database must either fully succeed or fully fail. A transaction cannot be partially successful and partially failed.

**C - Consistency**  
A database that follows all rules before executing a query must also follow all the rules after execution. Integrity constraints remain intact (e.g., foreign keys, data types, unique constraints).  
👉 The DB enforces consistency only if you define rules.

**I - Isolation**  
The order of execution of SQL queries should not affect the final state of the database. Concurrent transactions should not interfere with each other.  
👉 Controlled by isolation levels.

**D - Durability**  
Once a transaction is committed in the database, it must persist even if the server crashes or a failure occurs.

---

## Transaction

A **transaction** is one or a group of SQL queries that follow the ACID properties.  

Examples:  
- Bank transfer (debit + credit must both succeed or fail).  
- Ticket booking (seat must not be sold twice).

---

## Isolation Levels

Databases allow different levels of isolation (trade-off between performance and strictness):  

- **Read Uncommitted** – Transactions can see uncommitted changes (may cause dirty reads).  
- **Read Committed** – Default in many DBs, only committed data is visible.  
- **Repeatable Read** – Prevents non-repeatable reads but still allows phantom rows.  
- **Serializable** – Strictest, transactions run as if sequential (no anomalies).

---

## Common Transaction Anomalies

- **Dirty Read** – Reading uncommitted data.  
- **Non-repeatable Read** – Same query returns different results in the same transaction.  
- **Phantom Read** – New rows appear in subsequent queries within the same transaction.

---

## SQL Benefits over NoSQL

- Follows ACID properties, ensuring reliability.  
- Provides a powerful query language with numerous capabilities (e.g., joins, grouping, filtering).  
- Best for structured data, transactions, and strict consistency.

---

## SQL vs NoSQL

**SQL Databases**  
- Structured, predefined schema.  
- Strong consistency.  
- Ideal for relational data and transactions.  

**NoSQL Databases**  
- Flexible schema, supports unstructured/semi-structured data.  
- Focus on scalability and availability.  
- Often uses eventual consistency.  
- Good for big data, real-time apps, IoT.

---

## Indexes

Indexes improve query performance by speeding up data retrieval.  

- **B-tree Index** – Default in most databases, efficient for range queries.  
- **Hash Index** – Fast for equality lookups.  
- **Composite Index** – Index on multiple columns.  
- **Full-Text Index** – Optimized for text search.  

⚠️ Trade-off: Indexes speed up reads but slow down writes/updates.

---

## Normalization

Normalization is the process of organizing data to reduce redundancy and improve consistency.  

- **1NF (First Normal Form)** – No repeating groups, atomic values only.  
- **2NF (Second Normal Form)** – No partial dependency (applies to composite keys).  
- **3NF (Third Normal Form)** – No transitive dependency (non-key depending on another non-key).  
- **BCNF (Boyce-Codd Normal Form)** – Stronger form of 3NF.

---

## Types of Databases

- **SQL**  
- **NoSQL**


follow: https://www.youtube.com/watch?v=pPqazMTzNOM