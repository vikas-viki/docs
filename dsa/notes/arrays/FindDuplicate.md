Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. find the number that occurs more than once.

ex: [3,4,3,2,1] return 3

1. Bruteforce
   1. use a hashmap and count the frequency and return once its higher than 1.
   2. TC: O(n)
   3. SC: O(k) // worst case  k = n-1
2. Slow-Fast pointer
   1. approach: `the way it works is, we move the slow pointer by 1 and the fast pointer by two, if in any point of time, the slow pointer (which moves by 1), meets the fast pointer (which moves by 2) then that meanse there's a loop, there's no way that slow pointer reaches the fast which moving slow, othere than the existence of loop, cause if there's no loop, the fast pointer will eventually move to the end and never meet slow in between`
   2. `in this case, we're gonna assume our array as a linkedlist, where index of array is represented as data of the node and the element in the array is considered as a link to the next node (this is only possible cause each integer is in the range 1 to n).`
   3. so now our array,
      1. val: [3 4 3 2 1]
      2. idx:  0 1 2 3 4
   4. as linked list
      1. [0, 3] -> [3, 2] -> [2, 3] -> [3, 2] -> looping starts.
      2. [i, v] -> [i, v] => i-index, v-value in array.
      3. [d, l] -> [d, l] => d-data, l-link in linkedlist.
   5. in this way, we'll always find the loop if it exists
   6. TC: O(n)
   7. SC: O(1)
```java
public static void slowFast(int arr[]) {
        int slow = arr[0];
        int fast = arr[0];

        do {
            slow = arr[slow]; // to move once
            fast = arr[arr[fast]]; // to move twice
        } while (slow != fast);

        slow = arr[0];
        while (slow != fast) {
            slow = arr[slow];
            fast = arr[fast];
        }

        // there's a mathematical proof that this works at any linkedlist
        System.out.println(slow);
    }
```