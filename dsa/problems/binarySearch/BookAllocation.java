import java.util.*;

public class BookAllocation {
    public static void main(String[] args) {
        int arr[] = { 15, 17, 20 };
        bs(arr, 2);
    }

    public static int bs(int arr[], int m) {
        if (m > arr.length)
            return -1;
        int start = 0;
        int end = 0;
        int ans = -1;
        for (int i : arr) {
            end += i;
        }

        while (start <= end) { // O(logRange * n)
            int mid = start + (end - start) / 2;

            if (isValid(mid, arr, m)) {
                ans = mid;
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }

        System.out.println(ans);
        return ans;
    }

    public static boolean isValid(int mid, int arr[], int studs) { // O(n)
        int tempStuds = 1;
        int currentPages = 0;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > mid)
                break;

            if (currentPages + arr[i] <= mid) {
                currentPages += arr[i];
            } else {
                tempStuds++;
                currentPages = arr[i];
            }
        }

        return tempStuds > studs ? false : true;
    }
}