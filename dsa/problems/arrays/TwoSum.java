import java.util.*;

public class TwoSum {
    public static void main(String[] args) {
        int arr[] = { 5, 2, 11, 7, 15 };
        optimised(arr, 9);
    }

    public static void optimised(int arr[], int target) {
        HashMap<Integer, Integer> mp = new HashMap<>();
        int ans[] = new int[2];

        for (int i = 0; i < arr.length; i++) {
            int first = arr[i];
            int second = target - first;

            if (mp.containsKey(second)) { // even if we miss the first ele as ans[0], later the second ele will be
                                          // found, which requires the earlier ele.
                ans[0] = i;
                ans[1] = mp.get(second);
            }
            mp.put(arr[i], i);
        }

        System.out.println(Arrays.toString(ans));
    }
}