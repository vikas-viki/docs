given the array of size n, return the majority element.

majority element is the element that appears more the floor(n/2) times (more than half).

ex: [2,3,4,5,2,2,2] return 2.

given majority element always exists.

1. BruteForce approach
   1. `create a hashmap, count all the frequencies, compare the frequency againest floor(n/2)`
   2. TC: O(n)
   3. SC: O(k)  // k = no of distinct elements.
2. Sorting approach
   1. `sort the arrays in ascending order O(nlogn), sequentially count the frequency, if > then return, if not discard the freq count (cause its not majority elements, if it were we'd have got freq > n/2) O(n)`
   2. TC: O(nlogn)
   3. SC: O(1)
3. Moore's voting algorithm
    1. `Loop through the array: `
        1. If count == 0, set candidate = current_element
        2. If current_element == candidate, increment count
        3. Else decrement count
        👉 After this loop, candidate will hold the potential majority element.`
    2. `Since the majority element is strictly more than n/2, no matter how many times it gets canceled(freq=0), it will eventually come back as the final candidate.`
    1. TC: O(n)
    2. SC: O(1)
```java

    public static void mooresVote(int arr[]) {
        int freq = 0;
        int ans = -1;
        for (int i = 0; i < arr.length; i++) {
            if (freq == 0) {
                ans = arr[i];
            }
            if (ans == arr[i]) {
                freq++;
            } else {
                freq--;
            }
        }
        System.out.println(ans);
    }
```