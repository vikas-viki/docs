Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]


1. Bruteforce approach 1,
   1. loop through whole list and findout left and right ListNodes. O(n)
   2. add all the nodes from left to right in a List(ArrayList). O(n)
   3. loop throught the array list in reverse order and start pointing the pointers from prevLeft till postRight. O(n)
   4. TC: O(n)
   5. SC: O(n)
2. Optimised (pointers approach)
   1. we identify the node at left.
   2. reverse the list as we would normally do until `right - left + 1` times, now the required list is reversed.
   3. we point the prevLeft.next = lastNode we reversed, prevLeft.next.next to next of last reversed node.
   4. TC: O(n)
   5. SC: O(1)

<details>
<summary>Bruteforce</summary>

```java
class Solution {
    public ListNode reverseBetween(ListNode head, int l, int r) {
        List<ListNode> ls = new ArrayList<>();
        ListNode dummy = new ListNode(-1, head);
        ListNode temp = dummy;


        ListNode prevLeft = dummy;
        ListNode left = null;
        ListNode right = null;
        int n = 0;
        while(temp != null){ // O(n)
            if(n == l-1){
                prevLeft = temp;
            }
            if(n == l){
                left = temp;
            }
            if(n == r){
                right = temp;
            }
            temp = temp.next;
            n++;
        }

        ListNode postRight = right.next;

        temp = left;
        while(temp != postRight){ // O(n)
            ls.add(temp);
            temp = temp.next;
        }

        int count = ls.size();
        temp = prevLeft;
        for(int i = count-1; i >=0; i--){ // O(n)
            ListNode current = ls.get(i);
            temp.next = current;
            temp = temp.next;
        }

        temp.next = postRight;

        return dummy.next;
    }
}
```
</details>


<details>
<summary>Optimised</summary>

```java
class Solution {
    public ListNode reverseBetween(ListNode head, int l, int r) {
        ListNode dummy = new ListNode(-1, head);
        ListNode temp = dummy;

        ListNode prevLeft = dummy;
        ListNode left = null;
        int n = 0;
        while (temp != null) { // O(n)
            if (n == l - 1) {
                prevLeft = temp;
            }
            if (n == l) {
                left = temp;
            }
            temp = temp.next;
            n++;
        }

        // reverse
        ListNode prev = null;
        for (int i = 0; i < r - l + 1; i++) {
            ListNode next = left.next;
            left.next = prev;
            prev = left;
            left = next;
        }

        // link prevLeft and right
        prevLeft.next.next = left;
        prevLeft.next = prev;

        return dummy.next;
    }
}
```
</details>