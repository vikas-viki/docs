Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.

 
Example:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

(if don't know completely, please go through 2sum and 3 sum first)

1. Brutforce
   1. what we do is, we have a 4 nested loops to keep track of a,b,c,d and if the sum ever becomes target, we add it to the answers list.
   2. TC: O(n^4)
   3. SC: O(unique quadraplets)
2. hashmap approach
   1. what we do is, we have three nested loops to calculate the a,b,c and for d, we'll use a hashmap. we'll store the value in the hasmap at the end of (inside) of 3rd loop and in 3rd loop we compare the sum and add it to answer.
   2. TC: O(n^3)
   3. SC: O(unique quadraplets)
3. two pointer approach
   1. Remember, for two pointer approach, the array, needs to be sorted.
   2. what we do is we have a 2 nested loop that'll get us a,b, and for c and d we'll use two pointer approach from index(b)+1 to end and search for the sum.
   3. TC: O(n^3) // the inner loop can also take n ops
   4. SC: O(unique quadraplets)

everything is same as 3sum, we just use an extra loop for extra value.