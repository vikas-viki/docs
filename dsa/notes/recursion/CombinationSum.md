Given and array of integers and a target, find the combinations of array that makeup the given target.


Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]


**`whenever you get a combination problem, you'll first have to think as pick/not pick`**

1. approach.
   1. there can be two cases for any given index(element), 
      1. either you can pick the element (reduce the target by picked element.)
      2. or you may not pick it.
    . base condition is if index ever reaches > the length or target is less than 0.
    2. TC: O(2^n + solutions . K) // 2^n for expanding all subsets, solutions * k for copying combinations to answer.
    3. SC: O(k) // for recursion + current combination


<details>
<summary>Recursion approach</summary>

```java
public static List<List<Integer>> ans = new ArrayList<>();

public static void getAllCombinations(int arr[], int target, int idx, List<Integer> combi) {
    if (idx >= arr.length || target < 0) {
        return;
    }

    if (target == 0) {
        ans.add(new ArrayList<>(combi));
        return;
    }

    combi.add(arr[idx]);
    // pick case
    getAllCombinations(arr, target - arr[idx], idx, combi);

    combi.remove(combi.size()-1);

    getAllCombinations(arr, target, idx + 1, combi);
}

public List<List<Integer>> combinationSum(int[] arr, int target) {
    ans.clear();
    List<Integer> combination = new ArrayList<>();

    getAllCombinations(arr, target, 0, combination);

    return ans;
}
```
</details>