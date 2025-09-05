Given two linkedlist, return a third linkedlist, which the list of numbers which is the sum from the combination of numbers from previous two linked lists.

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

1. Approach
   1. loop until one of the lists or carry is > 0.
   2. on every step, add `carry` `l1.val` `l2.val`;
   3. re-initialize the carry and create a new node with the last digit.
   4. TC: O(max(m, n)) // where m and n are the sizes of two linkedlists
   5. SC: O(1)

```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        int carry = 0;
        ListNode l = new ListNode(-1);
        ListNode temp = l;

        while(l1 != null || l2 != null || carry > 0){
            int sum = carry;

            if(l1 != null){
                sum += l1.val;
                l1 = l1.next;
            }

            if(l2 != null){
                sum += l2.val;
                l2 = l2.next;
            }

            carry = sum / 10;
            temp.next = new ListNode(sum % 10);
            temp = temp.next;
        }
        return l.next;
    }
}
```