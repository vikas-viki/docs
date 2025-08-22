```java
public static String longestCommonPrefix(String[] strs) {
        int min = Integer.MAX_VALUE;
        for (int i = 0; i < strs.length; i++) {
            min = Math.min(min, strs[i].length());
        }
        StringBuilder s = new StringBuilder();
        for (int i = 0; i < min; i++) {
            boolean t = true;
            char c = strs[0].charAt(i);
            for (int j = 1; j < strs.length; j++) {
                if(strs[j].charAt(i) != c){
                    t = false;
                    break;
                }
            }
            if(t){
                s.append(c);
            }else {
                break;
            }
        }
        return s.toString();
    }
```