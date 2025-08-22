
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

1. Bruteforce:
   1. just combine two arrays (like merge sort O(m+n) and then find the mid and calculate median)
   2. TC: O(m+n)
   3. SC: O(m+n)
2. little optimised
   1. we'll be using two pointer approach for merging arrays (i, j)
   2. we'll loop until the half of m+n on both sides
      1. we keep the current b  as a (first element, in case the len is even)
      2. if i != len(a1) && (j == len(a2) || a[j] > a[i])
         1. take b as a1[i], we do i++ 
      3. else take b as a2[j],  we do j++
   3. if the total length is even, we return average of a and b, else return just b.
   4. TC: O(m+n)
   5. SC: O(1)
3. Opimised 
   1. we'll be using binary search approach.
   2. the solution will be based on symmetry. we'll figureout, how many we should take from array1 and how many we should take from array2, so that, the left array is lesser than the right array.
   3. for that we'll use binary search, take the mid(no of elements) as the number of elements from first array and the remaining required elements from the right array and check if there's a symmetry, if so, it meanse that, we've got the correct mid points of the both the array(here midpoint is not n/2, its the mid relative the both array combined).
   4. if there's a symmetry
      1. we'll calculate the median based on length of combined arrays
         1. if even, take the average of max(l1,l2) and max(r1,r2). 
         2. if odd, take the max of l1,l2 (why l ? cause use took required no of elements as n1+n2+1/2)
   5. if l1 > r2, meaning, we've to reduce the no of elements from a1, so we discard right side (end = mid-1)
   6. if l2 > r1, meaning, we've to reduce the no of elements from a2, so we discard left side (start = mid+1)
   7. Note: the mid values(mid1, mid2) will be the part of right half, not left half.
   8. TC: O(log(min(m,n)))
   9. SC: O(1)

```java
    public static int optimised(int ar1[], int ar2[]) {
        int n1 = ar1.length;
        int n2 = ar2.length;
        if (n1 > n2) {
            return optimised(ar2, ar1);
        }

        int low = 0;
        int high = n1;
        int left = (n1 + n2 + 1) / 2;
        int n = n1 + n2;

        while (low <= high) {
            int mid1 = (low + high) / 2;
            int mid2 = left - mid1;

            int l1 = Integer.MIN_VALUE;
            int l2 = Integer.MIN_VALUE;
            int r1 = Integer.MAX_VALUE;
            int r2 = Integer.MAX_VALUE;

            if (mid1 < n1) {
                r1 = ar1[mid1];
            }

            if (mid2 < n2) {
                r2 = ar2[mid2];
            }

            if (mid1 - 1 >= 0) {
                l1 = ar1[mid1 - 1];
            }

            if (mid2 - 1 >= 0) {
                l2 = ar2[mid2 - 1];
            }

            if (l1 <= r2 && l2 <= r1) {
                if (n % 2 == 1) {
                    return Math.max(l1, l2);
                }
                return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
            } else if (l1 > r2) {
                high = mid1 - 1;
            } else {
                low = mid1 + 1;
            }
        }

        return 0;
    }
```