Given two sorted arrays of length m and n in increasing order.

we've to merge the arrays.

[1,3,7,9,0,0,0,0] and [2,3,5,7] => [1,2,3,3,5,7,7,9]

- the other extra 0's are given so that we have to update the input array itself and use a constant space.

1. Bruteforce (like merge-sort)
   1. loop through the arrays (like i,j,k pointers) and update the new arrays accordingly.
   2. TC: O(m+n)
   3. SC: O(m+n)
2. Optimised approach
   1. `we think of this in backward terms, and we know that we have extra space in first array, so we start filling the array from last to first`.
   2. `compare the elements from end to start of both and insert it at end and decreasing.`
   3. TC: O(m+n)
   4. SC: O(1)