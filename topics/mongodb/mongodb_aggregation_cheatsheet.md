# MongoDB Aggregation Pipeline Cheat Sheet

This cheat sheet covers **all major aggregation stages** in MongoDB with brief explanations and examples. Perfect for quick revision or interview prep.

---

## 1. `$match`
**Purpose:** Filters documents, similar to a `find()` query.

```js
db.users.aggregate([
  { $match: { age: { $gte: 18 } } } // keep only users 18 or older
])
```

---

## 2. `$project`
**Purpose:** Includes, excludes, or computes new fields for each document.

```js
db.users.aggregate([
  {
    $project: {
      name: 1,           // include name
      ageInMonths: { $multiply: ["$age", 12] } // new field
    }
  }
])
```

---

## 3. `$group`
**Purpose:** Groups documents by a key and can compute sums, averages, counts, etc.

usables: `refer group_accumulators_cheatsheet`

```js
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId", // group by customer
      totalSpent: { $sum: "$amount" },
      ordersCount: { $sum: 1 }
    }
  }
])
```

---

## 4. `$sort`
**Purpose:** Sorts documents by one or more fields.

```js
db.users.aggregate([
  { $sort: { name: 1, age: -1 } } // sort by name asc, then age desc
])
```

---

## 5. `$limit`
**Purpose:** Limits the number of documents returned.

```js
db.users.aggregate([
  { $limit: 5 } // return first 5 documents
])
```

---

## 6. `$skip`
**Purpose:** Skips a specified number of documents.

```js
db.users.aggregate([
  { $skip: 10 } // skip first 10 documents
])
```

---

## 7. `$unwind`
**Purpose:** if the specified feild is an object or another model, it populates it with the values of that object.

```js
db.users.aggregate([
  { $unwind: "$hobbies" } // create one doc per hobby
])
```

---

## 8. `$lookup`
**Purpose:** Performs a left outer join with another collection.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  }
])
```

---

## 9. `$out`
**Purpose:** Writes the aggregation result to a new collection.

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $out: "completedOrders" } // creates/replaces completedOrders collection
])
```

---

## 10. `$merge`
**Purpose:** Merges aggregation result into an existing collection with options to update, replace, or keep.

```js
db.orders.aggregate([
  { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } },
  { $merge: { into: "customerSummary", whenMatched: "merge" } }
])
```

---

## 11. `$redact`
**Purpose:** Filters documents/subdocuments dynamically, often for access control.

```js
db.documents.aggregate([
  {
    $redact: {
      $cond: {
        if: { $lte: ["$level", 2] }, // keep docs with level <= 2
        then: "$$KEEP",
        else: "$$PRUNE"
      }
    }
  }
])
```

---

## 12. `$addFields`
**Purpose:** Adds or replaces fields without removing existing ones.

```js
db.users.aggregate([
  { $addFields: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } }
])
```

---

## 13. `$replaceRoot` / `$replaceWith`
**Purpose:** Replaces the root document with a specified subdocument.

```js
db.orders.aggregate([
  { $replaceRoot: { newRoot: "$customerDetails" } } // root becomes customerDetails
])
```

---

## 14. `$facet`
**Purpose:** Runs multiple aggregation pipelines in parallel and combines results.

```js
db.orders.aggregate([
  {
    $facet: {
      totalByCustomer: [ { $group: { _id: "$customerId", total: { $sum: "$amount" } } } ],
      totalOrders: [ { $count: "count" } ]
    }
  }
])
```

---

## 15. `$sample`
**Purpose:** Returns a random sample of documents.

```js
db.users.aggregate([
  { $sample: { size: 5 } } // pick 5 random users
])
```

---

## 16. `$count`
**Purpose:** Counts the number of documents.

```js
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $count: "adults" } // returns { adults: <number> }
])
```

---

## 17. `$indexStats`
**Purpose:** Provides statistics about indexes on a collection.

```js
db.users.aggregate([
  { $indexStats: {} }
])
```

---

## 18. `$set` (alias for `$addFields`)
**Purpose:** Adds or replaces fields in documents.

```js
db.users.aggregate([
  { $set: { isAdult: { $gte: ["$age", 18] } } }
])
```

---

**Tip:** For performance, always try to `$match` early, `$project` late, and use indexes on frequently filtered fields.

---

*Prepared for quick MongoDB aggregation revision and interview prep.*

