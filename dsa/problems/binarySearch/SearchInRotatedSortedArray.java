import java.util.*;

public class SearchInRotatedSortedArray {
    public static void main(String[] args) {
        int arr[] = { 3, 4, 5, 0, 1, 2, 3 };
        int ans = optimised(arr, 2);
        System.out.println(ans);
    }

    public static int optimised(int arr[], int target) {
        int start = 0;
        int end = arr.length - 1;

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] == target) {
                return mid;
            } else {
                if (arr[start] <= arr[mid]) {
                    if (arr[start] <= target && target <= arr[mid]) {
                        end = mid - 1;
                    } else {
                        start = mid + 1;
                    }
                } else { // if left is not sorted, right is always sorted
                    if (arr[mid] <= target && target <= arr[end]) {
                        start = mid + 1;
                    } else {
                        end = mid - 1;
                    }
                }
            }
        }
        return -1;
    }
}