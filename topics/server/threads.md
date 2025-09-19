# Node.js Processes and Threads

## 1. Definitions

- **Process**  
  - An instance of a running program in the operating system.  
  - Has its **own memory space, JS heap, and event loop**.  
  - In Node.js, a single process handles async I/O and JS execution.  

- **Thread**  
  - A lightweight execution unit within a process.  
  - Shares the process’s resources but has its **own call stack**.  
  - Node.js main thread runs the event loop; additional worker threads can be spawned for CPU-heavy tasks.  

---

## 2. Threads in a Node.js Process

- **Main thread** → executes JS, runs event loop.  
- **Libuv thread pool** → handles async operations like file I/O, DNS, and some crypto.  
  - Default size: 4 threads (`UV_THREADPOOL_SIZE`, configurable up to 128).  
- **Worker threads (optional)** → for CPU-intensive tasks; each has its own event loop.  

### Example

- Single Node process, no worker threads:  
  - Main thread = 1  
  - Libuv pool = 4  
  - Worker threads = 0  
  - **Total = 5 threads**  

- With 16 CPU cores and 16 worker threads:  
  - Main thread = 1  
  - Libuv pool = 4  
  - Worker threads = 16  
  - **Total = 21 threads**  

---

## 3. Memory per thread

- Each thread requires memory for its **stack**, usually ~1 MB by default in most OSes.  
- Additional memory is used by the thread’s local variables and runtime structures.  
- Therefore, spawning thousands of threads can quickly consume gigabytes of RAM.  

---

## 4. Parallelism

- CPU cores limit **true parallel execution**.  
- Multiple threads in Node.js allow CPU-bound tasks to run in parallel on different cores.  
- I/O-bound tasks do **not require multiple threads**, because Node’s event loop + libuv handles concurrency efficiently.  

---

## 5. Maximum threads per system

- Limited by OS and available memory:  
  - Linux: check `/proc/sys/kernel/threads-max`  
  - Windows: similar OS-specific limits  
- Each thread consumes stack memory (~1 MB), so practical limits are often **hundreds of thousands of threads**.  
- **Ports and connections** do not map 1:1 to threads; a single thread can handle **tens of thousands of sockets asynchronously**.  

---

## ✅ Summary

1. **Process** = isolated memory space + event loop.  
2. **Thread** = execution unit inside a process; has its own call stack.  
3. **Memory per thread** ≈ 1 MB stack + runtime overhead.  
4. **Parallelism** depends on CPU cores, not thread count.  
5. **System-wide thread limit** depends on OS + memory; Node.js can handle high concurrency with relatively few threads due to async I/O.



# Node.js Threading Behavior

Node.js is **single-threaded for JavaScript execution**, but uses **libuv thread pool** for certain asynchronous operations.

---

## 1. Timer (`setTimeout`) scenario

- Timers are **event loop-driven**, not thread pool-driven.  
- Example: 8 `setTimeout` callbacks expiring at the same time:
  - All 8 callbacks are **queued in the timers phase** of the event loop.  
  - The **main thread executes them sequentially**, one by one.  
  - **Thread pool is not involved**.  

**Key point:** Timers do not consume libuv threads; all execution happens on the **main JS thread**.

---

## 2. File reading (`fs.readFile`) scenario

- File I/O operations are **delegated to the libuv thread pool**.  
- Default thread pool size = **4 threads** (`UV_THREADPOOL_SIZE=4`).  
- Example: 8 simultaneous `fs.readFile` calls:
  - First 4 file reads are assigned to the **available threads**.  
  - Remaining 4 are **queued** until a thread becomes free.  
  - As threads finish their work, queued operations are picked up.

**Key point:** File reads consume libuv threads; concurrency is **limited by thread pool size**.

---

### Summary

| Operation                | Uses Thread Pool? | Execution Thread  | Concurrency Behavior                             |
| ------------------------ | ----------------- | ----------------- | ------------------------------------------------ |
| `setTimeout` / Timers    | No                | Main thread       | All callbacks queued & executed sequentially     |
| `fs.readFile` / File I/O | Yes               | libuv thread pool | Limited by thread pool size; excess tasks queued |
