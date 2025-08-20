import java.util.*;

public class MaximumSubarraysSum {
    public static void main(String[] args) {
        int arr[] = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
        // bruteForce(arr);
        kadanesAlgorithm(arr);
    }

    public static void bruteForce(int arr[]) {
        int maxSum = 0;

        for (int i = 0; i < arr.length; i++) {
            int sum = 0;
            for (int j = i; j < arr.length; j++) {
                sum += arr[j];
                maxSum = Math.max(maxSum, sum);
            }
        }
        System.out.println(maxSum);
    }

    public static void kadanesAlgorithm(int arr[]) {
        int max = arr[0];
        int sum = arr[0];

        for (int i = 1; i < arr.length; i++) {
            sum = Math.max(sum + arr[i], arr[i]);
            max = Math.max(max, sum);
        }

        System.out.println(max);
    }
}