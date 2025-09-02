# MongoDB `$group` Accumulators Cheat Sheet

Quick reference for all common accumulator operations inside `$group` with use-cases and examples.

---

## 1. `$sum`
**Use:** Adds values or counts documents.
```js
// Sum numeric field
totalAmount: { $sum: "$amount" }

// Count documents
count: { $sum: 1 }
```

---

## 2. `$avg`
**Use:** Computes average of numeric values.
```js
avgAge: { $avg: "$age" } // average age per group
```

---

## 3. `$min`
**Use:** Finds the minimum value in the group.
```js
minPrice: { $min: "$price" } // lowest price per group
```

---

## 4. `$max`
**Use:** Finds the maximum value in the group.
```js
maxPrice: { $max: "$price" } // highest price per group
```

---

## 5. `$first`
**Use:** Gets the first document’s value in the group (based on input order).
```js
firstPostTitle: { $first: "$title" } // first post title per author
```

---

## 6. `$last`
**Use:** Gets the last document’s value in the group (based on input order).
```js
lastPostTitle: { $last: "$title" } // last post title per author
```

---

## 7. `$push`
**Use:** Creates an array of values for each group.
```js
allTitles: { $push: "$title" } // collect all post titles per author
```

---

## 8. `$addToSet`
**Use:** Creates an array of unique values (no duplicates).
```js
uniqueTags: { $addToSet: "$tags" } // unique tags per product
```

---

## 9. `$stdDevPop` / `$stdDevSamp`
**Use:** Computes standard deviation of values (population/sample).
```js
stdDevAge: { $stdDevPop: "$age" } // age variability
```

---

## 10. `$mergeObjects` (MongoDB 4.2+)
**Use:** Merges multiple objects into one.
```js
combinedData: { $mergeObjects: ["$address", "$profile"] }
```

---

## 11. `$accumulator` (Custom)
**Use:** Define custom aggregation logic with JS functions.
```js
customTotal: {
  $accumulator: {
    init: function() { return 0; },
    accumulate: function(state, value) { return state + value; },
    merge: function(state1, state2) { return state1 + state2; },
    finalize: function(state) { return state; },
    lang: "js"
  }
}
```

---

**Tip:** Use `$sum` for totals, `$push` / `$addToSet` for arrays, `$first` / `$last` for representative values, and `$min` / `$max` / `$avg` for numeric stats.

