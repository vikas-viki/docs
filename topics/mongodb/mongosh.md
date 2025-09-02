run `mongosh` to use mongo shell

use  `show dbs` to list all the databases.

use `use db_name` to switch to a db, if the db doesnt exists, mongosh will automatically create it for you.

*you can insert anything in collections, let say you have a row with only name, you can later add another row with age in it, no scheema.*

**Note**
`every record in mongodb is called a document (rows)`
`every document lives inside a collection (table)`
`every collection lives inside a database.`

`in mongodb sorting happens based on ascii value, so **Z**(90) appears before **a**(97)`

`if you write **db.users.find({age: {$exists: true}})** it'll return everything where the **age** key exists`

```js
db.users.find({ 
    $expr: {
        $gt: ["$debt", "$balance"]
    }
})
```


**to use nested keys in find we can wrap them in a string**

```js
db.users.find({"address.street": "123 Main strt"})
```