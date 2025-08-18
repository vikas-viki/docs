Given an array and a target, 

return the index of two numbers as an array that makes up the sum. Its given that solution always exists! Should not use same elements.

ex: [2,5,7,11,15], target = 9, return [2,7]

1. Brute force
   1. `create all the pairs that exists and find the sum of pair that is equal to target`
   2. TC: O(n^2)
   3. SC: O(1)
2. Better approach
   1. `sort the array and use two pointer approach `
   2. TC: O(nlogn) // we've sort O(nlogn) + O(n) => O(nlogn)
   3. SC: O(1)
3. Optimised approach
   1. we use concepts of hashing.
   2. we know
      1. pairSum = first+last = target
      2. `we loop though from 0 to n-1, now we have first & target, now we know what we want a number that is = target - first (which is arr[i]), which exists in the array. so we use hashmap, which allows accessing values at O(1) time.`
   3. TC: O(n)
   4. SC: O(k) // no of unique elements