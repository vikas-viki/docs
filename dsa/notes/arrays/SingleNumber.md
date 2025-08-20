Given non-empty array of integers, every element appears twice except for one, find the one occurance ele.

(leetcode 136)

ex: [4,1,2,1,2] return 1 // cause 4 appears only once

1. Bruteforce
   1. `count all the occurances O(n), then loop through the values O(k) and find the one with one occurance`
   2. TC: O(n) + O(k) => O(n)
   3. SC: O(k)
2. Nested loops
   1. TC: O(n^2)
   2. SC: O(1)
3. Optimised
   1. `we use bit manuplation here, we use XOR operator (which cancel the same values)`
   2. 0 ^ 0 = 0, 1 ^ 1 = 0, 1 ^ 0 = 1, 0 ^ 1 = 1
   3. TC: O(n)
   4. SC: O(1)
```java
    public static void singleNumber(int arr[]) {
        int ans = arr[0];
        for (int i = 1; i < arr.length; i++) {
            ans ^= arr[i];
        }

        System.out.println(ans);
    }
```