import java.util.*;

public class PairSum {
    public static void main(String[] args) {
        int arr[] = {2,7, 11, 15};
        // bruteForce(arr, 9);
        towPointer(arr, 9);
    }

    public static void bruteForce(int[] arr, int target) {
        int[] ans = new int[2];

        for(int i=0; i < arr.length; i++){
            for(int j = i+1; j < arr.length; j++){
                if(arr[i] + arr[j] == target){
                    ans[0] = arr[i];
                    ans[1] =arr[j];
                    break;
                }
            }
        }

        System.out.println(Arrays.toString(ans));
    }

    public static void towPointer(int arr[], int target){
        int start = 0;
        int end = arr.length-1;
        int ans[] = new int[2];

        while(start < end){
            int sum = arr[start] + arr[end];
            if(sum > target){
                end--;
            }else if(sum < target){
                start++;
            }else {
                ans[0] = arr[start];
                ans[1] = arr[end];
                break;
            }
        }
        System.out.println(Arrays.toString(ans));
    }
}