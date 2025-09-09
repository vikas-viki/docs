# AWS SQS (Simple Queue Service)

**What it is:**  
Amazon SQS is a fully managed message queuing service that lets you **decouple** and **scale** microservices, distributed systems, and serverless applications.  
It acts as a **buffer** between services — producers put messages in a queue, and consumers process them asynchronously.

---

## Example Use Case: Order Processing in an E-commerce App

1. **User places an order** on the website.  
2. The **Order Service** adds a message to an **SQS queue** (e.g., `{ orderId: 123, userId: 42 }`).  
3. The **Payment Service** and **Inventory Service** read messages from the queue independently.  
   - Payment Service charges the user.  
   - Inventory Service reduces stock.  
4. If any service is **down or overloaded**, messages remain in the queue until they can be processed.  
5. This ensures the system is **reliable, fault-tolerant, and scalable**, even under heavy load.

---

✅ **Benefit:**  
SQS prevents data loss and makes sure that every order is eventually processed, even if parts of the system fail temporarily.
