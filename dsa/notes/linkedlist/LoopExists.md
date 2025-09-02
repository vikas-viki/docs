Given a linkedlist check if the list has a loop in it.

1. Bruteforce approach
   1. use a hashset to keep track of the seen nodes(added at each iteration).
   2. if the current node was seen before, then there's a loop.
   3. since we're storing the memory of nodes in set, we dont care about duplicate values.
   4. TC: O(n)
   5. SC: O(n)
2. optimsied apprach
   1. use slowfast pointer approach.
   2. TC: O(n)
   3. SC: O(1)

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if(head == null || head.next == null) return false;

        ListNode slow = head;
        ListNode fast = head;

        while(fast != null && fast.next != null){
            fast = fast.next.next;
            slow = slow.next;

            if(slow == fast){
                return true;
            }
        }

        return false;
    }
}
```