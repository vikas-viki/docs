```java
public boolean isPalindrome(String s) {
        if (s == null) return false;
        int st = 0, end = s.length() - 1;

        while (st < end) {
            while (st < end && !Character.isLetterOrDigit(s.charAt(st))) st++;
            while (st < end && !Character.isLetterOrDigit(s.charAt(end))) end--;

            if (st >= end) break;

            char left = Character.toLowerCase(s.charAt(st));
            char right = Character.toLowerCase(s.charAt(end));
            if (left != right) return false;

            st++;
            end--;
        }
        return true;
    }
```