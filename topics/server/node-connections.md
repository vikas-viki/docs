# What happens when 1000s of requests are sent to Node.js

## 1. OS-level handling
- Initially, the OS receives all incoming requests.  
- It keeps track of all TCP connections and buffers incoming data.  
- Once headers and body are sufficiently received, the OS notifies Node.js.

## 2. Node.js request handling
- If the request handler is asynchronous, Node pushes callbacks onto the event loop and call stack.  
- Node executes the handler and eventually writes the response back through the OS.  
- Async operations allow Node to continue handling other sockets while waiting for I/O.

## 3. Limits even with async code
- Maximum concurrent connections are limited by:
  1. **OS-level connection limits** (file descriptors, TCP backlog).  
  2. **Memory per connection** — each connection usually takes ~4–8 KB, depending on available system/process memory.

## 4. Implications
- If too many connections are held open slowly (e.g., via slow clients), the server can become overwhelmed.  
- This is the principle behind a **Slowloris-style attack**, which is why proper timeouts and connection limits are important.

---

# Scaling Node.js for high concurrency

## 1. Horizontal scaling
- **Cluster module / PM2**: run multiple Node.js processes on the same machine; OS distributes connections.  
- **Multiple servers with load balancers** (Nginx, HAProxy, AWS ELB) distribute traffic across machines.

## 2. Event-driven architecture
- Node’s async I/O can handle tens of thousands of concurrent connections efficiently.  
- CPU-heavy tasks should be offloaded to:
  - **Worker threads** for CPU-bound work  
  - **Message queues / background jobs** for long-running operations

## 3. WebSocket / live updates
- Dedicated WebSocket servers handle real-time streams.  
- Connections are **sharded** across servers.  
- Updates pushed via **Pub/Sub systems** (Redis, Kafka) for efficiency.

## 4. OS-level tuning
- Increase file descriptor limits (`ulimit -n`)  
- Tune TCP/IP stack (`somaxconn`, ephemeral ports)  
- Adjust socket buffers for high-throughput applications

## 5. Memory and caching
- Monitor per-connection memory usage (~4–12 KB per socket)  
- Stream data instead of buffering large payloads  
- Apply request body limits and timeouts  
- Use caching / batching to reduce redundant work  

---

# Node.js Threads vs Processes

| Feature       | Worker Thread                         | Process (Cluster)            |
| ------------- | ------------------------------------- | ---------------------------- |
| Memory        | Shared process memory (heap separate) | Separate memory per process  |
| JS heap       | Separate per thread                   | Separate per process         |
| I/O           | Async I/O shared                      | Async I/O independent        |
| Communication | MessagePort / SharedArrayBuffer       | IPC (process.send)           |
| Parallelism   | True parallel CPU tasks               | True parallel CPU tasks      |
| Overhead      | Low (smaller memory footprint)        | Higher (full process memory) |

### Key points
- **Threads**: lightweight parallelism inside a process, used for CPU-bound tasks.  
- **Processes**: heavier, isolated memory; used for scaling across cores and machines.  
- **For high-concurrency servers**: async I/O + clusters usually suffice; worker threads are used only for CPU-intensive tasks.  