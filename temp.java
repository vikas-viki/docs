import java.util.*;

public class temp {
    public static void main(String[] args) {
        int arr[] = { 5, 4, 3, 2, 1 };
        // bubbleSort(arr);
        selectionSort(arr);

    }

    public static void bubbleSort(int arr[]) {
        for (int i = 0; i < arr.length - 1; i++) {
            boolean isSwap = false;

            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    isSwap = true;
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }

            if (!isSwap) {
                break;
            }
        }

        System.out.println(Arrays.toString(arr));
    }

    public static void selectionSort(int arr[]) {
        for (int i = 0; i < arr.length - 1; i++) {
            int small = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[small]) {
                    small = j;
                }
            }

            int temp = arr[i];
            arr[i] = arr[small];
            arr[small] = temp;

        }
        System.out.println(Arrays.toString(arr));
    }

    public static void insertionSort(int arr[]) {
        for (int i = 0; i < arr.length; i++) {
            int curr = arr[i];
            int prev = -1;

            while (prev >= 0 && arr[prev] > prev) {
                prev--;
                arr[prev + 1] = arr[prev];
            }
        }

    }
}