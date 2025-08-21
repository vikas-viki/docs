Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]

1. Bruteforce:
   1. have a n^2 loop where, in the second loop, we'll calculate the product of all the elements except i.
   2. TC: O(n^2)
   3. SC: O(n)
2. Optimised approach
   1. for any index i, the product of array itself is, `product of all the numbers in left`(prefix) * `product of all the numbers in right`(suffix).
   2. now we just have to calculate prefix and suffix for each index.
   3. create an ans array and store the prefixes of each in the index in it.
   4. starting from right, along with coming to left, have a suffix variable, where you keep track of suffix at each index, now you have both prefix and suffix, just multiply it.
   5. TC: O(n)
   6. SC: O(n)