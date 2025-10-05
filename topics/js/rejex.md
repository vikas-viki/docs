# Regex Cheatsheet with Examples

Regex (**regular expressions**) are patterns used to match, search, and manipulate strings.

Learning site: [https://regexr.com/](https://regexr.com/)

---

## Character Classes

| Pattern  | Meaning                           | Example                                       |
| -------- | --------------------------------- | --------------------------------------------- |
| `.`      | any character except newline      | `/h.llo/.test('hello')` → true                |
| `\w`     | word character (a–z, A–Z, 0–9, _) | `/\w+/.exec('hello_world')` → ['hello_world'] |
| `\d`     | digit (0–9)                       | `/\d+/.exec('My age is 25')` → ['25']         |
| `\s`     | whitespace                        | `/\s/.test('a b')` → true                     |
| `\W`     | not word                          | `/\W/.test('!')` → true                       |
| `\D`     | not digit                         | `/\D/.test('a')` → true                       |
| `\S`     | not whitespace                    | `/\S/.test('a')` → true                       |
| `[abc]`  | any of a, b, or c                 | `/[abc]/.test('b')` → true                    |
| `[^abc]` | not a, b, or c                    | `/[^abc]/.test('d')` → true                   |
| `[a-g]`  | character between a & g           | `/[a-g]/.test('c')` → true                    |

---

## Anchors

| Pattern | Meaning           | Example                               |
| ------- | ----------------- | ------------------------------------- |
| `^abc`  | starts with abc   | `/^hello/.test('hello world')` → true |
| `abc$`  | ends with abc     | `/world$/.test('hello world')` → true |
| `\b`    | word boundary     | `/\bgood\b/.test('very good')` → true |
| `\B`    | not word boundary | `/\Bend/.test('bend')` → true         |

---

## Escaped Characters

| Pattern | Meaning           | Example                     |
| ------- | ----------------- | --------------------------- |
| `\.`    | literal .         | `/a\.b/.test('a.b')` → true |
| `\*`    | literal *         | `/a\*/.test('a*')` → true   |
| `\\`    | literal backslash | `/\\/.test('\\')` → true    |
| `\t`    | tab               | `/\t/.test('\t')` → true    |
| `\n`    | newline           | `/\n/.test('\n')` → true    |
| `\r`    | carriage return   | `/\r/.test('\r')` → true    |

---

## Groups & Lookarounds

| Pattern   | Meaning             | Example                              |
| --------- | ------------------- | ------------------------------------ |
| `(abc)`   | capture group       | `/a(bc)d/.exec('abcd')` → ['bcd']    |
| `\1`      | backreference       | `/([a-z])\1/.test('aa')` → true      |
| `(?:abc)` | non-capturing group | `/(?:abc){2}/.test('abcabc')` → true |
| `(?=abc)` | positive lookahead  | `/\d(?=px)/.exec('10px')` → ['0']    |
| `(?!abc)` | negative lookahead  | `/\d(?!px)/.exec('10em')` → ['0']    |

---

## Quantifiers & Alternation

| Pattern  | Meaning    | Example                            |      |                        |
| -------- | ---------- | ---------------------------------- | ---- | ---------------------- |
| `a*`     | 0 or more  | `/a*/.exec('aa')` → ['aa']         |      |                        |
| `a+`     | 1 or more  | `/a+/.exec('aaa')` → ['aaa']       |      |                        |
| `a?`     | 0 or 1     | `/a?/.exec('a')` → ['a']           |      |                        |
| `a{5}`   | exactly 5  | `/a{5}/.exec('aaaaa')` → ['aaaaa'] |      |                        |
| `a{2,}`  | 2 or more  | `/a{2,}/.exec('aaaa')` → ['aaaa']  |      |                        |
| `a{1,3}` | 1–3        | `/a{1,3}/.exec('aaaa')` → ['aaa']  |      |                        |
| `a+?`    | lazy match | `/a+?/.exec('aaaa')` → ['a']       |      |                        |
| `ab      | cd`        | match ab or cd                     | `/ab | cd/.test('cd')` → true |

---

## Practical JavaScript Examples

```js
const str = "hello this is a very very good body vikas who is very good";

// Match "very" globally
console.log(str.match(/very/g)); // ["very", "very", "very"]

// Match word boundary "good"
console.log(str.match(/\bgood\b/g)); // ["good", "good"]

// Match all words
console.log(str.match(/\w+/g));
// ["hello", "this", "is", "a", "very", "very", "good", "body", "vikas", "who", "is", "very", "good"]

// Match numbers 10–99
const str2 = "5 10 45 99 100";
console.log(str2.match(/\b([1-9][0-9])\b/g)); // ["10", "45", "99"]

// Match IPv4 address
const ip = "192.168.1.1";
const ipRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
console.log(ipRegex.test(ip)); // true
```
