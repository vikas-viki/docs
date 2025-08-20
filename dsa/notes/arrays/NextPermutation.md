Given an array, return lexicographically next permutation of the array in the same input array.

ex: [1,2,3] => [1,3,2]

lexicographically next permutation is:
assume given a number 123, the next permutation is the next number that can formed from the digits of that number that's right next to it among all other combinations.

ex: for `123`, `132` is next permutation, although `321` is also a next permutation (cause its greater and has the digits that the original number had, but, its not the right next permutation to `123`)

1. Bruteforce approach:
   1. take all the permutations of the given array and return the next permutation of it (using recursion).
   2. TC: O(n.n!)
   3. SC: O(n)
2. Optimal approach
   1. ex: [1,2,3,5,4] => [1,2,4,3,5]
   2. ex: [1,2,3,6,5,4] => [1,2,4,3,5,6]
   3. `Imagine your array is a number lock (like [1,2,3,5,4]).
You want to find the very next bigger number you can make with the same digits. Not the biggest, not any bigger—just the next one in line.`
   4. #### Step 1: Find where the lock stops climbing
        Start from the end, and look for the first place where the numbers stop going uphill.
        Example: in [1,2,3,5,4], from the back you see ... 5 > 4 (still uphill).
        But then 3 < 5 → aha! That’s the pivot (the “weak link”).
    5. #### Step 2: Find the next bigger guy to swap with
        Now, to make the number just a bit bigger, we can’t keep the pivot (3) as is.
        We need to replace it with the smallest number that’s bigger than 3 (but still to its right).
        In [3,5,4], the next bigger than 3 is 4.
        Swap them → [1,2,4,5,3].
    6. #### Step 3: Make the tail as small as possible
        After the swap, the right side (5,3) is still in descending order (which is the biggest arrangement).
        But we want the smallest so that the whole number is the very next one.
        So just flip (reverse) that part → [1,2,4,3,5].
    7. TC: O(n)
    8. SC: O(1)

```java
public static void optimal(int arr[]) {
        int pivot = -1;

        int n = arr.length - 1;

        while (n > 0) {
            if (arr[n] > arr[n - 1]) {
                pivot = n - 1;
                break;
            }
            n--;
        }

        if (pivot == -1) {
            reverseArray(arr, 0, arr.length - 1);
            System.out.println(Arrays.toString(arr));
            return;
        }

        int next = pivot;

        for (int i = arr.length - 1; i > pivot; i--) {
            if (arr[i] > arr[pivot]) {
                next = i;
                break;
            }
        }

        // swap
        int temp = arr[pivot];
        arr[pivot] = arr[next];
        arr[next] = temp;

        // reverse from pivot+1 -> n-1
        int start = pivot + 1;
        int end = arr.length - 1;
        reverseArray(arr, start, end);
        System.out.println(Arrays.toString(arr));
    }

    public static void reverseArray(int arr[], int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
```