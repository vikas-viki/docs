import java.util.*;

public class FindingDuplicate {
    public static void main(String[] args) {
        int arr[] = { 3, 4, 3, 2, 1 };
        slowFast(arr);
    }

    public static void slowFast(int arr[]) {
        int slow = arr[0];
        int fast = arr[0];

        do {
            slow = arr[slow]; // to move once
            fast = arr[arr[fast]]; // to move twice
        } while (slow != fast);

        slow = arr[0];
        while (slow != fast) {
            slow = arr[slow];
            fast = arr[fast];
        }

        // there's a mathematical proof that this works at any linkedlist
        System.out.println(slow);
    }
}