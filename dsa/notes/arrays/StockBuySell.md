Given the prices (of each day), return the maximum profit.

ex: [7, 1, 5, 3, 6, 4] return 5 (buy at 1, sell at 6)

Note: you can't buy in future and sell in past.

1. Brute force
   1. linearly compare the profit of each day going forward
   2. TC: O(n^2)
   3. SC: O(1)
2. Optimised approach
   1. `imagine every day as a day to sell and think, which day i'd've bought the stock that i'd've got the maximum profit.`
   2. start looping from start, keep the minimum price of the stock, till current day, compare the maximum.
   3. TC: O(n)
   4. SC: O(1)

```java
    public static void approach(int arr[]) {
        int maxProfit = 0;
        int bestBuy = arr[0];

        for (int i = 1; i < arr.length; i++) {
            int currentSell = arr[i];
            int profit = currentSell - bestBuy;
            if (maxProfit < profit) {
                maxProfit = profit;
            }
            bestBuy = Math.min(bestBuy, currentSell);
        }

        System.out.println(maxProfit);
    }
```