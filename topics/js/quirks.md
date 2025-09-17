# ⚡ 100 Quirky JavaScript/React/Node Questions (with 1-liner Answers)

Fun, tricky, and surprising questions for quick revision & interviews.  

---

## 🔹 JavaScript Quirks

1. `console.log(2 + 3 + "5")`  
   **Answer:** `"55"` — numbers add first, then string concatenation.

2. `console.log("6" - 3)`  
   **Answer:** `3` — string coerced to number.

3. `console.log(0.1 + 0.2 === 0.3)`  
   **Answer:** `false` — floating-point precision issue.

4. `console.log([] == ![])`  
   **Answer:** `true` — weird coercion rules.

5. `console.log(null == undefined)`  
   **Answer:** `true` — loose equality allows it.

6. `console.log(null === undefined)`  
   **Answer:** `false` — strict equality checks type.

7. `console.log(typeof NaN)`  
   **Answer:** `"number"` — NaN is still a number type.

8. `console.log([] + [])`  
   **Answer:** `""` — arrays convert to empty strings.

9. `console.log([] + {})`  
   **Answer:** `"[object Object]"` — object stringified.

10. `console.log({} + [])`  
    **Answer:** `0` — `{}` parsed as block, `+[]` → 0.

11. `console.log(typeof null)`  
    **Answer:** `"object"` — a historical JS bug.

12. `console.log([] == 0)`  
    **Answer:** `true` — empty array → `0`.

13. `console.log([1,2,3] + [4,5,6])`  
    **Answer:** `"1,2,34,5,6"` — arrays become strings.

14. `console.log(+"")`  
    **Answer:** `0` — empty string coerced to zero.

15. `console.log("5" + +"5")`  
    **Answer:** `"55"` — unary plus converts to number.

16. `console.log("5" - -"5")`  
    **Answer:** `10` — double negation makes it numeric.

17. `console.log(!!"false" == !!"true")`  
    **Answer:** `true` — both are non-empty strings (truthy).

18. `console.log([,,,].length)`  
    **Answer:** `3` — sparse array slots count.

19. `console.log([1] == [1])`  
    **Answer:** `false` — different object references.

20. `console.log(Math.max())`  
    **Answer:** `-Infinity` — no args returns lowest possible.

21. `console.log(Math.min())`  
    **Answer:** `Infinity` — no args returns highest possible.

22. `console.log(parseInt("08"))`  
    **Answer:** `8` — parses decimal, not octal in ES5+.

23. `console.log(parseInt("Infinity", 10))`  
    **Answer:** `NaN` — stops parsing after `"Inf"`.

24. `console.log(Number("Infinity"))`  
    **Answer:** `Infinity` — Number handles it.

25. `console.log(isNaN("NaN"))`  
    **Answer:** `true` — string coerces to NaN.

26. `console.log(typeof typeof 1)`  
    **Answer:** `"string"` — typeof always returns string.

27. `console.log(0 == "0")`  
    **Answer:** `true` — string coerces to number.

28. `console.log(0 === "0")`  
    **Answer:** `false` — strict equality.

29. `console.log("b" + "a" + +"a" + "a")`  
    **Answer:** `"baNaNa"` — `+"a"` → NaN.

30. `console.log([] == "")`  
    **Answer:** `true` — both coerced to empty string.

31. `console.log({} == "[object Object]")`  
    **Answer:** `true` — object coerced to string.

32. `console.log(1 < 2 < 3)`  
    **Answer:** `true` — `(1 < 2)` → true → 1 < 3.

33. `console.log(3 > 2 > 1)`  
    **Answer:** `false` — `(3 > 2)` → true → 1 > 1.

34. `console.log([] instanceof Array)`  
    **Answer:** `true` — arrays inherit from Array.

35. `console.log(function(){} instanceof Object)`  
    **Answer:** `true` — functions are objects.

36. `console.log(true + true)`  
    **Answer:** `2` — booleans become numbers.

37. `console.log(false + false)`  
    **Answer:** `0` — both become `0`.

38. `console.log(true + false)`  
    **Answer:** `1` — coerced to 1 + 0.

39. `console.log("10" - "4")`  
    **Answer:** `6` — strings coerced to numbers.

40. `console.log("10" + "4")`  
    **Answer:** `"104"` — concatenation.

41. `console.log(1/0)`  
    **Answer:** `Infinity` — division by zero.

42. `console.log(-1/0)`  
    **Answer:** `-Infinity` — negative division.

43. `console.log(0/0)`  
    **Answer:** `NaN` — undefined division.

44. `console.log([] === ![])`  
    **Answer:** `false` — strict comparison, no coercion.

45. `console.log(1 == true)`  
    **Answer:** `true` — boolean coerces to number.

46. `console.log(1 === true)`  
    **Answer:** `false` — strict type mismatch.

47. `console.log([] == false)`  
    **Answer:** `true` — empty array → `0`.

48. `console.log([0] == false)`  
    **Answer:** `true` — `[0]` coerces to `0`.

49. `console.log([null] == "")`  
    **Answer:** `true` — `[null]` → `""`.

50. `console.log([undefined] == "")`  
    **Answer:** `true` — `[undefined]` → `""`.

---

## 🔹 React Quirks

51. Keys in lists must be?  
    **Answer:** Unique and stable — helps React reconcile efficiently.

52. What happens if you use `index` as key in React lists?  
    **Answer:** Causes buggy re-renders when items change order.

53. What’s returned by `useState()`?  
    **Answer:** A state variable and a setter function.

54. What’s special about `setState` in class components?  
    **Answer:** It’s async and may batch updates.

55. Does `useEffect` run synchronously?  
    **Answer:** No — it runs after render commit.

56. What’s the second argument in `useEffect`?  
    **Answer:** Dependency array — controls execution.

57. What happens if you pass `[]` in `useEffect`?  
    **Answer:** Runs only once (on mount).

58. What if you omit the dependency array in `useEffect`?  
    **Answer:** Runs on every render.

59. Can you call hooks inside loops/conditions?  
    **Answer:** No — must be called unconditionally at top level.

60. How does React identify re-renders?  
    **Answer:** By comparing virtual DOM diffs.

61. What’s the difference between controlled and uncontrolled input?  
    **Answer:** Controlled uses React state, uncontrolled uses refs/DOM.

62. Why use `React.memo`?  
    **Answer:** Prevents unnecessary re-renders.

63. What’s `useCallback` for?  
    **Answer:** Memoizes a function reference.

64. What’s `useMemo` for?  
    **Answer:** Memoizes expensive computations.

65. What’s wrong with mutating state directly?  
    **Answer:** React won’t detect re-render.

66. Can props be changed inside a child component?  
    **Answer:** No — props are read-only.

67. Why use `key` in React fragments?  
    **Answer:** For lists — to uniquely identify fragment children.

68. What’s React’s reconciliation algorithm called?  
    **Answer:** Fiber — efficient rendering strategy.

69. Why avoid inline functions in render?  
    **Answer:** They create new references each render.

70. What does `dangerouslySetInnerHTML` do?  
    **Answer:** Sets raw HTML, bypasses React’s escaping.

---

## 🔹 Node.js Quirks

71. What does `require()` return?  
    **Answer:** Cached module exports.

72. Difference between `require` and `import`?  
    **Answer:** CommonJS vs ES Modules.

73. What happens if you require the same file twice?  
    **Answer:** Loaded once — then cached.

74. Is Node single-threaded?  
    **Answer:** Yes (event loop), but libuv uses thread pool.

75. What’s the default thread pool size in Node?  
    **Answer:** 4 threads.

76. What’s `process.nextTick()` for?  
    **Answer:** Executes before the event loop continues.

77. What’s the difference between `setImmediate` and `setTimeout(fn,0)`?  
    **Answer:** Order differs in event loop phases.

78. What’s `cluster` in Node.js?  
    **Answer:** Module to spawn worker processes.

79. What’s `child_process.fork()` used for?  
    **Answer:** Spawns a new Node process with IPC.

80. How to handle uncaught exceptions in Node?  
    **Answer:** `process.on("uncaughtException", handler)`.

81. What’s `Buffer` in Node?  
    **Answer:** Raw binary data handling.

82. Is `console.log` async in Node?  
    **Answer:** Depends — usually sync to stdout, async to file.

83. What’s the difference between `__dirname` and `process.cwd()`?  
    **Answer:** File directory vs current working directory.

84. How do environment variables get accessed in Node?  
    **Answer:** `process.env`.

85. What’s the purpose of `dotenv` package?  
    **Answer:** Loads `.env` file into `process.env`.

86. Why use streams in Node?  
    **Answer:** Efficiently handle large data in chunks.

87. What’s the difference between readable & writable streams?  
    **Answer:** Source vs destination of data.

88. What does `pipe()` do with streams?  
    **Answer:** Connects readable to writable.

89. What’s the difference between `fs.readFile` and `fs.createReadStream`?  
    **Answer:** Entire file vs chunked streaming.

90. What’s event-driven architecture in Node?  
    **Answer:** Non-blocking, callback-based event loop.

---

## 🔹 Bonus Quirks

91. `typeof Infinity`  
    **Answer:** `"number"` — Infinity is numeric.

92. `typeof -Infinity`  
    **Answer:** `"number"` — same.

93. `typeof Symbol()`  
    **Answer:** `"symbol"` — primitive type.

94. `typeof BigInt(10)`  
    **Answer:** `"bigint"` — separate numeric type.

95. `console.log(0n + 1n)`  
    **Answer:** `1n` — bigint addition.

96. `console.log(1n + 1)`  
    **Answer:** Error — can’t mix bigint & number.

97. `console.log([] + {})`  
    **Answer:** `"[object Object]"` — string coercion.

98. `console.log({} + [])`  
    **Answer:** `0` — block parsed, not object.

99. `console.log(typeof Promise.resolve())`  
    **Answer:** `"object"` — promises are objects.

100. `console.log(Promise.resolve(5) instanceof Promise)`  
    **Answer:** `true` — always returns a Promise.
