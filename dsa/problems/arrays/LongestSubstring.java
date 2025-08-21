import java.util.*;

public class LongestSubstring {
    public static void main(String[] args) {

    }

    public static void optimised(String s) {
        HashMap<Character, Integer> mp = new HashMap<>();
        int maxLen = 0;
        int l = 0;

        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);

            if (mp.getOrDefault(c, -1) >= l) {
                l = mp.get(c) + 1;
            }
            maxLen = Math.max(maxLen, r - l + 1);
            mp.put(c, r);
        }

        System.out.println(maxLen);
    }
}