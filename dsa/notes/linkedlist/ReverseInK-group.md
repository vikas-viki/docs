Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.


![k-group](k-group.png)

Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]


1. approach
   1. count the no of nodes in the list.
   2. starting from 0 till n, keep incrementing by k
      1. starting from 0 to k, 
         1. reverse the linkedlist from previous tail till kth element.
      2. point previous tail to the previous element(last element in above loop)
      3. update the start to curr(start of new group)
   3. return dummy.next
   4. TC: O(n)
   5. SC: O(1)


<details>
<summary>approach</summary>

```java
public ListNode reverseKGroup(ListNode head, int k) {
    int n = 0;
    ListNode temp = head;
    while (temp != null) {
        temp = temp.next;
        n++;
    }

    ListNode tempHead = head;

    ListNode dummy = new ListNode(-1);
    dummy.next = head;
    ListNode start = head;
    ListNode prevTail = dummy;

    for (int i = 0; (i + k) <= n; i += k) {
        // reverse list from 0 to k
        ListNode prev = null;
        ListNode curr = start;

        for (int j = 0; j < k; j++) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        prevTail.next = prev;
        prevTail = start;

        start = curr;
    }

    prevTail.next = start;
    return dummy.next;
}
```
</details>