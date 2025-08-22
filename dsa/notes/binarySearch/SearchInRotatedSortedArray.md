There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

1. Bruteforce:
   1. we'll just use linear search
   2. TC: O(n)
   3. SC: O(1)
2. Optimised
   1. we'll use binary search
   2. its given that, one of the halves of the rotated sorted array is always sorted.
   3. take a mid, check if left half is sorted or right half is sorted.
      1. if left half is sorted, check,
         1. element is in left range, apply binary search there(meaning, update end=mid-1).
         2. if not update the start to mid+1.
      2. if right half is sorted check,
         1. ele in right range, apply binary search (meaning update start=mid+1)
         2. if not update the end to mid-1

```java
 public static int optimised(int arr[], int target) {
        int start = 0;
        int end = arr.length - 1;

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] == target) {
                return mid;
            } else {
                if (arr[start] <= arr[mid]) {
                    if (arr[start] <= target && target <= arr[mid]) {
                        end = mid - 1;
                    } else {
                        start = mid + 1;
                    }
                } else { // if left is not sorted, right is always sorted
                    if (arr[mid] <= target && target <= arr[end]) {
                        start = mid + 1;
                    } else {
                        end = mid - 1;
                    }
                }
            }
        }
        return -1;
    }
```