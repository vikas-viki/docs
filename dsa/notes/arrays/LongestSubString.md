Given a string s, find the length of the longest substring(A substring is a contiguous non-empty sequence of characters within a string.) without duplicate characters.

ex:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

find substring of unique characters of max length, out of available options.

1. Bruteforce
   1. with n^2 loop, find all the substring, check if it has unique characters.
   2. TC: O(n^2)
   3. SC: O(256) // checking if there any repeating characters or an array.
2. Optimised
   1. we'll use two pointer with sliding window approach
   2. starting from s=0,r=0
      1. check if map[str[r]] > l (map will store indices)
         1. if so (it meanse, it came somewhere before in l->r), we can't take this as a substring, move the l to map[str[r]] + 1 (next place to wherever it occurred before).
      2. else i can take this as a string, maxL = max(maxL, r-l+1)
      3. add the character str[r] to the map.
      4. keep incrementing r. 
   3. TC: O(n)
   4. SC: O(k) // where k is no of unique characters.

```java

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
```