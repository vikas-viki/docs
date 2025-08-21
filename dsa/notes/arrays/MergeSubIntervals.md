Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.


Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

----------   -----  ------
   2     6   8  10  15  18
1     3


1. Brute force
   1. sort based on first element, if equal, based on second element.
   2. take a loop from 0 to n, 
      1. take it a iPair
      2. if the i pair overlaps the previous pair, continue.
      3. take another loop to i+1 to n
         1. check if jpair overlaps the current ipair, if so merge it.
         2. if not break the inner loop, we'll take care of the rest in the next loop.
   3. TC: O(nlogn) + O(2n) => O(nlogn)
   4. SC: O(n)
2. Optimised
   1. sequentially loop the intervals, check if the current interval overlaps the previous interval, if so, just merge it, if not add a new one to the answers list.
   2. TC: O(nlogn) + O(n)
   3. SC: O(n)