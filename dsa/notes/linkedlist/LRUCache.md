### LRU Cache

The concept is this,
you need to store bunch of numbers and the constraints are,

1. you're given a max capacity 
2. when you try to add a new element and list is full, you need to replace the new with the elements that recently used.
3. if you try to get an element that doesnot exists return -1.

the least recently used element as the name says is the elements that has been used very least compared to other elements.


1. Approach
   1. we can use a double linkedlist with the size.
   2. whenever a new element is inserted or an existing element is accessed, we move that element to the head of the list, in this way the element that has not been used recently always stays in the tail, hence we remove it to insert a new element if the size is full.
   3. why doubly linkedlist ? 
   4. so that we can easily move the elements from anywhere to head and remove tail easily.
   5. TC: O(1)
   6. SC: O(n)

`to achieve this we dont have to implement double linkedlist, instead we can use the builtin LinkedHashMap, that works exactly the same.`

#### parameters
1. capacity of the list.
2. load factor, it ditermines how much should be filled in list, before we can resize it.
3. access order mode (default false, keeps the order in which they were added), true, maintains the access order as we discussed in the approach.
4. removeEldestEntry, is called everytime a put operation occurs, its used to check if the last(tail/eldest) node needs to be removed.
5. If yes → returns true, so LinkedHashMap removes the eldest entry automatically. If no → returns false, nothing is removed.

<details>
<summary>Approach</summary>

```java
class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> mp;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.mp = new LinkedHashMap<>(capacity, 0.75f, true){
            @Override 
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest){
                return this.size() > LRUCache.this.capacity;
            }

        };
    }
    
    public int get(int key) {   
        return this.mp.getOrDefault(key, -1);
    }   
    
    public void put(int key, int value) {
        this.mp.put(key, value);
    }
}
```
</details>