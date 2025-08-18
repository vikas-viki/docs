import java.util.*;

public class NextPermutation {
    public static void main(String[] args) {
        int arr[] = { 1, 1, 5 };
        optimal(arr);
    }

    public static void optimal(int arr[]) {
        int pivot = -1;

        int n = arr.length - 1;

        while (n > 0) {
            if (arr[n] > arr[n - 1]) {
                pivot = n - 1;
                break;
            }
            n--;
        }

        if (pivot == -1) {
            reverseArray(arr, 0, arr.length - 1);
            System.out.println(Arrays.toString(arr));
            return;
        }

        int next = pivot;

        for (int i = arr.length - 1; i > pivot; i--) {
            if (arr[i] > arr[pivot]) {
                next = i;
                break;
            }
        }

        // swap
        int temp = arr[pivot];
        arr[pivot] = arr[next];
        arr[next] = temp;

        // reverse from pivot+1 -> n-1
        int start = pivot + 1;
        int end = arr.length - 1;
        reverseArray(arr, start, end);
        System.out.println(Arrays.toString(arr));
    }

    public static void reverseArray(int arr[], int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
}