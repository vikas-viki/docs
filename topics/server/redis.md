# Redis

Redis is an **in-memory data store** that can be used as a database, cache, and message broker. It is extremely fast because it stores data in memory, uses efficient data structures, and leverages a single-threaded **event loop** for high-performance command execution.

---

## Data Structures Provided by Redis

Redis is more than just a key-value store; it provides several specialized data structures:

| Type                  | Description                                           |
| --------------------- | ----------------------------------------------------- |
| **String**            | Simple key-value pair, binary safe.                   |
| **List**              | Ordered collection of strings (like a linked list).   |
| **Hash**              | Field-value pairs, useful for objects.                |
| **Set**               | Unordered collection of unique strings.               |
| **Sorted Set (ZSet)** | Set with scores, useful for leaderboards or rankings. |
| **Bitmap**            | Bit-level operations on strings.                      |
| **HyperLogLog**       | Approximate unique counts.                            |
| **Streams**           | Append-only log for messaging & consumer groups.      |
| **Geo**               | Geospatial indexes.                                   |

---

## How Redis Works (Top-Level)

1. **Event Loop**

   * Redis uses a **single-threaded event loop** (`ae.c`) to handle commands.
   * Loop cycle:

     1. Check ready file descriptors (network I/O using `epoll`, `kqueue`, or `select`).
     2. Read commands from clients and queue them.
     3. Execute commands **atomically** in-memory.
     4. Write responses back to clients.
     5. Run scheduled tasks (timers):

        * Key expiration
        * AOF flush / RDB snapshot
        * Replication heartbeats
        * Cluster maintenance
     6. Repeat.

2. **Command Execution**

   * Each command executes synchronously and atomically, guaranteeing no race conditions.

3. **Persistence**

   * **RDB snapshots** → periodic full dumps.
   * **AOF (Append-Only File)** → logs every write operation.
   * Can combine both for durability and performance.

---

## Redis Deployment Types

### 1. Single Instance

* One Redis process, all data in a single in-memory dictionary.
* Hot key: high traffic to a single key can dominate CPU/network.
* Use read replicas to scale reads; split large objects to reduce hotspot.

### 2. Cluster Mode

* Multiple Redis nodes sharing the keyspace.
* Keyspace divided into **16,384 hash slots**, each slot owned by one node.
* Keys are hashed → slot → node.
* Hot key: one node overloaded because popular key(s) map to its slot.
* Solving cluster hot keys:

  * Append suffixes to keys to spread load
  * Partition large structures
  * Add a caching layer in front
  * Use client-side sharding

---

## Common Bottlenecks

### Hot Keys

* **Standalone Redis:** heavy access to a single key consumes most of the single-threaded CPU, blocking other requests.
* **Clustered Redis:** traffic for a popular key hits a single node, causing node-level imbalance.
* Solutions: split values, append suffixes, use multiple keys, caching layer, read replicas.

### Other Bottlenecks

* **Large values / expensive operations:** commands like `ZRANGE` on huge sets, or `KEYS *` on big DBs.
* **Persistence blocking:** naive RDB snapshotting can block event loop (mitigated via fork and background save).
* **Network saturation:** many clients can overwhelm network I/O.

---

## Pub/Sub & Messaging

* **Pub/Sub**:

  * At-most-once delivery.
  * Messages to offline or slow subscribers are lost.
* **Streams** (modern alternative):

  * Consumer groups, replayable messages.
  * Acknowledgements and backpressure support.
  * Use for guaranteed message processing, closer to Kafka.

---

## Use Cases

* **Caching:** web sessions, frequently accessed DB rows.
* **Rate limiting:** API limits per user/IP.
* **Distributed locks:** `SETNX` or Redlock pattern.
* **Task queues / messaging:** lists or streams.
* **Leaderboard / real-time analytics:** sorted sets.
* **Geo queries:** geospatial indexing.
* **Counters / metrics:** incrementing counters for analytics.

---

## Why Redis is Fast

* Entirely **in-memory**, minimal latency.
* Efficient **data structures** (skip lists, hash tables, quicklists).
* **Single-threaded** → atomic command execution, no locks.
* Supports **pipelining** → reduce round-trip overhead.
* Uses **epoll/kqueue** → handles tens of thousands of connections efficiently.

---

## Recommended Resources

* Meta Engineer Redis Video: [https://www.youtube.com/watch?v=fmT5nlEkl3U](https://www.youtube.com/watch?v=fmT5nlEkl3U)
* Redis tips & backend scenarios: [Hello Interview Channel](https://www.youtube.com/@hello_interview/videos)
