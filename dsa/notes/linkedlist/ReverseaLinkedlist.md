Given the head of a singly linked list, reverse the list, and return the reversed list.

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
```

1. approach
   1. we'll use 3 pointers approach
   2. wherein, starting from head, we disconnect the link to the next node and connect it to the previous node.

```java
    public ListNode reverseList(ListNode head) {
        ListNode next = null;
        ListNode prev = null;
        ListNode curr = head;

        while(curr != null){
            next = curr.next; // keep track of next
            curr.next = prev; // reverse the link
            prev = curr; // keep track of prev
            curr = next; // update the curr
        }

        return prev;
    }
```