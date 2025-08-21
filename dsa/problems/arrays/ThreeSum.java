import java.util.*;

public class ThreeSum {
    public static void main(String[] args) {
        int arr[] = { -1, 0, 1, 2, -1, -4 };
        // bruteforce(arr);
        // hashMap(arr);
        optimised(arr);
    }

    public static void bruteforce(int arr[]) {
        int n = arr.length;
        HashSet<List<Integer>> set = new HashSet<>();

        List<int[]> ans = new ArrayList<>();

        for (int i = 0; i < n - 2; i++) {
            int a = arr[i];
            for (int j = i + 1; j < n - 1; j++) {
                int b = arr[j];
                for (int k = j + 1; k < n; k++) { // we dont have to pick the previous values, cause they'll covered in
                                                  // previous loops
                    int c = arr[k];
                    if (a + b + c == 0) {
                        List<Integer> triplet = Arrays.asList(a, b, c);
                        Collections.sort(triplet);
                        if (!set.contains(triplet)) {
                            set.add(triplet);
                            ans.add(new int[] { a, b, c });
                        }
                    }
                }
            }
        }
        System.out.println(Arrays.deepToString(ans.toArray()));
    }

    public static void hashMap(int arr[]) {
        HashSet<List<Integer>> set = new HashSet<>();

        List<List<Integer>> ans = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {
            int a = arr[i];
            Map<Integer, Integer> mp = new HashMap<>();
            for (int j = i + 1; j < arr.length; j++) {
                int b = arr[j];

                int c = -(a + b);

                if (mp.containsKey(c)) {
                    List<Integer> triplet = Arrays.asList(a, b, c);
                    Collections.sort(triplet);
                    if (!set.contains(triplet)) {
                        set.add(triplet);
                        ans.add(Arrays.asList(a, b, c));
                    }
                }
                mp.put(b, j);
            }
        }

        for (List<Integer> a : ans) {
            System.out.println(Arrays.toString(a.toArray()));
        }
    }

    public static void optimised(int arr[]) {
        HashSet<List<Integer>> set = new HashSet<>();
        List<List<Integer>> ans = new ArrayList<>();

        Arrays.sort(arr);

        int n = arr.length;
        for (int i = 0; i < n; i++) {
            if (i > 0 && arr[i] == arr[i - 1]) // we've already found the triplet once.
                continue;
            int a = arr[i];
            int j = i + 1;
            int k = n - 1;
            while (j < k) {
                int sum = a + arr[j] + arr[k];

                if (sum < 0) {
                    j++;
                } else if (sum > 0) {
                    k--;
                } else {
                    List<Integer> ls = Arrays.asList(a, arr[j], arr[k]);
                    if (!set.contains(ls)) {
                        set.add(ls);
                        ans.add(ls);
                    }
                    j++;
                    k--;

                    while (j < k && arr[j - 1] == arr[j]) // we've already found the pair for j
                        j++;
                }
            }
        }

        for (List<Integer> l : ans) {
            System.out.println(Arrays.toString(l.toArray()));
        }
    }
}