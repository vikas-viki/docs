given a sorted array.
0 to n

given a target sum, (ex: 8), return the pair whose sum is the target sum.
given there always exists a sum.

Solutions:

1. Bruteforce
   1. create all pairs and compare the sum.
   2. TC: O(n^2)
   3. SC: O(1)
2. Little optimised
   1. given its a sorted array (in qns, there's nothing irrelevant, you just have to think of edgecase solution with it)
   2. we'll be using two pointer approach
   3. `i from 0 and j from end, compare the sum of ith and jth ele, there can be 3 cases, either sum is bigger than target, lesser than target or its equal to target.`
      1. `if its equal, just return the pair`
      2. `if its less, we know we have to reduce the totalsum, so we decrement the j, to decrease the value.`
      3. `if its more, we know we have to increase the totalsum, so we have to increment i to increase the value`
   4. TC: O(n)
   5. SC: O(1)

```java
public static void towPointer(int arr[], int target){
        int start = 0;
        int end = arr.length-1;
        int ans[] = new int[2];

        while(start < end){
            int sum = arr[start] + arr[end];
            if(sum > target){
                end--;
            }else if(sum < target){
                start++;
            }else {
                ans[0] = arr[start];
                ans[1] = arr[end];
                break;
            }
        }
        System.out.println(Arrays.toString(ans));
    }
```