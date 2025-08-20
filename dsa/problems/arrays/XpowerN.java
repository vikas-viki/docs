import java.util.*;

public class XpowerN {
    public static void main(String[] args) {
        int ans = pxn(5, 3);
        System.out.println(ans);
    }

    public static int pxn(int x, int n) { // make sure to use long for x and pow
        if (n == 0) {
            return 1;
        } else if (n == 1) {
            return x;
        } else {
            if (n < 1) {
                return 1 / pxn(x, n / 2); // x^-4 = 1/x^4
            }
            int pow = pxn(x, n / 2);
            if (n % 2 == 0) {
                return pow * pow;
            } else {
                return pow * x * pow;
            }
        }
    }

    public static double myPow(double x, int n) {
        int exp = n;

        if (exp < 0) {
            x = 1 / x;
            exp = -exp;
        }

        double ans = 1.0;

        while (exp > 0) {
            if ((exp & 1) == 1) {
                ans *= x;
            }
            x = x * x;
            exp >>= 1;
        }
        return ans;
    }
}