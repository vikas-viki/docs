import java.util.*;

public class MissingAndRepeatedValues {
    public static void main(String[] args) {
        int arr[][] = { { 9, 1, 7 }, { 8, 9, 2 }, { 3, 4, 6 } };
        approach(arr);
    }

    public static void approach(int args[][]) {
        HashMap<Integer, Integer> mp = new HashMap<>();
        int duplicate = -1;
        int currentSum = 0;
        int n = args.length;
        int expectedSum = (n * n) * (n * n + 1) / 2;
        int ans[] = new int[2];

        for (int i = 0; i < args.length; i++) {
            for (int j = 0; j < args.length; j++) {
                int prevFreq = mp.getOrDefault(args[i][j], 0);

                if (prevFreq == 1) {
                    duplicate = args[i][j];
                }
                currentSum += args[i][j];
                mp.put(args[i][j], prevFreq + 1);
            }
        }

        int missing = expectedSum - currentSum + duplicate;
        ans[0] = duplicate;
        ans[1] = missing;
        System.out.println(Arrays.toString(ans));
    }
}