
```js
const start = process.hrtime();

setTimeout(() => {
    const end = process.hrtime(start);
    console.log(`timeout callback executed after ${end[0]}s and ${end[1]/Math.pow(10,9)}ms`);
}, 1000);
```
process.hrtime is a high-resolution timer in Node.js that’s used for measuring precise durations, much more accurate than Date.now(). Let me break it down.

it return [seconds, nanoseconds]
1 second = 1,000,000,000 nanoseconds (1 billion ns/10^9).

Even if you specify the timer to be 0ms it'l be 1ms under the hood. This is because of the interesting fact that NodeJS caps the minimum timeout to 1ms in order to align with Chrome’s timers cap. Due to this cap, even if you set a timer to 0ms delay, the delay is actually overridden and set to 1ms.


At the start of a new iteration of the event loop, NodeJS invokes a system call to get the current clock time. Depending on how busy the CPU is, getting the current clock time may or may not complete within 1ms. If the clock time is retrieved in less than 1ms, NodeJS will detect that the timer is not expired, because the timer takes 1ms to expire. But, if getting the clock time takes more than 1ms, the timer will be expired by the time the clock time is retrieved. In the case of Node detecting that the timer is not yet expired, Then the event loop will move on to the I/O phase and then to the immediates queue. Then it will see that there is an event in the immediates queue and it will process it. Hence, setImmediate preceding the setTimeout callback.

```js
const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout')
    }, 0);
    setImmediate(() => {
        console.log('immediate')
    })
});
```

Let’s see the execution flow of the above program.

At the start, this program reads the current file asynchronously using fs.readFile function, and it provides a callback to be triggered after the file is read.
Then the event loop starts.
Once the file is read, it will add the event (a callback to be executed) in the I/O queue in the event loop.
Since there are no other events to be processed, Node is waiting for any I/O event. It will then see the file read event in the I/O queue and will execute it.
During the execution of the callback, a timer is added to the timers heap and an immediate is added to the immediates queue.
Now we know that the event loop is in I/O phase. Since there are no any I/O events to be processed, the event loop will move to the immediates phase where it will see the immediate callback added during the execution of file read callback. Then the immediate callback will be executed.
In the next turn of the event loop, it will see the expired timer and it will execute the timer callback.

**`the nextTick call is not checked before moving to the next phase, it is being checked immediately even in the current phase. Any call back inside the nextTick will execute before the event loop continues.`**