Given an array of integers, find all possible unique 3 numbers combination(triplet), whose sum will be 0.

ex: [-1,0,1,2,-1,-4] res [[-1,-1,2],[-1,0,1]]


1. Bruteforce.
   1. we'll pick all possible combinations of 3 numbers, compare the sum. i != j != k, if its 0 and combination didn't came before, we'll add it to the ans.
   2. TC: O(n^3 log3) (n^3 for 3 loops, in each loop we sort the array of 3 ele's, so log3)
   3. SC: O(all unique triplets)
2. Hashing
   1. we'll use the same n^2 loop to find a and b, but for c, we'll use a hashmap. we know that `a + b + c = 0`, to get c, we do `c = -(a + b)`. to check if c exists in the (the required value), we'll use map. we'll store the elements in map in the end of jth array, so that it can be used by jth loop later and we reset the map on the start of ith array.
   2. TC: O(n^2)
   3. SC: O(all unique triplets)
3. optimised approach (two pointer)
   1. `first we sort our array so that we can use two pointer approach`
   2. then we loop through the array from i=0 to n-1, taking arr[i] as a.
      1. if we found same arr[i] as previous, the other two values will be same.
      2. inside we take two pointer loop where, j=i+1, k = n-1.
         1. on every iteration we check if the sum (a + arr[j] + arr[k]), 
            1. if the sum is negative, we know what we need 0, so we increase the sum, so we do j++ if not we do k--
            2. if the sum is 0, we add to the list(with same existence check).
            3. (optimisation) if we find the same j even after incrementing, k will remain same, so we increment j until we get a new value.
   3. TC: O(nlogn + n^2) (sorting nlogn, n for outer loop and n for inner loop = n^2)
   4. SC: O(no of unique triplets)
   5. its still n^2 time complexity, but we reduce the overhead of creating hashmaps everytime unlike the `Hashing version`.

```java

    public static void optimised(int arr[]) {
        HashSet<List<Integer>> set = new HashSet<>();
        List<List<Integer>> ans = new ArrayList<>();

        Arrays.sort(arr);

        int n = arr.length;
        for (int i = 0; i < n; i++) {
            if (i > 0 && arr[i] == arr[i - 1]) // we've already found the triplet once.
                continue;
            int a = arr[i];
            int j = i + 1;
            int k = n - 1;
            while (j < k) {
                int sum = a + arr[j] + arr[k];

                if (sum < 0) {
                    j++;
                } else if (sum > 0) {
                    k--;
                } else {
                    List<Integer> ls = Arrays.asList(a, arr[j], arr[k]);
                    if (!set.contains(ls)) {
                        set.add(ls);
                        ans.add(ls);
                    }
                    j++;
                    k--;

                    while (j < k && arr[j - 1] == arr[j]) // we've already found the pair for j
                        j++;


                    while (j < k && arr[k] == arr[k+1]) k--; // remove the duplication of k too (though it adds overhead)
                }
            }
        }

        for (List<Integer> l : ans) {
            System.out.println(Arrays.toString(l.toArray()));
        }
    }
```