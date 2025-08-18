import java.util.*;

public class MergeSortedArrays {
    public static void main(String[] args) {
        int ar1[] = { 1, 3, 4, 6, 7, 0, 0, 0, 0, 0 };
        int ar2[] = { 2, 4, 5, 7, 9 };
        int n = 5;
        int m = 5;
        optimised(ar1, ar2, n, m);
    }

    public static void optimised(int ar1[], int ar2[], int n, int m) {
        int i = n - 1;
        int j = m - 1;
        int k = ar1.length - 1;

        while (k >= 0 && i >= 0 && j >= 0) {
            if (ar1[i] >= ar2[j]) {
                ar1[k--] = ar1[i--];
            } else {
                ar1[k--] = ar2[j--];
            }
        }

        while (j >= 0) {
            ar1[k--] = ar2[j--];
        }

        System.out.println(Arrays.toString(ar1));
    }
}