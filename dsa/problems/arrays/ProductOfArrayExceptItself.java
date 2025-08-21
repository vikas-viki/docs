import java.util.*;

public class ProductOfArrayExceptItself {
    public static void main(String[] args) {
        int arr[] = { 1, 2, 3, 4 };
        optimised(arr);
    }

    public static void optimised(int arr[]) {
        int ans[] = new int[arr.length];

        Arrays.fill(ans, 1);
        for (int i = 1; i < arr.length; i++) {
            ans[i] = arr[i - 1] * ans[i - 1];
        }

        int suffix = 1;
        for (int i = arr.length - 2; i >= 0; i--) {
            suffix *= arr[i + 1];
            ans[i] *= suffix;
        }

        System.out.println(Arrays.toString(ans));
    }
}