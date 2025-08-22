import java.util.*;

public class MedianOfSortedArrays {
    public static void main(String[] args) {

    }

    public static int optimised(int ar1[], int ar2[]) {
        int n1 = ar1.length;
        int n2 = ar2.length;
        if (n1 > n2) {
            return optimised(ar2, ar1);
        }

        int low = 0;
        int high = n1;
        int left = (n1 + n2 + 1) / 2;
        int n = n1 + n2;

        while (low <= high) {
            int mid1 = (low + high) / 2;
            int mid2 = left - mid1;

            int l1 = Integer.MIN_VALUE;
            int l2 = Integer.MIN_VALUE;
            int r1 = Integer.MAX_VALUE;
            int r2 = Integer.MAX_VALUE;

            if (mid1 < n1) {
                r1 = ar1[mid1];
            }

            if (mid2 < n2) {
                r2 = ar2[mid2];
            }

            if (mid1 - 1 >= 0) {
                l1 = ar1[mid1 - 1];
            }

            if (mid2 - 1 >= 0) {
                l2 = ar2[mid2 - 1];
            }

            if (l1 <= r2 && l2 <= r1) {
                if (n % 2 == 1) {
                    return Math.max(l1, l2);
                }
                return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
            } else if (l1 > r2) {
                high = mid1 - 1;
            } else {
                low = mid1 + 1;
            }
        }

        return 0;
    }
}