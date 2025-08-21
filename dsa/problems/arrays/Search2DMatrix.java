import java.util.*;

public class Search2DMatrix {
    public static void main(String[] args) {
        int arr[][] = { { 1, 3, 5, 7 }, { 10, 11, 16, 20 }, { 23, 30, 34, 60 } };
        System.out.println(bsa(arr, 3));
    }

    public static boolean bsa(int arr[][], int target) {
        // for (int i = 0; i < arr.length; i++) {
        // if (target >= arr[i][0] && target <= arr[i][arr[i].length]) {
        // ans = binarySearch(arr[i], target);
        // if (ans)
        // break;
        // }
        // } TC: O(mlogn)

        int n = arr[0].length;
        int m = arr.length;

        int top = 0;
        int bottom = m - 1;

        while (top <= bottom) {
            int mid = top + (bottom - top) / 2;

            if (target < arr[mid][0]) {
                bottom = mid - 1;
            } else if (target > arr[mid][n - 1]) {
                top = mid + 1;
            } else {
                return binarySearch(arr[mid], target);
            }
        }
        return false;
    }

    public static boolean binarySearch(int arr[], int target) {
        int start = 0;
        int end = arr.length - 1;

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] == target) {
                return true;
            } else if (target > arr[mid]) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return false;
    }
}