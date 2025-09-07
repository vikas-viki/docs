### Combination Sum 2

Given an array of integers (candidates) and a target, find all the unique combinations of candidates whose sum is equal to target.

1. approach
   1. sort the candidates (so that we can skip the duplicates later)
   2. call get all combinations starting with index 0
      1. if target is 0, add the combinations to the answer.
      2. loop through arr starting from idx
         1. if element is same as previous, skip
         2. if the current element is greater than target, break (cause no further combinations will fit, given is sorted in ascending order)
         3. add the current element(i) to combi
         4. recursive call with next index(i+1)
         5. remove the last added element(i)
    3. TC: O(2^n + solutions . K) // 2^n for expanding all subsets, solutions * k for copying combinations to answer.
    4. SC: O(k) // for recursion + current combination



`draw recursion tree to understand better`


<details>
<summary>Approach</summary>

```java
class Solution {
    List<List<Integer>> ans = new ArrayList<>();

    public void getAllCombinations(int arr[], int target, List<Integer> combi, int idx) {
        if (target == 0) {
            this.ans.add(new ArrayList<>(combi));
            return;
        }

        for(int i = idx; i < arr.length; i++){
            if(i > idx && arr[i] == arr[i-1]) continue;

            if(arr[i] > target) break;

            combi.add(arr[i]);
            getAllCombinations(arr, target - arr[i], combi, i+1);
            combi.remove(combi.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<Integer> combi = new ArrayList<>();

        getAllCombinations(candidates, target, combi, 0);

        return this.ans;
    }
}
```
</details>