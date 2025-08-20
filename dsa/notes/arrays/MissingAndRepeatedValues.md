Given a 2d array (n*n), containing number from 1 to n^2.

There's one number that occurs twice and one number thats missing value from 1 to n^2

1. approach
   1. `create a hashmap and create a frequency array and once the frequency becomes 2 of any ele, we got the duplicate value.`
   2. now we know that the sum of numbers in the given grid is sum from 1 to n^2 (which is `(n^2 (n^2 + 1)) / 2`, which is `n(n+1)/2, where n = n^2 for sum of n numbers from 1 to n`)
   3. now we have a formula
      1. `currentSum = neededSum - missingNumber + duplicateNumber`, we transform into
      2. `missingNumber = neededSum + duplicateNumber - currentSum`
   4. TC: O(n^2)
   5. SC: O(k) // no of unique numbers => n*n-1

```java
public static void approach(int args[][]) {
        HashMap<Integer, Integer> mp = new HashMap<>();
        int duplicate = -1;
        int currentSum = 0;
        int n = args.length;
        int expectedSum = (n * n) * (n * n + 1) / 2;
        int ans[] = new int[2];

        for (int i = 0; i < args.length; i++) {
            for (int j = 0; j < args.length; j++) {
                int prevFreq = mp.getOrDefault(args[i][j], 0);

                if (prevFreq == 1) {
                    duplicate = args[i][j];
                }
                currentSum += args[i][j];
                mp.put(args[i][j], prevFreq + 1);
            }
        }

        int missing = expectedSum - currentSum + duplicate;
        ans[0] = duplicate;
        ans[1] = missing;
        System.out.println(Arrays.toString(ans));
    }
```