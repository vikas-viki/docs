# JavaScript Fundamentals – 100 Q&A with Practical Examples

## 1. Variables & Scope

**Q: Difference between var, let, and const.**

A: `var` is function-scoped and hoisted; `let`/`const` are block-scoped. `const` can’t be reassigned, but objects can be mutated.

```javascript
var x = 1;
if (true) { let x = 2; console.log(x); }
console.log(x); // 1
```

**Q: What is variable hoisting?**

A: JavaScript moves declarations to the top before execution. Only `var` is initialized as undefined; `let`/`const` stay in TDZ.

```javascript
console.log(a); // undefined
var a = 5;
```

**Q: What happens when you declare a variable without var/let/const?**

A: In non-strict mode it becomes global; in strict mode it throws a ReferenceError.

```javascript
var x = 1;
if (true) { let x = 2; console.log(x); }
console.log(x); // 1
```

**Q: Explain block scope vs function scope.**

A: Block scope (let/const) is confined to `{}`; function scope (var) applies to the entire function.

```javascript
// Example here
```

**Q: Why should you avoid using var?**

A: `var` can leak scope, be redeclared, and cause hard-to-find bugs due to hoisting.

```javascript
// Example here
```

**Q: Can you reassign a const variable’s value? What about its properties?**

A: You can’t reassign a `const`, but if it’s an object/array, you can change its properties/elements.

```javascript
// Example here
```

**Q: Temporal Dead Zone — what is it?**

A: Accessing a `let`/`const` before its declaration throws a ReferenceError.

```javascript
// Example here
```

**Q: What happens if you access a variable before declaring it?**

A: `var` returns undefined; `let`/`const` throw ReferenceError.

```javascript
// Example here
```

## 2. Data Types

**Q: List all JavaScript primitive types.**

A: string, number, bigint, boolean, null, undefined, symbol.

```javascript
// Example here
```

**Q: Difference between null and undefined.**

A: null = intentional empty value; undefined = variable not assigned.

```javascript
let a = null;
let b;
console.log(a, b); // null undefined
```

**Q: What does typeof null return and why?**

A: It returns 'object' due to a legacy bug in JavaScript.

```javascript
// Example here
```

**Q: Is NaN equal to itself?**

A: No, use Number.isNaN() to check.

```javascript
console.log(NaN === NaN); // false
```

**Q: Difference between == and ===.**

A: `==` compares after type coercion; `===` compares without coercion.

```javascript
console.log('5' == 5); // true
console.log('5' === 5); // false
```

**Q: Explain truthy and falsy values.**

A: Falsy: false, 0, '', null, undefined, NaN. Everything else is truthy.

```javascript
// Example here
```

**Q: How to check if a value is an array?**

A: Use Array.isArray(value).

```javascript
// Example here
```

**Q: Difference between shallow and deep copy.**

A: Shallow copies refs of nested objects; deep copies every level.

```javascript
// Example here
```

**Q: How does JavaScript handle floating-point precision?**

A: Uses IEEE 754, so decimals can be imprecise (0.1+0.2 ≠ 0.3 exactly).

```javascript
// Example here
```

**Q: What’s the output of [] + [] and why?**

A: Empty string, because arrays convert to '' in string context.

```javascript
// Example here
```

## 3. Functions

**Q: What are function declarations vs expressions?**

A: Declarations are hoisted; expressions are assigned to variables and not hoisted fully.

```javascript
// Example here
```

**Q: What is an arrow function and how does it differ from normal functions?**

A: Arrow functions have no `this`, `arguments`, and can’t be used as constructors.

```javascript
const obj = {name:'JS', show: ()=>console.log(this.name)};
obj.show(); // undefined
```

**Q: Explain the concept of this in JavaScript.**

A: `this` is determined by how a function is called.

```javascript
function show(){ console.log(this.name); }
show.call({name:'JS'}); // JS
```

**Q: How does this behave in arrow functions?**

A: It’s lexically bound to the surrounding scope.

```javascript
const obj = {name:'JS', show: ()=>console.log(this.name)};
obj.show(); // undefined
```

**Q: Difference between .call(), .apply(), and .bind().**

A: `call` passes args one by one, `apply` takes an array, `bind` returns a new function.

```javascript
function greet(msg){ console.log(msg, this.name); }
greet.call({name:'JS'}, 'Hi'); // Hi JS
```

**Q: What is a pure function?**

A: Same input → same output, no side effects.

```javascript
function add(a,b){ return a+b; }
console.log(add(2,3)); // 5
```

**Q: What is function currying?**

A: Breaking a function with multiple args into nested single-arg functions.

```javascript
const add = a => b => a+b;
console.log(add(2)(3)); // 5
```

**Q: How does function overloading work in JavaScript?**

A: Not built-in; simulate by checking args length/types.

```javascript
// Example here
```

**Q: Explain IIFE (Immediately Invoked Function Expression).**

A: A function that runs right after it's defined: (()=>{})().

```javascript
(function(){ console.log('Run now'); })();
```

**Q: What is a higher-order function?**

A: A function that takes or returns another function.

```javascript
// Example here
```

## 4. Closures

**Q: What is a closure in JavaScript?**

A: A function that remembers variables from its outer scope even after that scope has closed.

```javascript
function counter(){ let c=0; return ()=>++c; }
let inc = counter();
console.log(inc()); // 1
```

**Q: Give a practical example of closures in use.**

A: For private variables: function counter() { let c=0; return ()=>++c; }.

```javascript
function counter(){ let c=0; return ()=>++c; }
let inc = counter();
console.log(inc()); // 1
```

**Q: How do closures help with data privacy?**

A: They hide variables from outside code.

```javascript
function counter(){ let c=0; return ()=>++c; }
let inc = counter();
console.log(inc()); // 1
```

**Q: Can closures cause memory leaks?**

A: Yes, if they keep unused large objects in memory.

```javascript
function counter(){ let c=0; return ()=>++c; }
let inc = counter();
console.log(inc()); // 1
```

**Q: Explain closure behavior inside loops.**

A: Use `let` or an IIFE to capture loop variables properly.

```javascript
function counter(){ let c=0; return ()=>++c; }
let inc = counter();
console.log(inc()); // 1
```

## 5. Execution Context & Hoisting

**Q: What are the two phases of execution context?**

A: Creation (hoisting) and Execution.

```javascript
// Example here
```

**Q: Explain the call stack.**

A: A LIFO stack storing function calls.

```javascript
// Example here
```

**Q: What is lexical scope?**

A: Scope determined by code position, not runtime.

```javascript
// Example here
```

**Q: How is the scope chain created?**

A: By linking the current scope to its outer scopes.

```javascript
// Example here
```

**Q: How does hoisting work for functions vs variables?**

A: Functions are hoisted with definitions; `var` hoisted as undefined.

```javascript
console.log(a); // undefined
var a = 5;
```

## 6. The Event Loop & Async

**Q: Explain the event loop in JavaScript.**

A: It processes tasks from queues to the call stack.

```javascript
// Example here
```

**Q: Difference between microtasks and macrotasks.**

A: Micro: Promises; Macro: setTimeout/setInterval.

```javascript
[...new Set([1,1,2])]; // [1,2]
```

**Q: How do setTimeout, Promise, and process.nextTick get scheduled?**

A: nextTick → microtask, Promise → microtask, setTimeout → macrotask.

```javascript
[...new Set([1,1,2])]; // [1,2]
```

**Q: What is the difference between synchronous and asynchronous code?**

A: Sync blocks execution; async defers tasks.

```javascript
// Example here
```

**Q: How does async/await work under the hood?**

A: It’s syntax sugar for Promises with then/catch.

```javascript
// Example here
```

**Q: What is the output of mixed async/await and setTimeout code?**

A: Microtasks (await/Promise) run before macrotasks (setTimeout).

```javascript
[...new Set([1,1,2])]; // [1,2]
```

**Q: Explain the difference between parallelism and concurrency.**

A: Parallel = simultaneous; concurrent = interleaved.

```javascript
// Example here
```

**Q: What is the difference between Promise.all and Promise.allSettled?**

A: all fails fast; allSettled waits for all results.

```javascript
[...new Set([1,1,2])]; // [1,2]
```

**Q: How to cancel a Promise?**

A: No native cancel; use AbortController or flags.

```javascript
// Example here
```

**Q: What are race conditions in async code?**

A: Bugs from unpredictable async operation order.

```javascript
// Example here
```

## 7. Objects

**Q: How do you create an object in JavaScript?**

A: `{}`, new Object(), Object.create(proto).

```javascript
// Example here
```

**Q: Difference between Object.create and {}.**

A: Object.create sets a specific prototype; {} uses Object.prototype.

```javascript
[...new Set([1,1,2])]; // [1,2]
```

**Q: Explain prototypal inheritance.**

A: Objects inherit properties from their prototype chain.

```javascript
// Example here
```

**Q: How do you check if a property exists in an object?**

A: `key in obj` or obj.hasOwnProperty(key).

```javascript
// Example here
```

**Q: Difference between for...in and Object.keys.**

A: for...in includes inherited props; Object.keys own only.

```javascript
'apple'.includes('pp'); // true
```

**Q: How to make an object immutable?**

A: Use Object.freeze().

```javascript
// Example here
```

**Q: How to deep clone an object?**

A: structuredClone(obj) or JSON.parse(JSON.stringify(obj)).

```javascript
// Example here
```

**Q: What’s the difference between Object.seal and Object.freeze?**

A: Seal: no add/remove; Freeze: also no modify.

```javascript
const obj={a:1};
Object.freeze(obj);
obj.a=2; // no change
```

**Q: How to iterate over object properties?**

A: Object.keys/values/entries with loops.

```javascript
// Example here
```

**Q: What is the prototype chain?**

A: A linked chain of objects ending with null.

```javascript
// Example here
```

## 8. Arrays

**Q: Difference between forEach and map.**

A: map returns a new array; forEach doesn't.

```javascript
[1,2].map(x=>x*2); // [2,4]
```

**Q: How does .reduce() work?**

A: It accumulates values into a single result.

```javascript
[1,2,3].reduce((sum,n)=>sum+n,0); // 6
```

**Q: Difference between .filter() and .find().**

A: filter returns all matches; find returns first match.

```javascript
let arr=[1,2,3];
console.log(arr.filter(x=>x>1)); // [2,3]
console.log(arr.find(x=>x>1)); // 2
```

**Q: How to remove duplicates from an array?**

A: [...new Set(arr)].

```javascript
[...new Set([1,1,2])]; // [1,2]
```

**Q: What does Array.from() do?**

A: Converts iterable/array-like to array.

```javascript
// Example here
```

**Q: How does .some() differ from .every()?**

A: some checks at least one match; every checks all.

```javascript
// Example here
```

**Q: How does array destructuring work?**

A: Extracts values into variables: const [a,b]=arr.

```javascript
// Example here
```

**Q: How to flatten a nested array?**

A: arr.flat(depth).

```javascript
[1,[2,[3]]].flat(2); // [1,2,3]
```

**Q: What’s the difference between Array.of() and Array()?**

A: of uses args as elements; Array(num) creates length.

```javascript
// Example here
```

**Q: What is a sparse array?**

A: An array with empty slots.

```javascript
// Example here
```

## 9. Strings

**Q: Difference between .slice(), .substr(), and .substring().**

A: slice: start,end; substr: start,len; substring swaps args.

```javascript
'hello'.slice(1,3); // 'el'
```

**Q: How to reverse a string in JavaScript?**

A: str.split('').reverse().join('').

```javascript
'abc'.split('').reverse().join(''); // 'cba'
```

**Q: How to check if a string contains another string?**

A: Use includes().

```javascript
'apple'.includes('pp'); // true
```

**Q: Template literals — what are they?**

A: Backtick strings with ${} interpolation.

```javascript
// Example here
```

**Q: How to count the frequency of characters in a string?**

A: Use reduce or for loop with map.

```javascript
// Example here
```

**Q: What’s the difference between charAt() and charCodeAt()?**

A: charAt → char; charCodeAt → UTF-16 code.

```javascript
// Example here
```

**Q: How to convert a string to a number?**

A: Number(str), +str, parseInt.

```javascript
// Example here
```

## 10. DOM & Browser

**Q: Difference between document.getElementById and querySelector.**

A: getElementById is faster; querySelector is more flexible.

```javascript
// Example here
```

**Q: How to delegate events in JavaScript?**

A: Attach listener to parent, filter target.

```javascript
// Example here
```

**Q: What is event bubbling and capturing?**

A: Bubbling: child→parent; Capturing: parent→child.

```javascript
// Example here
```

**Q: What does preventDefault() do?**

A: Stops default browser action.

```javascript
document.querySelector('a').addEventListener('click', e=>e.preventDefault());
```

**Q: Difference between innerHTML and textContent.**

A: innerHTML parses HTML; textContent is plain text.

```javascript
// Example here
```

## 11. Error Handling

**Q: Difference between throw and return in error handling.**

A: throw stops execution; return exits function normally.

```javascript
// Example here
```

**Q: How do try/catch blocks work with async/await?**

A: Wrap await in try to catch rejections.

```javascript
// Example here
```

**Q: What is the finally block used for?**

A: Cleanup code that always runs.

```javascript
// Example here
```

**Q: What are custom errors in JS?**

A: Extend the Error class.

```javascript
// Example here
```

## 12. ES6+ Features

**Q: What are template literals?**

A: Strings with backticks and ${} interpolation.

```javascript
// Example here
```

**Q: Explain default parameters in functions.**

A: function f(a=1){} sets default if arg missing.

```javascript
[...new Set([1,1,2])]; // [1,2]
```

**Q: Difference between var, let, const in ES6 context.**

A: let/const block scoped; var function scoped.

```javascript
var x = 1;
if (true) { let x = 2; console.log(x); }
console.log(x); // 1
```

**Q: What is object destructuring?**

A: Extracts props into variables: const {a}=obj.

```javascript
// Example here
```

**Q: How do rest and spread operators differ?**

A: Rest collects, Spread expands elements.

```javascript
// Example here
```

**Q: What is optional chaining?**

A: obj?.prop?.nested returns undefined if missing.

```javascript
let obj={};
console.log(obj?.a?.b); // undefined
```

**Q: How do ES modules work?**

A: Use export/import syntax.

```javascript
// Example here
```

**Q: What are generators in JS?**

A: Functions with * that yield values lazily.

```javascript
// Example here
```

## 13. Misc

**Q: Difference between deep and shallow comparison.**

A: Shallow checks top-level only; deep checks nested.

```javascript
// Example here
```

**Q: What are WeakMap and WeakSet?**

A: Collections with object keys, not preventing GC.

```javascript
// Example here
```

**Q: How does garbage collection work in JS?**

A: Removes objects no longer referenced.

```javascript
// Example here
```

**Q: What is memoization?**

A: Caching function results to avoid recomputation.

```javascript
// Example here
```

**Q: Difference between debounce and throttle.**

A: Debounce delays after last call; throttle limits rate.

```javascript
// Example here
```

**Q: What are service workers?**

A: Background scripts for offline/caching.

```javascript
// Example here
```

**Q: What is localStorage vs sessionStorage vs cookies?**

A: local = persistent; session = per tab; cookies sent to server.

```javascript
// Example here
```

**Q: Explain the concept of event delegation with an example.**

A: Parent handles events for children using bubbling.

```javascript
// Example here
```

