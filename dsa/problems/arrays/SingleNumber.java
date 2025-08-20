import java.util.*;

public class SingleNumber {
    public static void main(String[] args) {
        int arr[] = { 4, 1, 2, 1, 2 };
        singleNumber(arr);
    }

    public static void singleNumber(int arr[]) {
        int ans = arr[0];
        for (int i = 1; i < arr.length; i++) {
            ans ^= arr[i];
        }

        System.out.println(ans);
    }
}