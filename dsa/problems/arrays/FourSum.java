import java.util.*;

public class FourSum {
    public static void main(String[] args) {
        int arr[] = { 1, 0, -1, 0, -2, 2 };
        int target = 0;

        fourSum(arr, target);
    }

    public static List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        int n = nums.length;

        Arrays.sort(nums);

        for (int i = 0; i < n - 3; i++) {
            int a = nums[i];
            if (i > 0 && nums[i] == nums[i - 1])
                continue;
            for (int j = i + 1; j < n - 2; j++) {
                int b = nums[j];

                if (j > i + 1 && nums[j] == nums[j - 1])
                    continue;

                int start = j + 1;
                int end = n - 1;

                while (start < end) {
                    int c = nums[start];
                    int d = nums[end];

                    long sum = (long) a + b + c + d;

                    if (sum == (long) target) {
                        List<Integer> ls = Arrays.asList(a, b, c, d);
                        ans.add(ls);

                        end--;
                        start++;
                        while (start < end && nums[start] == nums[start - 1])
                            start++;
                        while (start < end && nums[end] == nums[end + 1])
                            end--;
                    } else if (sum < target) {
                        start++;
                    } else {
                        end--;
                    }

                }
            }
        }

        for (List<Integer> la : ans) {
            System.out.println(Arrays.toString(la.toArray()));
        }

        return ans;
    }
}