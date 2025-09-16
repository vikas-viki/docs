In Node.js, a “tick” means one iteration (one cycle) of the event loop.

Current tick = the synchronous stuff you’re running right now (your script, or the current callback that the event loop picked).

Next tick = immediately after the current stack finishes, but before the event loop moves on to its next phase (timers, I/O, etc.).

`
When the current call stack empties, before the event loop moves on to its next job (whether that’s running more callbacks in the same phase or switching phases), Node.js will always flush the process.nextTick queue first.
`

```js
// before
let bar = null;

function someAsyncApiCall(callback) {
    callback();
}

someAsyncApiCall(() => {
    console.log('bar', bar); // null
});

bar = 2;


// after

// let bar = null;

function someAsyncApiCall(callback) {
    process.nextTick(callback);
}

someAsyncApiCall(() => {
    console.log('bar', bar); // 1
});

bar = 1;
```
