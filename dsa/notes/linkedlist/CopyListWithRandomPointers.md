Given a linkedlist that has two pointers, next and random, both can point to any node in the list or null. You have to return, a deep copy where-in the new copy should be exacltly the same, but it should not share any same address with old copy.

basically, create an exact copy of given linkedlist, but they new one should not reference to any node of old list.


1. approach.
   1. in the first loop, create a normal copy with next pointer along with map of old -> new node reference.
   2. in the second loop, loop until end (for assigning random pointers), keep assigning the random pointers by using the map. 
   3. `newHead.random = map.getOrDefault(oldHead.random, null);`
   4. TC: O(n)
   5. SC: O(n)


```java
class Solution {
    public Node copyRandomList(Node head) {
        Node oldTemp = head;
        Node newTemp = new Node(-1);
        Node newHead = newTemp;
        Map<Node, Node> map = new HashMap<>();

        while(oldTemp != null){
            Node copyNode = new Node(oldTemp.val);
            newTemp.next = copyNode;
            map.put(oldTemp, copyNode);
            oldTemp = oldTemp.next;
            newTemp = newTemp.next;
        }

        oldTemp = head;
        newTemp = newHead.next;

        while(oldTemp != null){
            newTemp.random = map.getOrDefault(oldTemp.random, null);
            oldTemp = oldTemp.next;
            newTemp = newTemp.next;
        }

        return newHead.next;
    }
}
```