```java
public String reverseWords(String s) {
        int n = s.length();
        int st = n - 1;
        int end = n - 1;
        StringBuilder s2 = new StringBuilder();

        while (st >= 0) {
            while (st >= 0 && s.charAt(st) == ' ') st--;
            end = st;

            if (st < 0) break;

            while (st >= 0 && s.charAt(st) != ' ') st--;

            s2.append(s.substring(st + 1, end + 1)).append(" ");
        }

        return s2.toString().trim();
    }
```