Given a linkedlist check if its palindrome or not.

1. Bruteforce approach
   1. loop through whole linkedlist and create an array of values and check if that array is palindrom or not.
   2. TC: O(n) + O(logn)
   3. SC: O(n)
2. Optimised approach
   1. use slow fast approach to find mid.
   2. reverse the linkedlist from mid to end.
   3. then sequentially check if both lists (reversed - so last element is first in its case, head - the given input)
   4. TC: O(n) => (O(n/2) + O(n/2))
   5. SC: O(1)


```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null)
            return true;

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // mid = slow
        ListNode secondHalf = reverse(slow);
        ListNode firstHalf = head;
        boolean isPalindrome = true;

        while (isPalindrome && secondHalf != null) {
            if (secondHalf.val != firstHalf.val) {
                isPalindrome = false;
            }
            firstHalf = firstHalf.next;
            secondHalf = secondHalf.next;
        }

        return isPalindrome;
    }

    public static ListNode reverse(ListNode l) {
        ListNode next = l;
        ListNode curr = l;
        ListNode prev = null;

        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        return prev;
    }
}
```