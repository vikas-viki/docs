import java.util.*;

public class ContainerWithMostWater {
    public static void main(String[] args) {
        int arr[] = { 1, 8, 6, 2, 5, 4, 8, 3, 7 };
        twoPointer(arr);
    }

    public static void twoPointer(int arr[]) {
        int start = 0;
        int end = arr.length - 1;

        int maxWater = 0;

        while (start < end) {
            int w = end - start;
            int h = Math.min(arr[start], arr[end]);

            int currWater = w * h;

            maxWater = Math.max(maxWater, currWater);
            if (arr[start] < arr[end])
                start++;
            else
                end--;
        }

        System.out.println(maxWater);
    }
}