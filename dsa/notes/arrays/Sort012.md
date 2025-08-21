Given an array of 0s, 1s and 2s. sort the given array.

1. Bruteforce
   1. `use mergesort`
   2. TC: O(nlogn)
   3. SC: O(n) + O(logn) => O(n)
2. lettle optimised
   1. `take a hashmap, count the frequencies using a loop and then take another loop to push the 0s, 1s and 2s.`
   2. TC: O(n)
   3. SC: O(1)
3. optimised approach
   1. `we'll use dutch national flag algorithm`
   2. `we'll use 3 pointer to keep track of 0,1&2 => low, mid and end.`
   3. `we'll think of storage like this, we'll store all`
      1. `0s from 0 -> low-1`
      2. `1s from low -> mid-1`
      3. `2s from high+1 -> n-1`
      4. `we have mid -> high where unsorted elements will be stored. initially mid=0 high=n-1`
   4. `we'll loop from mid to high, on every iteration`
      1. if arr[mid] is 0, we'll swap arr[mid] with arr[low], icrement the low and mid, cause 0s are stored from 0 to low-1 and 1s are stored from low to mid-1;
      2. if arr[mid] is 1, we'll just increment the mid.
      3. if arr[mid] is 2, then we'll swap the arr[mid] with arr[high] and decrement the high, cause 2s are stored in high to n-1.

```
0,1,0,1,0,2,0

(0) swap low , mid

0,1,0,1,0,2,0

low++, mid++

(1) 
mid++

0,1,0,1,0,2,0

(0) swap low, mid

0,0,1,1,0,2,0

so on
```

```java
public static void optimised(int arr[]) {
        int low = 0;
        int mid = 0;
        int high = arr.length - 1;

        while (mid <= high) {
            if (arr[mid] == 0) {
                swap(arr, low, mid);
                low++;
                mid++;
            } else if (arr[mid] == 1) {
                mid++;
            } else {
                swap(arr, high, mid);
                high--;
            }
        }

        System.out.println(Arrays.toString(arr));
    }
```