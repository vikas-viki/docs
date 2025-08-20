import java.util.*;

public class StockBuySell {
    public static void main(String[] args) {
        int arr[] = { 7, 1, 5, 3, 6, 4 };
        // bruteForce(arr);
        approach(arr);
    }

    public static void bruteForce(int arr[]) {
        int max = Integer.MIN_VALUE;

        for (int i = 0; i < arr.length; i++) {
            for (int j = i; j < arr.length; j++) {
                int profit = arr[j] - arr[i];

                if (profit > max) {
                    max = profit;
                }
            }
        }

        int ans = max < 0 ? 0 : max;
        System.out.println(ans);
    }

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
}