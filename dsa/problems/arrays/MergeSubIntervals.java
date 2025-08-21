import java.util.*;

public class MergeSubIntervals {
    public static void main(String[] args) {

    }

    public static int[][] merge(int[][] intervals) {
        List<int[]> ls = new ArrayList<>();

        Arrays.sort(intervals, (a, b) -> {
            if (a[0] != b[0]) {
                return Integer.compare(a[0], b[0]);
            }
            return Integer.compare(a[1], b[1]);
        });

        for (int i = 0; i < intervals.length; i++) {
            int[] iPair = intervals[i];
            if (!ls.isEmpty()) {
                int[] prevPair = ls.get(ls.size() - 1);

                if (iPair[0] <= prevPair[1]) {
                    prevPair[1] = Math.max(prevPair[1], iPair[1]);
                    continue;
                }
            }

            for (int j = i + 1; j < intervals.length; j++) {
                int[] jPair = intervals[j];

                if (jPair[0] <= iPair[1]) {
                    iPair[1] = Math.max(jPair[1], iPair[1]);
                } else {
                    break;
                }
            }

            ls.add(iPair);
        }

        return ls.toArray(new int[ls.size()][]);
    }

    public static int[][] optimised(int[][] intervals) {
        List<int[]> ls = new ArrayList<>();

        Arrays.sort(intervals, (a, b) -> {
            if (a[0] != b[0]) {
                return Integer.compare(a[0], b[0]);
            }
            return Integer.compare(a[1], b[1]);
        });

        for (int i = 0; i < intervals.length; i++) {
            int[] cPair = intervals[i];
            if (ls.isEmpty() || ls.get(ls.size() - 1)[1] < cPair[0]) {
                ls.add(cPair);
            } else {
                int[] prevPair = ls.get(ls.size() - 1);
                prevPair[1] = Math.max(prevPair[1], cPair[1]);
            }
        }

        return ls.toArray(new int[ls.size()][]);
    }
}