Given an integer array nums, find the subarray with the largest sum, and return its sum.


Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Note: subarray is the one that goes only forward (it doesnt come to start after it goes to end)

1. Bruteforce:
   1. `start looping from start to end, take each index as a start of the array, take a nest loop that goes from current start till end and add up the values to a variable and keep updating the max value on each nested iteration`
   2. TC: O(n^2)
   3. SC: O(1)
2. Kadane's algorithms
   1. `it says have a loop, keep tack of the sum (in each iteration), if sum ever reaches to <= 0, it meanse the current subarray, can't yeild the maxSum, hence reset the sum`
   2. TC: O(n)
   3. SC: O(1)

```java
public static void kadanesAlgorithm(int arr[]) {
        int max = arr[0];
        int sum = arr[0];

        for (int i = 1; i < arr.length; i++) {
            sum = Math.max(sum + arr[i], arr[i]);
            max = Math.max(max, sum);
        }

        System.out.println(max);
    }
```