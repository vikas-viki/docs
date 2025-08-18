import java.util.*;

public class MajorityElement {
    public static void main(String[] args) {
        int arr[] = { 2, 2, 1, 2, 1, 2, 3, 3, 2 };
        // brutForce(arr);
        mooresVote(arr);
    }

    public static void brutForce(int arr[]) {
        Map<Integer, Integer> mp = new HashMap<>();

        for (int i = 0; i < arr.length; i++) {
            mp.put(arr[i], mp.getOrDefault(arr[i], 0) + 1);
        }

        int required = arr.length / 2;

        for (int key : mp.keySet()) {
            if (mp.get(key) > required) {
                System.out.println(key);
            }
        }
    }

    public static void mooresVote(int arr[]) {
        int freq = 0;
        int ans = -1;
        for (int i = 0; i < arr.length; i++) {
            if (freq == 0) {
                ans = arr[i];
            }
            if (ans == arr[i]) {
                freq++;
            } else {
                freq--;
            }
        }
        System.out.println(ans);
    }
}